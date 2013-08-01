var Strategy = require('../lib/strategy');

describe('Strategy', function() {
    
  var strategy = new Strategy();
    
  it('authenticate should throw error', function() {
    expect(function() {
      strategy.authenticate()
    }).to.throw(Error, 'Strategy#authenticate must be overridden by subclass');
  });
  
});
