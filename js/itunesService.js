var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
	this.getData = function(artist){
		var defer = $q.defer()
		$http.jsonp('https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK')
			.then(function(data){
				var itunesData = data.data.results;
				defer.resolve(itunesData);
			});
		return defer.promise;
	};
});