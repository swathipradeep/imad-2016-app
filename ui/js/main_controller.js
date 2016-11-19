app.controller('MainController',['$scope','$http','$mdDialog','$state','AppServices','$rootScope','$mdSidenav',function($scope,$http,$mdDialog,$state,AppServices,$rootScope,$mdSidenav){
  //console.log(AppServices.loggedin);
  $rootScope.showLinear = false;
  $scope.openSideNavigation = function()
  {
    $mdSidenav('left').open()
    .then(function(){
    });
  }
  $scope.loggedIn = function()
  {
    return AppServices.isLoggedIn();
  }
  $scope.readArticle = function()
  {
    $http.get("/api/v1/article/1").then(function success(data){
    }, function error(){

    });
  }
  $scope.readAboutMe = function()
  {

  }
  //Tab dialog open for login and registration
  $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      templateUrl: 'templates/tabDialogLogin.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
  };
}]);
