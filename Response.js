const debug = require('debug')('mh:koa:Response')
const { Message, MessageData } = require('./Message')


// ## Response

// Hide express/socketio from the handlers

class Response {

  constructor( options ){
    this._status = options.status || 200
    this._message = options.message // string for raw or object for json/template
    this._template = options.template
    this._headers = {}
    this._type = 'raw' // 'template', 'json'
  }

  // headers go in the message for socketio?
  setHeader( name, val ){
    this._headers[name] = val
    return this
  }

  message( message ){
    this._message = message
    return this
  }

  json( message ){
    this._type = 'json'
    if (message !== undefined) {
      this._message = ( message instanceof Message )
        ? message
        : new MessageData(message)
    }
    return this
  }

  setTemplate( name ){
    this._template = name
    return this
  }

  template( message ){
    this._type = 'template'
    if (message !== undefined) this._message = message
    return this
  }

  raw( message ){
    this._type = 'raw'
    if (message !== undefined) this._message = message
    return this
  }

  debug(){
    debug(this)
    return this
  }

}

module.exports = { Response }