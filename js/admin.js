(function(){
"use strict";
const $ = id => document.getElementById(id);
const $$ = s => [...document.querySelectorAll(s)];
const CFG = window.DAFTAR_CONFIG || {};
const sb = (window.supabase && CFG.supabaseUrl && CFG.supabaseAnonKey && !/YOUR-/.test(CFG.supabaseUrl))
  ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey) : null;

const DEC = {IQD:0, USD:2, GBP:2, EUR:2, TRY:2, AED:2};
const TYPE = {income:"Income", expense:"Expense", transfer:"Transfer", exchange:"Exchange", debt:"Debt"};
const DIR = {lent:"Lent", borrowed:"Borrowed", collected:"Paid back to them", repaid:"Paid back"};
const PAGE = 50;
const A = { me:null, view:"dash", users:[], tx:{page:0, rows:[], count:0}, editTx:null, editUser:null };

/* ---------- helpers ---------- */
function esc(s){ return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function nfmt(n,c){ const d=DEC[c]??2; return new Intl.NumberFormat("en-US",{minimumFractionDigits:d,maximumFractionDigits:d}).format(Math.abs(n)); }
function fmt(n,c,sign){ const p=sign?(n>0?"+":n<0?"−":""):(n<0?"−":""); return `<span class="money" dir="ltr"><span class="num">${p}${nfmt(n,c)}</span><small class="cur">${esc(c||"")}</small></span>`; }
function dshort(s){ return s ? new Date(String(s).slice(0,10)+"T00:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}) : "—"; }
function dtime(s){ return s ? new Date(s).toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"}) : "—"; }
function ymd(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function parseAmt(v){ const n=parseFloat(String(v).replace(/[,\s]/g,"")); return isFinite(n)?n:NaN; }
let toastT; function toast(m){ const e=$("toast"); e.textContent=m; e.classList.add("on"); clearTimeout(toastT); toastT=setTimeout(()=>e.classList.remove("on"),2400); }
async function must(q){ const {data,error,count}=await q; if(error) throw error; return count!=null?{data,count}:data; }
function errMsg(e){ return e?.message || "Something went wrong. Try again."; }
function avatarOf(u){ return [...(u?.full_name||u?.email||"?").trim()][0]?.toUpperCase()||"?"; }
function userLabel(u){ return u ? (u.full_name || u.email) : "Deleted user"; }
function curOfEntry(e){ return e.account_currency || e.currency || "IQD"; }
function cashIn(e){ return e.dir==="borrowed" || e.dir==="collected"; }
function amountHTML(e){
  const c=curOfEntry(e), a=+e.amount;
  if(e.type==="income") return `<span class="pos">${fmt(a,c,true)}</span>`;
  if(e.type==="expense") return `<span class="neg">${fmt(-a,c,true)}</span>`;
  if(e.type==="debt") return e.account ? (cashIn(e)?`<span class="pos">${fmt(a,c,true)}</span>`:`<span class="neg">${fmt(-a,c,true)}</span>`) : fmt(a,c);
  const tc=e.to_account_currency||c, r=e.to_amount!=null?+e.to_amount:a;
  if(tc!==c) return `<span class="two"><span class="neg">${fmt(-a,c,true)}</span><span class="pos">${fmt(r,tc,true)}</span></span>`;
  return fmt(a,c);
}
function whatHTML(e){
  if(e.type==="debt") return `${esc(DIR[e.dir]||"Debt")} · ${esc(e.person_name||"Deleted person")}`;
  if(e.type==="transfer"||e.type==="exchange") return `${esc(e.account_name||"—")} → ${esc(e.to_account_name||"—")}`;
  return esc(e.category||"Other");
}
function acctHTML(e){
  if(e.type==="transfer"||e.type==="exchange") return "";
  return e.account ? esc(e.account_name||"Deleted account") : `<span class="hint">No cash moved</span>`;
}

/* ---------- sheets ---------- */
const SHEETS=["userSheet","addSheet","txSheet"];
function openSheet(id){ SHEETS.forEach(k=>{ if(k!==id){ $(k).hidden=true; $(k).classList.remove("in"); } });
  $("scrim").hidden=false; $(id).hidden=false; $(id).querySelector(".sheet-b").scrollTop=0;
  requestAnimationFrame(()=>{ $("scrim").classList.add("in"); $(id).classList.add("in"); }); }
function closeSheets(){ $("scrim").classList.remove("in"); SHEETS.forEach(k=>$(k).classList.remove("in"));
  setTimeout(()=>{ $("scrim").hidden=true; SHEETS.forEach(k=>$(k).hidden=true); },200); }
$("scrim").addEventListener("click",closeSheets);
$$("[data-close]").forEach(b=>b.addEventListener("click",closeSheets));
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeSheets(); });

/* ---------- views ---------- */
function setView(v){
  A.view=v;
  $$(".tab").forEach(t=>t.setAttribute("aria-current",t.dataset.view===v?"page":"false"));
  ["dash","users","tx"].forEach(k=>$("v-"+k).hidden=k!==v);
  window.scrollTo({top:0});
  if(v==="dash") loadDash(); if(v==="users") loadUsers(); if(v==="tx") loadTx();
}
document.addEventListener("click",e=>{
  const t=e.target.closest(".tab"); if(t) return setView(t.dataset.view);
  const g=e.target.closest("[data-go]"); if(g) return setView(g.dataset.go);
  if(e.target.closest("[data-refresh]")) return loadDash();
  const u=e.target.closest("[data-user]"); if(u) return openUser(u.dataset.user);
  const x=e.target.closest("[data-tx]"); if(x) return openTx(x.dataset.tx);
});

/* ---------- dashboard ---------- */
async function loadDash(){
  $("kpis").innerHTML=`<div class="rtile"><span class="hint">Loading…</span></div>`;
  try{
    const now=new Date(), m0=ymd(new Date(now.getFullYear(),now.getMonth(),1)), d30=new Date(Date.now()-30*864e5).toISOString();
    const [users, all, month, latest] = await Promise.all([
      must(sb.from("admin_users").select("*").order("created_at",{ascending:false})),
      must(sb.from("entries").select("id",{count:"estimated",head:true})),
      fetchRange(q=>q.gte("date",m0)),
      must(sb.from("admin_entries").select("*").order("updated_at",{ascending:false}).limit(10))
    ]);
    A.users=users; fillUserFilter();
    // Estimated count uses planner stats (no full scan). It comes back null only for a
    // small/un-analysed table, where an exact count is cheap — fall back to it there.
    let txCount=all.count;
    if(txCount==null) txCount=(await must(sb.from("entries").select("id",{count:"exact",head:true}))).count||0;
    const active=users.filter(u=>u.last_activity && u.last_activity>=d30).length;
    const disabled=users.filter(u=>u.disabled).length;
    $("kpis").innerHTML=[
      ["Users",users.length,""], ["Active in 30 days",active,"good"], ["Transactions",txCount,""], ["This month",month.length,""], ["Disabled",disabled,disabled?"bad":""]
    ].slice(0,4).map(([l,n,c])=>`<div class="rtile ${c}"><span class="lbl">${esc(l)}</span><span class="n">${n.toLocaleString("en-US")}</span></div>`).join("");
    $("dashMonth").textContent=now.toLocaleDateString("en-GB",{month:"long",year:"numeric"});
    const by={}; month.forEach(e=>{ const c=curOfEntry(e); by[c]??={i:0,o:0,n:0}; by[c].n++;
      if(e.type==="income" && !/^opening/i.test(e.category||"")) by[c].i+=+e.amount; else if(e.type==="expense") by[c].o+=+e.amount; });
    const cs=Object.keys(by);
    $("dashCur").innerHTML = cs.length ? `<table class="mstats"><thead><tr><th>Currency</th><th>Entries</th><th>Income</th><th>Spent</th></tr></thead><tbody>${
      cs.map(c=>`<tr><td>${esc(c)}</td><td>${by[c].n}</td><td class="pos">${fmt(by[c].i,c)}</td><td class="neg">${fmt(by[c].o,c)}</td></tr>`).join("")}</tbody></table>${
      month.capped?`<div class="hint" style="margin-top:8px">Approximate — based on the most recent ${month.length.toLocaleString("en-US")} entries this month.</div>`:""}`
      : `<div class="empty-sm">Nothing recorded this month yet.</div>`;
    $("dashUsers").innerHTML = users.length ? `<div class="dash-u">${users.slice(0,6).map(u=>`<button class="arow" type="button" data-user="${esc(u.id)}"><span class="ico avatar">${esc(avatarOf(u))}</span><span style="min-width:0"><div class="nm">${esc(userLabel(u))}</div><div class="kd">${esc(u.email||"")}</div></span><span class="hint">${esc(dshort(u.created_at))}</span></button>`).join("")}</div>` : `<div class="empty-sm">No users yet.</div>`;
    $("dashTx").innerHTML = txTable(latest,true);
  }catch(e){ $("kpis").innerHTML=`<div class="rtile bad"><span class="err">${esc(errMsg(e))}</span></div>`; }
}
async function fetchRange(apply){
  // Cap the pull so the dashboard stays responsive no matter how many rows exist:
  // at most 5 pages of 1000 (5000 rows). out.capped flags that the sample was truncated.
  const out=[], MAXP=5; out.capped=false;
  for(let p=0;p<MAXP;p++){ const from=p*1000; const rows=await must(apply(sb.from("admin_entries").select("*")).order("id").range(from,from+999)); out.push(...rows); if(rows.length<1000) break; if(p===MAXP-1) out.capped=true; }
  return out;
}

/* ---------- users ---------- */
function fillUserFilter(){
  const sel=$("tUser"), keep=sel.value;
  sel.innerHTML=`<option value="">All users</option>`+[...A.users].sort((a,b)=>userLabel(a).localeCompare(userLabel(b))).map(u=>`<option value="${esc(u.id)}">${esc(userLabel(u))}${u.full_name?` · ${esc(u.email)}`:""}</option>`).join("");
  sel.value=keep;
}
async function loadUsers(){
  $("usersOut").innerHTML=`<div class="empty">Loading…</div>`;
  try{ A.users=await must(sb.from("admin_users").select("*").order("created_at",{ascending:false})); fillUserFilter(); renderUsers(); }
  catch(e){ $("usersOut").innerHTML=`<div class="empty err">${esc(errMsg(e))}</div>`; }
}
function renderUsers(){
  const q=$("uQ").value.trim().toLowerCase(), r=$("uRole").value, st=$("uStatus").value;
  const list=A.users.filter(u=>(!q||(u.email||"").toLowerCase().includes(q)||(u.full_name||"").toLowerCase().includes(q))
    && (!r||u.role===r) && (!st||(st==="disabled")===!!u.disabled));
  $("usersOut").innerHTML = `<table class="gl users"><thead><tr><th>User</th><th>Role</th><th>Status</th><th class="n">Accounts</th><th class="n">Entries</th><th>Last activity</th><th>Joined</th></tr></thead><tbody>${
    list.map(u=>`<tr class="tx" data-user="${esc(u.id)}" tabindex="0"><td><b>${esc(u.full_name||"—")}</b><span class="em">${esc(u.email||"")}</span></td>
      <td><span class="pill ${u.role==="admin"?"admin":""}">${u.role==="admin"?"Admin":"User"}</span></td>
      <td><span class="pill ${u.disabled?"off":"on"}">${u.disabled?"Disabled":"Active"}</span></td>
      <td class="n">${u.accounts_count}</td><td class="n">${u.entries_count}</td>
      <td class="date">${esc(u.last_activity?dtime(u.last_activity):"—")}</td><td class="date">${esc(dshort(u.created_at))}</td></tr>`).join("")
    || `<tr><td colspan="7" class="empty">No users match.</td></tr>`}</tbody></table>`;
}
["uQ","uRole","uStatus"].forEach(id=>$(id).addEventListener("input",renderUsers));

async function openUser(id){
  A.editUser=id;
  const u=A.users.find(x=>x.id===id) || (await must(sb.from("admin_users").select("*").eq("id",id)))[0];
  if(!u) return toast("User not found");
  $("uH").textContent=userLabel(u);
  $("userBody").innerHTML=`<div class="empty">Loading…</div>`; openSheet("userSheet");
  try{
    const [accts, ents] = await Promise.all([
      must(sb.from("accounts").select("*").eq("user_id",id).order("created_ms")),
      must(sb.from("admin_entries").select("*").eq("user_id",id).order("date",{ascending:false}).limit(2000))
    ]);
    const bal={}; accts.forEach(a=>bal[a.id]=+a.opening||0);
    ents.forEach(e=>{ const a=+e.amount;
      if(e.type==="income"&&e.account in bal) bal[e.account]+=a;
      else if(e.type==="expense"&&e.account in bal) bal[e.account]-=a;
      else if(e.type==="debt"&&e.account in bal) bal[e.account]+=cashIn(e)?a:-a;
      else if(e.type==="transfer"||e.type==="exchange"){ if(e.account in bal) bal[e.account]-=a; if(e.to_account in bal) bal[e.to_account]+=e.to_amount!=null?+e.to_amount:a; } });
    const self=id===A.me.id;
    $("userBody").innerHTML=`
      <div class="me-card"><span class="ico avatar me-av">${esc(avatarOf(u))}</span><div style="min-width:0"><div class="nm">${esc(u.full_name||"—")}</div><div class="hint">${esc(u.email||"")}</div></div></div>
      <div class="ugrid"><div><span class="lbl">Role</span><span class="v">${u.role==="admin"?"Admin":"User"}</span></div>
        <div><span class="lbl">Status</span><span class="v ${u.disabled?"neg":"pos"}">${u.disabled?"Disabled":"Active"}</span></div>
        <div><span class="lbl">Joined</span><span class="v" style="font-size:14px">${esc(dshort(u.created_at))}</span></div></div>
      <div class="actions">
        <button class="btn" type="button" id="uTx">View transactions</button>
        ${self?"":`<button class="btn" type="button" id="uRoleBtn">${u.role==="admin"?"Remove admin":"Make admin"}</button>
        <button class="btn ${u.disabled?"":"danger"}" type="button" id="uDis">${u.disabled?"Enable account":"Disable account"}</button>`}
      </div>
      <div class="f full"><label for="uName">Full name</label><div class="dq"><input id="uName" value="${esc(u.full_name||"")}"><button class="btn" type="button" id="uNameBtn">Save</button></div></div>
      <div class="sec-h">Accounts (${accts.length})</div>
      <div class="mini-list">${accts.map(a=>`<div class="mini-row"><span><b>${esc(a.name)}</b><div class="s">${esc(a.kind)} · ${esc(a.currency)}</div></span><span class="${bal[a.id]<0?"neg":""}">${fmt(bal[a.id],a.currency)}</span></div>`).join("")||`<div class="empty-sm">No accounts.</div>`}</div>
      <div class="sec-h">Recent transactions</div>
      <div class="mini-list">${ents.slice(0,12).map(e=>`<div class="mini-row" data-tx="${esc(e.id)}" style="cursor:pointer"><span><b>${whatHTML(e)}</b><div class="s">${esc(TYPE[e.type])} · ${esc(dshort(e.date))}${e.note?" · "+esc(e.note):""}</div></span><span>${amountHTML(e)}</span></div>`).join("")||`<div class="empty-sm">Nothing recorded.</div>`}</div>
      ${self?"":`<div class="sec-h" style="color:var(--out)">Danger zone</div>
      <p class="hint" style="margin:0">Deletes this person's profile and every account, entry and person they recorded. They will no longer be able to use the app. To remove the login itself, also delete it in Supabase → Authentication → Users.</p>
      <div class="actions"><button class="btn danger" type="button" id="uDel">Delete user and all data</button></div>`}`;
    A.userEntries=ents;
    $("uTx").onclick=()=>{ closeSheets(); $("tUser").value=id; A.tx.page=0; setView("tx"); };
    $("uNameBtn").onclick=()=>updateProfile(id,{full_name:$("uName").value.trim()},"Name saved");
    if(!self){
      $("uRoleBtn").onclick=()=>updateProfile(id,{role:u.role==="admin"?"user":"admin"},u.role==="admin"?"Admin access removed":"Now an admin");
      $("uDis").onclick=()=>updateProfile(id,{disabled:!u.disabled},u.disabled?"Account enabled":"Account disabled");
      $("uDel").onclick=async e=>{ const b=e.currentTarget;
        if(!b.classList.contains("confirm")){ b.classList.add("confirm"); b.textContent="Tap again to delete everything"; return; }
        try{ await must(sb.from("profiles").delete().eq("id",id)); closeSheets(); toast("User and data deleted"); loadUsers(); }
        catch(err){ toast(errMsg(err)); } };
    }
  }catch(e){ $("userBody").innerHTML=`<div class="empty err">${esc(errMsg(e))}</div>`; }
}
async function updateProfile(id,patch,msg){
  try{ await must(sb.from("profiles").update(patch).eq("id",id)); toast(msg);
    A.users=await must(sb.from("admin_users").select("*").order("created_at",{ascending:false})); renderUsers(); fillUserFilter(); openUser(id); }
  catch(e){ toast(errMsg(e)); }
}

/* add user: signs up on a separate client so the admin stays signed in */
$("addUserBtn").addEventListener("click",()=>{ ["nName","nEmail","nPass"].forEach(i=>$(i).value=""); $("addErr").hidden=true; openSheet("addSheet"); setTimeout(()=>$("nName").focus(),30); });
$("addForm").addEventListener("submit",async ev=>{
  ev.preventDefault(); const err=$("addErr"); err.hidden=true;
  const name=$("nName").value.trim(), email=$("nEmail").value.trim(), pass=$("nPass").value;
  const fail=m=>{ err.textContent=m; err.hidden=false; };
  if(!name) return fail("Enter their name."); if(!/^\S+@\S+\.\S+$/.test(email)) return fail("Enter a valid email."); if(pass.length<6) return fail("Password must be at least 6 characters.");
  $("addGo").disabled=true;
  try{
    const tmp=window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false,storageKey:"daftar-admin-tmp"}});
    const {data,error}=await tmp.auth.signUp({email,password:pass,options:{data:{full_name:name}}});
    if(error) throw error;
    if(data.user && Array.isArray(data.user.identities) && !data.user.identities.length) throw new Error("This email already has an account.");
    closeSheets(); toast(data.session?"User created. They can sign in now.":"User created. They must confirm their email before signing in.");
    loadUsers();
  }catch(e){ fail(errMsg(e)); } finally{ $("addGo").disabled=false; }
});

/* ---------- transactions ---------- */
function txQuery(q){
  const u=$("tUser").value, ty=$("tType").value, f=$("tFrom").value, to=$("tTo").value, s=$("tQ").value.trim().replace(/[%,()]/g," ");
  if(u) q=q.eq("user_id",u); if(ty) q=q.eq("type",ty); if(f) q=q.gte("date",f); if(to) q=q.lte("date",to);
  if(s) q=q.or(`note.ilike.%${s}%,category.ilike.%${s}%,person_name.ilike.%${s}%,account_name.ilike.%${s}%`);
  return q;
}
function txTable(rows,compact){
  if(!rows.length) return `<div class="empty">No transactions.</div>`;
  return `<table class="gl tx"><thead><tr><th>Date</th><th>User</th><th>Type</th><th>What</th><th>Account</th><th>Note</th><th class="n">Amount</th></tr></thead><tbody>${
    rows.map(e=>`<tr class="tx" data-tx="${esc(e.id)}" tabindex="0"><td class="date">${esc(dshort(e.date))}</td>
      <td>${esc(e.full_name||e.email||"")}${compact||!e.full_name?"":`<span class="em">${esc(e.email)}</span>`}</td>
      <td><span class="vt ${esc(e.type)}">${esc(TYPE[e.type]||e.type)}</span></td><td class="against">${whatHTML(e)}</td><td>${acctHTML(e)}</td>
      <td class="rem">${esc(e.note||"")}</td><td class="n">${amountHTML(e)}</td></tr>`).join("")}</tbody></table>`;
}
let txT=null;
async function loadTx(){
  $("txOut").innerHTML=`<div class="empty">Loading…</div>`;
  if(!A.users.length){ try{ A.users=await must(sb.from("admin_users").select("*")); fillUserFilter(); }catch(e){} }
  try{
    const from=A.tx.page*PAGE;
    const {data,count}=await must(txQuery(sb.from("admin_entries").select("*",{count:"exact"})).order("date",{ascending:false}).order("created_ms",{ascending:false}).range(from,from+PAGE-1));
    A.tx.rows=data; A.tx.count=count||0;
    $("txOut").innerHTML=txTable(data);
    $("txCount").textContent=count?`${from+1}–${from+data.length} of ${count.toLocaleString("en-US")}`:"";
    $("txPrev").disabled=A.tx.page===0; $("txNext").disabled=from+data.length>=count;
  }catch(e){ $("txOut").innerHTML=`<div class="empty err">${esc(errMsg(e))}</div>`; }
}
["tUser","tType","tFrom","tTo"].forEach(id=>$(id).addEventListener("change",()=>{ A.tx.page=0; loadTx(); }));
$("tQ").addEventListener("input",()=>{ clearTimeout(txT); txT=setTimeout(()=>{ A.tx.page=0; loadTx(); },300); });
$("txPrev").addEventListener("click",()=>{ if(A.tx.page>0){ A.tx.page--; loadTx(); } });
$("txNext").addEventListener("click",()=>{ A.tx.page++; loadTx(); });
$("txExport").addEventListener("click",async ()=>{
  try{
    const rows=[]; for(let from=0;from<20000;from+=1000){ const r=await must(txQuery(sb.from("admin_entries").select("*")).order("date",{ascending:false}).range(from,from+999)); rows.push(...r); if(r.length<1000) break; }
    const q=v=>`"${String(v??"").replace(/"/g,'""')}"`;
    const lines=[["Date","User","Email","Type","Category","Direction","Person","Account","Currency","Amount","To account","To currency","To amount","Note","Last changed"].join(",")]
      .concat(rows.map(e=>[e.date,e.full_name,e.email,e.type,e.category,e.dir,e.person_name,e.account_name,curOfEntry(e),e.amount,e.to_account_name,e.to_account_currency,e.to_amount,e.note,e.updated_at].map(q).join(",")));
    const url=URL.createObjectURL(new Blob(["﻿"+lines.join("\n")],{type:"text/csv;charset=utf-8"}));
    const a=document.createElement("a"); a.href=url; a.download=`daftar-transactions-${ymd(new Date())}.csv`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),4000);
    toast(`Exported ${rows.length} transactions`);
  }catch(e){ toast(errMsg(e)); }
});

