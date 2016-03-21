'use strict';

angular.module('acholic')
  .controller('PackageDetailCtrl',['$scope','itemData','$rootScope','Comment','PackageGallery',function ($scope , itemData, $rootScope, Comment,PackageGallery) {

    $(window).scroll(function(){
      $scope.sticky_relocate();  
    });
    
  	$scope.packageItem = itemData;
    $scope.comment = new Comment;
    $scope.comment.user_id = $rootScope._user._id;
    $scope.comment.package_id = $scope.packageItem._id;
    $scope.imageGallery = [];
  	console.log($scope.packageItem);
  	$scope.comment.rate = 0;
   
    if($scope.packageItem.map_id.map_id.image_gallery){
      PackageGallery.query({id: $scope.packageItem.map_id.map_id.image_gallery}).$promise.then(function(res){
        $scope.imageGallery = res;
      });
    }

    Comment.query({package_id: $scope.packageItem._id}).$promise.then(function(res){
        $scope.comments = res;
    });

  $scope.rate = 0;
  $scope.getStar = function(num) {
    if(num == null){
      $scope.rate = 0;
    }
    else{     
      $scope.rate = num;
    }
    return new Array(Math.floor($scope.rate));   
  };

	$scope.Math = window.Math;
    $scope.yStar = 0;

  $scope.getWhite = function(val){
    if(val == null){
      $scope.yStar = 0;
    }
    else{
      $scope.yStar = Math.round(val);
    }
    return new Array(5-$scope.yStar);
  };

  $scope.packageInfos = $scope.packageItem.map_id.map_id.info;
  $scope.equipmentProvides = $scope.packageItem.map_id.map_id.equipments_provide;
  $scope.equipmentRequires = $scope.packageItem.map_id.map_id.equipments_require;
  $scope.skillRequires = $scope.packageItem.map_id.map_id.skills_require;
  $scope.stageTypes = $scope.packageItem.map_id.map_id.stage_type;
  $scope.activities = $scope.packageItem.map_id.map_id.activities;

  $("#input-id").rating({min:0, max:5, step:0.5, size:'md'});

  $('#input-id').on('rating.change', function(event, value, caption) {
    $scope.comment.rate = value;
    console.log("Comment rate = "+value);
  });

  $scope.postComment = function(){
    $scope.comment.$save().then(function(res){
      $scope.comments.push(res);

      location.reload();
    });
  };

  $scope.getCommonDate = function(cdate){
    var d = new Date(cdate);
    var comdate = d.toDateString();

    return comdate;
  };
  $scope.sticky_relocate = function() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#sticky').addClass('stick');
        $('#sticky-anchor').height($('#sticky').outerHeight());
    } else {
        $('#sticky').removeClass('stick');
        $('#sticky-anchor').height(0);
    }
  };

  $scope.openGallery = function(){
    
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var items = [];

    if($scope.imageGallery.images != null){
      for (var i = 0; i < $scope.imageGallery.images.length; i++) {
        var img_id = $scope.imageGallery.images[i];
        items.push({
          src : 'api/images/'+img_id,
          w : 600,
          h : 400
        });
      };

      console.log(items);

      var options = {
          // optionName: 'option value'
          // for example:
          index: 0 // start at first slide
      };

      // Initializes and opens PhotoSwipe
      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    }
  };
  
  }]);

