
// get some sort of timestamp
const now = (function(){

  // node
  if(typeof window == 'undefined') return Date.now

  const perf = window.performance
  return (perf && perf.now && perf.now.bind(perf))
    || Date.now
    || (_ => new Date().getTime())

})()


export const encode = millis => {

  const handlers = []
  let events = []
  let off = 0

  const flush = () => {
    handlers.forEach( handler => handler(events))
    events = []
  }

  const collector = event => {
    if(!events.length){
      off = now()
      setTimeout(flush, millis)
    }


    events.push({
      t: ~~(now() - off),
      e: event
    })

  }

  collector.handle = (fn) => handlers.push(fn)


  return collector
}


export const decode = millis => {

  const handlers = []

  const trigger = (data) => {
    handlers.forEach( h => h(data))
  }

  const processor = data => {

    // naive approach here, don't need so many timers
    data.forEach( b => {
      setTimeout(trigger, b.t, b.e)
    })

  }

  processor.handle = fn => handlers.push(fn)

  return processor
}
