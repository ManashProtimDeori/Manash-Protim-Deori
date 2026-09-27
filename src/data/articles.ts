import { Article } from '../types';

export const articles: Article[] = [
  {
    id: 'art-1',
    slug: 'post-search-marketing-funnel',
    title: 'The Post-Search Marketing Funnel: When the Answer Becomes the Interface',
    subtitle: 'AI search is not merely stealing clicks. It is changing where evaluation happens, what counts as visibility, and which forms of evidence become distribution assets.',
    excerpt: 'The old funnel assumed discovery created a click. AI search increasingly creates an answer first. The strategic question is no longer only "How do we rank?" but "What evidence makes us worth retrieving, citing, remembering and choosing?"',
    publishedAt: '2026-02-14',
    updatedAt: '2026-09-27',
    readTime: '11 min read',
    categories: ['Marketing', 'AI', 'Strategy'],
    tags: ['AI Search', 'Generative Engine Optimization', 'Consumer Behavior', 'Distribution', 'Measurement'],
    featured: true,
    content: {
      lead: 'For twenty-five years, digital marketing treated the click as the handshake between discovery and consideration. AI search is quietly renegotiating that contract. The consumer can now ask, compare, refine and sometimes decide inside the answer layer itself. That makes the website less like the front door to discovery and more like the evidence warehouse behind the concierge desk.',
      heroStats: [
        { value: '2.5B+', label: 'AI Overviews monthly users', context: 'Google, 2026' },
        { value: '1B+', label: 'AI Mode monthly users', context: 'Google, 2026' },
        { value: '8% vs 15%', label: 'Traditional-result click rate', context: 'Pew: AI summary vs no AI summary' },
        { value: '1%', label: 'Clicks on AI-summary source links', context: 'Pew, March 2025 browsing study' }
      ],
      sections: [
        {
          heading: 'The click is losing its monopoly on intent',
          body: [
            'Google says AI Overviews now reach more than 2.5 billion monthly active users, while AI Mode has surpassed one billion monthly users. Google also says AI Mode queries have more than doubled every quarter since launch. Those are platform-reported adoption figures, not proof of marketing effectiveness, but they establish the scale of the behavioral shift. [1][2]',
            'The more important evidence comes from observed browsing behavior. Pew Research Center analyzed 68,879 Google searches from 900 U.S. adults in March 2025. When an AI summary appeared, users clicked a traditional result in 8% of visits versus 15% when no AI summary appeared. They clicked a source inside the AI summary in only 1% of visits. Sessions ended after 26% of AI-summary pages versus 16% of traditional-result pages. [3]',
            'That is not "SEO is dead." It is subtler and more consequential: informational intent can be partially satisfied before the publisher receives the visit. The SERP is becoming less of a highway and more of a concierge desk.'
          ],
          callout: 'Decision implication: traffic can fall even while brand exposure inside answer surfaces rises. If sessions remain your only discovery KPI, the dashboard can tell you demand is shrinking while the market is actually changing interfaces.',
          charts: [
            {
              type: 'comparison',
              title: 'AI summaries compress the click',
              subtitle: 'Observed next-step behavior after Google searches in Pew\'s March 2025 browsing dataset',
              unit: '% of visits',
              source: 'Pew Research Center, July 2025',
              sourceUrl: 'https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/',
              note: 'Traditional result clicks are 8% when an AI summary is present and 15% without one. AI-summary source links receive clicks in 1% of visits with a summary.',
              data: [
                { label: 'Result click · AI summary present', value: 8, display: '8%' },
                { label: 'Result click · no AI summary', value: 15, display: '15%' },
                { label: 'Session ends · AI summary present', value: 26, display: '26%' },
                { label: 'Session ends · no AI summary', value: 16, display: '16%' },
                { label: 'AI-summary source click', value: 1, display: '1%' }
              ]
            }
          ]
        },
        {
          heading: 'The query is becoming a conversation, not a keyword',
          body: [
            'Pew found that only 8% of one- or two-word Google searches produced an AI summary, but that figure rose to 53% for searches containing ten words or more. Searches beginning with question words such as who, what, when or why generated AI summaries 60% of the time. [3]',
            'Google separately reports that the average AI Mode query is roughly three times the length of a traditional Search query. It also says more than one in six U.S. searches now use voice or images, while planning-related AI Mode queries grew faster than overall AI Mode queries over a six-month period. [2]',
            'This matters because richer queries expose more of the decision context: constraints, alternatives, use cases, trade-offs, location, budget and timing. Keyword research was largely a map of what people typed. Conversational search increasingly reveals what people are trying to decide.'
          ],
          callout: 'A keyword is a label. A long-form query is a miniature brief. Marketing teams should mine the language of constraints and trade-offs, not only search volume.',
          charts: [
            {
              type: 'bar',
              title: 'Longer queries are much more likely to trigger AI summaries',
              subtitle: 'Share of Google searches in Pew\'s 2025 study that generated an AI summary',
              unit: '%',
              source: 'Pew Research Center',
              sourceUrl: 'https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/',
              data: [
                { label: '1–2 word searches', value: 8, display: '8%' },
                { label: '10+ word searches', value: 53, display: '53%' },
                { label: 'Question-word searches', value: 60, display: '60%' }
              ]
            },
            {
              type: 'comparison',
              title: 'AI search is already a mass-market interface',
              subtitle: 'Google-reported monthly active users in 2026',
              unit: 'billions of users',
              source: 'Google, I/O 2026 and Search ecosystem updates',
              sourceUrl: 'https://blog.google/products-and-platforms/products/search/new-controls-website-owners/',
              note: 'Platform-reported usage figures; they should not be interpreted as unique users across products.',
              data: [
                { label: 'AI Overviews', value: 2.5, display: '2.5B+' },
                { label: 'AI Mode', value: 1, display: '1B+' }
              ]
            }
          ]
        },
        {
          heading: 'The new scarce resource is citation-worthy evidence',
          body: [
            'In a classic search environment, a page could win by being the best answer-shaped document for a query. In an answer-engine environment, the system can synthesize across many documents. That raises the value of information that is difficult to replace: proprietary data, original experiments, primary documentation, first-party product facts, expert interpretation and genuinely distinctive experience.',
            'Google is explicitly building more controls and visibility for site owners in AI Search, including updated Search Console features and mechanisms designed to surface original sources. It has also introduced features such as Preferred Sources and "Highly Cited" signals. [4][5]',
            'The strategic inversion is important: generic content used to be cheap traffic inventory. In an AI-mediated environment, generic content is also cheap training and synthesis material. If your article can be recreated from the top ten results without losing anything, you have published a commodity.'
          ],
          callout: 'Witty but useful rule: if an AI can summarize your article without needing your article, the moat was probably never the article.'
        },
        {
          heading: 'Discovery metrics need a new balance sheet',
          body: [
            'The old measurement stack over-weighted sessions, rankings and last-click conversions because those events were visible. The new stack should keep them, but add measures that capture influence before the click: share of citations in answer engines, branded search growth, direct traffic, assisted conversion paths, self-reported discovery, email or community growth, and the percentage of high-intent questions for which the brand appears in the answer set.',
            'This changes content strategy from "publish more" to "increase the density of retrievable proof." One original dataset that becomes the reference point for an industry question can create more durable distribution than fifty derivative explainers.',
            'The best marketing asset in an answer economy may therefore look suspiciously like research: a benchmark, a calculator, a methodology, a dataset, an expert comparison or a documented experiment. Marketing and knowledge production are beginning to share a P&L.'
          ],
          callout: 'Board-level question: are we investing in content that attracts visits, or in evidence that machines and humans both need in order to make decisions? The strongest programs do both.'
        },
        {
          heading: 'What decision makers should do next',
          body: [
            'For CMOs: separate "visibility loss" from "traffic loss." Build an AI-discovery scorecard before declaring an SEO decline. Track where the brand is cited, where it is absent, and which evidence sources repeatedly earn inclusion.',
            'For researchers: publish methods, definitions, sample sizes and limitations. AI systems can remix prose; transparent methodology is harder to replace and easier to trust.',
            'For students and early-career marketers: learn information architecture, structured data, primary research and measurement. The future SEO specialist is increasingly part librarian, part analyst and part distribution strategist.',
            'For publishers and category leaders: own the questions that require evidence. If your site becomes the place from which the market borrows its numbers, frameworks and definitions, the answer layer becomes a distribution channel rather than merely a threat.'
          ]
        }
      ],
      pullQuote: 'In the answer-engine era, the strongest content strategy is not to manufacture more answers. It is to manufacture more facts worth answering with.',
      footnotes: [
        { number: 1, text: 'Google — New opportunities, control and insights for website owners, updated August 31, 2026. AI Overviews: 2.5B+ monthly active users; AI Mode: 1B+ monthly users.', url: 'https://blog.google/products-and-platforms/products/search/new-controls-website-owners/' },
        { number: 2, text: 'Google — How AI Mode is changing and expanding the way people search, May 19, 2026. AI Mode passed 1B monthly active users; queries more than doubled every quarter; average AI Mode query about 3× traditional Search length.', url: 'https://blog.google/products-and-platforms/products/search/ai-mode-us-insights/' },
        { number: 3, text: 'Pew Research Center — Google users are less likely to click on links when an AI summary appears in the results, July 22, 2025. Analysis of 68,879 searches from 900 U.S. adults.', url: 'https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/' },
        { number: 4, text: 'Google — New ways to find your favorite sources and original content in AI Search, May 27, 2026.', url: 'https://blog.google/products-and-platforms/products/search/original-high-quality-content-search/' },
        { number: 5, text: 'Google — Q2 2026 earnings remarks. Search & Other revenue grew 17%; Google said AI features were increasing Search usage and sending billions of clicks to websites each week.', url: 'https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q2-2026/' }
      ]
    }
  },
  {
    id: 'art-2',
    slug: 'unit-economics-creative-constraint',
    title: 'The Marginal CAC Trap: Why the Best Marketers Think Like CFOs',
    subtitle: 'The advertising market is getting bigger, platforms can get pricier while still growing, and capital still has a cost. The winning budget is not the one with the prettiest ROAS — it is the one that compounds cash.',
    excerpt: 'Marketing teams are trained to ask whether a campaign worked. Finance asks a nastier question: after acquisition cost, margin, timing and reinvestment, was the growth actually worth owning?',
    publishedAt: '2025-11-20',
    updatedAt: '2026-09-27',
    readTime: '12 min read',
    categories: ['Marketing', 'Strategy', 'Analytics'],
    tags: ['Unit Economics', 'CAC', 'Contribution Margin', 'Payback', 'Budget Allocation'],
    featured: true,
    content: {
      lead: 'A campaign can have a beautiful ROAS and still be a bad use of cash. That sounds heretical only because marketing dashboards usually stop where finance begins. The useful question is not "How much revenue did this spend create?" It is "How much contribution did the next rupee create, how quickly did the cash return, and what did we give up by spending it here?"',
      heroStats: [
        { value: '$294.6B', label: 'U.S. internet ad revenue in 2025', context: 'IAB / PwC' },
        { value: '+13.9%', label: '2025 digital ad revenue growth', context: 'IAB / PwC' },
        { value: '+12%', label: 'Meta average price per ad, Q2 2026 YoY', context: 'Meta' },
        { value: '3.63%', label: 'Effective federal funds rate, Aug 2026', context: 'Federal Reserve / FRED' }
      ],
      sections: [
        {
          heading: 'More advertising does not mean cheaper growth',
          body: [
            'The U.S. digital advertising market reached $294.6 billion in 2025, up 13.9% year over year, according to IAB/PwC. Search generated $114.2 billion, social $117.7 billion, digital video $78.0 billion and commerce media $63.4 billion. The categories overlap by IAB format definitions, so these figures should not be summed into the total. [1]',
            'This is a useful reminder for budget owners: digital advertising is not a fixed pie becoming progressively cheaper through technology. It is an expanding auction ecosystem attracting more demand, more automation and more measurable inventory.',
            'Meta provides an unusually clean example. In Q2 2026, it reported ad impressions up 14% year over year and average price per ad up 12%, while advertising revenue grew 27%. In other words, supply expanded and unit price rose at the same time. [2]',
            'The joke writes itself: the auction does not care that your annual plan assumed CPMs would be polite.'
          ],
          callout: 'Decision implication: when the market is expanding and auctions remain competitive, budget growth should be justified by marginal contribution — not by the comforting memory of last quarter’s blended ROAS.',
          charts: [
            {
              type: 'line',
              title: 'Digital advertising keeps absorbing more money',
              subtitle: 'U.S. internet advertising revenue, IAB / PwC',
              unit: '$B',
              source: 'IAB / PwC Internet Advertising Revenue Reports',
              sourceUrl: 'https://www.iab.com/insights/internet-advertising-revenue-report-full-year-2025/',
              data: [
                { label: '2021', value: 189.3, display: '$189.3B' },
                { label: '2022', value: 209.7, display: '$209.7B' },
                { label: '2023', value: 225.0, display: '$225.0B' },
                { label: '2024', value: 258.6, display: '$258.6B' },
                { label: '2025', value: 294.6, display: '$294.6B' }
              ]
            },
            {
              type: 'bar',
              title: 'Meta Q2 2026: more inventory, higher price, much more ad revenue',
              subtitle: 'Year-over-year change reported by Meta',
              unit: '% YoY',
              source: 'Meta Q2 2026 results',
              sourceUrl: 'https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/',
              data: [
                { label: 'Ad impressions', value: 14, display: '+14%' },
                { label: 'Average price per ad', value: 12, display: '+12%' },
                { label: 'Advertising revenue', value: 27, display: '+27%' }
              ]
            }
          ]
        },
        {
          heading: 'Blended CAC is where bad news goes to hide',
          body: [
            'Blended CAC divides total acquisition spend by total new customers. It is useful for company-level planning and dangerously comforting for channel decisions. Organic demand, referrals, direct traffic and branded search can subsidize an expensive paid channel and make the blended number look healthy.',
            'The number a growth team needs at the budget frontier is marginal CAC: what did the next block of spend cost to acquire? If the first ₹10 lakh finds the highest-intent audience and the next ₹10 lakh buys increasingly indifferent consumers, average CAC can remain acceptable while marginal CAC has already crossed the economic boundary.',
            'That boundary is not "CAC below LTV." LTV is usually a model. Cash is not. A company can be theoretically profitable over five years and practically starved of working capital next quarter.'
          ],
          callout: 'A 5× ROAS campaign that returns cash in 18 months can be a finance problem wearing a marketing trophy.'
        },
        {
          heading: 'Capital puts a clock on marketing',
          body: [
            'The financing environment is not the zero-rate world that trained a generation of growth playbooks. The annual average effective federal funds rate was 0.08% in 2021, 5.03% in 2023, 5.14% in 2024 and 4.21% in 2025. The monthly average was 3.63% in August 2026. [3]',
            'A policy rate is not a company’s actual cost of capital, and marketers should not substitute one for WACC. But the regime shift matters. When capital has a meaningful price, a 90-day payback and a 15-month payback are not two cosmetically different versions of the same growth.',
            'Shorter payback increases reinvestment velocity. It also reduces the period during which churn, returns, discounting, fraud, channel deterioration or a macro shock can invalidate the original acquisition thesis.'
          ],
          charts: [
            {
              type: 'line',
              title: 'Cash stopped being free',
              subtitle: 'Effective federal funds rate — annual averages through 2025, August monthly average for 2026',
              unit: '%',
              source: 'Federal Reserve via FRED',
              sourceUrl: 'https://fred.stlouisfed.org/data/fedfunds',
              note: '2021–2025 values are annual averages; 2026 is the August 2026 monthly average. This is a macro context indicator, not a substitute for company WACC.',
              data: [
                { label: '2021', value: 0.08, display: '0.08%' },
                { label: '2022', value: 1.69, display: '1.69%' },
                { label: '2023', value: 5.03, display: '5.03%' },
                { label: '2024', value: 5.14, display: '5.14%' },
                { label: '2025', value: 4.21, display: '4.21%' },
                { label: 'Aug 2026', value: 3.63, display: '3.63%' }
              ]
            }
          ]
        },
        {
          heading: 'Payback is a strategy variable, not an accounting footnote',
          body: [
            'Consider a deliberately simple model: payback months = CAC ÷ monthly contribution margin per acquired customer. The arithmetic is basic; the management implication is not. A modest change in acquisition cost combined with a modest change in contribution can double the time your cash is trapped.',
            'In the illustrative sensitivity below, moving from ₹1,000 CAC and ₹300 monthly contribution to ₹1,600 CAC and ₹240 contribution increases payback from 3.3 months to 6.7 months. Nothing in that example requires a catastrophic failure. Two mediocre drifts are enough.',
            'This is why mature growth teams monitor CAC, contribution margin, retention and payback together. They are not four KPIs. They are one economic system viewed from four angles.'
          ],
          charts: [
            {
              type: 'bar',
              title: 'Illustrative payback sensitivity',
              subtitle: 'Derived example — not observed market data',
              unit: 'months',
              source: 'Illustrative calculation: CAC ÷ monthly contribution',
              note: 'The purpose is sensitivity, not a benchmark. Replace with your own CAC and contribution margin.',
              data: [
                { label: '₹1,000 CAC / ₹300 contribution', value: 3.33, display: '3.3 mo' },
                { label: '₹1,300 CAC / ₹300 contribution', value: 4.33, display: '4.3 mo' },
                { label: '₹1,300 CAC / ₹240 contribution', value: 5.42, display: '5.4 mo' },
                { label: '₹1,600 CAC / ₹240 contribution', value: 6.67, display: '6.7 mo' }
              ]
            }
          ]
        },
        {
          heading: 'Creativity belongs inside the unit economics model',
          body: [
            'Creative is often discussed as an output layer — copy, visual, hook, format. Economically, it is an input into auction efficiency. Better creative can improve click-through rate, conversion rate, audience expansion and message-market fit without requiring the same increase in bid or budget.',
            'That means the strongest creative brief is not merely "make this more engaging." It is "which economic constraint are we trying to move?" If CAC is rising because click-through is deteriorating, the creative problem differs from a situation where click-through is healthy but landing-page conversion is collapsing.',
            'The CFO mindset therefore does not make marketing less creative. It gives creativity a more interesting job: alter the economics rather than decorate the spend.'
          ],
          callout: 'Good creative gets attention. Great creative changes the slope of the cost curve.'
        },
        {
          heading: 'The operating rules I would put on a growth dashboard',
          body: [
            'Separate average from marginal. Show blended CAC for company context, paid CAC for channel accountability and marginal CAC for the next-budget decision.',
            'Pair ROAS with contribution margin. Revenue is not profit, and a high-AOV product with weak margin can make the dashboard look healthier than the business.',
            'Show payback next to LTV:CAC. A long-dated LTV estimate can rationalize almost anything; payback forces the argument back into cash timing.',
            'Report channel saturation. If each incremental spend band produces weaker contribution, the optimizer should know before the budget meeting does.',
            'Tie creative and funnel diagnostics to economics. CTR, CVR and AOV are not isolated marketing metrics; they are causal inputs into CAC, contribution and payback.'
          ]
        }
      ],
      pullQuote: 'The smartest marketing budget is not the one that buys the most growth. It is the one that buys growth the company can afford to compound.',
      footnotes: [
        { number: 1, text: 'IAB / PwC — Internet Advertising Revenue Report: Full Year 2025. U.S. internet advertising revenue reached $294.6B in 2025, +13.9% YoY; search $114.2B, social $117.7B, digital video $78.0B, commerce media $63.4B.', url: 'https://www.iab.com/insights/internet-advertising-revenue-report-full-year-2025/' },
        { number: 2, text: 'Meta — Q2 2026 Results, July 29, 2026. Ad impressions +14% YoY; average price per ad +12%; advertising revenue +27%.', url: 'https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/' },
        { number: 3, text: 'Federal Reserve via FRED — Effective Federal Funds Rate. Annual averages: 2021 0.08%, 2022 1.69%, 2023 5.03%, 2024 5.14%, 2025 4.21%; August 2026 monthly average 3.63%.', url: 'https://fred.stlouisfed.org/data/fedfunds' }
      ]
    }
  },
  {
    id: 'art-3',
    slug: 'agentic-marketing-workflows',
    title: 'Prompting Is Not a System: Building Marketing Agents That Survive Contact With Reality',
    subtitle: 'Agentic AI gets useful when probabilistic reasoning is surrounded by deterministic contracts, evidence, observability, recovery paths and permission boundaries.',
    excerpt: 'The interesting agent problem is not whether an LLM can complete a task once. It is whether the workflow can survive malformed output, stale evidence, partial failure, duplicate actions and the occasional very confident mistake.',
    publishedAt: '2026-01-08',
    updatedAt: '2026-09-27',
    readTime: '13 min read',
    categories: ['AI', 'Automation', 'Technology'],
    tags: ['AI Agents', 'State Machines', 'Reliability', 'Evaluation', 'Marketing Operations'],
    featured: true,
    content: {
      lead: 'The prompt is not the product. The product is everything that happens when the prompt is misunderstood, the API times out, the source contradicts itself, the model returns the wrong shape, the same job runs twice, or an agent decides it is feeling unusually entrepreneurial with your CRM.',
      heroStats: [
        { value: '21%', label: 'Organizations with mature agentic-AI governance', context: 'Deloitte, 2026' },
        { value: '74%', label: 'Expect moderate+ agent use by 2027', context: 'Deloitte, 2026 survey respondents' },
        { value: '68%', label: 'Explored autonomous agents to some/large extent', context: 'Deloitte State of GenAI, 2025' },
        { value: '66%', label: 'End-to-end success if 8 steps are each 95% reliable', context: 'Illustrative reliability math' }
      ],
      sections: [
        {
          heading: 'Agent adoption is running ahead of governance',
          body: [
            'Deloitte reported in April 2026 that only 21% of surveyed enterprises had mature governance for agentic AI. In the same research, 74% of respondents expected their organizations to be using AI agents at least moderately by 2027. The survey covered 3,235 business and IT leaders across 24 countries who were directly involved in their organizations’ AI programs. [1]',
            'That gap is the real enterprise story. The technology is being asked to act before organizations have fully defined what it may do, what evidence it must retain, when it must stop, who approves consequential actions and how a failure is reconstructed after the fact.',
            'A 2025 Deloitte survey had already found 26% of organizations exploring autonomous-agent development to a large extent and another 42% to some extent. Interest was never the bottleneck. Operational trust is. [2]'
          ],
          callout: 'The dangerous agent is not the one that fails loudly. It is the one that completes the workflow, updates three systems and only then reveals that step two was wrong.',
          charts: [
            {
              type: 'comparison',
              title: 'Adoption ambition is ahead of governance maturity',
              subtitle: 'Deloitte enterprise survey indicators',
              unit: '% of respondents',
              source: 'Deloitte, 2025–2026',
              sourceUrl: 'https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-agents-scaling-faster.html',
              note: 'The 68% exploration figure combines 26% exploring autonomous agents to a large extent and 42% to some extent in Deloitte’s January 2025 State of GenAI release. The 21% and 74% figures come from Deloitte’s 2026 agentic AI governance analysis.',
              data: [
                { label: 'Exploring agents · some/large extent', value: 68, display: '68%' },
                { label: 'Mature agentic governance', value: 21, display: '21%' },
                { label: 'Expect moderate+ use by 2027', value: 74, display: '74%' }
              ]
            }
          ]
        },
        {
          heading: 'Reliability compounds in the wrong direction',
          body: [
            'Suppose a workflow has eight sequential steps and each step succeeds 95% of the time. If all eight must succeed for the workflow to be correct, end-to-end reliability is 0.95⁸ — about 66%. A system can therefore be "95% accurate" at every local step and still fail roughly one-third of complete runs.',
            'At twelve sequential steps, 95% local reliability falls to about 54% end to end. At 99% per step, twelve-step reliability is still only about 89%. This is simple probability, but it explains why impressive single-step demos collapse when chained into real operations.',
            'The engineering response is not to write a more intimidating prompt. It is to reduce unnecessary steps, constrain outputs, validate every transition, make safe retries possible and introduce deterministic checks wherever the problem permits.'
          ],
          callout: 'An agent can be 95% right eight times and still be wrong one-third of the workflow. Multiplication is a brutal product manager.',
          charts: [
            {
              type: 'line',
              title: 'Small local error rates become large workflow failure rates',
              subtitle: 'Illustrative probability: every sequential step must succeed',
              unit: 'end-to-end reliability %',
              source: 'Derived reliability math',
              note: 'This is a simplified independence assumption used to illustrate compounding risk, not a measured benchmark of any model.',
              data: [
                { label: '1 step @95%', value: 95.0, display: '95.0%' },
                { label: '4 steps @95%', value: 81.45, display: '81.5%' },
                { label: '8 steps @95%', value: 66.34, display: '66.3%' },
                { label: '12 steps @95%', value: 54.04, display: '54.0%' },
                { label: '12 steps @99%', value: 88.64, display: '88.6%' }
              ]
            }
          ]
        },
        {
          heading: 'Use probabilistic intelligence inside deterministic contracts',
          body: [
            'Language models are excellent at fuzzy work: extracting meaning, comparing arguments, classifying messy text, drafting, summarizing and generating hypotheses. They are poor substitutes for a transaction ledger, a permission system or a schema validator.',
            'OpenAI reported that its Structured Outputs feature achieved 100% schema adherence on its own complex JSON-schema eval for GPT-4o-2024-08-06, compared with less than 40% for GPT-4-0613. That is a vendor-reported format-following benchmark, not a claim that the model is 100% factually correct. The distinction is exactly the point. Format reliability and truth are different layers. [3]',
            'NIST’s Generative AI Profile treats "confabulation" — confident false or internally inconsistent content — as a core risk, especially in consequential decision settings. A schema can guarantee that a field called evidence exists. It cannot guarantee that the evidence is true. [4]'
          ],
          charts: [
            {
              type: 'comparison',
              title: 'Schema compliance can improve dramatically without solving truth',
              subtitle: 'OpenAI-reported complex JSON-schema eval',
              unit: '% schema adherence',
              source: 'OpenAI Structured Outputs announcement, 2024',
              sourceUrl: 'https://openai.com/index/introducing-structured-outputs-in-the-api/',
              note: 'Vendor-reported benchmark. It measures schema adherence, not factual accuracy, reasoning quality or production reliability.',
              data: [
                { label: 'GPT-4-0613', value: 39.9, display: '<40%' },
                { label: 'GPT-4o-2024-08-06 + Structured Outputs', value: 100, display: '100%' }
              ]
            }
          ]
        },
        {
          heading: 'The production agent has seven boring superpowers',
          body: [
            '1. Typed contracts. Every step has a defined input and output schema. Free-form prose is reserved for places where prose is actually the product.',
            '2. State. The system knows whether a job is queued, running, waiting for review, retrying, failed, approved or completed. "The agent is thinking" is not a state model.',
            '3. Idempotency. Retrying a failed workflow must not create two campaigns, two CRM records or two invoices. Every consequential action needs a stable operation key.',
            '4. Evidence. Claims retain links to the source material that produced them. A downstream reviewer can inspect the evidence rather than trusting the fluency of the summary.',
            '5. Permission boundaries. Reading a CRM and deleting a CRM record are not neighboring capabilities. Agents should receive the minimum action scope required for the task.',
            '6. Observability. Store prompts, model/version, tool calls, latency, token cost, validation errors, retries and final outcomes. If you cannot reconstruct the run, you cannot improve the system.',
            '7. Human checkpoints. Put approval where reversibility is low: publishing, sending, spending, deleting, changing customer data, or making external commitments.'
          ],
          callout: 'Enterprise AI maturity is visible in the failure path. The happy path is a demo.'
        },
        {
          heading: 'A marketing agent should be designed like a control system',
          body: [
            'Take an intelligence-to-content workflow. A fragile design says: "Search the web, identify the most important story, write a post and publish it." A production design separates the stages: retrieve → deduplicate → verify → score → synthesize → fact-check → draft → validate → approve → publish.',
            'Each arrow becomes a control point. Retrieval can enforce source tiers. Verification can require a primary source plus an independent source. Scoring can be deterministic. Drafting can be probabilistic. Validation can check unsupported claims. Publishing can remain human-approved.',
            'This separation is not bureaucracy. It is how you stop one impressive model call from becoming one invisible single point of failure.'
          ]
        },
        {
          heading: 'The decision framework for teams building agents now',
          body: [
            'Use an LLM where ambiguity is the problem. Use code where determinism is the problem. Use a database where memory is the problem. Use an approval step where irreversibility is the problem. Use an evaluation suite where repeatability is the problem.',
            'Researchers should report task-level and end-to-end performance separately. A model can improve extraction quality while the overall system remains unreliable because retrieval, permissions or recovery are weak.',
            'Students should learn software-system concepts alongside prompting: APIs, schemas, state machines, SQL, testing, observability and basic probability. The durable career skill is not knowing the magic words for a model; it is knowing where not to let the model decide.',
            'Executives should ask one question before approving an "agentic transformation": what happens when it is wrong? If the answer is "a human will notice," you do not yet have a control system. You have optimism with a webhook.'
          ]
        }
      ],
      pullQuote: 'The prompt is not the product. The recovery path, evidence trail and permission boundary are the product.',
      footnotes: [
        { number: 1, text: 'Deloitte — Agentic AI is scaling faster than guardrails, April 24, 2026. Survey of 3,235 business and IT leaders across 24 countries; 21% reported mature agentic-AI governance, while 74% expected at least moderate agent use by 2027.', url: 'https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-agents-scaling-faster.html' },
        { number: 2, text: 'Deloitte — State of Generative AI Q4, January 21, 2025. 26% were exploring autonomous agents to a large extent and 42% to some extent.', url: 'https://www.deloitte.com/us/en/about/press-room/state-of-generative-ai.html' },
        { number: 3, text: 'OpenAI — Introducing Structured Outputs in the API, August 6, 2024. OpenAI reported 100% schema adherence for GPT-4o-2024-08-06 on its complex JSON-schema eval versus less than 40% for GPT-4-0613.', url: 'https://openai.com/index/introducing-structured-outputs-in-the-api/' },
        { number: 4, text: 'NIST — Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1. Describes confabulation as confidently presented false or erroneous generated content and highlights risks in consequential settings.', url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf' }
      ]
    }
  }
];
