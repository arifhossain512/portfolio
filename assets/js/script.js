
document.addEventListener("DOMContentLoaded", function () {

    //   HEADER LEFT TO RIGHT ANIMATION

    let languageList = document.getElementById('language-list');
    let position = 0;
    let animationId;

    function moveList() {
        console.log('moveList called');

        position -= 2;
        languageList.style.left = position + 'px';
        if (position < -languageList.offsetWidth) {
            // Move the first list item to the end of the list
            languageList.appendChild(languageList.children[0]);
            // Reset the position to the original value
            position = 0;
        }
        animationId = requestAnimationFrame(moveList);
    }


    function startAnimation() {
        if (!animationId) {
            animationId = requestAnimationFrame(moveList);
        }
    }

    function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    languageList.addEventListener('mouseenter', stopAnimation);
    languageList.addEventListener('mouseleave', startAnimation);

    startAnimation();









    // Navigation 

    const siteNavigation = document.querySelector('.site-navigation');
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= hero.offsetHeight) {
            siteNavigation.classList.add("affix");
        } else {
            siteNavigation.classList.remove("affix");
        }

    });



    function checkWidth() {
        let windowsize = window.innerWidth;
        if (windowsize < 768) {
            let navLinks = document.querySelectorAll('.nav a');
            navLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    document.querySelector('.navbar-toggle').click();
                });
            });
        }
    }


    // Execute on load
    checkWidth();
    // Bind event listener
    window.addEventListener('resize', checkWidth);





    const section = document.querySelector('.section-skills');


    function loadDaBars() {
        const progressBars = document.querySelectorAll('.progress .progress-bar');
        progressBars.forEach(bar => {
            bar.style.width = bar.dataset.transitiongoal + '%';
            bar.style.transitionDelay = '500ms';

            const displayText = document.createElement('span');

            displayText.textContent = bar.dataset.transitiongoal + '%';
            displayText.style.textAlign = 'center';
            bar.appendChild(displayText);
        });
    }



    document.addEventListener('scroll', function (ev) {
        let scrollOffset = window.pageYOffset;
        let containerOffset = section.offsetTop - window.innerHeight;
        if (scrollOffset > containerOffset) {
            loadDaBars();
            // remove event listener not to load scroll again
            document.removeEventListener('scroll', ev.currentTarget);
        }
    });







    let shuffleme = (function () {
        'use strict';
        let grid = document.querySelector('#grid'),
            filterOptions = document.querySelectorAll('.portfolio-sorting li'),
            init = function () {
                setTimeout(function () {
                    listen();
                    setupFilters();
                }, 100);
                grid.classList.add('shuffle-item');
                grid.classList.add('shuffle');
            },
            setupFilters = function () {
                let btns = filterOptions;
                for (let i = 0; i < btns.length; i++) {
                    btns[i].addEventListener('click', function (e) {
                        e.preventDefault();
                        let isActive = btns[i].classList.contains('active'),
                            group = isActive ? 'all' : btns[i].dataset.group;
                        if (!isActive) {
                            let currentBtns = document.querySelectorAll('.portfolio-sorting li a');
                            for (let j = 0; j < currentBtns.length; j++) {
                                currentBtns[j].classList.remove('active');
                            }
                        }
                        btns[i].classList.toggle('active');
                    });
                }
            },
            listen = function () {
                let debouncedLayout = debounce(function () {
                    grid.classList.add('shuffle-item');
                    grid.classList.add('shuffle');
                }, 300);
                let images = grid.querySelectorAll('img');
                for (let i = 0; i < images.length; i++) {
                    if (images[i].complete && images[i].naturalWidth !== undefined) {
                        continue;
                    }
                    let proxyImage = new Image();
                    proxyImage.addEventListener('load', function () {
                        debouncedLayout();
                    });
                    proxyImage.src = images[i].src;
                }
                setTimeout(function () {
                    debouncedLayout();
                }, 500);
            };

        function debounce(func, wait) {
            let timeout;
            return function () {
                let context = this, args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    func.apply(context, args);
                }, wait);
            };
        }

        return {
            init: init
        };
    }());



    if (document.querySelectorAll('#grid').length > 0) {
        shuffleme.init();
    }



});
