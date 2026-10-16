import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { build } from '../build.js';
import { PROJECTS } from '../data.js';

test('build preserves all projects, local assets and legacy routes', () => {
  build();
  const output = new URL('../dist/',import.meta.url);
  const html = readFileSync(new URL('index.html',output),'utf8');
  assert.equal(PROJECTS.length,10);
  for (const project of PROJECTS) {
    assert.ok(html.includes(`id="dialog-${project.id}"`));
    assert.ok(html.includes(`href="#case-${project.id}"`));
  }
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
    assert.ok(existsSync(new URL(`.${match[1]}`,output)),`Missing asset: ${match[1]}`);
  }
  for (const route of ['work','services','about','contact']) {
    const legacy = readFileSync(new URL(`${route}/index.html`,output),'utf8');
    assert.ok(legacy.includes(`/#${route}`));
    assert.ok(legacy.includes('/legacy.js'));
  }
  assert.ok(!html.includes('cdn.tailwindcss.com'));
  assert.ok(!html.includes('<!-- FEATURED_PROJECTS -->'));
  assert.ok(html.includes('RC automation'));
  assert.ok(html.includes('AI workflow automation engineer'));
  assert.ok(html.includes('01 / PROJECTS'));
  assert.ok(html.includes('class="header-background"'));
  assert.ok(html.includes('class="nav-indicator"'));
  assert.ok(html.includes('class="theme-toggle"'));
  assert.ok(html.includes('class="menu-lines"'));
  assert.ok(html.includes('class="curtain-footer"'));
  assert.ok(html.includes('id="contact" class="contact-marker"'));
  assert.ok(!html.includes('<!-- PROJECT_TOOLS -->'));
  const aliases = {'Gemini AI':'Google Gemini', Sheets:'Google Sheets'};
  for (const project of PROJECTS) {
    for (const tool of project.stack.split(' / ')) {
      assert.ok(html.includes(`<li>${aliases[tool] || tool}</li>`), `Missing tool: ${tool}`);
    }
  }
});
