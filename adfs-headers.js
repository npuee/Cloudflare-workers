//if you have a adfs behind Cloudflare proxy, there is a need to set headers to differentiate inside and outside zone.
//This can be accomplished with workers:


addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})
//add adfs proxy headers.

async function fetchAndApply(request) {
  request = new Request(request)
  request.headers.set("Host", "adfs.hostname.net")
  request.headers.set("X-MS-Proxy", "Proxy IP/argo tunnel machine IP")
  
  return fetch(request)
}


// Do not forget to set up worker route to adfs external URI: adfs.hostname.net/*
