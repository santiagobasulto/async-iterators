**Disclaimer: I'm not a node.js or javascript expert. Although I have a good engineering background with other technologies like Python and Java. Please let me know if you find any errors or things to improve. I greatly appreciate feedback and criticism**

Recently while I was "playing around" with javascript and node.js I noticed the lack of iterators, which in other languages is such a cool feature and provides a nice and clean interface. While googling around I found the [last proposal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol) to include the iterator protocol in Harmony. While reading about it, something draw my attention: it was a sync protocol. While I was trying to learn and experiment with node.js I was trying to set my mind for an async world. And this protocol contradicts that notion.

So I decided to create a little experiment with **async iterators**. Which are pretty much the same as a regular sync iterator, but without blocking the execution in each `next` call.

### Difference with a sync iterator

This would be a sync iterator (the example searches the most popular packages on GitHub):

```javascript
var it = service.search("python");
console.log(it.next()); // django
console.log(it.next()); // requests
console.log(it.next()); // httpie
```

and this would be the proposed async iterator:

```javascript
var it = service.search("python");
it.next(function(repo){
  console.log(repo);
});
it.next(function(repo){
  console.log(repo);
});
```

### Examples

I've created a couple of examples to demostrate the use of these iterators. The first one is [http-example](#). The iterator gets popular repositories from GitHub (from a given language). I'm requesting just 2 results per page on purpose to demostrate how clean the interface would be (the iterator caller doesn't know when the iterator has to make subsequent calls to the API to get more results).

The second example is kind of fuzzy right now. I'm trying to simulate the behavior of a computational-intensive task which would be involved in the iterator. But I'm lacking the required knowledge on node.js concurrency (something I'd like to discuss with someone experienced in node.js).

To try these examples just do:

    $ npm install
    $ node http-example/httpExample.js

    $ node prime-example/
