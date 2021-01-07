'use strict';

const eejs = require('ep_etherpad-lite/node/eejs/');
const Changeset = require('ep_etherpad-lite/static/js/Changeset');

const getInlineStyle = (header) => {
  switch (header) {
    case 'h1':
      return 'font-size: 2.0em;line-height: 120%;';
      break;
    case 'h2':
      return 'font-size: 1.5em;line-height: 120%;';
      break;
    case 'h3':
      return 'font-size: 1.17em;line-height: 120%;';
      break;
    case 'h4':
      return 'line-height: 120%;';
      break;
    case 'h5':
      return 'font-size: 0.83em;line-height: 120%;';
      break;
    case 'h6':
      return 'font-size: 0.75em;line-height: 120%;';
      break;
    case 'code':
      return 'font-family: monospace';
  }

  return '';
}
// line, apool,attribLine,text
exports.getLineHTMLForExport = async (hook, context) => {
  const header = _analyzeLine(context.attribLine, context.apool);
  if (header) {
    const inlineStyle = getInlineStyle(header);
    if (context.lineContent[0] === '*') {
      context.lineContent = context.lineContent.substring(1);
    }
    context.lineContent = `<${header} style="${inlineStyle}">${context.lineContent}</${header}>`;
  }
  return context.lineContent;
};

const _analyzeLine = (alineAttrs, apool) => {
  let header = null;
  if (alineAttrs) {
    const opIter = Changeset.opIterator(alineAttrs);
    if (opIter.hasNext()) {
      const op = opIter.next();
      header = Changeset.opAttributeValue(op, 'heading', apool);
    }
  }
  return header;
}
