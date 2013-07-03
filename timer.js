/*global clearInterval: false */
/*global setInterval: false */

var Timer = function (options) {
    "use strict";

    this.PAUSED = 1;
    this.PLAYING = 2;
    this.ENDED = 3;

    this.restart = function () {
        this.secondsLeft = options.seconds || 0;
	    this.millisecondsLeft = this.secondsLeft * 1000;
    };

	this.play = function () {
        var self = this;
        if (!this.state) {
	        this.state = this.PAUSED;
            this.onTimeout = options.onTimeout || function () {};
            this.onTick = options.onTick || function () {};
            this.restart();
        }

        if (this.state === this.PAUSED) {
			this.timeMark = Date.now();
			this.interval = setInterval(
                function () {
                    self.update();
                },
                50
            );
            this.state = this.PLAYING;
		}
	};

	this.update = function () {
		if (this.millisecondsLeft <= 0) {
		    clearInterval(this.interval);
            this.state = this.ENDED;
            this.onTimeout();
            return;
		}

		var currentTime = Date.now(), seconds;

		this.millisecondsLeft -= currentTime - this.timeMark;
		this.timeMark = currentTime;

        seconds = this.millisecondsLeft / 1000;
		if (seconds < this.secondsLeft) {
            this.secondsLeft = parseInt(seconds, 10);
            this.onTick(this);
        }
	};

	this.pause = function () {
        this.state = this.PAUSED;
        this.pauseTime = new Date();
		clearInterval(this.interval);
	};

    this.toString = function () {
        var minutes, seconds, secondsLeft;
        if (this.millisecondsLeft > 0) {
            secondsLeft = parseInt(this.millisecondsLeft / 1000, 10) + 1;
        } else {
            secondsLeft = 0;
        }

        minutes = parseInt(secondsLeft / 60, 10);

        seconds = secondsLeft % 60;

        minutes = ((minutes.toString()).length === 2 ? '' : '0') + minutes;
        seconds = ((seconds.toString()).length === 2 ? '' : '0') + seconds;

        return minutes + ':' + seconds;
    };
};
