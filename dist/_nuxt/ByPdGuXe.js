import{u as T,w as ot,F as nt}from"./DD9k1QdI.js";import{u as st}from"./e9yzBt9w.js";import{u as rt}from"./KVrZVMT4.js";import{d as it,r as u,c as p,f as dt,a as w,l as s,j as V,a6 as j,k as o,u as a,F as J,b as c,p as A,m as n,v as R,A as m,z as ut,q as pt,_ as ct}from"./DDya6Ko7.js";import{a as O,V as k}from"./4hNF3y4S.js";import{a as N,V as g}from"./BMaKwbTZ.js";import{V as vt}from"./Cxf8IGDQ.js";import{V as Y}from"./DmhT2V-z.js";import{V as mt}from"./VYBjP7Ds.js";import"./Cpj98o6Y.js";import"./C6KsXkD8.js";import"./5KsvHM6e.js";/* empty css        */import"./C-GTDzx5.js";import"./D3C0GQ2A.js";import"./CPwGJQCD.js";import"./D7-3LGEP.js";import"./BbQAoNaH.js";import"./mbSfkz2A.js";import"./C7D_pBJz.js";import"./DJSvkuLJ.js";import"./BA238dLG.js";const ft={class:"text-h5 font-weight-bold text-primary"},_t={class:"text-h5 font-weight-bold text-info"},gt={key:0},xt={class:"text-center"},ht={class:"text-center"},bt={class:"text-center"},yt={class:"text-center"},Tt={key:2,class:"bg-blue-lighten-5"},wt={class:"text-center font-weight-bold"},kt={class:"text-center font-weight-bold"},St=24,Dt=it({__name:"outlet-transactions",setup($t){const i=u([]),d=u(null),f=u("");function P(e){const t=e.getFullYear(),l=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${l}-${r}`}function S(e){const t=new Date(e),l=String(t.getDate()).padStart(2,"0"),r=String(t.getMonth()+1).padStart(2,"0"),$=t.getFullYear();return`${l}/${r}/${$}`}const F=new Date,x=u(P(F)),h=u(P(F)),{getOutlets:K}=st(),{getPerOutletReports:G}=rt(),_=p(()=>i.value.reduce((e,t)=>e+t.foto_terjual,0)),v=p(()=>i.value.reduce((e,t)=>e+t.total_pendapatan,0)),E=p(()=>_.value),q=p(()=>_.value===0?0:Math.round(v.value/_.value));p(()=>{if(!d.value)return 0;const e=new Date(d.value.start_date),t=new Date(d.value.end_date),l=Math.ceil((t.getTime()-e.getTime())/(1e3*60*60*24))+1;return Math.round(v.value/l)});const H=p(()=>b.value.map(e=>{var t;return{title:`${e.name}${(t=e.unit)!=null&&t.name?` - ${e.unit.name}`:""}`,value:e.id}})),I=p(()=>{const e=x.value.trim(),t=h.value.trim();return e===t?S(e):`${S(e)} - ${S(t)}`}),W=u(1),C=u(0),M=u(!1),b=u([]);async function Q(){M.value=!0;try{const e=await K({page:W.value,limit:St});b.value=(e==null?void 0:e.data)||[],C.value=(e==null?void 0:e.total)||0,console.log("Outlets loaded:",b.value)}catch(e){console.error("Failed to fetch outlets:",e),b.value=[],C.value=0}finally{M.value=!1}}const X=async()=>{if(!f.value){alert("Silakan pilih outlet terlebih dahulu!");return}try{console.log("Fetching transactions for outlet:",f.value,"from",x.value,"to",h.value);const e=await G(f.value,x.value,h.value);d.value=e,i.value=e.data||[],console.log("Report data received:",e)}catch(e){console.error("Error fetching transactions:",e),alert("Terjadi kesalahan saat mengambil data transaksi")}};dt(()=>{Q()});const D=p(()=>b.value.find(e=>e.id===f.value)),L=p(()=>{var l;if(!D.value)return"Unknown";const e=D.value.name,t=(l=D.value.unit)==null?void 0:l.name;return t?`${e} - ${t}`:e}),Z=()=>{var z,B;if(!d.value||i.value.length===0){alert("Data transaksi kosong, tidak bisa diexport!");return}const e=[["LAPORAN TRANSAKSI PER OUTLET"],[""],["Outlet:",L.value],["Periode:",I.value],["Tanggal Export:",S(P(new Date))],[""],["RINGKASAN:"],["Total Pendapatan:",`Rp ${v.value.toLocaleString()}`],["Total Penjualan:",_.value],["Total Foto Terjual:",E.value],[""],["DETAIL PER JENIS FOTO:"],[""]],t=i.value.map((y,lt)=>({No:lt+1,"Jenis Foto":y.photo_type,"Jumlah Foto Terjual":y.foto_terjual,"Total Pendapatan":y.total_pendapatan,"Rata-rata per Transaksi":y.foto_terjual>0?Math.round(y.total_pendapatan/y.foto_terjual):0})),l={No:"","Jenis Foto":"TOTAL","Jumlah Transaksi":_.value,"Total Pendapatan":v.value,"Rata-rata per Transaksi":q.value},r=[...e,...T.sheet_to_json(T.json_to_sheet(t),{header:1}),[""],Object.values(l)],$=T.aoa_to_sheet(r);$["!cols"]=[{width:5},{width:20},{width:18},{width:18},{width:20}];const U=T.book_new();T.book_append_sheet(U,$,"Laporan Per Outlet");const et=ot(U,{bookType:"xlsx",type:"array"}),at=`Laporan_Outlet_${((B=(z=D.value)==null?void 0:z.name)==null?void 0:B.replace(/\s+/g,"_"))||"Unknown"}_${x.value}_${h.value}.xlsx`;nt.saveAs(new Blob([et],{type:"application/octet-stream"}),at)},tt=()=>{if(!d.value){alert("Tidak ada data untuk di-print!");return}const e=`
    <style>
      body { 
        font-family: 'Courier New', monospace; 
        font-size: 8px; 
        margin: 2px; 
        line-height: 1.1;
        width: 58mm;
        max-width: 58mm;
      }
      .header { 
        text-align: center; 
        margin-bottom: 4px; 
        font-size: 9px;
        font-weight: bold;
      }
      .divider { 
        border-top: 1px dashed #000; 
        margin: 2px 0; 
      }
      .row { 
        display: flex; 
        justify-content: space-between; 
        margin: 1px 0;
        font-size: 7px;
      }
      .detail { 
        margin: 1px 0;
        font-size: 7px;
      }
      .bold { font-weight: bold; }
      .center { text-align: center; }
      .total-line { 
        border-top: 1px solid #000; 
        margin-top: 2px; 
        padding-top: 2px;
        font-weight: bold;
      }
      @media print {
        body { margin: 0; width: 58mm; }
        .no-print { display: none; }
      }
    </style>
    
    <div class="header">
      LAPORAN TRANSAKSI OUTLET
      <br>
      ${L.value}
      <br>
      ${I.value}
    </div>

    <div class="divider"></div>
    
    <div class="row bold">
      <span>RINGKASAN:</span>
    </div>
    <div class="row">
      <span>Total Pendapatan:</span>
      <span>Rp${v.value.toLocaleString()}</span>
    </div>
    <div class="row">
      <span>Total Penjualan:</span>
      <span>${_.value}</span>
    </div>
   
    <div class="divider"></div>
    
    <div class="row bold">
      <span>DETAIL PER JENIS:</span>
    </div>
    
    ${i.value.map((l,r)=>`
      <div class="detail">
        <div class="bold">${r+1}. ${l.photo_type}</div>
        <div class="row">
          <span>Foto terjual: ${l.foto_terjual}</span>
          <span>Rp${l.total_pendapatan.toLocaleString()}</span>
        </div>
      </div>
    `).join("")}
    
    <div class="divider"></div>
    <div class="row bold total-line">
      <span>GRAND TOTAL:</span>
    </div>
    <div class="row bold">
      <span>Total: Rp${v.value.toLocaleString()}</span>
    </div>
    <div class="divider"></div>
    <div class="center" style="font-size: 6px; margin-top: 3px;">
      Terima Kasih
    </div>
  `,t=window.open("","_blank");t&&(t.document.write(e),t.document.close(),t.focus(),setTimeout(()=>{t.print(),t.close()},250))};return(e,t)=>(c(),w(J,null,[s(a(k),{class:"mb-4",title:"Filter Laporan"},{default:o(()=>[s(a(O),null,{default:o(()=>[s(a(N),{dense:""},{default:o(()=>[s(a(g),{cols:"12",md:"3"},{default:o(()=>[s(a(vt),{modelValue:f.value,"onUpdate:modelValue":t[0]||(t[0]=l=>f.value=l),items:H.value,label:"Pilih Outlet",variant:"outlined",clearable:"",loading:b.value.length===0},null,8,["modelValue","items","loading"])]),_:1}),s(a(g),{cols:"12",md:"3"},{default:o(()=>[s(a(Y),{modelValue:x.value,"onUpdate:modelValue":t[1]||(t[1]=l=>x.value=l),label:"Start Date",type:"date",variant:"outlined"},null,8,["modelValue"])]),_:1}),s(a(g),{cols:"12",md:"3"},{default:o(()=>[s(a(Y),{modelValue:h.value,"onUpdate:modelValue":t[2]||(t[2]=l=>h.value=l),label:"End Date",type:"date",variant:"outlined"},null,8,["modelValue"])]),_:1}),s(a(g),{cols:"12",md:"2",class:"d-flex align-center gap-2"},{default:o(()=>[s(a(A),{color:"primary",onClick:X,disabled:!f.value},{default:o(()=>t[3]||(t[3]=[n("i",{class:"bx bx-search-alt mr-1"},null,-1),R(" Terapkan ")])),_:1,__:[3]},8,["disabled"])]),_:1})]),_:1}),d.value?(c(),V(a(N),{key:0,class:"mt-2",dense:""},{default:o(()=>[s(a(g),{cols:"12",class:"d-flex align-center gap-2"},{default:o(()=>[s(a(A),{color:"success",onClick:Z},{default:o(()=>t[4]||(t[4]=[n("i",{class:"bx bx-export mr-1"},null,-1),R(" Export Excel ")])),_:1,__:[4]}),s(a(A),{color:"info",onClick:tt},{default:o(()=>t[5]||(t[5]=[n("i",{class:"bxr bx-printer mr-1"},null,-1),R(" Print ")])),_:1,__:[5]})]),_:1})]),_:1})):j("",!0)]),_:1})]),_:1}),d.value?(c(),V(a(N),{key:0,class:"mb-4",dense:""},{default:o(()=>[s(a(g),{cols:"12",md:"6"},{default:o(()=>[s(a(k),null,{default:o(()=>[s(a(O),null,{default:o(()=>[t[6]||(t[6]=n("div",{class:"text-subtitle-1 text-grey"},"Total Pendapatan",-1)),n("div",ft,"Rp "+m(v.value.toLocaleString()),1)]),_:1,__:[6]})]),_:1})]),_:1}),s(a(g),{cols:"12",md:"6"},{default:o(()=>[s(a(k),null,{default:o(()=>[s(a(O),null,{default:o(()=>[t[7]||(t[7]=n("div",{class:"text-subtitle-1 text-grey"},"Foto Terjual",-1)),n("div",_t,m(E.value),1)]),_:1,__:[7]})]),_:1})]),_:1})]),_:1})):j("",!0),d.value?(c(),V(a(k),{key:1,title:`Detail Transaksi - ${L.value}`},{default:o(()=>[s(a(mt),{density:"compact"},{default:o(()=>[t[11]||(t[11]=n("thead",null,[n("tr",null,[n("th",{class:"text-center"},"#"),n("th",{class:"text-center"},"Jenis Foto"),n("th",{class:"text-center"},"Total Penjualan"),n("th",{class:"text-center"},"Total Pendapatan")])],-1)),n("tbody",null,[i.value.length===0?(c(),w("tr",gt,t[8]||(t[8]=[n("td",{colspan:"5",class:"text-center text-grey"},"Tidak ada data",-1)]))):(c(!0),w(J,{key:1},ut(i.value,(l,r)=>(c(),w("tr",{key:r},[n("td",xt,m(r+1),1),n("td",ht,m(l.photo_type),1),n("td",bt,m(l.foto_terjual),1),n("td",yt,"Rp "+m(l.total_pendapatan.toLocaleString()),1)]))),128)),i.value.length>0?(c(),w("tr",Tt,[t[9]||(t[9]=n("td",{class:"text-center font-weight-bold"},null,-1)),t[10]||(t[10]=n("td",{class:"text-center font-weight-bold"},"TOTAL",-1)),n("td",wt,m(_.value),1),n("td",kt,"Rp "+m(v.value.toLocaleString()),1)])):j("",!0)])]),_:1,__:[11]})]),_:1},8,["title"])):(c(),V(a(k),{key:2,class:"text-center pa-8"},{default:o(()=>[s(a(O),null,{default:o(()=>[s(a(pt),{size:"64",color:"grey-lighten-1"},{default:o(()=>t[12]||(t[12]=[R("mdi-store-search")])),_:1,__:[12]}),t[13]||(t[13]=n("div",{class:"text-h6 mt-4 text-grey"},"Pilih outlet untuk melihat laporan transaksi",-1))]),_:1,__:[13]})]),_:1}))],64))}}),Wt=ct(Dt,[["__scopeId","data-v-ea81d509"]]);export{Wt as default};
