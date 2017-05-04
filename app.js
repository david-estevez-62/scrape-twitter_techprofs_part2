var express = require('express');
var TwitterPosts, streamOfTweets;
TwitterPosts = require('twitter-screen-scrape');

var d = new Date();
var n = d.getTime();


var app = express();









app.get('/', function(req, res) {
  var profiles = ['businessinsider', 'techreview', 'newscientist', 'sciencealert', 'iflscience', 'gizmodo', 'techcrunch', 'thenextweb', 'wired', 'engadget'];

  (function loop(i){
    if(i == profiles.length){
      return
    }

    streamOfTweets = new TwitterPosts({
          username: profiles[i],
          retweets: false
        });

    streamOfTweets.on('readable', function() {
          var time, tweet;
          tweet = streamOfTweets.read();



            time = new Date(tweet.time * 1000);


            if(tweet.retweet>50 && ((n/1000) - tweet.time)<1000000){

            var date = new Date(tweet.time * 1000)



              res.write(tweet.username +' '+date+' '+ tweet.retweet+' '+tweet.text+'\n')
            }
            
          });


    streamOfTweets.on('end', function() {
          loop(++i);
        });



  }(0))

});



var server = app.listen(process.env.PORT  || 8080, function() {
	console.log('Express server listening on port ' + server.address().port);
});
