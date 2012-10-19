// ==UserScript==
// @name        IMDB+
// @description Adds links to external sources of the same content, includind trailers on youtube, movie on kinopoisk, torrents on torrentsmd and torrents on rutracker
// @namespace   http://n-e-s.info/
// @include     http://www.imdb.com/title/tt*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1.3
// ==/UserScript==


$(document).ready(function(){
  if(location.pathname.match(/combined/))
  {
    movieId   = location.pathname.match(/([0-9]{7})/g);
    movieName = $('title').text();
    tmdurl    = '<a class="linkasbutton-secondary" href="http://torrentsmd.com/browse.php?imdb=' + movieId + '" target="_blank" title="On TMD"><img alt="On TMD" src="http://torrentsmd.com/favicon.ico" /></a>';
    ruturl    = '<a class="linkasbutton-secondary" href="http://rutracker.org/forum/tracker.php?nm=' + movieName + '" target="_blank" title="On Rutracker"><img alt="On Rutracker" src="http://static.rutracker.org/favicon.ico" /></a>';
    ytburl    = '<a class="linkasbutton-secondary" href="https://www.youtube.com/results?search_query=' + movieName + ' official trailer" target="_blank" title="Trailer on Youtube">img alt="Trailer on Youtube" src="https://s.ytimg.com/yt/favicon-vfldLzJxy.ico" /></a>';
    kpurl     = '<a class="linkasbutton-secondary" href="http://www.kinopoisk.ru/index.php?first=yes&kp_query=' + movieName + '" target="_blank" title="On Kinopoisk"><img alt="On Kinopoisk.ru" src="http://kinsburg.ru/images/kinopoisk-icon.png" /></a>';
    $('#action-box').append('<br/>' + ytburl + kpurl + tmdurl + ruturl);
  }
  else
  {
    movieId   = location.pathname.match(/([0-9]{7})/g);
    movieName = $('title').text().replace(' - IMDb', '');
    tmdurl    = '<a class="btn2 btn2_text_on large title-trailer" href="http://torrentsmd.com/browse.php?imdb=' + movieId + '" target="_blank" title="On TMD"><span class="btn2_text"><img alt="On TMD" src="http://torrentsmd.com/favicon.ico" /></span></a>';
    ruturl    = '<a class="btn2 btn2_text_on large title-trailer" href="http://rutracker.org/forum/tracker.php?nm=' + movieName + '" target="_blank" title="On Rutracker"><span class="btn2_text"><img alt="On Rutracker" src="http://static.rutracker.org/favicon.ico" /></span></a>';
    ytburl    = '<a class="btn2 btn2_text_on large title-trailer" href="http://rutracker.org/forum/tracker.php?nm=' + movieName + '" target="_blank" title="Trailer on Youtube"><span class="btn2_text"><img alt="Trailer on Youtube" src="https://s.ytimg.com/yt/favicon-vfldLzJxy.ico" /></span></a>';
    kpurl     = '<a class="btn2 btn2_text_on large title-trailer" href="http://www.kinopoisk.ru/index.php?first=yes&kp_query=' + movieName + '" target="_blank" title="On Kinopoisk"><span class="btn2_text"><img alt="On Kinopoisk.ru" src="http://kinsburg.ru/images/kinopoisk-icon.png" /></span></a>';
    $('#overview-bottom').append(ytburl + kpurl + tmdurl + ruturl);
  }
});
