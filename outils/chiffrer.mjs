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
const loader=`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#0f1512"><title>L'expert NRBC</title>
<style>
*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:#0f1512;color:#e8efe9;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
body{min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px 18px;
background:radial-gradient(ellipse at 50% 0%,rgba(242,201,76,.10),transparent 60%),radial-gradient(ellipse at 50% 110%,rgba(48,164,108,.12),transparent 55%),#0f1512;overflow-x:hidden}
.stripe{position:fixed;left:0;right:0;height:10px;background:repeating-linear-gradient(-45deg,#f2c94c 0 14px,#14181f 14px 28px);opacity:.9}
.stripe.t{top:0}.stripe.b{bottom:0}
.wrap{width:min(100%,400px);text-align:center;animation:in .6s ease-out}
@keyframes in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.logo{position:relative;width:118px;height:118px;margin:0 auto 14px}
.logo .ring{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(242,201,76,.35);animation:pulse 3s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.08);opacity:1}}
.logo .disc{position:absolute;inset:12px;border-radius:50%;background:#f2c94c;display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(242,201,76,.35)}
.logo svg{width:76px;height:76px}
h1{margin:0;font-size:30px;letter-spacing:2px;font-weight:900}
h1 span{color:#f2c94c}
.tag{margin:8px auto 18px;font-size:16px;line-height:1.4;color:#c9d6cc;max-width:330px}
.tag b{color:#fff}
.dom{display:flex;justify-content:center;gap:8px;margin-bottom:22px}
.dom div{width:62px;padding:8px 0 6px;border-radius:10px;background:#18211c;border:1px solid #26332b;font-size:11px;color:#9fb3a5}
.dom div b{display:block;font-size:20px;color:#f2c94c;line-height:1.1}
.card{background:#151d19;border:1px solid #26332b;border-radius:16px;padding:18px;box-shadow:0 10px 30px rgba(0,0,0,.35)}
.card p{margin:0 0 10px;font-size:14px;color:#9fb3a5}
input[type=password]{width:100%;padding:14px 16px;border-radius:12px;border:1px solid #33443a;background:#0f1512;color:#fff;font-size:18px;letter-spacing:2px;outline:none;transition:border-color .2s}
input[type=password]:focus{border-color:#f2c94c}
label{display:flex;align-items:center;justify-content:center;gap:8px;margin:12px 0 4px;font-size:14px;color:#c9d6cc}
input[type=checkbox]{width:18px;height:18px;accent-color:#30a46c}
button{width:100%;margin-top:12px;padding:15px;border:0;border-radius:12px;background:#f2c94c;color:#14181f;font-size:17px;font-weight:800;letter-spacing:1px;cursor:pointer;transition:transform .1s,filter .2s}
button:active{transform:scale(.98)}button:disabled{filter:grayscale(.6) brightness(.8)}
#e{min-height:22px;margin-top:10px;font-size:14px;font-weight:600}
.ko{color:#ff6b5b}.okm{color:#30a46c}.sh{animation:sh .35s}
@keyframes sh{20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
.ft{margin-top:18px;font-size:12px;color:#6f8476}
#bk{position:fixed;inset:0;z-index:50;display:none;overflow:hidden;background:radial-gradient(circle at 50% 50%,#fff8d6 0,#f2c94c 18%,#1b2420 55%,#0b0f0d 100%)}
#bk.on{display:block}
.door{position:absolute;top:0;bottom:0;width:50.5%;background:linear-gradient(90deg,#4b545c,#6b747c 40%,#59626a);box-shadow:inset 0 0 40px rgba(0,0,0,.55);transition:transform 1.25s cubic-bezier(.55,0,.35,1)}
.door.l{left:0;border-right:3px solid #2b3036}.door.r{right:0;border-left:3px solid #2b3036}
.door:before{content:"";position:absolute;left:0;right:0;top:46%;height:8%;background:repeating-linear-gradient(-45deg,#f2c94c 0 18px,#14181f 18px 36px);opacity:.92}
.door:after{content:"";position:absolute;inset:14px;background:radial-gradient(circle,#2b3036 3px,transparent 4px) 0 0/34px 34px;opacity:.7}
#bk.open .door.l{transform:translateX(-102%)}#bk.open .door.r{transform:translateX(102%)}
.wheel{position:absolute;left:50%;top:50%;width:150px;height:150px;margin:-75px 0 0 -75px;z-index:3;transition:transform .9s cubic-bezier(.6,0,.3,1),opacity .3s}
#bk.turn .wheel{transform:rotate(300deg)}#bk.open .wheel{opacity:0}
.lamp{position:absolute;left:50%;top:14%;width:26px;height:26px;margin-left:-13px;border-radius:50%;background:#e5484d;box-shadow:0 0 18px #e5484d;z-index:3;transition:background .2s,box-shadow .2s}
#bk.ok .lamp{background:#30a46c;box-shadow:0 0 22px #30a46c}#bk.open .lamp{opacity:0}
.bkt{position:absolute;left:0;right:0;bottom:16%;text-align:center;z-index:3;font:900 26px/1.2 system-ui,sans-serif;letter-spacing:3px;color:#f2c94c;text-shadow:0 2px 0 #14181f,0 0 14px rgba(0,0,0,.8);transition:opacity .3s}
.bkt small{display:block;font-size:13px;letter-spacing:2px;color:#e8efe9;margin-top:6px}
#bk.open .bkt{opacity:0}
</style></head><body><div class="stripe t"></div>
<div class="wrap"><div class="logo"><div class="ring"></div><div class="disc"><svg viewBox="-50 -50 100 100"><g fill="#14181f"><path id="b" d="M0-9 L-17-38 A42 42 0 0 1 17-38 Z"/><use href="#b" transform="rotate(120)"/><use href="#b" transform="rotate(240)"/><circle r="7"/></g></svg></div></div>
<h1>L'EXPERT <span>NRBC</span></h1>
<p class="tag">Prépare-toi à devenir <b>le meilleur spécialiste de la 38</b>.</p>
<div class="dom"><div><b>N</b>Nucléaire</div><div><b>R</b>Rad</div><div><b>B</b>Bio</div><div><b>C</b>Chimique</div></div>
<div class="card" id="cd"><p>Accès réservé : entre le code transmis par ton formateur.</p>
<form id="f"><input id="p" type="password" placeholder="Code d'accès" autocomplete="current-password" autocapitalize="off" spellcheck="false">
<label><input id="r" type="checkbox" checked>Se souvenir sur cet appareil</label>
<button id="go">ENTRER EN ZONE</button><div id="e"></div></form></div>
<div class="ft">Interventions TMD · TMR · BIO · CHIM · RAD · quiz RAD et RCH</div></div>
<div class="stripe b"></div>
<div id="bk"><div class="door l"></div><div class="door r"></div><div class="lamp"></div>
<svg class="wheel" viewBox="-60 -60 120 120"><circle r="54" fill="none" stroke="#2b3036" stroke-width="12"/><circle r="54" fill="none" stroke="#9aa3ab" stroke-width="7"/><g stroke="#9aa3ab" stroke-width="8" stroke-linecap="round"><line x1="0" y1="-50" x2="0" y2="50"/><line x1="-50" y1="0" x2="50" y2="0"/><line x1="-35" y1="-35" x2="35" y2="35"/><line x1="-35" y1="35" x2="35" y2="-35"/></g><circle r="16" fill="#f2c94c" stroke="#14181f" stroke-width="4"/><circle r="5" fill="#14181f"/></svg>
<div class="bkt">ACCÈS AUTORISÉ<small>OUVERTURE DU SAS</small></div></div>
<script>
const S="${b(salt)}",I="${b(iv)}",C="${b(ct)}",IT=${IT},K="nrbc_k";
const u=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function dec(raw){const k=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']);
const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:u(I)},k,u(C));return new TextDecoder().decode(pt);}
function open_(h){document.open();document.write(h);document.close();}
let AC=null;function ac(){try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();}catch(e){}return AC;}
function tone(f,t0,d,type,v,f2){const a=AC;if(!a)return;const o=a.createOscillator(),g=a.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,a.currentTime+t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,a.currentTime+t0+d);g.gain.setValueAtTime(0.0001,a.currentTime+t0);g.gain.exponentialRampToValueAtTime(v||.3,a.currentTime+t0+.02);g.gain.exponentialRampToValueAtTime(0.0001,a.currentTime+t0+d);o.connect(g).connect(a.destination);o.start(a.currentTime+t0);o.stop(a.currentTime+t0+d+.05);}
function noise(t0,d,fc,v,q,fc2){const a=AC;if(!a)return;const n=a.createBufferSource(),buf=a.createBuffer(1,a.sampleRate*d,a.sampleRate),x=buf.getChannelData(0);for(let i=0;i<x.length;i++)x[i]=Math.random()*2-1;n.buffer=buf;const fl=a.createBiquadFilter();fl.type="bandpass";fl.Q.value=q||1;fl.frequency.setValueAtTime(fc,a.currentTime+t0);if(fc2)fl.frequency.exponentialRampToValueAtTime(fc2,a.currentTime+t0+d);const g=a.createGain();g.gain.setValueAtTime(0.0001,a.currentTime+t0);g.gain.exponentialRampToValueAtTime(v,a.currentTime+t0+.05);g.gain.exponentialRampToValueAtTime(0.0001,a.currentTime+t0+d);n.connect(fl).connect(g).connect(a.destination);n.start(a.currentTime+t0);}
function bunker(h,fast){const B=document.getElementById('bk');B.className='on';if(navigator.vibrate)navigator.vibrate([30,60,30]);
 if(AC){tone(880,.05,.12,"square",.12);tone(1320,.2,.16,"square",.12);
  noise(.35,.9,500,.35,3,180);tone(70,.35,.9,"sawtooth",.18,55);
  tone(45,1.25,.35,"sine",.6);noise(1.25,.12,900,.5,1);
  noise(1.45,.8,3000,.35,.7,6000);
  tone(38,1.6,1.4,"sawtooth",.22,30);noise(1.6,1.4,220,.3,2,120);}
 const k=fast?.6:1;
 setTimeout(()=>B.classList.add('ok'),180*k);setTimeout(()=>B.classList.add('turn'),350*k);
 setTimeout(()=>{B.classList.add('open');if(navigator.vibrate)navigator.vibrate(120);},1450*k);
 setTimeout(()=>open_(h),2800*k);}
async function derive(pw){const b=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
const k=await crypto.subtle.deriveKey({name:'PBKDF2',salt:u(S),iterations:IT,hash:'SHA-256'},b,{name:'AES-GCM',length:256},true,['decrypt']);
return new Uint8Array(await crypto.subtle.exportKey('raw',k));}
(async()=>{let s=null;try{s=localStorage.getItem(K)}catch(e){}if(s){try{const h=await dec(u(s));return bunker(h,true)}catch(e){try{localStorage.removeItem(K)}catch(_){}}}document.getElementById('p').focus();})();
document.getElementById('f').onsubmit=async ev=>{ev.preventDefault();ac();const E=document.getElementById('e'),g=document.getElementById('go');E.className='';E.textContent='Vérification…';g.disabled=true;
try{const raw=await derive(document.getElementById('p').value.trim());const h=await dec(raw);
if(document.getElementById('r').checked){try{localStorage.setItem(K,btoa(String.fromCharCode(...raw)))}catch(e){}}
E.className='okm';E.textContent='Accès autorisé ✔';bunker(h)}catch(e){E.className='ko';E.textContent='Code incorrect';const c=document.getElementById('cd');c.classList.remove('sh');void c.offsetWidth;c.classList.add('sh');if(navigator.vibrate)navigator.vibrate([60,40,60]);g.disabled=false;document.getElementById('p').value='';}};
</script></body></html>`;
fs.writeFileSync(process.argv[3],loader); console.log('ok',loader.length);
