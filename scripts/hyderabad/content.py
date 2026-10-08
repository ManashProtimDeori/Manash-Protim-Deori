"""Build the approved audit integration from the immutable v20 baseline.

Historical version snapshots and review timestamps remain unchanged. New source
access is qualified using the recorded audit; reproducing content is not a new
verification pass.
"""
import collections, copy, csv, datetime, hashlib, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[2]
R = ROOT / 'research/hyderabad'
P = ROOT / 'public/case-studies/hyderabad-political-intelligence'
BASE = R / 'baseline-v20-deck.json'
deck = json.loads(BASE.read_text())
audit = json.loads((R / 'audit-10-rounds.json').read_text())
main = copy.deepcopy(deck['slides'][:32])
sources = copy.deepcopy(deck['sources'])
facts = copy.deepcopy(deck['facts'])
S = {s['id']: s for s in sources}
F = {f['id']: f for f in facts}
AUDIT = {c['id']: c for c in audit['claims']}
DATE = '2026-10-08'

def clean_text(value):
    # URLs, email addresses and evidence IDs must survive editorial spacing.
    saved = {}
    def protect(m):
        key = f'@@{len(saved)}@@'
        saved[key] = m.group(0)
        return key
    value = re.sub(r'https?://\S+|[\w.+-]+@[\w.-]+\.[A-Za-z]+|\b[FMCAIRSGv]\d{2}\b', protect, value)
    value = re.sub(r'(?<=\d)(?=[A-Za-z])', ' ', value)
    value = re.sub(r'(?<=[A-Za-z])(?=\d)', ' ', value)
    for key, original in saved.items(): value = value.replace(key, original)
    return value

def source(id, title, publisher, url, locator, date, lineage, limitation, access):
    s = dict(id=id, title=title, publisher=publisher, url=url, locator=locator,
             publication_date=date, retrieved=DATE, lineage=lineage,
             limitation=limitation, fresh_access=access)
    sources.append(s); S[id] = s

source('S26', '2024 Secunderabad Cantonment by-election records', 'Chief Electoral Officer Telangana',
       'https://ceotelangana.nic.in/BYE_GE_2024.html', 'By-election index: result declaration and Form 20 links',
       '2024 by-election records', 'CEO official index',
       'Index read. Linked result declaration/Form 20 could not be retrieved. The index is not used to verify an unread result.', 'Index read; result document pending')
source('S27', 'Congress wins Secunderabad Cantonment by-election', 'The New Indian Express',
       'https://www.newindianexpress.com/states/telangana/2024/Jun/05/congress-wins-byelection-to-secunderabad-cantonment',
       'Opening paragraph: Congress win; result event 4 June 2024', '2024-06-05', 'Express News Service reporting',
       'Winner/event only. Vote totals and current party strength are not adopted. Official declaration remains pending.', 'Article read')
source('S28', '2025 Jubilee Hills by-election records', 'Chief Electoral Officer Telangana',
       'https://ceotelangana.nic.in/BYE_GE_2025.HTML', 'Index: State Gazette Form 21-D declaration link',
       '2025 by-election records', 'CEO official index',
       'Index read. Linked declaration PDF unavailable. No unread document content or disputed final vote total is adopted.', 'Index read; declaration/Form 20 pending')
source('S29', 'Quality in qualitative evaluation', 'HM Treasury / GOV.UK',
       'https://www.gov.uk/government/publications/the-magenta-book/quality-in-qualitative-evaluation-qqe-html',
       'Framework questions 7–8: sample selection/coverage; question 18: auditability',
       '2003 framework; current HTML edition retrieved 2026-10-08', 'UK government methodological guidance',
       'Supports research-design checks. Does not prescribe 5–8 interviews or validate this proposed Hyderabad pilot.', 'Relevant framework sections read')
source('S30', 'Magenta Book: evaluation guidance', 'HM Treasury / GOV.UK',
       'https://www.gov.uk/government/publications/the-magenta-book/magenta-book-central-government-guidance-on-evaluation-html',
       'Quality principles; theory of change and evaluation-design sections',
       '2026 edition', 'UK government methodological guidance',
       'Supports evaluation design, uncertainty and comparison. Local workload, outputs and future effectiveness remain untested.', 'Relevant sections read')

for s in sources[:25]:
    prior = next(x for x in audit['sources'] if x['id'] == s['id'])
    s['fresh_access'] = prior['fresh_route']
    if prior['retrieval'].get('sha256'): s['snapshot_sha256'] = prior['retrieval']['sha256']
    s['verification_date'] = DATE
