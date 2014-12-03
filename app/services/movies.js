var movies = angular.module('toulouse.movies', [

]);

movies.service('$movies', ['$http', '$q', function($http, $q){

  var api_key = '52dda17c8cf0bbc2451f9cde1fea0913';
  var api_url = 'http://api.themoviedb.org/3/';

  //https://gist.github.com/jaf0/e919cc780848811ec480
  var qs = function(obj, prefix){
    var str = [];
    for (var p in obj) {
      var k = prefix ? prefix + "[" + p + "]" : p,
      v = obj[p];
      str.push(angular.isObject(v) ? qs(v, k) : (k) + "=" + encodeURIComponent(v));
    }
    return str.join("&");
  }

  var rest = function(url, args){
    var deferred = $q.defer();
    var data = {
      api_key : api_key,
    };
    if(args){
      angular.forEach(args, function(v, k){
        data[k] = v;
      });
    }
    url += '?' + qs(data);

    $http.get(url).then(function(resp){
      // Invalid status code
      if(resp.status != 200)
        return deferred.reject(resp);

      // Any results ?
      if(resp.data.results && resp.data.total_results == 0)
        return deferred.reject(resp);

      // Send back received data
      return deferred.resolve(resp.data);
    });
    return deferred.promise;
  }

  return {

    // Get popular movies
    popular : function(){
      return rest(api_url + 'movie/popular');
    },

    // Search movies by name
    search : function(query){
      return rest(api_url + 'search/movie', { query : query, });
    },

    // Get a movie
    get : function(movie_id){
      return rest(api_url + 'movie/' + movie_id);
    },

    // Get popular movies
    similar : function(movie_id){
      return rest(api_url + 'movie/' + movie_id + '/similar');
    },

    // List actors
    actors : function(movie_id){
      return rest(api_url + 'movie/' + movie_id + '/credits');
    },

    // Get actor details
    actor : function(actor_id){
      return rest(api_url + 'person/' + actor_id);
    },

    // Get actor movies
    actor_movies : function(actor_id){
      return rest(api_url + 'person/' + actor_id + '/movie_credits');
    },
  };


}]);
