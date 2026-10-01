export type GateStatus = 'PASS' | 'REVIEW' | 'BLOCK';
export type AutomationRoute = 'AUTO_CANDIDATE' | 'HUMAN_REVIEW' | 'BLOCKED';
export type AppraisalStatus = 'pending' | 'complete' | 'waived';
export type MortgageChannel = 'retail' | 'partner' | 'broker';

export type MortgageCase = {
  caseId: string;
  purchasePrice: number;
  loanAmount: number;
  grossAnnualIncome: number;
  monthlyDebt: number;
  propertyTaxesMonthly: number;
  insuranceMonthly: number;
  hoaMonthly: number;
  ratePct: number;
  termYears: number;
  creditScore: number;
  liquidAssets: number;
  requiredReservesMonths: number;
  documentsCompletePct: number;
  identityVerified: boolean;
  consentCaptured: boolean;
  incomeVerified: boolean;
  assetsVerified: boolean;
  employmentVerified: boolean;
  appraisalStatus: AppraisalStatus;
  titleClear: boolean;
  insuranceBound: boolean;
  closingDisclosureAcknowledged: boolean;
  fraudRiskScore: number;
  exceptionCount: number;
  daysInProcess: number;
  borrowerResponseHours: number;
  channel: MortgageChannel;
};

export type MortgagePolicy = {
  maxDtiPct: number;
  maxLtvPct: number;
  minCreditScore: number;
  maxFraudRiskScore: number;
  minDocumentsCompletePct: number;
  minReserveMonths: number;
  maxExceptionsForAutomation: number;
  maxBorrowerResponseHours: number;
};

export type OperationsAssumptions = {
  monthlyApplications: number;
  manualHoursPerFile: number;
  loadedHourlyCost: number;
};

export type RuleEvaluation = {
  id: string;
  label: string;
  status: GateStatus;
  actual: string;
  policy: string;
  rationale: string;
  owner: 'system' | 'borrower' | 'operations' | 'licensed-review';
};

export type WorkflowTask = {
  id: string;
  stage: string;
  title: string;
  owner: 'system' | 'borrower' | 'operations' | 'licensed-review';
  priority: 'high' | 'medium' | 'low';
  automation: 'automatic' | 'assisted' | 'human-required';
  rationale: string;
};

export type StageScore = {
  stage: string;
  score: number;
  status: GateStatus;
  note: string;
};

export type CapitalMatch = {
  id: string;
  name: string;
  fit: number;
  status: 'candidate' | 'review' | 'not-fit';
  rationale: string;
  synthetic: true;
};

export type DocumentEvidence = {
  id: string;
  kind: 'identity' | 'income' | 'assets' | 'employment' | 'property' | 'title' | 'insurance' | 'disclosure';
  label: string;
  completenessPct: number;
  confidencePct: number;
  verified: boolean;
  conflict: boolean;
  freshnessDays: number;
  provenance: string;
};

export type CommunicationAction = {
  id: string;
  trigger: string;
  channel: 'portal' | 'email' | 'sms' | 'voice' | 'human';
  state: 'ready' | 'hold' | 'escalate';
  owner: 'system' | 'borrower' | 'operations' | 'licensed-review';
  consentRequired: boolean;
  rationale: string;
};

export type QualityCheck = {
  id: string;
  label: string;
  status: GateStatus;
  mode: 'deterministic' | 'sampled-human';
  rationale: string;
};

export type StageCapacity = {
  stage: string;
  manualHoursPerFile: number;
  automatableSharePct: number;
  monthlyHoursAddressable: number;
  bottleneck: boolean;
};

export type MortgageDecisionState = {
  monthlyPrincipalInterest: number;
  totalHousingPayment: number;
  dtiPct: number;
  ltvPct: number;
  estimatedCashToClose: number;
  reserveMonths: number;
  dataConfidence: number;
  automationPotential: number;
  route: AutomationRoute;
  rules: RuleEvaluation[];
  stages: StageScore[];
  tasks: WorkflowTask[];
  capitalMatches: CapitalMatch[];
  hoursSavedMonthly: number;
  capacityValueMonthly: number;
  filesAutoCandidateMonthly: number;
  documentEvidence: DocumentEvidence[];
  contradictions: string[];
  communications: CommunicationAction[];
  qcSampleRatePct: number;
  qualityChecks: QualityCheck[];
  cycleTimeRisk: 'low' | 'medium' | 'high';
  bottleneckStage: string;
  stageCapacity: StageCapacity[];
  blockers: string[];
  reviewReasons: string[];
};

