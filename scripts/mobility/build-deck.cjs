const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Manash Protim Deori';
pptx.subject = 'Independent Mobility Growth Advisory candidate case';
pptx.title = "Winning India's Commercial EV Transition";
pptx.company = 'Independent Candidate Analysis';
pptx.lang = 'en-IN';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'en-IN'
};
pptx.defineSlideMaster({
  title: 'BASE',
  background: { color: 'F7F9F8' },
  objects: [
    { line: { x: 0.45, y: 7.18, w: 12.43, h: 0, line: { color: 'D9E0DE', width: 0.7 } } },
    { text: { text: 'INDEPENDENT CANDIDATE ANALYSIS  |  MOBILITY GROWTH ADVISORY', options: { x: 0.5, y: 7.22, w: 7.4, h: 0.18, fontFace: 'Aptos', fontSize: 5.7, color: '68736F', charSpacing: 1.1, margin: 0, breakLine: false } } },
    { text: { text: 'Research cut-off: 02 Oct 2026', options: { x: 10.35, y: 7.22, w: 2.45, h: 0.18, fontFace: 'Aptos', fontSize: 5.7, color: '68736F', align: 'right', margin: 0 } } },
  ],
  slideNumber: { x: 12.84, y: 7.2, w: 0.22, h: 0.2, fontFace: 'Aptos', fontSize: 5.7, color: '68736F', align: 'right' }
});

const C = {
  ink:'0D1B18', muted:'5F6D68', green:'0F766E', green2:'14B8A6', teal:'2DD4BF',
  blue:'0EA5E9', amber:'D97706', gold:'F59E0B', red:'B91C1C', line:'D9E0DE',
  paper:'F7F9F8', white:'FFFFFF', soft:'EDF5F2', soft2:'EEF4F7', charcoal:'17211E'
};

function addText(slide,text,x,y,w,h,size=14,color=C.ink,opts={}) {
  slide.addText(text,{x,y,w,h,fontFace:'Aptos',fontSize:size,color,margin:0,breakLine:false,
    valign:opts.valign||'mid',bold:!!opts.bold,italic:!!opts.italic,align:opts.align||'left',
    fit:'shrink',charSpacing:opts.charSpacing||0,bullet:opts.bullet,paraSpaceAfterPt:opts.paraSpaceAfterPt||0});
}
function rect(slide,x,y,w,h,fill='FFFFFF',line=C.line,r=0.08) {
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:r,fill:{color:fill},line:{color:line,width:0.8},radius:r});
}
function line(slide,x,y,w,h,color=C.line,width=1,dash='solid') {
  slide.addShape(pptx.ShapeType.line,{x,y,w,h,line:{color,width,dashType:dash}});
}
function circle(slide,x,y,d,fill,lineColor=fill) {
  slide.addShape(pptx.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:fill},line:{color:lineColor,width:0.5}});
}
function title(slide,kicker,headline,sub='') {
  addText(slide,kicker.toUpperCase(),0.55,0.37,5.7,0.24,7.5,C.green,{bold:true,charSpacing:1.8});
  addText(slide,headline,0.55,0.7,12.15,0.68,23,C.ink,{bold:true});
  if(sub) addText(slide,sub,0.55,1.42,11.6,0.42,10.1,C.muted);
}
function card(slide,x,y,w,h,k,v,b,tone=C.green) {
  rect(slide,x,y,w,h,C.white,C.line);
  addText(slide,k.toUpperCase(),x+0.16,y+0.12,w-0.32,0.2,6.3,C.muted,{bold:true,charSpacing:1});
  addText(slide,v,x+0.16,y+0.36,w-0.32,0.34,18,tone,{bold:true});
  addText(slide,b,x+0.16,y+0.77,w-0.32,h-0.86,7.3,C.muted,{valign:'top'});
}
function note(slide, core, challenge, defence, appendix) {
  if(!slide.addNotes) return;
  slide.addNotes([
    {text:'CORE MESSAGE: ' + core},
    {text:'LIKELY CHALLENGE: ' + challenge},
    {text:'DEFENCE: ' + defence},
    {text:'DEEPER EVIDENCE: ' + appendix},
  ]);
}
function source(slide,txt){ addText(slide,'Source: '+txt,0.58,6.89,11.9,0.18,5.5,'75807C'); }

function addBulletList(slide,items,x,y,w,h,accent=C.green) {
  const step = h/items.length;
  items.forEach((it,i)=>{
    circle(slide,x,y+i*step+0.06,0.08,accent);
    addText(slide,it,x+0.18,y+i*step,w-0.18,step-0.02,9.3,C.ink,{valign:'top'});
  });
}

