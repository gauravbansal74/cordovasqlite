angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaSQLite) {

	$scope.insert = function() {
		//var flag =0;
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [$scope.firstname, $scope.lastname]).then(function(res) {
            alert("INSERT ID -> " + res.insertId);
        }, function (err) {
            alert(JSON.stringfy(err));
        });
    }


     $scope.select = function() {
     	//var flagv =0;
        var query = "SELECT firstname, lastname FROM people";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
                var employee = res.rows.item(0);
              // console.log(employee);
                alert(JSON.stringfy(employee));
            } else {
                alert("No results found");
            }
        }, function (err) {
            alert(JSON.stringfy(err));
        });
    }

})

.controller('FriendsCtrl', function($scope, $cordovaSQLite) {
  $scope.friends = function() {
        var query = "SELECT firstname, lastname FROM people";
        $cordovaSQLite.execute(db, query,[]).then(function(res) {
            if(res.rows.length > 0) {
                alert("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                alert("No results found");
            }
        }, function (err) {
            alert(err);
        });
    }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
