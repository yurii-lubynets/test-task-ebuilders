document.addEventListener('DOMContentLoaded', function(event) { 
    
    var state = false;
    
    var timeToSlide = 5000;
    var timeSlider;
    var timeToChange = 2000;
    var timeChange;
    
    //logic for slider
    var slideIndex = 0;
    const doSlide = () => {
        let sliders = document.getElementsByClassName('slider-item');
        for (let i = 0; i < sliders.length; i++) {
            sliders[i].classList.remove('slide');
            sliders[i].classList.add('slideOut');
        }
        
        slideIndex++;
        if (slideIndex > sliders.length) 
            slideIndex = 1
        
        sliders[slideIndex-1].classList.remove('slideOut');
        sliders[slideIndex-1].classList.add('slide');
        sliders[slideIndex-1].style.display = 'inline';
        
        timeSlider = setTimeout(doSlide, timeToSlide);
    }

    const generateNewSequence = (itemsQuantity) => {
        let newOrder = [];

        while(newOrder.length < itemsQuantity) {
            let rand = Math.floor(Math.random()*itemsQuantity) + 1;
            if(newOrder.indexOf(rand) > -1) continue;
            newOrder[newOrder.length] = rand;
        }
        return newOrder;
    }
    
    //logic for the random ordered grid
    const updateOrder = (items) => {
        let newOrder = generateNewSequence(items.length);

        for (let i = 0; i < items.length; i++) {
            items[i].style.order = newOrder[i];
        }

        timeChange = setTimeout(() => {updateOrder(items)}, timeToChange);
    }

    //logic for the background and the move down animations
    const animateProductBlock = (i) => {
        let wrapper = document.getElementsByClassName('item-wrapper')[i];
        let productBlock =  document.getElementsByClassName('item-products')[i];
        
        productBlock.classList.toggle('animate-bg');
        setTimeout( () => { wrapper.classList.toggle('animate-move-down') }, 500 ); 
        
        controlState(wrapper.children);

    }

    //logic for the state controll
    const controlState = (items) => {
        state = !state;
        if (state) {
            clearTimeout(timeSlider);
            timeChange = setTimeout(() => {updateOrder(items)}, timeToChange);
        } else {
            clearTimeout(timeChange);
            timeSlider = setTimeout(doSlide, timeToSlide);
        }
    }

    let btn = document.getElementsByClassName('item-btn');

    for (let i = 0; i < document.getElementsByClassName('slider-item').length; i++) {
        btn[i].addEventListener( 'click', function() { 
            this.classList.toggle('crossToggleC');
            animateProductBlock(i); 
        });
    }

    doSlide();

});
