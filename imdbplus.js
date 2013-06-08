// ==UserScript==
// @name        IMDB+
// @description Adds links to external sources of the same content, includind trailers on youtube, movie on kinopoisk, torrents on torrentsmd/rutracker and subs on opensubtitles/subscene. Every feature can be enabled/disabled in settings.
// @namespace   http://n-e-s.info/
// @include     http://www.imdb.com/title/tt*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @updateURL   http://userscripts.org/scripts/source/133844.meta.js
// @version     3.0.4
// ==/UserScript==

jQuery(document).ready(function ($) {
  var m  = {};
  m.Id   = getMovieId();
  m.Tt   = getMovieTt();

  var l = {};
  // l.ex  = ["name", "link url", "title or alt text", "image url"];
  l.tmd  = ["Torrentsmd", "http://torrentsmd.com/browse.php?imdb=" + m.Id, "On TMD", "tmd.ico"];
  l.rut  = ["Rutracker", "http://rutracker.org/forum/tracker.php?nm=" + m.Tt, "On Rutracker", "rutracker.ico"];
  l.yt   = ["Youtube", "https://www.youtube.com/results?search_query=" + m.Tt + " official trailer", "Trailer on Youtube", "youtube.ico"];
  l.kp   = ["Kinopoisk", "http://www.kinopoisk.ru/index.php?first=yes&kp_query=" + m.Tt, "On Kinopoisk", "kinopoisk.ico"];
  l.wiki = ["Wikipedia", "http://en.wikipedia.org/wiki/Special:Search?search=" + m.Tt, "Wiki", "wikipedia.ico"];
  l.osub = ["OpenSubs", "http://www.opensubtitles.org/en/search/sublanguageid-all/imdbid-" + m.Id, "Subs on OpenSubs", "opensubs.ico"];
  l.ssc  = ["Subscene", "http://subscene.com/s.aspx?q=" + m.Tt, "Subs on Subscene", "subscene.ico"];

  // Functions
  function getMovieTt() {
    var title = document.title.replace(/^(.+) \((.*)([0-9]{4})(.*)$/gi, '$1 ($3)');
    return encodeURIComponent(title);
  }

  function getMovieId() {
    var id = location.pathname.match(/title\/tt(.*?)\//i)[1];
    return id;
  }

  function IMDbPlusStyle() {
    var s = 
      '#title-overview-widget #IMDbPlus { padding: 5px 0 0 230px; }'+
      '#title-overview-widget #IMDbPlus a { margin: 5px 1px; }'+
      '#title-overview-widget #IMDbPlus #IMDbPlus-Feature-Settings { margin-left: 10px; }'+
      '#action-box #IMDbPlus #IMDbPlus-Feature-Settings { margin-top: 10px; }'+

      '#IMDbPlus-SettingsBox { display: none; margin-left: -404px; padding: 20px; position: fixed; top: 10%; left: 50%; width: 768px; z-index: 999; }'+
      '#IMDbPlus-SettingsBox > h2 { font-size: 21px }'+
      '#IMDbPlus-SettingsBox > h4 { font-size: 15px }'+
      '#IMDbPlus-SettingsBox #IMDbPlus-Options { margin: 20px 0;}'+
      '#IMDbPlus-SettingsBox #IMDbPlus-Options .IMDbPlus-OptionField label { display: inline-block; width: 100px; }'+
      '#IMDbPlus-SettingsBox button { margin: 8px 0 0; }'+
      '#IMDbPlus-SettingsBox #IMDbPlus-SettingsBox-Close { float: right; }';
    GM_addStyle(s);
  }

  function IMDbPlusInit() {
    var fh, oh;
    fh = '<div id="IMDbPlus"><hr><h4>IMDB+ Features:</h4>';
    oh = '<div id="IMDbPlus-SettingsBox" class="aux-content-widget-2"><h2>IMDb+ Options</h2><h4>Control the features you want to show</h4><ul id="IMDbPlus-Options">';

    $.each(l, function (key,val) {
      if (GM_getValue("IMDbPlus-Option-" + val[0], 1))
      {
        fh += '<a class="IMDbPlus-Button linkasbutton-secondary" id="IMDbPlus-Feature-' + val[0] + '" href="' + val[1] + '" target="_blank" title="' + val[2] + '"><img alt="' + val[2] + '" src="http://img.n-e-s.info/imdbplus/' + val[3] + '"></a>';
      }
      oh += '<li id="IMDbPlus-Option-' + val[0] + '-Field" class="IMDbPlus-OptionField"><label for="IMDbPlus-Option-' + val[0] + '">' + val[0] + '</label> <input id="IMDbPlus-Option-' + val[0] + '" type="checkbox"' + ((GM_getValue("IMDbPlus-Option-" + val[0], 1)) ? ' checked' : '') + '></li>';
    });

    fh += '<a class="IMDbPlus-Button linkasbutton-secondary" id="IMDbPlus-Feature-Settings" title="Open settings frame"><img alt="Settings" src="http://img.n-e-s.info/imdbplus/settings.ico"></a></div>';
    oh +=
    '</ul><hr>'+
    '<button id="IMDbPlus-SettingsBox-Save" class="primary">Save</button>'+
    '<button id="IMDbPlus-SettingsBox-Close" class="primary">Close</button>'+
    '</div>';

    IMDbPlusStyle();

    $((location.pathname.match(/combined/)) ? '#action-box' : '#title-overview-widget').append(fh);
    $('body').append(oh);
  }

  IMDbPlusInit();

  function showOpts()
  {
    $('#wrapper').css('visibility', 'hidden').animate({ opacity: 0 }, 500);
    $('#IMDbPlus-SettingsBox').show(500);
  }

  function hideOpts()
  {
    $('#IMDbPlus-SettingsBox').hide(500);
    $('#wrapper').css('visibility', 'visible').animate({ opacity: 1 }, 500);
  }

  function saveOpts()
  {
    $('.IMDbPlus-OptionField').each(function()
    {
      var
      inputElm = $('input', this),
      inputId  = inputElm.attr('id');
      GM_setValue(inputId, (inputElm.is(":checked") ? 1 : 0))
    });
    hideOpts();
    window.location.reload();
  }

  // Interactions
  $('#IMDbPlus-Feature-Settings').click(showOpts);
  $('#IMDbPlus-SettingsBox-Close').click(hideOpts);
  $('#IMDbPlus-SettingsBox-Save').click(saveOpts);

  $(document).keyup(function(e){
    if(e.keyCode == 27) hideOpts();
  });
});
