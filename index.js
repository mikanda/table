var template = require('./template'),
    query = require('query'),
    domify = require('domify'),
    domTable = require('dom-table');
    reactiveTable = require('reactive-table');

function Table (collection, renderer, scope, head) {
  this.el = domify(template)[0];
  this.headEl = query('thead', this.el);
  this.bodyEl = query('tbody', this.el);
  this.reactiveTable = reactiveTable(collection, this.bodyEl, renderer, scope);
  this.setHead(head);
  return this;
};
Table.prototype.setHead = function (head) {
  var rowEl,
      cellEl,
      i;
  this.head = head;

  domTable(this.headEl);
  this.headEl.removeAllRows();
  rowEl = this.headEl.addRow();
  for (i in head) {
    if (!head.hasOwnProperty(i))
      continue;
    rowEl.addCell(head[i].name || head[i]);
  }
  return this;
};

module.exports = function (collection, renderer, scope, head) {  
  return new Table(collection, renderer, scope, head);
};