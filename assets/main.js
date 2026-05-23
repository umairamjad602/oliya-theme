(function ($) {
  "use strict";
  jQuery(document).ready(function() {
    // menu toggler js
    $("button.navbar-toggle").on('click', function() {
      $(".main-menu-area").addClass("active");
      $(".mm-fullscreen-bg").addClass("active");
      $("body").addClass("ov-hidden");
    });
    $(".close-box").on('click', function() {
      $(".main-menu-area").removeClass("active");
      $(".mm-fullscreen-bg").removeClass("active");
      $("body").removeClass("ov-hidden");
    });
    // filter button js
    $("button.filter-button").on('click', function() {
      $(".filter-sidebar").addClass("active");
      $(".mm-fullscreen-bg").addClass("active");
    });
    $("button.close-filter-sidebar").on('click', function() {
      $(".filter-sidebar").removeClass("active");
      $(".mm-fullscreen-bg").removeClass("active");
    });
    // body background color js
    $(".mm-fullscreen-bg").on('click',function() {
      $(".main-menu-area").removeClass("active");
      $(".filter-sidebar").removeClass("active");
      $(".mm-fullscreen-bg").removeClass("active");
      $("body").removeClass("hidden");
    });
    $('.checkout-btn .read-agree').on('click', function () {
      if($('.cust-checkbox').is(':checked')) {
        $('.checkout-btn button.check-btn').removeAttr('disabled');
      }
      else {
        $('.checkout-btn button.check-btn').attr('disabled', 'disabled');
      }
    });
    $('.read-agree').on('click', function () {
      if($('.create-checkbox').is(':checked')) {
        $('.create').removeAttr('disabled');
      }
      else {
        $('.create').attr('disabled', 'disabled');
      }
    });
    $('.full-view, .zoom').on('click', function() {
      $('.product_img_top').magnificPopup({
        delegate: 'a',
        type:'image',
        showCloseBtn: true,
        closeBtnInside: false,
        midClick: true,
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0,1]
        }
      }).magnificPopup('open');
    });
    $('.play-button, .popup-vimeo, .popup-gmaps').magnificPopup({
      tClose: 'Close (Esc)',
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
    function cardSwapImage($card, newSrc) {
      var $img = $card.find('.product-image .img1 img');
      $img.off('load.swap error.swap');
      $img.css('opacity', 0);
      $img.one('load.swap error.swap', function() {
        $(this).css('opacity', 1);
      });
      $img[0].src = newSrc;
      $img[0].srcset = newSrc;
      // If image was already cached the load event fired synchronously before .one()
      if ($img[0].complete) {
        $img.off('load.swap error.swap');
        $img.css('opacity', 1);
      }
    }

    $(document).on('click', '.item-data', function(e) {
      e.stopPropagation();
      $(this).closest('.card-inline-swatches, .option-block').find('.variant-option').removeClass('active-variant');
      $(this).closest('form-wrap').addClass('active-variant');
      var it_img = $(this).attr('dataimg');
      var $card = $(this).closest('.single-product-wrap');
      if (it_img) {
        cardSwapImage($card, it_img);
        $card.find('.pro-img').data('slideIndex', 0);
      }
      var price = $(this).attr('dataprice');
      var compareprice = $(this).attr('datacompare');
      $card.find('.price-box .new-price').text(Shopify.formatMoney(price, window.money_format));
      if (compareprice > price) {
        $card.find('.price-box .old-price').show().html(Shopify.formatMoney(compareprice, window.money_format));
      } else {
        $card.find('.price-box .old-price').hide();
      }
    });

    $(document).on('click', '.card-img-arrow', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $card = $(this).closest('.single-product-wrap');
      var $proImg = $card.find('.pro-img');
      var urlStr = $proImg.attr('data-media-urls');
      if (!urlStr) return;
      var urls = urlStr.split('||');
      var total = urls.length;
      var current = parseInt($proImg.data('slideIndex') || 0, 10);
      current = $(this).hasClass('card-img-next')
        ? (current + 1) % total
        : (current - 1 + total) % total;
      $proImg.data('slideIndex', current);
      cardSwapImage($card, urls[current]);
    });
    var swiper = new Swiper('.drawer-slider', {
      slidesPerView: 1,
      grid: {
        rows: 1,
        fill: 'row' | 'column',
      },
      spaceBetween: 30,
      navigation: {
        nextEl: '.arrow-next-drawer',
        prevEl: '.arrow-prev-drawer',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      speed: 1000,
    });
  // Comprehensive worldwide color name map (CSS named colors are handled by the browser probe below)
  var EXTRA_COLORS = {
    // --- WHITES & NEAR-WHITES ---
    'cream':'#FFFDD0','offwhite':'#FAF9F6','eggshell':'#F0EAD6','bone':'#E3DAC9',
    'oyster':'#F4ECD8','pearl':'#F0EAD6','chalk':'#F2F0EB','cotton':'#FFFAFA',
    'milk':'#FDFEFE','natural':'#F5F0E8','oatmeal':'#D0C9B1','muslin':'#EDE8D0',
    'parchment':'#F1E9D2','ecru':'#C2B280','vanilla':'#F3E5AB','buttercream':'#FDF4DC',
    'antique':'#FAEBD7','porcelain':'#F7F5EF','alabaster':'#F2F0EB',
    'birch':'#E8E0D5','cloud':'#F3F4F8','powder':'#FFF0F5',

    // --- BLACKS & NEAR-BLACKS ---
    'jet':'#343434','onyx':'#353935','ebony':'#555D50','ink':'#1F1E33',
    'raven':'#073763','licorice':'#1A1110','offblack':'#0A0A0A','blackbean':'#3D0C02',
    'obsidian':'#1B1B1B','carbon':'#2B2B2B','nightfall':'#222244',

    // --- GRAYS ---
    'ash':'#B2BEB5','smoke':'#738276','fog':'#C1BBB3','steel':'#71797E',
    'pewter':'#96A8A1','graphite':'#474A51','stone':'#928E85','pebble':'#A0998D',
    'flint':'#6C6A6A','concrete':'#918E85','iron':'#4E5754','titanium':'#878681',
    'gunmetal':'#2A3439','warmgray':'#9F9B91','coolgray':'#8E9297','charcoal':'#36454F',
    'thunder':'#4A4A4A','gravel':'#9E9E9E','heathergray':'#B6B8BA','lightcharcoal':'#545454',
    'silvergray':'#C0C0C8','slategrey':'#708090','dovewhite':'#EDE8E0',

    // --- PINKS ---
    'blush':'#FFB7C5','dustyrose':'#DCAE96','dustypink':'#D8A0A0',
    'babypink':'#FFB6C1','blushpink':'#FFB3BA','blushrose':'#F4BBBB',
    'rosegold':'#B76E79','nude':'#E8D0B0','nudepink':'#F2C9B0',
    'petal':'#E8B4B8','bubblegum':'#FFC1CC','flamingo':'#FC8EAC',
    'cameo':'#EFBBCC','ballet':'#F4C2C2','millennial':'#E8C5C5',
    'powderpink':'#FFD1DC','carnation':'#FFA6C9','primrose':'#FF80AA',
    'watermelon':'#FC6C85','strawberry':'#FC5A8D','dragonfruit':'#DD4488',
    'rose':'#FF007F','rosewater':'#FFE4E1','smoothie':'#F08080',
    'punch':'#DC4C46','blossom':'#FFB7C5','magnolia':'#F8F4FF',
    'fairypink':'#FADADD','teagreen':'#D0F0C0','prettypink':'#FF69B4',

    // --- REDS ---
    'scarlet':'#FF2400','ruby':'#9B111E','cherry':'#DE3163',
    'carmine':'#960018','vermillion':'#E34234','vermilion':'#E34234',
    'brick':'#CB4154','raspberry':'#872657','cranberry':'#9C0E40',
    'garnet':'#73342D','claret':'#7F1734','wine':'#722F37',
    'burgundy':'#800020','oxblood':'#4A0000','blood':'#880808',
    'redwood':'#A45A52','cerise':'#DE3163','amaranth':'#E52B50',
    'poppy':'#E35335','lobster':'#D2042D','candy':'#FF0040',
    'comet':'#C23B22','cinnabar':'#E34234','alizarin':'#E32636',
    'venetianred':'#C80815','cadmiumred':'#E30022','naplesred':'#CF3A2A',

    // --- ORANGES ---
    'tangerine':'#F28500','mandarin':'#F37A48','clementine':'#E96321',
    'pumpkin':'#FF7518','burntsienna':'#E97451','burntumber':'#8A3324',
    'paprika':'#8D0000','ginger':'#B06500','cognac':'#9A463D',
    'toffee':'#A0785A','caramel':'#C68642','cinnamon':'#D2691E',
    'clay':'#CC7357','terracotta':'#E2725B','rust':'#B7410E',
    'burntorange':'#CC5500','marigold':'#EAA220','apricot':'#FBCEB1',
    'mango':'#FDBE02','cantaloupe':'#FF8C59','papaya':'#FF9B50',
    'spice':'#9F4520','bronze':'#CD7F32','copper':'#B87333',
    'ember':'#CF7227','cider':'#B5631C','cayenne':'#9B2335',

    // --- YELLOWS ---
    'mustard':'#FFDB58','amber':'#FFBF00','honey':'#FFB347',
    'canary':'#FFFF99','butter':'#FFFACD','banana':'#FFE135',
    'sunshine':'#FFFD37','straw':'#E4D96F','sand':'#C2B280',
    'champagne':'#F7E7CE','blonde':'#FAF0BE','citrine':'#E4D00A',
    'saffron':'#F4C430','sunflower':'#FFDA29','daffodil':'#FFFF31',
    'lemon':'#FFF44F','citrus':'#F5C400','maize':'#FBEC5D',
    'goldenrod':'#DAA520','flaxen':'#EEDC82','corn':'#FBEC5D',
    'softyellow':'#FAF884','cream2':'#FFFBDC','wheat2':'#F5DEB3',

    // --- GREENS ---
    'sage':'#9DC183','sagegreen':'#9DC183','seafoam':'#93E9BE',
    'mint':'#98FF98','mintgreen':'#98FF98','spearmint':'#A2E4B8',
    'huntergreen':'#355E3B','huntgreen':'#355E3B','bottlegreen':'#006A4E',
    'mossgreen':'#8A9A5B','pinegreen':'#01796F','armygreen':'#4B5320',
    'militarygreen':'#4B5320','camouflage':'#78866B','jungle':'#29AB87',
    'emerald':'#50C878','jade':'#00A86B','viridian':'#40826D',
    'malachite':'#0BDA51','shamrock':'#45CEA2','pistachio':'#93C572',
    'avocado':'#568203','fern':'#4F7942','basil':'#5B8C5A',
    'eucalyptus':'#5F8575','celery':'#B5C7A3','artichoke':'#8F9779',
    'forest':'#228B22','pine':'#01796F','bottle':'#006A4E',
    'swamp':'#698B69','matcha':'#7BAE7F','herb':'#6E8B3D',
    'cactus':'#587B6F','lichen':'#8D9E84','laurel':'#749975',
    'ivy':'#568203','cypress':'#3D6B4F','ferngreen':'#4F7942',
    'moss':'#8A9A5B','grass':'#7CFC00','apple':'#8DB600',
    'peridot':'#AEDC60','citrus2':'#86A939','tropical':'#00827F',
    'racing':'#004225','british':'#004B23',

    // --- BLUES ---
    'cobalt':'#0047AB','cobaltblue':'#0047AB','denim':'#1560BD',
    'periwinkle':'#CCCCFF','babyblue':'#89CFF0','dustyblue':'#6699CC',
    'iceblue':'#99C5C4','glacier':'#80B3C4','peacockblue':'#005F69',
    'tealblue':'#367588','ocean':'#0077BE','sea':'#006994',
    'arctic':'#E8F8FF','polar':'#DAECED','chambray':'#7A8FA6',
    'cadet':'#536872','admiral':'#0050A0','sapphire':'#0F52BA',
    'prussianblue':'#003153','cerulean':'#007BA7','airsuperiorityblue':'#72A0C1',
    'carolinablue':'#99BADD','robinegg':'#00CCCC','tiffany':'#0ABAB5',
    'stonewash':'#738CA6','airforceblue':'#5D8AA8','wedgwood':'#4E7DA6',
    'steel2':'#4682B4','hyacinth':'#5E7DAF','bluebell':'#9999CC',
    'sky':'#87CEEB','lagoon':'#00827F','nordic':'#1D3557','abyss':'#020035',

    // --- PURPLES ---
    'lilac':'#C8A2C8','mauve':'#E0B0FF','wisteria':'#C9A0DC',
    'heather':'#B69BC5','amethyst':'#9966CC','plum':'#8E4585',
    'eggplant':'#614051','grape':'#6F2DA8','aubergine':'#614051',
    'mulberry':'#C54B8C','boysenberry':'#873260','merlot':'#73343A',
    'pansy':'#78184A','iris':'#5A4FCF','byzantium':'#702963',
    'tyrian':'#66023C','puce':'#CC8899','dustylavender':'#B57EDC',
    'dustypurple':'#7B5BA6','orchidpink':'#F2BDCD','thistle2':'#D8BFD8',
    'lavendermist':'#E6D8E5','grapeade':'#8B5E83','violetpurple':'#8B00FF',
    'ube':'#8878C3','periwinklepurple':'#7070CC',

    // --- BROWNS ---
    'mocha':'#967969','espresso':'#4C3024','walnut':'#773F1A',
    'mahogany':'#C04000','chestnut':'#954535','auburn':'#A52A2A',
    'camel':'#C19A6B','toffee2':'#A0785A','russet':'#80461B',
    'sepia':'#704214','burlywood':'#DEB887','mink':'#9F9085',
    'taupe':'#483C32','mushroom':'#A9927D','otter':'#A0785A',
    'beaver':'#9F8170','truffle':'#8B7355','pecan':'#C9883B',
    'almond':'#EFDECD','hazel':'#8E7618','wenge':'#645452',
    'tobacco':'#9C7A3C','teak':'#9D7A54','sandalwood':'#B48A6A',
    'driftwood':'#AF9483','bark':'#8B6914','acorn':'#8B6914',
    'cognac2':'#9A463D','brandy':'#87421F','cocoa':'#8B5742',
    'coffee':'#6F4E37','java':'#5B3427','espresso2':'#4C3024',

    // --- NEUTRALS & SKIN TONES ---
    'nude2':'#E8D0B0','skin':'#FFCBA4','flesh':'#FFB380',
    'blush2':'#F2D2BD','ivory2':'#FFFFF0','buff':'#F0DC82',
    'bisque2':'#FFE4C4','wheat3':'#F5DEB3','linen2':'#FAF0E6',
    'beige2':'#F5F5DC','khaki2':'#C3B091','desert':'#C19A6B',
    'dune':'#C2B280','oat':'#D0C9B1','sesame':'#D2A679',

    // --- TEALS & AQUAS ---
    'teal2':'#008080','aquateal':'#00827F','petrol':'#005F69',
    'darkteal':'#006B6B','deepocean':'#004080','petroleum':'#0B3D91',
    'slate2':'#708090','steelblue2':'#4682B4','cadetblue2':'#5F9EA0',

    // --- METALLICS ---
    'rosegold':'#B76E79','platinum':'#E5E4E2','chrome':'#C0C0C0','brass':'#B5A642',
    'antiquegold':'#CFB53B','warmgold':'#D4AC0D','coldsilver':'#A8A9AD',

    // --- COMPOUND / MODIFIER COMBOS (commonly used in product options) ---
    // Off- variants
    'offwhite':'#FAF9F6','offblack':'#0A0A0A','offgray':'#A9A9A9','offgrey':'#A9A9A9',
    // Faded / Muted / Washed variants
    'fadedblack':'#3D3D3D','fadedblue':'#7B9EB9','fadedgreen':'#7D9B76',
    'fadedred':'#C17878','fadedpink':'#E8B4B8','fadeddenim':'#7C9FC2',
    'mutedgreen':'#8B9E7A','mutedblue':'#7A8FA6','mutedred':'#C47A7A',
    'mutedpink':'#D4A0A0','mutedgray':'#9E9E9E','mutedgrey':'#9E9E9E',
    'mutedolive':'#8F8B5C','mutedkhaki':'#9E9878','mutedolivekhaki':'#9B8B5E',
    'washedblue':'#A8C5DA','washedgreen':'#A3BF9B','washedblack':'#4A4A4A',
    'washedred':'#CC8888','washeddenim':'#9BBFD4',
    // Dusty variants
    'dustyblue':'#6699CC','dustyrose':'#DCAE96','dustypink':'#D8A0A0',
    'dustygreen':'#7A9B76','dustylavender':'#B57EDC','dustyorange':'#D4895A',
    // Olive compounds
    'olivekhaki':'#9B8840','olivedrab':'#6B8E23','olivegreen':'#708050',
    'olivebrown':'#8B7340','olivegray':'#8A8A6A','olivegrey':'#8A8A6A',
    // Khaki compounds
    'khakigreen':'#8B864E','khakibrown':'#9E8A5A','khakigray':'#9B9880',
    // Navy compounds
    'navyblue':'#000080','navygray':'#3D4F6B','navygrey':'#3D4F6B',
    // Heather / Marled
    'heathergray':'#B6B8BA','heathergrey':'#B6B8BA','heatherblue':'#8899BB',
    'heathergreen':'#7A9E7E','heatherpurple':'#9B7BB0',
    // Stone / Slate / Slate compounds
    'stonegray':'#928E85','stonegrey':'#928E85','slategray':'#708090',
    'slategrey':'#708090','stoneblue':'#7A8FA6',
    // Teal compounds
    'tealgreen':'#00827F','tealblue':'#367588','deepteal':'#003D40',
    // Cream / Ivory compounds
    'creamwhite':'#FFFDD0','ivorywhite':'#FFFFF0','softwhite':'#F8F8F0',
    // Black compounds
    'jetblack':'#0A0A0A','midnightblack':'#1A1A2E','softblack':'#2B2B2B',
    'trueblack':'#000000','coldblack':'#1C1C1C',
    // Blue compounds
    'steelblue2':'#4682B4','babyblue':'#89CFF0','powderblue':'#B0E0E6',
    'icyblue':'#CCE5F3','royalblue':'#4169E1','deepblue':'#003399',
    // Green compounds
    'deepgreen':'#005500','brightgreen':'#00C000','mintgreen':'#98FF98',
    'sagegreen':'#9DC183','forestgreen':'#228B22','seafoamgreen':'#93E9BE',
    'huntergreen':'#355E3B','bottlegreen':'#006A4E','mossgreen':'#8A9A5B',
    // Red compounds
    'deepred':'#8B0000','brightred':'#FF0000','darkred':'#8B0000',
    'winecolor':'#722F37','cherryred':'#990011','rubyred':'#9B111E',
    // Pink compounds
    'deeprose':'#C21E56','babypink':'#FFB6C1','hotpink':'#FF69B4',
    'neonpink':'#FF6EC7','lightpink':'#FFB6C1','darkpink':'#E75480',
    // Purple compounds
    'deeppurple':'#4B0082','brightpurple':'#8A00E6','lavenderblue':'#CCCCFF',
    // Brown compounds
    'darkbrown':'#654321','lightbrown':'#B5651D','redbrown':'#8B2500',
    // Gray / Grey compounds
    'lightgray':'#D3D3D3','lightgrey':'#D3D3D3','darkgray':'#A9A9A9',
    'darkgrey':'#A9A9A9','warmgray':'#9F9B91','warmgrey':'#9F9B91',
    'coolgray':'#8E9297','coolgrey':'#8E9297','bluegray':'#6B8FB0',
    'bluegrey':'#6B8FB0','greengray':'#8A9E80','greengrey':'#8A9E80'
  };

  // Words that describe a quality/shade but aren't colors themselves
  var COLOR_MODIFIERS = [
    'faded','muted','washed','dusty','smoky','smokey','misty','hazy','chalky',
    'light','dark','deep','pale','bright','vivid','rich','soft','clear','pure',
    'antique','vintage','weathered','aged','classic','raw','warm','cool',
    'neutral','mid','medium','extra','ultra','super','barely','slightly','very',
    'solid','plain','flat','matte','pastel','neon','metallic','shiny','glossy',
    'bold','true','real','slight','burnt','tinted','shaded','toned','slightly',
    'dirty','clean','fresh','soft','subtle','earthy','natural','organic',
    'electric','neon','bright','vivid','dull','heather','marled','melange'
  ];

  // Use the browser to parse any standard CSS named color → hex
  function browserHex(key) {
    var probe = document.createElement('div');
    probe.style.color = key;
    if (!probe.style.color) return null; // browser rejected it — not a CSS color
    probe.style.display = 'none';
    document.body.appendChild(probe);
    var rgb = window.getComputedStyle(probe).color;
    document.body.removeChild(probe);
    var p = rgb.match(/\d+/g);
    if (!p || p.length < 3) return null;
    return '#' + p.slice(0, 3).map(function(n) {
      return ('0' + parseInt(n, 10).toString(16)).slice(-2);
    }).join('');
  }

  // Try a single normalised key against the map then the browser
  function tryKey(key) {
    return EXTRA_COLORS[key] || browserHex(key) || null;
  }

  function resolveColorName(rawName) {
    // Split on ANY separator: space, hyphen, underscore, slash, dot, comma
    var words = rawName.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')   // replace all non-alphanum with space
      .split(/\s+/)
      .filter(Boolean);

    if (!words.length) return null;

    // Strip leading modifier words (e.g. "faded" in "faded black")
    while (words.length > 1 && COLOR_MODIFIERS.indexOf(words[0]) !== -1) words.shift();
    // Strip trailing modifier words (e.g. "toned" in "olive toned")
    while (words.length > 1 && COLOR_MODIFIERS.indexOf(words[words.length - 1]) !== -1) words.pop();

    // 1. Try all words joined (e.g. "off white" → "offwhite", "olive khaki" → "olivekhaki")
    var joined = words.join('');
    var hex = tryKey(joined);
    if (hex) return hex;

    // 2. Try last word first (usually the base color: "navy blue" → "blue")
    //    then first word (dominant: "olive khaki" → "olive")
    var orderedWords = words.length > 1
      ? [words[words.length - 1], words[0]].concat(words.slice(1, -1))
      : words;

    for (var i = 0; i < orderedWords.length; i++) {
      var w = orderedWords[i];
      if (COLOR_MODIFIERS.indexOf(w) !== -1) continue; // skip modifiers
      hex = tryKey(w);
      if (hex) return hex;
    }

    // 3. Try progressive pairs joined (e.g. "dusty rose pink" → "dustyrose", "rosepink")
    for (var j = 0; j < words.length - 1; j++) {
      hex = tryKey(words[j] + words[j + 1]);
      if (hex) return hex;
    }

    return null;
  }

  function applySwatchHex(elements, hex) {
    elements.forEach(function(el) {
      el.classList.remove('swatch--unavailable');
      el.classList.add('color-swatch', 'cust-check');
      el.style.setProperty('--swatch--background', hex);
      el.style.backgroundColor = hex;
    });
  }

  function resolveColorSwatches(scope) {
    var root = scope || document;
    var colorMap = {};

    function addToMap(rawName, el) {
      var name = (rawName || '').trim();
      if (!name) return;
      if (!colorMap[name]) colorMap[name] = [];
      if (colorMap[name].indexOf(el) === -1) colorMap[name].push(el);
    }

    // Product-page swatches — label always has title="{{ value }}"
    root.querySelectorAll('label[title].op-lb, label[title].cust-checkbox-label').forEach(function(label) {
      var swatch = label.querySelector('.color-swatch, .swatch');
      if (swatch) addToMap(label.getAttribute('title'), swatch);
    });

    // Collection-grid inline swatches
    root.querySelectorAll('.inline-swatch[title]').forEach(function(el) {
      addToMap(el.getAttribute('title'), el);
    });

    // Explicit data-color-name fallback
    root.querySelectorAll('[data-color-name]').forEach(function(el) {
      addToMap(el.getAttribute('data-color-name'), el);
    });

    Object.keys(colorMap).forEach(function(name) {
      var hex = resolveColorName(name);
      if (hex) applySwatchHex(colorMap[name], hex);
    });
  }

  resolveColorSwatches();

  document.addEventListener('color-swatches:refresh', function(e) {
    resolveColorSwatches(e.detail && e.detail.scope);
  });

  });
})(jQuery);