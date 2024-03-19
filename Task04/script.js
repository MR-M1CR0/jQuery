$.fn.AhmedMahfouz = function () {
  var images = $(this);
  var currentImageIndex = 0;
  var overlay;

  // CSS styles for the plugin
  var styles = `
      <style>
        img {
            border: 3px solid #fff;
            visibility: visible;
        }
        .imgs-container {
            --size: 100px;
            display: grid;
            grid-template-columns: repeat(6, var(--size));
            grid-auto-rows: var(--size);
            margin-bottom: var(--size);
            place-items: start center;
            gap: 5px;
                &:has(:hover) img:not(:hover),
                &:has(:focus) img:not(:focus) {
                    filter: brightness(0.5) contrast(0.5);
        }
        & .gallery-img {
            object-fit: cover;
            width: calc(var(--size) * 2);
            height: calc(var(--size) * 2);
            clip-path: path('M90,10 C100,0 100,0 110,10 190,90 190,90 190,90 200,100 200,100 190,110 190,110 110,190 110,190 100,         200 100,200 90,190 90,190 10,110 10,110 0,100 0,100 10,90Z'
              );
            transition: clip-path 0.25s, filter 0.75s;
            grid-column: auto / span 2;
            border-radius: 5px;
                &:nth-child(5n - 1) {
                    grid-column: 2 / span 2;
        }
        &:hover,
        &:focus {
                    clip-path: path('M0,0 C0,0 200,0 200,0 200,0 200,100 200,100 200,100 200,200 200,200 200,200 100,200 100,200 100,200 100,200 0,200 0,200 0,100 0,100 0,100 0,100 0,100Z');
        z-index: 1;
        transition: clip-path 0.25s, filter 0.25s;
        }
        &:focus {
                    outline: 1px dashed black;
                    outline-offset: -5px;
                }
            }
        }
        .gallery-img:hover {
        cursor: pointer;
        }
        .overlay {
            font-family: 'Algerian';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
        }
        .overlay-img {
            width: 75%;
            height: 90%;
            object-fit: cover;
            border-radius: 50px;
            opacity: 0;
        }
        .overlay-img.fade-in {
            opacity: 1;
            transition: opacity 0.3s ease-in-out;
        }
        .overlay-img.fade-out {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        .close-btn {
            position: absolute;
            top: 10px;
            right: 50px;
            font-size: 50px;
            color: #fff;
            cursor: pointer;
            z-index: 2000;
            transition: all 0.25s, transform 0.25s;
        }
        .prev {
            position: absolute;
            top: 50%;
            left: 50px;
            font-size: 50px;
            color: #fff;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.25s, transform 0.25s;
        }
        .next {
            position: absolute;
            top: 50%;
            right: 50px;
            font-size: 50px;
            color: #fff;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.25s, transform 0.25s;
        }
        .prev:hover,
        .next:hover,
        .close-btn:hover {
            color: black;
            transform: scale(1.2);
        }
      </style>
    `;

  $('head').append(styles);

  images.on('click', function () {
    overlay = $('<div>', {
      id: 'overlay',
      class: 'overlay',
      html: `
          <span class="close-btn">x</span>
          <img id="overlay-img" class="overlay-img" />
          <a class="prev">&lt;&lt;</a>
          <a class="next">&gt;&gt;</a>
        `,
    });

    $('body').append(overlay);

    overlay.hide();

    $(document).on('keydown', function (e) {
      if (overlay.is(':visible')) {
        if (e.keyCode == 37) {
          changeImg(-1);
        } else if (e.keyCode == 39) {
          changeImg(1);
        } else if (e.keyCode == 27) {
          closeOverlay();
        }
      }
    });

    openOverlay(images.index(this));
  });

  function openOverlay(index) {
    currentImageIndex = index;
    updateOverlay();
    overlay.show();

    $('.prev').on('click', function () {
      changeImg(-1);
    });

    $('.next').on('click', function () {
      changeImg(1);
    });
  }

  function closeOverlay() {
    overlay.remove();
  }

  $(document).on('click', '.close-btn', function () {
    closeOverlay();
  });

  function changeImg(step) {
    currentImageIndex += step;
    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    updateOverlay();
  }

  function updateOverlay() {
    var overlayImg = $('#overlay-img');
    overlayImg.removeClass('fade-in');
    overlayImg.addClass('fade-out');
    setTimeout(function () {
      overlayImg.attr('src', images.eq(currentImageIndex).attr('src'));
      overlayImg.removeClass('fade-out');
      overlayImg.addClass('fade-in');
    }, 300);
  }
};

$(function () {
  $('.gallery-img').AhmedMahfouz();
});
