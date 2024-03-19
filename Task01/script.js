$('img').hover(function () {
  var clone = $(this).clone();
  clone.css({
    position: 'absolute',
    width: '300px',
    height: '300px',
  });

  $(this).on('mousemove', function (event) {
    $('body').append(clone);
    var cloneWidth = clone.outerWidth();
    var pageWidth = $(window).width();

    if (event.pageX + cloneWidth + 5 > pageWidth) {
      clone.css({
        top: event.pageY + 5,
        left: event.pageX - cloneWidth - 5,
      });
    } else {
      clone.css({
        top: event.pageY + 5,
        left: event.pageX + 5,
      });
    }
  });

  $(this).mouseleave(function () {
    clone.remove();
  });
});
