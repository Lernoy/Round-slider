$(function () {
    var array_of_el = []; // Массив для блоков
    var char_for_left = "";  // Символ для кнопки влево
    var char_for_right = ""; // Символ для кнопки вправо
    var enable_nav = true;  // Вывод навигации
    var enable_thumb = true;
    add_classes(false);  //Оборачивание в блоки
    if (enable_nav) $(".le_carousel").append('<div class="le_control"><div class="left_le_control">' + char_for_left + '</div><div class="right_le_control">' + char_for_right + '</div></div>'); // Создание навигации
    if (enable_thumb) {
      $(".le_carousel").append('<div class="le_thumb"></div>');
      $(".le_carousel>*:not(.le_control):not(.le_thumb)").each(function () {
        $(".le_carousel .le_thumb").append("<p>" + $(this).children("*[data-name-slide]").data("name-slide") + "</p>");
      });
      $(".le_carousel .le_thumb p:first-child").addClass("active");
    }
    $(".le_carousel .le_control .right_le_control").on('click', function () { el_slider_right(); }); // Функция при нажатие на кнопку вправо
    $(".le_carousel .le_control .left_le_control").on('click', function () { el_slider_left(); }); // Функци при нажатие на кнопку влево
    $(".le_carousel>*:not(.le_control)").on("click", async function () { // Функция при нажатие на элемент слайдера
      const timer = ms => new Promise(res => setTimeout(res, ms))
      var k = Number($(this).attr("class").replace(/\D+/g, "") - 1);
      if (k <= 4)
        for (i = 0; i < k; i++) {
          el_slider_right();
          await timer(150);
        }
      else {
        k = Math.abs(k - array_of_el.length);
        for (i = 0; i < k; i++) {
          el_slider_left();
          await timer(150);
        }
      }
  
    });
    function el_slider_left() { // Смещение массива влево
      const item = array_of_el.splice(0, 1)[0];
      array_of_el.splice(array_of_el.length, 1, item);
      active_thumb();
      add_classes(true);
    }
    function el_slider_right() {  // Смещение массива вправо
      array_of_el.unshift(array_of_el.pop());
      active_thumb();
      add_classes(true);
    }
    function add_classes(click) { // Оборачивание блоков и смена классов
      $(".le_carousel").find("*[class*='le_item_']").removeAttr("class");
      $(".le_carousel>*:not(.le_control):not(.le_thumb)").each(function () {
        if (!click) {
          now_index_el = $(this).index();
          array_of_el[now_index_el] = now_index_el;
          $(this).wrap("<div class='le_item_" + (array_of_el[now_index_el] + 1) + "'></div>");
        }
        else {
          now_index_el = $(this).index();
          $(this).addClass("le_item_" + (array_of_el[now_index_el] + 1));
        }
      });
    }
    function active_thumb() {
      $(".le_carousel .le_thumb p.active").removeClass("active");
      $(".le_carousel .le_thumb p:nth-child(" + (array_of_el.indexOf(0) + 1) + ")").addClass("active");
    }
  });
  