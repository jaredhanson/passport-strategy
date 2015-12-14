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
the authentication middleware that employs this strategy, the value
of this `name` attribute is what must be passed in as the first argument:

```javascript
var authMiddleware = passport.authenticate('custom');
```

### Implement Authentication

Implement the `authenticate` method, performing the necessary operations required by the
authentication scheme or protocol being implemented.

```javascript
CustomStrategy.prototype.authenticate = function(req, options) {
  // TODO: authenticate request
}
```

Upon mounting a strategy instance on passport, it will be augmented with several methods.
These methods are essential to writing a working `authenticate` method:

* `error(err)`, indicates to passport that an error occurred in authenticating the request.
* `fail()`, indicates to passport that the request failed authentication.
* `success(userObj)`, indicates to passport that the request was successfully authenticated and provides the user object with which to associate the new authenticated session.

Since the strategy instance is augmented with these methods, they can be accessed as
properties of `this` within the `authenticate` method.

#### Examples

```javascript
AlwaysSucceedStrategy.prototype.authenticate = function(req, options) {
    this.success({
        username : 'bogus',
        userId : NaN
    });
}
```

```javascript
AlwaysFailStrategy.prototype.authenticate = function(req, options) {
    this.fail();
}
```

```javascript
AlwaysErrorStrategy.prototype.authenticate = function(req, options) {
    var err = new Error("Strategy: working as intended")
    this.error(err);
}
```

```javascript
CoinFlipStrategy.prototype.authenticate = function(req, options) {
    if(Math.random() < .5) {
        this.success({
            username : "George Washington",
            userId : 25
        });
    } else {
        this.fail();
    }
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
