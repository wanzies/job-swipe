/* Offline cache for the dashboard: network first, cached copy when offline. Same-origin GET only. */
const C="daily-v2";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html"]).catch(()=>{})))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone(),key=u.origin+u.pathname;caches.open(C).then(c=>c.put(key,cp))}return res}).catch(()=>caches.match(u.origin+u.pathname).then(m=>m||(r.mode==="navigate"?caches.match("index.html"):Response.error()))))});
