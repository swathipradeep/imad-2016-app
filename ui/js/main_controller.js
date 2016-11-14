app.controller('MainController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog){
  $scope.name = "vishnu";
  getArticles();
  $scope.articles = [
    {name:'Article One',id:'1',url:'articleOne'},
    {name:'Article Two',id:'2',url:'articleTwo'},
    {name:'Article Three',id:'3',url:'articleThree'}
  ];
  $scope.readArticle = function()
  {
    $http.get("/api/v1/article/1").then(function success(data){
      console.log(data);
    }, function error(){

    });
  }
  $scope.postComment = function()
  {

  }
  $scope.readAboutMe = function()
  {

  }
  $scope.saveArticle = function(article)
  {
    $http.post("/api/v1/article",JSON.stringify(article)).then(function success(data){
      console.log(data);
      getArticles();
    }, function error(){

    });
  }
  function getArticles()
  {
    $http.get("/api/v1/article").then(function success(data){
      $scope.articles = data.data.data.articles;
    }, function error(){

    });
  }
  $scope.newArticleDialog = function(ev) {
    $mdDialog.show({
      templateUrl: 'templates/newArticle.html',
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
