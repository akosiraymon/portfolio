const destinations = {work:'work',services:'services',about:'about',contact:'contact'};
const route = location.pathname.split('/').filter(Boolean)[0];
const section = destinations[route];
if (section) location.replace(`/${location.search}${location.hash.startsWith('#case-') ? location.hash : `#${section}`}`);
