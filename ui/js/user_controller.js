app.controller('UserController',['$scope','$mdDialog','$http',function($scope,$mdDialog,$http){
  //User login function
  $scope.login = function(user)
  {
    $http.post('/api/v1/login',JSON.stringify(user)).then(function success(data){
      console.log(data);
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
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };
}]);
