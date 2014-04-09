Games = new Meteor.Collection('games');

Meteor.methods({
  'createGame': function(){
    if(!Meteor.userId()){
      throw new Meteor.Error(403, 'Your have to login');
    }

    gameId = Games.insert({owner: Meteor.userId()});
    return gameId;
  }
})
