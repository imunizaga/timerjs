timerjs
=======

A lightweight javascript timer

# usage

Create a timer object by passing it at least the seconds option, in this case with 180 seconds

    var timer = new Timer({
        seconds: 180,
    });
    timer.play();

The toString() method returns the time in mm:dd format

    console.log(timer.toString());
    >> 02:03

You can set a callback for when the time runs out

    var timer = new Timer({
        seconds: 180,
        onTimeout: function () {
            alert('timeout!');
        }
    });

You can set a callback for each tick of the clock

    var timer = new Timer({
        seconds: 180,
        onTimeout: function () {
            alert('timeout!');
        }
        onTick: function (timer) {
            console.log(timer.toString());
        }
    });

## options

* seconds: the number of seconds until the time runs out
* onTimeout: a callback for when the time runs out
* onTick: a callback for each tick of the clock
