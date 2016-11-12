app.controller('MainController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog){
  $scope.name = "vishnu";
  $scope.articles = [
    {name:'Article One',id:'1',url:'articleOne'},
    {name:'Article Two',id:'2',url:'articleTwo'},
    {name:'Article Three',id:'3',url:'articleThree'}
  ];
  $scope.readArticle = function()
  {
    $http.get("/api/v1/article/1").then(function success(data){
      console.log(data);
    }, function error(){

    });
  }
  $scope.postComment = function()
  {

  }
  $scope.readAboutMe = function()
  {

  }
}]);
