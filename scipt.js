// $(document).ready(function () {
//   const list = document.querySelector(".slider-container");
//   const mainBlock = document.querySelector(".main");
//   let cloneCount = 0; // Счетчик текущих пачек дублей
//   const maxClones = 3; // Максимальное количество пачек дублей

//   // Инициализация slick-слайдера
//   const initializeSlick = () => {
//     $(".container-slider__items").slick({
//       infinite: false,
//       speed: 400,
//     });
//   };

//   // Проверяем, существует ли элемент перед инициализацией
//   if (list && mainBlock) {
//     // Запускаем slick при загрузке страницы
//     initializeSlick();

//     const cloneItems = (direction) => {
//       let items = Array.from(list.querySelectorAll(".container-slider"));

//       if (cloneCount < maxClones) {
//         // Дублируем слайды и добавляем в указанном направлении
//         items.forEach((item) => {
//           const clonedItem = item.cloneNode(true);
//           if (direction === "up") {
//             list.insertBefore(clonedItem, list.firstChild);
//           } else if (direction === "down") {
//             list.appendChild(clonedItem);
//           }
//         });

//         // Увеличиваем счетчик дублей
//         cloneCount++;
//       } else {
//         // Удаляем первую пачку дублей, чтобы освободить место для новых
//         let clones = list.querySelectorAll(".container-slider");
//         for (let i = 0; i < items.length; i++) {
//           if (clones[i].parentNode === list) {
//             list.removeChild(clones[i]);
//           }
//         }
//         cloneCount--; // Уменьшаем счетчик дублей после удаления старых
//       }
//     };

//     // Добавление дублей при достижении определенного положения прокрутки
//     document.addEventListener("scroll", function () {
//       const mainRect = mainBlock.getBoundingClientRect();

//       if (mainRect.bottom <= 65 && !mainBlock.classList.contains("hidden")) {
//         mainBlock.classList.add("hidden");
//         cloneItems("up");
//         list.scrollTop = list.scrollHeight / 2; // Сохраняем плавность прокрутки
//       }
//     });

//     // Обработчик события прокрутки для добавления дублей вниз
//     list.addEventListener("scroll", function () {
//       if (this.scrollTop >= this.scrollHeight - this.clientHeight - 1) {
//         cloneItems("down");
//         // Устанавливаем scrollTop для продолжения бесконечной прокрутки
//         this.scrollTop -= list.querySelectorAll(".container-slider")[0].clientHeight * items.length / maxClones;
//       }
//     });
//   } else {
//     console.warn("Элементы .slider-container или .main не найдены на странице.");
//   }
// });

// СКРОЛЛ
let isTouching = false;

document.addEventListener('touchstart', function () {
  isTouching = true; // Обозначаем, что тач зажат
});

document.addEventListener('touchend', function () {
  isTouching = false; // Обозначаем, что тач отпущен
});

document.addEventListener('scroll', function () {
  if (isTouching) return; // Пропускаем выполнение скрипта, если тач зажат

  const main = document.querySelector('.main');
  const sliderContainerWrap = document.querySelector('.slider-container-wrap');
  const headerHeight = document.querySelector('.header').offsetHeight;

  // Проверка, если скролл страницы превышает высоту main
  if (!main.classList.contains('main__hidden') && window.scrollY > main.offsetHeight - headerHeight) {
    // Скрываем main и смещаем sliderContainerWrap
    main.classList.add('main__hidden');

    // Проверка ширины экрана и установка значения top
    if (window.innerWidth <= 1300) {
      sliderContainerWrap.style.top = '89px';
    } else {
      sliderContainerWrap.style.top = '2.12vw';
    }

    // Мгновенно прокручиваем страницу к самому верху
    window.scrollTo(0, 0);

    // Зафиксировать прокрутку страницы
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      // Снимаем фиксацию прокрутки после завершения анимации
      document.body.style.overflow = '';
    }, 500); // Задержка на время анимации
  }
});
// СКРОЛЛ


// Открытие блока о себе и моб меню
const openAbout = document.querySelectorAll("#open-about");
const burger = document.querySelector(".burger");
openAbout.forEach((el) => {
  el.onclick = () => {
    document.querySelector(".about-block").classList.toggle("active");
    document.querySelector(".header").classList.toggle("active");
  };
});
burger.onclick = () => {
  document.querySelector(".psevdo-nav").classList.toggle("active");
  document.querySelector(".about-block.active").classList.remove("active");
};



// var swiper = new Swiper('.slider-container', {
//   direction: 'vertical',
//   mousewheelControl: true,
//   slidesPerView: 1,
//   freeMode: true,
//   freeModeSticky: true
// });

