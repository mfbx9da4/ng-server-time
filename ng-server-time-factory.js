/**
 * Synchronizes local system time with server time
 * using clock synchronization algorithm, similar to
 * NTP.
 *
 * Pings server every half second for server time.
 * Calculates offset as difference between server time
 * and browser time before and after socket request.
 *
 * Keeps track of last 5 offsets and calculates current
 * offset as average of middle 3 offsets.
 *
 * @module ng-server-time
 * author David Alberto Adler github.com/mfbx9da4
 */
angular.module('ng-server-time', []).factory('ServerTime', ['socket','$interval', function(socket,$interval) {
    var self = {
        /**
         * Last five offsets.
         *
         */
        last_five_offsets: [],

        /**
         * When true prints offset on update.
         *
         */
        verbose: false,

        /**
         * Ping the server with current date
         *
         */
        ping: function () {
          socket.emit('server time', Date.now());
        },

        /**
         * Get offset between client and server in milliseconds
         *
         * @return {Number} How many milliseconds the browser is behind the server.
         */
        getOffset: function () {
          return self.offset;
        },

        /**
         * Correct now
         *
         */
        now: function () {
          return Date.now() + self.offset;
        },

        /**
         * Corrected now in new date form
         *
         */
        new: function () {
          return new Date(self.now());
        },

        /**
         * On socket from server. Updates offset.
         *
         * @param {Number} data.server Server timestamp
         * @param {Number} data.sender Client timestamp
         */
        onServerTime: function(data){
            var offset1 = data.server_transmission_time - Date.now();
            var offset2 = data.server_transmission_time - data.sender_transmission_time;
            var offset = (offset1 + offset2) / 2;

            // keep last 5 values
            self.last_five_offsets.push(offset);
            while(self.last_five_offsets.length > 5) {
                self.last_five_offsets.shift();
            }

            // copy
            var values = self.last_five_offsets.slice();

            // sort
            values.sort(function(a, b) {return b - a;});

            // take middle three
            if (values.length > 3) {
                values = values.slice(1,4);
            }

            // find average
            var sum = 0
            for (var i = 0; i < values.length; i ++) {
                sum += values[i];
            }
            var average = Math.floor(sum / values.length);

            self.offset = average;
            if (self.verbose) {
                console.log(values, 'offset', self.offset);
            }
        },

        /**
         * Init starts interval and listens
         * on sockets.
         *
         */
        init: function () {
            socket.on('server time', self.onServerTime);

            // Ping server regularly
            self.ping();
            self.pingInterval = $interval(self.ping, 500);
        }
    };
    self.init();

    return {
        now: self.now,
        new: self.new,
        ping: self.ping,
        getOffset: self.getOffset
    };
}]);
