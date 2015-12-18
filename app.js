var app = angular.module('flapperNews', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			})
			.state('posts', {
				url: '/posts/:id',
				templateUrl: '/posts.html',
				controller: 'PostCtrl'
			});

		$urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}]);

app.controller('MainCtrl', [
	'$scope',
	'posts',
	function($scope, posts){
		$scope.test = 'Hello World!';
		$scope.posts = posts.posts;
		
	$scope.addPost = function(){
		if(!$scope.title || $scope.title === ''){return;}
		$scope.posts.push({
			title: $scope.title,
			link: $scope.link,
			upvotes: 0,
			comments: [
				{author: 'Joe', body: 'Cool post!', upvotes: 1},
				{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
			]
		});
		$scope.title = '';
		$scope.link = '';
	};
	
	$scope.incrementalUpvotes = function(post) {
		console.log('h');
		post.upvotes += 1;
	};
}]);

app.controller('PostCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){
		$scope.post = posts.posts[$stateParams.id];
		console.log($scope.post);

	$scope.addComment = function() {
		if($scope.body === '') {return;}
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = '';
	};
	
	$scope.incrementalUpvotes = function(comment) {
		comment.upvotes += 1;
	};	

}]);
