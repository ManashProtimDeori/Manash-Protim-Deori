import pptxgen from 'pptxgenjs';
import fs from 'fs';
import path from 'path';

const OUT = path.resolve('public/case-studies/strategic-communications-meghalaya');
const RESEARCH = path.resolve('research/grant-thornton-meghalaya');
fs.mkdirSync(OUT,{recursive:true});
fs.mkdirSync(RESEARCH,{recursive:true});

const C = {
  bg: 'F6F3F6', paper:'FFFEFC', aub:'2E1B3A', purple:'6B4A7C', plum:'4A2D59', lavender:'DCCFE4',
  pine:'3E5D55', mist:'91AAA3', moss:'6C8378', ink:'211E24', muted:'66616A', line:'D8D0D9', gold:'B28A58', white:'FFFFFF',
  softGreen:'EAF0ED', softPurple:'F0EAF3', softGold:'F4EEE6', danger:'8A4A49'
};
const FONT='Aptos';
const MONO='Aptos Mono';

const sources = [
  {id:'S01',title:'Directorate of Economics & Statistics, Government of Meghalaya - DES Portal',type:'Web',url:'https://des.megplanning.gov.in/portal.htm',page:'n/a',date:'current portal; population base 2011',use:'Population, rural/urban split, districts and C&RD blocks.'},
  {id:'S02',title:'Government of Meghalaya - RFP for Grassroot Level Citizen Engagement Program',type:'PDF',url:'https://meghalaya.gov.in/sites/default/files/tenders/RFP_for_Selection_of_Agency_for_Grassroot_Citizen_Engagement_Program.pdf',page:'pp. 4 and 23 of 40',date:'February 2022',use:'Last-mile awareness challenge, BCC, village-level engagement, local languages, feedback/grievances.'},
  {id:'S03',title:'MyMeG - About / Highlights',type:'Web',url:'https://mymeg.meghalaya.gov.in/highlights/',page:'n/a',date:'accessed 2026-10-07',use:'Participatory governance, citizen feedback, multi-channel message dissemination, cross-department implementation.'},
  {id:'S04',title:'Government of Meghalaya - 78th Independence Day 2024, Chief Minister Speech',type:'PDF',url:'https://www.meghalaya.gov.in/meghalaya/sites/default/files/press_release/78th_Independence_Day_2024_HCM_Speech.pdf',page:'printed p. 9',date:'15 August 2024',use:'Terrain/distance as access barriers; CM-CONNECT; Village Data Volunteers; multilingual 1971 helpline; 12,000 users at that date.'},
  {id:'S05',title:'The Meghalaya State Language Act, 2005',type:'PDF',url:'https://homepolitical.meghalaya.gov.in/pdf/acts/meghalaya_language_act-2005.pdf',page:'PDF p. 2 / Gazette p. 364',date:'2005',use:'English official language; Khasi and Garo as associate official languages in specified district-level contexts.'},
  {id:'S06',title:'Draft Meghalaya Youth Policy 2021',type:'PDF',url:'https://meghalaya.gov.in/sites/default/files/documents/Meghalaya_Youth_Policy_2021_0.pdf',page:'printed pp. 6 and 8',date:'2021',use:'Policy estimate that 70%+ of population was under 35 (p. 8); policy explicitly notes youth are not homogeneous (p. 6).'},
  {id:'S07',title:'TRAI - Indian Telecom Services Yearly Performance Indicators 2024-25',type:'PDF',url:'https://www.trai.gov.in/sites/default/files/2025-07/YIR_08072025_0.pdf',page:'report p. 67 / PDF p. 68',date:'8 July 2025',use:'Meghalaya internet subscribers and subscribers-per-100 population; rural/urban contrast.'},
  {id:'S08',title:'Information & Public Relations Department, Government of Meghalaya',type:'Web',url:'https://meghalaya.gov.in/index.php/dept/25',page:'n/a',date:'government portal',use:'Press releases, press briefings, photo/video production, field publicity and Special Interactive Programmes.'},
  {id:'S09',title:'MPOWER Draft Environmental and Social Commitment Plan',type:'PDF',url:'https://meghalaya.gov.in/meghalaya/sites/default/files/documents/MPOWER_Draft_ESCP_22_Jan_2024.pdf',page:'printed p. 6',date:'22 January 2024',use:'Stakeholder information should be timely, relevant, understandable, accessible and culturally appropriate.'},
  {id:'S10',title:'Government of Meghalaya - Public consultation notice on Draft IT/ITeS Policy 2024',type:'Web',url:'https://meghalaya.gov.in/index.php/documents/content/46179',page:'n/a',date:'2024',use:'Evidence of formal public-comment / consultation mechanisms.'},
  {id:'S11',title:'NITI Aayog & MDoNER - North Eastern Region District SDG Index 2023-24',type:'Web/PDF',url:'https://www.niti.gov.in/node/1708',page:'report available from source page',date:'7 July 2025',use:'District-level development heterogeneity; East Khasi Hills appears separately in NER district rankings.'},
  {id:'S12',title:'Government of Meghalaya - Meghalaya Next: A Report of the Citizen',type:'Web landing page',url:'https://www.meghalaya.gov.in/documents/content/46466',page:'n/a',date:'2024',use:'Citizen-oriented planning/research source included in triangulation.'},
  {id:'S13',title:'My CV dataset - src/data/resume.ts',type:'GitHub source',url:'https://github.com/ManashProtimDeori/Manash-Protim-Deori/blob/main/src/data/resume.ts',page:'n/a',date:'repository current version',use:'My experience, quantified campaign work, Meghalaya PDS project and education.'},
  {id:'S14',title:'My portfolio - résumé page',type:'Web',url:'https://manash-protim-deori.vercel.app/resume',page:'n/a',date:'portfolio current version',use:'Public rendering of my résumé data; corroborating source for my personal claims.'}
];
const src = Object.fromEntries(sources.map(s=>[s.id,s]));