function cover(){
  const s=pptx.addSlide(); s.background={color:'07130F'};
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:7.5,fill:{color:'07130F'},line:{color:'07130F'}});
  circle(s,9.7,-1.2,5.6,'07130F','12483E'); circle(s,10.45,-0.45,4.1,'07130F','1D6B5B');
  line(s,8.2,1.0,4.2,0,C.green2,1.2); line(s,8.75,1.4,3.1,0,C.blue,0.8);
  addText(s,'INDEPENDENT CANDIDATE ANALYSIS',0.7,0.68,5.2,0.25,8.3,'70E0C5',{bold:true,charSpacing:2.2});
  addText(s,"WINNING INDIA'S\nCOMMERCIAL EV\nTRANSITION",0.7,1.35,7.3,2.25,30,'FFFFFF',{bold:true,valign:'top'});
  addText(s,'Where will the most defensible growth opportunities emerge through 2030?',0.72,3.92,6.65,0.55,13,'C6D6D1');
  addText(s,'Market Attractiveness  |  Fleet Economics  |  Competitive Positioning  |  Ecosystem Evolution  |  Growth Strategy',0.72,5.0,7.8,0.4,8.4,'7FB7A8');
  rect(s,9.2,4.45,3.0,1.3,'0D211B','194B40'); addText(s,'Evidence chain',9.45,4.68,2.4,0.2,7,'6DE0C3',{bold:true,charSpacing:1.2});
  addText(s,'SOURCE → DATA → MODEL → INSIGHT → DECISION',9.45,5.07,2.25,0.55,10,'FFFFFF',{bold:true});
  addText(s,'Manash Protim Deori  ·  Research cut-off 02 Oct 2026',0.72,6.72,7.6,0.22,7,'94A9A2');
}

function s1(){
  const s=pptx.addSlide('BASE'); title(s,'01 · Executive thesis',"Commercial electrification is expanding — but the economics remain concentrated in high-utilisation duty cycles",'The strategic unit of analysis is the duty cycle, not the average vehicle market.');
  card(s,0.6,2.05,2.8,1.35,'EV share of registrations','8.25%','India, FY2025–26; all registered vehicle types.',C.green);
  card(s,3.6,2.05,2.8,1.35,'Electric share · goods CV','1.4%','2025 commercial goods vehicle share in NITI/WRI index.',C.blue);
  card(s,6.6,2.05,2.8,1.35,'CV domestic sales','1.08m','FY2025–26 SIAM domestic sales.',C.amber);
  card(s,9.6,2.05,2.8,1.35,'Public charging points','~29k','India public chargers reported through Jun 2025.',C.green2);
  rect(s,0.6,3.7,11.8,2.45,C.soft,'C9DED7'); addText(s,'THESIS',0.85,3.94,1.1,0.2,7.5,C.green,{bold:true,charSpacing:1.5});
  addText(s,'Commercial EV adoption should advance first where predictable routes, high daily kilometres and controllable charging access turn operating savings into a measurable lifecycle-cost advantage.',0.85,4.34,7.65,0.93,18,C.ink,{bold:true,valign:'top'});
  addText(s,'IMPLICATION',9.05,3.94,1.5,0.2,7.5,C.green,{bold:true,charSpacing:1.2});
  addText(s,'Segment the opportunity by duty-cycle economics, then design financing + charging + service around the fleet operating model.',9.05,4.35,2.9,1.1,10.2,C.ink,{bold:true,valign:'top'});
  source(s,'NITI Aayog/WRI IEMI 2025; SIAM FY2025–26; candidate analysis.');
  note(s,'Average-market growth hides the economically advantaged use cases.','Why focus on duty cycle instead of market CAGR?','Because utilisation changes the operating-savings denominator and can move payback faster than top-line market growth.','A12–A19 TCO sensitivities.');
}

function s2(){
 const s=pptx.addSlide('BASE'); title(s,'02 · Structural drivers','The transition is being pulled by operating economics — and held back by capital, uptime and residual-value uncertainty');
 const rows=[
  ['Battery / product availability','+',C.green,'More viable products; LFP and localisation improve cost resilience.'],
  ['Fuel vs electricity economics','+',C.green,'High daily kilometres can compound per-km savings.'],
  ['Policy / procurement support','+',C.green,'PM E-DRIVE and bus/truck incentives reduce selected barriers.'],
  ['Charging / depot access','±',C.amber,'Controlled depot charging helps; queues and grid constraints destroy uptime.'],
  ['Financing / residual value','–',C.red,'Higher capex and uncertain resale values can dominate fleet purchase decisions.'],
  ['Software / telematics','+',C.blue,'Uptime, route planning and battery health turn data into economics.'],
 ];
 rows.forEach((r,i)=>{ const y=1.95+i*0.72; addText(s,r[0],0.75,y,2.55,0.36,10,C.ink,{bold:true}); rect(s,3.45,y-0.02,0.45,0.35,r[2],r[2]); addText(s,r[1],3.45,y-0.01,0.45,0.3,12,'FFFFFF',{bold:true,align:'center'}); addText(s,r[3],4.18,y,7.75,0.38,9.1,C.muted); line(s,0.72,y+0.48,11.5,0,C.line,0.6); });
 source(s,'PM E-DRIVE; IEA Global EV Outlook 2026; Frost & Sullivan commercial-mobility discussion; candidate synthesis.');
 note(s,'Economics improve, but friction is concentrated in capital and uptime.','What if incentives disappear?','The case is stress-tested around utilisation and charging; subsidy is not the sole driver in the base operating-cost comparison.','A27 policy timeline; A14–A19 sensitivity.');
}