S['S06']['locator'] = 'Performance of Political Parties, printed p.1, WON column'
S['S07']['limitation'] += ' Fresh target rows were inaccessible in the ten-round review. Retain as pending primary recheck.'
S['S16']['limitation'] += ' Relevant passage could not be freshly read in the ten-round review.'
S['S09']['locator'] = 'Printed p.4: VII Capital Expenditure; printed pp.15–17: Major Schemes Budget Allocation'
S['S10']['locator'] = 'Fiscal summary; Table 11 revenue receipts and Table 14 sector BE-to-actual comparison, 2024–25'
S['S23']['lineage'] = S['S24']['lineage'] = 'Times Group reporting; shared corporate lineage'
S['S23']['limitation'] += ' Shares corporate lineage with S24. Count as one reporting lineage.'
S['S24']['limitation'] = 'Same corporate group as S23. Winner supported as reporting, not two independent confirmations. Official final Form 20 pending.'
S['S25']['url'] = 'https://github.com/ManashProtimDeori/Manash-Protim-Deori/blob/c5ab9d8ac00c9180b880fa50f3e5f99682e1dac1/src/data/resume.ts'

F['F37']['text'] = 'Candidate resume lists manashdeori09@gmail.com, LinkedIn/manash-protim-deori and openness to relocation.'
F['F20']['text'] = 'Congress candidate V. Naveen Yadav won the November 2025 Jubilee Hills by-election, according to Times Group reporting.'
F['F20']['corroboration'] = 'S23 and S24 share Times Group lineage; they are not independent confirmations. Official declaration/Form 20 pending.'
for f in facts:
    prior = AUDIT[f['id']]
    f['verification_status'] = 'Qualified' if f['id'] == 'F37' else prior['verdict']
    f['verification_date'] = DATE
    f['verification_basis'] = prior['checks'][1]['basis']
    if f['id'] == 'F37': f['verification_basis'] = 'Source contact fields reproduced correctly. Candidate resume remains self-reported.'
    if f['verification_status'] == 'Blocked':
        f['kind'] = 'Historical record, fresh recheck pending'
        f['limit'] = (f.get('limit', '') + ' Original passage could not be freshly retrieved. Internal arithmetic is not a provenance check.').strip()
    if f['id'] == 'F20': f['limit'] += ' S23/S24 share Times Group lineage. Official declaration/Form 20 pending.'

# Printed page and row locators checked directly against the frozen S09 PDF.
budget_rows = {'F21':(16,'32','H-CITY assistance to CURE, 2,654 crore'),
               'F22':(16,'36','Musi Riverfront development, 1,500 crore'),
               'F23':(16,'38','HMWSSB development loans, 1,450 crore'),
               'F24':(17,'50','Metro Rail Phase II, 600 crore'),
               'F25':(17,'57','HMRL loans, 500 crore'),
               'F26':(17,'69','20 KL water reimbursement, 300 crore'),
               'F29':(15,'3/4/7','Indiramma Houses 5,500; Mahalaxmi RTC 4,305; Rajiv Aarogya Sri 1,143 crore')}
for id, (page, row, label) in budget_rows.items():
    F[id]['locator'] = f'S09 p.{page}, Table 10, row {row}'
    F[id]['verification_basis'] = f'S09 printed p.{page}, Table 10 row {row}: {label}, 2026–27 BE. Budget provision only.'
F['F27']['locator'] = 'S09 p.4, row VII, RE/BE columns'
F['F27']['verification_basis'] = 'S09 printed p.4, VII Capital Expenditure: 36,480.87 crore 2025–26 RE and 47,267.28 crore 2026–27 BE; fiscal-stage comparison only.'

def fact(id, text, src, locator, geo, date):
    f = dict(id=id, text=text, sources=src, locator=locator, geography=geo,
             reference_date=date, kind='Attributed reporting / analysis',
             corroboration='Bounded attributed statement; no claim of independent numerical confirmation.',
             limit='Historical statement, not current status or a forecast.',
             verification_status='Qualified', verification_date=DATE,
             verification_basis='Relevant reporting/analysis passage read; limitations retained.')
    facts.append(f); F[id] = f

fact('F38', 'Congress won the 2024 Secunderabad Cantonment by-election, according to reporting.',
     ['S27'], 'Opening paragraph; reported result 4 June 2024', 'AC 71, historical by-election', '2024-06-04')
F['F38']['limit'] = 'Official CEO declaration/Form 20 unavailable. Winner/event only, no vote totals or present membership claim.'
fact('F39', 'PRS reports 2024–25 state revenue receipts 24% below BE.', ['S10'], 'Table 11, Revenue Receipts row', 'Telangana state', '2024–25 BE to actual')
fact('F40', 'PRS reports 2024–25 urban-development actuals 56% below BE.', ['S10'], 'Table 14, Urban Development row', 'Telangana state', '2024–25 BE to actual')
fact('F41', 'PRS reports 2024–25 transport actuals 33% below BE.', ['S10'], 'Table 14, Transport row', 'Telangana state', '2024–25 BE to actual')
for id in ['F39', 'F40', 'F41']:
    F[id]['limit'] = 'PRS analysis of state documents. Statewide historical context, not Hyderabad performance or a 2026–27 prediction.'