const claims = [
  {id:'C01',kind:'FACT',text:'Meghalaya had 2,966,889 people in the 2011 Census base used by the state DES portal: 2,371,439 rural and 595,450 urban.',sources:['S01'],logic:'I use this only as a dated structural baseline, not as a current population estimate.',confidence:'VERY HIGH'},
  {id:'C02',kind:'DERIVED FACT',text:'The 2011 DES figures imply that 79.9% of Meghalaya\'s population was rural.',sources:['S01'],logic:'2,371,439 / 2,966,889 = 79.93%. This supports designing beyond urban social-media audiences.',confidence:'VERY HIGH'},
  {id:'C03',kind:'FACT',text:'The DES portal lists 12 districts (2022) and 55 C&RD blocks (2022).',sources:['S01'],logic:'Administrative spread makes repeatable district/block communication kits more useful than a Shillong-only content model.',confidence:'VERY HIGH'},
  {id:'C04',kind:'FACT',text:'A 2022 Government RFP described connectivity and rural awareness as barriers to last-mile scheme uptake and called for grass-root Behaviour Change Communication.',sources:['S02'],logic:'This is direct evidence that awareness alone is insufficient; communication must help people convert information into action.',confidence:'VERY HIGH'},
  {id:'C05',kind:'FACT',text:'The same RFP specified village-level audience frameworks, communication in local languages and collection of citizen feedback/grievances.',sources:['S02'],logic:'Localisation and feedback are explicit operating requirements in a real Meghalaya citizen-engagement mandate.',confidence:'VERY HIGH'},
  {id:'C06',kind:'FACT',text:'MyMeG describes its purpose as participatory governance: capturing citizen feedback, disseminating government messages through multiple channels and engaging citizens in implementation.',sources:['S03'],logic:'This supports a two-way communications model rather than a one-way publishing calendar.',confidence:'VERY HIGH'},
  {id:'C07',kind:'FACT',text:'In the 2024 Independence Day speech, the Chief Minister explicitly linked terrain and distance to difficulty accessing government services and described CM-CONNECT as a response.',sources:['S04'],logic:'The communication architecture should reduce distance through channel redundancy, field touchpoints and clear escalation paths.',confidence:'VERY HIGH'},
  {id:'C08',kind:'FACT',text:'The same speech said the 1971 multilingual helpline had already been used by 12,000 citizens by August 2024.',sources:['S04'],logic:'The helpline demonstrates that feedback/service channels are part of the communication system, not downstream of it.',confidence:'VERY HIGH'},
  {id:'C09',kind:'FACT',text:'The Meghalaya State Language Act continues English as the official language and permits Khasi and Garo as associate official languages in specified district-level contexts.',sources:['S05'],logic:'I would treat localisation as audience/context design, with language as one layer rather than a mechanical translation step.',confidence:'VERY HIGH'},
  {id:'C10',kind:'FACT',text:'The 2021 Youth Policy estimated that more than 70% of Meghalaya\'s population was under 35 and also warned that youth are not a homogeneous group.',sources:['S06'],logic:'Youth relevance is high, but segmentation by life situation, rural/urban context and needs matters more than generic youth tone.',confidence:'HIGH'},
  {id:'C11',kind:'FACT',text:'TRAI reported 2.08 million internet subscriptions in Meghalaya at March 2025, equal to 61.08 subscriptions per 100 population.',sources:['S07'],logic:'Digital channels are material to reach, but subscription density is not the same as unique people reached.',confidence:'VERY HIGH'},
  {id:'C12',kind:'FACT',text:'TRAI reported 49.45 internet subscriptions per 100 rural population versus 105.53 per 100 urban population in Meghalaya at March 2025.',sources:['S07'],logic:'The gap argues for digital-plus-field distribution; urban figures above 100 also warn against reading subscription density as population penetration.',confidence:'VERY HIGH'},
  {id:'C13',kind:'FACT',text:'Meghalaya DIPR describes daily press releases, press conferences/briefings, photo documentation, video production and field publicity within its remit.',sources:['S08'],logic:'A communications consultant needs to work across earned, owned, visual and field formats rather than optimize one channel in isolation.',confidence:'VERY HIGH'},
  {id:'C14',kind:'FACT',text:'DIPR also describes periodic Special Interactive Programmes across districts and sub-divisions for one-to-one citizen interaction with department officials.',sources:['S08'],logic:'Face-to-face feedback and explanation remain part of the state\'s communication infrastructure.',confidence:'VERY HIGH'},
  {id:'C15',kind:'FACT',text:'The MPOWER commitment plan requires stakeholder information to be timely, relevant, understandable, accessible and consultation to be culturally appropriate.',sources:['S09'],logic:'I use these as quality gates for communication products, not merely stylistic preferences.',confidence:'VERY HIGH'},
  {id:'C16',kind:'SYNTHESIS',text:'I conclude that effective public communication in Meghalaya is best designed as an access-and-feedback system, not only a content-production function.',sources:['S01','S02','S03','S04','S05','S06','S07','S08','S09','S10','S11','S12'],logic:'Across demographics, last-mile RFP design, MyMeG, service access, language, youth segmentation, telecom, DIPR and stakeholder standards, the common requirement is to move information into understanding, action and feedback.',confidence:'HIGH'},
  {id:'C17',kind:'RECOMMENDATION',text:'I would use a digital-plus-field channel architecture instead of a digital-only plan.',sources:['S01','S02','S04','S07','S08'],logic:'High rural share, explicit terrain/access barriers, rural-urban internet-density difference, and formal field publicity all point to complementary channels.',confidence:'HIGH'},
  {id:'C18',kind:'RECOMMENDATION',text:'I would localise meaning - language, example, call-to-action and messenger - rather than translate one master asset word-for-word.',sources:['S02','S05','S06','S09'],logic:'Local-language requirements coexist with heterogeneous audience needs and culturally appropriate engagement standards.',confidence:'HIGH'},
  {id:'C19',kind:'RECOMMENDATION',text:'I would measure communication as reach -> comprehension proxy -> action -> closure/feedback -> learning.',sources:['S02','S03','S04','S08','S09'],logic:'The public sources repeatedly connect communication to action, feedback, grievance resolution, direct interaction and accessible information.',confidence:'HIGH'},
  {id:'C20',kind:'RECOMMENDATION',text:'I would make narrative monitoring a decision system: verify the signal, identify the affected audience, judge velocity/risk, decide response, then log the outcome.',sources:['S03','S08','S09'],logic:'Public communications teams already operate across press, multi-channel dissemination and citizen feedback; monitoring is useful only when it changes a decision.',confidence:'MODERATE-HIGH'}
];

const candidateClaims = [
  {id:'CV01',text:'I completed my MBA at IIM Shillong (Jun 2023-Apr 2025).',sources:['S13','S14'],logic:'This gives me lived academic familiarity with Shillong and a management foundation relevant to structured problem-solving.'},
  {id:'CV02',text:'I modelled Meghalaya\'s Public Distribution System using 4,500+ government records.',sources:['S13'],logic:'I have already worked with complex Meghalaya public-system data rather than approaching the state only from desk research.'},
  {id:'CV03',text:'My PDS simulation covered 8 state warehouses, 281 wholesalers and 4,000+ fair-price shops.',sources:['S13'],logic:'The project trained me to think in networks, last-mile constraints and operational interdependencies.'},
  {id:'CV04',text:'My PDS recommendations were framed around food-security resilience for 2M+ beneficiaries.',sources:['S13'],logic:'I understand that public systems ultimately have citizen-level consequences; analysis and communication both have to respect that.'},
  {id:'CV05',text:'I managed two integrated digital campaigns that generated 330M+ impressions and grew communities to 260K+ and 192K+ followers.',sources:['S13'],logic:'I have operated high-volume digital communication and can distinguish reach from the deeper outcomes this role needs.'},
  {id:'CV06',text:'I managed a Rs 20M marketing budget and reduced CPM from Rs 35.8 to Rs 15.5 - about a 57% reduction.',sources:['S13'],logic:'I bring measurement discipline and can use performance data to improve distribution efficiency without reducing communication to vanity metrics.'},
  {id:'CV07',text:'I coordinated 73+ macro-influencers and 520+ micro-influencers through a structured create-review-produce-distribute workflow.',sources:['S13'],logic:'I am used to coordinating many contributors, maintaining message consistency and delivering locally relevant content under time pressure.'},
  {id:'CV08',text:'I developed event-specific speech inputs for 8 events involving the Prime Minister and Home Minister of India.',sources:['S13'],logic:'I have experience adapting messages to context, audience and speaker while working inside high-stakes approval environments.'}
];

const passes = [
  ['01','Evidence inventory','Checked every external factual statement for a claim ID and source. Removed unneeded statistics without a decision implication.'],
  ['02','Primary-source upgrade','Prioritised Government of Meghalaya, DES, TRAI and NITI sources over commentary.'],
  ['03','Statistical validation','Recomputed the 79.9% rural share and verified dates, units and denominators.'],
  ['04','Contradiction review','Separated 2011 Census-base population from 2021 policy estimates and 2025 telecom data.'],
  ['05','Meghalaya specificity','Removed India-wide generalisations where Meghalaya evidence was available.'],
  ['06','Regional nuance','Avoided treating Northeast India or Meghalaya as homogeneous audiences.'],
  ['07','Shillong relevance','Kept Shillong as the professional base while avoiding the error of equating Shillong with the whole state.'],
  ['08','Communications logic','Required every regional fact to generate a practical communication implication.'],
  ['09','Role mapping','Mapped recommendations to social, content, media, storytelling, monitoring and stakeholder needs.'],
  ['10','My evidence','I used only my CV data for quantified personal claims.'],
  ['11','Intellectual rigor','Downgraded recommendations from facts and labelled synthesis/recommendation explicitly.'],
  ['12','Counterargument review','Added caveats for subscription density, dated Census data and policy estimates.'],
  ['13','Executive compression','Reduced core deck to one decision-worthy idea per slide.'],
  ['14','Storyline','Sequenced region -> system -> execution -> evidence -> contribution.'],
  ['15','First-person audit','I rewrote every self-referential header and bullet in first person.'],
  ['16','Audience-fit review','Strengthened citizen-engagement systems, media operations, creative workflow and fact-checking logic.'],
  ['17','Design review','Kept Meghalaya cues atmospheric and restrained; avoided tourism clichés and logo imitation.'],
  ['18','Source transparency','Added exact URLs, PDF pages, logic and confidence in the appendix.'],
  ['19','Release red-team','Looked for overclaiming, unsupported causality, outdated-data ambiguity and fake precision.'],
  ['20','Export and sequence QA','Confirmed thank-you precedes appendix, slide order is complete, and the source ledger is present.']
];

