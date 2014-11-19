angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaSQLite, $cordovaNetwork, $ionicPopup, $http) {
    
	$scope.insert = function(mobilenumber) {

       
       var type = $cordovaNetwork.getNetwork();
       var isOnline = $cordovaNetwork.isOnline();
       var isOffline = $cordovaNetwork.isOffline();
      // $scope.imconnected  = "Network Type = "+type+ "  Is connected = "+isOnline+ "  Is not connected ="+ isOffline;
         
        if(isOnline == true){
          var hostUrl = "http://103.241.183.21/pearlcity/php_Calls/checkmobile.php";
          var mobile_name = mobilenumber;
          var requestdata = $http({
                  method : "POST",
                  url : hostUrl,
                  data : { mobile_number:mobile_name },
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  transformRequest: serializeData
              }).then(function(data) {
                 $ionicPopup.confirm({
                  title: "Data successfully saved in Master database",
                  content: "Your mobile number is "+mobilenumber
              });
            });
        }else{
          var query = "INSERT INTO users (mobilenumber) VALUES (?)";
           $cordovaSQLite.execute(db, query, [mobilenumber]).then(function(res) {
              $ionicPopup.confirm({
                  title: "Data successfully saved in Device",
                  content: "Your mobile number is "+mobilenumber
              });
           }, function (err) {
              alert(JSON.stringfy(err));
          });
        }
         
    }


     $scope.select = function() {
     	var isOffline = $cordovaNetwork.isOffline();
      if(isOffline == true){
        $ionicPopup.confirm({
              title: "Internet Disconnected",
              content: "For data synchronization, we need Internet connection."
          });
      }else{
        var caseTableResult = [];
        var query = "SELECT * FROM users";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
              caseTableResult = res.rows;
              for (index = 0; index < caseTableResult.length; ++index) {
                   // alert(JSON.stringify(caseTableResult.item(index).mobilenumber));
                    var hostUrl = "http://103.241.183.21/pearlcity/php_Calls/checkmobile.php";
                    var mobile_name = caseTableResult.item(index).mobilenumber;
                    var requestdata = $http({
                          method : "POST",
                          url : hostUrl,
                          data : { mobile_number:mobile_name },
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                          transformRequest: serializeData
                      }).then(function(data) {
                      $scope.imconnected = JSON.stringify(data);
                    });
               }
               

                var query = "DELETE FROM users";
                     $cordovaSQLite.execute(db, query, []).then(function(res) {
                        $ionicPopup.confirm({
                            title: "Local Data successfully deleted from your Device",
                            content: "Thank you for using GluePlus"
                        });
                     }, function (err) {
                        alert(JSON.stringfy(err));
                    });
            } else {
                $ionicPopup.confirm({
                            title: "Your device data is already sync with master database",
                            content: "Thank you for using GluePlus"
                        });
            }
        }, function (err) {
            alert(JSON.stringfy(err));
        });
}
    }


      function serializeData( data ) {
 
                    // If this is not an object, defer to native stringification.
                    if ( ! angular.isObject( data ) ) {
 
                        return( ( data == null ) ? "" : data.toString() );
 
                    }
 
                    var buffer = [];
 
                    // Serialize each key in the object.
                    for ( var name in data ) {
 
                        if ( ! data.hasOwnProperty( name ) ) {
 
                            continue;
 
                        }
 
                        var value = data[ name ];
 
                        buffer.push(
                            encodeURIComponent( name ) +
                            "=" +
                            encodeURIComponent( ( value == null ) ? "" : value )
                        );
 
                    }
 
                    // Serialize the buffer and clean it up for transportation.
                    var source = buffer
                        .join( "&" )
                        .replace( /%20/g, "+" )
                    ;
 
                    return( source );
 
                }
})

.controller('FriendsCtrl', function($scope, $cordovaBarcodeScanner) {
  $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