def update(n, **kwargs): main[n-1].update(kwargs)
main[18]['section'] = 'Policy case study 01'
main[19]['section'] = 'Policy case study 02'
main[28]['title'] = 'Days 61 to 90: improve and hand over'
main[1]['items'][0][1] = 'INC won 64 statewide seats. The deck’s selected 2023 table shows 0 of 15. Primary recheck pending.'
update(2, logic='These institution-specific results cannot be collapsed into one citywide result. Budget provisions create questions about implementation.',
       limits='Selected units differ. The 15-seat source recheck is pending. Budget estimates and boundary changes do not establish public approval.')
update(4, limits='AC 57–71 is a contiguous administrative-code study set, chosen for a bounded work sample. It excludes other metropolitan seats and is not representative.')
update(5, logic='The five checks are designed to detect different errors. Their effect on quality and turnaround must be measured in a pilot.',
       limits='Ten recent audit lenses are self-review, not ten independent confirmations. Earlier 20 content versions remain historical records.')
update(6, body='State, civic and by-election records describe different institutions and dates. Later by-elections require a separate event ledger.',
       facts=main[5]['facts']+['F38','F20'],
       items=[['2014','First Assembly: TRS 63 / INC 21. Fresh recheck pending.'],
              ['2018','Reported Assembly result: TRS 88 / INC 19.'],
              ['2020','Reported civic result: TRS 56 / BJP 48.'],
              ['2023','State result: INC 64 / BRS 39.'],
              ['2024–25','Reported INC bypoll wins: Cantonment, then Jubilee Hills.'],
              ['2026','GO 55: three municipal corporations.']],
       logic='Separate election outcomes, by-elections, office changes and boundary changes. Historical outcomes do not establish present membership.',
       limits='2014 fresh passage pending. Legacy/bypoll results are attributed reporting. No voter switching or current party-strength estimate.')
update(9, limits='Contiguous-code study set AC 57–71, not the full metropolis. Historical result table retained with fresh primary recheck pending.')
update(11, body='Among three examined 2023 seats, margins were 878 in Yakutpura, 2,037 in Nampally and 81,660 in Chandrayangutta.',
       limits='Three selected seats, not a party-wide distribution. Arithmetic agrees internally. Fresh source-row check pending; no voting-motive inference.',
       logic='Different margins within the three seats show varied competition. Later Cantonment and Jubilee by-elections need a separate status ledger.',
       facts=main[10]['facts']+['F38'])
update(12, title='Cluster presence and access questions',
       logic='Cluster presence does not establish broad access. Locations anchor research questions, but do not measure benefits, GDP or job quality.')
update(18, body='State capex: ₹36,480.87 crore in 2025–26 RE and ₹47,267.28 crore in 2026–27 BE, a 29.6% nominal increase. In 2024–25, PRS reports state revenue receipts 24% below BE.',
       facts=main[17]['facts']+['F39'],
       limits='Statewide RE-to-BE comparison. Prior BE-to-actual gap is context, not a forecast. Chart labels round to whole crore; exact values remain in the workbook.')
update(23, items=[['Supported','2023 state totals, GO 55, 2026–27 BE','Keep document date and scope'],
                 ['Pending','15-seat rows, three margins, 2014 passage','Obtain readable primary passages'],
                 ['Reported','2024 Cantonment / 2025 Jubilee wins','Official declarations / Form 20'],
                 ['Unknown','Current civic roster and service outcomes','Assign official record refresh']],
       limits='Verification status is record-specific. A source index or correct calculation does not clear an unread original passage.',
       facts=main[22]['facts']+['F38'])
update(25, body='Six selected urban-related 2026–27 budget lines form a source-linked tracker. They are a prototype, with open implementation fields.',
       logic='The selected rows support monitoring questions. They do not form a complete CURE total or a live delivery dashboard.',
       limits='PRS: 2024–25 state urban-development actuals −56% vs BE, transport −33%. Historical context, not 2026–27 delivery.',
       facts=main[24]['facts']+['F40','F41'])
update(26, items=[['Discover','Question and original record'],['Verify','Source status and contradictions'],['Synthesize','Finding and rival explanation'],['Review','Acceptance and correction closure'],['Refresh','Named owner and expiry trigger']])
update(27, contribution='I would build the registers and one reviewed pilot brief, log sourcing and review effort, then agree the brief count with my manager.',
       items=[['Week 1','Role and geography alignment','Agree scope, records and reviewer'],
              ['Weeks 2–3','One bounded pilot brief','Log effort and review acceptance'],
              ['Week 4','Capacity and backlog review','Agree further outputs from the pilot']],
       limits='About 10 focused hours/week is a planning envelope to agree. Four briefs remain a conditional capacity target, not a promised output.')
update(28, items=[['Validate','Update two case briefs if access allows'],['Select','Purposive 5–8 interview pilot if approved'],['Document','Missing voices, language review, stopping rule'],['Review','Context only, no survey percentages']],
       limits='Exploratory planning range. Define question, inclusion, consent, language support and stopping rule; no assured representativeness or saturation.')
