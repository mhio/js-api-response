const { ClassDebug } = require('@mhp/ClassDebug') // es6 export
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
    if ( options.message !== undefined && options.message !== null ){
      this.setMessage(options.message) // string for raw or object for json/template
    }
  }

  // headers go in the message for socketio?
  setHeader( name, val ){
    this._headers[name] = val
    return this
  }

  setTemplate( name, locals ){
    this._type = 'template'
    this._template = name
    this.setMessage(locals)
    return this
  }

  setRaw( message ){
    this._type = 'raw'
    this.setMessage(message)
    return this
  }

  setJson( message ){
    this._type = 'json'
    this.setMessage(message)
    return this
  }

  setMessage( message ){
    switch ( this._type ){
      case 'raw':
        if ( message === undefined ) {
          throw new Error('Raw response message must be defined')
        }
        if ( message === null ) {
          throw new Error('Raw response message must not be null')
        }
        if (
          typeof message !== 'string' &&
          message instanceof String === false &&
          message instanceof Buffer === false
        ) {
          throw new Error(
            'Raw responses must be a String or Buffer',
            typeof message,
            message.constructor.name
          )
        }
        this._message = message
        return this

      case 'json':
        this._message = ( message instanceof Message )
          ? message
          : new MessageData(message)
        return this

      //? message here?
      case 'template':
        if ( typeof message !== 'object' ) {
          throw new Error('Template response message must be an object')
        }
        this._message = ( message instanceof Message )
          ? message.data
          : message
        return this
    
      default:
        throw new Error(`Unknown message type ${this._type}`)
    }
  }

  setType( type ){
    if ( this._types.includes(type) === false ) {
      throw new Error(`Response type "${type}" not in [ ${this._types.join(', ')}]`)
    }
    // Convert an existing message to json
    if ( type === 'json' && this._message instanceof Message === false ) {
      this._message = new MessageData(this._message)
    }
    this._type = type
  }

}
Response.classInit()

module.exports = { Response, Message, MessageData }
