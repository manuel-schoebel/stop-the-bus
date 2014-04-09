Template.gameDetail.events({
  'click .join-game': function(evt, tpl){
    Meteor.call('joinGame', this.game._id, function(err){
      if(err){
        alert(err.reason);
      }
    });
  }
})
