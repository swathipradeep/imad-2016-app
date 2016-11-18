app.controller('UserController',['$scope','$mdDialog','$http','$cookies','$state',function($scope,$mdDialog,$http,$cookies,$state){
  //User login function
  $scope.logout = function()
  {
    $cookies.remove('token');
    $scope.isloggedin = false;
  }
  $scope.login = function(user)
  {
    $http.post('/api/v1/login',JSON.stringify(user)).then(function success(data){

      $cookies.put('token',data.data.data.token);
      $scope.isloggedin = true;
      //$mdDialog.cancel();
    },function error(data){
      console.log(data);
    });

  }

  //User registration function
  $scope.register = function(user)
  {
    $http.post('/api/v1/register',JSON.stringify(user)).then(function success(data){
      console.log(data);
    },function error(data){
      console.log(data);
    });
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
  $scope.gotoHome = function()
  {
    $state.go('home');
  }
}]);