const coreSlides = [
  {id:'01',title:'How I would communicate Meghalaya',subtitle:'My strategic communications perspective for public programmes - prepared for the Consultant - Communications opportunity in Shillong',kind:'cover',claims:[]},
  {id:'02',title:'What I see: public communication here is a service-delivery layer',subtitle:'I would judge communication by whether information becomes understandable, actionable and answerable - not simply whether it was published.',kind:'thesis',claims:['C16']},
  {id:'03',title:'What I see in the operating context: distance, rurality and administrative spread shape communication design',subtitle:'I would design for the whole state, not let a Shillong-centric content model stand in for Meghalaya.',kind:'context',claims:['C01','C02','C03','C07']},
  {id:'04',title:'I would design for digital reach - without assuming digital uniformity',subtitle:'Digital is essential, but the rural-urban subscription gap and formal field-publicity channels argue for deliberate channel redundancy.',kind:'digital',claims:['C11','C12','C14','C17']},
  {id:'05',title:'I would localise meaning, not just translate words',subtitle:'Language matters; so do the example, messenger, context and call-to-action that make a message usable.',kind:'localise',claims:['C05','C09','C18']},
  {id:'06',title:'I would design for young audiences without treating youth as one audience',subtitle:'A youth-heavy state can still contain very different needs, contexts and information behaviours.',kind:'youth',claims:['C10']},
  {id:'07',title:'I would turn every announcement into a citizen journey',subtitle:'My goal would be to move from awareness to comprehension, action, support, feedback and - where relevant - resolution.',kind:'journey',claims:['C04','C05','C06','C08','C19']},
  {id:'08',title:'I would run a communications confidence loop before I run a content calendar',subtitle:'Accuracy and speed improve when the information chain is explicit before creative production begins.',kind:'loop',claims:['C15','C16']},
  {id:'09',title:'I would make one development travel across formats - not duplicate the same copy everywhere',subtitle:'I would build format-specific assets from one verified message architecture so each channel has a job.',kind:'formats',claims:['C13','C18']},
  {id:'10',title:'I would build a narrative radar that separates noise from decision-worthy signals',subtitle:'Monitoring is valuable only when it changes what I verify, clarify, escalate or create next.',kind:'radar',claims:['C20']},
  {id:'11',title:'I would measure whether communication moved from reach to resolution',subtitle:'I would keep reach, but add comprehension proxies, action, closure and learning so the dashboard reflects public value.',kind:'measurement',claims:['C19']},
  {id:'12',title:'I already understand Meghalaya through a public-system lens',subtitle:'My Meghalaya PDS project taught me to connect data, network constraints and last-mile consequences before recommending action.',kind:'candidate-system',claims:[],candidate:['CV01','CV02','CV03','CV04']},
  {id:'13',title:'I have already operated at the scale, speed and coordination this role demands',subtitle:'My strongest transferable advantage is not a single channel - it is the ability to align research, content, distribution, stakeholders and measurement under pressure.',kind:'candidate-scale',claims:[],candidate:['CV05','CV06','CV07','CV08']},
  {id:'14',title:'I would complement the team by connecting strategy, creative production and measurement',subtitle:'I would not try to duplicate specialist strengths; I would make the operating system around them sharper, faster and more measurable.',kind:'fit',claims:['C13','C15','C20']},
  {id:'15',title:'In my first 90 days, I would learn first, standardise second and optimise third',subtitle:'I would earn context before changing the system - then make the useful parts repeatable.',kind:'90',claims:['C16','C19','C20']},
  {id:'16',title:'What I would aim to leave behind: a communications system that gets clearer with every cycle',subtitle:'My standard would be simple: accurate enough to trust, clear enough to understand, local enough to matter, and measurable enough to improve.',kind:'close',claims:['C15','C16','C19']},
  {id:'17',title:'Thank you',subtitle:'I would welcome the chance to bring this thinking, execution discipline and Northeast context to the team in Shillong.',kind:'thanks',claims:[]}
];

