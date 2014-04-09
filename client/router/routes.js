Router.map(function(){
  this.route('home', {
    path: '/'
  }),
  this.route('imprint'),
  this.route('gameDetail', {
    path: '/:_id',
    onBeforeAction: function(pause){
      this.subscribe('game', this.params._id).wait();
      if(!this.ready()) return pause();
      game = Games.findOne({_id: this.params._id});
      if(game && _.isArray(game.players)){
        this.subscribe('userById', game.players).wait();
        if(!this.ready()) return pause();
      }
    },
    data: function(){
      game = Games.findOne({_id: this.params._id});
      if(!game){ return null; }

      player = []
      if(_.isArray(game.players)){
        player = Meteor.users.find({_id: {$in: game.players}});
      }

      return {
        game: game,
        player: player
      }
    }
  })
});
