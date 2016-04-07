'use strict';

angular.module('acholic')
  .controller('LoginCtrl',['$scope','$http','$location','$rootScope','Auth','$uibModalInstance','$facebook', function ($scope ,$http, $location,$rootScope ,Auth , $uibModalInstance,$facebook) {

     $scope.showAlert = false;
     $scope.user = { email: '', password: '' };
     $scope.isLoggedIn = false;
     $scope.facebook_first = false;

      $scope.loginFacebook = function() {
        $facebook.login().then(function(res) {
           Auth.checkUser(res.authResponse.userID).then(function(faceUser){
            if(faceUser != 401){
              Auth.loginFacebook(faceUser)
                .then(function (res2) {
                  $uibModalInstance.close(faceUser);
                })
                .catch(function (err) {
                  $scope.showAlert = true;
              });
            }else{
            $facebook.api('/me', 'GET', {fields: 'email,first_name,gender,age_range,last_name,name,id,picture.width(800).height(800)'}).then(function(data){
              $scope.person = {};
              $scope.person.first_name = data.first_name;
              $scope.person.last_name = data.last_name;
              $scope.person.gender = data.gender;
              $scope.person.email = data.email;
              $scope.person.age_min = data.age_range.min;
              $scope.person.facebook_image = data.picture.data.url;
              $scope.person.facebook_id = res.authResponse.userID;
              $scope.facebook_first = true;
             });
            }

           });
        });
      };

      $scope.faceLogin = function() {
        Auth.signupCustomer( $scope.person)
                .then(function (res2) {
                  $location.path('/');
                  $uibModalInstance.close();
                })
                .catch(function (err) {
                  console.log(err);
                });
      };

     $scope.login = function () {
      $scope.showAlert = false;
          Auth.login($scope.user)
            .then(function (res) {
              $uibModalInstance.close($rootScope._user);
            })
            .catch(function (err) {
              $scope.showAlert = true;
            });
        };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
}]);
