window.addEventListener('DOMContentLoaded', function () {
    //Tabs
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'), // псевдомассив заголовков(табов)
        info = document.querySelector('.info-header'), //родитель табов
        tabContent = document.querySelectorAll('.info-tabcontent'); // весь контент с картинками, текстом и тд

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        };
    };
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        };
    };
    info.addEventListener('click', function (e) {
        let target = e.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                };
            };
        };
    });
    //Timer
    let deadline = '2021-03-19';

    function GetTime(endtime) {
        let res = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((res / 1000) % 60),
            minutes = Math.floor((res / 1000 / 60) % 60),
            hours = Math.floor((res / 1000 / 60 / 60) % 24),
            days = Math.floor((res / 1000 / 60 / 60 / 24))
        return {
            'total': res,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours,
            'days': days
        }
    }

    function SetTime(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            days = timer.querySelector('.days'),
            en = timer.querySelector('.en');


        setInterval(RefreshTime, 1000);

        function RefreshTime() {
            let t = GetTime(endtime);

            function addZero(n) {
                if (n <= 9) {
                    return '0' + n;
                } else {
                    return n;
                }
            }

            if (t.total >= 0) {
                days.textContent = addZero(t.days);
                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);
                if (+days.textContent % 10 == 0 || +days.textContent % 10 == 5 || +days.textContent % 10 == 6 || +days.textContent % 10 == 7 || +days.textContent % 10 == 8 || +days.textContent % 10 == 9) {
                    en.textContent = "дней";
                } else if (+days.textContent % 10 == 1) {
                    en.textContent = "день";
                }

            } else {
                clearInterval(RefreshTime);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                days.textContent = '00';
            }
        }
    }
    SetTime('timer', deadline);


    // Modal
    let btnMore = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    btnMore.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash'),
            document.body.style.overflow = "hidden";
    });
    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        overlay.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
    let btnDescr = document.querySelectorAll('.description-btn');
    for (let i = 0; i < 4; i++) {
        btnDescr[i].addEventListener('click', function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash'),
                document.body.style.overflow = "hidden";
        });
    }


    /* Form */
    let message = {
        loading: "Load...",
        succses: "Спасибо, скоро мы с вами свяжемся!",
        failer: "Что-то пошло не так!"
    };

    let form = document.querySelector('.main-form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');


    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);


        request.addEventListener('readystatechange', () => {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState == 4 && request.status == 200) {
                statusMessage.innerHTML = message.succses;
            } else {
                statusMessage.innerHTML = message.failer + " Ошибка сервера №" + request.status;
            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = "";
        }
    })

    /* Contact form */

    let contactForm = document.getElementById('form');


    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.appendChild(statusMessage);

        let secondReq = new XMLHttpRequest();
        secondReq.open('POST', 'server.php');
        secondReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        let formData2 = new FormData(contactForm);
        secondReq.send(formData2);


        secondReq.addEventListener('readystatechange', () => {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState == 4 && request.status == 200) {
                statusMessage.innerHTML = message.succses;
            } else {
                statusMessage.innerHTML = message.failer + " Ошибка сервера №" + request.status;
            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = "";
        }
    })


    /* Slider*/

    let slideIndex = 1,   // индекс текущего изображения в карусели
        slides = document.querySelectorAll('.slider-item'), //получаем класс со всеми изображениями
        prev = document.querySelector('.prev'),   //кнопка назад
        next = document.querySelector('.next'),   // кнопка вперед
        sliderDots = document.querySelector('.slider-dots'),  //все точки для скролла(их родитель)
        dots = document.querySelectorAll('.dot');  // получаем все точки в псевдо-массив

    function showSlides(index){
        if (index > slides.length){
            slideIndex = 1;
        }
        if (index < 1){
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');
    };
    showSlides(1);

    function plusSlide(n){
        showSlides(slideIndex += n);
    }

    function currentSlide(n){
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function(){
        plusSlide(-1);
    });
    next.addEventListener('click', ()=>{
        plusSlide(1);
    })
    sliderDots.addEventListener('click', function(e){
        for (let i = 1; i < dots.length+1; i++){
            if (e.target.classList.contains('dot') && e.target == dots[i-1]){
                currentSlide(i);
            }
        }
    })  

    /* Calc */

    let getPeople = document.querySelectorAll('.counter-block-input')[0],
        getDays = document.querySelectorAll('.counter-block-input')[1],
        totalValue = document.getElementById('total'),
        base = document.getElementById('select'),
        personSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;


    getPeople.addEventListener('change', function(){
        personSum = +this.value;
        total = (personSum * 15000) * getDays.value;

        if (getDays.value == ' '){
            totalValue.innerHTML = 0;
        }else{
            totalValue.innerHTML = total;
        }
    })

    getDays.addEventListener('change', function(){
        daysSum = +this.value;
        total = (personSum * 5000) * getDays.value;

        if (getPeople.value == ' '){
            totalValue.innerHTML = 0;
        }else{
            totalValue.innerHTML = total;
        }
    })


    base.addEventListener('change', function(){
        if (getDays.value == ' ' || getPeople.value == ' '){
            totalValue.innerHTML = 0;
        }else{
            let n = total;
            totalValue.innerHTML = n * this.options[this.selectedIndex].value;
        }
    });
});