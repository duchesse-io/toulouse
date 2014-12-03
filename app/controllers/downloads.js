var downloads = angular.module('toulouse.downloads', [
]);

downloads.controller('DownloadsCtrl', ['$scope', '$torrent', function($scope, $torrent){

  // List all downloads
  $scope.downloads = null;
  $torrent.downloads().then(function(downloads){
    $scope.downloads = downloads.movies;
  });

}]);
