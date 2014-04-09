Games = new Meteor.Collection('games');

Meteor.methods({
  'createGame': function(){
    if(!Meteor.userId()){
      throw new Meteor.Error(403, 'Your have to login');
    }

    gameId = Games.insert({owner: Meteor.userId()});
    return gameId;
  },
  joinGame: function(gameId){
    if(!Meteor.userId()){
      throw new Meteor.Error(403, 'You have to login');
    }

    game = Games.findOne({_id: gameId});

    if(_.isUndefined(game)){
      throw new Meteor.Error(404, 'Game not found');
    }

    Meteor.users.update({_id: Meteor.userId()}, {$set: {points: 0}});

    Games.update({_id: gameId}, {$push: {players: Meteor.userId()}});
  }
})
