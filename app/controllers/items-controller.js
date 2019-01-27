function ItemsController($scope, $rootScope, $http, $mdDialog, $location) {
    var config = {
        headers: {
            // 'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
            // 'Accept': 'application/json;odata=verbose',
            "JWT": localStorage.getItem('token')
        }
    };

    $rootScope.items = [];

    const get_items = function () {
        $http.get('rest/items', config).then(function (response) {
            $rootScope.items = [...response.data];
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

    $scope.delete_item = function (id) {
        $http.delete('/rest/items/delete/' + id, config).then(function (response) {
            get_items();
        }, function (error) {
            console.log(error);
        });
    }

    $scope.onSelect = function (item) {
        $location.path('/item/' + item._id);
    };

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