async function openTx(id){
  let e=A.tx.rows.find(x=>x.id===id) || (A.userEntries||[]).find(x=>x.id===id);
  if(!e){ try{ e=(await must(sb.from("admin_entries").select("*").eq("id",id)))[0]; }catch(err){} }
  if(!e) return toast("Transaction not found");
  A.editTx=e; $("txErr").hidden=true;
  const two=e.type==="transfer"||e.type==="exchange";
  $("txH").textContent=`Edit ${TYPE[e.type].toLowerCase()}`;
  $("txWho").innerHTML=`<span class="ico avatar me-av">${esc([...(e.full_name||e.email||"?")][0].toUpperCase())}</span><div style="min-width:0"><div class="nm">${esc(e.full_name||e.email)}</div><div class="hint">${whatHTML(e)}${acctHTML(e)&&!two?" · "+acctHTML(e):""}</div></div>`;
  $("eAmount").value=e.amount; $("eDate").value=e.date; $("eNote").value=e.note||""; $("eCat").value=e.category||"";
  $("eToWrap").hidden=!(two && e.to_amount!=null); $("eToAmount").value=e.to_amount??"";
  $("eCatWrap").hidden=e.type!=="income"&&e.type!=="expense";
  $("txMeta").textContent=`Last changed ${dtime(e.updated_at)} · id ${e.id}`;
  const d=$("txDel"); d.classList.remove("confirm"); d.textContent="Delete";
  if(!$("userSheet").hidden) $("userSheet").hidden=true;
  openSheet("txSheet");
}
$("txForm").addEventListener("submit",async ev=>{
  ev.preventDefault(); const e=A.editTx, err=$("txErr"); err.hidden=true;
  const amount=parseAmt($("eAmount").value); if(!(amount>0)){ err.textContent="Enter an amount greater than zero."; err.hidden=false; return; }
  const patch={amount, date:$("eDate").value||e.date, note:$("eNote").value.trim()};
  if(!$("eCatWrap").hidden) patch.category=$("eCat").value.trim()||"Other";
  if(!$("eToWrap").hidden){ const ta=parseAmt($("eToAmount").value); if(!(ta>0)){ err.textContent="Enter the amount received."; err.hidden=false; return; } patch.to_amount=ta; }
  try{ await must(sb.from("entries").update(patch).eq("id",e.id)); closeSheets(); toast("Transaction updated"); refreshView(); }
  catch(x){ err.textContent=errMsg(x); err.hidden=false; }
});
$("txDel").addEventListener("click",async ()=>{
  const b=$("txDel"); if(!b.classList.contains("confirm")){ b.classList.add("confirm"); b.textContent="Tap again to delete"; return; }
  try{ await must(sb.from("entries").delete().eq("id",A.editTx.id)); closeSheets(); toast("Transaction deleted"); refreshView(); }
  catch(x){ toast(errMsg(x)); }
});
function refreshView(){ if(A.view==="tx") loadTx(); else if(A.view==="dash") loadDash(); else loadUsers(); }

