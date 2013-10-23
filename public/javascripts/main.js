angular.module('MyModule', ['ngResource']).

factory('User', function($resource) {
  return $resource('/users/:id');
}).

factory('Post', function($resource) {
  return $resource('/posts/:id');
}).

factory('Like', function($resource) {
  return $resource('/likes/:id');
}).

controller('MyController', function($scope, User, Post, Like) {
  $scope.myself = User.get({
    id: 'myself'
  });
  $scope.userinfo = {};
  $scope.ensureUserinfo = function(user_id) {
    if ($scope.userinfo[user_id]) return;
    $scope.userinfo[user_id] = User.get({
      id: user_id
    });
  };

  $scope.likecount = {};

  Post.query(function(data) {
    $scope.posts = data;

    var queries = _.map(data, function(post) {
      return {
        post_id: post._id
      };
    });
    Like.query({
      id: 'count',
      query: JSON.stringify(queries)
    }, function(results) {
      for (var i = 0; i < data.length; i++) {
        $scope.likecount[data[i]._id] = results[i];
      }
    });
  });

  $scope.postNewPost = function() {
    if (!$scope.newMessage) return;
    Post.save({
      message: $scope.newMessage
    }, function() {
      $scope.posts = Post.query();
    });
    $scope.newMessage = null;
  };

  $scope.addLikecount = function(post_id) {
    Like.save({
      post_id: post_id
    }, function() {
      $scope.likecount[post_id].count = '...';
      Like.get({
        id: 'count',
        query: JSON.stringify({
          post_id: post_id
        })
      },

      function(data) {
        $scope.likecount[post_id] = data;
      });
    });
  };

});
