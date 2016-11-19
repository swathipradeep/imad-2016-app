app.controller('ArticleController',['$scope','$http','$mdDialog','$state','$stateParams','AppServices',function($scope,$http,$mdDialog,$state,$stateParams,AppServices){
  $scope.name= [];
  $scope.articles = [];
  $scope.commentList = [];
  // AppServices.isLoggedIn().then(function scb(data){
  //   $scope.isloggedin = data.data.data.loggedin;
  // },function ecb(data){
  //
  // });
  $scope.loaddata = function()
  {
    $http.get("/api/v1/article").then(function success(data){
      $scope.articles = data.data.data.articles;
    }, function error(){

    });
  }
  if($state.current.name == "app.home"){
    $scope.loaddata();
  }
  //
  $scope.a_id = null;
  if($state.current.name == "app.readArticle"){
    $scope.a_id = $stateParams.id;
    $http.get("/api/v1/article/"+$scope.a_id).then(function success(data){
      $scope.result = data.data.data.articles[0];
      $scope.commentList = data.data.data.comments;
      $scope.title = $scope.result.title;
      $scope.content = $scope.result.content;
    }, function error(){

    });
  }
  //Add comment
  $scope.addComment = function()
  {
    $http.post("/api/v1/article/comment",JSON.stringify({'comment':$scope.comment,'article_id':$scope.a_id})).then(function success(data){
      $scope.result = data.data.data;
      $scope.cmt = {"comment":$scope.comment};
      $scope.commentList.push($scope.cmt);
    }, function error(){

    });
  }
  $scope.saveArticle = function(article)
  {
    $http.post("/api/v1/article",JSON.stringify(article)).then(function success(data){
      $scope.loaddata();
      $state.go("app.home");
    }, function error(){

    });
  }
  $scope.newArticle = function() {
      $state.go('app.newArticle');
  };

}]);
