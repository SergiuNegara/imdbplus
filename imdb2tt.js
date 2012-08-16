 // @description Adds a button to search the viewed movie on torrentsmd.com
 // @namespace   http://n-e-s.info/
 // @include     http://www.imdb.com/title/tt*
 // @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
 // @version 19.05.2012
 // ==/UserScript==
 
 
movieId = location.pathname.match(/([0-9]){7}/)[0];
 
if(location.pathname.match(/combined/))
{
  tmdurl = '<a class="linkasbutton-secondary" href="http://torrentsmd.com/browse.php?imdb=' + movieId + '" target="_blank"><img alt="On TMD" src="http://torrentsmd.com/favicon.ico" /></a>';
  $('#action-box').append('<br/>' + tmdurl);
}
else
{
  tmdurl = '<a class="btn2 btn2_text_on large title-trailer" href="http://torrentsmd.com/browse.php?imdb=' + movieId + '" target="_blank"><span class="btn2_text"><img alt="On TMD" src="http://torrentsmd.com/favicon.ico" /></span></a>';
  $('#overview-bottom').append(tmdurl);
}