function s3(){
 const s=pptx.addSlide('BASE'); title(s,'03 · 2030 scenarios','A 15% commercial-EV share would imply ~197k annual units in 2030 under a transparent candidate scenario model','The model grows the FY2025–26 CV base at 5% p.a.; scenario EV shares are assumptions, not external forecasts.');
 const vals=[['Downside','8%','105k','6B7280'],['Base','15%','197k',C.green],['Upside','25%','328k',C.amber]];
 vals.forEach((v,i)=>{ const x=0.75+i*4.08; rect(s,x,2.0,3.55,2.4,'FFFFFF',v[3]); addText(s,v[0].toUpperCase(),x+0.2,2.2,2.5,0.2,7,C.muted,{bold:true,charSpacing:1.3}); addText(s,v[1],x+0.2,2.7,1.4,0.6,30,v[3],{bold:true}); addText(s,v[2]+' units',x+1.7,2.87,1.4,0.35,14,C.ink,{bold:true,align:'right'}); addText(s,'2030 candidate-model EV share',x+0.2,3.55,2.95,0.35,8.5,C.muted); });
 addText(s,'Model chain',0.78,4.8,1.2,0.2,7,C.green,{bold:true,charSpacing:1.2});
 const chain=[['1.08m','FY25–26 CV sales'],['× 1.05⁴','5% annual CV-growth assumption'],['= 1.31m','2030 total CV scenario'],['× EV share','8% / 15% / 25%']];
 chain.forEach((c,i)=>{const x=0.8+i*3.0; rect(s,x,5.18,2.55,0.82,C.soft,'D2E4DE'); addText(s,c[0],x+0.12,5.31,1.0,0.23,10.5,C.green,{bold:true}); addText(s,c[1],x+0.12,5.62,2.25,0.2,6.8,C.muted); if(i<3) addText(s,'→',x+2.65,5.36,0.28,0.25,13,C.muted,{bold:true});});
 source(s,'SIAM FY2025–26 actual base; 2030 growth/share assumptions are candidate-model inputs.');
 note(s,'The forecast is a scenario frame, not a prediction.','Why 5% total-market CAGR and 15% EV share?','They are explicit editable assumptions used to test strategic robustness, not asserted as facts.','A10–A11 scenario assumptions; workbook Forecast.');
}

function s4(){
 const s=pptx.addSlide('BASE'); title(s,'04 · Segment attractiveness','Commercial electrification should progress in islands of strong economics rather than uniformly across the vehicle market');
 line(s,1.2,5.9,10.8,0,C.ink,1); line(s,1.2,2.0,0,3.9,C.ink,1);
 addText(s,'Operational suitability →',9.1,6.1,2.6,0.24,8,C.muted,{bold:true});
 addText(s,'Economic attractiveness →',0.35,2.1,0.24,2.5,8,C.muted,{bold:true});
 const pts=[['Last-mile 3W',9.8,2.45,C.green],['Urban bus',8.6,2.75,C.green],['E-commerce LCV',8.1,3.25,C.green2],['Taxi fleet',6.7,3.55,C.blue],['Employee transport',6.0,4.1,C.blue],['Intercity bus',4.8,4.7,C.amber],['Heavy truck',3.1,5.1,C.red]];
 pts.forEach(p=>{ circle(s,p[1],p[2],0.2,p[3]); addText(s,p[0],p[1]+0.27,p[2]-0.02,1.55,0.25,7.7,C.ink,{bold:true});});
 addText(s,'High utilisation + predictable routes + depot access',7.15,1.88,4.4,0.25,7.5,C.green,{bold:true});
 addText(s,'Illustrative positioning based on duty-cycle logic; not a measured national ranking.',0.75,6.5,8.2,0.25,7,C.muted,{italic:true});
 source(s,'IEA; NITI/WRI; candidate framework.');
 note(s,'Electrification readiness differs materially by duty cycle.','Are these segment positions objective?','No. They are an explicit analytical framework. The deck avoids presenting a false precision league table.','A1 definitions; A28 risk register.');
}

