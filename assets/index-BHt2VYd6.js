import{r as p,j as t,R as T}from"./react-Baehr4Gm.js";import{c as O}from"./react-dom-DADA75nA.js";import{c as P}from"./zustand-BGSl4CHS.js";import{a as E}from"./axios-C8DqakIB.js";import{S as L}from"./@radix-ui-CORXzhxG.js";import{c as z}from"./class-variance-authority-Bb4qSo10.js";import{c as A}from"./clsx-B-dksMZM.js";import{t as F}from"./tailwind-merge-BOZU2X2x.js";import{L as $,A as I,S as _,C as B,a as U,F as X,b as D,c as K}from"./lucide-react-LnVb77GN.js";import"./scheduler-CzFDRTuY.js";import"./use-sync-external-store-CXcVTNSR.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const v={http:["https://openproxy.space/list/http","https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&protocol=http&proxy_format=ipport&format=text&timeout=20000","https://proxyspace.pro/http.txt","https://rootjazz.com/proxies/proxies.txt","https://spys.me/proxy.txt","https://proxyhub.me/en/all-http-proxy-list.html","https://proxy-tools.com/proxy/http","https://www.proxy-list.download/api/v1/get?type=http","https://www.proxynova.com/proxy-server-list/","https://cdn.jsdelivr.net/gh/aslisk/proxyhttps/https.txt","https://cdn.jsdelivr.net/gh/clarketm/proxy-list/proxy-list-raw.txt","https://cdn.jsdelivr.net/gh/hendrikbgr/Free-Proxy-Repo/proxy_list.txt","https://cdn.jsdelivr.net/gh/jetkai/proxy-list/online-proxies/txt/proxies-http.txt","https://cdn.jsdelivr.net/gh/mertguvencli/http-proxy-list/proxy-list/data.txt","https://cdn.jsdelivr.net/gh/mmpx12/proxy-list/https.txt","https://cdn.jsdelivr.net/gh/roosterkid/openproxylist/HTTPS_RAW.txt","https://cdn.jsdelivr.net/gh/saschazesiger/Free-Proxies/proxies/http.txt","https://cdn.jsdelivr.net/gh/ShiftyTR/Proxy-List/https.txt","https://cdn.jsdelivr.net/gh/sunny9577/proxy-scraper/proxies.txt"],socks4:["https://openproxy.space/list/socks4","https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&protocol=socks4&proxy_format=ipport&format=text&timeout=20000","https://proxyspace.pro/socks4.txt","https://www.proxy-list.download/api/v1/get?type=socks4","https://proxyhub.me/en/all-socks4-proxy-list.html","https://www.my-proxy.com/free-socks-4-proxy.html","https://cdn.jsdelivr.net/gh/B4RC0DE-TM/proxy-list/SOCKS4.txt","https://www.socks-proxy.net/","https://cdn.jsdelivr.net/gh/jetkai/proxy-list/online-proxies/txt/proxies-socks4.txt","https://cdn.jsdelivr.net/gh/roosterkid/openproxylist/SOCKS4_RAW.txt","https://cdn.jsdelivr.net/gh/saschazesiger/Free-Proxies/proxies/socks4.txt","https://cdn.jsdelivr.net/gh/TheSpeedX/PROXY-List/socks4.txt"],socks5:["https://openproxy.space/list/socks5","https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&protocol=socks5&proxy_format=ipport&format=text&timeout=20000","https://proxyspace.pro/socks5.txt","https://www.proxy-list.download/api/v1/get?type=socks5","https://proxy-tools.com/proxy/socks5","https://proxyhub.me/en/all-sock5-proxy-list.html","https://cdn.jsdelivr.net/gh/HyperBeats/proxy-list/socks5.txt","https://cdn.jsdelivr.net/gh/jetkai/proxy-list/online-proxies/txt/proxies-socks5.txt","https://cdn.jsdelivr.net/gh/mmpx12/proxy-list/socks5.txt","https://cdn.jsdelivr.net/gh/roosterkid/openproxylist/SOCKS5_RAW.txt","https://cdn.jsdelivr.net/gh/saschazesiger/Free-Proxies/proxies/socks5.txt","https://cdn.jsdelivr.net/gh/TheSpeedX/PROXY-List/socks5.txt"]},k=P((s,n)=>({resources:{"http/s":v.http,socks4:v.socks4,socks5:v.socks5},selectedResource:"http/s",results:[],isCrawling:!1,setResources:r=>s({resources:r}),addResources:(r,l)=>s(e=>({resources:{...e.resources,[r]:l}})),setSelectedResource:r=>s({selectedResource:r}),getSelectedResources:()=>n().resources[n().selectedResource],setResults:r=>s({results:r}),addResult:r=>s(l=>({results:[...l.results,r]})),setIsCrawling:r=>s({isCrawling:r}),exportAs:r=>{const l=n().results;switch(r){case"text":return l.join(`
`);case"csv":return[...l.map(e=>`"${e.replace(/"/g,'""')}"`)].join(`
`);case"json":return JSON.stringify(l,null,2);default:throw new Error(`Unsupported export format: ${r}`)}}})),q=z("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}});function S(...s){return F(A(s))}const x=p.forwardRef(({className:s,variant:n,size:r,asChild:l=!1,...e},o)=>{const i=l?L:"button";return t.jsx(i,{className:S(q({variant:n,size:r,className:s})),ref:o,...e})});x.displayName="Button";const b=p.forwardRef(({className:s,...n},r)=>t.jsx("textarea",{className:S("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",s),ref:r,...n}));b.displayName="Textarea";const J=[{name:"http/s",label:"HTTP/S"},{name:"socks4",label:"SOCKS4"},{name:"socks5",label:"SOCKS5"}],M=/(?:^|\D)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5})(?:\D|$)/g;function V(){const{getSelectedResources:s,addResources:n,setResources:r,setSelectedResource:l,selectedResource:e,isCrawling:o,setIsCrawling:i,addResult:d,setResults:h,resources:m}=k();p.useEffect(()=>{const a=localStorage.getItem("resources");if(a)try{const c=JSON.parse(a);r(c)}catch(c){console.error("Failed to parse saved resources:",c)}},[n]);const f=p.useCallback(a=>{l(a)},[l]),R=p.useCallback(a=>{const c=a.target.value.split(`
`).filter(Boolean);n(e,c)},[e,n]),j=p.useCallback(async a=>{var w;const c=["","https://cors.eu.org/","https://corsproxy.io/?"];for(let u=0;u<c.length;u++)try{const y=c[u]+a;(((w=(await E.get(y)).data.match(M))==null?void 0:w.map(g=>g.trim()))??[]).forEach(g=>{g&&!g.includes("127.0.0.1")&&d(g.replace(/"/g,"").replace(/>/g,""))}),console.log(`Attempt ${u+1} successful for ${c[u]+a}`);break}catch(y){console.error(`Attempt ${u+1} failed for ${c[u]+a}:`,y),u===c.length-1&&console.error(`All attempts failed for ${c[u]+a}`)}},[d]),C=p.useCallback(async()=>{i(!0),h([]);const a=s();await Promise.all(a.map(j)),i(!1)},[i,h,s,j]),N=p.useCallback(()=>{try{localStorage.setItem("resources",JSON.stringify(m)),console.log("Resources saved successfully.")}catch(a){console.error("Failed to save resources:",a)}},[m]);return t.jsxs("section",{className:"flex grow flex-col gap-4 rounded-lg bg-gray-700 p-4 shadow-md",children:[t.jsx("div",{className:"flex gap-2",children:J.map(a=>t.jsx(x,{variant:e===a.name?"default":"outline",className:"w-full transition-colors duration-200 ease-in-out",onClick:()=>f(a.name),title:`Switch to ${a.label}`,disabled:o,children:a.label},a.name))}),t.jsx(b,{placeholder:"Proxy resources",className:"h-full resize-none text-sm focus:ring-2 focus:ring-primary",spellCheck:!1,value:s().join(`
`),onChange:R,disabled:o}),t.jsxs("div",{className:"flex w-full gap-2",children:[t.jsxs(x,{variant:"default",className:"w-full grow bg-primary transition-colors duration-200 ease-in-out",onClick:C,disabled:o,title:o?"Crawling in progress":"Start Crawling",children:[t.jsx("span",{className:"mr-2 font-semibold",children:o?"Crawling":"Start Crawling"}),o?t.jsx($,{size:18,className:"animate-spin"}):t.jsx(I,{size:18})]}),t.jsx("div",{className:"flex gap-1",children:t.jsx(x,{variant:"outline",className:"transition-colors duration-200 ease-in-out",title:"Save resources",onClick:N,disabled:o,children:t.jsx(_,{size:18})})})]})]})}const Y=[{format:"text",label:"Save as TEXT",icon:X},{format:"csv",label:"Save as CSV",icon:D},{format:"json",label:"Save as JSON",icon:K}];function H(){const{results:s,exportAs:n}=k(),[r,l]=p.useState(!1),e=i=>{const d=n(i),h=new Blob([d],{type:"text/plain"}),m=URL.createObjectURL(h),f=document.createElement("a");f.href=m,f.download=`results.${i}`,f.click(),URL.revokeObjectURL(m)},o=()=>{l(!0),navigator.clipboard.writeText(s.join(`
`)),setTimeout(()=>l(!1),2e3)};return t.jsxs("section",{className:"relative flex grow flex-col gap-4 rounded-lg bg-gray-700 p-4 shadow-md",children:[s.length>0&&t.jsxs("p",{className:"absolute left-0 top-0 z-50 w-full rounded-t bg-primary p-2 text-sm text-background",children:[s.length," Results"]}),t.jsx(b,{placeholder:"Crawled results",className:`grow resize-none focus:ring-2 focus:ring-blue-500 ${s.length?"mt-8":"mt-0"}`,value:s.join(`
`),disabled:!s.length,readOnly:!0}),t.jsxs("div",{className:"grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2",children:[Y.map(i=>t.jsxs(x,{className:"flex w-full items-center justify-center transition-colors duration-200 ease-in-out",variant:"outline",onClick:()=>e(i.format),title:i.label,disabled:!s.length,spellCheck:!1,children:[t.jsx(i.icon,{className:"mr-2",size:18}),i.label]},i.format)),t.jsxs(x,{className:"flex w-full items-center justify-center transition-colors duration-200 ease-in-out md:col-span-3",variant:"outline",onClick:o,title:"Copy results to clipboard",disabled:!s.length,spellCheck:!1,children:[r?t.jsx(B,{className:"mr-2",size:18}):t.jsx(U,{className:"mr-2",size:18}),"Copy to clipboard"]})]})]})}function W(){return t.jsx("main",{className:"container mx-auto h-screen p-4",children:t.jsxs("div",{className:"flex h-full flex-col gap-4",children:[t.jsx(V,{}),t.jsx(H,{})]})})}const G={theme:"system",setTheme:()=>null},Q=p.createContext(G);function Z({children:s,defaultTheme:n="system",storageKey:r="vite-ui-theme",...l}){const[e,o]=p.useState(()=>localStorage.getItem(r)||n);p.useEffect(()=>{const d=window.document.documentElement;if(d.classList.remove("light","dark"),e==="system"){const h=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.classList.add(h);return}d.classList.add(e)},[e]);const i={theme:e,setTheme:d=>{localStorage.setItem(r,d),o(d)}};return t.jsx(Q.Provider,{...l,value:i,children:s})}O.createRoot(document.getElementById("root")).render(t.jsx(T.StrictMode,{children:t.jsx(Z,{defaultTheme:"dark",storageKey:"theme",children:t.jsx(W,{})})}));