update(29, items=[['Quality','Unsupported claims per audited claim'],['Closure','Closed corrections / logged corrections'],['Speed','Time for comparable reviewed briefs'],['Handover','Owner, expiry and next evidence task']],
       limits='Agree denominators and compare similar briefs. More detected errors can reflect better review; counts alone do not measure improvement.')
update(32, body='For considering my application to Inclusive Minds\nPolitical consulting · Hyderabad\n\nmanashdeori09@gmail.com\nlinkedin.com/in/manash-protim-deori')

recommendations = {
 2:'Maintain separate institution-specific briefs with a dated geography crosswalk.',
 3:'Test fit against the actual requisition through one reviewed research brief.',
 4:'Complete the dated official boundary crosswalk before joining datasets.',
 5:'Attach a claim register and correction log to every brief.',
 6:'Maintain a dated event ledger that includes subsequent by-elections.',
 7:'Document responsibility and evidence for each issue-specific handoff.',
 8:'Compare historical council counts only within equivalent election units.',
 9:'Publish the selection rationale and exclusions with each constituency brief.',
10:'Keep Assembly, parliamentary and civic series separate.',
11:'Compare only the examined seats and refresh subsequent status separately.',
12:'Use verified cluster locations to frame a bounded opportunity-access brief.',
13:'Validate a defined access question before proposing an intervention.',
14:'Match each land or service claim to its dated jurisdiction and original record.',
15:'Track each transport financing line through documented implementation stages.',
16:'Build a catchment-specific resilience brief using comparable event records.',
17:'Trace a selected service journey against current official eligibility rules.',
18:'Monitor financing and execution with explicit BE, RE and actual stages.',
19:'Evaluate the Musi case against documented milestones and household safeguards.',
20:'Verify an individual case against its order, boundary and review records.',
21:'Assign an issue owner and document the accountable handoff.',
22:'Review a dated multilingual discourse corpus with a coverage note.',
23:'Assign an owner, expiry trigger and validation task to each consequential unknown.',
24:'Sequence the backlog by classification risk and decision dependencies.',
25:'Maintain a reviewed tracker of selected urban-related budget instruments.',
26:'Pilot a manager-reviewed research workflow with correction-closure criteria.',
27:'Use the first brief’s measured effort to agree the first-month output count.',
28:'Use an approved purposive interview pilot to explore a bounded evidence gap.',
29:'Evaluate comparable briefs using defined quality and turnaround denominators.',
30:'Test transferable methods through a supervised Hyderabad work product.',
31:'Use one inspectable brief to discuss fit with the hiring team.'}

