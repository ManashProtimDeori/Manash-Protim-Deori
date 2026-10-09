const fs = (await import('node:fs')).default;
  const fsp = (await import('node:fs/promises')).default;
  const path = (await import('node:path')).default;
  const pptxgen = (await import('pptxgenjs')).default;
  const root=process.cwd(), research=path.join(root,'research/hyderabad'), out=path.join(root,'public/case-studies/hyderabad-political-intelligence');
  const deck=JSON.parse(await fsp.readFile(path.join(research,'deck-content.json'),'utf8'));
  if(deck.main_count!==20||deck.slides[19].layout!=='thanks')throw Error('20 core/thank-you contract');
  if(deck.slides.slice(0,20).filter(x=>x.contribution).map(x=>x.number).join(',')!=='18,19')throw Error('candidate-slide rule');
  if(deck.slides.slice(0,20).some(x=>x.facts.some(v=>['F08','F09','F10','F11','F16'].includes(v))))throw Error('blocked core record');
  const pptx=new pptxgen();pptx.layout='LAYOUT_WIDE';pptx.author=deck.candidate;pptx.subject='Independent application work sample';pptx.title=deck.title;pptx.lang='en-IN';
  pptx.theme={headFontFace:'Aptos Display',bodyFontFace:'Aptos',lang:'en-IN'};
  const C={paper:'FAF7F0',ink:'172536',green:'22634F',saffron:'E58B3A',blue:'4E82A8',stone:'BDA88E',muted:'52616A',line:'D6DBD9',white:'FFFFFF',soft:'EEF2EF'};
  const st=pptx.ShapeType;
  function rect(sl,x,y,w,h,fill=C.white,lineColor=fill){sl.addShape(st.rect,{x,y,w,h,fill:{color:fill},line:{color:lineColor,transparency:lineColor===fill?100:0,width:lineColor===fill?0:1}});}
  function line(sl,x,y,w,color=C.line,width=1){sl.addShape(st.line,{x,y,w,h:0,line:{color,width}});}
  function t(sl,content,x,y,w,h,opt={}){sl.addText(String(content??''),{x,y,w,h,fontFace:opt.font||'Aptos',fontSize:opt.size||15,color:opt.color||C.ink,bold:!!opt.bold,margin:0,fit:'shrink',valign:'mid',align:opt.align||'left',italic:!!opt.italic,hyperlink:opt.url?{url:opt.url}:undefined});}
  function chrome(sl,d){sl.background={color:C.paper};t(sl,d.section.toUpperCase(),.60,.22,11.9,.27,{size:10,color:C.saffron,bold:true});line(sl,.60,.65,12.1);t(sl,d.title,.60,.85,12.1,.91,{size:d.title.length>70?25:d.title.length>58?29:34,font:'Aptos Display',bold:true});t(sl,d.body,.60,1.91,12.05,.75,{size:15.5,color:C.muted});line(sl,.60,7.17,12.1);t(sl,d.id+' · '+(d.facts||[]).join('/')+' · Appendix '+d.appendix_evidence_page,.60,7.21,10.8,.16,{size:8,color:C.muted});t(sl,String(d.number).padStart(2,'0')+' / 20',11.68,7.19,.91,.19,{size:8,color:C.muted,align:'right'});}
  function limit(sl,d){if(d.limits)t(sl,d.limits,.68,6.60,11.95,.39,{size:10,color:C.muted,italic:true});}
  function columns(sl,items,flow=false){const a=items.slice(0,6),gap=.17,n=a.length,w=(12.04-(n-1)*gap)/n;for(let i=0;i<n;i++){const x=.63+i*(w+gap),row=a[i];rect(sl,x,2.90,w,2.88,i%2?C.soft:C.white,C.line);rect(sl,x,2.90,w,.08,i===0?C.green:i===n-1?C.saffron:C.blue);t(sl,row[0],x+.16,3.13,w-.30,.65,{size:n>4?15:20,bold:true,color:C.green});t(sl,row[1]||'',x+.16,3.96,w-.32,1.05,{size:n>4?12:15});if(row[2])t(sl,row[2],x+.16,5.16,w-.32,.46,{size:n>4?10:12,color:C.muted});if(flow&&i<n-1)t(sl,'→',x+w-.10,3.72,.32,.42,{size:17,color:C.saffron,bold:true});}}
  function timeline(sl,items){const a=items.slice(0,6),w=11.7/a.length;line(sl,.74,3.37,11.64,C.stone,3);for(let i=0;i<a.length;i++){let x=.75+i*w;rect(sl,x,3.27,.14,.19,C.saffron);t(sl,a[i][0],x,3.64,w-.14,.52,{size:22,bold:true,color:C.saffron});t(sl,a[i][1],x,4.25,w-.2,1.23,{size:14});}}
  function matrix(sl,items){rect(sl,.65,2.86,12,.46,C.green);['INSTITUTION / UNIT','RECORD','SCOPE'].forEach((a,i)=>t(sl,a,[.82,4,9.22][i],2.94,[3,5,3][i],.25,{size:11,color:C.white,bold:true}));items.slice(0,6).forEach((row,i)=>{let y=3.35+i*.52;rect(sl,.65,y,12,.52,i%2?C.white:C.soft);row.forEach((a,j)=>t(sl,a,[.82,4,9.22][j],y+.04,[3,5,3][j],.41,{size:12.4,color:j===0?C.green:C.ink,bold:j===0}));});}
  function chart(sl,d){let a=d.chart;sl.addChart(pptx.ChartType.bar,a.series.map(z=>({name:z.name,labels:a.categories,values:z.values})),{x:3.41,y:2.83,w:9.17,h:3.55,catAxisLabelFontSize:11,valAxisLabelFontSize:10,showValue:true,showLegend:a.series.length>1,legendPos:'b',chartColors:a.series.length>1?[C.green,C.saffron]:[C.blue],valAxisMinVal:0,valAxisMaxVal:a.max,showTitle:false,showBorder:false,showMarker:false,showLine:false});t(sl,a.title,.75,3.0,2.49,.72,{size:18,bold:true,color:C.green});}
  function stats(sl,items){items.slice(0,3).forEach((a,i)=>{const x=.65+i*4.07;rect(sl,x,3,3.83,2.52,C.white,C.line);t(sl,a[0],x+.2,3.41,3.42,.86,{size:a[0].length>13?24:37,bold:true,color:C.saffron,font:'Aptos Display'});t(sl,a[1],x+.2,4.47,3.43,.70,{size:17});});}
  function priorities(sl,items){items.slice(0,5).forEach((a,i)=>{const y=2.83+i*.80;rect(sl,.68,y,11.93,.67,i%2?C.soft:C.white,C.line);t(sl,a[0],.85,y+.11,.49,.37,{size:21,bold:true,color:C.saffron});t(sl,a[1],1.49,y+.10,4.55,.40,{size:18,bold:true,color:C.green});t(sl,a[2],6.1,y+.09,6.06,.44,{size:13});});}
  function main(sl,d){
    if(d.layout==='cover'){sl.background={color:C.paper};const art=path.join(out,'cover-art.png');if(fs.existsSync(art))sl.addImage({path:art,x:7.20,y:0,w:6.13,h:7.5});rect(sl,0,0,7.35,7.5,C.paper);rect(sl,.73,.81,1.16,.07,C.saffron);t(sl,'INDEPENDENT APPLICATION WORK SAMPLE',.74,1.09,5.9,.33,{size:11,color:C.green,bold:true});t(sl,'HYDERABAD',.70,2.05,6.60,.97,{size:54,font:'Aptos Display',bold:true});t(sl,'Political dynamics,\ngovernance & public value',.76,3.32,6.2,1.48,{size:34,font:'Aptos Display'});t(sl,'Manash Protim Deori | Inclusive Minds',.75,5.86,6.29,.35,{size:16,color:C.green});t(sl,'Research cut-off 9 October 2026 · Historical data retain reference dates',.76,6.30,6.18,.48,{size:10,color:C.muted});return;}
    if(d.layout==='thanks'){sl.background={color:C.ink};t(sl,'THANK YOU',.74,1.27,11.6,1.17,{size:68,color:C.white,bold:true,font:'Aptos Display'});t(sl,'I welcome a discussion of the evidence and the research work I can contribute.',.78,3.15,11.7,.81,{size:23,color:C.white});t(sl,'MANASH PROTIM DEORI',.81,4.50,10,.36,{size:17,color:C.saffron,bold:true});t(sl,'manashdeori09@gmail.com',.81,5.12,9.4,.32,{size:17,color:C.white,url:'mailto:manashdeori09@gmail.com'});t(sl,'linkedin.com/in/manash-protim-deori',.81,5.57,9.5,.32,{size:16,color:C.white,url:'https://www.linkedin.com/in/manash-protim-deori'});t(sl,'manash-protim-deori.vercel.app',.81,6.02,9.5,.32,{size:16,color:C.white,url:'https://manash-protim-deori.vercel.app'});t(sl,'Independent work sample. Complete evidence appendix follows.',.80,7.03,11,.20,{size:10,color:C.stone});return;}
    chrome(sl,d);
    if(d.layout==='chart')chart(sl,d);
    else if(d.layout==='timeline')timeline(sl,d.items);
    else if(d.layout==='matrix')matrix(sl,d.items);
    else if(d.layout==='splitstats')stats(sl,d.items);
    else if(d.layout==='priorities')priorities(sl,d.items);
    else columns(sl,d.items,d.layout==='process'||d.layout==='academic'||d.layout==='professional');
    if(d.contribution)t(sl,d.contribution,.71,6.08,11.85,.32,{size:13,color:C.green,bold:true});
    limit(sl,d);
  }
  function appendix(sl,d){
    sl.background={color:C.paper};
    if(d.layout==='divider'){sl.background={color:C.ink};t(sl,'EVIDENCE APPENDIX',.76,.57,11,.28,{size:14,bold:true,color:C.saffron});t(sl,'Trace the claim.\nInspect the evidence.',.76,2.03,11.63,2.11,{size:54,font:'Aptos Display',color:C.white,bold:true});t(sl,'Sources · methods · reasoning · records · limitations',.80,5.24,11.3,.47,{size:19,color:C.white});return;}
    t(sl,d.section.toUpperCase(),.63,.29,11.9,.24,{size:10,bold:true,color:C.saffron});t(sl,d.title,.62,.79,11.99,.73,{size:d.title.length>70?24:29,bold:true,font:'Aptos Display'});line(sl,.63,1.66,12.04);t(sl,'APPENDIX '+String(d.number-20).padStart(2,'0'),.69,7.21,10,.18,{size:9,color:C.muted});
    if(d.layout==='evidence-card'){const pos=[[.67,1.93,5.83,1.06],[6.68,1.93,5.97,1.47],[.67,3.11,5.83,1.49],[6.68,3.58,5.97,1.62],[.67,4.76,5.83,1.90]];d.items.forEach((a,i)=>{const [x,y,w,h]=pos[i];rect(sl,x,y,w,h,i%2?C.soft:C.white,C.line);t(sl,a[0].toUpperCase(),x+.12,y+.10,w-.24,.25,{size:10,bold:true,color:C.green});let val=String(a[1]||'').replace(/https?:\/\/\S+/g,'[full clickable URL in source register]');t(sl,val,x+.12,y+.39,w-.22,h-.44,{size:i===1?10.3:i===4?12:12.5});});return;}
    if(d.layout==='source-register'){d.items.forEach((a,i)=>{let y=1.89+i*1.62;rect(sl,.69,y,11.92,1.42,i%2?C.soft:C.white,C.line);t(sl,a.id+' · '+a.title,.91,y+.11,11.44,.35,{size:16,bold:true,color:C.green});t(sl,a.publisher+' · '+a.publication_date+' · '+a.locator,.91,y+.47,11.38,.26,{size:11,color:C.muted});t(sl,a.url,.91,y+.78,11.40,.30,{size:11,color:C.blue,url:a.url});t(sl,a.limitation,.91,y+1.10,11.39,.25,{size:10,color:C.muted});});return;}
    const items=d.items||[],many=items.length>7,colCount=many?2:1,rows=Math.ceil(items.length/colCount),rh=Math.min(1.02,4.95/Math.max(rows,1));items.forEach((a,i)=>{let col=colCount===2&&i>=rows?1:0,r=colCount===2?i%rows:i,x=.70+6.08*col,y=1.96+r*rh,w=colCount===2?5.86:11.91;rect(sl,x,y,w,rh-.07,i%2?C.soft:C.white,C.line);let parts=Array.isArray(a)?a.map(String):[JSON.stringify(a)];t(sl,parts[0],x+.13,y+.08,w*.29,rh-.15,{size:colCount===2?11:13,bold:true,color:C.green});t(sl,parts.slice(1).join(' · '),x+w*.30,y+.07,w*.67,rh-.14,{size:colCount===2?10.2:12.5});});
    if(d.layout==='election-table')t(sl,'Selected AC rows remain blocked pending direct primary-record recheck.',.80,6.65,11.8,.27,{size:11,color:C.saffron,bold:true});
  }
  await fsp.mkdir(out,{recursive:true});
  for(const d of deck.slides){let sl=pptx.addSlide();d.number<=20?main(sl,d):appendix(sl,d);if(typeof sl.addNotes==='function')sl.addNotes(d.notes||'Refer to source and fact registers.');}
  await pptx.writeFile({fileName:path.join(out,'Manash-Protim-Deori-Hyderabad.pptx')});
  await fsp.writeFile(path.join(out,'deck-content.json'),JSON.stringify(deck));
  await fsp.writeFile(path.join(out,'manifest.json'),JSON.stringify({title:deck.title,cutoff:deck.cutoff,contentVersion:deck.content_version,total:deck.slides.length,mainCount:20,slides:deck.slides.map(s=>({number:s.number,title:s.title,section:s.section,body:s.body,contribution:s.contribution,limits:s.limits,notes:s.notes,dataText:s.chart?s.chart.title:'',image:'slide-'+String(s.number).padStart(2,'0')+'.webp'})),sources:deck.sources},null,2));
  console.log(JSON.stringify({slides:deck.slides.length,core:20,charts:deck.slides.slice(0,20).filter(s=>s.chart).map(s=>s.number)}));
