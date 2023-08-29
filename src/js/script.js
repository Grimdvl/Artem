const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close'),
      btnLink = document.querySelector('.promo__link'),
      btnAbout = document.querySelector('.promo__about');
    // async function translation() {
    //     const translateElements = document.querySelectorAll('.translate');
    
    //     translateElements.forEach(item => {
    //         item.addEventListener('click', async function() {
    //             const lang = this.getAttribute('id');
    //             const languageElements = document.querySelectorAll('.language');
                
    //             try {
    //                 const response = await fetch('./db.json');
    //                 const languageData = await response.json();
    
    //                 languageElements.forEach(function(langElement) {
    //                     const key = langElement.getAttribute('key');
    //                     langElement.textContent = languageData[lang][key];
    //                 });
    //             } catch (error) {
    //                 console.error('Error fetching data from db.json:', error);
    //             }
    //         });
    //     });
    // }
    // translation();
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