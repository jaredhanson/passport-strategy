# passport-strategy

[![Build](https://travis-ci.org/jaredhanson/passport-strategy.png)](https://travis-ci.org/jaredhanson/passport-strategy)
[![Coverage](https://coveralls.io/repos/jaredhanson/passport-strategy/badge.png)](https://coveralls.io/r/jaredhanson/passport-strategy)
[![Quality](https://codeclimate.com/github/jaredhanson/passport-strategy.png)](https://codeclimate.com/github/jaredhanson/passport-strategy)
[![Dependencies](https://david-dm.org/jaredhanson/passport-strategy.png)](https://david-dm.org/jaredhanson/passport-strategy)
[![Tips](http://img.shields.io/gittip/jaredhanson.png)](https://www.gittip.com/jaredhanson/)


An abstract class implementing [Passport](http://passportjs.org/)'s strategy
API.

## Install

    $ npm install passport-strategy

## Usage

This module exports an abstract `Strategy` class that is intended to be
subclassed when implementing concrete authentication strategies.  Once
implemented, such strategies can be used by applications that utilize Passport
middleware for authentication.

### Subclass Strategy

Create a new `CustomStrategy` constructor which inherits from `Strategy`:

```javascript
var util = require('util')
  , Strategy = require('passport-strategy');

function CustomStrategy(...) {
  Strategy.call(this);
}

util.inherits(CustomStrategy, Strategy);
```

#### Set instance attributes

Passport will identify mounted strategies by the instance's `name` attribute, 
so be sure to set one in the constructor:

```javascript
var util = require('util')
  , Strategy = require('passport-strategy');

function CustomStrategy(...) {
  Strategy.call(this);

  this.name = 'custom'; // set instance name
}

util.inherits(CustomStrategy, Strategy);
```

Later, when a user calls `passport.authenticate` to acquire
the authentication middleware, the value of this `name` attribute 
is what must be passed in as the first argument:

```javascript
var authMiddleware = passport.authenticate('custom');
```

### Implement Authentication

Implement `autheticate()`, performing the necessary operations required by the
authentication scheme or protocol being implemented.

```javascript
CustomStrategy.prototype.authenticate = function(req, options) {
  // TODO: authenticate request
}
```

## Related Modules

- [chai-passport-strategy](https://github.com/jaredhanson/chai-passport-strategy) — helpers for testing strategies with the Chai assertion library

## Tests

    $ npm install
    $ npm test

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2014 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
