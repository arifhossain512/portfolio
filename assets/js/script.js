
document.addEventListener("DOMContentLoaded", function () {
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






    //  for page scrolling feature
    document.querySelectorAll('.page-scroll a').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            let target = document.querySelector(anchor.getAttribute('href'));
            let targetTop = target.offsetTop;
            let currentTop = window.pageYOffset;
            let step = (targetTop - currentTop) / 30;
            let intervalId = setInterval(function () {
                window.scrollBy(0, step);
                if (Math.abs(window.pageYOffset - targetTop) < Math.abs(step)) {
                    clearInterval(intervalId);
                    window.scrollTo(0, targetTop);
                }
            }, 20);
        });
    });




    // Counters
    if (document.querySelectorAll('.counter-start').length > 0) {
        const statItems = document.querySelectorAll('.counter-start');
        statItems.forEach(statItem => {
            const offset = statItem.offsetTop;
            window.addEventListener('scroll', function () {
                if (window.scrollY > (offset - 1000) && !statItem.classList.contains('counting')) {
                    statItem.classList.add('counting');
                    // countTo function implementation is not included in the provided code
                }
            });
        });
    }



    // // Progress bar 
    // let $section = $('.section-skills');
    // function loadDaBars() {
    //     $('.progress .progress-bar').progressbar({
    //         transition_delay: 500,
    //         display_text: 'center'
    //     });
    // }
    // Progress bar
    const section = document.querySelector('.section-skills');

    function loadDaBars() {
        const progressBars = document.querySelectorAll('.progress .progress-bar');
        progressBars.forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
            bar.style.transitionDelay = '500ms';

            const displayText = document.createElement('span');
            displayText.classList.add('progress-bar-text');
            displayText.textContent = bar.dataset.width + '%';
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

    //Team Carousel
    const servicesCarousel = document.querySelector('#services-carousel');
    if (servicesCarousel) {
        servicesCarousel.setAttribute('data-interval', false);

        // Carousel touch support
        const carouselInner = document.querySelector('.carousel-inner');
        if (carouselInner) {
            let xDown, yDown;
            carouselInner.addEventListener('touchstart', handleTouchStart);
            carouselInner.addEventListener('touchmove', handleTouchMove);

            function handleTouchStart(evt) {
                xDown = evt.touches[0].clientX;
                yDown = evt.touches[0].clientY;
            }

            function handleTouchMove(evt) {
                const xUp = evt.touches[0].clientX;
                const yUp = evt.touches[0].clientY;
                const xDiff = xDown - xUp;
                if (Math.abs(xDiff) > 50) {
                    xDiff > 0 ? servicesCarousel.carousel('next') : servicesCarousel.carousel('prev');
                }
            }
        }
    }

    // Slick.js   
    $('.review-carousel').slick({
        nextArrow: '<button class="slick rectangle slick-next"><i class="fa fa-angle-right" aria-hidden="true"></button>',
        preletrow: '<button class="slick rectangle slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></button>'
    });

    $('.clients-carousel').slick({
        arrows: false,
        slidesToShow: 5,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    // //shuffle.js
    // let shuffleme = (function ($) {
    //     'use strict';
    //     let $grid = $('#grid'), //locate what we want to sort 
    //         $filterOptions = $('.portfolio-sorting li'),  //locate the filter categories

    //         init = function () {

    //             // None of these need to be executed synchronously
    //             setTimeout(function () {
    //                 listen();
    //                 setupFilters();
    //             }, 100);

    //             // instantiate the plugin
    //             $grid.shuffle({
    //                 itemSelector: '[class*="col-"]',
    //                 group: Shuffle.ALL_ITEMS,
    //             });
    //         },


    //         // Set up button clicks
    //         setupFilters = function () {
    //             let $btns = $filterOptions.children();
    //             $btns.on('click', function (e) {
    //                 e.preventDefault();
    //                 let $this = $(this),
    //                     isActive = $this.hasClass('active'),
    //                     group = isActive ? 'all' : $this.data('group');

    //                 // Hide current label, show current label in title
    //                 if (!isActive) {
    //                     $('.portfolio-sorting li a').removeClass('active');
    //                 }

    //                 $this.toggleClass('active');

    //                 // Filter elements
    //                 $grid.shuffle('shuffle', group);
    //             });

    //             $btns = null;
    //         },

    //         // Re layout shuffle when images load. This is only needed
    //         // below 768 pixels because the .picture-item height is auto and therefore
    //         // the height of the picture-item is dependent on the image
    //         // I recommend using imagesloaded to determine when an image is loaded
    //         // but that doesn't support IE7
    //         listen = function () {
    //             let debouncedLayout = $.throttle(300, function () {
    //                 $grid.shuffle('update');
    //             });

    //             // Get all images inside shuffle
    //             $grid.find('img').each(function () {
    //                 let proxyImage;

    //                 // Image already loaded
    //                 if (this.complete && this.naturalWidth !== undefined) {
    //                     return;
    //                 }

    //                 // If none of the checks above matched, simulate loading on detached element.
    //                 proxyImage = new Image();
    //                 $(proxyImage).on('load', function () {
    //                     $(this).off('load');
    //                     debouncedLayout();
    //                 });

    //                 proxyImage.src = this.src;
    //             });

    //             // Because this method doesn't seem to be perfect.
    //             setTimeout(function () {
    //                 debouncedLayout();
    //             }, 500);
    //         };

    //     return {
    //         init: init
    //     };
    // }(jQuery));


    // shuffle.js
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


    // Navigation
});
