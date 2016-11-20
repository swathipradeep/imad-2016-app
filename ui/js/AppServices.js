app.factory('AppServices',['$http','$cookies',function($http,$cookies){
  var vm = this;
  vm.isLoggedIn = isLoggedIn;
  // vm.userInfo = userInfo;
  return vm;
  function isLoggedIn()
  {
    // return $http.get('/api/v1/verifyuser').then(function success(data){
    //   return data;
    // });
    if(localStorage.getItem('email')){
      return true;
    }else{
      return false;
    }
  };
}]);
