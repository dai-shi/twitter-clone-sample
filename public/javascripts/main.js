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
  $scope.myself = User.get({id: 'myself'});
  $scope.userinfo = {};
  $scope.ensureUserinfo = function(user_id) {
    if ($scope.userinfo[user_id]) return;
    $scope.userinfo[user_id] = User.get({id: user_id});
  };

  $scope.posts = Post.query();
  $scope.postNewPost = function() {
    if (!$scope.newMessage) return;
    Post.save({message: $scope.newMessage}, function() {
      $scope.posts = Post.query();
    });
    $scope.newMessage = null;
  };

  $scope.likecount = {};
  $scope.ensureLikecount = function(post_id, refresh) {
    if ($scope.likecount[post_id] && !refresh) return;
    $scope.likecount[post_id] = Like.get({id: 'count',
      query: JSON.stringify({post_id: post_id})});
  };
  $scope.addLikecount = function(post_id) {
    Like.save({post_id: post_id}, function() {
      $scope.ensureLikecount(post_id, true);
      $scope.likecount[post_id].count = '...';
    });
  };

});
