Synchronizes local system time with server time
using clock synchronization algorithm, similar to
NTP.

##Usage

1. Ensure angular and sockets are installed correctly
2. Ensure you have a socket factory such as this one:

      ```js
      app.factory('socket', function($rootScope) {
         var socket = io.connect();
         return socket;
      });
      ```
3. Include `ng-server-time-factory.js`.
4. Import `server-time-socket.js` on the server

