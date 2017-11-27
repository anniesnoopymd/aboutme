



//nav bar
$(window).scroll(function(e){
 if($(window).scrollTop()<=0)
    $(".explore,.navbar").addClass("at_top");
 else
    $(".explore,.navbar").removeClass("at_top");
});

$(document).on('click','a',function(event){
 event.preventDefault();
 var target = $(this).attr("href");
 $('html,body').animate({
    scrollTop: $(target).offset().top
 },500);

});

function bannerSwitcher() {
  next = $('.sec-1-input').filter(":checked").next('.sec-1-input');
  if (next.length) next.prop('checked', true);
  else $('.sec-1-input').first().prop('checked', true);
}

var bannerTimer = setInterval(bannerSwitcher, 5000);

$('nav .controls label').click(function() {
  clearInterval(bannerTimer);
  bannerTimer = setInterval(bannerSwitcher, 5000)
});

//marquee-wrap
function ($) {
$.fn.marquee = function( setting ){

  function rightToLeft( wrap, content, speed ){
    var width = 0;

    // 将内容复制四份，已解决单条公告循环滚动的问题
    content.append( content.html() );
    content.append( content.html() );


    content.find('li').each(function () {
      width += $(this).outerWidth();
    })

    content.width( width );


    function run() {
        if( wrap.scrollLeft() - (content.width() / 2) >= 0 ){
            wrap.scrollLeft( 0 );
        }else{
            wrap.scrollLeft( wrap.scrollLeft() + 1 );
        }
    }

    var timer = setInterval( run, speed );

    wrap.mouseover( function () {
        clearInterval( timer );
    } )

    wrap.mouseout( function () {
        timer = setInterval( run, speed );
    } )

  }

  function bottomToTop( wrap, content, speed ) {
      var noticeLength = content.find( 'li' ).length;
      var i = 0;

      function run() {
          content.animate({
              top: -i * wrap.height()
          }, function () {
              if( i < noticeLength-1 ){
                  i++;
              }else{
                  i = 0;
              }
          })
      }

      var timer = setInterval( run, speed );
      wrap.mouseover( function () {
          clearInterval( timer );
      } )
      wrap.mouseout( function () {
          timer = setInterval( run, speed );
      } )
  }

  function leftToRight( wrap, content, speed ){
    var width = 0;

    // 将内容复制四份，已解决单条公告循环滚动的问题
    content.append( content.html() );
    content.append( content.html() );

    content.find('li').each(function () {
      width += $(this).outerWidth();
    })

    content.width( width );
    wrap.scrollLeft( content.width() )

    function run() {
        if( wrap.scrollLeft() - (content.width() / 2) == 0 ){
          wrap.scrollLeft( content.width() );
        }else{
          wrap.scrollLeft( wrap.scrollLeft() - 1 );
        }
    }

    var timer = setInterval( run, speed );

    wrap.mouseover( function () {
        clearInterval( timer );
    } )

    wrap.mouseout( function () {
        timer = setInterval( run, speed );
    } )
  }

  return this.each(function(){
    var wrap = $(this);
    var content = wrap.find( setting.container );

    var animateType = wrap.attr('type');

    if ( animateType == 'right-to-left' ){
      content.addClass( animateType );
      rightToLeft( wrap, content, setting.speed );
    }

    if ( animateType == 'left-to-right' ){
      content.addClass( animateType );
      leftToRight( wrap, content, setting.speed );
    }

    if ( animateType == 'static' ){
        content.addClass( animateType );
    }

    if ( animateType == 'bottom-to-top' ){
        content.addClass( animateType );
        bottomToTop( wrap, content, setting.speed );
    }

  })
}
}(jQuery)

var setting = {
  container: '.marquee-content',
  speed: 50
}
$('.marquee-wrap').marquee( setting );
//
//clock
$('#clock').fitText(1.3);
  function update() {
    $('#clock').html(moment().format('D MMMM YYYY'));
  }

  setInterval(update, 1000);

  //count
  (function ($) {
$.fn.countTo = function (options) {
options = options || {};

return $(this).each(function () {
  // set options for current element
  var settings = $.extend({}, $.fn.countTo.defaults, {
    from:            $(this).data('from'),
    to:              $(this).data('to'),
    speed:           $(this).data('speed'),
    refreshInterval: $(this).data('refresh-interval'),
    decimals:        $(this).data('decimals')
  }, options);

  // how many times to update the value, and how much to increment the value on each update
  var loops = Math.ceil(settings.speed / settings.refreshInterval),
    increment = (settings.to - settings.from) / loops;

  // references & variables that will change with each update
  var self = this,
    $self = $(this),
    loopCount = 0,
    value = settings.from,
    data = $self.data('countTo') || {};

  $self.data('countTo', data);

  // if an existing interval can be found, clear it first
  if (data.interval) {
    clearInterval(data.interval);
  }
  data.interval = setInterval(updateTimer, settings.refreshInterval);

  // initialize the element with the starting value
  render(value);

  function updateTimer() {
    value += increment;
    loopCount++;

    render(value);

    if (typeof(settings.onUpdate) == 'function') {
      settings.onUpdate.call(self, value);
    }

    if (loopCount >= loops) {
      // remove the interval
      $self.removeData('countTo');
      clearInterval(data.interval);
      value = settings.to;

      if (typeof(settings.onComplete) == 'function') {
        settings.onComplete.call(self, value);
      }
    }
  }

  function render(value) {
    var formattedValue = settings.formatter.call(self, value, settings);
    $self.html(formattedValue);
  }
});
};

$.fn.countTo.defaults = {
from: 0,               // the number the element should start at
to: 0,                 // the number the element should end at
speed: 1000,           // how long it should take to count between the target numbers
refreshInterval: 100,  // how often the element should be updated
decimals: 0,           // the number of decimal places to show
formatter: formatter,  // handler for formatting the value before rendering
onUpdate: null,        // callback method for every time the element is updated
onComplete: null       // callback method for when the element finishes updating
};

function formatter(value, settings) {
return value.toFixed(settings.decimals);
}
}(jQuery));

