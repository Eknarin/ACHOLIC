'use strict';

angular.module('acholic')
  .controller('EditProfileCtrl',[ '$scope','Auth', function ($scope, Auth) {

  	console.log($scope.user);

  	//Check BD
  	if($scope.user.date_of_birth)
  		$scope.user.date_of_birth = $scope.user.date_of_birth.substring(0, 10);

  	//Check gender from Facebook
  	if($scope.user.gender === 'female' || $scope.user.gender === 'Women'){
  		$scope.user.gender = 'Women'
  	}
  	else if($scope.user.gender === 'male' || $scope.user.gender === 'Men'){
  		$scope.user.gender = 'Men'
  	}
  	else{
  		$scope.user.gender = 'Other'
  	}

  	$scope.tabs = ["active", "", "", ""];
  	$scope.activeTab = function(goto){
        $scope.tabs = ["", "", "", ""];
        $scope.tabs[goto] = "active";
      }

      $scope.onSubmit= function(){
	      if($scope.user.vendor){
	      	console.log("I'm the vendor");
		      //check id
		      if($scope.user.vendor.identification_num == null){
		        alert("Please enter your Identification Number.");
		        return;
		      }
		      //check travel issue 
		      if($scope.user.vendor.provider_num == null){
		        alert("Please enter your Tourist Business license no.");
		        return;
		      }
		      //check email
		      if($scope.user.vendor.alt_email == null){
		        alert("Please enter Vendor Email.");
		        return;
		      }
		      //check phone
		      if($scope.user.vendor.phone_number == null){
		        alert("Please enter Vendor Phone Number.");
		        return;
		      }
		  }
		  //check first name
	      if($scope.user.first_name == null){
	        alert("Please enter your First Name.");
	        return;
	      }
	      //check last name
	      if($scope.user.last_name == null){
	        alert("Please enter your Last Name.");
	        return;
	      }
	      //check email
	      if($scope.user.email == null){
	        alert("Please fill your Email.");
	        return;
	      }
	      //check phone number
	      if($scope.user.phone_number == null){
	        alert("Please fill your Phone number.");
	        return;
	      }

	      else{
	        //update user data
	      }
    };

  }]);
