function ItemController($scope, $rootScope, $http, $routeParams, $mdToast) {
    var config = {
        headers: {
            // 'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
            // 'Accept': 'application/json;odata=verbose',
            "JWT": localStorage.getItem('token')
        }
    };

    const get_item = function () {
        $http.get('rest/items/' + $routeParams.id, config).then(function (response) {
            $scope.item = response.data[0];
        }), function (response) {
            alert(response.status);
        }
    }

    $scope.edit_item = function (id) {
        $http.put('/rest/items/edit/' + $routeParams.id, $scope.item, config).then(function (response) {
            $mdToast.show($mdToast.simple().position('top right').textContent('Item Edited!'));
        }, function (error) {
            console.log(error);
        });
    }

    get_item();
}