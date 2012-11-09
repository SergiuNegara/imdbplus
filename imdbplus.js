// ==UserScript==
// @name        IMDB+
// @description Adds links to external sources of the same content, includind trailers on youtube, movie on kinopoisk, torrents on torrentsmd/rutracker
// @namespace   http://n-e-s.info/
// @include     http://www.imdb.com/title/tt*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     3.0.0
// ==/UserScript==

jQuery(document).ready(function($)
{
  var m  = {};
  m.Id   = getMovieId();
  m.Tt   = getMovieTt()

  var l = {};
  // l.ex  = ["name", "link url", "title or alt text", "image url", "newtab{1,0}"];
  l.tmd  = ["Torrentsmd", "http://torrentsmd.com/browse.php?imdb=" + m.Id, "On TMD", "tmd.ico", 1];
  l.rut  = ["Rutracker", "http://rutracker.org/forum/tracker.php?nm=" + m.Tt, "On Rutracker", "rutracker.ico", 1];
  l.yt   = ["Youtube", "https://www.youtube.com/results?search_query=" + m.Tt + " official trailer", "Trailer on Youtube", "youtube.ico", 1];
  l.kp   = ["Kinopoisk", "http://www.kinopoisk.ru/index.php?first=yes&kp_query=" + m.Tt, "On Kinopoisk", "kinopoisk.ico", 1];
  l.wiki = ["Wikipedia", "http://en.wikipedia.org/wiki/Special:Search?search=" + m.Tt, "Wiki", "wikipedia.ico", 1];
  l.osub = ["OpenSubtitles", "http://www.opensubtitles.org/en/search/sublanguageid-all/imdbid-" + m.Id, "Subs on OpenSubtitles", "opensubs.ico", 1];
  l.ssc  = ["Subscene", "http://subscene.com/s.aspx?q=" + m.Tt, "Subs on Subscene", "subscene.ico", 1];

  l.opts = ["Settings", "#", "Open settings frame", "settings.ico", 0];


  stylize(); // add script styles
  imdbplus(); // do main action - add features to page

  $('#ImdbPlus-Settings').click(function(c)
  {
    c.preventDefault();
    console.log("clicked");
  });

  // Functions
  function getMovieTt() {
    var title = document.title.match(/^(.*) \(/)[1];
    return title;
  }

  function getMovieId() {
    var id = location.pathname.match(/title\/tt(.*?)\//i)[1];
    return id;
  }

  function stylize() {
    var s = 
      '#title-overview-widget #imdbplus{ padding: 5px 0 0 230px; }'+
      '#title-overview-widget #imdbplus a{ margin: 5px 1px; }'+
      '#title-overview-widget #imdbplus #ImdbPlus-Settings{ margin-left: 10px; }'+
      '#action-box #imdbplus #ImdbPlus-Settings{ margin-top: 10px; }';
    $("head").append("<style>" + s + "</style>");
  }

  function imdbplus() {
    var h = '<div id="imdbplus"><hr><h4>IMDB+ Features:</h4>';
    for (var i in l) {
      h += '<a class="imdbplus-button linkasbutton-secondary" id="ImdbPlus-' + l[i][0] + '" href="' + l[i][1] + '"' + ((l[i][4]) ? ' target="_blank"' : '') + ' title="' + l[i][2] + '"><img alt="' + l[i][2] + '" src="http://img.n-e-s.info/imdbplus/' + l[i][3] + '" /></a>'; // add each feature from config
    }
    h += '</div>';
    $((location.pathname.match(/combined/)) ? '#action-box' : '#title-overview-widget').append(h);
  }
});
