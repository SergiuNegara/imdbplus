// ==UserScript==
// @name        IMDB to TMD
// @description Adds a button to search the viewed movie on torrentsmd.com
// @namespace   http://n-e-s.info/
// @include     http://www.imdb.com/title/tt*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     16.08.2012
// ==/UserScript==


movieId = location.pathname.match(/([0-9]{7})/g);
movieName = $('title').text();

if(location.pathname.match(/combined/))
{
  tmdurl = '<a class="linkasbutton-secondary" href="http://torrentsmd.com/browse.php?imdb=' + movieId + '" target="_blank" title="On TMD"><img alt="On TMD" src="http://torrentsmd.com/favicon.ico" /></a>';
  ruturl = '<a class="linkasbutton-secondary" href="http://rutracker.org/forum/tracker.php?nm=' + movieName + '" target="_blank" title="On Rutracker"><img alt="On Rutracker" src="http://static.rutracker.org/favicon.ico" /></a>'
  $('#action-box').append('<br/>' + tmdurl);
  $('#action-box').append(ruturl);
}
else
{
  tmdurl = '<a class="btn2 btn2_text_on large title-trailer" href="http://torrentsmd.com/browse.php?imdb=' + movieId + '" target="_blank" title="On TMD"><span class="btn2_text"><img alt="On TMD" src="http://torrentsmd.com/favicon.ico" /></span></a>';
  ruturl = '<a class="btn2 btn2_text_on large title-trailer" href="http://rutracker.org/forum/tracker.php?nm=' + movieName + '" target="_blank" title="On Rutracker"><span class="btn2_text"><img alt="On Rutracker" src="http://static.rutracker.org/favicon.ico" /></span></a>';
  $('#overview-bottom').append(tmdurl);
  $('#overview-bottom').append(ruturl);
}
