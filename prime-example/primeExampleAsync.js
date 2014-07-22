var assert = require('assert');
var async = require("async");
var sem = require('semaphore')(1);

var primes = require('./primes');
var config = require('./config');

var getPrimesAsyncIterator = function(){
  var start = config.startingPrime;
  var currentPrime = start;
  return {
    next: function(callback){
      async.parallel([
        function(finishedCallback){
          sem.take(function(){
            var nextPrime = primes.nextPrime(currentPrime);
            currentPrime = nextPrime;
            sem.leave();
            finishedCallback(null, nextPrime);
          });
        }
      ], function(err, results){
        callback(results[0]);
      });
    }
  };
};

it = getPrimesAsyncIterator();
var callback = function(prime){
  console.log(prime);
};
it.next(callback);
it.next(callback);
it.next(callback);
