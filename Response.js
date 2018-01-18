const ClassDebug = require('@mhp/ClassDebug').default
const { Message, MessageData } = require('@mhp/api-message')
const defaults = require('lodash/defaults')

// ## Response

class Response {

  static classInit(){
    ClassDebug.setup(this, 'mh:api')
    this.prototype.message = this.prototype.setMessage
  }

  static json( data, options ){
    let opts = { type: 'json', message: data }
    defaults(opts, options)
    return new Response(opts)
  }

  static raw( message, options ){
    let opts = { type: 'raw', message: message }
    defaults(opts, options)
    return new Response(opts)
  }

  static template( locals, options ){
    let opts = { type: 'template', message: locals }
    defaults(opts, options)
    return new Response(opts)
  }

  constructor( options ){
    if ( !options ) throw new Error('No options passed to Response')
    this._types = [ 'raw', 'template', 'json' ]

    this.setType( options.type || 'raw' ) // 'template', 'json'
    this._template = options.template
    this._status = options.status || 200
    this._headers = {}
    if ( options.hasOwnProperty('message') ){ 
      this.setMessage(options.message) // string for raw or object for json/template
    }
  }

  json( message ){
    this._type = 'json'
    if ( message === undefined ) {
      this.debug('No JSON message, just setting type')
      return this
    }
    this._message = ( message instanceof Message )
      ? message
      : new MessageData(message)
    return this
  }

  // headers go in the message for socketio?
  setHeader( name, val ){
    this._headers[name] = val
    return this
  }

  setTemplate( name ){
    this._template = name
    return this
  }

  setMessage( message ){
    switch ( this._type ){
      case 'raw':
        if ( ! message instanceof String && ! message instanceof Buffer ) {
          throw new Error('Raw responses must be a String or Buffer')
        }
        this._message = message
        return this

      case 'json':
        this._message = ( message instanceof Message )
          ? message
          : new MessageData(message)
        return this

      case 'template':
        this._message = ( message instanceof Message )
          ? message.data
          : message
        return this
    
      default:
        this._message = message
        return this
    }
  }

  setType( type ){
    if ( ! this._types.includes( type ) ) {
      throw new Error(`Type "${type}" not in [ ${this._types.join(', ')}]`)
    }
    // Convert an existing message to json
    if ( type === 'json' && ! this._message instanceof Message ) {
      this._message = new MessageData(this._message)
    }
    this._type = type
  }

}
Response.classInit()

module.exports = { Response, Message, MessageData }