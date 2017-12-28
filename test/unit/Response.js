const { Response } = require('../../Response.js')

describe('mh::test::Unit::Response', function () {
  
  it('should have a Response', function() {
    expect(Response).to.be.ok
  })

  it('should create a Response', function() {
    let r = new Response({ message: {} })
    expect(r).to.be.ok
  })

})