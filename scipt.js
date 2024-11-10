$(document).ready(function () {
  const list = document.querySelector(".slider-container");
  const mainBlock = document.querySelector(".main");
  let cloneCount = 0; // Счетчик текущих пачек дублей
  const maxClones = 3; // Максимальное количество пачек дублей

  // Инициализация slick-слайдера
  const initializeSlick = () => {
    $(".container-slider__items").slick({
      infinite: false,
      speed: 400,
    });
  };

  // Проверяем, существует ли элемент перед инициализацией
  if (list && mainBlock) {
    // Запускаем slick при загрузке страницы
    initializeSlick();

    const cloneItems = (direction) => {
      let items = Array.from(list.querySelectorAll(".container-slider"));

      if (cloneCount < maxClones) {
        // Дублируем слайды и добавляем в указанном направлении
        items.forEach((item) => {
          const clonedItem = item.cloneNode(true);
          if (direction === "up") {
            list.insertBefore(clonedItem, list.firstChild);
          } else if (direction === "down") {
            list.appendChild(clonedItem);
          }
        });

        // Увеличиваем счетчик дублей
        cloneCount++;
      } else {
        // Удаляем первую пачку дублей, чтобы освободить место для новых
        let clones = list.querySelectorAll(".container-slider");
        for (let i = 0; i < items.length; i++) {
          if (clones[i].parentNode === list) {
            list.removeChild(clones[i]);
          }
        }
        cloneCount--; // Уменьшаем счетчик дублей после удаления старых
      }
    };

    // Добавление дублей при достижении определенного положения прокрутки
    document.addEventListener("scroll", function () {
      const mainRect = mainBlock.getBoundingClientRect();

      if (mainRect.bottom <= 65 && !mainBlock.classList.contains("hidden")) {
        mainBlock.classList.add("hidden");
        cloneItems("up");
        list.scrollTop = list.scrollHeight / 2; // Сохраняем плавность прокрутки
      }
    });

    // Обработчик события прокрутки для добавления дублей вниз
    list.addEventListener("scroll", function () {
      if (this.scrollTop >= this.scrollHeight - this.clientHeight - 1) {
        cloneItems("down");
        // Устанавливаем scrollTop для продолжения бесконечной прокрутки
        this.scrollTop -= list.querySelectorAll(".container-slider")[0].clientHeight * items.length / maxClones;
      }
    });
  } else {
    console.warn("Элементы .slider-container или .main не найдены на странице.");
  }
});

// СКРОЛЛ

// СКРОЛЛ

// // Выбираем все видео на странице
// const videos = document.querySelectorAll("video");

// // Функция для инициализации наблюдателя после первого взаимодействия с пользователем
// function initVideoObserver() {
//   // Создаем наблюдатель, чтобы контролировать воспроизведение видео в зависимости от его видимости
//   const videoObserver = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         const video = entry.target;

//         if (entry.isIntersecting) {
//           // Когда видео попадает в видимую область, сбрасываем и запускаем с начала
//           video.currentTime = 0;
//           video.play().catch((error) => {
//             console.log("Автовоспроизведение не удалось: ", error);
//           });
//           // Отменяем таймер сброса, если видео уже проигрывается
//           clearTimeout(video.resetTimeout);
//         } else {
//           // При выходе из видимости ставим на паузу
//           video.pause();

//           // Устанавливаем таймер для сброса к началу через 1 секунду
//           video.resetTimeout = setTimeout(() => {
//             video.currentTime = 0;
//           }, 1000);
//         }
//       });
//     },
//     {
//       threshold: 0.5, // Половина видео должна быть видна, чтобы началось воспроизведение
//     }
//   );

//   // Подключаем наблюдатель к каждому видео и отключаем звук для разрешения автовоспроизведения
//   videos.forEach((video) => {
//     video.muted = true; // Отключаем звук для автозапуска
//     videoObserver.observe(video);
//   });
// }

// // Ожидаем первого взаимодействия пользователя, чтобы инициализировать наблюдатель
// window.addEventListener("click", initVideoObserver, { once: true });
// window.addEventListener("scroll", initVideoObserver, { once: true });
// window.addEventListener("keydown", initVideoObserver, { once: true });

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

// document.addEventListener('scroll', () => {
//   const mainBlock = document.querySelector('.main');
//   const sliderContainer = document.querySelector('.slider-container');
//   const mainRect = mainBlock.getBoundingClientRect();

//   // Проверка, осталось ли 65 пикселей или меньше до того, как блок исчезнет из видимости
//   if (mainRect.bottom <= 65) {
//       if (!mainBlock.classList.contains('hidden')) {
//           mainBlock.classList.add('hidden');
//           mainBlock.style.height = '0';

//           // Устанавливаем задержку, чтобы скрыть элемент из потока после завершения анимации
//           setTimeout(() => {
//               mainBlock.style.display = 'none';
//           }, 300); // Длительность совпадает с CSS-переходом (0.3s)
//       }

//       if (sliderContainer && !sliderContainer.classList.contains('container-m-t')) {
//           sliderContainer.classList.add('container-m-t');
//       }
//   }
// });


// document.addEventListener('scroll', function () {
//   const sliderContainer = document.querySelector('.slider-container');
//   const sliderContainerWrap = document.querySelector('.slider-container-wrap');
//   const mainElement = document.querySelector('.main');

//   if (sliderContainer && sliderContainerWrap && mainElement) {
//       const rect = sliderContainer.getBoundingClientRect();
//       if (rect.top <= 0 && !mainElement.classList.contains('hidden')) {
//           // Сохраняем текущую позицию прокрутки
//           const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

//           // Добавляем класс и устанавливаем margin-top: 0
//           mainElement.classList.add('hidden');
//           sliderContainerWrap.style.marginTop = '0';

//           // Закрепляем позицию прокрутки
//           document.body.style.position = 'fixed';
//           document.body.style.top = `-${scrollPosition}px`;

//           // Убираем фиксированное позиционирование через задержку, чтобы восстановить поведение страницы
//           setTimeout(() => {
//               document.body.style.position = '';
//               document.body.style.top = '';
//               window.scrollTo(0, scrollPosition); // Восстанавливаем прокрутку
//           }, 10);
//       }
//   }
// });