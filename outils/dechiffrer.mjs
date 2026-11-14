// Usage : NRBC_PW='mot de passe' node outils/dechiffrer.mjs index.html jeu.html
import fs from 'fs'; const {subtle}=globalThis.crypto;
const s=fs.readFileSync(process.argv[2],'utf8'); const g=k=>s.match(new RegExp('const S="([^"]+)",I="([^"]+)",C="([^"]+)",IT=(\\d+)'));
const [,S,I,C,IT]=g(); const u=x=>Buffer.from(x,'base64');
const b=await subtle.importKey('raw',new TextEncoder().encode(process.env.NRBC_PW),'PBKDF2',false,['deriveKey']);
const k=await subtle.deriveKey({name:'PBKDF2',salt:u(S),iterations:+IT,hash:'SHA-256'},b,{name:'AES-GCM',length:256},false,['decrypt']);
fs.writeFileSync(process.argv[3],Buffer.from(await subtle.decrypt({name:'AES-GCM',iv:u(I)},k,u(C)))); console.log('ok');
