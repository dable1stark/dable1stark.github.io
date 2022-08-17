$(function() {

    var header = $("#header"),
        headerH = $("#header").innerHeight(),
        scrollOffset = $(window) .scrollTop();

    /*Header fixed*/

    chekScroll(scrollOffset);

    $(window).on("scroll",function () {
        scrollOffset = $(this).scrollTop();

        chekScroll(scrollOffset);
    });

    function chekScroll(scrollOffset) {

        if( scrollOffset >= headerH ) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }

    /*Smooth scroll*/

    $(document).ready(function(){
        $("#nav").on("click","a", function (event) {
            event.preventDefault();

            var id  = $(this).attr('href'),
                top = $(id).offset().top;

            $('body,html').animate({scrollTop: top}, 1000);
        });
    });

    /*Menu nav toggle*/

    $("#nav__toggle").on("click",function(event) {
        event.preventDefault();

        $("#nav").toggleClass("active");
        $("#header").toggleClass("active")
    });

});

/*function Header(selector) {
    let menu = $(selector);
    let button = menu.find('.nav-toggle', '.nav-toggle__item');
    let links = menu.find('.nav__link');
    let overlay = menu.find('.intro');

    button.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    links.on('click', () => toggleMenu());
    overlay.on('click', () => toggleMenu());

    function toggleMenu(){
        menu.toggleClass('nav-toggle__item_active');

        if (menu.hasClass('nav-toggle__item_active')) {
            $('body').css('overlow', 'hidden');
        } else {
            $('body').css('overlow', 'visible');
        }
    }
}

burgerMenu('.burger-menu');*/


function init() {
    let map = new ymaps.Map('map-test', {
        center: [53.117924, 50.166246],
        zoom: 17
    });

    let placemark = new ymaps.Placemark([53.117924, 50.166246], {}, {});

    let mapCafe = new ymaps.Map('map-cafe', {
        center: [53.078491, 50.231042],
        zoom: 17
    });

    let placemarkCafe = new ymaps.Placemark([53.078491, 50.231042], {}, {});

    setMapSettings(map, placemark);
    setMapSettings(mapCafe, placemarkCafe);
}

function setMapSettings(map, placemark){
    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил

    map.geoObjects.add(placemark);
}

ymaps.ready(init);

document.addEventListener('DOMContentLoaded', function(){
    function getTimeRemaining(endtime) {
        var time = new Date(new Date(endtime) - new Date());

        if (time < 0) {
            var seconds = 0;
            var minutes = 0;
            var hours = 0;
            var days = 0;
        } else {
            var seconds = time.getSeconds();
            var minutes = time.getMinutes();
            var hours = time.getHours();
            var days = Math.ceil(time / (1000 * 3600 * 24));
        }

        const dateObj = {
            total: time,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }

        return dateObj;
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id)
        ;
        if (!clock) return;
        var daysSpan = clock.querySelector('.t415__days');
        var hoursSpan = clock.querySelector('.t415__hours');
        var minutesSpan = clock.querySelector('.t415__minutes');
        var secondsSpan = clock.querySelector('.t415__seconds');

        function updateClock() {
            var time = getTimeRemaining(endtime);
            if (time.days >= 100) {
                daysSpan.innerHTML = time.days;
            } else {
                daysSpan.innerHTML = ('0' + time.days).slice(-2);
            }
            hoursSpan.innerHTML = ('0' + time.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);
            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }

        updateClock();
        var timeInterval = setInterval(updateClock, 1000);
    }

    var deadlineDate = "2022-08-26".trim();
    var deadlineTime = "14:30".trim();
    var deadlineUtc = "+03:00".trim();
    if (deadlineUtc.charAt(0) !== '-' && deadlineUtc.charAt(0) !== '+') {
        deadlineUtc = '+' + deadlineUtc;
    }
    var deadtine = new Date(deadlineDate + 'T' + ('0' + deadlineTime).slice(-5) + deadlineUtc);
    initializeClock('t415__timer320688468', 'Aug 26, 2022');
});
