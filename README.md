Synchronizes local browser time with server time
using clock synchronization algorithm, similar to
NTP.

##Installation

1. Ensure angular and socket.io are installed correctly

        npm install socket.io
        npm install ng-server-time

2. Ensure you have a socket factory such as [this one](https://gist.github.com/mfbx9da4/41df3703432c582f920a)
3. Include `ng-server-time-factory.js`.
4. Import `server-time-socket.js` on the server

