document.addEventListener('DOMContentLoaded', function() {



    //маска для телефона
    $.fn.setCursorPosition = function(pos) {
    const el = $(this).get(0);
    if (el.setSelectionRange) {
        el.setSelectionRange(pos, pos);
    } else if (el.createTextRange) {
        const range = el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
    return this;
    };

    $('input[type="tel"]')
    .mask('+7 (999) 999 99 99', { autoclear: false })
    .on('click', function(e) {
        const value = $(this).val();

        const clean = value.replace(/[^0-9]/g, '');

        if (clean.length <= 3) {
        e.preventDefault();
        $(this).setCursorPosition(4);
        }
    });





    const popup = document.querySelector('.popup');
    const openButtons = document.querySelectorAll('[data-popup="popup"]');
    const closeButton = popup?.querySelector('.popup__close');
    const body = document.querySelector('body')
    const opacite = document.querySelector('.opacite')

    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            popup?.classList.add('active');
            body.classList.add('hidden')
            opacite.classList.add('active')
        });
    });

    closeButton?.addEventListener('click', () => {
        popup?.classList.remove('active');
        body.classList.remove('hidden')
        opacite.classList.remove('active')
    });

    document.addEventListener('click', (e) => {
    const isPopupOpen = popup.classList.contains('active');
    const isClickOutside = !popup.contains(e.target) && !e.target.closest('[data-popup="popup"]');
    
        if (isPopupOpen && isClickOutside) {
            popup?.classList.remove('active');
            body.classList.remove('hidden');
            opacite.classList.remove('active');
        }
    });



    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 2,
        navigation: {
            nextEl: ".about__swiper-next",
            prevEl: ".about__swiper-prev",
        }
    })

    var swiperDoc = new Swiper(".docSwiper", {
        spaceBetween: 2,
        navigation: {
            nextEl: ".thanks__swiper-next",
            prevEl: ".thanks__swiper-prev",
        }
    })



})