
app.controller('authController', function ($scope, $http, $mdToast, $log) {

    $scope.userLogin = function (user) {
        $http.post('/user/login', user).then(function (response) {
            localStorage.setItem('token', response.data.token)
        }).catch(function (err) {
            $mdToast.show($mdToast.simple().position('top right').textContent('Invalid Credentials!'));
        })
    }

})