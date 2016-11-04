
// get some sort of timestamp
const perf = window.performance
const now = (perf && perf.now && perf.now.bind(perf))
            || Date.now
            || (_ => new Date().getTime())


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
      t: now() - off,
      e: event
    })

  }

  collector.handle = (fn) => handlers.push(fn)


  return collector
}
