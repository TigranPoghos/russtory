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




    //попапы
    class PopupManager {
        constructor() {
            this.body = document.body;
            this.opacite = document.querySelector('.opacite');
            this.init();
        }

        init() {
            this.popups = document.querySelectorAll('.popup');

            this.popups.forEach(popup => {
                const popupId = popup.dataset.popupId || popup.id || `popup-${Math.random().toString(36).substr(2, 9)}`;
                popup.dataset.popupId = popupId;
                
                const openButtons = document.querySelectorAll(`[data-popup-open="${popupId}"]`);
                const closeButtons = popup.querySelectorAll('[data-popup-close]');

                openButtons.forEach(btn => {
                    btn.addEventListener('click', (e) => this.openPopup(e, popupId));
                });
                
                closeButtons.forEach(btn => {
                    btn.addEventListener('click', () => this.closePopup(popupId));
                });
            });
            
            document.addEventListener('click', (e) => this.handleOutsideClick(e));

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeAllPopups();
            });
        }

        openPopup(e, popupId) {
            e.preventDefault();
            e.stopPropagation();

            this.closeAllPopups();
            
            const popup = document.querySelector(`[data-popup-id="${popupId}"]`);
            if (!popup) return;
            
            popup.classList.add('active');
            this.body.classList.add('hidden');
            if (this.opacite) this.opacite.classList.add('active');

            this.activePopupId = popupId;
        }

        closePopup(popupId) {
            const popup = document.querySelector(`[data-popup-id="${popupId}"]`);
            if (!popup) return;
            
            popup.classList.remove('active');
            this.body.classList.remove('hidden');
            if (this.opacite) this.opacite.classList.remove('active');
            
            this.activePopupId = null;
        }

        closeAllPopups() {
            this.popups.forEach(popup => {
                popup.classList.remove('active');
            });
            
            this.body.classList.remove('hidden');
            if (this.opacite) this.opacite.classList.remove('active');
            this.activePopupId = null;
        }

        handleOutsideClick(e) {
            if (!this.activePopupId) return;
            
            const popup = document.querySelector(`[data-popup-id="${this.activePopupId}"]`);
            if (!popup) return;
            
            const isClickInsidePopup = popup.contains(e.target);
            const isClickOnOpenButton = e.target.closest(`[data-popup-open="${this.activePopupId}"]`);
            
            if (!isClickInsidePopup && !isClickOnOpenButton) {
                this.closePopup(this.activePopupId);
            }
        }
    }

    const popupManager = new PopupManager();



    //слайдеры
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



    //бургер меню
    const burger__js = document.querySelector('.burger__button');
    const body = document.querySelector('body')
    const burger__jsBody = document.querySelector('.burger__block');
    const opaciteHeader = document.querySelector('.opacite__header');
    const headerButtons = document.querySelectorAll('.header__button'); // Добавили

    function closeBurgerMenu() {
        burger__jsBody.classList.remove('active');
        body.classList.remove('hidden');
        opaciteHeader.classList.remove('active');
        burger__js.classList.remove('open');
    }

    burger__js.addEventListener('click', function(){
        burger__jsBody.classList.toggle('active');
        body.classList.toggle('hidden');
        opaciteHeader.classList.toggle('active');
        burger__js.classList.toggle('open');
    });

    headerButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeBurgerMenu();
        });
    });

    document.addEventListener('click', (e) => {
        const isClickOnBurger = e.composedPath().includes(burger__js);
        const isClickOnBurgerMenu = e.composedPath().includes(burger__jsBody);
        const isClickOnHeaderButton = e.target.closest('.header__button');

        const isMenuOpen = burger__jsBody.classList.contains('active');
        
        if (isMenuOpen && !isClickOnBurger && !isClickOnBurgerMenu) {
            closeBurgerMenu();
        }
    });





    //карточки
    const show__cards = document.querySelectorAll('.plus__card');
    const show__button = document.querySelector('.show__more');
    
    if (show__cards.length <= 6) {
        show__button.style.display = 'none';
        return;
    }

    for (let i = 6; i < show__cards.length; i++) {
        show__cards[i].classList.add('is-hidden');
    }
    
    show__button?.addEventListener('click', () => {
        const hiddenCards = document.querySelectorAll('.plus__card.is-hidden');
        
        if (hiddenCards.length > 0) {
            hiddenCards.forEach(card => {
                card.classList.remove('is-hidden');
            });
            show__button.style.display = 'none';
        }
    });





    //скролл по странице
    const buttons = document.querySelectorAll('.header__menu-item');
    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.dataset.scroll;
            if (!isIndex) {
                window.location.href = `index.html${targetId}`;
                return;
            }

            smoothScroll(targetId);
        });
    });

    if (isIndex && window.location.hash) {
        setTimeout(() => {
            smoothScroll(window.location.hash);
        }, 200);
    }

    function smoothScroll(targetId) {
        const section = document.querySelector(targetId);
        if (!section) return;

        const headerOffset = window.innerWidth >= 1024 ? 140 : 110;

        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }



    //анимации
    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray(".anim").forEach(elem => {
        gsap.fromTo(elem, 
            { opacity: 0, y: 20 }, 
            { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });






})