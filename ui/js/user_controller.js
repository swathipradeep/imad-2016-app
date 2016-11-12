app.controller('UserController',['$scope','$mdDialog','$http',function($scope,$mdDialog,$http){
  //User login function
  $scope.login = function()
  {

  }
  //User registration function
  $scope.login = function()
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
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };
}]);
