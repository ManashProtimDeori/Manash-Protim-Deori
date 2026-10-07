import React, { useEffect } from 'react';
import { ArrowUpRight, Download, ExternalLink, FileText, Presentation, ShieldCheck } from 'lucide-react';
import './MeghalayaStrategicCommunicationsPage.css';

const ASSET_ROOT = '/case-studies/strategic-communications-meghalaya';
const PDF_FILE = `${ASSET_ROOT}/Manash-Protim-Deori-Strategic-Communications-Meghalaya.pdf`;
const PPT_FILE = `${ASSET_ROOT}/Manash-Protim-Deori-Strategic-Communications-Meghalaya.pptx`;

const evidence = [
  {
    value: '79.9%',
    label: 'Rural share in the 2011 structural baseline',
    note: 'I derive this from Meghalaya DES Census-base counts; I do not present it as a 2026 population estimate.',
    source: 'https://des.megplanning.gov.in/portal.htm',
  },
  {
    value: '61.08',
    label: 'Internet subscriptions per 100 people',
    note: 'TRAI, Meghalaya, March 2025. I treat this as subscription density, not unique-person penetration.',
    source: 'https://www.trai.gov.in/sites/default/files/2025-07/YIR_08072025_0.pdf',
  },
  {
    value: '12 / 55',
    label: 'Districts / C&RD blocks',
    note: 'The Meghalaya DES portal lists 12 districts and 55 C&RD blocks with 2022 reference years.',
    source: 'https://des.megplanning.gov.in/portal.htm',
  },
  {
    value: '12+',
    label: 'Institutional sources behind my thesis',
    note: 'I triangulated the central communications thesis across state, regulatory and policy sources rather than multiplying citations around one statistic.',
    source: 'https://meghalaya.gov.in/',
  },
];

const operatingSystem = [
  ['Listen', 'I would detect questions, emerging narratives and information gaps before deciding what to publish.'],
  ['Verify', 'I would establish one fact base, one approval path and one accountable source before creative production begins.'],
  ['Simplify', 'I would translate policy, programme and administrative language into what people need to know and do.'],
  ['Localise', 'I would adapt language, examples, calls-to-action, messengers and support paths to the audience and context.'],
  ['Distribute', 'I would give social, press, district/field, visual and feedback channels different jobs rather than duplicate the same asset.'],
  ['Learn', 'I would use questions, action signals and closure/feedback to improve the next communication cycle.'],
];

const proof = [
  ['330M+', 'I managed two integrated campaigns that generated more than 330M impressions.'],
  ['Rs 20M', 'I managed a Rs 20M marketing budget and used performance data to improve allocation.'],
  ['-57%', 'I reduced CPM from Rs 35.8 to Rs 15.5 in my CV-reported campaign work.'],
  ['593+', 'I coordinated 73+ macro-influencers and 520+ micro-influencers through a structured workflow.'],
];

const sources = [
  ['Meghalaya DES Portal', 'Population baseline, rural/urban split, districts and C&RD blocks', 'https://des.megplanning.gov.in/portal.htm'],
  ['Government of Meghalaya · Grassroot Citizen Engagement RFP', 'Last-mile awareness, BCC, village-level engagement, local languages and feedback/grievances · pp. 4 & 23', 'https://meghalaya.gov.in/sites/default/files/tenders/RFP_for_Selection_of_Agency_for_Grassroot_Citizen_Engagement_Program.pdf'],
  ['MyMeG · Highlights', 'Participatory governance, citizen feedback and multi-channel dissemination', 'https://mymeg.meghalaya.gov.in/highlights/'],
  ['Chief Minister · Independence Day Speech 2024', 'Terrain/distance, CM-CONNECT and multilingual 1971 helpline · printed p. 9', 'https://www.meghalaya.gov.in/meghalaya/sites/default/files/press_release/78th_Independence_Day_2024_HCM_Speech.pdf'],
  ['Meghalaya State Language Act, 2005', 'Official and associate-official language contexts · PDF p. 2 / Gazette p. 364', 'https://homepolitical.meghalaya.gov.in/pdf/acts/meghalaya_language_act-2005.pdf'],
  ['Draft Meghalaya Youth Policy 2021', 'Youth heterogeneity · p. 6; under-35 policy estimate · p. 8', 'https://meghalaya.gov.in/sites/default/files/documents/Meghalaya_Youth_Policy_2021_0.pdf'],
  ['TRAI · Yearly Performance Indicators 2024-25', 'Internet-subscription density in Meghalaya · report p. 67 / PDF p. 68', 'https://www.trai.gov.in/sites/default/files/2025-07/YIR_08072025_0.pdf'],
  ['Meghalaya DIPR', 'Press, photo/video, field publicity and Special Interactive Programmes', 'https://meghalaya.gov.in/index.php/dept/25'],
  ['MPOWER Draft ESCP', 'Timely, relevant, understandable, accessible and culturally appropriate stakeholder information · printed p. 6', 'https://meghalaya.gov.in/meghalaya/sites/default/files/documents/MPOWER_Draft_ESCP_22_Jan_2024.pdf'],
];

