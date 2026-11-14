// Usage : NRBC_PW="mot de passe" node outils/chiffrer.mjs jeu.html index.html
import fs from 'fs'; const {subtle}=globalThis.crypto;
const pw=process.env.NRBC_PW;
const html=fs.readFileSync(process.argv[2]);
const salt=crypto.getRandomValues(new Uint8Array(16)), iv=crypto.getRandomValues(new Uint8Array(12));
const IT=600000;
const base=await subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
const key=await subtle.deriveKey({name:'PBKDF2',salt,iterations:IT,hash:'SHA-256'},base,{name:'AES-GCM',length:256},true,['encrypt','decrypt']);
const ct=new Uint8Array(await subtle.encrypt({name:'AES-GCM',iv},key,html));
const b=x=>Buffer.from(x).toString('base64');
const loader=`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow"><title>L'expert NRBC</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0d1110;color:#d8e0d0;font-family:system-ui,sans-serif}
.b{width:min(88vw,360px);text-align:center}h1{font-size:26px;letter-spacing:2px;color:#e8c64a;margin:0 0 6px}p{opacity:.7;font-size:14px}
input{width:100%;box-sizing:border-box;padding:14px;border-radius:10px;border:1px solid #445;background:#1a201e;color:#fff;font-size:17px;margin:14px 0 10px}
label{font-size:14px;opacity:.85}button{width:100%;padding:14px;margin-top:14px;border:0;border-radius:10px;background:#e8c64a;color:#111;font-weight:700;font-size:17px}
#e{color:#ff6b5b;min-height:20px;font-size:14px;margin-top:10px}</style></head><body>
<div class="b"><h1>☢ L'EXPERT NRBC</h1><p>Accès réservé</p>
<form id="f"><input id="p" type="password" placeholder="Mot de passe" autocomplete="current-password"><label><input id="r" type="checkbox" checked style="width:auto;margin:0 6px 0 0">Se souvenir sur cet appareil</label><button id="go">Entrer</button></form><div id="e"></div></div>
<script>
const S="${b(salt)}",I="${b(iv)}",C="${b(ct)}",IT=${IT},K="nrbc_k";
const u=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function dec(raw){const k=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']);
const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:u(I)},k,u(C));const h=new TextDecoder().decode(pt);document.open();document.write(h);document.close();}
async function derive(pw){const b=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
const k=await crypto.subtle.deriveKey({name:'PBKDF2',salt:u(S),iterations:IT,hash:'SHA-256'},b,{name:'AES-GCM',length:256},true,['decrypt']);
return new Uint8Array(await crypto.subtle.exportKey('raw',k));}
(async()=>{let s=null;try{s=localStorage.getItem(K)}catch(e){}if(s){try{await dec(u(s));return}catch(e){try{localStorage.removeItem(K)}catch(_){}}}})();
document.getElementById('f').onsubmit=async ev=>{ev.preventDefault();const E=document.getElementById('e'),g=document.getElementById('go');E.textContent='';g.disabled=true;g.textContent='Vérification…';
try{const raw=await derive(document.getElementById('p').value);
if(document.getElementById('r').checked){try{localStorage.setItem(K,btoa(String.fromCharCode(...raw)))}catch(e){}}
await dec(raw);}catch(e){E.textContent='Mot de passe incorrect';g.disabled=false;g.textContent='Entrer';try{localStorage.removeItem(K)}catch(_){}}};
</script></body></html>`;
fs.writeFileSync(process.argv[3],loader); console.log('ok',loader.length);
