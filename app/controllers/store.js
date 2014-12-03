var store = angular.module('toulouse.store', [
  'toulouse.storage',
]);

store.controller('StoreCtrl', ['$scope', '$storage', function($scope, $storage){

  // List all captures
  $scope.captures = $storage.list();
}]);
