app.controller('MainController',['$scope','$http','$mdDialog','$state',function($scope,$http,$mdDialog,$state){
  $scope.readArticle = function()
  {
    $http.get("/api/v1/article/1").then(function success(data){
      console.log(data);
    }, function error(){

    });
  }
  $scope.readAboutMe = function()
  {

  }
}]);
