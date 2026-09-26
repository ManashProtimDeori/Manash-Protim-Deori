import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import assert from 'node:assert/strict';
import { AuthProvider } from '../src/auth/AuthContext';
import { ThemeProvider } from '../src/context/ThemeContext';
import { DataProvider } from '../src/context/DataContext';
import { AppContent } from '../src/App';
import handler from '../api/content/update';

// A stored edit flag must never grant public editing access.
const store = new Map([['mpd_edit_mode', 'true']]);
Object.assign(globalThis, { window: { matchMedia: () => ({matches:false}) }, localStorage: { getItem: (k: string) => store.get(k) || null, setItem: (k: string, v: string) => store.set(k,v), removeItem: (k: string) => store.delete(k) } });
const routes = ['/', '/work', '/lab', '/tools', '/tools?tool=positioning-analyser', '/writing', '/about', '/resume', '/quick-profile', '/contact', '/now', '/uses', '/archive', '/research', '/experience', '/changelog', '/login', '/studio', '/admin'];
for (const route of routes) {
 const html = renderToString(<AuthProvider><ThemeProvider><DataProvider><MemoryRouter initialEntries={[route]}><AppContent/></MemoryRouter></DataProvider></ThemeProvider></AuthProvider>);
 assert.ok(html.length > 1000, route);
 assert.ok(!html.includes('Toggle content edit mode'), `${route}: public edit control`);
 assert.ok(!html.includes('Edit Mode: OFF'), `${route}: floating edit control`);
 if (['/','/about','/resume','/quick-profile'].includes(route)) {
  assert.ok(html.includes('Rajiv Gandhi Institute of Petroleum Technology'), `${route}: RGIPT missing`);
  assert.ok(html.includes('IIM Shillong'), `${route}: IIM missing`);
 }
}
for (const auth of [undefined, 'Bearer ', 'Bearer invalid']) {
 let status = 0;
 const res = { status: (s: number) => { status = s; return res; }, json: (_:unknown)=>res, setHeader:()=>{} };
 await handler({ method:'POST', headers: auth ? {authorization:auth} : {}, body:{} },res);
 assert.equal(status,401);
}
console.log(`PASS: ${routes.length} route renders; public editing hidden; shared education; 3 unauthorized API requests.`);
