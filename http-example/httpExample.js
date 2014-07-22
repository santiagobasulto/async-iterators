var endpoint = "https://api.github.com/search/repositories?q=language:python&sort=stars&order=desc&per_page=2";
var querystring = require('querystring');
var https = require('https');
var util = require('util');

function performRequest(host, endpoint, method, data, success) {
  // Based on http://rapiddg.com/blog/calling-rest-api-nodejs-script
  var dataString = JSON.stringify(data);
  var headers = {};

  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
    headers = {
      'user-agent': 'Mozilla/5.0'
    }
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length,
      'user-agent': 'Mozilla/5.0'
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}

var requestCounter = 0;
var page = 0;
var requestRepos = function(lang, callback){
  //util.log("Making request no " + (++requestCounter));
  performRequest(
    'api.github.com',
    '/search/repositories',
    'GET',
    {
      q: 'language:' + lang,
      sort: 'stars',
      order: 'desc',
      per_page: '2',
      page: (++page)
    },
    callback
  );
};
const PYTHON = "python";
const JAVASCRIPT = "javascript";
var items = [];
var service = {
  search: function(lang){
    // Iterator
    var index = 0;

    return {
      next: function(callback){
        if(index == items.length){
          requestRepos(lang, function(response){
            Array.prototype.push.apply(items, response.items);
            callback(items[index++]);
          });
        }else{
          callback(items[index++]);
        }
      }
    };
  }
};
var it = service.search(PYTHON);
var logRepo = function(repo){
  util.log(
    "(%s) '%s' [%s]",
    repo.id, repo.full_name, repo.html_url);
}
it.next(function(result){
  util.log("This is the first result");
  logRepo(result);
});
var onResult = function(result){
  util.log("Other result");
  logRepo(result);
};
it.next(onResult);
it.next(onResult);
it.next(onResult);
console.log("Script finished")
