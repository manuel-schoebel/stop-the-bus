Template.home.events({
  'click .create-game': function(evt, tpl){
    Meteor.call('createGame', function(err, gameId){
      if(err){ return alert(err.reason);}

      Router.go('gameDetail', {_id: gameId});
    });
  }
})
