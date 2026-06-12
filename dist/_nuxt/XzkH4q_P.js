import{u as k,w as Z,F as tt}from"./DD9k1QdI.js";import{u as et}from"./KVrZVMT4.js";import{u as at}from"./DInmMZEi.js";import{d as lt,r as p,c as b,f as nt,a as U,l as o,j as $,a6 as j,k as n,u as a,F as I,b as _,p as E,m as e,v as O,A as r,z as ot,_ as st}from"./DDya6Ko7.js";import{a as x,V as c}from"./4hNF3y4S.js";import{a as C,V as v}from"./BMaKwbTZ.js";import{V as it}from"./Cxf8IGDQ.js";import{V as J}from"./DmhT2V-z.js";import{V as dt}from"./VYBjP7Ds.js";import"./Cpj98o6Y.js";import"./C6KsXkD8.js";import"./5KsvHM6e.js";/* empty css        */import"./C-GTDzx5.js";import"./D3C0GQ2A.js";import"./CPwGJQCD.js";import"./D7-3LGEP.js";import"./BbQAoNaH.js";import"./mbSfkz2A.js";import"./C7D_pBJz.js";import"./DJSvkuLJ.js";import"./BA238dLG.js";const rt={class:"text-h5 font-weight-bold text-primary"},ut={class:"text-h5 font-weight-bold text-success"},pt={class:"text-h5 font-weight-bold text-warning"},ct={class:"text-h5 font-weight-bold text-info"},vt={class:"text-center"},mt={class:"text-center"},ft={class:"text-center"},_t={class:"text-center"},xt={class:"text-center"},gt={class:"bg-blue-lighten-5"},bt={class:"text-center font-weight-bold"},wt={class:"text-center font-weight-bold"},ht={class:"text-center mb-4"},Tt={class:"text-h6 font-weight-bold"},yt={class:"text-subtitle-1"},kt=lt({__name:"unit-transactions",setup(St){const{getPerUnitReports:z}=et(),{getUnits:B}=at(),w=p(""),N=new Date,h=p(N.toISOString().slice(0,10)),T=p(N.toISOString().slice(0,10)),S=p(!1),y=p(null),s=p(null),R=p([]),P=p(!1),L=p(null),m=b(()=>{var i;return((i=s.value)==null?void 0:i.data.reduce((t,l)=>t+l.foto_terjual,0))||0}),f=b(()=>{var i;return((i=s.value)==null?void 0:i.data.reduce((t,l)=>t+l.total_pendapatan,0))||0}),A=b(()=>{var t;return(t=s.value)!=null&&t.data?new Set(s.value.data.map(l=>l.outlet)).size:0}),q=b(()=>{var t;return(t=s.value)!=null&&t.data?new Set(s.value.data.map(l=>l.photo_type)).size:0}),G=b(()=>m.value===0?0:Math.round(f.value/m.value)),D=b(()=>{const i=h.value.trim(),t=T.value.trim();return console.log("Computed - Start:",i,"End:",t,"Equal?",i===t),i===t?g(i):`${g(i)} - ${g(t)}`});function g(i){const t=new Date(i),l=String(t.getDate()).padStart(2,"0"),d=String(t.getMonth()+1).padStart(2,"0"),u=t.getFullYear();return`${l}/${d}/${u}`}async function M(){P.value=!0,L.value=null;try{const i=await B({page:1,limit:100});R.value=i.data.map(t=>({id:t.id,name:t.name})),R.value.length>0&&(w.value=R.value[0].id)}catch(i){L.value=i.message||"Gagal memuat data unit"}finally{P.value=!1}}async function K(){if(!w.value){y.value="Pilih unit terlebih dahulu",s.value=null;return}S.value=!0,y.value=null,s.value=null;const i=await z(w.value,h.value,T.value);i?s.value=i:y.value="Gagal mengambil data",S.value=!1}const Y=()=>{if(!s.value){alert("Tidak ada data untuk diexport!");return}const i=[["LAPORAN TRANSAKSI PER UNIT"],[""],["Unit:",s.value.unit_name],["Periode:",D.value],["Tanggal Export:",g(new Date().toISOString().slice(0,10))],[""],["RINGKASAN:"],["Total Penjualan:",m.value],["Total Pendapatan:",`Rp ${f.value.toLocaleString()}`],["Total Outlet:",A.value],["Total Jenis Foto:",q.value],[""],["DETAIL PER OUTLET & JENIS FOTO:"],[""]],t=s.value.data.map((V,X)=>({No:X+1,Outlet:V.outlet,"Jenis Foto":V.photo_type,"Jumlah Transaksi":V.foto_terjual,"Total Pendapatan":V.total_pendapatan})),l={No:"",Outlet:"TOTAL","Jenis Foto":"","Jumlah Transaksi":m.value,"Total Pendapatan":f.value},d=[...i,...k.sheet_to_json(k.json_to_sheet(t),{header:1}),[""],Object.values(l)],u=k.aoa_to_sheet(d);u["!cols"]=[{width:5},{width:20},{width:15},{width:15},{width:18}];const F=k.book_new();k.book_append_sheet(F,u,"Laporan Unit");const W=Z(F,{bookType:"xlsx",type:"array"}),Q=`Laporan_Unit_${s.value.unit_name}_${h.value}_${T.value}.xlsx`;tt.saveAs(new Blob([W],{type:"application/octet-stream"}),Q)},H=()=>{if(!s.value){alert("Tidak ada data untuk diprint!");return}const i=s.value.data.reduce((d,u)=>(d[u.outlet]||(d[u.outlet]=0),d[u.outlet]+=u.foto_terjual,d),{}),t=`
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
      LAPORAN UNIT
      <br>
      ${s.value.unit_name}
      <br>
      ${D.value}
    </div>

    <div class="divider"></div>
    
    <div class="row bold">
      <span>RINGKASAN:</span>
    </div>
    <div class="row">
      <span>Total Pendapatan:</span>
      <span>Rp${f.value.toLocaleString()}</span>
    </div>
    <div class="row">
      <span>Total Penjualan:</span>
      <span>${m.value}</span>
    </div>
    <div class="row">
      <span>Total Outlet:</span>
      <span>${A.value}</span>
    </div>
    
    <div class="divider"></div>
    
    <div class="row bold">
      <span>SUMMARY PER OUTLET:</span>
    </div>
    ${Object.entries(i).map(([d,u])=>`
      <div class="row">
        <span>${d}:</span>
        <span>${u}</span>
      </div>
    `).join("")}
    
    <div class="divider"></div>
    
    <div class="row bold">
      <span>DETAIL:</span>
    </div>
    
    ${s.value.data.map((d,u)=>`
      <div class="detail">
        <div class="bold">${u+1}. ${d.outlet}</div>
        <div>Jenis: ${d.photo_type}</div>
        <div class="row">
          <span>Foto Terjual: ${d.foto_terjual}</span>
          <span>Rp${d.total_pendapatan.toLocaleString()}</span>
        </div>
      </div>
    `).join("")}
    
    <div class="divider"></div>
    <div class="row bold total-line">
      <span>GRAND TOTAL:</span>
    </div>    
    <div class="row bold">
      <span>Total: Rp${f.value.toLocaleString()}</span>
    </div>
    <div class="divider"></div>
    <div class="center" style="font-size: 6px; margin-top: 3px;">
      Terima Kasih
    </div>
  `,l=window.open("","_blank");l&&(l.document.write(t),l.document.close(),l.focus(),setTimeout(()=>{l.print(),l.close()},250))};return nt(()=>{M()}),(i,t)=>(_(),U(I,null,[o(a(c),{class:"mb-4",title:"Filter Laporan Per Unit"},{default:n(()=>[o(a(x),null,{default:n(()=>[o(a(C),{dense:""},{default:n(()=>[o(a(v),{cols:"12",md:"3"},{default:n(()=>[o(a(it),{modelValue:w.value,"onUpdate:modelValue":t[0]||(t[0]=l=>w.value=l),items:R.value,"item-title":"name","item-value":"id",label:"Pilih Unit",variant:"outlined",clearable:"",loading:P.value,disabled:P.value||L.value!==null},null,8,["modelValue","items","loading","disabled"])]),_:1}),o(a(v),{cols:"12",md:"2"},{default:n(()=>[o(a(J),{modelValue:h.value,"onUpdate:modelValue":t[1]||(t[1]=l=>h.value=l),label:"Start Date",type:"date",variant:"outlined"},null,8,["modelValue"])]),_:1}),o(a(v),{cols:"12",md:"2"},{default:n(()=>[o(a(J),{modelValue:T.value,"onUpdate:modelValue":t[2]||(t[2]=l=>T.value=l),label:"End Date",type:"date",variant:"outlined"},null,8,["modelValue"])]),_:1}),o(a(v),{cols:"12",md:"5",class:"d-flex align-center gap-2"},{default:n(()=>[o(a(E),{color:"primary",loading:S.value,onClick:K,disabled:S.value},{default:n(()=>t[3]||(t[3]=[e("i",{class:"bx bx-search-alt mr-1"},null,-1),O(" Terapkan ")])),_:1,__:[3]},8,["loading","disabled"]),o(a(E),{color:"success",onClick:Y,disabled:!s.value},{default:n(()=>t[4]||(t[4]=[e("i",{class:"bx bx-export mr-1"},null,-1),O(" Export Excel ")])),_:1,__:[4]},8,["disabled"]),o(a(E),{color:"info",onClick:H,disabled:!s.value},{default:n(()=>t[5]||(t[5]=[e("i",{class:"bxr bx-printer mr-1"},null,-1),O(" Print ")])),_:1,__:[5]},8,["disabled"])]),_:1})]),_:1})]),_:1})]),_:1}),y.value?(_(),$(a(c),{key:0,color:"error",class:"mb-4"},{default:n(()=>[o(a(x),{class:"text-white"},{default:n(()=>[O(r(y.value),1)]),_:1})]),_:1})):j("",!0),s.value?(_(),$(a(C),{key:1,class:"mb-4",dense:""},{default:n(()=>[o(a(v),{cols:"12",md:"3"},{default:n(()=>[o(a(c),null,{default:n(()=>[o(a(x),null,{default:n(()=>[t[6]||(t[6]=e("div",{class:"text-subtitle-1 text-grey"},"Total Pendapatan",-1)),e("div",rt,"Rp "+r(f.value.toLocaleString()),1)]),_:1,__:[6]})]),_:1})]),_:1}),o(a(v),{cols:"12",md:"3"},{default:n(()=>[o(a(c),null,{default:n(()=>[o(a(x),null,{default:n(()=>[t[7]||(t[7]=e("div",{class:"text-subtitle-1 text-grey"},"Total Penjualan",-1)),e("div",ut,r(m.value),1)]),_:1,__:[7]})]),_:1})]),_:1}),o(a(v),{cols:"12",md:"3"},{default:n(()=>[o(a(c),null,{default:n(()=>[o(a(x),null,{default:n(()=>[t[8]||(t[8]=e("div",{class:"text-subtitle-1 text-grey"},"Total Outlet",-1)),e("div",pt,r(A.value),1)]),_:1,__:[8]})]),_:1})]),_:1}),o(a(v),{cols:"12",md:"3"},{default:n(()=>[o(a(c),null,{default:n(()=>[o(a(x),null,{default:n(()=>[t[9]||(t[9]=e("div",{class:"text-subtitle-1 text-grey"},"Rata-rata per Transaksi",-1)),e("div",ct,"Rp "+r(G.value.toLocaleString()),1)]),_:1,__:[9]})]),_:1})]),_:1})]),_:1})):j("",!0),s.value&&s.value.data.length>0?(_(),$(a(c),{key:2,title:"Detail Transaksi Per Unit (Berdasarkan Outlet & Jenis Foto)"},{default:n(()=>[o(a(dt),{density:"compact"},{default:n(()=>[t[13]||(t[13]=e("thead",null,[e("tr",null,[e("th",{class:"text-center"},"#"),e("th",{class:"text-center"},"Outlet"),e("th",{class:"text-center"},"Jenis Foto"),e("th",{class:"text-center"},"Total Penjualan"),e("th",{class:"text-center"},"Total Pendapatan")])],-1)),e("tbody",null,[(_(!0),U(I,null,ot(s.value.data,(l,d)=>(_(),U("tr",{key:`${l.outlet}-${l.photo_type}`},[e("td",vt,r(d+1),1),e("td",mt,r(l.outlet),1),e("td",ft,r(l.photo_type),1),e("td",_t,r(l.foto_terjual),1),e("td",xt,"Rp "+r(l.total_pendapatan.toLocaleString()),1)]))),128)),e("tr",gt,[t[10]||(t[10]=e("td",{class:"text-center font-weight-bold"},null,-1)),t[11]||(t[11]=e("td",{class:"text-center font-weight-bold"},"TOTAL",-1)),t[12]||(t[12]=e("td",{class:"text-center font-weight-bold"},null,-1)),e("td",bt,r(m.value),1),e("td",wt,"Rp "+r(f.value.toLocaleString()),1)])])]),_:1,__:[13]})]),_:1})):s.value?(_(),$(a(c),{key:3,title:"Ringkasan Unit"},{default:n(()=>[o(a(x),null,{default:n(()=>[e("div",ht,[e("div",Tt,r(s.value.unit_name),1),e("div",yt,r(g(s.value.start_date))+" - "+r(g(s.value.end_date)),1)]),t[14]||(t[14]=e("div",{class:"text-center text-subtitle-1 text-grey"}," Tidak ada data transaksi untuk unit ini pada periode yang dipilih. ",-1))]),_:1,__:[14]})]),_:1})):j("",!0)],64))}}),Yt=st(kt,[["__scopeId","data-v-31088fca"]]);export{Yt as default};