function makePpt(){
  const pptx = new pptxgen();
  pptx.layout='LAYOUT_WIDE';
  pptx.author='Manash Protim Deori';
  pptx.subject='Independent strategic communications perspective for Meghalaya';
  pptx.title='How I would communicate Meghalaya';
  pptx.company='My independent role-specific work';
  pptx.lang='en-IN';
  pptx.theme={headFontFace:FONT,bodyFontFace:FONT,lang:'en-IN'};
  pptx.defineSlideMaster({
    title:'MASTER',
    background:{color:C.bg},
    objects:[
      {rect:{x:0,y:0,w:0.09,h:7.5,fill:{color:C.aub},line:{color:C.aub}}},
      {line:{x:0.55,y:7.12,w:12.1,h:0,line:{color:C.line,width:0.6}}},
      {text:{text:'INDEPENDENT CANDIDATE PERSPECTIVE',options:{x:10.1,y:0.25,w:2.65,h:0.25,fontFace:MONO,fontSize:7.5,color:C.muted,bold:true,align:'right',charSpacing:1.1,margin:0}}},
    ],
    slideNumber:{x:12.35,y:7.18,w:0.35,h:0.18,fontFace:MONO,fontSize:7,color:C.muted,align:'right',margin:0}
  });
  let slideCount=0;
  const add = () => { slideCount++; const s=pptx.addSlide('MASTER'); return s; };
  const txt=(s,t,x,y,w,h,opts={})=>s.addText(t,{x,y,w,h,fontFace:opts.fontFace||FONT,fontSize:opts.fontSize||18,color:opts.color||C.ink,bold:opts.bold||false,margin:0,breakLine: false,fit:'shrink',valign:opts.valign||'mid',align:opts.align||'left',...opts});
  const rect=(s,x,y,w,h,fill=C.paper,line=C.line,r=0.12)=>s.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:r,fill:{color:fill},line:{color:line,width:0.8},radius:r});
  const line=(s,x,y,w,h,color=C.line,width=1,dash)=>s.addShape(pptx.ShapeType.line,{x,y,w,h,line:{color,width,dashType:dash}});
  const circle=(s,x,y,d,fill)=>s.addShape(pptx.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:fill},line:{color:fill}});
  const footer=(s,claimIds=[],candidateIds=[])=>{
    const ids=[...claimIds,...candidateIds].join(' · ');
    if(ids) txt(s,`Evidence: ${ids} | Full URL, page and rationale in appendix`,0.62,7.19,7.8,0.17,{fontFace:MONO,fontSize:6.8,color:C.muted});
    txt(s,'Not commissioned by or affiliated with Grant Thornton Bharat.',8.6,7.19,3.45,0.17,{fontFace:MONO,fontSize:6.7,color:C.muted,align:'right'});
  };
  const header=(s,num,title,sub,section='PERSPECTIVE')=>{
    txt(s,`${section} / ${num}`,0.62,0.28,2.5,0.2,{fontFace:MONO,fontSize:7.5,color:C.purple,bold:true,charSpacing:1.2});
    txt(s,title,0.62,0.78,11.65,0.72,{fontSize:24,color:C.aub,bold:true,valign:'top'});
    txt(s,sub,0.62,1.54,11.25,0.5,{fontSize:11.5,color:C.muted,valign:'top'});
  };
  const hillMist=(s)=>{
    for(let i=0;i<5;i++){
      const y=5.65+i*0.25;
      const col=[C.lavender,C.softPurple,C.softGreen,C.mist,C.pine][i];
      s.addShape(pptx.ShapeType.arc,{x:7.1-i*0.22,y:y,w:6.6+i*0.38,h:1.3,adjustPoint:0.5,rotate:0,fill:{color:col,transparency:55+i*6},line:{color:col,transparency:35,width:1.1}});
    }
  };
  const badge=(s,label,x,y,w=1.28,fill=C.softPurple,color=C.purple)=>{rect(s,x,y,w,0.28,fill,fill);txt(s,label,x+0.07,y+0.03,w-0.14,0.2,{fontFace:MONO,fontSize:7,color,bold:true,align:'center'});};
  const card=(s,x,y,w,h,kicker,title,body,accent=C.purple)=>{
    rect(s,x,y,w,h,C.paper,C.line);
    txt(s,kicker.toUpperCase(),x+0.18,y+0.15,w-0.36,0.17,{fontFace:MONO,fontSize:7,color:accent,bold:true,charSpacing:0.7});
    txt(s,title,x+0.18,y+0.42,w-0.36,0.45,{fontSize:14.2,color:C.aub,bold:true,valign:'top'});
    txt(s,body,x+0.18,y+0.91,w-0.36,h-1.03,{fontSize:9.5,color:C.muted,valign:'top',breakLine:true});
  };
  const metric=(s,x,y,w,h,value,label,note,accent=C.purple)=>{
    rect(s,x,y,w,h,C.paper,C.line);
    txt(s,value,x+0.18,y+0.18,w-0.36,0.42,{fontSize:23,color:accent,bold:true});
    txt(s,label,x+0.18,y+0.67,w-0.36,0.28,{fontSize:9.4,color:C.ink,bold:true,valign:'top'});
    txt(s,note,x+0.18,y+1.02,w-0.36,h-1.12,{fontSize:7.8,color:C.muted,valign:'top'});
  };
  const flow=(s,labels,x,y,totalW,accent=C.purple)=>{
    const gap=0.12; const w=(totalW-gap*(labels.length-1))/labels.length;
    labels.forEach((l,i)=>{rect(s,x+i*(w+gap),y,w,0.62,i%2?C.softGreen:C.softPurple,C.line);txt(s,l,x+i*(w+gap)+0.06,y+0.12,w-0.12,0.38,{fontSize:9.2,bold:true,color:i%2?C.pine:C.aub,align:'center'}); if(i<labels.length-1) txt(s,'→',x+i*(w+gap)+w-0.03,y+0.2,0.18,0.2,{fontSize:13,color:C.gold,bold:true,align:'center'});});
  };

  // 1 cover
  {
    const s=add();
    s.background={color:C.bg};
    hillMist(s);
    txt(s,'CONSULTANT - COMMUNICATIONS · SHILLONG',0.72,0.72,5.8,0.26,{fontFace:MONO,fontSize:8,color:C.purple,bold:true,charSpacing:1.4});
    txt(s,'How I would\ncommunicate Meghalaya',0.72,1.46,7.4,1.65,{fontSize:33,color:C.aub,bold:true,valign:'top'});
    txt(s,'My strategic communications perspective for public programmes',0.75,3.3,6.4,0.42,{fontSize:15,color:C.pine,bold:true});
    txt(s,'Manash Protim Deori · IIM Shillong · Strategic communications, marketing & analytics',0.75,3.95,6.9,0.3,{fontSize:10.5,color:C.muted});
    rect(s,8.7,1.2,3.45,3.85,C.paper,C.line);
    txt(s,'MY THESIS',9.0,1.55,2.8,0.2,{fontFace:MONO,fontSize:7.5,color:C.purple,bold:true,charSpacing:1.3});
    txt(s,'Public communication is strongest when it behaves like a service:',9.0,2.0,2.8,0.86,{fontSize:18,color:C.aub,bold:true,valign:'top'});
    flow(s,['UNDERSTAND','ACT','RESPOND'],9.0,3.26,2.8,C.purple);
    txt(s,'Independent role-specific perspective. Not commissioned by or affiliated with Grant Thornton Bharat.',0.75,6.62,9.5,0.3,{fontFace:MONO,fontSize:7.2,color:C.muted});
    txt(s,'07 OCT 2026',11.0,6.62,1.1,0.3,{fontFace:MONO,fontSize:7.2,color:C.muted,align:'right'});
    s.addNotes(['I would open by framing the deck as a working perspective, not a finished answer.','The first signal I want to send is that I understand communications as an operating system around citizen understanding and action.']);
  }

  for (const sd of coreSlides.slice(1)) {
    const s=add(); header(s,sd.id,sd.title,sd.subtitle,'CORE');
    if(sd.kind==='thesis'){
      const items=[['ACCESS','Can people receive the information where they are?'],['UNDERSTAND','Can they decode the policy, programme or announcement?'],['ACT','Do they know the next concrete step?'],['FEEDBACK','Can questions, grievances and signals travel back?']];
      items.forEach((a,i)=>card(s,0.72+i*3.02,2.38,2.78,2.35,String(i+1).padStart(2,'0'),a[0],a[1],[C.purple,C.pine,C.gold,C.moss][i]));
      rect(s,0.72,5.17,11.84,1.18,C.aub,C.aub);txt(s,'What changes for me',0.98,5.42,1.65,0.2,{fontFace:MONO,fontSize:7,color:C.lavender,bold:true});txt(s,'I would organise communications around citizen outcomes - then choose content and channels as tools inside that system.',2.62,5.29,9.45,0.52,{fontSize:14.5,color:C.white,bold:true});
    } else if(sd.kind==='context'){
      metric(s,0.72,2.38,2.65,1.66,'79.9%','Rural share in 2011','Derived from DES Census-base figures; dated structural baseline, not a 2026 estimate.',C.purple);
      metric(s,3.57,2.38,2.65,1.66,'12','Districts','DES reference year 2022.',C.pine);
      metric(s,6.42,2.38,2.65,1.66,'55','C&RD blocks','DES reference year 2022.',C.gold);
      card(s,9.27,2.38,3.28,1.66,'SERVICE ACCESS','Terrain + distance','The 2024 CM speech explicitly described terrain and distance as barriers to citizens connecting with government.',C.moss);
      card(s,0.72,4.38,5.72,1.7,'MY IMPLICATION','I would decentralise the message kit','I would create a verified master message plus district/block-ready variants, local examples, contacts and escalation paths - so distribution does not depend on one central social post.',C.purple);
      card(s,6.68,4.38,5.87,1.7,'MY GUARDRAIL','I would not confuse Shillong with Meghalaya','I would treat Shillong as the operating base and media/administrative hub, while designing communication for rural, district and community realities across the state.',C.pine);
    } else if(sd.kind==='digital'){
      metric(s,0.72,2.35,3.25,1.85,'61.08','Internet subscriptions / 100 people','Meghalaya, March 2025. Subscription density is not unique-person penetration.',C.purple);
      metric(s,4.15,2.35,3.25,1.85,'49.45','Rural subscriptions / 100','Meghalaya, March 2025.',C.pine);
      metric(s,7.58,2.35,3.25,1.85,'105.53','Urban subscriptions / 100','Meghalaya, March 2025; >100 can reflect multiple subscriptions.',C.gold);
      rect(s,0.72,4.55,10.1,1.42,C.paper,C.line);txt(s,'HOW I WOULD DESIGN DISTRIBUTION',0.96,4.77,2.8,0.2,{fontFace:MONO,fontSize:7,color:C.purple,bold:true});flow(s,['SOCIAL / WEB','PRESS / RADIO','DISTRICT KITS','FIELD / SIP','HELPLINE / FEEDBACK'],0.98,5.12,9.56,C.pine);
      card(s,11.05,2.35,1.5,3.62,'RULE','No single-channel optimism','I would treat digital as a powerful layer, not a substitute for the rest of the information network.',C.purple);
    } else if(sd.kind==='localise'){
      const cols=[['LANGUAGE','What words will be understood without losing precision?'],['EXAMPLE','What local situation makes the policy concrete?'],['CTA','What exactly should a citizen do next?'],['MESSENGER','Which official, institution or channel is credible here?']];
      cols.forEach((a,i)=>card(s,0.72+i*3.02,2.35,2.78,2.3,String(i+1).padStart(2,'0'),a[0],a[1],[C.purple,C.pine,C.gold,C.moss][i]));
      rect(s,0.72,5.0,11.84,1.16,C.softPurple,C.lavender);
      txt(s,'CONTEXT I WOULD RESPECT',0.95,5.22,2.3,0.2,{fontFace:MONO,fontSize:7,color:C.purple,bold:true});
      txt(s,'English is the state official language; the Language Act permits Khasi and Garo as associate official languages in specified district-level contexts. A 2022 citizen-engagement RFP separately required communication in local languages.',3.0,5.14,9.05,0.55,{fontSize:10.5,color:C.ink,bold:true,valign:'top'});
    } else if(sd.kind==='youth'){
      metric(s,0.72,2.35,3.25,2.05,'70%+','Under 35 - 2021 policy estimate','The policy estimated 27.08 lakh of 36.31 lakh people under 35. I would not present this as a current census figure.',C.purple);
      card(s,4.2,2.35,4.0,2.05,'POLICY CAUTION','Youth are not one segment','The policy itself differentiates students/non-students, rural/urban and other life situations. I would segment by need state rather than use one generic “youth tone.”',C.pine);
      card(s,8.43,2.35,4.12,2.05,'HOW I WOULD USE THIS','Format agility, not slang','I would use short-form video and visual explainers where useful, but keep authority, clarity and actionability ahead of trend mimicry.',C.gold);
      rect(s,0.72,4.77,11.84,1.15,C.paper,C.line);flow(s,['NEED STATE','CONTEXT','FORMAT','LANGUAGE','ACTION'],1.05,5.07,11.18,C.purple);
    } else if(sd.kind==='journey'){
      flow(s,['ANNOUNCE','EXPLAIN','RELEVANCE','ACTION','SUPPORT','FEEDBACK','CLOSURE'],0.72,2.5,11.84,C.purple);
      const texts=[['ANNOUNCE','What changed?'],['EXPLAIN','What does it mean?'],['ACTION','What should I do?'],['SUPPORT','Where do I get help?'],['FEEDBACK','What did people not understand?'],['CLOSURE','What changed after feedback?']];
      texts.forEach((a,i)=>card(s,0.72+(i%3)*3.95,3.55+Math.floor(i/3)*1.28,3.7,1.08,a[0],a[1],'I would assign a content owner, channel and response path.',[C.purple,C.pine,C.gold,C.moss,C.purple,C.pine][i]));
    } else if(sd.kind==='loop'){
      const steps=['SOURCE','VERIFY','SIMPLIFY','LOCALISE','CREATE','APPROVE','DISTRIBUTE','LISTEN','LEARN'];
      steps.forEach((st,i)=>{const x=0.85+(i%5)*2.35; const y=2.35+Math.floor(i/5)*1.35; rect(s,x,y,2.05,0.95,i%2?C.softGreen:C.softPurple,C.line);circle(s,x+0.12,y+0.18,0.38,i%2?C.pine:C.purple);txt(s,String(i+1).padStart(2,'0'),x+0.12,y+0.26,0.38,0.16,{fontFace:MONO,fontSize:7,color:C.white,bold:true,align:'center'});txt(s,st,x+0.62,y+0.22,1.23,0.24,{fontSize:9.5,color:C.aub,bold:true});});
      card(s,10.65,3.7,1.9,2.05,'QUALITY GATE','I would stop a post if…','the source is unclear, the action is ambiguous, the audience is wrong, or the correction path is undefined.',C.danger);
      rect(s,0.85,5.35,9.45,0.82,C.aub,C.aub);txt(s,'I would make the approval chain visible enough that speed comes from structure, not from skipping verification.',1.1,5.58,9.0,0.3,{fontSize:11.5,color:C.white,bold:true});
    } else if(sd.kind==='formats'){
      txt(s,'Illustrative example: a new public-service enrolment window',0.72,2.3,5.5,0.28,{fontSize:13,color:C.aub,bold:true});
      const items=[['PRESS NOTE','Official facts + quote + eligibility'],['45s REEL','Problem -> benefit -> action'],['INFOGRAPHIC','Eligibility + deadline + steps'],['FAQ','Top 8 questions + escalation'],['PHOTO STORY','Implementation / beneficiary context'],['DISTRICT KIT','Local contact + language + example'],['MEDIA BRIEF','Context + evidence + spokesperson lines'],['SOCIAL CARDS','Reminder / myth / CTA sequence']];
      items.forEach((a,i)=>card(s,0.72+(i%4)*2.96,2.82+Math.floor(i/4)*1.45,2.72,1.22,a[0],a[1],'Same verified message architecture; different communication job.',[C.purple,C.pine,C.gold,C.moss][i%4]));
    } else if(sd.kind==='radar'){
      const stages=[['SIGNAL','News, social, stakeholder question, search trend'],['VERIFY','What is fact? What is incomplete?'],['CONTEXT','Who is affected and what preceded this?'],['VELOCITY','Is it emerging, accelerating, persistent or declining?'],['DECIDE','Clarify, respond, create, escalate or observe'],['LEARN','Did the response reduce confusion or create a new question?']];
      stages.forEach((a,i)=>card(s,0.72+(i%3)*3.96,2.35+Math.floor(i/3)*1.72,3.68,1.48,String(i+1).padStart(2,'0'),a[0],a[1],[C.purple,C.pine,C.gold,C.moss,C.purple,C.pine][i]));
      rect(s,0.72,5.95,11.84,0.46,C.softGold,C.softGold);txt(s,'My rule: sentiment is a signal, not a decision. I would verify the underlying issue before I optimise the response.',1.0,6.04,11.25,0.22,{fontSize:9.5,color:C.aub,bold:true,align:'center'});
    } else if(sd.kind==='measurement'){
      const stages=[['REACH','Did the intended audience encounter it?','delivery, views, coverage'],['COMPREHENSION','Did the content reduce ambiguity?','FAQ patterns, completion, repeat questions'],['ACTION','Did people take the next step?','clicks, registrations, calls, applications'],['CLOSURE','Was the query/grievance resolved?','resolution, turnaround, repeat contact'],['LEARNING','What should change next cycle?','content, channel, timing, process']];
      stages.forEach((a,i)=>card(s,0.72+i*2.38,2.35,2.16,3.25,String(i+1).padStart(2,'0'),a[0],`${a[1]}\n\nExamples: ${a[2]}`,[C.purple,C.pine,C.gold,C.moss,C.purple][i]));
      txt(s,'I would avoid pretending every outcome is attributable to communications alone; the dashboard should separate delivery metrics, behaviour proxies and service outcomes.',0.82,5.93,11.55,0.48,{fontSize:10.5,color:C.muted,bold:true,align:'center'});
    } else if(sd.kind==='candidate-system'){
      metric(s,0.72,2.35,2.6,1.7,'4,500+','Government records','I used them in an Excel-based cost / sensitivity model.',C.purple);
      metric(s,3.53,2.35,2.6,1.7,'8','State warehouses','Modelled in the PDS network.',C.pine);
      metric(s,6.34,2.35,2.6,1.7,'281','Wholesalers','Modelled in the PDS network.',C.gold);
      metric(s,9.15,2.35,3.4,1.7,'4,000+','Fair-price shops','Last-mile nodes in my supply-chain simulation.',C.moss);
      card(s,0.72,4.43,5.72,1.65,'WHAT I LEARNED','I look for the system beneath the announcement','When a public programme has thousands of nodes, communication quality depends on understanding the operational dependencies, information owners and failure points behind the message.',C.purple);
      card(s,6.67,4.43,5.88,1.65,'MY SHILLONG CONNECTION','I am not starting from zero','I completed my MBA at IIM Shillong and have already worked on a Government of Meghalaya public-system project. I would still listen before assuming that familiarity equals field knowledge.',C.pine);
    } else if(sd.kind==='candidate-scale'){
      metric(s,0.72,2.35,2.75,1.72,'330M+','Impressions','Across two integrated digital campaigns.',C.purple);
      metric(s,3.68,2.35,2.75,1.72,'Rs 20M','Budget managed','Data-led allocation and optimisation.',C.pine);
      metric(s,6.64,2.35,2.75,1.72,'-57%','CPM change','Rs 35.8 -> Rs 15.5 in my CV data.',C.gold);
      metric(s,9.6,2.35,2.95,1.72,'593+','Influencers coordinated','73+ macro + 520+ micro through a structured workflow.',C.moss);
      card(s,0.72,4.45,3.72,1.68,'STRATEGY','I can frame the message','I have worked across research, intelligence, content and speech inputs in high-stakes communication environments.',C.purple);
      card(s,4.62,4.45,3.72,1.68,'EXECUTION','I can move work through people','I have coordinated large contributor networks and multi-stage review / production / dissemination workflows.',C.pine);
      card(s,8.52,4.45,4.03,1.68,'MEASUREMENT','I can improve the distribution','I use performance data as feedback on the system - while keeping public communication outcomes broader than media efficiency.',C.gold);
    } else if(sd.kind==='fit'){
      const rows=[['SOCIAL & CALENDARS','I would connect announcements, recurring explainers, proactive stories and service reminders to one editorial rhythm.'],['PRESS & BRIEFS','I would build fact-first templates that separate what happened, why it matters, key evidence, quote and next action.'],['NARRATIVE MONITORING','I would deliver a short daily decision brief: signal, verification, affected audience, risk, recommended response.'],['CREATIVE COORDINATION','I would write sharper creative briefs: audience, single message, evidence, format job, CTA, mandatory accuracy checks.'],['STAKEHOLDERS','I would make information ownership and approval explicit so the team knows who verifies what and by when.'],['ANALYTICS','I would connect reach to comprehension proxies, action and learning instead of stopping at impressions.']];
      rows.forEach((a,i)=>{const y=2.25+i*0.66; txt(s,a[0],0.82,y,2.3,0.3,{fontFace:MONO,fontSize:7.2,color:[C.purple,C.pine,C.gold][i%3],bold:true});txt(s,a[1],3.02,y,9.12,0.43,{fontSize:10,color:C.ink,bold:i===2});line(s,0.82,y+0.52,11.35,0,C.line,0.5);});
      badge(s,'MY CONTRIBUTION',10.75,6.2,1.65,C.aub,C.white);
    } else if(sd.kind==='90'){
      const phases=[['0-30','LEARN','Map stakeholders, information owners, approval paths, existing calendars, media relationships, recurring citizen questions and current measurement.','Output: operating map + baseline'],['31-60','STANDARDISE','Introduce reusable briefs, a content architecture, source/approval checklist, narrative radar and channel-specific templates.','Output: repeatable workflow'],['61-90','OPTIMISE','Use observed questions and performance data to improve format, cadence, localisation, escalation and proactive storytelling.','Output: learning playbook']];
      phases.forEach((p,i)=>{const x=0.72+i*3.96; rect(s,x,2.38,3.68,3.52,[C.softPurple,C.softGreen,C.softGold][i],C.line);badge(s,p[0],x+0.2,2.62,0.8,[C.purple,C.pine,C.gold][i],C.white);txt(s,p[1],x+0.2,3.08,3.2,0.4,{fontSize:19,color:C.aub,bold:true});txt(s,p[2],x+0.2,3.7,3.2,1.25,{fontSize:10,color:C.ink,valign:'top'});txt(s,p[3],x+0.2,5.27,3.2,0.35,{fontFace:MONO,fontSize:7.5,color:C.muted,bold:true});});
    } else if(sd.kind==='close'){
      const q=[['ACCURATE','I would know where each claim came from.'],['CLEAR','I would make complexity legible without flattening it.'],['LOCAL','I would adapt context, language and messenger to the audience.'],['LEARNING','I would use feedback to make the next cycle better.']];
      q.forEach((a,i)=>card(s,0.72+i*3.02,2.42,2.78,2.6,String(i+1).padStart(2,'0'),a[0],a[1],[C.purple,C.pine,C.gold,C.moss][i]));
      rect(s,0.72,5.42,11.84,0.9,C.aub,C.aub);txt(s,'If I join, I would bring an analytical operating layer to communications - without losing the human judgement that makes public communication credible.',1.0,5.63,11.3,0.38,{fontSize:13,color:C.white,bold:true,align:'center'});
    } else if(sd.kind==='thanks'){
      hillMist(s);
      txt(s,'Thank you.',0.82,2.2,7.2,0.8,{fontSize:38,color:C.aub,bold:true});
      txt(s,'I would welcome the chance to discuss where this perspective is right, where it is incomplete, and how I could contribute to the team in Shillong.',0.85,3.18,7.55,1.08,{fontSize:17,color:C.pine,bold:true,valign:'top'});
      txt(s,'Manash Protim Deori',0.85,4.72,4.0,0.25,{fontSize:11,color:C.ink,bold:true});
      txt(s,'manashdeori09@gmail.com  ·  linkedin.com/in/manash-protim-deori',0.85,5.14,6.5,0.25,{fontFace:MONO,fontSize:8,color:C.muted});
      rect(s,9.1,2.28,3.15,2.55,C.paper,C.line);txt(s,'WHAT I WOULD BRING',9.38,2.55,2.6,0.2,{fontFace:MONO,fontSize:7,color:C.purple,bold:true});txt(s,'Regional context\n+\nstrategic clarity\n+\nexecution discipline',9.38,3.02,2.6,1.45,{fontSize:17,color:C.aub,bold:true,align:'center',valign:'mid'});
      txt(s,'Appendix follows',10.0,6.35,1.5,0.2,{fontFace:MONO,fontSize:7,color:C.muted,align:'center'});
    }
    footer(s,sd.claims||[],sd.candidate||[]);
    const notes=[];
    notes.push(sd.title); notes.push(sd.subtitle);
    for(const id of (sd.claims||[])){const c=claims.find(x=>x.id===id); if(c){notes.push(`${id} ${c.kind}: ${c.text}`); for(const sid of c.sources) notes.push(`${sid}: ${src[sid].url} | ${src[sid].page}`); notes.push(`Logic: ${c.logic}`);}}
    for(const id of (sd.candidate||[])){const c=candidateClaims.find(x=>x.id===id); if(c){notes.push(`${id}: ${c.text}`); for(const sid of c.sources) notes.push(`${sid}: ${src[sid].url}`); notes.push(`Why it matters: ${c.logic}`);}}
    s.addNotes(notes);
  }

  // Appendix title slide 18
  {
    const s=add(); header(s,'A01','How I built the evidence base','I separate canonical facts from synthesis, and I show the exact source, page, logic and limitation for every important claim.','APPENDIX');
    const rules=[['1','PRIMARY FIRST','Government of Meghalaya, DES, TRAI and NITI are the default truth anchors.'],['2','DATE EVERY NUMBER','2011 population is labelled 2011; 2021 policy estimates are not presented as 2026 facts.'],['3','ONE CANONICAL FACT SOURCE','I do not manufacture ten citations for an atomic statistic when one primary source is definitive.'],['4','10+ SOURCE SYNTHESIS','I triangulated the strategic thesis across 12 institutional sources before converting evidence into recommendations.'],['5','FACT ≠ INFERENCE','Each claim is classified as fact, derived fact, synthesis or recommendation.'],['6','MY CLAIMS','My quantified experience comes only from my CV data and is kept separate from external research.']];
    rules.forEach((r,i)=>card(s,0.72+(i%3)*3.96,2.35+Math.floor(i/3)*1.72,3.68,1.46,r[0],r[1],r[2],[C.purple,C.pine,C.gold][i%3])); footer(s);
  }
  {
    const s=add(); header(s,'A02','How I label evidence so I do not overclaim','Every conclusion in the core deck has an evidence class, and recommendations remain recommendations.','APPENDIX');
    const x=[['FACT','Directly stated by a credible source.','Example: TRAI reports 61.08 internet subscriptions per 100 population in Meghalaya.'],['DERIVED FACT','Arithmetic from source data; method shown.','Example: 79.9% rural = rural population / total population.'],['SYNTHESIS','My conclusion from multiple sources.','Example: communication here behaves like an access-and-feedback system.'],['RECOMMENDATION','What I would do, based on evidence.','Example: use digital-plus-field distribution.']];
    x.forEach((a,i)=>card(s,0.78+i*3.02,2.45,2.77,3.05,String(i+1).padStart(2,'0'),a[0],`${a[1]}\n\n${a[2]}`,[C.purple,C.pine,C.gold,C.moss][i]));
    rect(s,0.78,5.85,11.77,0.5,C.softGold,C.softGold);txt(s,'Confidence labels in the claim ledger describe the evidence quality - not certainty about future behaviour.',1.02,5.99,11.25,0.2,{fontSize:9.5,color:C.aub,bold:true,align:'center'}); footer(s);
  }
  {
    const s=add(); header(s,'A03','Why I arrived at the “service-delivery layer” thesis','The thesis is a synthesis; I tested it against multiple independent public sources before using it as the deck spine.','APPENDIX');
    const boxes=[['ACCESS','S01 · S02 · S04 · S07','rurality + terrain/distance + last-mile challenge + digital differences'],['PARTICIPATION','S03 · S10 · S12','feedback, participatory governance and public consultation'],['LOCALISATION','S02 · S05 · S06 · S09','local languages + heterogeneous youth + culturally appropriate engagement'],['CHANNEL SYSTEM','S07 · S08','digital reach + press/video/field publicity / direct interaction'],['ACTION','S02 · S04','BCC, doorstep services, helpline and grievance feedback'],['DISTRICT REALITY','S01 · S11','administrative spread and district-level variation']];
    boxes.forEach((a,i)=>card(s,0.72+(i%3)*3.96,2.3+Math.floor(i/3)*1.75,3.68,1.5,a[0],a[1],a[2],[C.purple,C.pine,C.gold][i%3]));
    rect(s,0.72,5.9,11.84,0.44,C.aub,C.aub);txt(s,'My inference: the strongest communications system connects information delivery, comprehension, action and a return path for feedback.',1.0,6.0,11.3,0.22,{fontSize:10.2,color:C.white,bold:true,align:'center'}); footer(s,['C16']);
  }

  const addClaimLedgerSlide=(num, pair, title='External claim ledger')=>{
    const s=add(); header(s,num,title,'Every block shows the exact statement I used, its source URL/page, my logic, evidence class and confidence.','APPENDIX');
    pair.forEach((c,i)=>{
      const y=2.15+i*2.06; rect(s,0.7,y,11.88,1.84,C.paper,C.line);
      badge(s,`${c.id} · ${c.kind}`,0.92,y+0.18,1.72,c.kind.includes('RECOMM')?C.pine:c.kind.includes('SYNTH')?C.gold:C.purple,C.white);
      txt(s,c.text,2.82,y+0.16,9.42,0.52,{fontSize:11.5,color:C.aub,bold:true,valign:'top'});
      const sourceText=c.sources.map(id=>`${id} ${src[id].url}${src[id].page!=='n/a'?` | ${src[id].page}`:''}`).join('\n');
      txt(s,'SOURCE',0.92,y+0.68,0.68,0.16,{fontFace:MONO,fontSize:6.5,color:C.purple,bold:true});
      txt(s,sourceText,1.72,y+0.66,10.5,0.45,{fontFace:MONO,fontSize:c.sources.length>3?5.9:6.7,color:C.muted,valign:'top',breakLine:true});
      txt(s,'RATIONALE',0.92,y+1.18,0.78,0.16,{fontFace:MONO,fontSize:6.5,color:C.pine,bold:true});
      txt(s,c.logic,1.72,y+1.14,8.8,0.48,{fontSize:8.2,color:C.ink,valign:'top'});
      txt(s,c.confidence,10.72,y+1.22,1.3,0.18,{fontFace:MONO,fontSize:6.8,color:C.gold,bold:true,align:'right'});
    }); footer(s,pair.map(c=>c.id));
  };
  for(let i=0;i<claims.length;i+=2) addClaimLedgerSlide(`A${String(4+i/2).padStart(2,'0')}`,claims.slice(i,i+2));

  const addCvLedger=(num,pair)=>{
    const s=add(); header(s,num,'My evidence ledger','I keep my personal proof separate from regional research and write it in the first person.','APPENDIX');
    pair.forEach((c,i)=>{const y=2.18+i*2.1;rect(s,0.72,y,11.84,1.88,C.paper,C.line);badge(s,c.id,0.94,y+0.18,0.8,C.aub,C.white);txt(s,c.text,1.95,y+0.15,10.25,0.48,{fontSize:12,color:C.aub,bold:true,valign:'top'});txt(s,'SOURCE',0.94,y+0.74,0.7,0.16,{fontFace:MONO,fontSize:6.5,color:C.purple,bold:true});txt(s,c.sources.map(id=>src[id].url).join('\n'),1.74,y+0.7,10.2,0.36,{fontFace:MONO,fontSize:6.4,color:C.muted,valign:'top'});txt(s,'WHY I THINK IT MATTERS',0.94,y+1.25,1.5,0.16,{fontFace:MONO,fontSize:6.5,color:C.pine,bold:true});txt(s,c.logic,2.55,y+1.18,9.35,0.5,{fontSize:8.4,color:C.ink,valign:'top'});});footer(s,[],pair.map(c=>c.id));
  };
  for(let i=0;i<candidateClaims.length;i+=2) addCvLedger(`A${String(14+i/2).padStart(2,'0')}`,candidateClaims.slice(i,i+2));

  // Logic register slides
  const logicSlides=[
    ['A18','Why I would use digital + field distribution',[['OBSERVED','2011 structural baseline is ~79.9% rural.'],['OBSERVED','2025 TRAI subscription density is lower in rural than urban Meghalaya.'],['OBSERVED','The state explicitly describes terrain/distance and last-mile awareness challenges.'],['OBSERVED','DIPR retains field publicity and direct interactive programmes.'],['MY INFERENCE','A digital-only plan would create avoidable coverage and comprehension risk.'],['MY ACTION','I would assign digital, press, district/field and feedback channels complementary jobs.']],['C02','C07','C12','C14','C17']],
    ['A19','Why I would localise meaning, not only language',[['OBSERVED','The Language Act creates distinct official/associate language contexts.'],['OBSERVED','A citizen-engagement RFP required local-language communication.'],['OBSERVED','The youth policy says youth are not a homogeneous group.'],['OBSERVED','MPOWER requires understandable, accessible and culturally appropriate information.'],['MY INFERENCE','Literal translation cannot solve differences in context, need state or trust.'],['MY ACTION','I would localise language + example + CTA + messenger + support path.']],['C05','C09','C10','C15','C18']],
    ['A20','Why I would connect communication to feedback and closure',[['OBSERVED','MyMeG is explicitly designed to capture feedback and disseminate messages.'],['OBSERVED','The citizen-engagement RFP asks for feedback/grievance collection.'],['OBSERVED','CM-CONNECT includes a feedback/grievance helpline.'],['OBSERVED','DIPR supports direct citizen-official interaction through SIPs.'],['MY INFERENCE','A message is incomplete when citizens have no clear return path.'],['MY ACTION','I would report reach, comprehension proxy, action, feedback/closure and learning separately.']],['C05','C06','C08','C14','C19']]
  ];
  logicSlides.forEach(([num,title,rows,ids])=>{const s=add();header(s,num,title,'This is the reasoning chain behind a recommendation - not an attempt to present an opinion as a fact.','APPENDIX');rows.forEach((r,i)=>{const y=2.18+i*0.62;badge(s,r[0],0.82,y,1.06,r[0]==='MY ACTION'?C.aub:r[0]==='MY INFERENCE'?C.gold:C.softPurple,r[0].startsWith('MY')?C.white:C.purple);txt(s,r[1],2.1,y-0.01,10.05,0.3,{fontSize:10.2,color:C.ink,bold:r[0].startsWith('MY')});line(s,0.82,y+0.43,11.45,0,C.line,0.5);});footer(s,ids);});

  // Limitations
  {
    const s=add(); header(s,'A21','What I would validate in the field before I scale anything','Desk research gives me a disciplined starting point. It does not give me permission to assume audience behaviour I have not observed.','APPENDIX');
    const limits=[['CURRENT POPULATION','The most authoritative state population split cited here is Census 2011; I use it as structural context, not current headcount.'],['PLATFORM BEHAVIOUR','I do not claim Meghalaya-specific Facebook/Instagram/WhatsApp audience shares without defensible state-level evidence.'],['SUBSCRIPTION ≠ PEOPLE','TRAI internet subscriptions per 100 population can include multiple subscriptions and should not be read as unique-user penetration.'],['LANGUAGE USE','The Language Act describes official use; actual communication preference should be validated by district/audience and content purpose.'],['COMPREHENSION','Views and reach do not prove understanding; I would test recurring questions, completion, response quality and task completion.'],['ATTRIBUTION','Service outcomes are influenced by programme design and operations; I would not attribute every improvement to communications alone.']];
    limits.forEach((a,i)=>card(s,0.72+(i%3)*3.96,2.27+Math.floor(i/3)*1.78,3.68,1.54,String(i+1).padStart(2,'0'),a[0],a[1],[C.purple,C.pine,C.gold][i%3]));footer(s);
  }
  // Iterations
  {
    const s=add(); header(s,'A22','The 20 review passes I ran','Each pass tested a different failure mode. I used the later passes to challenge and improve the conclusions from the earlier ones.','APPENDIX');
    passes.forEach((p,i)=>{const col=i<10?0:1;const row=i%10;const x=0.72+col*5.93;const y=2.16+row*0.43;txt(s,p[0],x,y,0.33,0.18,{fontFace:MONO,fontSize:6.8,color:col?C.pine:C.purple,bold:true});txt(s,p[1],x+0.42,y,1.8,0.18,{fontSize:7.7,color:C.ink,bold:true});txt(s,p[2],x+2.2,y,3.25,0.27,{fontSize:6.5,color:C.muted,valign:'top'});});footer(s);
  }
  const sourceGroups=[sources.slice(0,7),sources.slice(7)];
  sourceGroups.forEach((grp,gi)=>{
    const s=add(); header(s,`A${23+gi}`,'Full source register',gi===0?'Primary/public sources I used for the Meghalaya operating context.':'Additional public sources plus my own evidence.','APPENDIX');
    grp.forEach((so,i)=>{const y=2.12+i*0.63;txt(s,so.id,0.78,y,0.38,0.18,{fontFace:MONO,fontSize:6.9,color:C.purple,bold:true});txt(s,so.title,1.25,y-0.02,3.65,0.22,{fontSize:7.9,color:C.ink,bold:true});txt(s,`${so.type} · ${so.page}`,4.93,y-0.02,1.42,0.2,{fontFace:MONO,fontSize:6.2,color:C.pine,bold:true});txt(s,so.url,6.35,y-0.02,5.75,0.27,{fontFace:MONO,fontSize:5.9,color:C.muted,hyperlink:{url:so.url},valign:'top'});line(s,0.78,y+0.39,11.35,0,C.line,0.45);});footer(s);
  });
  // final appendix disclaimer/reading guide
  {
    const s=add();header(s,'A25','How I would use this deck in a conversation','I would present the core in 10-12 minutes, then use this appendix to defend the evidence rather than overload the main story.','APPENDIX');
    const r=[['1','START WITH THE THESIS','I would ask whether the team also sees communication as part of citizen service delivery.'],['2','TEST MY ASSUMPTIONS','I would invite corrections on district, channel and stakeholder realities I cannot learn from desk research.'],['3','SHOW MY WORK','If a figure or insight is challenged, I can trace it to the exact source and page in this appendix.'],['4','CONNECT TO THE ROLE','I would move quickly from regional context to the operating systems I could build and run.'],['5','KEEP THE BOUNDARY CLEAR','This is my independent work; I do not claim knowledge of Grant Thornton or client-confidential processes.'],['6','END WITH CONTRIBUTION','I want the discussion to be about what I can help the team execute better - not about how much research I can display.']];
    r.forEach((a,i)=>card(s,0.72+(i%3)*3.96,2.32+Math.floor(i/3)*1.76,3.68,1.52,a[0],a[1],a[2],[C.purple,C.pine,C.gold][i%3]));footer(s);
  }
  return pptx;
}

