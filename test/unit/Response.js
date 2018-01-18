const { Response, Message } = require('../../Response.js')

describe('mh::test::Unit::Response', function(){
  
  it('should have a Response', function(){
    expect(Response).to.be.ok
  })

  it('should create a Response', function(){
    let r = new Response({ message: {} })
    expect(r).to.be.ok
  })

  it('should fail to create a Response without data', function(){
    let fn = ()=> new Response()
    expect( fn ).to.throw(/No options passed to Response/)
  })


  describe('Response instance', function(){
    
    let resp = null

    beforeEach(function(){
      resp = new Response({ message: { data: true }})
    })

    it('should set a message', function(){
      resp.setMessage('<html><body></body></html>')
      expect( resp._message ).to.equal('<html><body></body></html>')
    })

    it('should set a json message', function(){
      let ret = resp.json({ some: 'data' })
      //expect( resp._message ).to.eql({})
      expect( resp._message ).to.have.property('id').and.be.a('string')
      expect( resp._message ).to.have.property('ts').and.be.a('number')
      expect( resp._message ).to.have.property('data')
      expect( resp._message.data ).to.eql({ some: 'data' })
      expect( ret ).to.eql( resp )
    })

    it('should set a Message as json message', function(){
      let msg = new Message({ some: 'data' })
      let ret = resp.json(msg)
      //expect( resp._message ).to.eql({})
      expect( resp._message ).to.eql(msg)
      expect( ret ).to.eql( resp )
    })

    it('should set a header', function(){
      let ret = resp.setHeader('meee', 'youuuu')
      expect( resp._headers['meee'] ).to.equal( 'youuuu' )
      expect( ret ).to.eql( resp )
    })

    it('should set a template', function(){
      let ret = resp.setTemplate('tmplname')
      expect( resp._template ).to.equal( 'tmplname' )
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
      resp = Response.template({ somedata: true })
    })

    it('should set type to template', function(){
      expect( resp._type ).to.equal( 'template' )
      expect( resp._message ).to.eql({ somedata: true })
    })

  })

})