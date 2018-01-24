const { ClassDebug } = require('@mhp/ClassDebug') // es6 export
const { Message, MessageData } = require('@mhp/api-message')
//const defaults = require('lodash/defaults')
const defaults = require('lodash.defaults')

/** Class to encapsulate a response */
class ApiResponse {

  static classInit(){
    /**
     * @namespace ClassDebug
     * @function debug - Class namespaced debug instance. Controlled with `DEBUG` env var. https://github.com/visionmedia/debug
    */
    ClassDebug.setup(this, 'mh:api')
  }

  /**
   * @description Create JSON Response
   * @param {object|Message} data - Data to send as JSON `DataMessage`
   * @param {object} options - Response options
   */
  static json( data, options ){
    let opts = { type: 'json', message: data }
    defaults(opts, options)
    return new ApiResponse(opts)
  }

  /**
   * @description Create raw Response
   * @param {string|Buffer} message - Raw message to send
   * @param {object} options - Response options
   */
  static raw( message, options ){
    let opts = { type: 'raw', message: message }
    defaults(opts, options)
    return new ApiResponse(opts)
  }

  /**
   * @description Create template Response
   * @param {string} tplname - Template name
   * @param {object} locals - Template local data
   * @param {object} options - Response options
   */
  static template( tplname, locals, options ){
    let opts = { type: 'template', template: tplname, message: locals }
    defaults(opts, options)
    return new ApiResponse(opts)
  }

  constructor( options ){
    if ( !options ) throw new Error('No options passed to ApiResponse')
    this._types = [ 'raw', 'template', 'json' ]

    this.setType( options.type || 'raw' ) // 'template', 'json'
    this._template = options.template
    this._status = options.status || 200
    this._headers = {}
    if ( options.message !== undefined && options.message !== null ){
      this.setMessage(options.message) // string for raw or object for json/template
    }
  }

  /**
   * @description Set a header on the response
   * @param {string} name - Header name
   * @param {string} value - Header value
   */
  setHeader( name, value ){
    this._headers[name] = value
    return this
  }

  /**
   * @description Set the Response as a template
   * @param {string} tplname - Template name
   * @param {object} locals - Template local data
   */
  setTemplate( tplname, locals ){
    this._type = 'template'
    this._template = tplname
    this.setMessage(locals)
    return this
  }

  /**
   * @description Set the Response as raw
   * @param {string|String|Buffer} message - Raw message to send to client
   */
  setRaw( message ){
    this._type = 'raw'
    this.setMessage(message)
    return this
  }

  /**
   * @description Set the Response as JSON
   * @param {any|Message} message - Data to send to the client (as `MessageData`)
   */
  setJson( message ){
    this._type = 'json'
    this.setMessage(message)
    return this
  }

  /**
   * @description Set the Response message
   * @param {any} message - Data to send to the client
   */
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
        throw new Error(`Unknown message type "${this._type}"`)
    }
  }

  /**
   * @description Set the Response type
   * @param {string} type - The type of the message. See {@link MessageData._types}.
   */
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

ApiResponse.classInit()

module.exports = { ApiResponse, Message, MessageData }