jQuery(function ($) {
// custom formatting example
$('.count-number').data('countToOptions', {
formatter: function (value, options) {
return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
}
});

// start all the timers
$('.timer').each(count);

function count(options) {
var $this = $(this);
options = $.extend({}, options || {}, $this.data('countToOptions') || {});
$this.countTo(options);
}
});


'use strict';

var activeIndex = 0;
var limit = 0;
var disabled = false;
var $stage = undefined;
var $controls = undefined;
var canvas = false;

var SPIN_FORWARD_CLASS = 'js-spin-fwd';
var SPIN_BACKWARD_CLASS = 'js-spin-bwd';
var DISABLE_TRANSITIONS_CLASS = 'js-transitions-disabled';
var SPIN_DUR = 1000;

var appendControls = function appendControls() {
for (var i = 0; i < limit; i++) {if (window.CP.shouldStopExecution(1)){break;}
    $('.carousel__control').append('<a href="#" data-index="' + i + '"><\/a>');
}
// window.CP.exitedLoop(1);

var height = $('.carousel__control').children().last().outerHeight();

$('.carousel__control').css('height', 30 + limit * height);
$controls = $('.carousel__control').children();
$controls.eq(activeIndex).addClass('active');
};

var setIndexes = function setIndexes() {
$('.spinner').children().each(function (i, el) {
    $(el).attr('data-index', i);
    limit++;
});
};

var duplicateSpinner = function duplicateSpinner() {
var $el = $('.spinner').parent();
var html = $('.spinner').parent().html();
$el.append(html);
$('.spinner').last().addClass('spinner--right');
$('.spinner--right').removeClass('spinner--left');
};

var paintFaces = function paintFaces() {
$('.spinner__face').each(function (i, el) {
    var $el = $(el);
    var color = $(el).attr('data-bg');
    $el.children().css('backgroundImage', 'url(' + getBase64PixelByColor(color) + ')');
});
};

var getBase64PixelByColor = function getBase64PixelByColor(hex) {
if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.height = 1;
    canvas.width = 1;
}
if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, 1, 1);
    return canvas.toDataURL();
}
return false;
};

var prepareDom = function prepareDom() {
setIndexes();
paintFaces();
duplicateSpinner();
appendControls();
};

var spin = function spin() {
var inc = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

if (disabled) return;
if (!inc) return;
activeIndex += inc;
disabled = true;

if (activeIndex >= limit) {
    activeIndex = 0;
}

if (activeIndex < 0) {
    activeIndex = limit - 1;
}

var $activeEls = $('.spinner__face.js-active');
var $nextEls = $('.spinner__face[data-index=' + activeIndex + ']');
$nextEls.addClass('js-next');

if (inc > 0) {
    $stage.addClass(SPIN_FORWARD_CLASS);
} else {
    $stage.addClass(SPIN_BACKWARD_CLASS);
}

$controls.removeClass('active');
$controls.eq(activeIndex).addClass('active');

setTimeout(function () {
    spinCallback(inc);
}, SPIN_DUR, inc);
};

var spinCallback = function spinCallback(inc) {

$('.js-active').removeClass('js-active');
$('.js-next').removeClass('js-next').addClass('js-active');
$stage.addClass(DISABLE_TRANSITIONS_CLASS).removeClass(SPIN_FORWARD_CLASS).removeClass(SPIN_BACKWARD_CLASS);

$('.js-active').each(function (i, el) {
    var $el = $(el);
    $el.prependTo($el.parent());
});
setTimeout(function () {
    $stage.removeClass(DISABLE_TRANSITIONS_CLASS);
    disabled = false;
}, 100);
};

var attachListeners = function attachListeners() {

document.onkeyup = function (e) {
    switch (e.keyCode) {
        case 38:
            spin(-1);
            break;
        case 40:
            spin(1);
            break;
    }
};

$controls.on('click', function (e) {
    e.preventDefault();
    if (disabled) return;
    var $el = $(e.target);
    var toIndex = parseInt($el.attr('data-index'), 10);
    spin(toIndex - activeIndex);
});
};

var assignEls = function assignEls() {
$stage = $('.carousel__stage');
};

var init = function init() {
assignEls();
prepareDom();
attachListeners();
};

$(function () {
init();
});
