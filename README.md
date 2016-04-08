Synchronizes local browser time with server time
using clock synchronization algorithm, similar to
NTP.

##Installation

1. Ensure angular, socket.io and ng-server-time are installed correctly

    ```
    npm install socket.io
    npm install angular
    npm install ng-server-time
    ```

2. Ensure you have a socket factory such as this one, it is required by the server time factory:

    ```js
    app.factory('socket', function() {
       var socket = io.connect();
       return socket;
    });
    ```
3. Include `ng-server-time-factory.min.js`:

   ```html
    <script src="/socket.io.js"></script>
    <script src="/angular.min.js"></script>
    <script src="/ng-server-time-factory.min.js"></script>
    <script src="/my-angular-app.js"></script>
   ```
4. Initilaize the socket on the server:

    ```js
    var server_time = require('ng-server-time');

    io.sockets.on('connection', function (socket) {
      server_time.init(socket);
    });
    ```

###Usage

```js
app.controller('MainController', function($scope, ServerTime){
    // Date.now() on the server
    $scope.now = now();

    // new Date() on the server
    $scope.new = new();

    // get offset in milliseconds between current browser
    // time and server time
    $scope.getOffset = getOffset();
});
```
