app.controller('UserController',['$scope','$mdDialog','$http','$cookies','$state','$rootScope',function($scope,$mdDialog,$http,$cookies,$state,$rootScope){
  //User login function
  $scope.userinfo = {};
  $scope.regStatus = false;
  $scope.logout = function()
  {
    $cookies.remove('token');
    $scope.isloggedin = false;
  }
  $scope.login = function(user)
  {
    $rootScope.showLinear = true;
    $http.post('/api/v1/login',JSON.stringify(user)).then(function success(data){
      $cookies.put('token',data.data.data.token);
      $rootScope.userinfo = data.data.data.info;
      $rootScope.showLinear = false;
      $mdDialog.cancel();
    },function error(data){
      console.log(data);
    });

  }

  //User registration function
  $scope.register = function(user)
  {
    $scope.registrationStatus = "";
    $http.post('/api/v1/register',JSON.stringify(user)).then(function success(data){
      if(data.data.data.register){
        $scope.registrationStatus = "Registration success";
        $scope.regStatus = true;
      }else{
        $scope.registrationStatus = "Registration failed";
      }
    },function error(data){
      console.log(data);
    });
  }

  $scope.gotoHome = function()
  {
    $state.go('app.home');
  }
}]);