/* ---------- sign in ---------- */
function showAuth(on,msg){ $("auth").hidden=!on; $("app").hidden=on; const e=$("authErr"); e.textContent=msg||""; e.hidden=!msg; }
$("authForm").addEventListener("submit",async ev=>{
  ev.preventDefault(); if(!sb) return;
  $("authGo").disabled=true;
  const {error}=await sb.auth.signInWithPassword({email:$("aEmail").value.trim(),password:$("aPass").value});
  $("authGo").disabled=false;
  if(error) showAuth(true,/invalid login/i.test(error.message)?"Wrong email or password.":error.message);
});
$("outBtn").addEventListener("click",()=>sb.auth.signOut());
let booted=null, pendingMsg="";
async function start(session){
  if(!session){ booted=null; A.me=null; const m=pendingMsg; pendingMsg=""; return showAuth(true,m); }
  if(booted===session.user.id) return; booted=session.user.id;
  let p=null; try{ p=(await must(sb.from("profiles").select("*").eq("id",session.user.id)))[0]; }catch(e){}
  if(!p || p.role!=="admin" || p.disabled){ pendingMsg="This account isn't an admin. Ask an admin to give you access."; booted=null; return sb.auth.signOut(); }
  A.me=p; $("outBtn").textContent=avatarOf(p); $("outBtn").title=`Sign out ${p.email}`;
  showAuth(false); setView("dash");
}
if(!sb){ showAuth(true,"The app isn't connected yet. Add your Supabase keys in config.js."); $("authGo").disabled=true; }
else { sb.auth.onAuthStateChange((ev,s)=>setTimeout(()=>start(s),0)); sb.auth.getSession().then(({data})=>start(data.session)); }
})();
