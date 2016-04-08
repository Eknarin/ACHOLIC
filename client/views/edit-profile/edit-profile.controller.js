'use strict';

angular.module('acholic')
.controller('EditProfileCtrl',[ '$scope','Auth','User','$location', function ($scope, Auth,User,$location) {
	Auth.getUser().then(function(res){
		User.query_user({id:res._id}).$promise.then(function(user){
			$scope.user_edit = user;
  			  	//Check BD

  			  	if($scope.user_edit.date_of_birth)
  			  		$scope.user_edit.date_of_birth = $scope.user_edit.date_of_birth.substring(0, 10);

			  	//Check gender from F acebook
			  	if($scope.user_edit.gender === 'female' || $scope.user_edit.gender === 'Women'){
			  		$scope.user_edit.gender = 'Women'
			  	}
			  	else if($scope.user_edit.gender === 'male' || $scope.user_edit.gender === 'Men'){
			  		$scope.user_edit.gender = 'Men'
			  	}
			  	else{
			  		$scope.user_edit.gender = 'Other'
			  	}
			  });
	});

	$scope.tabs = ["active", "", "", ""];
	$scope.activeTab = function(goto){
		$scope.tabs = ["", "", "", ""];
		$scope.tabs[goto] = "active";
	}

	$scope.onSubmit= function(){
		if($scope.user_edit.vendor){
			console.log("I'm the vendor");
		      //check id
		      if($scope.user_edit.vendor.identification_num == null){
		      	alert("Please enter your Identification Number.");
		      	return;
		      }
		      //check travel issue 
		      if($scope.user_edit.vendor.provider_num == null){
		      	alert("Please enter your Tourist Business license no.");
		      	return;
		      }
		      //check email
		      if($scope.user_edit.vendor.alt_email == null){
		      	alert("Please enter Vendor Email.");
		      	return;
		      }
		      //check phone
		      if($scope.user_edit.vendor.phone_number == null){
		      	alert("Please enter Vendor Phone Number.");
		      	return;
		      }
		  }
		  //check first name
		  if($scope.user_edit.first_name == null){
		  	alert("Please enter your First Name.");
		  	return;
		  }
	      //check last name
	      if($scope.user_edit.last_name == null){
	      	alert("Please enter your Last Name.");
	      	return;
	      }
	      //check email
	      if($scope.user_edit.email == null){
	      	alert("Please fill your Email.");
	      	return;
	      }
	      //check phone number
	      if($scope.user_edit.phone_number == null){
	      	alert("Please fill your Phone number.");
	      	return;
	      }

	      $scope.user_edit.$update().then(function(res){
	      	Auth.reloadUser().then(function(){
	      		$location.path('/profile');
	      	})
	      });
	  };

	}]);
