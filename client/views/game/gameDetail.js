Template.gameDetail.created = function(){
  var gameId = this.data.game._id;
  console.log('gameId', gameId);

  Deps.autorun(function(c){
    var game = Games.findOne({_id: gameId}, {fields: {state: 1, answers: 1}});
    console.log('game.state', game.state);

    if(game.state === 1){
      userAnswered = _.pluck(game.answers, 'owner')
      console.log('already answered?', _.indexOf(userAnswered, Meteor.userId()));
      // maybe user was the first one to answer
      if(_.indexOf(userAnswered, Meteor.userId()) < 0){
        answers = {
          city: $('input[name="city"]').val(),
          country: $('input[name="country"]').val(),
          river: $('input[name="river"]').val(),
          animal: $('input[name="animal"]').val(),
        };
        Meteor.call('addAnswers', gameId, answers, function(err){
          if(err){
            alert(err.reason);
          }
        })
      }
      // stop to autorun if game state changes
      c.stop();
    }
  });
};

Template.gameDetail.events({
  'click .join-game': function(evt, tpl){
    Meteor.call('joinGame', this.game._id, function(err){
      if(err){
        alert(err.reason);
      }
    });
  },
  'submit form': function(evt, tpl){
    evt.preventDefault();
    answers = {
      city: $('input[name="city"]').val(),
      country: $('input[name="country"]').val(),
      river: $('input[name="river"]').val(),
      animal: $('input[name="animal"]').val(),
    };
    Meteor.call('endGame', this.game._id, answers, function(err){
      if(err){
        alert(err.reason);
      }
    });
  }
})

Template.gameDetail.helpers({
  disabled: function(){
    if(this.game.state === 1){
      return 'disabled'
    }
  },
  gameOver: function(){
    return (this.game.state === 1);
  }
})

Template.answerTableRow.helpers({
  answer: function(key) {
    return this.answers[key];
  },
  playerName: function() {
    return Meteor.users.findOne({_id: this.owner}).username;
  }
})
