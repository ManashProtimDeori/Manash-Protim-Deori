// Mortgage automation suite validation
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  defaultMortgagePolicy,
  defaultOperationsAssumptions,
  evaluateMortgageCase,
  mortgagePayment,
  referenceMortgageCase,
  scenarioCases,
  workflowArchitecture,
} from '../src/lib/mortgageAutomation';

const payment = mortgagePayment(420000, 6.25, 30);
assert.ok(payment > 2500 && payment < 2700, 'mortgage payment should be in a plausible deterministic range');

const base = evaluateMortgageCase(referenceMortgageCase, defaultMortgagePolicy, defaultOperationsAssumptions);
assert.equal(base.route, 'AUTO_CANDIDATE', 'clean reference case should clear the demo workflow gates');
assert.ok(base.dtiPct > 0 && base.ltvPct > 0);
assert.ok(base.automationPotential >= 90);
assert.ok(base.capitalMatches.every(match => match.synthetic === true), 'capital market profiles must stay explicitly synthetic');

const moreDebt = evaluateMortgageCase({...referenceMortgageCase, monthlyDebt: referenceMortgageCase.monthlyDebt + 2000});
assert.ok(moreDebt.dtiPct > base.dtiPct, 'higher monthly debt must increase DTI');

const biggerLoan = evaluateMortgageCase({...referenceMortgageCase, loanAmount: referenceMortgageCase.loanAmount + 50000});
assert.ok(biggerLoan.ltvPct > base.ltvPct, 'larger loan amount must increase LTV');
assert.ok(biggerLoan.monthlyPrincipalInterest > base.monthlyPrincipalInterest, 'larger loan amount must increase payment');

const noConsent = evaluateMortgageCase({...referenceMortgageCase, consentCaptured:false});
assert.equal(noConsent.route, 'BLOCKED', 'missing consent must block automated workflow execution');
assert.ok(noConsent.tasks.some(task => task.id === 'T-CONSENT'));

const noIdentity = evaluateMortgageCase({...referenceMortgageCase, identityVerified:false});
assert.equal(noIdentity.route, 'BLOCKED', 'unverified identity must block straight-through workflow');

const docsGap = evaluateMortgageCase(scenarioCases.docsGap);
assert.notEqual(docsGap.route, 'AUTO_CANDIDATE', 'documentation gap should not be treated as straight-through ready');
assert.ok(docsGap.tasks.some(task => task.id === 'T-DOCS'));

const highDti = evaluateMortgageCase(scenarioCases.highDti);
assert.notEqual(highDti.route, 'AUTO_CANDIDATE');
assert.ok(highDti.rules.some(rule => rule.id === 'dti' && rule.status !== 'PASS'));

const closingGap = evaluateMortgageCase(scenarioCases.closingGap);
assert.ok(closingGap.tasks.some(task => task.id === 'T-APP'));
assert.ok(closingGap.tasks.some(task => task.id === 'T-TITLE'));
assert.ok(closingGap.tasks.some(task => task.id === 'T-INS'));
assert.ok(closingGap.tasks.some(task => task.id === 'T-CD'));

const strictPolicy = evaluateMortgageCase(referenceMortgageCase,{...defaultMortgagePolicy,maxDtiPct:20});
assert.notEqual(strictPolicy.route,'AUTO_CANDIDATE','policy changes must dynamically change routing');

assert.equal(workflowArchitecture.length, 10, 'architecture should cover ten end-to-end mortgage workflow layers');

const forbiddenKeys = ['race','ethnicity','religion','sex','gender','disability','maritalStatus','nationalOrigin'];
const caseKeys = Object.keys(referenceMortgageCase);
for (const key of forbiddenKeys) assert.ok(!caseKeys.includes(key), 'protected attribute must not be modeled: '+key);

const enginePath = fileURLToPath(new URL('../src/lib/mortgageAutomation.ts', import.meta.url));
const engineSource = readFileSync(enginePath,'utf8');
assert.ok(engineSource.includes('does not issue a lending decision'));
assert.ok(engineSource.includes('never produces an automatic accusation'));
assert.ok(engineSource.includes('Exceptions are never auto-cleared'));

const componentPath = fileURLToPath(new URL('../src/components/tools/mortgage/MortgageAutomationOS.tsx', import.meta.url));
const componentSource = readFileSync(componentPath,'utf8');
for (const moduleName of ['Command Center','Architecture','Intake & Documents','Product Fit','Underwriting Graph','Exception Router','Borrower Orchestration','Pricing & Payment','Compliance','Closing','Capital Markets','Audit & Governance','Scenario Twin']) {
  assert.ok(componentSource.includes(moduleName), 'missing mortgage automation module: '+moduleName);
}
assert.ok(componentSource.includes('Automate the file, not the judgment'));
assert.ok(componentSource.includes('No protected-class attributes'));

const toolsPath = fileURLToPath(new URL('../src/data/tools.ts', import.meta.url));
const toolsSource = readFileSync(toolsPath,'utf8');
for (const slug of ['mortgage-manufacturing-automation-os','underwriting-decision-exception-router','mortgage-compliance-closing-control-tower']) {
  assert.ok(toolsSource.includes("slug: '"+slug+"'"), 'missing tool catalog entry: '+slug);
}

const toolsPagePath = fileURLToPath(new URL('../src/pages/ToolsPage.tsx', import.meta.url));
const toolsPageSource = readFileSync(toolsPagePath,'utf8');
assert.ok(toolsPageSource.includes('MortgageAutomationOS'));
assert.ok(toolsPageSource.includes('defaultView="Underwriting Graph"'));
assert.ok(toolsPageSource.includes('defaultView="Compliance"'));

const detailPath = fileURLToPath(new URL('../src/pages/ToolDetailPage.tsx', import.meta.url));
const detailSource = readFileSync(detailPath,'utf8');
assert.ok(detailSource.includes('MortgageAutomationOS'));

const contextPath = fileURLToPath(new URL('../src/context/DataContext.tsx', import.meta.url));
const contextSource = readFileSync(contextPath,'utf8');
assert.ok(contextSource.includes("tool.id === 'tool-9' || tool.id === 'tool-10' || tool.id === 'tool-11'"));

console.log('Mortgage automation quality checks passed', {
  baseRoute: base.route,
  automationPotential: base.automationPotential,
  architectureLayers: workflowArchitecture.length,
  specialistTools: 3,
});
