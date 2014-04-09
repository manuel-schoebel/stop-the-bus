Meteor.publish('userById', function(id){
  if(_.isArray(id)){
    return Meteor.users.find(
      {
        _id: {$in: id}
      },
      {
        fields: {
          points: 1,
          username: 1
        }
      }
    )
  }

});
