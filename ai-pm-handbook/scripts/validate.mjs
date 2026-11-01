import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {compile} from '@mdx-js/mdx';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import {validateDocsConfig} from '@mintlify/validation';
import yaml from 'js-yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const pages = new Map();
async function scan(dir) {
  for (const item of await readdir(dir, {withFileTypes:true})) {
    if (item.name.startsWith('.') || item.name === 'node_modules') continue;
    const f=path.join(dir,item.name);
    if(item.isDirectory()) await scan(f);
    else if(item.name.endsWith('.mdx')) pages.set(path.relative(root,f).replace(/\.mdx$/,''), await readFile(f,'utf8'));
  }
}
await scan(root);
const config=JSON.parse(await readFile(path.join(root,'docs.json'),'utf8'));
const schemaResult=validateDocsConfig(config);
if(!schemaResult.success) errors.push(`Mintlify schema: ${schemaResult.error.message}`);
const nav=[];
function navigation(x) {
  if(typeof x==='string') {nav.push(x);return;}
  if(Array.isArray(x)) {x.forEach(navigation);return;}
  if(x && typeof x==='object') for(const k of ['tabs','groups','pages']) if(k in x) navigation(x[k]);
}
navigation(config.navigation);
for(const p of nav) if(!pages.has(p)) errors.push(`Missing navigation page: ${p}`);
for(const p of pages.keys()) if(!nav.includes(p)) errors.push(`Page absent from navigation: ${p}`);
if(new Set(nav).size!==nav.length) errors.push('Duplicate navigation entries');
const anchors=new Map();
const links=[];
let compiled=0;
for(const [p,text] of pages) {
  const {data,content}=matter(text);
  if(!data.title || !data.description) errors.push(`Missing title/description: ${p}`);
  const ids=new Set(); const counts=new Map();
  function inspect(){return function(tree){
    function visit(node){
      if(node.type==='heading') {
        const plain=(n)=>n.value??(n.children??[]).map(plain).join('');
        const base=plain(node).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu,'').replace(/\s/g,'-');
        const n=counts.get(base)??0;counts.set(base,n+1);ids.add(base+(n?`-${n}`:''));
      }
      if(node.type==='link' || node.type==='image') links.push([p,node.url]);
      (node.children??[]).forEach(visit);
    }visit(tree);
  };}
  try {await compile(content,{remarkPlugins:[remarkGfm,inspect]}); compiled++;}
  catch(e){errors.push(`MDX compile failed: ${p}: ${e.message}`);}
  anchors.set(p,ids);
}
let local=0,external=0;
for(const [from,url] of links) {
  if(/^https?:\/\//.test(url)){external++;continue;}
  if(/^[a-z]+:/.test(url)) continue;
  local++;
  const [raw,hash]=url.split('#');
  const target=raw ? (raw.startsWith('/')?raw.slice(1):path.posix.join(path.posix.dirname(from),raw)).replace(/\.mdx?$/,'').replace(/\/$/,'') : from;
  if(!pages.has(target)) errors.push(`Broken local link: ${from} -> ${url}`);
  else if(hash && !anchors.get(target)?.has(decodeURIComponent(hash))) errors.push(`Missing anchor: ${from} -> ${url}`);
}
const sources=yaml.safeLoad(await readFile(path.join(root,'data/sources.yaml'),'utf8'));
const seen=new Set();
for(const s of sources) {
  if(seen.has(s.id)) errors.push(`Duplicate source: ${s.id}`);seen.add(s.id);
  if(!s.url?.startsWith('https://') || !s.status || !s.access_scope) errors.push(`Incomplete source: ${s.id}`);
  if(s.status.startsWith('verified_') && !s.last_reviewed) errors.push(`Missing source review date: ${s.id}`);
  if(!pages.has('library/sources/'+s.id.toLowerCase())) errors.push(`Missing source page: ${s.id}`);
}
console.log(JSON.stringify({mintlifySchema:schemaResult.success,pages:pages.size,navigation:nav.length,compiled,localLinks:local,externalLinkOccurrences:external,sources:sources.length,errors},null,2));
if(errors.length) process.exitCode=1;