export const defaultMortgagePolicy: MortgagePolicy = {
  maxDtiPct: 43,
  maxLtvPct: 95,
  minCreditScore: 620,
  maxFraudRiskScore: 35,
  minDocumentsCompletePct: 90,
  minReserveMonths: 2,
  maxExceptionsForAutomation: 0,
  maxBorrowerResponseHours: 24,
};

export const referenceMortgageCase: MortgageCase = {
  caseId: 'DEMO-2026-001',
  purchasePrice: 525000,
  loanAmount: 420000,
  grossAnnualIncome: 156000,
  monthlyDebt: 1450,
  propertyTaxesMonthly: 620,
  insuranceMonthly: 185,
  hoaMonthly: 90,
  ratePct: 6.25,
  termYears: 30,
  creditScore: 742,
  liquidAssets: 68000,
  requiredReservesMonths: 2,
  documentsCompletePct: 96,
  identityVerified: true,
  consentCaptured: true,
  incomeVerified: true,
  assetsVerified: true,
  employmentVerified: true,
  appraisalStatus: 'complete',
  titleClear: true,
  insuranceBound: true,
  closingDisclosureAcknowledged: true,
  fraudRiskScore: 12,
  exceptionCount: 0,
  daysInProcess: 8,
  borrowerResponseHours: 6,
  channel: 'partner',
};

export const defaultOperationsAssumptions: OperationsAssumptions = {
  monthlyApplications: 2400,
  manualHoursPerFile: 7.5,
  loadedHourlyCost: 42,
};

const clamp = (value:number,min=0,max=100)=>Math.max(min,Math.min(max,value));

export const mortgagePayment = (principal:number,annualRatePct:number,termYears:number) => {
  if (principal <= 0 || termYears <= 0) return 0;
  const periods = termYears * 12;
  const monthlyRate = annualRatePct / 100 / 12;
  if (monthlyRate === 0) return principal / periods;
  return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -periods));
};

const rule = (
  id:string,
  label:string,
  status:GateStatus,
  actual:string,
  policy:string,
  rationale:string,
  owner:RuleEvaluation['owner']='system',
):RuleEvaluation=>({id,label,status,actual,policy,rationale,owner});

const statusFromBoolean = (value:boolean,block=false):GateStatus => value ? 'PASS' : block ? 'BLOCK' : 'REVIEW';

const scoreStage = (stage:string,checks:GateStatus[],note:string):StageScore => {
  const weights:number[] = checks.map(status=>status==='PASS' ? 1 : status==='REVIEW' ? .55 : 0);
  const score = Math.round((weights.reduce<number>((sum,x)=>sum+x,0) / Math.max(checks.length,1))*100);
  const status:GateStatus = checks.includes('BLOCK') ? 'BLOCK' : checks.includes('REVIEW') ? 'REVIEW' : 'PASS';
  return {stage,score,status,note};
};