work = {
 2:('Institution-specific briefing pack','Dated results and boundary records','Separate unit/date/source in every comparison'),
 3:('Role-to-work-product fit sheet','Exact requisition, CV examples, pilot brief','Hiring manager accepts requirement/example links'),
 4:('Geography crosswalk','GO instruments and official polygons','Version, join keys, overlap rules and exclusions recorded'),
 5:('Claim register and contradiction log','Original passages and reviewer comments','Every consequential assertion has evidence status and next action'),
 6:('Political event ledger','Results, by-elections, office/boundary notifications','Historical outcome and later status occupy separate dated rows'),
 7:('Issue responsibility sheet','Relevant powers, funding and grievance records','Decision, payer, delivery and review route source-linked'),
 8:('Historical council comparison','Final election files or labelled reports','Equivalent units and final-result vintage retained'),
 9:('Scoped constituency brief','Selected-seat rows and selection rationale','All 15 units disclosed; blocked rows visibly pending'),
10:('Separate AC / PC / civic series','Original institution-specific results','No pooled swing or individual-voter inference'),
11:('Selected-seat competition note','Winner/runner-up counts and later events','Margin inputs rechecked before quantitative reuse'),
12:('Opportunity-access brief','Cluster locations, bounded commute/service measures','No promotional job/GDP statement used as an outcome'),
13:('Access-question validation plan','Named location/occupation, official labour data, guide','Question and observable measures agreed before recruitment'),
14:('Boundary-vintage case register','Full instruments, parcel and approval records','Right jurisdiction and effective date for every row'),
15:('Transport implementation ledger','Sanction, award, release, spend and service records','Financing provision kept separate from operating service'),
16:('Catchment resilience brief','Rainfall, drainage and water-quality observations','Comparable events/units and missing series disclosed'),
17:('Scheme journey brief','Current eligibility, application and grievance records','Each journey stage has a dated source or Unknown label'),
18:('Financing-to-delivery brief','BE/RE/actual and release/outcome records','Nominal/statewide scope retained; no forecast from old shortfalls'),
19:('Musi case brief','Award, environment, compensation/rehousing records','Objectives, commitments and verified outcomes separated'),
20:('Case evidence tracker','Order, boundary, notice and review record','Legal conclusions withheld until case-specific review'),
21:('Coordination handoff sheet','Issue authority and approved escalation routes','Owner, trigger, escalation and evidence documented'),
22:('Multilingual discourse log','Dated corpus, outlet choices, qualified translations','Coding and missing coverage documented; no prevalence claim'),
23:('Evidence refresh queue','Blocked facts and dynamic status records','Named owner, expiry trigger and exact required record'),
24:('Approved research backlog','Classification risks and decision dependencies','Manager accepts ordering and stop conditions'),
25:('Selected-instrument budget tracker','Exact budget heads and subsequent documents','Inclusions/exclusions explicit; instruments never silently summed'),
26:('Workflow pilot and correction log','Approved repository, reviewer, brief template','Review acceptance and correction-closure criteria agreed'),
27:('Registers and one pilot brief','Permitted sources and booked review time','Effort recorded before agreeing further brief counts'),
28:('Bounded qualitative pilot','Purposive criteria, consent, guide, language support','Coverage gaps and stopping rule documented; no percentages'),
29:('Pilot evaluation and handover','Audit denominator, correction log, comparable brief time','Baseline and quality denominators retained; open errors visible'),
30:('Supervised proof-of-fit brief','CV examples and local orientation','Self-report, observed work and learning gaps remain distinct'),
31:('Interview work-product discussion','One brief, strongest counterargument, first team need','Hiring team defines fit and the next permitted deliverable')}
alternatives = {
 2:'A difference may reflect institutional boundaries, election context or candidate competition; it does not identify switching voters.',
 3:'A public role description may differ from the actual vacancy. Transferable methods may still require substantial local learning.',
 4:'A changed total can reflect a boundary revision or record coverage rather than a real service change.',
 5:'More logged defects may reflect better detection. Fewer logged defects may reflect weaker review.',
 6:'Institution-specific results can change without one common citywide trend. Bypolls also have distinct candidate/context effects.',
 7:'An observed delay may arise from a handoff, funding, record access or a legitimate review process.',
 8:'Seat changes can reflect turnout, candidates, boundaries or vote distribution. Seats alone do not separate those explanations.',
 9:'The selected study set can differ from other metropolitan seats. Its result is not a representative estimate.',
10:'National and state contests differ in units, candidates and timing; contrasting results do not prove voter conversion.',
11:'Margins differ with the opponent, turnout and candidate context; they do not measure community motives.',
12:'Cluster presence can coexist with broad or uneven access. Neither distribution is established by a location directory.',
13:'An apparent access gap can reflect qualifications, transport, job quality or incomplete vacancy information.',
14:'A difference may reflect jurisdiction/record changes or underlying development. Parcel rights require distinct evidence.',
15:'Budget provision can precede approval, award or spending. A completed asset can still provide uneven journey access.',
16:'Event severity and catchment conditions can change outcomes independently of an agency intervention.',
17:'A journey obstacle can arise from eligibility, documentation, capacity, information or record error.',
18:'A larger plan can reflect priorities or financing assumptions; prior shortfalls do not predict the next year.',
19:'Environmental progress and household costs can move differently; official commitments do not settle either outcome.',
20:'A mandate may exist while an individual action still requires distinct authority, boundary and procedural evidence.',
21:'Multiple bodies may coordinate successfully or experience handoff issues. The institution list alone shows neither.',
22:'Outlet selection, translation and news intensity can change the observed discourse without changed population opinion.',
23:'An unavailable record is an access gap, not proof that the underlying event or outcome did not happen.',
24:'A different manager objective can justify a different priority order. Ranking remains professional judgment.',
25:'Missing implementation data can mean an unpublished record or an incomplete process. Unknown is not zero spending.',
26:'A pilot may improve detection, increase workload or need a simpler shared-sheet workflow.',
27:'One complex brief can consume the planning envelope. Actual pilot effort should determine the output count.',
28:'An interview account may be atypical; non-participation and missing language coverage limit interpretation.',
29:'More corrections can indicate better detection. Faster briefs may differ in complexity or review depth.',
30:'Experience may transfer partly, while local knowledge, language support and agency context require supervised learning.',
31:'The sample may fit a different work product than the vacancy needs. The hiring team must determine fit.'}

