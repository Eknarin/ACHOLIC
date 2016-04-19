'use strict';

angular.module('acholic')
  .controller('SignupCustomerCtrl',['$scope' , 'Auth', '$location', function ($scope , Auth , $location) {
    $scope.user = {};

    $scope.onSubmit= function(){
      //check first name
      if($scope.user.first_name == null){
        alert("กรุณากรอก่ชื่อ");
        return;
      }
      //check last name
      if($scope.user.last_name == null){
        alert("กรุณากรอกสกุล");
        return;
      }
      //check email
      if($scope.user.email == null){
        alert("กรุณากรอกอีเมล");
        return;
      }
      //check password
      if($scope.user.password == null){
        alert("กรุณาระบุรหัสผ่าน");
        return;
      }
      //check repassword
      if($scope.user.repassword == null){
        alert("กรุณายืนยันรหัสในช่องยืนยันรหัสผ่าน");
        return;
      }
      //check phone
      if($scope.user.phone_number == null){
        alert("กรุณากรอกหมายเลขโทรศัพท์ของท่าน");
        return;
      }

      //check password matching
      if($scope.user.password != $scope.user.repassword){
        alert("รหัสยืนยันไม่ตรงกับรหัสผ่าน!");
        return;
      } else{
        Auth.signupCustomer($scope.user)
            .then(function (res) {
              $location.path('/');
            })
            .catch(function (err) {
              console.log(err);
            });
      }
    };

      $scope.tabs = ["active", "", "", ""];
      $scope.activeTab = function(goto){
        $scope.tabs = ["", "", "", ""];
        $scope.tabs[goto] = "active";
      }

  }]);
