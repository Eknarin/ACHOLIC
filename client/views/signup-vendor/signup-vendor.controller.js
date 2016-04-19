'use strict';

angular.module('acholic')
  .controller('SignupVendorCtrl',['$scope', 'Auth','$location', function ($scope , Auth , $location) {
    $scope.vendor = {};
    Auth.getUser().then(function(res){
      $scope.vendor.userId = res._id;
      $scope.vendor.alt_email = res.email;
      $scope.vendor.phone_number = res.phone_number;
    });



    $scope.onSubmit= function(){
      if($scope.vendor.identification_num == null){
        alert("กรุณากรอกเลขที่บัตรประชาชน");
        return;
      }
      if($scope.vendor.provider_num == null){
        alert("กรุณากรอกเลขที่ผู้ประกอบการ");
        return;
      }
      if($scope.vendor.phone_number == null){
        alert("กรุณากรอกหมายเลขโทรศัพท์ของท่าน");
        return;
      }
      else{
        Auth.signupVendor($scope.vendor)
            .then(function () {
              console.log('set as vendor!!!');
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
        // console.log($scope.tabs);
      }
  }]);
