(function slider(){
    // Делает активным кнопку/ссылку слайдера
    function circleActive() {
        let left = parseInt(slider.style.left);
        
        newClass(sliderNavigation.children);
        newClass(sliderNavigationAncor.children);
        
        function newClass(mas) {
            for (el of mas) el.classList.remove("active");
        
            for (let i = 0; i < mas.length; i++) {
                if (left === (-slide[0].offsetWidth * i)) {
                    mas[i].classList.add("active");
                }
            }
        }
    }

    // Стрелка слайдера "назад"
    function sliderBack() {
        slider.style.transition = "left .5s";
        let left = parseInt(slider.style.left);
        let width = slide[0].offsetWidth;
        
        if (left === 0 || slider.style.left === "") {
            slider.style.left = -width * (slide.length - 1) + "px";
        } else slider.style.left = left + width + "px";

        circleActive();
    }

    // Стрелка слайдера "вперёд"
    function sliderNext() {
        for (let i = 0; i < slide.length; i++) {
            if (slide[i].style.opacity === "1") {
                slide[i].style.opacity === "0";

                if (slide[i].nextElementSibling) slide[++i].style.opacity = "1";
                else slide[0].style.opacity = "1";
            }
        }
        
        circleActive();
    }

    // Переключение слайдера по кнопкам/ссылкам
    function sliderOnElement() {
        slider.style.transition = "left .5s";
        sliderOnElementHelp(sliderNavigation.children, this);
        sliderOnElementHelp(sliderNavigationAncor.children, this);
        
        function sliderOnElementHelp(mas, el) {
            for (let i = 0; i < mas.length; i++) {
                if (mas[i] === el) {
                    slider.style.left = -slide[0].offsetWidth * i + "px";
                }
            }
        }

        circleActive();
    }

    // Изменяет ширину слайдов и позиционирование элемента "slider"(класс "projects-slider"), 
    // делая слайдер адаптивным
    function sliderAdaptive() {
        let left = parseInt(slider.style.left);

        slide.forEach(el => el.style.width = sliderContainer.clientWidth + "px");

        slider.style.transition = "none";
        
        let mas = sliderNavigation.children;
        for (let i = 0; i < mas.length; i++) {
            if (mas[i].className.includes("active")) {
                slider.style.left = -slide[0].clientWidth * i + "px";
            }
        }

        if (document.body.clientWidth <= 923) {
            let sl;
            if (document.body.clientWidth <= 683) {
                sl = document.querySelector(".projects_slider-images--media");
                
            } else {
                sl = document.querySelector(".projects_slider");
            }

            arrowBack.style.left = (document.body.clientWidth - sl.clientWidth) / 2 + "px";
            arrowNext.style.right = (document.body.clientWidth - sl.clientWidth) / 2 + "px";
        }

    }

    let arrowBack = document.querySelector(".projects_slider-arrow-back"),
    arrowNext = document.querySelector(".projects_slider-arrow-next"),
    slider = document.querySelector(".projects-slider"),
    slide = document.querySelectorAll(".projects-slide"),
    sliderContainer = document.querySelector(".projects_wrapper"),
    sliderNavigationAncor = document.querySelector(".projects_slider-list"),
    sliderNavigation = document.querySelector(".projects_slider-buttons");


    slider.style.display = "block";
    for (let i = 0; i < slide.length; i++) {
        slide[i].style.position = "absolute";
        slide[i].style.left = "0";
        slide[i].style.top = "0";
        if (i === 0) slide[i].style.opacity = "1";
        else slide[i].style.opacity = "0";
    }

    // Создаю кнопки переключения слайдера
    for (let i = 0; i < slide.length; i++) {
        let circle = document.createElement("span");
        circle.classList.add("projects_slider-button");
        if (i === 0) circle.classList.add("active");
        sliderNavigation.append(circle);

        circle.addEventListener("click", sliderOnElement);
    }

    // Делаю активной первую ссылку слайдера
    sliderNavigationAncor.children[0].classList.add("active");

    for (i = 0; i < sliderNavigationAncor.children.length; i++) {
        sliderNavigationAncor.children[i].addEventListener("click", sliderOnElement);
    }

    arrowBack.addEventListener("click", sliderBack);
    arrowNext.addEventListener("click", sliderNext);
    window.addEventListener("resize", sliderAdaptive);

    sliderAdaptive();

    // Задаю ширину слайдов при загрузке страницы
    slide.forEach(el => el.style.width = sliderContainer.clientWidth + "px");
})();