var primes = require('./primes');
var config = require('./config');

var getPrimesSyncIterator = function(){
  var start = config.startingPrime;
  var currentPrime = start;
  return {
    next: function(){
      var nextPrime = primes.nextPrime(currentPrime);
      currentPrime = nextPrime;
      return currentPrime;
    }
  }
}

it = getPrimesSyncIterator();
console.log(it.next());
console.log(it.next());
console.log(it.next());
