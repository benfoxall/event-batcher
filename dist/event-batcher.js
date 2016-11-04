(function (exports) {
'use strict';

// get some sort of timestamp
var perf = window.performance
var now = (perf && perf.now && perf.now.bind(perf))
            || Date.now
            || (function (_) { return new Date().getTime(); })


var encode = function (millis) {

  var handlers = []
  var events = []
  var off = 0

  var flush = function () {
    handlers.forEach( function (handler) { return handler(events); })
    events = []
  }

  var collector = function (event) {
    if(!events.length){
      off = now()
      setTimeout(flush, millis)
    }


    events.push({
      t: ~~(now() - off),
      e: event
    })

  }

  collector.handle = function (fn) { return handlers.push(fn); }


  return collector
}


var decode = function (millis) {

  var handlers = []

  var trigger = function (data) {
    handlers.forEach( function (h) { return h(data); })
  }

  var processor = function (data) {

    // naive approach here, don't need so many timers
    data.forEach( function (b) {
      setTimeout(trigger, b.t, b.e)
    })

  }

  processor.handle = function (fn) { return handlers.push(fn); }

  return processor
}

exports.encode = encode;
exports.decode = decode;

}((this.eventBatcher = this.eventBatcher || {})));
