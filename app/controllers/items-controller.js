function ItemsController($scope, $mdDialog) {
    $scope.showDialog = function (evt) {
        $mdDialog.show({
            templateUrl: '../views/create-item-modal.html',
            parent: angular.element(document.body),
            targetEvent: evt,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    }
}