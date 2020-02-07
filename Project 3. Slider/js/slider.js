(function slider(){
    // Делает активным кнопку/ссылку слайдера
    function circleActive(slider, slide) {
        let left = parseInt(slider.style.left);
        
        newClass(document.querySelector(".projects_slider-buttons").children);
        newClass(document.querySelector(".projects_slider-list").children);
        
        function newClass(arr) {
            for (el of arr) el.classList.remove("active");
        
            for (let i = 0; i < arr.length; i++) {
                if (left === (-slide[0].offsetWidth * i)) {
                    arr[i].classList.add("active");
                }
            }
        }
    }

    // Стрелка слайдера "назад"
    function sliderBack(slider, slide) {
        slider.style.transition = "left .5s";
        let left = parseInt(slider.style.left);
        let width = slide[0].offsetWidth;
        
        if (left === 0 || slider.style.left === "") {
            slider.style.left = -width * (slide.length - 1) + "px";
        } else slider.style.left = left + width + "px";

        circleActive(slider, slide);
    }

    // Стрелка слайдера "вперёд"
    function sliderNext(slider, slide) {
        slider.style.transition = "left .5s";
        let left = parseInt(slider.style.left);
        let width = slide[0].offsetWidth;

        if (left === 0 || slider.style.left === "") slider.style.left = -width + "px";
        else if ((left === -width * (slide.length - 1))) slider.style.left = 0 + "px";
        else slider.style.left = left + -width + "px";
        
        circleActive(slider, slide);
    }

    // Переключение слайдера по кнопкам/ссылкам
    function sliderOnElement(slider, slide) {
        slider.style.transition = "left .5s";
        sliderOnElementHelp(document.querySelector(".projects_slider-list").children, event.target);
        sliderOnElementHelp(document.querySelector(".projects_slider-buttons").children, event.target);
        
        function sliderOnElementHelp(arr, el) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === el) {
                    slider.style.left = -slide[0].offsetWidth * i + "px";
                }
            }
        }

        circleActive(slider, slide);
    }

    // Изменяет ширину слайдов и позиционирование элемента "slider"(класс "projects-slider"), 
    // делая слайдер адаптивным
    function sliderAdaptive(slider, slide, sliderContainer, arrowBack, arrowNext) {
        let left = parseInt(slider.style.left);

        slide.forEach(el => el.style.width = sliderContainer.clientWidth + "px");

        slider.style.transition = "none";
        
        let arr = document.querySelector(".projects_slider-buttons").children;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].className.includes("active")) {
                slider.style.left = -slide[0].clientWidth * i + "px";
            }
        }

        if (document.body.clientWidth <= 923) {
            let sliderWidthMini = document.body.clientWidth <= 683 ?  
                document.querySelector(".projects_slider-images--media") :
                document.querySelector(".projects_slider");

            arrowBack.style.left = (document.body.clientWidth - sliderWidthMini.clientWidth) / 2 + "px";
            arrowNext.style.right = (document.body.clientWidth - sliderWidthMini.clientWidth) / 2 + "px";

            if (document.body.clientWidth <= 683) {
                arrowBack.style.top = -slide[0].clientHeight / 3 + "px";
                arrowNext.style.top = -slide[0].clientHeight / 3 + "px";
            } else {
                arrowBack.style.top = "";
                arrowNext.style.top = "";
            }

        }

    }

    let arrowBack = document.querySelector(".projects_slider-arrow-back"),
    arrowNext = document.querySelector(".projects_slider-arrow-next"),
    slider = document.querySelector(".projects-slider"),
    slide = document.querySelectorAll(".projects-slide"),
    sliderContainer = document.querySelector(".projects_wrapper"),
    sliderNavigationAncor = document.querySelector(".projects_slider-list"),
    sliderNavigation = document.querySelector(".projects_slider-buttons");

    // Создаю кнопки переключения слайдера
    for (let i = 0; i < slide.length; i++) {
        let circle = document.createElement("span");
        circle.classList.add("projects_slider-button");
        if (i === 0) circle.classList.add("active");
        sliderNavigation.append(circle);

        circle.addEventListener("click", () => sliderOnElement(slider, slide));
    }

    // Делаю активной первую ссылку слайдера
    sliderNavigationAncor.children[0].classList.add("active");

    for (i = 0; i < sliderNavigationAncor.children.length; i++) {
        sliderNavigationAncor.children[i].addEventListener("click", () => sliderOnElement(slider, slide));
    }

    arrowBack.addEventListener("click", () => sliderBack(slider, slide));
    arrowNext.addEventListener("click", () => sliderNext(slider, slide));
    window.addEventListener("resize", () => sliderAdaptive(slider, slide, sliderContainer, arrowBack, arrowNext));

    sliderAdaptive(slider, slide, sliderContainer, arrowBack, arrowNext);

    // Автоматическое пролистывание слайдов
    let n = setInterval(sliderNext, 5000);
    sliderContainer.addEventListener("mouseover", () => clearInterval(n));
    sliderContainer.addEventListener("mouseout", () => n = setInterval(sliderNext, 5000));

    // Задаю ширину слайдов при загрузке страницы
    slide.forEach(el => el.style.width = sliderContainer.clientWidth + "px");
})();