export const evaluateMortgageCase = (
  input:MortgageCase,
  policy:MortgagePolicy=defaultMortgagePolicy,
  ops:OperationsAssumptions=defaultOperationsAssumptions,
):MortgageDecisionState => {
  const monthlyIncome = input.grossAnnualIncome / 12;
  const monthlyPrincipalInterest = mortgagePayment(input.loanAmount,input.ratePct,input.termYears);
  const totalHousingPayment = monthlyPrincipalInterest + input.propertyTaxesMonthly + input.insuranceMonthly + input.hoaMonthly;
  const dtiPct = monthlyIncome > 0 ? ((totalHousingPayment + input.monthlyDebt) / monthlyIncome) * 100 : 999;
  const ltvPct = input.purchasePrice > 0 ? (input.loanAmount / input.purchasePrice) * 100 : 999;
  const estimatedClosingCosts = input.purchasePrice * 0.025;
  const estimatedCashToClose = Math.max(0,input.purchasePrice-input.loanAmount)+estimatedClosingCosts;
  const reserveMonths = totalHousingPayment > 0 ? input.liquidAssets / totalHousingPayment : 0;

  const rules:RuleEvaluation[] = [
    rule('consent','Borrower consent',statusFromBoolean(input.consentCaptured,true),input.consentCaptured?'Captured':'Missing','Required before automated workflow execution','Consent gate prevents workflow actions from proceeding without explicit borrower authorization.','borrower'),
    rule('identity','Identity verification',statusFromBoolean(input.identityVerified,true),input.identityVerified?'Verified':'Unverified','Verified identity required','Identity failure is a hard workflow blocker and requires secure resolution.','operations'),
    rule('documents','Document completeness',input.documentsCompletePct>=policy.minDocumentsCompletePct?'PASS':input.documentsCompletePct>=75?'REVIEW':'BLOCK',input.documentsCompletePct.toFixed(0)+'%',policy.minDocumentsCompletePct+'% demo threshold','Completeness is a workflow-readiness gate, not a legal underwriting rule.','borrower'),
    rule('income','Income verification',statusFromBoolean(input.incomeVerified),input.incomeVerified?'Verified':'Pending','Verified for automation candidate','Unverified income routes the file to assisted review.','operations'),
    rule('assets','Asset verification',statusFromBoolean(input.assetsVerified),input.assetsVerified?'Verified':'Pending','Verified for automation candidate','Unverified assets create a review condition.','operations'),
    rule('employment','Employment verification',statusFromBoolean(input.employmentVerified),input.employmentVerified?'Verified':'Pending','Verified for automation candidate','Employment evidence must be complete before straight-through routing.','operations'),
    rule('dti','Debt-to-income',dtiPct<=policy.maxDtiPct?'PASS':dtiPct<=policy.maxDtiPct+5?'REVIEW':'BLOCK',dtiPct.toFixed(1)+'%','≤ '+policy.maxDtiPct.toFixed(1)+'% configurable demo policy','This is a configurable portfolio threshold for workflow simulation, not an actual lender or agency eligibility rule.','licensed-review'),
    rule('ltv','Loan-to-value',ltvPct<=policy.maxLtvPct?'PASS':ltvPct<=100?'REVIEW':'BLOCK',ltvPct.toFixed(1)+'%','≤ '+policy.maxLtvPct.toFixed(1)+'% configurable demo policy','Higher leverage can require a different product, documentation or licensed review.','licensed-review'),
    rule('credit','Credit-score threshold',input.creditScore>=policy.minCreditScore?'PASS':input.creditScore>=policy.minCreditScore-40?'REVIEW':'BLOCK',String(input.creditScore),'≥ '+policy.minCreditScore+' configurable demo policy','Credit score is used only as a configurable scenario variable; this tool does not issue a lending decision.','licensed-review'),
    rule('reserves','Liquid-reserve coverage',reserveMonths>=policy.minReserveMonths?'PASS':reserveMonths>=Math.max(0,policy.minReserveMonths-1)?'REVIEW':'BLOCK',reserveMonths.toFixed(1)+' mo','≥ '+policy.minReserveMonths+' mo configurable demo policy','Reserve coverage is calculated from modeled housing payment and liquid assets.','licensed-review'),
    rule('fraud','Fraud-risk screen',input.fraudRiskScore<=policy.maxFraudRiskScore?'PASS':input.fraudRiskScore<=policy.maxFraudRiskScore+20?'REVIEW':'BLOCK',input.fraudRiskScore+'/100','≤ '+policy.maxFraudRiskScore+' configurable workflow threshold','A high risk signal never produces an automatic accusation; it only routes the file to secure human review.','operations'),
    rule('appraisal','Collateral review',input.appraisalStatus==='complete'||input.appraisalStatus==='waived'?'PASS':'REVIEW',input.appraisalStatus,'Complete or formally waived','Pending collateral evidence creates a closing-readiness condition.','operations'),
    rule('title','Title readiness',statusFromBoolean(input.titleClear),input.titleClear?'Clear':'Pending','Clear before closing','Title status is a closing workflow gate.','operations'),
    rule('insurance','Insurance readiness',statusFromBoolean(input.insuranceBound),input.insuranceBound?'Bound':'Pending','Bound before closing','Insurance evidence is required for closing readiness in this demo workflow.','borrower'),
    rule('disclosure','Closing disclosure acknowledgement',statusFromBoolean(input.closingDisclosureAcknowledged),input.closingDisclosureAcknowledged?'Acknowledged':'Pending','Acknowledged before closing','The tool tracks acknowledgement status but does not determine legal sufficiency.','borrower'),
    rule('exceptions','Exception count',input.exceptionCount<=policy.maxExceptionsForAutomation?'PASS':input.exceptionCount<=2?'REVIEW':'BLOCK',String(input.exceptionCount),'≤ '+policy.maxExceptionsForAutomation+' for auto-candidate','Any policy exception removes the file from straight-through automation.','licensed-review'),
    rule('responsiveness','Borrower response latency',input.borrowerResponseHours<=policy.maxBorrowerResponseHours?'PASS':'REVIEW',input.borrowerResponseHours+'h','≤ '+policy.maxBorrowerResponseHours+'h service target','Response latency is an operations signal only; it must never be used as a protected-class proxy.','operations'),
  ];

  const byId = Object.fromEntries(rules.map(item=>[item.id,item.status]));
  const stages = [
    scoreStage('Intake & consent',[byId.consent,byId.identity,byId.documents],'Identity, authorization and document intake'),
    scoreStage('Verification',[byId.income,byId.assets,byId.employment,byId.fraud],'Income, assets, employment and secure risk review'),
    scoreStage('Decision support',[byId.dti,byId.ltv,byId.credit,byId.reserves,byId.exceptions],'Configurable policy-sandbox gates; human decision authority remains external'),
    scoreStage('Closing readiness',[byId.appraisal,byId.title,byId.insurance,byId.disclosure],'Collateral, title, insurance and disclosure workflow readiness'),
  ];

  const blocks = rules.filter(item=>item.status==='BLOCK');
  const reviews = rules.filter(item=>item.status==='REVIEW');
  const verificationPasses = [input.identityVerified,input.incomeVerified,input.assetsVerified,input.employmentVerified].filter(Boolean).length;
  const dataConfidence = Math.round(clamp(input.documentsCompletePct*.58 + (verificationPasses/4)*32 + (input.appraisalStatus!=='pending'?10:0)));
  const passRate = rules.filter(item=>item.status==='PASS').length / rules.length;
  const automationPotential = Math.round(clamp(passRate*70 + dataConfidence*.30 - input.exceptionCount*8));
  const route:AutomationRoute = blocks.length ? 'BLOCKED' : reviews.length ? 'HUMAN_REVIEW' : 'AUTO_CANDIDATE';

  const tasks:WorkflowTask[] = [];
  const task = (id:string,stage:string,title:string,owner:WorkflowTask['owner'],priority:WorkflowTask['priority'],automation:WorkflowTask['automation'],rationale:string) =>
    tasks.push({id,stage,title,owner,priority,automation,rationale});

  if (!input.consentCaptured) task('T-CONSENT','Intake','Capture borrower consent','borrower','high','human-required','No automated workflow should execute before consent is captured.');
  if (!input.identityVerified) task('T-ID','Intake','Resolve identity verification','operations','high','human-required','Identity is a hard workflow blocker.');
  if (input.documentsCompletePct < 100) task('T-DOCS','Intake','Request missing documents','borrower',input.documentsCompletePct<75?'high':'medium','assisted','Generate a precise checklist from missing-data fields; do not request documents already present.');
  if (!input.incomeVerified) task('T-INCOME','Verification','Verify income evidence','operations','high','assisted','Route extracted income facts to a reviewer with source references.');
  if (!input.assetsVerified) task('T-ASSET','Verification','Verify asset evidence','operations','medium','assisted','Reconcile liquid assets and large deposits before decision support.');
  if (!input.employmentVerified) task('T-EMP','Verification','Verify employment','operations','medium','assisted','Employment verification remains incomplete.');
  if (byId.dti!=='PASS'||byId.ltv!=='PASS'||byId.credit!=='PASS'||byId.reserves!=='PASS') task('T-UW','Decision support','Licensed policy review','licensed-review','high','human-required','One or more configurable scenario thresholds require human interpretation.');
  if (input.exceptionCount>0) task('T-EXC','Decision support','Resolve policy exception','licensed-review','high','human-required','Exceptions are never auto-cleared.');
  if (input.fraudRiskScore>policy.maxFraudRiskScore) task('T-RISK','Verification','Secure fraud-risk review','operations','high','human-required','Risk signals must be reviewed without automated accusations.');
  if (input.appraisalStatus==='pending') task('T-APP','Closing','Complete collateral review','operations','medium','assisted','Appraisal or documented waiver is pending.');
  if (!input.titleClear) task('T-TITLE','Closing','Resolve title status','operations','high','assisted','Title is not yet clear.');
  if (!input.insuranceBound) task('T-INS','Closing','Obtain insurance evidence','borrower','medium','assisted','Insurance is not yet bound.');
  if (!input.closingDisclosureAcknowledged) task('T-CD','Closing','Track disclosure acknowledgement','borrower','medium','assisted','Acknowledgement is still pending.');
  if (tasks.length===0) task('T-QC','Quality control','Final human QC sample','licensed-review','low','human-required','Even auto-candidate files retain governed human QC sampling in this demo.');

  const capitalMatches:CapitalMatch[] = [
    {
      id:'INV-A',name:'Synthetic Prime Policy A',synthetic:true,
      fit:Math.round(clamp(100-Math.max(0,dtiPct-36)*3-Math.max(0,ltvPct-80)*1.7-Math.max(0,720-input.creditScore)*.45)),
      status:'candidate',rationale:'Illustrative conservative profile emphasizing lower leverage, stronger credit and lower DTI.',
    },
    {
      id:'INV-B',name:'Synthetic Flexible Policy B',synthetic:true,
      fit:Math.round(clamp(92-Math.max(0,dtiPct-43)*2-Math.max(0,ltvPct-95)*2-Math.max(0,660-input.creditScore)*.3-input.exceptionCount*8)),
      status:'candidate',rationale:'Illustrative broader policy sandbox; not an actual investor guideline.',
    },
    {
      id:'INV-C',name:'Synthetic Partner Policy C',synthetic:true,
      fit:Math.round(clamp(88-(input.channel==='partner'?0:7)-Math.max(0,input.borrowerResponseHours-12)*.25-Math.max(0,90-input.documentsCompletePct))),
      status:'candidate',rationale:'Illustrative operational-fit profile emphasizing partner channel, responsiveness and digital completeness.',
    },
  ].map(item=>({...item,status:item.fit>=72?'candidate':item.fit>=52?'review':'not-fit'} as CapitalMatch));

  const autoShare = route==='AUTO_CANDIDATE' ? automationPotential/100 : route==='HUMAN_REVIEW' ? automationPotential/100*.45 : 0;
  const filesAutoCandidateMonthly = Math.round(ops.monthlyApplications*autoShare);
  const hoursSavedMonthly = filesAutoCandidateMonthly*ops.manualHoursPerFile;
  const capacityValueMonthly = hoursSavedMonthly*ops.loadedHourlyCost;

  const documentEvidence:DocumentEvidence[] = [
    {id:'DOC-ID',kind:'identity',label:'Identity evidence',completenessPct:input.identityVerified?100:55,confidencePct:input.identityVerified?99:62,verified:input.identityVerified,conflict:false,freshnessDays:2,provenance:'Identity verification provider / borrower file'},
    {id:'DOC-INC',kind:'income',label:'Income evidence',completenessPct:input.incomeVerified?100:Math.min(88,input.documentsCompletePct),confidencePct:input.incomeVerified?96:68,verified:input.incomeVerified,conflict:input.incomeVerified && input.documentsCompletePct<80,freshnessDays:14,provenance:'Income documents / verification response'},
    {id:'DOC-AST',kind:'assets',label:'Asset evidence',completenessPct:input.assetsVerified?100:Math.min(85,input.documentsCompletePct),confidencePct:input.assetsVerified?95:66,verified:input.assetsVerified,conflict:input.assetsVerified && input.liquidAssets<=0,freshnessDays:12,provenance:'Asset statements / verification response'},
    {id:'DOC-EMP',kind:'employment',label:'Employment evidence',completenessPct:input.employmentVerified?100:Math.min(82,input.documentsCompletePct),confidencePct:input.employmentVerified?94:64,verified:input.employmentVerified,conflict:false,freshnessDays:21,provenance:'Employment verification / borrower file'},
    {id:'DOC-APP',kind:'property',label:'Collateral evidence',completenessPct:input.appraisalStatus==='pending'?50:100,confidencePct:input.appraisalStatus==='pending'?58:95,verified:input.appraisalStatus!=='pending',conflict:false,freshnessDays:input.appraisalStatus==='pending'?0:7,provenance:'Appraisal or documented waiver'},
    {id:'DOC-TTL',kind:'title',label:'Title evidence',completenessPct:input.titleClear?100:60,confidencePct:input.titleClear?96:65,verified:input.titleClear,conflict:false,freshnessDays:input.titleClear?5:0,provenance:'Title workflow status'},
    {id:'DOC-INS',kind:'insurance',label:'Insurance evidence',completenessPct:input.insuranceBound?100:55,confidencePct:input.insuranceBound?95:60,verified:input.insuranceBound,conflict:false,freshnessDays:input.insuranceBound?3:0,provenance:'Insurance binder workflow state'},
    {id:'DOC-CD',kind:'disclosure',label:'Disclosure acknowledgement',completenessPct:input.closingDisclosureAcknowledged?100:65,confidencePct:input.closingDisclosureAcknowledged?99:72,verified:input.closingDisclosureAcknowledged,conflict:false,freshnessDays:input.closingDisclosureAcknowledged?1:0,provenance:'Borrower acknowledgement event'},
  ];

  const contradictions = documentEvidence.filter(item=>item.conflict).map(item=>item.label+' contains an internal consistency signal requiring review');
  if (input.loanAmount>input.purchasePrice) contradictions.push('Loan amount exceeds purchase price in the scenario input');
  if (input.requiredReservesMonths>0 && input.liquidAssets<=0) contradictions.push('Required reserves are positive but liquid assets are zero');

  const communications:CommunicationAction[] = [
    ...tasks.filter(task=>task.owner==='borrower').map((task,index)=>({
      id:'COM-'+String(index+1).padStart(2,'0'),
      trigger:task.title,
      channel:(task.priority==='high'?'portal':task.priority==='medium'?'email':'sms') as CommunicationAction['channel'],
      state:(input.consentCaptured?'ready':'hold') as CommunicationAction['state'],
      owner:'borrower' as const,
      consentRequired:true,
      rationale:task.rationale,
    })),
    ...(tasks.some(task=>task.owner==='licensed-review') ? [{
      id:'COM-ESC',
      trigger:'Licensed review escalation',
      channel:'human' as const,
      state:'escalate' as const,
      owner:'licensed-review' as const,
      consentRequired:false,
      rationale:'Policy-sensitive or ambiguous conditions are routed to authorized human review rather than automated borrower messaging.',
    }] : []),
  ];

  const qcSampleRatePct = Math.round(clamp(
    5 + (100-dataConfidence)*.22 + input.exceptionCount*5 + (route==='HUMAN_REVIEW'?8:0) + (route==='BLOCKED'?15:0),
    5,
    45,
  ));

  const qualityChecks:QualityCheck[] = [
    {id:'QC-01',label:'Calculation reproducibility',status:Number.isFinite(dtiPct)&&Number.isFinite(ltvPct)?'PASS':'BLOCK',mode:'deterministic',rationale:'Core payment, DTI and LTV calculations must reproduce from stored inputs.'},
    {id:'QC-02',label:'Document contradiction scan',status:contradictions.length===0?'PASS':'REVIEW',mode:'deterministic',rationale:contradictions.length===0?'No configured internal contradiction detected.':contradictions.length+' contradiction signal(s) require review.'},
    {id:'QC-03',label:'Consent and identity trace',status:input.consentCaptured&&input.identityVerified?'PASS':'BLOCK',mode:'deterministic',rationale:'Automation must retain authorization and verified identity state.'},
    {id:'QC-04',label:'Rule/version human sample',status:'REVIEW',mode:'sampled-human',rationale:'A production system should sample '+qcSampleRatePct+'% of comparable files using a documented QC plan.'},
    {id:'QC-05',label:'Adverse-action boundary',status:'PASS',mode:'deterministic',rationale:'This engine does not generate or execute an adverse-action lending decision.'},
  ];

  const cycleTimeRisk:'low'|'medium'|'high' = input.daysInProcess>25 || input.borrowerResponseHours>48
    ? 'high'
    : input.daysInProcess>14 || input.borrowerResponseHours>24
      ? 'medium'
      : 'low';

  const capacityBlueprint = [
    ['Intake & documents',1.6,88],
    ['Verification',1.5,74],
    ['Underwriting support',1.8,58],
    ['Borrower coordination',1.0,82],
    ['Closing preparation',1.1,64],
    ['Quality control',0.5,Math.max(20,100-qcSampleRatePct)],
  ] as const;

  const stageCapacity:StageCapacity[] = capacityBlueprint.map(([stage,hours,share])=>({
    stage,
    manualHoursPerFile:hours,
    automatableSharePct:share,
    monthlyHoursAddressable:Math.round(ops.monthlyApplications*hours*(share/100)),
    bottleneck:false,
  }));
  const bottleneck = [...stageCapacity].sort((a,b)=>b.monthlyHoursAddressable-a.monthlyHoursAddressable)[0];
  const bottleneckStage = bottleneck?.stage || 'Unresolved';
  stageCapacity.forEach(item=>{ item.bottleneck = item.stage===bottleneckStage; });

  return {
    monthlyPrincipalInterest,
    totalHousingPayment,
    dtiPct,
    ltvPct,
    estimatedCashToClose,
    reserveMonths,
    dataConfidence,
    automationPotential,
    route,
    rules,
    stages,
    tasks,
    capitalMatches,
    hoursSavedMonthly,
    capacityValueMonthly,
    filesAutoCandidateMonthly,
    documentEvidence,
    contradictions,
    communications,
    qcSampleRatePct,
    qualityChecks,
    cycleTimeRisk,
    bottleneckStage,
    stageCapacity,
    blockers:blocks.map(item=>item.label),
    reviewReasons:reviews.map(item=>item.label),
  };
};