function s5(){
 const s=pptx.addSlide('BASE'); title(s,'05 · Fleet TCO crossover','In the illustrative LCV archetype, utilisation above ~83 km/day shifts the base case toward EV lifecycle-cost advantage','Five-year NPV model; financing included; charger allocation included; assumptions are editable and separated from sourced product specifications.');
 const data=[['60','12.97','11.52'],['80','10.16','10.01'],['100','8.47','9.10'],['120','7.35','8.49'],['150','6.23','7.88'],['180','5.48','7.48']];
 addText(s,'₹ / km',0.72,1.95,0.7,0.2,7,C.muted,{bold:true});
 const max=13; data.forEach((r,i)=>{const y=2.35+i*0.62; addText(s,r[0]+' km/day',0.75,y,1.05,0.24,7.6,C.ink,{bold:true}); const ew=Number(r[1])/max*4.1; const dw=Number(r[2])/max*4.1; s.addShape(pptx.ShapeType.rect,{x:1.95,y:y+0.01,w:ew,h:0.16,fill:{color:C.green2},line:{color:C.green2}}); s.addShape(pptx.ShapeType.rect,{x:6.55,y:y+0.01,w:dw,h:0.16,fill:{color:C.amber},line:{color:C.amber}}); addText(s,'EV '+r[1],1.95+ew+0.1,y-0.03,0.72,0.22,7,C.green,{bold:true}); addText(s,'Diesel '+r[2],6.55+dw+0.1,y-0.03,0.85,0.22,7,C.amber,{bold:true});});
 rect(s,10.05,2.15,2.2,2.65,C.soft,'C8DDD6'); addText(s,'BASE CROSSOVER',10.25,2.38,1.8,0.2,6.5,C.green,{bold:true,charSpacing:1}); addText(s,'~83',10.25,2.78,1.5,0.6,30,C.ink,{bold:true}); addText(s,'km / day',10.27,3.35,1.2,0.25,9,C.muted,{bold:true}); addText(s,'At 100 km/day:\nEV ~₹8.47/km\nDiesel ~₹9.10/km',10.25,3.85,1.65,0.75,9,C.ink,{bold:true,valign:'top'});
 addText(s,'Base assumptions include EV ₹9.5L vs diesel ₹5.5L, 12%/60m financing, ₹9/kWh, ₹90/L diesel, 300 operating days/year, 5-year ownership.',0.78,6.3,11.1,0.35,7.2,C.muted);
 source(s,'Tata Ace EV 1000 product specs; all fleet economics inputs not directly sourced are labelled candidate assumptions.');
 note(s,'Utilisation is the dominant controllable driver in the illustrative TCO.','Did you include financing, residual value and charger capex?','Yes; the model includes financing, fixed annual costs, allocated charger capex, residual value and battery replacement-risk line items.','A12–A19 TCO model and sensitivities.');
}

function s6(){
 const s=pptx.addSlide('BASE'); title(s,'06 · Charging bottleneck','For high-utilisation fleets, charging infrastructure becomes a productivity variable — not just a hardware variable');
 const stages=[['VEHICLE\nARRIVES','route schedule'],['CHARGER\nACCESS','queue + power'],['DWELL\nTIME','kWh + charge curve'],['VEHICLE\nRETURNS','revenue km'],['TCO\nIMPACT','₹/km + uptime']];
 stages.forEach((a,i)=>{const x=0.7+i*2.48; rect(s,x,2.35,1.95,1.55,i===4?C.soft:'FFFFFF',i===4?C.green:C.line); addText(s,a[0],x+0.12,2.62,1.7,0.55,11,i===4?C.green:C.ink,{bold:true,align:'center'}); addText(s,a[1],x+0.12,3.35,1.7,0.2,7,C.muted,{align:'center'}); if(i<4) addText(s,'→',x+2.03,2.91,0.33,0.3,14,C.muted,{bold:true,align:'center'});});
 rect(s,0.7,4.55,11.85,1.2,'FFF7ED','F3D0A1'); addText(s,'INSIGHT',0.92,4.78,1.0,0.2,7,C.amber,{bold:true,charSpacing:1.2}); addText(s,'A charger that is technically available but operationally congested can erase vehicle-cost savings through lost revenue kilometres and higher schedule risk.',2.0,4.68,9.9,0.55,14,C.ink,{bold:true});
 source(s,'PM E-DRIVE charging provisions; Frost & Sullivan Sep 2026 commercial-mobility discussion; candidate operating model.');
 note(s,'Charging should be modelled inside fleet economics.','Is range or charging the bigger constraint?','It depends on duty cycle; for predictable high-utilisation fleets, access, charge time and queueing can be more economically binding than nominal range.','A20 charging assumptions.');
}

function s7(){
 const s=pptx.addSlide('BASE'); title(s,'07 · Competitive battlefield','Competitive advantage is broadening from vehicle specifications toward integrated lifecycle economics');
 const cols=['Vehicle','Charging','Service','Financing','Software / data','Fleet ecosystem'];
 const players=[
  ['Tata Ace EV 1000','Strong','Growing','Broad','Partner-led','FleetEdge','Scaled'],
  ['Mahindra ZEO','Strong','Supported','Broad','Partner-led','Connected','Scaled'],
  ['SWITCH IeV4','Strong','Supported','Focused','Partner-led','iON','CV-focused'],
 ];
 addText(s,'Illustrative evidence map — not an official Frost Radar™ and not a league-table ranking.',0.65,1.72,10.2,0.23,7,C.muted,{italic:true});
 const x0=2.45, cw=1.55; cols.forEach((c,i)=>{addText(s,c,x0+i*cw,2.12,cw-0.08,0.4,7.2,C.muted,{bold:true,align:'center'});});
 players.forEach((p,r)=>{const y=2.75+r*0.9; addText(s,p[0],0.7,y,1.6,0.36,9,C.ink,{bold:true}); for(let i=1;i<p.length;i++){const tone=p[i]==='Strong'||p[i]==='Scaled'||p[i]==='Broad'?C.soft:'F4F6F5'; rect(s,x0+(i-1)*cw,y-0.05,cw-0.12,0.52,tone,'D6DEDB'); addText(s,p[i],x0+(i-1)*cw,y+0.05,cw-0.12,0.24,7.2,C.ink,{bold:true,align:'center'});} });
 rect(s,0.7,5.65,11.3,0.72,C.soft,'C8DDD6'); addText(s,'The defensible question is not “who has the longest range?” but “who reduces total adoption friction across vehicle, uptime, financing and lifecycle data?”',0.9,5.84,10.9,0.32,10.2,C.ink,{bold:true});
 source(s,'Tata Motors, Mahindra and SWITCH Mobility public product disclosures; candidate synthesis.');
 note(s,'Competition is becoming ecosystem-shaped.','Why did you choose these players?','They provide directly comparable public LCV/e-CV product evidence in India and illustrate different ecosystem approaches.','A21 vehicle comparison; A22–A23 benchmark evidence.');
}

