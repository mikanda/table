function init() {
  var Table = require('table');
  var model = require('component-model');
  var classes = require('component-classes');
  var dialog = require('mikanda-bootstrap-dialog');
  var event = require('component-event');
  var domify = require('component-domify');
  var modelEditDialog = require('mikanda-model-edit-dialog');

  var renderer = [];
  renderer.push('<span data-text="id"></span>');
  renderer.push('<span data-text="{title} {forename} {surname}"></span>');
  renderer.push('<span data-text="birthdate | date:\'%Y-%m-%d\'"></span>');
  renderer.push('<span class="btn btn-small" on-click="buttonClick">edit</span>');
  renderer.push('<a data-text="email" data-href="mailto:{email}?Subject=Hallo {surname}"></a>');
  
  var scope = {
    date: function (date, format) {
      date = new Date(date);
      return format
              .replace('%Y', date.getFullYear())
              .replace('%m', date.getMonth())
              .replace('%d', date.getDate());
    },
    buttonClick: function (e) {
      var formschema = {
        title: {
          title: "Title",
          type: "String"
        },
        forename: {
          title: "Forename",
          type: "String"
        },
        surname: {
          title: "Surname",
          type: "String"
        },
        email: {
          title: "Email",
          type: "String"
        }
      };
      modelEditDialog(this.model, formschema, {title: 'change row'});
    }
  };
  
  var head = [];
  head.push('Id');
  head.push('Name');
  head.push('Birthday');
  head.push('static');
  head.push({
    name: 'email',
    sortable: true,
    groupable: true
  });
  
  
  var User = model('User')
              .attr('id')
              .attr('title')
              .attr('forename')
              .attr('surname')
              .attr('birthdate')
              .attr('email');
  User.all(function (err, collection) {
    var table = new Table(collection, renderer, scope, head);
    classes(table.el)
      .add('table')
      .add('table-condensed')
      .add('table-striped');
    document.body.appendChild(table.el);
  });
};