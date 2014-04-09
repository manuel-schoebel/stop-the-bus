Router.map(function(){
  this.route('home', {
    path: '/'
  }),
  this.route('imprint'),
  this.route('gameDetail', {
    path: '/:_id',
    data: function(){
      return {
        game: Games.findOne({_id: this.params._id})
        
      }
    }
  })
});
