'use strict';

angular.module('acholic')
.controller('EditProfileCtrl',[ '$scope','Auth','User','$location', function ($scope, Auth,User,$location) {
	Auth.getUser().then(function(res){
		// User.query_user({id:res._id}).$promise.then(function(user){
			$scope.user_edit = res;
			console.log(res);
  			  	//Check BD
  			//  console.log($scope.user_edit);

  			  	if($scope.user_edit.date_of_birth)
  			  		$scope.user_edit.date_of_birth = $scope.user_edit.date_of_birth.substring(0, 10);

			  // 	//Check gender from F acebook
			  // 	if($scope.user_edit.gender === 'female' || $scope.user_edit.gender === 'Women'){
			  // 		$scope.user_edit.gender = 'Women'
			  // 	}
			  // 	else if($scope.user_edit.gender === 'male' || $scope.user_edit.gender === 'Men'){
			  // 		$scope.user_edit.gender = 'Men'
			  // 	}
			  // 	else{
			  // 		$scope.user_edit.gender = 'Other'
			  // 	}
			  // });
	});

	$scope.tabs = ["active", "", "", ""];
	$scope.activeTab = function(goto){
		$scope.tabs = ["", "", "", ""];
		$scope.tabs[goto] = "active";
	}

	$scope.onSubmit= function(){
		if($scope.user_edit.vendor){
		      //check id
		      if($scope.user_edit.vendor.identification_num == null){
		      	alert("กรุณากรอกเลขที่บัตรประชาชน");
		      	return;
		      }
		      //check travel issue 
		      if($scope.user_edit.vendor.provider_num == null){
		      	alert("กรุณากรอกเลขที่");
		      	return;
		      }
		      //check email
		      if($scope.user_edit.vendor.alt_email == null){
		      	alert("กรุณากรอกอีเมลของผู้ค้า");
		      	return;
		      }
		      //check phone
		      if($scope.user_edit.vendor.phone_number == null){
		      	alert("กรุณากรอกหมายเชขโทรศัพท์ของผู้ค้า");
		      	return;
		      }
		  }
		  //check first name
		  if($scope.user_edit.first_name == null){
		  	alert("กรุณากรอกชื่อจริง");
		  	return;
		  }
	      //check last name
	      if($scope.user_edit.last_name == null){
	      	alert("กรุณากรอกนามสกุล");
	      	return;
	      }
	      //check email
	      if($scope.user_edit.email == null){
	      	alert("กรุณากรอกอีเมลของคุณ");
	      	return;
	      }
	      //check phone number
	      if($scope.user_edit.phone_number == null){
	      	alert("กรุณากรอกหมายเลขโทรศัพท์ของคุณ");
	      	return;
	      }

	      User.update($scope.user_edit).$promise.then(function(res){
	      	Auth.reloadUser().then(function(){
	      		$location.path('/profile');
	      	})
	      });
	  };

	}]);
