import test from 'node:test';
import assert from 'node:assert/strict';
import { contactPayload, validateContact, sendContact, isLocalPreview, CONTACT_FORM_ENDPOINT } from '../contact.js';

test('preserves the webhook contract, trims values, and permits optional fields',() => {
  const payload = contactPayload({name:' Raymon ',email:' preview@example.com '});
  assert.deepEqual(payload,{name:'Raymon',company:'',email:'preview@example.com',phone:'',message:'',website:''});
  assert.deepEqual(validateContact(payload),{});
  assert.deepEqual(Object.keys(validateContact(contactPayload({name:' ',email:'invalid'}))),['name','email']);
});
test('local preview is restricted to loopback hostnames',() => {
  for (const hostname of ['localhost','127.0.0.1','[::1]','::1']) assert.ok(isLocalPreview(hostname));
  for (const hostname of ['raymoncastano.com','localhost.attacker.com','example.com']) assert.equal(isLocalPreview(hostname),false);
});
test('local success, failure, and timeout never call the production webhook',async () => {
  const fetchImpl = () => {throw new Error('Network must not be used');};
  assert.deepEqual(await sendContact({},{hostname:'127.0.0.1',fetchImpl}),{simulated:true});
  await assert.rejects(sendContact({},{hostname:'localhost',scenario:'error',fetchImpl}),/Simulated/);
  await assert.rejects(sendContact({},{hostname:'localhost',scenario:'timeout',timeoutMs:5,fetchImpl}),{name:'AbortError'});
});
test('production request preserves endpoint, method and all payload fields',async () => {
  const payload = contactPayload({name:'Test',email:'test@example.com',website:'honeypot'});
  const result = await sendContact(payload,{hostname:'raymoncastano.com',fetchImpl:async (url,options) => {
    assert.equal(url,CONTACT_FORM_ENDPOINT);
    assert.equal(options.method,'POST');
    assert.deepEqual(JSON.parse(options.body),payload);
    return {ok:true};
  }});
  assert.deepEqual(result,{simulated:false});
});
test('production HTTP failures and aborts are surfaced',async () => {
  await assert.rejects(sendContact({},{hostname:'raymoncastano.com',fetchImpl:async () => ({ok:false})}));
  await assert.rejects(sendContact({},{hostname:'raymoncastano.com',timeoutMs:5,fetchImpl:(_url,{signal}) => new Promise((_resolve,reject) => signal.addEventListener('abort',() => reject(new DOMException('Timed out','AbortError'))))}),{name:'AbortError'});
});