const pptx=makePpt();
await pptx.writeFile({fileName:path.join(OUT,'Manash-Protim-Deori-Strategic-Communications-Meghalaya.pptx')});

// Research artifacts
const sourceCsv=['source_id,title,type,publication_or_reference_date,page,url,use'].concat(sources.map(s=>[s.id,s.title,s.type,s.date,s.page,s.url,s.use].map(v=>'"'+String(v).replaceAll('"','""')+'"').join(','))).join('\n');
fs.writeFileSync(path.join(RESEARCH,'source_registry.csv'),sourceCsv);
const allClaims=[...claims.map(c=>({...c,scope:'external'})),...candidateClaims.map(c=>({...c,kind:'MY FACT',confidence:'VERY HIGH',scope:'personal'}))];
const claimCsv=['claim_id,scope,claim_type,claim_text,sources,source_urls,page_or_location,logic_rationale,confidence'].concat(allClaims.map(c=>{
  const ss=c.sources.map(id=>src[id]);
  return [c.id,c.scope,c.kind,c.text,c.sources.join('; '),ss.map(x=>x.url).join('; '),ss.map(x=>x.page).join('; '),c.logic,c.confidence].map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',');
})).join('\n');
fs.writeFileSync(path.join(RESEARCH,'fact_check_matrix.csv'),claimCsv);

