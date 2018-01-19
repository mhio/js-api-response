/* global expect */
const { Response, Message, MessageData } = require('../../Response.js')


describe('mh::test::Unit::Response', function(){
  
  it('should have a Response', function(){
    expect(Response).to.be.ok
  })

  it('should create a Response', function(){
    let r = new Response({ message: 'm' })
    expect(r).to.be.ok
  })

  it('should fail to create a Response without data', function(){
    let fn = ()=> new Response()
    expect( fn ).to.throw(/No options passed to Response/)
  })


  describe('Response instance', function(){
    
    let resp = null

    beforeEach(function(){
      resp = new Response({ type: 'raw', message: '<html></html>'})
    })

    it('should set a message', function(){
      resp.setMessage('<html><body></body></html>')
      expect( resp._message ).to.equal('<html><body></body></html>')
    })

    it('should set a json message', function(){
      resp.setType('json')
      let ret = resp.setMessage({ some: 'data' })
      //expect( resp._message ).to.eql({})
      expect( resp._message ).to.have.property('id').and.be.a('string')
      expect( resp._message ).to.have.property('ts').and.be.a('number')
      expect( resp._message ).to.have.property('data')
      expect( resp._message.data ).to.eql({ some: 'data' })
      expect( ret ).to.eql( resp )
    })

    it('should set a Message as json message', function(){
      let msg = new Message({ some: 'data' })
      resp.setType('json')
      let ret = resp.setMessage(msg)
      //expect( resp._message ).to.eql({})
      expect( resp._message ).to.eql(msg)
      expect( ret ).to.eql( resp )
    })

    it('should fail to set an unkown message type', function(){
      let fn = () => resp.setType('wat')
      expect( fn ).to.throw(/not in \[/)
    })

    it('should set a header', function(){
      let ret = resp.setHeader('meee', 'youuuu')
      expect( resp._headers['meee'] ).to.equal( 'youuuu' )
      expect( ret ).to.eql( resp )
    })

    it('should set a template', function(){
      let ret = resp.setTemplate('tmplname', { somevar: true })
      expect( resp._template ).to.equal( 'tmplname' )
      expect( resp._message ).to.eql({ somevar: true })
      expect( ret ).to.eql( resp )
    })

    it('should set a template from Message', function(){
      let msg = new MessageData({ somevar: true })
      let ret = resp.setTemplate('tmplname', msg)
      expect( resp._template ).to.equal( 'tmplname' )
      expect( resp._message ).to.eql({ somevar: true })
      expect( ret ).to.eql( resp )
    })

    it('should fail to set a template message as non object', function(){
      let fn = () => resp.setTemplate(null)
      expect( fn ).to.throw(/must be an object/)
    })

    it('should set a raw response string', function(){
      let ret = resp.setRaw('tmplname')
      expect( resp._message ).to.equal( 'tmplname' )
      expect( ret ).to.eql( resp )
    })

    it('should set a raw response String', function(){
      let str = new String('whatever')
      let ret = resp.setRaw(str)
      expect( resp._message ).to.equal( str )
      expect( ret ).to.eql( resp )
    })

    it('should set a raw response Buffer', function(){
      let buf = new Buffer('whatever')
      let ret = resp.setRaw(buf)
      expect( resp._message ).to.eql( buf )
      expect( ret ).to.eql( resp )
    })

    it('should fail to set an undefined raw response', function(){
      let fn = () => resp.setRaw()
      expect( fn ).to.throw(/must be defined/)
    })

    it('should fail to set an null raw response', function(){
      let fn = () => resp.setRaw(null)
      expect( fn ).to.throw(/must not be null/)
    })

    it('should fail to set an object response', function(){
      let fn = () => resp.setRaw({})
      expect( fn ).to.throw(/must be a String or Buffer/)
    })

    it('should set a json response', function(){
      let ret = resp.setJson({ wakka:'wakka' })
      expect( resp._type ).to.equal( 'json' )
      expect( ret ).to.eql( resp )
    })

  })

  describe('Response json instance', function(){

    let resp = null

    beforeEach(function(){
      resp = Response.json({ myval: true })
    })

    it('should set the Response type to json with no message', function(){
      expect( resp._type ).to.equal( 'json' )
      expect( resp._message ).to.have.property('data').and.eql({ myval: true })
    })

  })

  describe('Response raw instance', function(){

    let resp = null

    beforeEach(function(){
      resp = Response.raw('stringy string')
    })

    it('should set type to raw', function(){
      expect( resp._type ).to.equal( 'raw' )
      expect( resp._message ).to.equal( 'stringy string' )
    })

  })

  describe('Response template instance', function(){

    let resp = null

    beforeEach(function(){
      resp = Response.template('whom', { somedata: true })
    })

    it('should set type to template', function(){
      expect( resp._type ).to.equal( 'template' )
      expect( resp._template ).to.equal( 'whom' )
      expect( resp._message ).to.eql({ somedata: true })
    })

  })

})