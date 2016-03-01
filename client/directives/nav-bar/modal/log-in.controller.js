'use strict';

angular.module('acholic')
  .controller('LoginCtrl',['$scope','$rootScope','Auth','$uibModalInstance', function ($scope , $rootScope ,Auth , $uibModalInstance) {

     $scope.showAlert = false;
     $scope.user = { email: 'test@test.com', password: 'test' };

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
