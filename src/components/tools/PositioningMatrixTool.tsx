import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCopy,
  Crosshair,
  FlaskConical,
  RotateCcw,
  ShieldCheck,
  Target,
  TrendingUp,
} from 'lucide-react';
import {
  DEFAULT_POSITIONING_ANSWERS,
  DIMENSIONS,
  POSITIONING_PRESETS,
  POSITIONING_QUESTIONS,
  evaluatePositioning,
  type DimensionKey,
  type PositioningAnswers,
} from '../../lib/positioningIcp';

const dimensionKeys = Object.keys(DIMENSIONS) as DimensionKey[];

const pct = (value: number) => Math.max(0, Math.min(100, value));

const scoreTone = (score: number) =>
  score >= 75 ? 'good' : score >= 55 ? 'watch' : score >= 40 ? 'risk' : 'critical';

export const PositioningMatrixTool: React.FC = () => {
  const [answers, setAnswers] = useState<PositioningAnswers>({ ...DEFAULT_POSITIONING_ANSWERS });
  const [copied, setCopied] = useState(false);

  const diagnostic = useMemo(() => evaluatePositioning(answers), [answers]);

  const updateAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(current => ({ ...current, [questionId]: optionIndex }));
  };

  const applyPreset = (preset: keyof typeof POSITIONING_PRESETS) => {
    setAnswers({ ...POSITIONING_PRESETS[preset] });
  };

  const reset = () => setAnswers({ ...DEFAULT_POSITIONING_ANSWERS });

  const copySummary = async () => {
    const summary = [
      'Strategic Positioning & ICP Evaluator v2.0',
      'Strategic fit: ' + diagnostic.strategicFitScore + '/100',
      'Evidence confidence: ' + diagnostic.evidenceConfidence + '/100',
      'Evidence-adjusted readiness: ' + diagnostic.evidenceAdjustedReadiness + '/100',
      'ICP fit: ' + diagnostic.icpFit + '/100',
      'Archetype: ' + diagnostic.archetype.title,
      'Classification: ' + diagnostic.classification,
      'Primary constraint: ' + DIMENSIONS[diagnostic.primaryConstraint].label,
      'Highest-leverage move: ' + diagnostic.highestLeverageMove,
      '',
      'Interpretation: deterministic scoring of self-reported inputs. This is a decision aid, not an externally validated market conclusion.',
    ].join('\n');

    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const groupedQuestions = POSITIONING_QUESTIONS.reduce<Record<string, typeof POSITIONING_QUESTIONS>>((acc, question) => {
    acc[question.group] = [...(acc[question.group] || []), question];
    return acc;
  }, {});

  return (
    <div className="positioning-shell">
      <header className="positioning-hero">
        <div>
          <span className="positioning-overline">Strategy · ICP · Buyer Evidence · Commercial Positioning</span>
          <div className="positioning-title-row">
            <Target className="w-5 h-5" />
            <h2>Strategic Positioning & ICP Evaluator</h2>
          </div>
          <p>
            Diagnose whether the market, buyer, urgency, value proposition, differentiation, adoption path and evidence base
            reinforce one another—or only look strong in isolation.
          </p>
        </div>

        <div className="positioning-hero-actions">
          <div className="positioning-preset-group">
            <span>Scenario presets</span>
            <div>
              <button onClick={() => applyPreset('commodity')}>Commodity</button>
              <button onClick={() => applyPreset('feature')}>Feature-led</button>
              <button onClick={() => applyPreset('validated')}>Validated wedge</button>
            </div>
          </div>

          <div className="positioning-action-row">
            <button onClick={reset} className="positioning-secondary">
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button onClick={copySummary} className="positioning-primary">
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ClipboardCopy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy diagnosis'}
            </button>
          </div>
        </div>
      </header>

      <section className="positioning-score-strip">
        <article>
          <span>Strategic fit</span>
          <strong>{diagnostic.strategicFitScore}</strong>
          <em>Weighted structural fit / 100</em>
        </article>
        <article>
          <span>Evidence confidence</span>
          <strong>{diagnostic.evidenceConfidence}</strong>
          <em>Proof + consistency / 100</em>
        </article>
        <article>
          <span>Evidence-adjusted readiness</span>
          <strong>{diagnostic.evidenceAdjustedReadiness}</strong>
          <em>Fit discounted for weak proof</em>
        </article>
        <article>
          <span>ICP fit</span>
          <strong>{diagnostic.icpFit}</strong>
          <em>ICP + buyer + adoption</em>
        </article>
      </section>

      <div className="positioning-layout">
        <section className="positioning-panel positioning-assessment">
          <div className="positioning-section-head">
            <div>
              <span>01 · Diagnostic assessment</span>
              <h3>Ten questions across the commercial system</h3>
            </div>
            <p>Scores are deterministic for the selected answers. They do not replace market evidence.</p>
          </div>

          {Object.entries(groupedQuestions).map(([group, questions]) => (
            <div key={group} className="positioning-question-group">
              <div className="positioning-group-label">{group}</div>
              <div className="positioning-question-list">
                {questions.map((question) => (
                  <article key={question.id} className="positioning-question-card">
                    <div className="positioning-question-heading">
                      <span>{question.id.toUpperCase()}</span>
                      <h4>{question.label}</h4>
                    </div>
                    <div className="positioning-options">
                      {question.options.map((option, index) => {
                        const selected = answers[question.id] === index;
                        return (
                          <button
                            type="button"
                            key={option.text}
                            className={selected ? 'active' : ''}
                            onClick={() => updateAnswer(question.id, index)}
                          >
                            <i aria-hidden="true">{selected ? '✓' : String(index + 1)}</i>
                            <span>{option.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <aside className="positioning-side">
          <section className="positioning-panel">
            <div className="positioning-section-head compact">
              <div>
                <span>02 · Strategic position</span>
                <h3>{diagnostic.archetype.title}</h3>
              </div>
            </div>

            <div className="positioning-matrix" aria-label="Differentiation versus urgency positioning matrix">
              <div className="positioning-matrix-axis top">High urgency</div>
              <div className="positioning-matrix-axis bottom">Low urgency</div>
              <div className="positioning-matrix-axis left">Low differentiation</div>
              <div className="positioning-matrix-axis right">High differentiation</div>

              <span className="positioning-quadrant q1">Procurement pressure</span>
              <span className="positioning-quadrant q2">Defensible urgent wedge</span>
              <span className="positioning-quadrant q3">Commodity inertia</span>
              <span className="positioning-quadrant q4">Novelty without urgency</span>

              <div className="positioning-crosshair horizontal" />
              <div className="positioning-crosshair vertical" />

              <div
                className="positioning-point"
                style={{
                  left: pct(diagnostic.differentiation) + '%',
                  bottom: pct(diagnostic.urgency) + '%',
                }}
              >
                <Crosshair className="w-4 h-4" />
                <span>You</span>
              </div>
            </div>

            <div className="positioning-archetype-copy">
              <p>{diagnostic.archetype.description}</p>
              <strong>{diagnostic.archetype.implication}</strong>
            </div>
          </section>

          <section className="positioning-panel">
            <div className="positioning-section-head compact">
              <div>
                <span>03 · Executive diagnosis</span>
                <h3>{diagnostic.classification}</h3>
              </div>
              <span className={'positioning-status ' + diagnostic.classificationTone}>
                {diagnostic.plausibleLow}–{diagnostic.plausibleHigh}
              </span>
            </div>

            <p className="positioning-diagnosis">{diagnostic.coreDiagnosis}</p>

            <div className="positioning-confidence-note">
              <ShieldCheck className="w-4 h-4" />
              <div>
                <strong>Uncertainty discipline</strong>
                <p>
                  The {diagnostic.plausibleLow}–{diagnostic.plausibleHigh} range is a heuristic self-assessment range,
                  not a statistical confidence interval. Low evidence widens it.
                </p>
              </div>
            </div>

            {diagnostic.contradictions.length > 0 && (
              <div className="positioning-contradictions">
                <div>
                  <AlertTriangle className="w-4 h-4" />
                  <strong>Consistency checks</strong>
                </div>
                {diagnostic.contradictions.map(item => <p key={item}>{item}</p>)}
              </div>
            )}
          </section>

          <section className="positioning-panel">
            <div className="positioning-section-head compact">
              <div>
                <span>04 · Dimension architecture</span>
                <h3>Where the system is strong—and constrained</h3>
              </div>
            </div>

            <div className="positioning-dimensions">
              {dimensionKeys.map(key => {
                const score = diagnostic.dimensionScores[key];
                return (
                  <div key={key} className="positioning-dimension">
                    <div>
                      <span>{DIMENSIONS[key].label}</span>
                      <strong className={scoreTone(score)}>{score}</strong>
                    </div>
                    <div className="positioning-bar">
                      <i className={scoreTone(score)} style={{ width: pct(score) + '%' }} />
                    </div>
                    <p>{DIMENSIONS[key].diagnostic}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="positioning-panel positioning-action-panel">
            <div className="positioning-section-head compact">
              <div>
                <span>05 · Highest-leverage move</span>
                <h3>{DIMENSIONS[diagnostic.primaryConstraint].label}</h3>
              </div>
              <TrendingUp className="w-5 h-5" />
            </div>

            <p className="positioning-move">{diagnostic.highestLeverageMove}</p>

            <div className="positioning-next-actions">
              {diagnostic.nextActions.map((action, index) => (
                <div key={action}>
                  <span>0{index + 1}</span>
                  <p>{action}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="positioning-panel">
            <div className="positioning-section-head compact">
              <div>
                <span>06 · Evidence agenda</span>
                <h3>What to validate next</h3>
              </div>
              <FlaskConical className="w-5 h-5" />
            </div>

            <div className="positioning-validation-list">
              {diagnostic.whatToValidateNext.map(item => (
                <div key={item}>
                  <CheckCircle2 className="w-4 h-4" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <footer className="positioning-disclaimer">
        <strong>Analytical boundary</strong>
        <span>Self-assessment ≠ market validation</span>
        <span>Distinctiveness ≠ defensibility</span>
        <span>Buyer interest ≠ urgency</span>
        <span>Message clarity ≠ product-market fit</span>
        <span>Evidence quality determines decision confidence</span>
      </footer>
    </div>
  );
};
