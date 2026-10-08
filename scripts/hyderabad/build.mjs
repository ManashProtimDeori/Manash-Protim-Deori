import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {Presentation,PresentationFile} from '@oai/artifact-tool';

const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const research=base+'/research/hyderabad';
const out=base+'/public/case-studies/hyderabad-political-intelligence';
const privateDir=base+'/.hyderabad-build';
const SKILL='/root/.codex/skills/builtins/presentations';
const deck=JSON.parse(await fs.readFile(research+'/deck-content.json','utf8'));
const colors={paper:'#F8F5ED',ink:'#172C2A',green:'#165744',saffron:'#A14D25',gold:'#D5BFA0',muted:'#64716B',rule:'#D8DDD3',white:'#FFFFFF'};
const serif='Bitstream Charter',sans='DejaVu Sans';
const p=Presentation.create({slideSize:{width:1280,height:720}});
p.theme.defaultFont=sans;
const cover=out+'/cover-art.png';
const coverBytes=new Uint8Array(await fs.readFile(cover));

const nativeTables=[],nativeCharts=[];

function shape(s,x,y,w,h,fill,line='none'){
  return s.shapes.add({geometry:'rect',position:{left:x,top:y,width:w,height:h},fill,line:{style:'solid',fill:line,width:line==='none'?0:1}});
}
function text(s,str,x,y,w,h,size=24,color=colors.ink,font=sans,bold=false,opts={}){
  const t=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  t.text=str;
  t.text.style={fontSize:size,typeface:font,color,bold,wrap:'square',autoFit:'none',insets:0,...opts};
  return t;
}
function link(s,label,url,x,y,w,h,size=15){
 const t=text(s,label,x,y,w,h,size,colors.green,sans,false);
 t.text.get(label).link={uri:url,isExternal:true};
 return t;
}
function chrome(s,d,dark=false){
 s.background.fill=dark?colors.ink:colors.paper;
 const ink=dark?colors.paper:colors.ink;
 text(s,d.section.toUpperCase(),64,38,1100,24,13,dark?colors.gold:colors.saffron,sans,true);
 shape(s,64,680,1152,1,dark?'#45615A':colors.rule);
 const ids=d.number<=32?`${d.id} · ${d.facts.join(' / ')}${d.number>1&&d.number<32?' · I'+String(d.number).padStart(2,'0')+' / C'+String(d.number).padStart(2,'0'):''}`:d.id+' · '+(d.refs||[]).join(' / ');
 text(s,ids,64,691,870,19,12,dark?colors.gold:colors.muted);
 text(s,`${String(d.number).padStart(2,'0')} / ${deck.slides.length}`,1100,691,116,19,12,ink,sans,false,{alignment:'right'});
}
function title(s,d,dark=false){
 text(s,d.title,64,83,1144,116,48,dark?colors.paper:colors.ink,serif,false);
}
function contribution(s,d){
 if(!d.contribution)return;
 shape(s,64,568,1152,96,colors.green);
 shape(s,64,568,4,96,colors.gold);
 text(s,'HOW I WOULD CONTRIBUTE',87,581,1055,24,13,colors.gold,sans,true);
 text(s,d.contribution,87,608,1085,50,21,colors.paper);
}
function limit(s,d){
 text(s,d.limits,64,532,1152,30,13.5,colors.muted);
}
function table(s,values,x,y,w,h,widths,size=20){
 const t=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width:w,height:h,columnWidths:widths,values});
 t.cells.block({row:0,column:0,rowCount:values.length,columnCount:values[0].length}).assign({fill:colors.paper,textStyle:{fontSize:size,typeface:sans,color:colors.ink},margins:{left:10,right:10,top:6,bottom:4},anchor:'top'});
 for(let r=0;r<values.length;r++)t.rows[r].height=h/values.length;
 t.borders.assign({style:'solid',fill:colors.rule,width:1});
 t.cells.block({row:0,column:0,rowCount:1,columnCount:values[0].length}).assign({fill:colors.green,textStyle:{fontSize:size-1,typeface:sans,color:colors.paper,bold:true}});
 nativeTables.push(p.slides.items.length);
 return t;
}
function main(s,d){
 if(d.layout==='cover'){
   s.background.fill=colors.paper;
   s.images.add({blob:coverBytes,contentType:'image/png',fit:'cover',position:{left:0,top:0,width:1280,height:720},alt:'AI-created decorative Deccan-inspired architectural artwork; not a factual city view.'});
   text(s,'INDEPENDENT APPLICATION WORK SAMPLE',64,46,650,26,13,colors.saffron,sans,true);
   text(s,'Hyderabad',62,170,690,110,91,colors.ink,serif);
   text(s,'Power, place\n& public value',64,285,620,146,49,colors.ink,serif);
   shape(s,64,459,120,3,colors.saffron);
   text(s,'Political dynamics, governance questions\nand my contribution to Inclusive Minds',64,485,570,75,23,colors.ink);
   text(s,'MANASH PROTIM DEORI',64,597,650,26,17,colors.green,sans,true);
   text(s,'Political consulting · Hyderabad · Cut-off 8 October 2026',64,631,650,30,15,colors.muted);
   text(s,'Illustrative architecture · No employer or party endorsement',64,693,700,18,11,colors.muted);
   return;
 }
 if(d.layout==='thanks'){
   chrome(s,d,true);
   text(s,'Thank you',64,152,950,123,88,colors.paper,serif);
   text(s,'For considering my application to Inclusive Minds.',69,296,1040,40,25,colors.paper);
   text(s,'MANASH PROTIM DEORI',69,389,1000,30,18,colors.gold,sans,true);
   text(s,'Political consulting · Hyderabad',69,428,1000,34,23,colors.paper);
   link(s,'manashdeori09@gmail.com','mailto:manashdeori09@gmail.com',69,490,1050,35,23).text.color=colors.paper;
   link(s,'linkedin.com/in/manash-protim-deori','https://linkedin.com/in/manash-protim-deori',69,534,1050,34,20).text.color=colors.paper;
   text(s,'Evidence, reasoning and limitations follow in the appendix.',69,625,1040,28,15,colors.gold);
   return;
 }
 chrome(s,d);title(s,d);
 if(d.layout==='executive'){
   text(s,d.body,64,206,1130,60,23,colors.muted);
   d.items.forEach((a,i)=>{
     const x=64+i*393;
     shape(s,x,304,356,2,colors.gold);
     text(s,String(i+1).padStart(2,'0'),x,322,340,40,25,colors.saffron,serif);
     text(s,a[0],x,370,352,72,30,colors.ink,serif);
     text(s,a[1],x,448,352,84,21,colors.ink);
     shape(s,x,557,356,102,colors.green);
     text(s,'HOW I WOULD CONTRIBUTE',x+16,570,326,22,12,colors.gold,sans,true);
     text(s,a[2],x+16,598,326,58,16.5,colors.paper);
   });return;
 }
 if(d.layout==='chart'){
   text(s,d.body,64,214,330,280,24);
   const c=d.chart;
   s.charts.add('bar',{position:{left:439,top:214,width:769,height:305},title:c.title,titleTextStyle:{fontSize:18,fill:colors.ink},categories:c.categories,series:c.series,barOptions:{direction:'column',grouping:'clustered',gapWidth:90},hasLegend:c.series.length>1,legend:{position:'bottom',textStyle:{fontSize:14,fill:colors.ink}},xAxis:{textStyle:{fontSize:15,fill:colors.ink},line:{fill:colors.rule,width:1}},yAxis:{min:0,max:c.max,numberFormatCode:'#,##0',textStyle:{fontSize:13,fill:colors.muted},majorGridlines:{fill:colors.rule,width:1}},dataLabels:{showValue:true,position:'outEnd',numberFormatCode:'#,##0',textStyle:{fontSize:16,fill:colors.ink,bold:true}},chartFill:'none',plotAreaFill:'none',chartLine:{fill:'none',width:0}});
   nativeCharts.push(d.number);limit(s,d);contribution(s,d);return;
 }
 text(s,d.body,64,204,1146,97,24);
 if(d.layout==='splitstats'){
  d.items.forEach((a,i)=>{const x=64+i*393;shape(s,x,323,355,2,colors.gold);text(s,a[0],x,350,365,86,i===2&&a[0].length>12?36:63,colors.saffron,serif);text(s,a[1],x,443,350,68,23);});
 } else if(d.layout==='timeline'){
   shape(s,67,323,1146,2,colors.gold);
   d.items.forEach((a,i)=>{const x=64+i*231;shape(s,x,318,8,12,colors.saffron);text(s,a[0],x,346,210,56,40,colors.saffron,serif);text(s,a[1],x,416,198,104,21);});
 } else if(d.layout==='gates'){
   d.items.forEach((a,i)=>{const y=294+i*44; text(s,a[0],64,y,55,38,26,colors.saffron,serif);text(s,a[1],139,y+4,1050,33,23);shape(s,139,y+39,1070,1,colors.rule);});
 } else if(d.layout==='matrix'){
   let head=d.number===7?['Institution','Documented role','Evidence boundary']:d.number===10?['2024 parliamentary seat','Winner','Party']:['Status','Evidence','Next action'];
   table(s,[head,...d.items],64,309,1152,208,[322,423,407],19);
 } else if(d.layout==='tracker'){
   table(s,[['Budget instrument','2026–27 BE','Verified stage','Spend / outcome'],...d.items],64,294,1152,224,[471,173,190,318],17.5);
 } else if(d.layout==='priorities'){
   d.items.forEach((a,i)=>{const y=305+i*53;text(s,a[0],64,y,65,37,28,colors.saffron,serif);text(s,a[1],145,y+2,360,35,24,colors.ink,serif);text(s,a[2],542,y+7,660,45,18.5);shape(s,144,y+46,1065,1,colors.rule);});
 } else if(d.layout==='geography'||d.layout==='case'||d.layout==='columns'||d.layout==='closing'||d.layout==='plan'){
   const count=d.items.length;const col=(1152-(count-1)*34)/count;
   d.items.forEach((a,i)=>{const x=64+i*(col+34);shape(s,x,327,col,2,colors.gold);text(s,a[0],x,351,col,60,28,colors.green,serif);text(s,a[1],x,422,col,95,21);if(a[2])text(s,a[2],x,491,col,43,16,colors.muted);});
 } else if(d.layout==='process'){
   const count=d.items.length,col=(1152-(count-1)*30)/count;
   d.items.forEach((a,i)=>{const x=64+i*(col+30);text(s,String(i+1).padStart(2,'0'),x,325,col,43,21,colors.saffron,serif);shape(s,x,374,col,2,colors.gold);text(s,a[0],x,394,col,64,27,colors.green,serif);text(s,a[1],x,465,col,61,20);});
 }
 limit(s,d);contribution(s,d);
}
function appendix(s,d){
 if(d.layout==='divider'){
  chrome(s,d,true);text(s,'The argument,\nmade inspectable.',64,178,1120,192,72,colors.paper,serif);
  text(s,'Sources · Calculations · Reasoning · Contribution · Review trail',69,440,1100,45,23,colors.gold);
  text(s,'25 sources. 37 evidence items. 127 registered items.\n20 saved cumulative content versions.',69,525,1120,81,26,colors.paper);
  return;
 }
 chrome(s,d);text(s,d.title,64,83,1140,85,41,colors.ink,serif);
 if(d.layout==='source-register'){
   d.items.forEach((a,i)=>{const y=185+i*155;
    text(s,a.id+'  '+a.title,64,y,1140,37,23,colors.green,serif);
    text(s,a.publisher+' · '+a.publication_date+' · Retrieved 8 October 2026',64,y+40,1140,28,15,colors.muted);
    link(s,a.url,a.url,64,y+70,1140,50,14);
    text(s,a.locator+' | '+a.limitation,64,y+117,1140,41,14.5);
   });
 }else if(d.layout==='logic-ledger'){
   d.items.forEach((a,i)=>{const y=189+i*231;
    shape(s,64,y-12,1152,2,colors.gold);
    text(s,a[0],64,y+6,1140,38,24,colors.green,serif);
    text(s,a[1],64,y+58,594,154,16.5);
    text(s,a[2],697,y+58,512,154,16.5);
   });
 }else if(d.layout==='fact-ledger'){
   d.items.forEach((a,i)=>{const y=185+i*93;
    text(s,a[0],64,y,270,66,15,colors.green,sans,true);
    text(s,a[1],337,y,529,80,16);
    text(s,a[2],899,y,310,80,14.5,colors.muted);
    shape(s,64,y+83,1152,1,colors.rule);
   });
 }else if(d.layout==='election-table'){
   const left=d.items.slice(0,8),right=d.items.slice(8);
   table(s,[['Assembly seat','Winner 2023'],...left],64,188,548,435,[405,143],18);
   table(s,[['Assembly seat','Winner 2023'],...right],656,188,560,435,[417,143],18);
   text(s,'Source S07 · Election-time affiliation; explicitly selected 15-seat set; not current municipal territory.',64,640,1152,25,14,colors.muted);
 }else{
   const count=d.items.length;const step=count===4?115:count===6?76:94;
   d.items.forEach((a,i)=>{const y=190+i*step;
    text(s,a[0],64,y,365,step-12,20,colors.green,serif);
    text(s,a[1],459,y,750,step-12,18);
    shape(s,64,y+step-9,1152,1,colors.rule);
   });
 }
}
for(const d of deck.slides){
 const s=p.slides.add();
 if(d.number<=32)main(s,d);else appendix(s,d);
 s.speakerNotes.text=d.notes;
}
const thumbManifest=[];
await fs.mkdir(out+'/slides',{recursive:true});
await fs.mkdir(privateDir+'/previews',{recursive:true});
for(let i=0;i<p.slides.items.length;i++){
 const d=deck.slides[i],s=p.slides.items[i];
 const stem='slide-'+String(i+1).padStart(2,'0');
 const png=await p.export({slide:s,format:'png',scale:1});
 await fs.writeFile(privateDir+'/previews/'+stem+'.png',new Uint8Array(await png.arrayBuffer()));
 thumbManifest.push({number:i+1,title:d.title,section:d.section,body:d.body,contribution:d.contribution,limits:d.limits,notes:d.notes,image:stem+'.webp'});
 if((i+1)%10===0)console.log('Rendered '+(i+1)+' / '+p.slides.items.length);
}
const candidate=privateDir+'/candidate.pptx';
await (await PresentationFile.exportPptx(p)).save(candidate);
try {
 const pdf=await p.export({format:'pdf'});
 await fs.writeFile(out+'/Manash-Protim-Deori-Hyderabad.pdf',new Uint8Array(await pdf.arrayBuffer()));
} catch(e) {console.log('PDF vector export requires fallback: '+e.message);}
await fs.writeFile(out+'/manifest.json',JSON.stringify({title:deck.title,cutoff:deck.cutoff,total:deck.slides.length,mainCount:32,slides:thumbManifest,sources:deck.sources},null,2));
const {finalizePresentation}=await import(pathToFileURL(SKILL+'/container_tools/artifact_tool_utils.mjs').href);
const result=await finalizePresentation({workspaceDir:base,candidatePath:candidate,finalPath:out+'/Manash-Protim-Deori-Hyderabad.pptx',explicitTotalSlideCount:deck.slides.length,requiredNativeTableOwnerSlides:[...new Set(nativeTables)],requiredNativeChartOwnerSlides:nativeCharts,materializeLiteralChartWorkbooks:true,pythonExecutable:process.env.CODEX_PRIMARY_RUNTIME_PYTHON,integrityValidatorPath:SKILL+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:SKILL+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--validate-bullet-geometry',...[...new Set(nativeTables)].flatMap(n=>['--require-native-table-slide',String(n)])],fontPolicy:{basis:'design',families:[serif,sans]},verifyArtifactToolImport:true,receiptPath:privateDir+'/validation.json'});
console.log(JSON.stringify({slides:deck.slides.length,charts:nativeCharts,tables:nativeTables,finalizer:result}));
