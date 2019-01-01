function ItemsController($scope, $http, $mdDialog) {
    var config = {
        headers: {
            // 'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
            // 'Accept': 'application/json;odata=verbose',
            "JWT": localStorage.getItem('token')
        }
    };

    const get_items = function () {
        $http.get('rest/items', config).then(function (response) {
            $scope.items = response.data;
        }), function (response) {
            alert(response.status);
        }
    };

    $scope.create_item = function () {
        $http.post('/rest/items/create', $scope.newItem, config).then(function (response) {
            $scope.newItem = null;
            $mdDialog.hide();
            get_items();
        }, function (error) {
            console.log(error);
        });
    }

    get_items();

    $scope.showDialog = function (evt) {
        $mdDialog.show({
            controller: ItemsController,
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
    $scope.newItem = {
        name: ""
    }
}