// ==UserScript==
// @name        IMDB+
// @description Adds links to external sources of the same content, includind trailers on youtube, movie on kinopoisk, torrents on torrentsmd/rutracker
// @namespace   http://n-e-s.info/
// @include     http://www.imdb.com/title/tt*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     2.0.2
// ==/UserScript==

$(document).ready(function(){
  var m   = {};
  m.id    = location.pathname.match(/([0-9]{7})/g)[0]; // movie id
  m.name  = escape((location.pathname.match(/combined/)) ? $('title').text().replace(' (TV)', '') : $('#ratingWidget p strong').text()); // movie name

  var l = {}; // here goes the config for all features
  // l.ex  = ["name", "link url", "link title", "image url", "image text"];
  l.tmd = ["Torrents.md", "http://torrentsmd.com/browse.php?imdb=" + m.id, "On TMD", "http://torrentsmd.com/favicon.ico", "On TMD"];
  l.rut = ["Rutracker", "http://rutracker.org/forum/tracker.php?nm=" + m.name, "On Rutracker", "http://static.rutracker.org/favicon.ico", "On Rutracker"];
  l.yt  = ["Youtube", "https://www.youtube.com/results?search_query=" + m.name + " official trailer", "Trailer on Youtube", "https://s.ytimg.com/yt/favicon-vfldLzJxy.ico", "Trailer on Youtube"];
  l.kp  = ["Kinopoisk", "http://www.kinopoisk.ru/index.php?first=yes&kp_query=" + m.name, "On Kinopoisk", "http://kinsburg.ru/images/kinopoisk-icon.png", "On Kinopoisk"];

  var h = '<div id="imdbplus"><hr><h4>IMDB+ Features:</h4>';
  for (var i in l)
  {
    h += '<a class="imdbplus-button linkasbutton-secondary" href="' + l[i][1] + '" target="_blank" title="' + l[i][2] + '"><img alt="' + l[i][4] + '" src="' + l[i][3] + '" /></a>'; // add each features from config
  }
  h += '</div>';
  $((location.pathname.match(/combined/)) ? '#action-box' : '#title-overview-widget').append(h);

  var s = "<style>#title-overview-widget #imdbplus{padding: 5px 0 0 230px;} #title-overview-widget #imdbplus a{margin: 5px 1px;}</style>"; // css styles
  $("head").append(s);
});
