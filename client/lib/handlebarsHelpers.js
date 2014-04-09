Handlebars.registerHelper('username', function(){
  return Meteor.user().username;
});
