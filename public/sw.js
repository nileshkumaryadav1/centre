if(!self.define){let e,a={};const s=(s,t)=>(s=new URL(s+".js",t).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let n={};const r=e=>s(e,c),f={module:{uri:c},exports:n,require:r};a[c]=Promise.all(t.map((e=>f[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d98698d5ae92e4c70675428f336a7360"},{url:"/_next/static/U6EbU-OYhtZa-h9EyE3CD/_buildManifest.js",revision:"276194330e33df72f46f3b4253bd97bd"},{url:"/_next/static/U6EbU-OYhtZa-h9EyE3CD/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/111-a0998480c5f7a752.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/1684-20687526af1ddc37.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/4277-b4f7570e3cd0ef7f.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/4502-1ed74fc34ee26d44.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/472.a3826d29d6854395.js",revision:"a3826d29d6854395"},{url:"/_next/static/chunks/4bd1b696-85e73a2ed4797243.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/6766-619956febc804d18.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/6874-2be9623bb66e4ae7.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/8419-233c7ac1978acd51.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/8e1d74a4-22e95d913b73ce1b.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/9341.48099055d616fd0a.js",revision:"48099055d616fd0a"},{url:"/_next/static/chunks/app/(route)/%5B...page%5D/page-0f3e8fb17a313a9e.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(visible)/about/page-17f88b1fab657f97.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(visible)/blog/%5Bid%5D/page-8ec326a9009bb85a.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(visible)/blog/page-64ad27bbde8f4e85.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(visible)/calender/page-f2b8f973c7a62c5a.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(visible)/career/page-b96137de6d9b8e34.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(visible)/members/%5Bid%5D/page-6ef1fdb25e6157a4.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(visible)/members/page-64a60e32e13275b0.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(visible)/services/%5Bid%5D/page-d88ec63592c1e039.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(visible)/services/page-533a0b36b3cd5f5a.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(work)/services/edit/page-086c7bee74fd4b51.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/(work)/upload/page-5824d47abba67cdd.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/admin/birthday/page-9312cfd11e77656f.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/admin/blogs/page-fab5a89937c8dd75.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/admin/members/%5Bid%5D/page-4e4cdee4a7a20977.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/admin/members/page-c3f917cd2204d923.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/admin/page-14c13694c975d112.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/user/dashboard/page-54021a581cab933f.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/user/login/page-e239077c26b3eaad.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/(route)/user/register/page-e41ef82c13d77915.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/_not-found/page-cbc93567e55e54ed.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/(user)/login/route-eee1c3fc77c95e0e.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/(user)/register/route-09b93fab296a0455.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/(user)/user/route-9947f6ad7eaff868.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/blogs/%5Bid%5D/route-793c6b6576317908.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/blogs/author-name/route-50f4d168cad35a2e.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/blogs/route-ca011582a9cc3341.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/members/%5Bid%5D/route-a3005ea8bf4bbc9f.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/members/birthday/%5Bid%5D/route-684058ca1e0e4687.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/members/birthday/route-a1a3b1322043d8dc.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/members/route-d058add54dff93a7.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/services/%5Bid%5D/route-2270073b66487690.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/api/services/route-a1aa4f5345b38040.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/layout-838d5fbeca786464.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/not-found-0a3f4277896e8a34.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/app/page-1ea9cdb0b4bc7b4e.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/framework-dcd2c1f5d9432bec.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/main-08bae92bfefe55b1.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/main-app-3f10df8d866f8155.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/pages/_app-c5edea036b2e1360.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/pages/_error-a0194b07e927b492.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-c318cb8ae0c7e1e0.js",revision:"U6EbU-OYhtZa-h9EyE3CD"},{url:"/_next/static/css/72313199b7132b63.css",revision:"72313199b7132b63"},{url:"/_next/static/css/d4a79f1c48428fb3.css",revision:"d4a79f1c48428fb3"},{url:"/_next/static/css/e37543bdf095e77f.css",revision:"e37543bdf095e77f"},{url:"/_next/static/media/0cf580864ae59341-s.woff2",revision:"9dc5c6da3314b5ad3e00ccbf3ef10513"},{url:"/_next/static/media/176b159565394c49-s.p.woff2",revision:"de9692f86990a2d7745fc63789877605"},{url:"/_next/static/media/2e5f5e513f4dc014-s.woff2",revision:"06d8e5bdf0b3dededad791ca12df6067"},{url:"/_next/static/media/3be63adebbe80e17-s.woff2",revision:"052d44ba955fcd27e2d22a0542f8554d"},{url:"/_next/static/media/4cfe0441667ecaec-s.p.woff2",revision:"878fbc87806bae59ca7bd8b8d11cbbb1"},{url:"/_next/static/media/54f338ab57103f83-s.woff2",revision:"3dc2dc96d3ea12cea776604771b000e9"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/5e1dd9734e96f467-s.woff2",revision:"fc69755e77678f9b7e6ac26f789eadbb"},{url:"/_next/static/media/6c35c48d2d54edc1-s.woff2",revision:"569699c1e3687270c551343e8c573f70"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/7e2a926bef88262a-s.woff2",revision:"8d25faf574c7387585e16a83f31276d9"},{url:"/_next/static/media/8048a25e80cc4179-s.woff2",revision:"2e21621de57fc8d4d710e37ce38d966d"},{url:"/_next/static/media/84e2ca9032588f29-s.woff2",revision:"78b0b941ffc99c060be329447cc046bd"},{url:"/_next/static/media/86ba892d94d0e659-s.woff2",revision:"e932533fe1af50007ee807109a39f8b3"},{url:"/_next/static/media/8a6b99af3480e1fe-s.woff2",revision:"02ac2c89550dab70869772b3e7c06c92"},{url:"/_next/static/media/8baacca3873aaac0-s.woff2",revision:"a7d79f613de4b715185b0882ba312514"},{url:"/_next/static/media/8bb90efd1b2442e0-s.woff2",revision:"87f09b862d14319724588218fc942688"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/974b5144e4d8704d-s.p.woff2",revision:"c351795f364311ebf94386646e9229df"},{url:"/_next/static/media/ab86f138d0d6e9da-s.p.woff2",revision:"f064f66892177bca0934a110a1de30b0"},{url:"/_next/static/media/b3e13a4ac57b538e-s.woff2",revision:"06dcf6e4964584269071da60f523e129"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/_next/static/media/cb6f448281d0c282-s.woff2",revision:"af93dfb1312ecb3b98b31d2297739188"},{url:"/_next/static/media/d131c2871a4ef360-s.woff2",revision:"339ffc7867136c93a876f402830a8989"},{url:"/_next/static/media/d4f7cefda76b2fff-s.woff2",revision:"7d7e5e4fc4897ac7f95cc074585fa4f6"},{url:"/_next/static/media/d51be7479414f4fc-s.woff2",revision:"1877b8a186ca05cadae552a781fe1338"},{url:"/_next/static/media/d60b7d59c1e26a07-s.p.woff2",revision:"1fb032e2a1a6597fa61d387b95e6f6b2"},{url:"/_next/static/media/d76fe899475ae4d7-s.woff2",revision:"4cfb17abc7db68aaa8238fd287c60c96"},{url:"/_next/static/media/e546cf32c9d4702c-s.woff2",revision:"20c0b652b7183b9917b283b04aa68ddc"},{url:"/_next/static/media/e94cfb95acf534f2-s.p.woff2",revision:"0a55b546e4e485f0f48f8dc472823c72"},{url:"/_next/static/media/e94dd1a41eca7a1f-s.woff2",revision:"7fa3a282dd0970896e23722780c39202"},{url:"/_next/static/media/f884d4ea94220255-s.p.woff2",revision:"764c83e6b726b9604b89b81974219735"},{url:"/_next/static/media/fb3d4f9492d39101-s.woff2",revision:"d4831dd83581f1d91182d0b53a70a3cd"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon512_maskable.png",revision:"67cbfe3dcecddcaa4ddf9a79ebaac3fc"},{url:"/icon512_rounded.png",revision:"894b7f81afe67ef7315336986fec4110"},{url:"/logo.jpg",revision:"b2cfea2e36663d4df4fc80a7c900a6db"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"},{url:"/youtube_logo.png",revision:"b1d3c09c8105ef8173eb332c4201b2d7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:t})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
