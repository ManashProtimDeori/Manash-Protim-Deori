import { useEffect } from 'react';
import { stripTerminalPeriod } from '../../utils/headline';

const BOLD_SELECTOR = [
  'strong',
  'b',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  '[class~="font-bold"]',
  '[class~="font-semibold"]',
].join(',');

function cleanElement(element: Element) {
  if (element.closest('code, pre, textarea, input, [contenteditable="true"]')) return;

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let lastTextNode: Text | null = null;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.nodeValue?.trim()) lastTextNode = node;
  }

  if (!lastTextNode?.nodeValue) return;

  const original = lastTextNode.nodeValue;
  const trailingWhitespace = original.match(/\s*$/)?.[0] ?? '';
  const core = original.slice(0, original.length - trailingWhitespace.length);
  const normalized = stripTerminalPeriod(core);

  if (normalized !== core) {
    lastTextNode.nodeValue = normalized + trailingWhitespace;
  }
}

function cleanRoot(root: ParentNode) {
  if (root instanceof Element && root.matches(BOLD_SELECTOR)) cleanElement(root);
  root.querySelectorAll?.(BOLD_SELECTOR).forEach(cleanElement);
}

export const BoldPunctuationCleaner = () => {
  useEffect(() => {
    cleanRoot(document);

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') {
          const parent = mutation.target.parentElement?.closest(BOLD_SELECTOR);
          if (parent) cleanElement(parent);
          continue;
        }

        mutation.addedNodes.forEach(node => {
          if (node instanceof Element) cleanRoot(node);
          else if (node.parentElement) {
            const parent = node.parentElement.closest(BOLD_SELECTOR);
            if (parent) cleanElement(parent);
          }
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
};
