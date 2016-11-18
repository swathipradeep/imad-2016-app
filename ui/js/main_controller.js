app.controller('MainController',['$scope','$http','$mdDialog','$state','AppServices',function($scope,$http,$mdDialog,$state,AppServices){
  //console.log(AppServices.loggedin);
  $scope.isloggedin = AppServices.isLoggedIn().then(function scb(data){
    $scope.isloggedin = data.data.data.loggedin;
  },function ecb(data){

  });
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
