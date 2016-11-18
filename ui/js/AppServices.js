app.factory('AppServices',['$http',function($http){
  var vm = this;
  vm.isLoggedIn = isLoggedIn;
  return vm;
  function isLoggedIn()
  {
    return $http.get('/api/v1/verifyuser').then(function success(data){
      return data;
    });
  };
}]);
