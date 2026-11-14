// Usage : NRBC_PW="mot de passe" node outils/chiffrer.mjs jeu.html index.html
import fs from 'fs'; const {subtle}=globalThis.crypto;
const pw=process.env.NRBC_PW; if(!pw) throw new Error('NRBC_PW manquant');
const html=fs.readFileSync(process.argv[2]);
const salt=crypto.getRandomValues(new Uint8Array(16)), iv=crypto.getRandomValues(new Uint8Array(12));
const IT=600000;
const base=await subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
const key=await subtle.deriveKey({name:'PBKDF2',salt,iterations:IT,hash:'SHA-256'},base,{name:'AES-GCM',length:256},true,['encrypt','decrypt']);
const ct=new Uint8Array(await subtle.encrypt({name:'AES-GCM',iv},key,html));
const b=x=>Buffer.from(x).toString('base64');
const loader=`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#000"><title>L'expert NRBC</title>
<style>
*{box-sizing:border-box}html,body{margin:0;height:100%;background:#000;color:#33ff66;font-family:"Courier New",ui-monospace,Menlo,monospace;overflow:hidden}
body:before{content:"";position:fixed;inset:0;pointer-events:none;z-index:5;background:repeating-linear-gradient(0deg,rgba(0,0,0,.35) 0 2px,transparent 2px 4px)}
body:after{content:"";position:fixed;inset:0;pointer-events:none;z-index:4;background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.85));animation:fl 4s infinite}
@keyframes fl{0%,100%{opacity:1}50%{opacity:.92}}
canvas{position:fixed;inset:0;opacity:.18;z-index:0}
.w{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:center;padding:6vw;max-width:520px;margin:auto;text-shadow:0 0 6px #33ff66aa}
.lg{font-size:13px;line-height:1.55;min-height:150px;white-space:pre-wrap;opacity:.9}
.al{border:1px solid #ff3b3b;color:#ff3b3b;text-shadow:0 0 8px #ff3b3b;padding:10px;text-align:center;letter-spacing:2px;font-weight:700;margin:16px 0 6px;animation:bl 1.2s steps(2) infinite;font-size:15px}
@keyframes bl{50%{opacity:.35}}
h1{font-size:28px;margin:6px 0 2px;letter-spacing:3px;position:relative}
h1 span{color:#e8c64a;text-shadow:0 0 8px #e8c64a}
.sub{font-size:12px;opacity:.7;letter-spacing:1px}
form{margin-top:18px;opacity:0;transition:opacity .4s}form.on{opacity:1}
.in{display:flex;align-items:center;border-bottom:2px solid #33ff66;padding:8px 0}
.in b{margin-right:8px}input[type=password]{flex:1;background:transparent;border:0;outline:0;color:#33ff66;font:inherit;font-size:18px;caret-color:#33ff66;letter-spacing:3px}
label{display:block;font-size:12px;margin:12px 0;opacity:.8}input[type=checkbox]{accent-color:#33ff66;vertical-align:middle}
button{width:100%;padding:13px;background:transparent;border:1px solid #33ff66;color:#33ff66;font:inherit;font-size:16px;letter-spacing:4px;cursor:pointer;text-shadow:inherit}
button:active{background:#33ff66;color:#000}
#e{min-height:22px;margin-top:12px;font-size:14px;letter-spacing:1px}
.ko{color:#ff3b3b;text-shadow:0 0 8px #ff3b3b}.sh{animation:sh .4s}
@keyframes sh{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
.ok{position:fixed;inset:0;z-index:9;background:#000;display:none;align-items:center;justify-content:center;font-size:30px;letter-spacing:4px;color:#33ff66;text-shadow:0 0 14px #33ff66;text-align:center}
.ok.on{display:flex;animation:gl .15s 6}
@keyframes gl{0%{transform:translate(2px,-1px);filter:hue-rotate(0)}50%{transform:translate(-3px,2px);filter:hue-rotate(90deg)}100%{transform:none}}
.ft{position:fixed;bottom:10px;left:0;right:0;text-align:center;font-size:10px;opacity:.4;z-index:2;letter-spacing:1px}
</style></head><body><canvas id="mx"></canvas>
<div class="w"><div class="lg" id="lg"></div>
<div class="al">⚠ ACCÈS RÉSERVÉ AU PERSONNEL AUTORISÉ ⚠</div>
<h1>☢ L'EXPERT <span>NRBC</span></h1><div class="sub">TERMINAL DE FORMATION · NIVEAU D'HABILITATION REQUIS</div>
<form id="f"><div class="in"><b>&gt;</b><input id="p" type="password" placeholder="CODE D'ACCÈS" autocomplete="current-password" autocapitalize="off" spellcheck="false"></div>
<label><input id="r" type="checkbox" checked> Mémoriser l'habilitation sur ce terminal</label>
<button id="go">[ AUTHENTIFICATION ]</button><div id="e"></div></form></div>
<div class="ok" id="ok">ACCÈS AUTORISÉ<br>▮▮▮▮▮▮▮▮▮▮</div>
<div class="ft">Toute tentative d'accès non autorisée est journalisée.</div>
<script>
const S="${b(salt)}",I="${b(iv)}",C="${b(ct)}",IT=${IT},K="nrbc_k";
const u=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function dec(raw){const k=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']);
const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:u(I)},k,u(C));return new TextDecoder().decode(pt);}
function open_(h){document.open();document.write(h);document.close();}
async function derive(pw){const b=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
const k=await crypto.subtle.deriveKey({name:'PBKDF2',salt:u(S),iterations:IT,hash:'SHA-256'},b,{name:'AES-GCM',length:256},true,['decrypt']);
return new Uint8Array(await crypto.subtle.exportKey('raw',k));}
// pluie de caractères
const cv=document.getElementById('mx'),x=cv.getContext('2d');let cols=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight;cols=Array(Math.ceil(cv.width/14)).fill(0).map(()=>Math.random()*cv.height/14|0)}rs();addEventListener('resize',rs);
const ch="☢☣⚠01ABCDEFNRBC0123456789#%&";setInterval(()=>{x.fillStyle='rgba(0,0,0,.12)';x.fillRect(0,0,cv.width,cv.height);x.fillStyle='#33ff66';x.font='13px monospace';
cols.forEach((y,i)=>{x.fillText(ch[Math.random()*ch.length|0],i*14,y*14);cols[i]=y*14>cv.height&&Math.random()>.97?0:y+1})},60);
// séquence de démarrage
const L=["> initialisation du terminal sécurisé...","> liaison AES-256 ...... OK","> intégrité ............ OK","> base NRBC ........... VERROUILLÉE","> identification de l'opérateur requise_"];
const lg=document.getElementById('lg'),f=document.getElementById('f');let li=0,ci=0;
function ty(){if(li>=L.length){f.classList.add('on');document.getElementById('p').focus();return}
if(ci<=L[li].length){lg.textContent=L.slice(0,li).join("\\n")+(li?"\\n":"")+L[li].slice(0,ci++);setTimeout(ty,14)}else{li++;ci=0;setTimeout(ty,180)}}
async function win(h){const o=document.getElementById('ok');o.classList.add('on');setTimeout(()=>open_(h),1100)}
(async()=>{let s=null;try{s=localStorage.getItem(K)}catch(e){}if(s){try{const h=await dec(u(s));lg.textContent="> habilitation reconnue...";return win(h)}catch(e){try{localStorage.removeItem(K)}catch(_){}}}ty()})();
f.onsubmit=async ev=>{ev.preventDefault();const E=document.getElementById('e'),g=document.getElementById('go');E.className='';E.textContent='> vérification de l\\'habilitation...';g.disabled=true;
try{const raw=await derive(document.getElementById('p').value);const h=await dec(raw);
if(document.getElementById('r').checked){try{localStorage.setItem(K,btoa(String.fromCharCode(...raw)))}catch(e){}}
E.textContent='> habilitation validée';win(h)}catch(e){E.className='ko';E.textContent='✖ ACCÈS REFUSÉ — code invalide';const w=document.querySelector('.w');w.classList.remove('sh');void w.offsetWidth;w.classList.add('sh');if(navigator.vibrate)navigator.vibrate([80,60,80]);g.disabled=false;document.getElementById('p').value=''}};
</script></body></html>`;
fs.writeFileSync(process.argv[3],loader); console.log('ok',loader.length);