const sourcesMd=['# Source registry','',...sources.flatMap(s=>[`## ${s.id} - ${s.title}`,`- Type: ${s.type}` ,`- Date/reference: ${s.date}`,`- Page: ${s.page}`,`- URL: ${s.url}`,`- Used for: ${s.use}`,''])].join('\n');
fs.writeFileSync(path.join(RESEARCH,'sources.md'),sourcesMd);
const claimsMd=['# Claim ledger','',...allClaims.flatMap(c=>[`## ${c.id} - ${c.kind}`,`**Claim:** ${c.text}`,'',`**Source(s):** ${c.sources.map(id=>`${id} (${src[id].url}${src[id].page!=='n/a'?`, ${src[id].page}`:''})`).join('; ')}`,'',`**Logic / rationale:** ${c.logic}`,'',`**Confidence:** ${c.confidence}`,''])].join('\n');
fs.writeFileSync(path.join(RESEARCH,'claims.md'),claimsMd);
const iterationMd=['# 20-pass review log','',...passes.flatMap(p=>[`## ${p[0]} - ${p[1]}`,p[2],''])].join('\n');
fs.writeFileSync(path.join(RESEARCH,'iteration_log.md'),iterationMd);

const speaker=[];
for(const sd of coreSlides){speaker.push(`# Slide ${sd.id} - ${sd.title}`,'',sd.subtitle,''); for(const id of sd.claims||[]){const c=claims.find(x=>x.id===id);speaker.push(`- **${id} ${c.kind}:** ${c.text}`,`  - Logic: ${c.logic}`);for(const sid of c.sources){speaker.push(`  - ${sid}: ${src[sid].url} (${src[sid].page})`);}} for(const id of sd.candidate||[]){const c=candidateClaims.find(x=>x.id===id);speaker.push(`- **${id}:** ${c.text}`,`  - Why it matters: ${c.logic}`);} speaker.push('');}
speaker.push('# Presenter discipline','',
'- I would present the core in 10-12 minutes and use the appendix only when evidence is challenged.',
'- I would invite correction on local operating assumptions before proposing scale.',
'- I would keep my own evidence separate from public-source evidence and state limitations directly.'
);
fs.writeFileSync(path.join(RESEARCH,'speaker_notes.md'),speaker.join('\n'));
fs.writeFileSync(path.join(RESEARCH,'methodology.md'),`# Methodology\n\nI used a primary-source-first hierarchy and separated facts, derived facts, synthesis and recommendations. The core thesis was triangulated across 12 institutional sources. Atomic statistics use the canonical source rather than cosmetic repetition of the same number across ten secondary sites. Every fact or insight in the core deck maps to a claim ID; the appendix gives the exact URL, PDF page where applicable, logic/rationale and confidence.\n\n## Important limitations\n\n- The population rural/urban split is Census 2011 based and is not presented as a 2026 headcount.\n- The 2021 Youth Policy population estimate is labelled as a policy estimate.\n- TRAI subscriptions per 100 population are subscription densities, not unique-user penetration.\n- Platform-specific social usage claims were excluded because robust Meghalaya-specific evidence was not established.\n- My metrics come only from my CV data.\n`);

console.log(JSON.stringify({pptx:path.join(OUT,'Manash-Protim-Deori-Strategic-Communications-Meghalaya.pptx'),slides:pptx._slides?.length || 42,sources:sources.length,claims:claims.length,candidateClaims:candidateClaims.length},null,2));