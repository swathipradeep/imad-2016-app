app.controller('ArticleController',['$scope','$http','$mdDialog','$state','$stateParams',function($scope,$http,$mdDialog,$state,$stateParams){
  $scope.name= [];
  console.log($scope);
  $scope.articles = [];
  $scope.commentList = [];
  $scope.loaddata = function()
  {
    $http.get("/api/v1/article").then(function success(data){
      $scope.articles = data.data.data.articles;
      $scope.name.push("Hello");
      console.log($scope);
      console.log($scope.name);
    }, function error(){

    });
  }
  if($state.current.name == "home"){
    $scope.loaddata();
  }
  //
  $scope.a_id = null;
  if($state.current.name == "readArticle"){
    $scope.a_id = $stateParams.id;
    $http.get("/api/v1/article/"+$scope.a_id).then(function success(data){
      $scope.result = data.data.data.articles[0];
      console.log($scope.result);
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
      $state.go("home");
    }, function error(){

    });
  }
  $scope.newArticle = function() {
      $state.go('newArticle');
  };

}]);
