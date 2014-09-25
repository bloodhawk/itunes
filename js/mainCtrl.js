var app = angular.module('itunes');

app.controller('mainCtrl', function ($scope, $window, itunesService) {
    $scope.sortBy = '';
    $scope.gridOptions = {
        data: 'songData',
        height: '110px',
        sortInfo: {
            fields: ['Song', 'Artist', 'Collection', 'Type'],
            directions: ['asc']
        },
        columnDefs: [{
            field: 'Play',
            displayName: 'Play',
            width: '40px',
            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'
        }, {
            field: 'Artist',
            displayName: 'Artist'
        }, {
            field: 'Collection',
            displayName: 'Collection'
        }, {
            field: 'AlbumArt',
            displayName: 'Album Art',
            width: '110px',
            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'
        }, {
            field: 'Type',
            displayName: 'Type'
        }, {
            field: 'CollectionPrice',
            displayName: 'Collection Price'
        }, ]
    };
    var songData = [];
    var sortData = function (itunesData) {
        songData = [];
        for (var i = 0; i < itunesData.length; i++) {
            obj = {};
            obj.AlbumArt = itunesData[i].artworkUrl100;
            obj.Artist = itunesData[i].artistName;
            obj.Collection = itunesData[i].collectionName;
            obj.CollectionPrice = itunesData[i].collectionPrice;
            obj.Play = itunesData[i].previewUrl;
            obj.Type = itunesData[i].kind;
            songData.push(obj);
        }
        return songData;
    };

    $scope.getSongData = function () {
        itunesService.getData($scope.artist, $scope.sortBy).then(function (itunesData) {
            $scope.songData = sortData(itunesData);
        });
    };
    $scope.songData = [];
    $scope.getTableStyle= function() {
       var rowHeight=110;
       var headerHeight=300;
       if($scope.songData.length > 5) {
         return {
            height: ($scope.songData.length * rowHeight + headerHeight) + "px"
          };
       } else {
         return {
            height: ($window.innerHeight - 57)
         };
       }
    };
});