'use strict'

document.addEventListener('DOMContentLoaded', function() {
    const navigation = document.querySelectorAll('.navigation__circles__item'),
          hamburger = document.querySelector('.promo__hamburger'),
          menu = document.querySelector('.menu'),
          menuItem = document.querySelectorAll('.menu__link__item'),
          closeElem = document.querySelector('.menu__close');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    navigation.forEach(item => {
        const parent = item.parentNode;
        // Появляеться надпись при наведении на элемент
        parent.addEventListener('mouseenter', () => {
            if (!parent.classList.contains("active")) {
                item.classList.add('active'); 
                parent.classList.add('li-active');
            }
        });

        parent.addEventListener('mouseleave', () => {
            item.classList.remove('active');
            parent.classList.remove('li-active');
        });

        parent.addEventListener('click', () => {
            // Получаем ссылку из дочернего элемента <a>
            const link = parent.querySelector('a');
            // Проверяем, существует ли ссылка и имеет ли она href
            if (link && link.href) {
                // Выполняем переход по ссылке
                window.location.href = link.href;
            }
        });
    });

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
      
        sections.forEach(section => {
            const top = window.scrollY, // Получаем текущую позицию прокрутки страницы
                  offset = section.offsetTop - 400, // Вычисляем верхнюю границу раздела с учетом смещения 400 пикселей
                  height = section.offsetHeight; // Получаем высоту раздела

            if (top >= offset && top < offset + height) {
            // Если текущая позиция прокрутки находится внутри раздела
                navigation.forEach(navigation => {
                    const link = document.querySelector(`a[href="#${section.id}"]`),// Находим ссылку, соответствующую текущему разделу
                          linkParent = link.closest('li'), // Находим родительский элемент ссылки (элемент списка)
                          navigationParent = navigation.parentNode; // Находим родительский элемент навигационного элемента

                    navigation.classList.remove('activeScroll'); // Удаляем класс "active" у всех навигационных элементов
                    link.classList.add('activeScroll'); // Добавляем класс "active" к текущей ссылке
                    navigationParent.classList.remove('li-activeScroll'); // Удаляем класс "li-active" у родительского элемента навигационного элемента
                    linkParent.classList.add('li-activeScroll'); // Добавляем класс "li-active" к родительскому элементу текущей ссылки
                });
                menuItem.forEach(menuItem => {
                    const link = document.querySelector(`a[href="#${section.id}"]`),// Находим ссылку, соответствующую текущему разделу
                          linkParent = link.closest('li'), // Находим родительский элемент ссылки (элемент списка)
                          menuItemParent = menuItem.parentNode; // Находим родительский элемент навигационного элемента
                    
                    menuItemParent.classList.remove('li-activeScroll'); // Удаляем класс "li-active" у родительского элемента навигационного элемента
                    linkParent.classList.add('li-activeScroll'); // Добавляем класс "li-active" к родительскому элементу текущей ссылки
                });
            } else if (top <= 400) {
            // Если текущая позиция прокрутки находится выше первого раздела
                navigation.forEach(navigation => {
                    const navigationParent = navigation.parentNode; // Находим родительский элемент навигационного элемента
      
                    navigation.classList.remove('activeScroll'); // Удаляем класс "active" у всех навигационных элементов
                    navigationParent.classList.remove('li-activeScroll'); // Удаляем класс "li-active" у родительского элемента навигационного элемента
                });
                menuItem.forEach(menuItem => {
                    const menuItemParent = menuItem.parentNode; // Находим родительский элемент навигационного элемента
        
                    menuItemParent.classList.remove('li-activeScroll'); // Удаляем класс "li-active" у родительского элемента навигационного элемента
                });
            }
        });
    });
    
    function changeLanguage(lang) {
        const buttons = document.querySelectorAll('.promo__buttons__item');
        const wrappers = document.querySelectorAll('.contacts__wrapper');
        const nameLeft = document.querySelector('.name-left');
        const surNameLeft = document.querySelector('.surname-left');
        const rightProfession = document.querySelector('.right-profession');

        // Добавить класс .active выбранной кнопке и удалить его у остальных
        buttons.forEach(button => {
            button.classList.remove('active');
        });
    
        document.querySelector(`#${lang}`).classList.add('active');
    
        if (lang === 'ua') {
            surNameLeft.classList.remove('en');
            nameLeft.classList.remove('en');
            rightProfession.classList.remove('en');
            nameLeft.classList.add('ua');
        } else if (lang === 'ru') {
            nameLeft.classList.remove('ua');
            surNameLeft.classList.remove('en');
            nameLeft.classList.remove('en');
            rightProfession.classList.remove('en');
        }
        else if (lang === 'en') {
            nameLeft.classList.remove('ua');
            surNameLeft.classList.add('en');
            nameLeft.classList.add('en');
            rightProfession.classList.add('en');
        }
    
        // Скрыть все элементы и показать только нужный язык
        wrappers.forEach(wrapper => wrapper.style.display = 'none');
        document.querySelector(`.contacts__wrapper.${lang}`).style.display = 'flex';
    }
    
    const buttons = document.querySelectorAll('.promo__buttons__item');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.id;
            changeLanguage(lang);
        });
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

    new WOW().init();
});