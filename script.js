document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Mobile Menu Toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (name && email && subject && message) {
                formMessage.style.display = 'block';
                formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                formMessage.className = 'form-message success';
                
                contactForm.reset();
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                formMessage.style.display = 'block';
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.className = 'form-message error';
            }
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .feature-item, .stat-card, .objective-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Hide/Show Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // ✅ Active link highlight based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === AUTO INFINITE GALLERY CAROUSEL WITH FULLSCREEN VIEW ===
    const imageFolder = "img/SINAG SPORTS/";
    const imageFiles = [
        "EVENT_1.jpg",
        "EVENT_2.jpg",
        "EVENT_3.jpeg",
        "EVENT_4.jpg",
        "EVENT_5.jpg",
        "EVENT_6.jpg"
    ];

    const carouselTrack = document.getElementById("carouselTrack");

    if (carouselTrack) {
        // Duplicate images for infinite looping
        const doubledImages = [...imageFiles, ...imageFiles];

        doubledImages.forEach(file => {
            const img = document.createElement("img");
            img.src = imageFolder + file;
            img.alt = file;
            img.classList.add("carousel-img");
            carouselTrack.appendChild(img);
        });

        let index = 0;
        const visibleCount = 3;
        const moveInterval = 3000;
        let intervalId;

        function startCarousel() {
            intervalId = setInterval(() => {
                index++;
                carouselTrack.style.transition = "transform 1s ease-in-out";
                carouselTrack.style.transform = `translateX(-${index * (100 / visibleCount)}%)`;

                // Reset to start smoothly
                if (index >= imageFiles.length) {
                    setTimeout(() => {
                        carouselTrack.style.transition = "none";
                        index = 0;
                        carouselTrack.style.transform = "translateX(0)";
                    }, 1000);
                }
            }, moveInterval);
        }

        function stopCarousel() {
            clearInterval(intervalId);
        }

        startCarousel();

        // === Fullscreen Viewer ===
        const fullscreenOverlay = document.createElement("div");
        fullscreenOverlay.classList.add("fullscreen-overlay");
        fullscreenOverlay.style.display = "none";
        fullscreenOverlay.innerHTML = `
            <span class="close-btn">&times;</span>
            <img class="fullscreen-image" src="" alt="Full View">
        `;
        document.body.appendChild(fullscreenOverlay);

        const fullscreenImg = fullscreenOverlay.querySelector(".fullscreen-image");
        const closeBtn = fullscreenOverlay.querySelector(".close-btn");

        // Open fullscreen on click
        carouselTrack.querySelectorAll("img").forEach(img => {
            img.addEventListener("click", () => {
                stopCarousel();
                fullscreenImg.src = img.src;
                fullscreenOverlay.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        });

        // Close fullscreen
        closeBtn.addEventListener("click", () => {
            fullscreenOverlay.style.display = "none";
            document.body.style.overflow = "";
            startCarousel();
        });

        // Exit fullscreen on ESC key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && fullscreenOverlay.style.display === "flex") {
                closeBtn.click();
            }
        });

            // === FULLSCREEN VIEW FOR FEATURED SPORTS IMAGES ===
    const featureImages = document.querySelectorAll('.feature-image');

    if (featureImages.length > 0) {
        // Reuse existing fullscreen overlay if available
        let fullscreenOverlay = document.querySelector('.fullscreen-overlay');

        if (!fullscreenOverlay) {
            fullscreenOverlay = document.createElement("div");
            fullscreenOverlay.classList.add("fullscreen-overlay");
            fullscreenOverlay.style.display = "none";
            fullscreenOverlay.innerHTML = `
                <span class="close-btn">&times;</span>
                <img class="fullscreen-image" src="" alt="Full View">
            `;
            document.body.appendChild(fullscreenOverlay);
        }

        const fullscreenImg = fullscreenOverlay.querySelector(".fullscreen-image");
        const closeBtn = fullscreenOverlay.querySelector(".close-btn");

        featureImages.forEach(img => {
            img.style.cursor = "pointer";
            img.addEventListener("click", () => {
                fullscreenImg.src = img.src;
                fullscreenOverlay.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        });

        closeBtn.addEventListener("click", () => {
            fullscreenOverlay.style.display = "none";
            document.body.style.overflow = "";
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && fullscreenOverlay.style.display === "flex") {
                closeBtn.click();
            }
        });
    }
}});