export const scenarioCases:Record<string,MortgageCase> = {
  clean:{...referenceMortgageCase},
  docsGap:{...referenceMortgageCase,caseId:'DEMO-DOC-GAP',documentsCompletePct:72,incomeVerified:false,assetsVerified:false,borrowerResponseHours:38},
  highDti:{...referenceMortgageCase,caseId:'DEMO-DTI',loanAmount:470000,monthlyDebt:3200,grossAnnualIncome:118000,creditScore:688,exceptionCount:1},
  closingGap:{...referenceMortgageCase,caseId:'DEMO-CLOSE',appraisalStatus:'pending',titleClear:false,insuranceBound:false,closingDisclosureAcknowledged:false,daysInProcess:21},
  riskReview:{...referenceMortgageCase,caseId:'DEMO-RISK',fraudRiskScore:58,documentsCompletePct:84,identityVerified:true,exceptionCount:1},
};

export const workflowArchitecture = [
  ['01','Point of sale / intake','Consent, identity, application and document collection'],
  ['02','Document intelligence','Classify, extract, reconcile, score confidence and identify missing or contradictory evidence'],
  ['03','Eligibility / product fit','Run transparent configurable policy scenarios without hidden approval logic'],
  ['04','Pricing & payment','Compute payment sensitivity and compare scenario economics'],
  ['05','Underwriting support','Evaluate a rule graph and package exceptions for licensed review'],
  ['06','Borrower orchestration','Generate precise next actions from case state instead of generic chasing'],
  ['07','Voice & communications','Route portal, email, SMS, voice and human escalation behind consent and role controls'],
  ['08','Compliance controls','Enforce consent, auditability, manual-review and adverse-action boundaries'],
  ['09','Quality control','Use deterministic checks plus risk-weighted human sampling and complete traceability'],
  ['10','Closing readiness','Track appraisal, title, insurance and disclosure dependencies as a critical path'],
  ['11','Capital markets sandbox','Compare synthetic investor-fit profiles without representing real private guidelines'],
  ['12','Operations telemetry','Model stage capacity, cycle-time risk and economic value under explicit assumptions'],
] as const;