function s8(){
 const s=pptx.addSlide('BASE'); title(s,'08 · Value-pool migration','The recurring value pool can extend beyond the vehicle into energy, uptime, software and battery lifecycle services');
 const nodes=[['VEHICLE','one-time / financed'],['ENERGY','repeat spend'],['CHARGING','infra + service'],['FINANCE','risk + access'],['SOFTWARE','recurring'],['DATA','optimisation'],['SERVICE','uptime'],['BATTERY','residual / second life']];
 nodes.forEach((n,i)=>{const col=i%4,row=Math.floor(i/4),x=0.75+col*3.0,y=2.0+row*1.65; rect(s,x,y,2.55,1.05,i>=4?C.soft:'FFFFFF',i>=4?'C8DDD6':C.line); addText(s,n[0],x+0.16,y+0.18,2.2,0.25,11,i>=4?C.green:C.ink,{bold:true}); addText(s,n[1],x+0.16,y+0.56,2.2,0.22,7,C.muted);});
 addText(s,'Strategic implication',0.78,5.65,1.5,0.2,7,C.green,{bold:true,charSpacing:1}); addText(s,'Own the layers that measurably improve fleet economics or create durable switching costs; partner where scale or regulation makes ownership inefficient.',2.25,5.55,9.7,0.5,13,C.ink,{bold:true});
 source(s,'Frost & Sullivan public mobility themes; OEM connected-services disclosures; candidate value-chain synthesis.');
 note(s,'The opportunity expands from product sale to lifecycle economics.','Are these value pools quantified?','Only where credible public data permit. The deck avoids fabricating revenue pools and uses qualitative prioritisation otherwise.','A26 value-chain map.');
}

function s9(){
 const s=pptx.addSlide('BASE'); title(s,'09 · Growth opportunity prioritisation','The most attractive near-term opportunities remove adoption friction before they chase abstract digital monetisation','Independent opportunity framework; scores are candidate inputs and are sensitivity-tested.');
 const opp=[
  ['Fleet electrification solutions',8.4,'high pain · direct TCO'],
  ['Depot / managed charging',8.1,'uptime + energy control'],
  ['EV financing / residual tools',7.8,'capital barrier'],
  ['Fleet software / telematics',7.4,'recurring + optimisation'],
  ['Battery analytics / lifecycle',6.9,'future residual value'],
  ['High-power truck charging',5.8,'large long-run need · high capex'],
 ];
 opp.forEach((o,i)=>{const y=1.92+i*0.7; addText(s,String(i+1).padStart(2,'0'),0.72,y,0.35,0.24,7,C.green,{bold:true}); addText(s,o[0],1.15,y,3.1,0.28,9.2,C.ink,{bold:true}); const w=o[1]/10*5.1; s.addShape(pptx.ShapeType.rect,{x:4.55,y:y+0.03,w:w,h:0.14,fill:{color:i<3?C.green2:'9DB8B0'},line:{color:i<3?C.green2:'9DB8B0'}}); addText(s,o[1].toFixed(1),9.82,y-0.03,0.42,0.23,7.5,C.ink,{bold:true,align:'right'}); addText(s,o[2],10.45,y,1.7,0.28,7,C.muted);});
 rect(s,0.72,6.0,11.4,0.58,'FFF7ED','F3D0A1'); addText(s,'Do not interpret the score as an objective market ranking; it is a transparent decision scaffold whose weights can be changed.',0.95,6.16,10.9,0.25,8.4,C.ink,{bold:true});
 source(s,'Candidate Opportunity Attractiveness Index: market growth, economics, customer pain, white space, fit, scalability, execution risk.');
 note(s,'Near-term opportunity quality is highest where adoption friction is measurable.','Why these weights?','Weights are explicit candidate judgements; the appendix shows sensitivity and the recommendation is only strong if it survives modest weight changes.','A24–A25 opportunity-index method and sensitivity.');
}

