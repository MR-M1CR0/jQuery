$('.container').hover(
  function () {
    $(this).animate(
      {
        left: '0',
      },
      1000
    );
  },
  function () {
    $(this).animate(
      {
        left: '-100px',
      },
      1000
    );
  }
);

$('h2').on('click', function () {
  $(this).parent().find('ul').slideToggle();
  $(this).parent().siblings().find('ul').slideUp();
});
