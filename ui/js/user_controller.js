app.controller('UserController',['$scope','$mdDialog','$http','$cookies','$state','$rootScope',function($scope,$mdDialog,$http,$cookies,$state,$rootScope){
  //User login function
  $rootScope.userinfo = {};
  $scope.regStatus = false;
  $scope.lStatus = false;
  $scope.loginStatus = "Login failed!"
  $scope.logout = function()
  {
    localStorage.clear();
    $scope.isloggedin = false;
  }
  $scope.login = function(user)
  {
    $rootScope.showLinear = true;
    $http.post('/api/v1/login',JSON.stringify(user)).then(function success(data){
      if(data.data.data.login){
        localStorage.setItem("email",data.data.data.token)
        $rootScope.userinfo.name = data.data.data.name;
        $rootScope.userinfo.email = data.data.data.token;
        $mdDialog.cancel();
      }else{
        $scope.loginStatus=data.data.data.message;
        $scope.lStatus = true;
      }
      $rootScope.showLinear = false;
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
