const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close'),
      btnLink = document.querySelector('.promo__link'),
      btnAbout = document.querySelector('.promo__about');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__ratings-counter'),
      lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});

btnAbout.addEventListener('click', () => {
    btnAbout.classList.add('btn');
    btnLink.classList.remove('btn');
});

btnLink.addEventListener('click', () => {
    btnLink.classList.add('btn');
    btnAbout.classList.remove('btn');
});

$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        // $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});