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
// Бесконечность
document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем все слайдеры с классом 'container-slider__items' при загрузке страницы
  const sliders = document.querySelectorAll('.container-slider');
  sliders.forEach(container => {
      const slider = container.querySelector('.container-slider__items');

      // Создаем элемент счетчика и добавляем его в контейнер slider
      const counter = document.createElement('div');
      counter.classList.add('slider-counter');
      container.appendChild(counter); // Добавляем счетчик в контейнер слайдера

      // Инициализация слайдера с заданными настройками
      $(slider).slick({
          infinite: false,
          speed: 400,
          prevArrow: '<div class="prev-slider"><svg width="45" height="23" viewBox="0 0 45 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 11.3884C2.92208 12.6162 5.57851 14.111 8.02243 15.926C10.4664 17.7411 12.6446 19.823 14.6104 22.2787C14.6104 22.1185 14.6104 22.0118 14.6104 21.8516C14.6104 21.6915 14.6104 21.5313 14.6104 21.2644C14.6104 19.823 14.2385 18.3283 13.4416 16.8335C12.6446 15.3388 11.5289 13.7373 9.93507 12.1357H45V10.5876H9.98819C11.5821 8.9861 12.7509 7.38458 13.4947 5.88983C14.2385 4.39508 14.6635 2.90032 14.6635 1.45896C14.6635 0.0175913 14.6635 1.03189 14.6635 0.871735C14.6635 0.711583 14.6635 0.604815 14.6635 0.498047C12.6978 2.95371 10.4664 5.03568 8.07556 6.85074C5.63164 8.66579 2.97521 10.1605 0.106258 11.335L0 11.3884Z" fill="white"/></svg></div>',
          nextArrow: '<div class="next-slider"><svg width="45" height="23" viewBox="0 0 45 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M45 11.3884C42.0779 12.6162 39.4215 14.111 36.9776 15.926C34.5336 17.7411 32.3554 19.823 30.3896 22.2787C30.3896 22.1185 30.3896 22.0118 30.3896 21.8516C30.3896 21.6915 30.3896 21.5313 30.3896 21.2644C30.3896 19.823 30.7615 18.3283 31.5584 16.8335C32.3554 15.3388 33.4711 13.7373 35.0649 12.1357H0V10.5876H35.0118C33.4179 8.9861 32.2491 7.38458 31.5053 5.88983C30.7615 4.39508 30.3365 2.90032 30.3365 1.45896C30.3365 0.0175913 30.3365 1.03189 30.3365 0.871735C30.3365 0.711583 30.3365 0.604815 30.3365 0.498047C32.3022 2.95371 34.5336 5.03568 36.9244 6.85074C39.3684 8.66579 42.0248 10.1605 44.8937 11.335L45 11.3884Z" fill="white"/></svg></div>',
      });

      // Обновляем счетчик при смене слайда
      $(slider).on('afterChange', (event, slick, currentSlide) => {
          const totalSlides = slick.slideCount - 1; // Общее количество слайдов, за вычетом последнего
          if (currentSlide < totalSlides) {
              counter.textContent = `${currentSlide + 1}/${totalSlides}`; // Обновляем текст счетчика
              counter.style.display = 'block'; // Показываем счетчик
          } else {
              counter.style.display = 'none'; // Скрываем счетчик на последнем слайде
          }
      });

      // Инициализация счетчика для первого слайда
      $(slider).on('init', (event, slick) => {
          const totalSlides = slick.slideCount - 1; // Общее количество слайдов, за вычетом последнего
          if (totalSlides > 0) {
              counter.textContent = `1/${totalSlides}`; // Инициализация текста счетчика
          }
      });

      // Перезапуск слайдера для правильной инициализации
      $(slider).slick('setPosition');
  });

  // Создаем наблюдатель для отслеживания видимости слайдеров
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (!entry.isIntersecting) {
              // Если слайдер выходит из видимости, возвращаем его на первую позицию
              $(entry.target.querySelector('.container-slider__items')).slick('slickGoTo', 0);
          }
      });
  }, { threshold: 0.1 }); // Порог видимости, при котором срабатывает callback

  // Наблюдаем за каждым слайдером
  sliders.forEach(container => {
      observer.observe(container);
  });
});

document.addEventListener('scroll', () => {
  const sliderContainer = document.querySelector('.slider-container');
  const sliderItems = sliderContainer.children;
  const containerHeight = sliderContainer.scrollHeight;
  const scrollPosition = window.scrollY;

  // Если прокрутка доходит до конца блока, переносим первый элемент в конец
  if (scrollPosition + window.innerHeight >= containerHeight) {
      sliderContainer.appendChild(sliderItems[0]); // Перемещаем первый элемент в конец
      window.scrollTo(0, scrollPosition - sliderItems[0].offsetHeight); // Корректируем позицию скролла
  }

  // Если прокрутка доходит до начала блока, переносим последний элемент в начало
  if (scrollPosition <= 0) {
      sliderContainer.insertBefore(sliderItems[sliderItems.length - 1], sliderItems[0]); // Перемещаем последний элемент в начало
      window.scrollTo(0, sliderItems[0].offsetHeight); // Корректируем позицию скролла
  }
});

// Бесконечность

// СКРОЛЛ
let isTouchingScroll = false;

document.addEventListener("touchstart", function () {
  isTouchingScroll = true; // Обозначаем, что тач зажат
});

document.addEventListener("touchend", function () {
  isTouchingScroll = false; // Обозначаем, что тач отпущен
});

document.addEventListener("scroll", function () {
  if (isTouchingScroll) return; // Пропускаем выполнение скрипта, если тач зажат

  const main = document.querySelector(".main");
  const sliderContainerWrap = document.querySelector(".slider-container-wrap");
  const headerHeight = document.querySelector(".header").offsetHeight;

  // Проверка, если скролл страницы превышает высоту main
  if (
    !main.classList.contains("main__hidden") &&
    window.scrollY > main.offsetHeight - headerHeight
  ) {
    // Скрываем main и смещаем sliderContainerWrap
    main.classList.add("main__hidden");

    // Проверка ширины экрана и установка значения top
    if (window.innerWidth <= 1300) {
      sliderContainerWrap.style.top = "89px";
    } else {
      sliderContainerWrap.style.top = "2.12vw";
    }

    // Мгновенно прокручиваем страницу к позиции 2.12vw или 89px

    if (window.innerWidth <= 1300) {
      window.scrollTo(0, 0);
    } else {
      const scrollTopValue = (2.12 / 100) * window.innerWidth; // Перевод 2.12vw в пиксели
      window.scrollTo(0, scrollTopValue);
    }

    // Зафиксировать прокрутку страницы
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      // Снимаем фиксацию прокрутки после завершения анимации
      document.body.style.overflow = "";
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