for s in main:
    n = s['number']
    statuses = collections.Counter(F[id]['verification_status'] for id in s['facts'])
    s['verification'] = dict(as_of=DATE, status='Blocked premises' if statuses['Blocked'] else 'Qualified premises' if statuses['Qualified'] else 'Supported premises',
                             facts={id:F[id]['verification_status'] for id in s['facts']}, proposals='Conditional',
                             blocked=[id for id in s['facts'] if F[id]['verification_status']=='Blocked'])
    s['gate_summary'] = 'Evidence as of 8 October 2026: '+', '.join(f'{count} {status.lower()}' for status,count in statuses.items())+'. Inferences bounded. Proposals conditional.'
    if 2 <= n <= 31:
        s['recommendation'] = recommendations[n]
        artifact, inputs, acceptance = work[n]
        s['work_product'] = dict(output=artifact,inputs=inputs,owner='Candidate under research lead',reviewer='Manager / relevant subject specialist',acceptance=acceptance,
                                 effort='Measure sourcing and review hours in the first pilot. About 10 hours/week is an agreed planning envelope, not demonstrated capacity.',
                                 dependency='Approved public records and reviewer time. Field, agency and language access need explicit approval where relevant.',
                                 fallback='Publish a narrower desk brief with exact unresolved records and no unsupported conclusion.')
        s['alternatives'] = alternatives[n]
        s['feasibility'] = f'Output: {artifact}. Inputs: {inputs}. Owner: candidate under research lead; reviewer: manager/subject specialist. Acceptance: {acceptance}. Effort: log pilot sourcing and review time before agreeing output count. If access/review fails, narrow the desk brief and retain unknowns.'
    else:
        s.pop('alternatives',None); s.pop('feasibility',None)
    s['defence'] = s['logic']+' Evidence status: '+s['verification']['status']+'. '+s['limits']
    refs = set(z for id in s['facts'] for z in F[id]['sources'])
    if n in [5,24,26,27,28,29]: refs.update(['S29','S30'])
    if n in [6,11,23]: refs.update(['S26','S28'])
    s['refs'] = sorted(refs)
    evidence = '; '.join(f'{id} ({F[id]["verification_status"]}): {F[id]["text"]} [{", ".join(F[id]["sources"])}; {F[id]["locator"]}]' for id in s['facts'])
    chart_data = ''
    if s.get('chart'):
        c = s['chart']
        chart_data = '\nCHART DATA: '+ '; '.join(series['name']+': '+', '.join(f'{name}={value}' for name,value in zip(c['categories'],series['values'])) for series in c['series'])
    s['notes'] = '\n\n'.join(['ESTABLISHES: '+s['body'].replace('\n',' '), 'EVIDENCE: '+evidence,
        'REASONING: '+s['logic'], 'LIMITS / ASSUMPTIONS: '+s['limits'],
        'ALTERNATIVES: '+s.get('alternatives','Editorial framing or contact information; no independent substantive recommendation.'),
        'RECOMMENDATION: '+s.get('recommendation','Framing/contact only.'),
        'HOW I WOULD CONTRIBUTE: '+(s['contribution'] or ('Adjacent executive contributions are shown.' if n==2 else 'Framing/contact only.')),
        'PRACTICAL TEST: '+s.get('feasibility','Contact fields reflect candidate self-report.'),
        'EVIDENCE STATUS: '+s['gate_summary'],
        'FULL REFERENCES: '+'\n'.join(f'{id} | {S[id]["title"]} | {S[id]["publisher"]} | {S[id]["url"]} | {S[id]["locator"]} | {S[id]["publication_date"]} | {S[id]["fresh_access"]}' for id in sorted(refs)),
        'INTERVIEW DEFENCE: '+s['defence']])+chart_data

claims=[]
for f in facts:
    status = f['verification_status']
    claims.append(dict(id=f['id'],type=f['kind'],statement=f['text'],sources=f['sources'],locator=f['locator'],basis=f['verification_basis'],
                       scope=f['geography']+' / '+f['reference_date'],limits=f['limit'],verification_status=status,verification_date=DATE,
                       gate1=status+': '+f['verification_basis'],gate2='Qualified: shared lineage/self-report/reporting retained' if status!='Supported' else 'Supported: bounded issuer record',
                       gate3='Supported: original date/unit and checked arithmetic; source inputs retain their own status',
                       gate4='Qualified: no extension to motives, current status or future impact',gate5='Supported: IDs and source pointers resolve; inaccessible original remains pending',
                       release='Historical input retained with explicit fresh-recheck warning' if status=='Blocked' else 'Released with '+status.lower()+' wording and attribution'))
for s in main[1:31]:
    n=s['number']
    for prefix,typ,statement in [('I','Bounded inference',s['logic']),('R','Proposed work product',s['recommendation']),('C','Candidate contribution',s['contribution'] or '; '.join(a[2] for a in s['items']))]:
        claims.append(dict(id=f'{prefix}{n:02}',type=typ,statement=statement,sources=s['refs'],locator=s['id'],basis='Dated premises: '+','.join(s['facts'])+'. '+s['logic'],
                           scope=s['section'],limits=s['limits'],verification_status='Qualified' if prefix=='I' else 'Proposal',verification_date=DATE,
                           gate1=s['verification']['status']+': '+','.join(s['facts']),gate2='Qualified: source lineages and alternatives stated',
                           gate3='Supported: scope/date/units recorded',gate4='Qualified: bounded inference' if prefix=='I' else 'Conditional: no guaranteed effect',
                           gate5='Supported: references resolve' if prefix=='I' else 'Conditional: owner, input, review, acceptance and fallback specified',
                           release='Bounded analysis with record-specific premise status' if prefix=='I' else 'Proposal only; workload and impact require pilot evaluation'))

appendix=[]
def app(title,section,items=None,layout='appendix',refs=None,body=''):
    num=33+len(appendix)
    a=dict(number=num,id=f'A{len(appendix)+1:02}',title=title,section=section,body=body,items=items or [],layout=layout,contribution='',facts=[],logic='Supporting evidence and methodology.',limits='Research cut-off 8 October 2026',refs=refs or [])
    a['notes']=body+'\n'+json.dumps(a['items'],ensure_ascii=False)
    appendix.append(a)

