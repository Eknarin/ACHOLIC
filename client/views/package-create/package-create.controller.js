'use strict';

angular.module('acholic')
  .controller('PackageCreateCtrl',['$scope','PackageItem','$location','tagData',function ($scope , PackageItem , $location , tagData) {
    $scope.tags = tagData;
  	$scope.packageItem = new PackageItem;
  	$scope.images = [];
  
  	$scope.onSubmit = function(){
  		//console.log($scope.packageItem);
  		$scope.packageItem.$save().then(function(){
  			 $location.path("/package");
  		});
  	};

     $scope.tabs = ["active", "", "", ""];
      $scope.activeTab = function(goto){
        $scope.tabs = ["", "", "", ""];
        $scope.tabs[goto] = "active";
        console.log($scope.tabs);
      }

    var navListItems = $('ul.setup-panel li a'),
    allWells = $('.setup-content');

    allWells.hide();

    navListItems.click(function(e)
    {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this).closest('li');
        
        if (!$item.hasClass('disabled')) {
            navListItems.closest('li').removeClass('active');
            $item.addClass('active');
            allWells.hide();
            $target.show();
        }
    });
    
    $('ul.setup-panel li.active a').trigger('click');
    
    // DEMO ONLY //
    $('#activate-step-2').on('click', function(e) {
        $('ul.setup-panel li:eq(1)').removeClass('disabled');
        $('ul.setup-panel li a[href="#step-2"]').trigger('click');
        $(this).remove();
    })    

  }]);