function s10(){
 const s=pptx.addSlide('BASE'); title(s,'10 · Strategic recommendation','Win economically advantaged duty cycles first, integrate adoption barriers into the offer, then expand into recurring lifecycle services');
 const blocks=[
  ['01','WIN THE RIGHT DUTY CYCLES','0–12 months','Select applications where utilisation, route predictability and charging access create provable economics.','TCO gap · uptime · daily km'],
  ['02','REMOVE ADOPTION FRICTION','12–36 months','Bundle charging, finance, service assurance and residual-value evidence rather than selling a vehicle in isolation.','conversion · charger uptime · payback'],
  ['03','MONETISE THE LIFECYCLE','36–60 months','Scale telematics, predictive maintenance, energy orchestration and battery analytics after the installed base is validated.','attach rate · recurring revenue · retention'],
 ];
 blocks.forEach((b,i)=>{const x=0.75+i*4.08; rect(s,x,2.0,3.55,3.5,i===0?C.soft:'FFFFFF',i===0?'BBD9CF':C.line); addText(s,b[0],x+0.2,2.18,0.45,0.22,8,C.green,{bold:true}); addText(s,b[1],x+0.2,2.58,3.0,0.55,13,C.ink,{bold:true}); addText(s,b[2].toUpperCase(),x+0.2,3.34,1.5,0.2,6.7,C.amber,{bold:true,charSpacing:1}); addText(s,b[3],x+0.2,3.75,3.05,0.85,9,C.muted,{valign:'top'}); line(s,x+0.2,4.82,3.0,0,C.line,0.6); addText(s,'KPI · '+b[4],x+0.2,5.0,3.0,0.32,7,C.ink,{bold:true});});
 addText(s,'Scale only when each phase clears evidence, contribution, uptime and repeatability gates.',0.78,5.95,11.0,0.4,12,C.ink,{bold:true});
 source(s,'Candidate strategy synthesis from market, TCO, charging, competitive and value-chain modules.');
 note(s,'Strategy is sequenced by evidence, not enthusiasm.','Why not scale software immediately?','Recurring lifecycle services are more defendable after the installed base and data-generating operating relationships are proven.','A28 risk register; A29 thesis invalidation.');
}

function s11(){
 const s=pptx.addSlide('BASE'); title(s,'11 · Why I fit the role','My background maps directly to the analyst capabilities required to turn ambiguous market questions into structured, client-ready recommendations');
 const f=[
 ['Engineering rigour','B.Tech · Chemical Engineering','quantitative decomposition · assumption testing'],
 ['Commercial perspective','MBA · IIM Shillong','customer · competition · financial trade-offs'],
 ['Client execution','analytics-heavy · client-facing work','senior stakeholders · deadlines · accountable delivery'],
 ['Research → recommendation','this independently built case','source hierarchy · modelling · synthesis · presentation'],
 ];
 f.forEach((a,i)=>{const col=i%2,row=Math.floor(i/2),x=0.75+col*6.05,y=2.0+row*1.75; rect(s,x,y,5.55,1.4,i===3?C.soft:'FFFFFF',i===3?'C8DDD6':C.line); addText(s,a[0].toUpperCase(),x+0.2,y+0.16,2.4,0.2,6.6,C.green,{bold:true,charSpacing:1.1}); addText(s,a[1],x+0.2,y+0.5,4.9,0.34,12,C.ink,{bold:true}); addText(s,a[2],x+0.2,y+0.94,4.95,0.25,7.6,C.muted);});
 rect(s,0.75,5.75,11.55,0.58,C.charcoal,C.charcoal); addText(s,'ENGINEERING RIGOUR  +  MBA COMMERCIAL THINKING  +  CLIENT EXECUTION  +  DEMONSTRATED MOBILITY ANALYSIS',0.98,5.93,11.05,0.22,8.5,'D6FFF4',{bold:true,align:'center',charSpacing:0.4});
 source(s,'Candidate background; case work shown in this deck.');
 note(s,'Fit is evidenced by the work, not claimed through adjectives.','You are not a Mechanical Engineer. Why Mobility?','Engineering trained me to decompose systems; the MBA added commercial logic; the case demonstrates rapid domain acquisition tied to decision-making.','Slide 13 analytical method.');
}

function s12(){
 const s=pptx.addSlide('BASE'); title(s,'12 · How I would contribute','I would contribute by increasing the speed, traceability and decision usefulness of Mobility Growth Advisory analysis');
 const p=[['0–30','LEARN & CALIBRATE','taxonomies · databases · standards · QA','Rapid domain ramp-up'],['31–60','PRODUCE','research · sizing · benchmarking · models · slides','Reliable analyst modules'],['61–90','IMPROVE','source maps · assumption logs · scenarios · QA','More reproducible execution'],['90+','DEEPEN','EV · fleets · charging · connected / SDV','Progressively own workstreams']];
 p.forEach((a,i)=>{const x=0.67+i*3.05; rect(s,x,2.0,2.65,3.4,i===1?C.soft:'FFFFFF',i===1?'C8DDD6':C.line); circle(s,x+0.18,2.22,0.62,C.green2); addText(s,a[0],x+0.18,2.35,0.62,0.2,7.2,'FFFFFF',{bold:true,align:'center'}); addText(s,a[1],x+0.18,3.08,2.1,0.35,11,C.ink,{bold:true}); addText(s,a[2],x+0.18,3.65,2.15,0.74,8.5,C.muted,{valign:'top'}); line(s,x+0.18,4.62,2.05,0,C.line,0.6); addText(s,a[3],x+0.18,4.85,2.05,0.4,8,C.green,{bold:true});});
 addText(s,'Objective: become the analyst trusted with an ambiguous problem, transparent evidence, a challenged model and a client-actionable recommendation.',0.78,5.85,11.1,0.48,12,C.ink,{bold:true});
 source(s,'Candidate contribution plan.');
 note(s,'The plan prioritises calibration before process improvement.','Would you really change templates in the first 90 days?','Only after learning team standards; the contribution is framed as reusable accelerators after calibration, not unilateral process redesign.','Candidate contribution plan.');
}

