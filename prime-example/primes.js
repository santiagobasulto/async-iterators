var range = function range(start, end) {
  return Array.apply(0, Array(end-start)).map(function (elem, idx){
      return idx + start;
  });
};

var isPrime = function(x){
  var divisor = 2;
  for (var i = 0; i < (x - divisor); i++) {
    if((x % divisor) == 0){
      return false;
    }
    divisor++;
  }
  return true;
};

var nextPrime = function(x){
  while(true){
    if(isPrime(++x))
      return x
  }
};


module.exports.isPrime = isPrime;
module.exports.nextPrime = nextPrime;
