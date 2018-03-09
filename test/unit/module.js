/* global expect */
const { ApiResponse, Message, MessageData, MessageError }  = require('../../')

describe('module/package', function(){

  it('should load ApiResponse from module', function(){
    expect( ApiResponse ).to.be.ok
  })

  it('should load Message from module', function(){
    expect( Message ).to.be.ok
  })

  it('should load MessageData from module', function(){
    expect( MessageData ).to.be.ok
  })

  it('should load MessageError from module', function(){
    expect( MessageError ).to.be.ok
  })

})