app('Evidence, reasoning and limitations','Appendix navigation',layout='divider',
    body='Methods and data; slide-level reasoning; factual and source registers; historical self-review; unresolved records.')
app('Evidence status and release conditions','Verification standard',items=[
 ['Provenance','Supported, Qualified or Blocked for each record. An unread original is not cleared by correct arithmetic.'],
 ['Lineage','Shared issuer and publisher records count once. ET/TOI share Times Group; PRS reuses state documents.'],
 ['Integrity','Original date, unit and fiscal stage retained. Chart/workbook values agree; PDF data are searchable.'],
 ['Inference','Interpretations remain bounded. Current legal status, officeholders and delivery require separate records.'],
 ['Practical use','Recommendations identify a work product and acceptance test. Effort/output counts remain conditional.']])
app('2023 study set: AC 57–71','Raw election crosswalk',items=copy.deepcopy(deck['slides'][34]['items']),layout='election-table',refs=['S07'],
    body='Contiguous-code study set selected for a bounded work sample; other metropolitan seats excluded. Fresh primary row recheck pending.')
app('Arithmetic and comparison rules','Reproducibility',items=[
 ['State seats 2023','64+39+8+7+1=119. S06 official performance table.'],
 ['Selected seats 2023','7+7+1+0=15 internally. S07 target rows remain blocked for fresh recheck.'],
 ['Reported GHMC councils','2016: 99+44+4+2+1=150. 2020: 56+48+44+2=150. Historical reporting.'],
 ['Three margins','62,185−60,148=2,037; 46,153−45,275=878; 99,776−18,116=81,660. Inputs pending fresh check.'],
 ['State capex','(47,267.28 / 36,480.87 − 1) × 100 = 29.5673%, rounded 29.6%. Nominal RE-to-BE.'],
 ['Prior execution context','PRS 2024–25 BE-to-actual shortfalls are historical statewide context. No summed city budget or next-year forecast.']])
for start in range(0,32,2):
    rows=[]
    for s in main[start:start+2]:
        n=s['number']; ids=','.join(s['facts'])
        if n in [1,32]:
            left=f'Candidate record: {ids}. Self-reported.\n{s["logic"]}\n{s["limits"]}'
            right='Editorial/contact framing. No substantive I/R/C claim ID assigned.'
        else:
            left=f'Premises: {ids}.\n{s["logic"]}\n{s["gate_summary"]}'
            right=f'R{n:02}: {s["recommendation"]}\nC{n:02}: '+(s['contribution'] or 'Contributions sit beside each executive finding.')+'\nProposal requires manager acceptance and access.'
        rows.append([s['id']+' · '+s['title'],left,right])
    app(f'Slide logic · {start+1:02}–{start+2:02}','Claim-to-contribution ledger',items=rows,layout='logic-ledger')
# Preserve the original77-slide structure: seven5-item pages and one6-item page.
for i in range(8):
    subset=facts[i*5:(i+1)*5] if i<7 else facts[35:]
    rows=[[f['id']+' · '+f['verification_status'],f['text'],','.join(f['sources'])+' · '+f['locator']+'\n'+f['reference_date']] for f in subset]
    app(f'Factual records · {subset[0]["id"]}–{subset[-1]["id"]}','Fact register',items=rows,layout='fact-ledger')
# Keep readable source entries at the original three sources per page.
for offset in range(0,len(sources),3):
    subset=sources[offset:offset+3]
    app(f'Sources · {subset[0]["id"]}–{subset[-1]["id"]}','Full attribution register',items=subset,layout='source-register',refs=[s['id'] for s in subset])
for start in range(0,20,5):
    logs=deck['iterations'][start:start+5]
    app(f'Historical self-review · {start+1:02}–{start+5:02}','Prior content versions, not fresh verification',
        items=[[f'v{x["iteration"]:02} · '+x['focus'],x['change'].split(';')[0]] for x in logs],layout='review-ledger')
app('Evidence qualifications','Limits on released claims',items=[
 ['Fresh source gaps','F08–F11 and F16 remain blocked. Retained historical inputs cannot be called freshly verified.'],
 ['By-election status','Cantonment 2024 and Jubilee 2025 wins are reported. Official declarations / final Form 20 still pending.'],
 ['Shared lineage','ET/TOI share Times Group. PRS/state budget figures share upstream state documents.'],
 ['Selected scope','Three margins, 15 selected ACs and six selected budget lines do not cover the full party, metropolis or CURE budget.'],
 ['Candidate experience','CV remains self-report. Local fluency, networks and independently audited impact are unclaimed.']])
