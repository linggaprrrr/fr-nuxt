import{u as x,w as J,F as K}from"./DD9k1QdI.js";import{u as B}from"./BzfhSkmR.js";import{d as G,r as m,c as g,f as H,a as T,l as n,k as r,u as s,F as A,b as h,p as D,m as a,v as E,A as p,a6 as W,z as q,_ as Q}from"./C_h0KXVs.js";import{a as R,V as j}from"./DOhbAZ_H.js";import{a as O,V as b}from"./NBV0xLS5.js";import{V as N}from"./BS-jRcXm.js";import{V as X}from"./C75bU5l1.js";import"./Cpj98o6Y.js";import"./ySFp8J6D.js";import"./P54H4RJH.js";/* empty css        */import"./BcEGi1iI.js";import"./C-GTDzx5.js";const Z={class:"text-h5 font-weight-bold text-primary"},tt={class:"text-h5 font-weight-bold text-success"},et={key:0},at={class:"text-center"},ot={class:"text-center"},lt={class:"text-center"},nt={class:"text-center"},st={class:"text-center"},rt={class:"text-center"},dt={key:2,class:"bg-blue-lighten-5"},ut={class:"text-center font-weight-bold"},it={class:"text-center font-weight-bold"},pt=G({__name:"transactions",setup(ct){const d=m([]),F=m(0),w=m(0);function $(e){const t=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${t}-${o}-${l}`}function i(e){const t=new Date(e),o=String(t.getDate()).padStart(2,"0"),l=String(t.getMonth()+1).padStart(2,"0"),u=t.getFullYear();return`${o}/${l}/${u}`}const k=new Date,c=m($(k)),f=m($(k)),{getFotoTerjualReport:P}=B(),y=g(()=>d.value.reduce((e,t)=>e+t.foto_terjual,0)),_=g(()=>d.value.reduce((e,t)=>e+t.total_pendapatan,0));g(()=>d.value.length===0?0:Math.round(_.value/d.value.length)),g(()=>{const e={};return d.value.forEach(t=>{e[t.outlet]||(e[t.outlet]={foto_terjual:0,revenue:0}),e[t.outlet].foto_terjual+=t.foto_terjual,e[t.outlet].revenue+=t.total_pendapatan}),e}),g(()=>{const e={};return d.value.forEach(t=>{e[t.photo_type]||(e[t.photo_type]={foto_terjual:0,revenue:0}),e[t.photo_type].foto_terjual+=t.foto_terjual,e[t.photo_type].revenue+=t.total_pendapatan}),e});const S=async()=>{const e=await P(c.value,f.value);d.value=e.data,F.value=e.total_pendapatan,w.value=e.total_foto_terjual,console.log(e)};H(()=>{S()});const C=()=>{if(d.value.length===0){alert("Data foto terjual kosong, tidak bisa diexport!");return}const e=c.value===f.value?i(c.value):`${i(c.value)} - ${i(f.value)}`,t=[["LAPORAN FOTO TERJUAL"],[""],["Periode:",e],["Tanggal Export:",i($(new Date))],[""],["RINGKASAN:"],["Total Pendapatan:",`Rp ${F.value.toLocaleString()}`],["Total Foto Terjual:",w.value],[""],["DETAIL FOTO TERJUAL:"],[""]],o=d.value.map((v,I)=>({No:I+1,Tanggal:i(v.tanggal),"Outlet/Konter":v.outlet,"Jenis Foto":v.photo_type,"Foto Terjual":v.foto_terjual,"Total Pendapatan":v.total_pendapatan,"Rata-rata per Foto":v.foto_terjual>0?Math.round(v.total_pendapatan/v.foto_terjual):0})),l={No:"",Tanggal:"TOTAL","Outlet/Konter":"","Jenis Foto":"","Foto Terjual":y.value,"Total Pendapatan":_.value,"Rata-rata per Foto":y.value>0?Math.round(_.value/y.value):0},u=[...t,...x.sheet_to_json(x.json_to_sheet(o),{header:1}),[""],Object.values(l)],L=x.aoa_to_sheet(u);L["!cols"]=[{width:5},{width:12},{width:15},{width:15},{width:15},{width:18},{width:20}];const V=x.book_new();x.book_append_sheet(V,L,"Laporan Foto Terjual");const Y=J(V,{bookType:"xlsx",type:"array"}),z=`Laporan_Foto_Terjual_${c.value}_${f.value}.xlsx`;K.saveAs(new Blob([Y],{type:"application/octet-stream"}),z)},M=g(()=>{const e=c.value.trim(),t=f.value.trim();return e===t?i(e):`${i(e)} - ${i(t)}`}),U=()=>{if(d.value.length===0){alert("Tidak ada data untuk diprint!");return}const e=d.value.reduce((l,u)=>(l[u.outlet]||(l[u.outlet]=0),l[u.outlet]+=u.foto_terjual,l),{}),t=`
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
      LAPORAN FOTO TERJUAL
      <br>
      ${M.value}
    </div>

    <div class="divider"></div>
    
    <div class="row bold">
      <span>RINGKASAN:</span>
    </div>
    <div class="row">
      <span>Total Pendapatan:</span>
      <span>Rp${F.value.toLocaleString()}</span>
    </div>
    <div class="row">
      <span>Total Foto Terjual:</span>
      <span>${w.value}</span>
    </div>    
    
    <div class="divider"></div>
    
    <div class="row bold">
      <span>SUMMARY PER OUTLET:</span>
    </div>
    ${Object.entries(e).map(([l,u])=>`
      <div class="row">
        <span>${l}:</span>
        <span>${u}</span>
      </div>
    `).join("")}

    <div class="divider"></div>
    
    <div class="row bold">
      <span>DETAIL:</span>
    </div>
    
    ${d.value.map((l,u)=>`
      <div class="detail">
        <div class="bold">${u+1}. ${l.unit} - ${l.outlet} - ${l.photo_type}</div>
        <div>Tanggal: ${i(l.tanggal)}</div>
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
      <span>Total: Rp${_.value.toLocaleString()}</span>
    </div>
    <div class="divider"></div>
    <div class="center" style="font-size: 6px; margin-top: 3px;">
      Terima Kasih
    </div>
  `,o=window.open("","_blank");o&&(o.document.write(t),o.document.close(),o.focus(),setTimeout(()=>{o.print(),o.close()},250))};return(e,t)=>(h(),T(A,null,[n(s(j),{class:"mb-4",title:"Filter Tanggal"},{default:r(()=>[n(s(R),null,{default:r(()=>[n(s(O),{dense:""},{default:r(()=>[n(s(b),{cols:"12",md:"3"},{default:r(()=>[n(s(N),{modelValue:c.value,"onUpdate:modelValue":t[0]||(t[0]=o=>c.value=o),label:"Start Date",type:"date",variant:"outlined"},null,8,["modelValue"])]),_:1}),n(s(b),{cols:"12",md:"3"},{default:r(()=>[n(s(N),{modelValue:f.value,"onUpdate:modelValue":t[1]||(t[1]=o=>f.value=o),label:"End Date",type:"date",variant:"outlined"},null,8,["modelValue"])]),_:1}),n(s(b),{cols:"12",md:"6",class:"d-flex align-center gap-2"},{default:r(()=>[n(s(D),{color:"primary",onClick:S},{default:r(()=>t[2]||(t[2]=[a("i",{class:"bx bx-search-alt mr-1"},null,-1),E(" Terapkan ")])),_:1,__:[2]}),n(s(D),{color:"success",onClick:C},{default:r(()=>t[3]||(t[3]=[a("i",{class:"bx bx-export mr-1"},null,-1),E(" Export Excel ")])),_:1,__:[3]}),n(s(D),{color:"info",onClick:U},{default:r(()=>t[4]||(t[4]=[a("i",{class:"bxr bx-printer mr-1"},null,-1),a("span",null,"Print",-1)])),_:1,__:[4]})]),_:1})]),_:1})]),_:1})]),_:1}),n(s(O),{class:"mb-4",dense:""},{default:r(()=>[n(s(b),{cols:"12",md:"6"},{default:r(()=>[n(s(j),null,{default:r(()=>[n(s(R),null,{default:r(()=>[t[5]||(t[5]=a("div",{class:"text-subtitle-1 text-grey"},"Total Pendapatan",-1)),a("div",Z,"Rp "+p(_.value.toLocaleString()),1)]),_:1,__:[5]})]),_:1})]),_:1}),n(s(b),{cols:"12",md:"6"},{default:r(()=>[n(s(j),null,{default:r(()=>[n(s(R),null,{default:r(()=>[t[6]||(t[6]=a("div",{class:"text-subtitle-1 text-grey"},"Total Foto Terjual",-1)),a("div",tt,p(w.value),1)]),_:1,__:[6]})]),_:1})]),_:1})]),_:1}),n(s(j),{title:"Daftar Foto Terjual Detail"},{default:r(()=>[n(s(X),{density:"compact"},{default:r(()=>[t[12]||(t[12]=a("thead",null,[a("tr",null,[a("th",{class:"text-center"},"#"),a("th",{class:"text-center"},"Tanggal"),a("th",{class:"text-center"},"Outlet/Konter"),a("th",{class:"text-center"},"Jenis Foto"),a("th",{class:"text-center"},"Foto Terjual"),a("th",{class:"text-center"},"Total Pendapatan")])],-1)),a("tbody",null,[d.value.length===0?(h(),T("tr",et,t[7]||(t[7]=[a("td",{colspan:"6",class:"text-center text-grey"},"Tidak ada data",-1)]))):(h(!0),T(A,{key:1},q(d.value,(o,l)=>(h(),T("tr",{key:l},[a("td",at,p(l+1),1),a("td",ot,p(i(o.tanggal)),1),a("td",lt,p(o.outlet),1),a("td",nt,p(o.photo_type),1),a("td",st,p(o.foto_terjual),1),a("td",rt,"Rp "+p(o.total_pendapatan.toLocaleString()),1)]))),128)),d.value.length>0?(h(),T("tr",dt,[t[8]||(t[8]=a("td",{class:"text-center font-weight-bold"},null,-1)),t[9]||(t[9]=a("td",{class:"text-center font-weight-bold"},"TOTAL",-1)),t[10]||(t[10]=a("td",{class:"text-center font-weight-bold"},null,-1)),t[11]||(t[11]=a("td",{class:"text-center font-weight-bold"},null,-1)),a("td",ut,p(y.value),1),a("td",it,"Rp "+p(_.value.toLocaleString()),1)])):W("",!0)])]),_:1,__:[12]})]),_:1})],64))}}),$t=Q(pt,[["__scopeId","data-v-6a26df2d"]]);export{$t as default};
