import { Article } from '../types';

export const articles: Article[] = [
  {
    id: 'art-1',
    slug: 'post-search-marketing-funnel',
    title: 'The Post-Search Marketing Funnel: How Generative AI Reshapes Consumer Intent',
    subtitle: 'When search engines transition from ten blue links to synthesized answers, traditional SEO and top-of-funnel capture must be completely reimagined.',
    excerpt: 'For twenty-five years, digital marketing rested on a simple assumption: consumers type queries into search boxes, click organic links, and browse landing pages. Generative answer engines break this contract.',
    publishedAt: '2026-02-14',
    readTime: '6 min read',
    categories: ['Marketing', 'AI', 'Strategy'],
    tags: ['Search', 'Generative Engine Optimization', 'Consumer Behavior', 'Distribution'],
    featured: true,
    content: {
      lead: 'For twenty-five years, digital marketing rested on an unspoken transactional agreement: consumers type keywords into search boxes, an algorithm returns ranked links, and brands compete on relevance and page experience to earn clicks. Generative answer engines break this contract completely.',
      sections: [
        {
          heading: 'From Destination Surfing to Answer Synthesis',
          body: [
            'When an AI model provides a direct, synthesized recommendation—citing three trusted authorities while resolving the question inside the chat interface—the traditional "website visit" disappears for all informational and low-intent searches.',
            'This does not mean marketing is dead. It means top-of-funnel discovery is shifting from algorithmic ranking to knowledge-graph authority and perceptual consensus.'
          ],
          callout: 'The goal of modern SEO is no longer keyword stuffing; it is becoming the definitive citation source that language models cannot synthesize without crediting.'
        },
        {
          heading: 'The Three New Surfaces of Discovery',
          body: [
            'Brands must now organize their digital footprints across three distinct discovery layers: Direct Synthesis Grounding, Proprietary Data Moats, and Community-Verified Proof.',
            'Language models heavily favor structured data, unambiguous factual schemas, and unhedged definitive research. If your website only contains fluffy marketing prose, an LLM will summarize the category while completely ignoring your specific brand.'
          ],
          codeBlock: {
            language: 'json',
            code: '// Modern Structured Data for LLM Verification\n{\n  "@type": "Product",\n  "name": "Enterprise Marketing Intelligence Engine",\n  "offers": { "price": "1499", "priceCurrency": "USD" },\n  "verifiableProof": "https://company.com/methodology"\n}'
          }
        },
        {
          heading: 'Strategic Implications for Marketers',
          body: [
            'First, double down on proprietary research. Generic listicles will be digested and regurgitated without attribution. Original empirical data, first-party surveys, and proprietary benchmarking cannot be hallucinated by an AI.',
            'Second, shift attribution emphasis from last-click referral tracking to brand search velocity and qualitative self-reported attribution ("Where did you first hear about us?").',
            'Third, build direct, unmediated relationships through owned email channels, private communities, and desktop utilities. When platforms intermediate discovery, owned channels are your only sovereign asset.'
          ]
        }
      ],
      pullQuote: 'The brands that win in the AI era will not be those who generate the most content, but those who produce the original evidence that AI engines must cite to remain credible.',
      footnotes: [
        { number: 1, text: 'Search Engine Land (2025): Shifts in informational query click-through rates following synthetic answer integration.' },
        { number: 2, text: 'Gartner Research: Predicted 25% decline in traditional search traffic by 2026 in favor of AI-native agents.' }
      ]
    }
  },
  {
    id: 'art-2',
    slug: 'unit-economics-creative-constraint',
    title: 'Unit Economics as a Creative Constraint: Why the Best Marketers Think Like CFOs',
    subtitle: 'Unlimited ad budgets breed creative complacency. True strategic genius emerges when severe CAC and payback constraints force structural innovation.',
    excerpt: 'Marketing strategy without unit economic discipline is merely expensive decoration. Understanding contribution margin shifts creative energy from vanity metrics to sustainable growth.',
    publishedAt: '2025-11-20',
    readTime: '5 min read',
    categories: ['Marketing', 'Strategy', 'Analytics'],
    tags: ['Unit Economics', 'CAC', 'Contribution Margin', 'Growth Strategy'],
    featured: true,
    content: {
      lead: 'In the era of zero-interest-rate policy, growth teams were celebrated for top-line revenue velocity regardless of how much capital was incinerated to purchase it. Today, the pendulum has swung violently back to mathematical reality.',
      sections: [
        {
          heading: 'The Fallacy of the Blended Vanity Metric',
          body: [
            'There is no metric more seductive and deceptive than "Blended CAC". By averaging free organic visitors with paid ad clicks, marketing leaders obscure the reality that their marginal paid customer costs three times more than the cohort can ever repay.',
            'Every scaling company eventually hits the "Law of Paid Saturation": as spend increases on Meta or Google, ad algorithms run out of high-affinity prospects and start acquiring price-sensitive transients with higher churn rates.'
          ]
        },
        {
          heading: 'The Payback Horizon Rule',
          body: [
            'A company with a 3-month cash payback period can reinvest its capital 4 times in a calendar year, compounding its growth dramatically. A company with an 18-month payback period, even with high theoretical 5-year LTV, faces chronic working capital starvation.',
            'When marketers understand this, their campaigns change. Instead of pushing annual discounts that delay cash collection, they design introductory offers that front-load contribution margin.'
          ],
          callout: 'Growth that requires constant capital injections to sustain is not a marketing engine; it is a capital conversion subsidy.'
        },
        {
          heading: 'Creativity Under Constraint',
          body: [
            'When you cannot simply outbid competitors on paid search, what options remain? You are forced to engineer referral loops, publish genuinely remarkable research that commands free press, and build software utilities that attract target buyers organically.',
            'Financial discipline does not stifle creative marketing; it rescues it from superficiality.'
          ]
        }
      ],
      pullQuote: 'Financial discipline does not stifle creative marketing; it rescues it from superficiality by demanding that every dollar spent returns with proof of work.'
    }
  },
  {
    id: 'art-3',
    slug: 'agentic-marketing-workflows',
    title: 'Beyond Prompting: Architecting Deterministic Loops in Agentic Marketing Systems',
    subtitle: 'Why single-shot chatbot prompts fail in production enterprise workflows, and how state machines, schemas, and guardrails produce reliable output.',
    excerpt: 'The difference between an AI toy and an enterprise workflow is deterministic reliability. A system that works 85% of the time is unusable; here is how we build the other 15%.',
    publishedAt: '2026-01-08',
    readTime: '7 min read',
    categories: ['AI', 'Automation', 'Technology'],
    tags: ['AI Agents', 'State Machines', 'TypeScript', 'Prompt Engineering'],
    featured: false,
    content: {
      lead: 'Most commentary about AI in marketing centers on typing creative prompts into chat interfaces to generate ad headlines or email subject lines. This is the lowest-leverage application of language models imaginable.',
      sections: [
        {
          heading: 'The Reliability Gap',
          body: [
            'A human marketer can easily tolerate a chatbot returning a weirdly formatted answer once every five attempts. An automated system that feeds directly into a content management system or CRM breaks completely on the first malformed JSON string.',
            'Building reliable AI systems requires treating the LLM not as a creative oracle, but as a probabilistic reasoning engine bounded by strict deterministic state machines.'
          ]
        },
        {
          heading: 'The 4 Invariants of Enterprise Agent Design',
          body: [
            '1. Strict Schema Enforcement: Never ask for freeform text when downstream systems expect data. Use structured JSON output with Zod or Pydantic validation.',
            '2. Separation of Search and Synthesis: Never let the same agent that formulates the query evaluate the truth of the result. Specialized roles prevent cognitive bias.',
            '3. Grounding and Citations: Require every factual proposition to include a character-offset citation back to raw retrieved text.',
            '4. Idempotency & Rate Limiting: Design agent tasks so they can be re-run safely if an external network connection fails midway.'
          ]
        }
      ],
      pullQuote: 'The mark of maturity in AI engineering is not how complex your prompt is, but how many deterministic guardrails you build around it.'
    }
  }
];