app('Pilot assumptions and acceptance','Practical limits',items=[
 ['Desk capacity','Start with one brief. Log sourcing/review effort before agreeing quantities within the proposed 10-hour weekly envelope.'],
 ['Interview coverage','5–8 is exploratory and conditional. Explain purposive inclusion, missing voices, language review and stopping rule.'],
 ['Quality denominator','Unsupported claims / audited claims; closed / logged corrections. Keep newly detected errors visible.'],
 ['Comparable turnaround','Match scope and review depth before comparing brief time. A lower raw correction count does not prove improvement.'],
 ['Access fallback','Named reviewer and permitted records first. If unavailable, narrow the brief and retain precise unanswered questions.']])
app('Evidence refresh queue','Named record requests and expiry rules',items=[
 ['Hiring manager','Exact requisition/open status and first work product. Confirm before operational use.'],
 ['ECI / CEO / Lok Sabha','F08–F11 election rows; F16 passage from Lok Sabha Secretariat. Final2024 Cantonment and2025 Jubilee declaration/Form20 before numerical reuse.'],
 ['TSEC / corporations','Current poll notification, ward polygons, officeholder/legal roster. Refresh whenever a new order or schedule appears.'],
 ['Scheme agencies','Sanction, award, release, spend, completion and safeguards. Update after every new document or reporting period.'],
 ['Research lead','Confirm question, permissions, language support, reviewer and pilot acceptance before fieldwork or output commitments.']])

assert len(main+appendix)==77
for a in appendix:
    if a['layout']!='source-register':a['items']=[[clean_text(v) for v in row] for row in a['items']]
    a['notes']=a['body']+'\n'+json.dumps(a['items'],ensure_ascii=False)
deck.update(slides=main+appendix,sources=sources,facts=facts,claims=claims,content_version='v21',
            audit_summary=dict(as_of=DATE,review_rounds=10,original_registered_items=127,new_registered_items=len(claims),
                               fact_statuses=dict(collections.Counter(f['verification_status'] for f in facts)),
                               historical_content_versions=20,method='Ten distinct self-review lenses; not independent reviewers or ten successful confirmations.',
                               approved_integration=True),
            integration=dict(version='v21',approved=True,baseline_commit=audit['commit'],baseline_sha256=hashlib.sha256(BASE.read_bytes()).hexdigest(),
                             changes=[f['id'] for f in audit['findings']],blocked_facts=['F08','F09','F10','F11','F16']))
R.mkdir(parents=True,exist_ok=True);P.mkdir(parents=True,exist_ok=True)
(R/'deck-content.json').write_text(json.dumps(deck,ensure_ascii=False,indent=2))
(P/'deck-content.json').write_text(json.dumps(deck,ensure_ascii=False,separators=(',',':')))
for name,rows in [('sources',sources),('facts',facts),('claims',claims),('iterations',deck['iterations'])]:
    (R/f'{name}.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
    keys=list(dict.fromkeys(k for row in rows for k in row))
    with (R/f'{name}.csv').open('w') as fh:
        w=csv.DictWriter(fh,fieldnames=keys,lineterminator='\n');w.writeheader()
        w.writerows({k:json.dumps(v,ensure_ascii=False) if isinstance(v,(list,dict)) else v for k,v in row.items()} for row in rows)
md=['# Hyderabad: Power, Place & Public Value','Manash Protim Deori. Research cut-off: 8 October 2026. Approved audit integration v21.']
for s in deck['slides']:
    md += [f'## {s["number"]:02} · {s["title"]}',s['body'],s['notes']]
(R/'slide-content-and-notes.md').write_text('\n\n'.join(md))
(R/'interview-defence.md').write_text('# Interview defence\n\n'+'\n\n'.join('## '+s['title']+'\n'+s['defence'] for s in main[1:31]))
(R/'verification-report.md').write_text('# Verification and integration status\n\nTen self-review lenses covered 127 baseline items. Approved changes integrate into v21, with 77 slides, 41 fact records, 131 registered items and 30 sources.\n\n'+json.dumps(deck['audit_summary'],ensure_ascii=False,indent=2)+'\n\nF08–F11 and F16 remain blocked for fresh source verification. By-election events remain attributed reporting. Proposal capacity and impact remain conditional. The historical 20-version trail is preserved; content generation does not perform new source verification.\n')
(R/'work-products.json').write_text(json.dumps([dict(slide=s['number'],**s['work_product']) for s in main if 'work_product' in s],ensure_ascii=False,indent=2))
(R/'versions/v21.json').write_text(json.dumps(dict(version=21,slides=deck['slides'],integration=deck['integration'],audit_summary=deck['audit_summary']),ensure_ascii=False,indent=2))
(R/'checkpoint-v21.json').write_text(json.dumps(dict(latest='versions/v21.json',audit_rounds=10,approved_integration=True,blocked=deck['integration']['blocked_facts']),indent=2))
(R/'integration-v21.json').write_text(json.dumps(deck['integration'],indent=2))
print(json.dumps(dict(slides=len(deck['slides']),facts=len(facts),claims=len(claims),sources=len(sources),status=deck['audit_summary']['fact_statuses']),indent=2))