function s13(){
 const s=pptx.addSlide('BASE'); title(s,'13 · Analytical method','Every recommendation was built through a traceable chain from source evidence to decision implication');
 const chain=['QUESTION','HYPOTHESIS','DEFINE','SOURCE','DATA','MODEL','SENSITIVITY','INSIGHT','DECISION'];
 chain.forEach((a,i)=>{const x=0.65+i*1.37; rect(s,x,2.22,1.12,0.68,i>=6?C.soft:'FFFFFF',i>=6?'C8DDD6':C.line); addText(s,a,x+0.06,2.44,1.0,0.2,6.4,i>=6?C.green:C.ink,{bold:true,align:'center',charSpacing:0.5}); if(i<chain.length-1) addText(s,'→',x+1.13,2.42,0.22,0.2,9,C.muted,{bold:true,align:'center'});});
 rect(s,0.75,3.55,5.65,1.8,C.white,C.line); addText(s,'PUBLIC-DATA WORK CAN ANSWER',0.95,3.78,2.5,0.2,7,C.green,{bold:true,charSpacing:1}); addBulletList(s,['market definition and structure','public product / policy evidence','transparent TCO and scenario logic','competitive hypotheses'],0.95,4.18,4.95,0.95,C.green2);
 rect(s,6.75,3.55,5.55,1.8,'FFF7ED','F3D0A1'); addText(s,'PROFESSIONAL RESOURCES WOULD ADD',6.95,3.78,3.1,0.2,7,C.amber,{bold:true,charSpacing:1}); addBulletList(s,['primary fleet/operator interviews','proprietary databases and customer surveys','supplier and expert validation','company-specific economics'],6.95,4.18,4.85,0.95,C.amber);
 addText(s,'Credibility is strengthened by stating what the public evidence can — and cannot — prove.',0.8,5.75,11.2,0.4,12,C.ink,{bold:true});
 source(s,'Independent research method.');
 note(s,'The analysis separates what is known from what still needs primary research.','What would you do with Frost & Sullivan resources?','Add primary interviews, proprietary datasets, customer research and internal benchmarks while preserving the same evidence chain.','A2 source hierarchy; A32 limitations.');
}

function divider(){
 const s=pptx.addSlide(); s.background={color:C.charcoal}; addText(s,'APPENDIX',0.75,0.85,2,0.25,9,C.teal,{bold:true,charSpacing:2}); addText(s,'Audit trail & interview defence',0.75,1.5,9.5,0.7,28,'FFFFFF',{bold:true}); addText(s,'Definitions · sources · scenario math · TCO assumptions · sensitivity · competitor evidence · falsifiers · 20-pass QA',0.75,2.55,10.6,0.55,12,'B6C7C1'); addText(s,'The appendix exists so every material challenge can be answered by moving from recommendation back to evidence.',0.75,4.4,8.5,0.6,16,'E4EFEB',{bold:true});
}
function appendix(titleText, rows, footer){
 const s=pptx.addSlide('BASE'); title(s,'Appendix',titleText); const y0=1.82; rows.forEach((r,i)=>{const y=y0+i*0.55; addText(s,r[0],0.75,y,2.8,0.3,8.1,C.ink,{bold:true}); addText(s,r[1],3.75,y,8.25,0.32,8,C.muted); line(s,0.72,y+0.4,11.55,0,C.line,0.55);}); source(s,footer); return s;
}