const qa = [
  'Evidence inventory', 'Primary-source upgrade', 'Statistical validation', 'Contradiction review',
  'Meghalaya specificity', 'Regional nuance', 'Shillong relevance', 'Communications logic',
  'Role mapping', 'My evidence', 'Intellectual rigor', 'Counterargument review',
  'Executive compression', 'Storyline', 'First-person audit', 'Audience-fit review',
  'Design review', 'Source transparency', 'Release red-team', 'Export and sequence QA',
];

export const MeghalayaStrategicCommunicationsPage: React.FC = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'How I Would Communicate Meghalaya | Manash Protim Deori';
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="meg-comms">
      <section className="meg-comms-hero">
        <div className="meg-comms-hero-copy">
          <span className="meg-comms-eyebrow">Independent role-specific perspective · Shillong</span>
          <h1>How I would communicate Meghalaya</h1>
          <p className="meg-comms-lede">
            I treat public communication as a service-delivery layer: information has to become understandable,
            actionable and answerable — not simply published.
          </p>
          <div className="meg-comms-actions">
            <a className="meg-comms-btn meg-comms-btn-primary" href={PDF_FILE} target="_blank" rel="noreferrer">
              <FileText size={17} /> View full deck
            </a>
            <a className="meg-comms-btn" href={PDF_FILE} download>
              <Download size={17} /> Download PDF
            </a>
            <a className="meg-comms-btn" href={PPT_FILE} download>
              <Presentation size={17} /> Download PowerPoint
            </a>
          </div>
          <p className="meg-comms-disclaimer">
            I prepared this independently for the Consultant – Communications opportunity in Shillong. It was not
            commissioned, reviewed or endorsed by Grant Thornton Bharat, and I do not claim access to client-confidential processes.
          </p>
        </div>

        <div className="meg-comms-hero-art" aria-hidden="true">
          <span className="meg-comms-art-kicker">My communications thesis</span>
          <strong>Understand</strong>
          <i>→</i>
          <strong>Act</strong>
          <i>→</i>
          <strong>Respond</strong>
          <div className="meg-comms-hills meg-comms-hills-one" />
          <div className="meg-comms-hills meg-comms-hills-two" />
          <div className="meg-comms-hills meg-comms-hills-three" />
        </div>
      </section>

      <section className="meg-comms-section">
        <div className="meg-comms-section-head">
          <span>01 · What I see</span>
          <h2>I would design for access, comprehension, action and feedback as one system</h2>
          <p>
            Meghalaya’s public sources repeatedly connect communication with last-mile awareness, local-language engagement,
            participatory governance, service access and citizen feedback. I use that evidence to build one operating thesis rather
            than a list of disconnected social-media tactics.
          </p>
        </div>

        <div className="meg-comms-evidence-grid">
          {evidence.map(item => (
            <a className="meg-comms-evidence" key={item.label} href={item.source} target="_blank" rel="noreferrer">
              <strong>{item.value}</strong>
              <h3>{item.label}</h3>
              <p>{item.note}</p>
              <span>Open source <ArrowUpRight size={13} /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="meg-comms-section meg-comms-system-section">
        <div className="meg-comms-section-head">
          <span>02 · How I would work</span>
          <h2>I would run communication as a confidence loop before I run it as a content calendar</h2>
          <p>
            I would make the information chain explicit first. That gives writers, designers, video teams, media teams and field
            stakeholders one reliable message architecture to translate into channel-specific work.
          </p>
        </div>
        <div className="meg-comms-system-grid">
          {operatingSystem.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>I would {title.toLowerCase()}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="meg-comms-section meg-comms-proof-section">
        <div className="meg-comms-section-head">
          <span>03 · Why I can contribute</span>
          <h2>I have already worked where communication, coordination and measurement collide</h2>
          <p>
            My experience does not remove the role’s tenure requirement. It does show the density of responsibility I have already
            handled: high-volume digital distribution, senior-stakeholder messaging, large contributor networks, data-led allocation
            and Meghalaya public-system analysis.
          </p>
        </div>
        <div className="meg-comms-proof-grid">
          {proof.map(([value, body]) => (
            <article key={value}><strong>{value}</strong><p>{body}</p></article>
          ))}
        </div>
        <div className="meg-comms-meghalaya-proof">
          <div>
            <span>My Meghalaya evidence</span>
            <h3>I have already examined the state through a public-system lens</h3>
          </div>
          <p>
            During my IIM Shillong project, I modelled Meghalaya’s Public Distribution System using 4,500+ government records across
            8 state warehouses, 281 wholesalers and 4,000+ fair-price shops. That work taught me to look underneath an announcement at
            the network, bottlenecks, last-mile consequences and citizen impact that communication has to explain accurately.
          </p>
        </div>
      </section>

      <section className="meg-comms-section meg-comms-deck-section">
        <div className="meg-comms-section-head meg-comms-deck-head">
          <div>
            <span>04 · Full presentation</span>
            <h2>I show the argument first — and the evidence trail immediately behind it</h2>
            <p>
              The 42-slide deck contains a 16-slide executive storyline, a thank-you slide immediately before the appendix, and a source-heavy appendix that maps
              every important fact, number and insight to an exact URL, PDF page where applicable, reasoning chain and confidence label.
            </p>
          </div>
          <div className="meg-comms-inline-actions">
            <a href={PPT_FILE} download><Presentation size={15}/> Editable PowerPoint</a>
            <a href={PDF_FILE} target="_blank" rel="noreferrer"><ExternalLink size={15}/> Full-screen PDF</a>
          </div>
        </div>
        <div className="meg-comms-pdf-shell">
          <object data={`${PDF_FILE}#view=FitH`} type="application/pdf" aria-label="How I would communicate Meghalaya — presentation">
            <div className="meg-comms-pdf-fallback">
              <FileText size={28}/>
              <strong>The inline PDF viewer is unavailable in this browser.</strong>
              <a href={PDF_FILE} target="_blank" rel="noreferrer">Open the deck directly <ExternalLink size={14}/></a>
            </div>
          </object>
        </div>
      </section>

      <section className="meg-comms-section">
        <div className="meg-comms-section-head">
          <span>05 · Evidence discipline</span>
          <h2>I would rather show my assumptions than hide them behind polish</h2>
          <p>
            I do not manufacture ten citations around an atomic statistic when one canonical primary source is definitive. I instead
            triangulate strategic conclusions across independent sources, label dated evidence, distinguish subscriptions from people,
            and separate observed facts from my recommendations.
          </p>
        </div>
        <div className="meg-comms-qa-grid">
          {qa.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>)}
        </div>
      </section>

      <section className="meg-comms-section">
        <div className="meg-comms-section-head">
          <span>06 · Selected source spine</span>
          <h2>I make the evidence inspectable</h2>
          <p>The full deck appendix contains the complete claim ledger. These are the public sources most central to the operating argument.</p>
        </div>
        <div className="meg-comms-source-list">
          {sources.map(([name, use, href]) => (
            <a href={href} target="_blank" rel="noreferrer" key={href}>
              <div><strong>{name}</strong><span>{use}</span></div>
              <ArrowUpRight size={16}/>
            </a>
          ))}
        </div>
      </section>

      <section className="meg-comms-closing">
        <ShieldCheck size={25}/>
        <div>
          <span>My standard</span>
          <h2>I would aim to leave behind a communications system that gets clearer with every cycle.</h2>
          <p>Accurate enough to trust. Clear enough to understand. Local enough to matter. Measurable enough to improve.</p>
        </div>
      </section>
    </div>
  );
};