cover(); s1(); s2(); s3(); s4(); s5(); s6(); s7(); s8(); s9(); s10(); s11(); s12(); s13(); divider();
appendix('A1 · Scope, definitions & perimeter',[
 ['Geography','India; national public sources unless a state-specific policy is explicitly cited.'],
 ['Commercial vehicle','SIAM CV classification for market base; e-3W discussed separately to avoid category mixing.'],
 ['EV definition','Battery electric unless otherwise stated; hybrids are not silently merged into BEV penetration.'],
 ['Observed vs forecast','FY2025–26 actuals separated visually from all 2030 candidate scenarios.'],
 ['Market unit','Annual domestic sales / registrations where specified; stock and flow are never treated as interchangeable.'],
 ['TCO perimeter','Illustrative LCV archetype; five-year ownership; financing + fixed costs + residual value included.'],
], 'Methodology definitions; candidate analysis.');
appendix('A2 · Source hierarchy & data lineage',[
 ['Tier 1','MoRTH/VAHAN · MHI/PM E-DRIVE · NITI Aayog · CEA · company filings / official product specs.'],
 ['Tier 2','IEA · World Bank · ICCT · peer-reviewed / institutional research.'],
 ['Tier 3','SIAM · FADA · ACMA and relevant industry bodies.'],
 ['Tier 4','Frost & Sullivan and other reputable strategy / industry research where publicly accessible.'],
 ['Tier 5','High-quality journalism for context or recent events only.'],
 ['Rule','Every material number is tagged internally as verified fact, derived fact, modelled estimate or assumption.'],
], 'NITI Aayog/WRI; SIAM; IEA; MHI; Frost & Sullivan; OEM primary sources.');
appendix('A3 · Public fact anchors',[
 ['EV share · FY25–26','8.25% of registrations; NITI/WRI IEMI 2025.'],
 ['EVs on road','>8.7m; NITI/WRI IEMI 2025.'],
 ['Commercial goods EV share','0.6% in 2024 → 1.4% in 2025; NITI/WRI IEMI 2025.'],
 ['CV domestic sales','1,079,871 units in FY2025–26; SIAM.'],
 ['India e-truck registrations','~200 in 2024 → ~800 in 2025; IEA Global EV Outlook 2026.'],
 ['e-3W sales','Almost 800k in 2025; >2/3 of 3W sales electric; IEA.'],
 ['Public chargers','~29,000 by June 2025; NITI/WRI IEMI 2025.'],
], 'NITI Aayog/WRI IEMI 2025; SIAM; IEA Global EV Outlook 2026.');
appendix('A4 · Scenario arithmetic',[
 ['Base actual','1,079,871 FY2025–26 domestic CV sales.'],
 ['2030 total CV assumption','5% p.a. for four years → ~1.313m units.'],
 ['Downside EV share','8% → ~105k annual EV units.'],
 ['Base EV share','15% → ~197k annual EV units.'],
 ['Upside EV share','25% → ~328k annual EV units.'],
 ['Interpretation','Decision scenarios, not an election-style prediction or external house forecast.'],
], 'SIAM base; scenario shares and total-market growth are candidate assumptions.');
appendix('A5 · TCO assumption ledger',[
 ['Vehicle capex','EV ₹9.5L; diesel ₹5.5L — candidate assumptions for archetype, not national averages.'],
 ['Finance','20% down; 12% annual; 60 months — candidate assumption.'],
 ['Energy','EV: 21.3 kWh / 161 km × 1.25 real-world uplift; ₹9/kWh. Diesel: 15 km/L; ₹90/L.'],
 ['Maintenance','EV ₹0.8/km; diesel ₹1.2/km — candidate assumptions.'],
 ['Fixed annual cost','EV ₹25k; diesel ₹20k — candidate assumptions.'],
 ['Charger allocation','₹75k allocated to EV case — candidate assumption.'],
 ['Residual value','EV 20%; diesel 25%; 5-year ownership — candidate assumptions.'],
], 'Tata Ace EV 1000 public specs for battery/range anchor; economics inputs are explicit candidate assumptions.');
appendix('A6 · TCO sensitivity & falsifiers',[
 ['Base crossover','~83 km/day under ₹9/kWh and ₹90/L diesel assumptions.'],
 ['Electricity ₹7 / diesel ₹90','~78 km/day.'],
 ['Electricity ₹11 / diesel ₹90','~89 km/day.'],
 ['Electricity ₹13 / diesel ₹80','~114 km/day.'],
 ['Falsifier','If actual utilisation remains below crossover, the EV advantage does not hold for this archetype.'],
 ['Falsifier','If charger downtime or battery replacement risk materially exceeds the model, recommendation must change.'],
], 'Candidate sensitivity model; see analytical workbook.');
appendix('A7 · Competitive evidence anchors',[
 ['Tata Ace EV 1000','1,000 kg payload; 161 km certified range; 21.3 kWh LFP; public service / FleetEdge ecosystem.'],
 ['Mahindra ZEO','Up to 765 kg payload; company-stated 160 km real-world range; 21.3 kWh; connected proposition.'],
 ['SWITCH IeV4','1,750 kg payload; company-stated 130 km real-world / 206 km ARAI; 32.2 kWh; iON telematics.'],
 ['Boundary','Evidence map is not a proprietary Frost Radar™ and does not claim an objective winner.'],
 ['Why these players','Publicly accessible India commercial-EV product evidence supports comparable lifecycle questions.'],
], 'Tata Motors, Mahindra and SWITCH Mobility public product disclosures.');
appendix('A8 · Interview defence & 20-pass QA',[
 ['Stress test','Market sizing · forecasting · TCO · charging · technology · competition · policy · finance · candidate fit.'],
 ['Red team','Try to disprove EV economics, charging scalability, residual value, policy stability and scoring robustness.'],
 ['Visual QA','Rendered-page inspection for clipping, overlap, source readability, contrast and hierarchy.'],
 ['Parity QA','PPTX exported to PDF and page-count / text-integrity checks run in CI.'],
 ['Final test','Would a Mobility Growth Advisory Partner allow this candidate to present the analysis to a client?'],
 ['Rule','No D-confidence claim appears as a definitive headline; uncertainty is labelled rather than hidden.'],
], '20-pass validation protocol; independent candidate analysis.');

const outDir = process.env.MOBILITY_OUT_DIR || path.resolve(process.cwd(),'public/case-studies/mobility');
fs.mkdirSync(outDir,{recursive:true});
const out = path.join(outDir,'Manash-Protim-Deori-Commercial-EV-Growth-Advisory-Case.pptx');
pptx.writeFile({ fileName: out });
console.log('Wrote', out);
