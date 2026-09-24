/* ============================================================
   STACKLY ADVENTURE TOURISM — MASTER INTERACTIVITY SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------
       1. PRELOADER LOGIC
       ------------------------------------------------------------ */
    const preloader = document.getElementById('preloader');
    const plBar = document.getElementById('plBar');
    if (preloader && plBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 12;
            plBar.style.width = Math.min(progress, 100) + '%';
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    setTimeout(() => preloader.style.display = 'none', 600);
                }, 200);
            }
        }, 50);
    }

    /* ------------------------------------------------------------
       2. NAVBAR SCROLL & MOBILE DRAWER
       ------------------------------------------------------------ */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ------------------------------------------------------------
       3. HERO DYNAMIC SLIDER & SINGLE CARD SYNCHRONIZATION
       ------------------------------------------------------------ */
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator-dot');
    const heroTabs = document.querySelectorAll('.hero-tab-pill');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroSingleImg = document.getElementById('heroSingleImg');
    const heroSingleTag = document.getElementById('heroSingleTag');
    const heroSinglePrice = document.getElementById('heroSinglePrice');
    const heroSingleCard = document.getElementById('heroSingleCard');

    const heroContentData = [
        {
            title: 'Unleash Your <br><span class="gradient-text">Wild Side.</span>',
            subtitle: 'Experience world-class thrill expeditions — from high-grade white water rafting and cliff bungee jumping to mountain summit trekking.',
            img: 'images/hero.webp',
            tag: '🏔 High Alpine Expedition',
            price: '$350',
            adv: 'trekking'
        },
        {
            title: 'Conquer The <br><span class="gradient-text">Grade IV Rapids.</span>',
            subtitle: 'Navigate ferocious white-water gorges with certified river guides, cliff jump spots, and top-tier safety gear.',
            img: 'images/rafting.webp',
            tag: '🌊 White Water Rafting',
            price: '$180',
            adv: 'rafting'
        },
        {
            title: 'Touch The <br><span class="gradient-text">Himalayan Peaks.</span>',
            subtitle: 'Traverse high alpine meadows, ridge crests, and pristine mountain summits under star-filled skies.',
            img: 'images/trekking.webp',
            tag: '🧗 Summit Peak Trekking',
            price: '$350',
            adv: 'trekking'
        },
        {
            title: 'Freefall From <br><span class="gradient-text">83 Meter Cliffs.</span>',
            subtitle: 'Feel the ultimate adrenaline rush from India’s highest fixed bungee jumping platform over mountain rivers.',
            img: 'images/bungee.webp',
            tag: '🪂 83m Cliff Bungee Jump',
            price: '$120',
            adv: 'bungee'
        }
    ];

    let currentSlide = 0;
    let slideTimer;

    const gotoSlide = (index, isInitial = false) => {
        slides.forEach(s => s.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        heroTabs.forEach(tab => tab.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;
        const currentData = heroContentData[currentSlide];

        slides[currentSlide]?.classList.add('active');
        if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
        if (heroTabs[currentSlide]) heroTabs[currentSlide].classList.add('active');

        if (heroTitle && currentData) {
            if (isInitial) {
                heroTitle.innerHTML = currentData.title;
                if (heroSubtitle) heroSubtitle.textContent = currentData.subtitle;
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            } else {
                heroTitle.style.opacity = '0';
                heroTitle.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    heroTitle.innerHTML = currentData.title;
                    if (heroSubtitle) heroSubtitle.textContent = currentData.subtitle;
                    heroTitle.style.opacity = '1';
                    heroTitle.style.transform = 'translateY(0)';
                }, 150);
            }
        }

        if (heroSingleImg && currentData) {
            if (isInitial) {
                heroSingleImg.src = currentData.img;
                if (heroSingleTag) heroSingleTag.textContent = currentData.tag;
                if (heroSinglePrice) heroSinglePrice.textContent = currentData.price;
                if (heroSingleCard) heroSingleCard.setAttribute('data-adv', currentData.adv);
                heroSingleImg.style.opacity = '1';
            } else {
                heroSingleImg.style.opacity = '0';
                setTimeout(() => {
                    heroSingleImg.src = currentData.img;
                    if (heroSingleTag) heroSingleTag.textContent = currentData.tag;
                    if (heroSinglePrice) heroSinglePrice.textContent = currentData.price;
                    if (heroSingleCard) heroSingleCard.setAttribute('data-adv', currentData.adv);
                    heroSingleImg.style.opacity = '1';
                }, 150);
            }
        }
    };

    const nextSlide = () => gotoSlide(currentSlide + 1);
    const prevSlide = () => gotoSlide(currentSlide - 1);

    const startAutoSlide = () => {
        stopAutoSlide();
        slideTimer = setInterval(nextSlide, 5000);
    };

    const stopAutoSlide = () => {
        if (slideTimer) clearInterval(slideTimer);
    };

    nextBtn?.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
    prevBtn?.addEventListener('click', () => { prevSlide(); startAutoSlide(); });

    indicators.forEach((dot, idx) => {
        dot.addEventListener('click', () => { gotoSlide(idx); startAutoSlide(); });
    });

    heroTabs.forEach((tab, idx) => {
        tab.addEventListener('click', () => { gotoSlide(idx); startAutoSlide(); });
    });

    gotoSlide(0, true);
    startAutoSlide();

    /* ------------------------------------------------------------
       4. HERO PARTICLES GENERATOR
       ------------------------------------------------------------ */
    const particlesContainer = document.getElementById('hero-particles');
    if (particlesContainer) {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 6 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 4}s`;
            particle.style.width = `${Math.random() * 4 + 2}px`;
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    /* ------------------------------------------------------------
       5. CATEGORY FILTER TABS
       ------------------------------------------------------------ */
    const filterBtns = document.querySelectorAll('.tab-btn');
    const adventureCards = document.querySelectorAll('.adv-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            adventureCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ------------------------------------------------------------
       6. ADVENTURE DATA & BOOKING MODAL
       ------------------------------------------------------------ */
    const adventuresData = {
        rafting: {
            title: "White Water Rafting",
            category: "Water Expedition",
            image: "images/rafting.webp",
            price: "$180",
            duration: "Full Day (6-8 Hours)",
            difficulty: "Class IV Rapids",
            location: "Ganges River, Rishikesh",
            desc: "Conquer exhilarating Grade IV rapids surrounded by high Himalayan gorges. Equipped with full safety gear, expert river guides, and cliff jumping experiences."
        },
        bungee: {
            title: "83m Cliff Bungee Jump",
            category: "Air Thrill",
            image: "images/bungee.webp",
            price: "$120",
            duration: "2-3 Hours",
            difficulty: "Extreme Thrill",
            location: "Mohan Chatti Jump Zone",
            desc: "Freefall 83 meters over a rocky river bed from India's highest fixed bungee platform. Features rubber cord safety certification and video footage."
        },
        trekking: {
            title: "Summit Peak Trekking",
            category: "Mountain Trail",
            image: "images/trekking.webp",
            price: "$350",
            duration: "3 Days / 2 Nights",
            difficulty: "Moderate - High",
            location: "Kuari Pass Alpine Range",
            desc: "Traverse high Himalayan meadows, oak forests, and spectacular snow peaks. Includes mountain tent stays, campfire meals, and certified trek sherpas."
        },
        climbing: {
            title: "Vertical Rock Climbing",
            category: "Rock Ascent",
            image: "images/climbing.webp",
            price: "$95",
            duration: "Half Day (4 Hours)",
            difficulty: "All Skill Levels",
            location: "Solang Valley Crag",
            desc: "Ascend granite cliff faces with top-rope safety systems. Learn foot placement, harness safety, and rappelling under professional instruction."
        },
        camping: {
            title: "Wild River Camping",
            category: "Nature Retreat",
            image: "images/camping.webp",
            price: "$140",
            duration: "2 Days / 1 Night",
            difficulty: "Easy - Relaxing",
            location: "Riverside Beach Camp",
            desc: "Unwind under starry night skies beside roaring campfires with live music, luxury waterproof dome tents, barbecue dinners, and volleyball."
        },
        paragliding: {
            title: "Alpine Paragliding Flight",
            category: "Air Thrill",
            image: "images/hero.webp",
            price: "$210",
            duration: "3-4 Hours",
            difficulty: "Moderate Thrill",
            location: "Solang Valley Takeoff Point",
            desc: "Soar high above alpine valleys and emerald lakes with tandem certified paragliding instructors and HD camera recordings."
        }
    };

    const modal = document.getElementById('bookingModal');
    const modalClose = document.getElementById('modalClose');

    document.querySelectorAll('[data-adv]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const key = btn.getAttribute('data-adv');
            const data = adventuresData[key];
            if (!data || !modal) return;

            document.getElementById('modalImg').src = data.image;
            document.getElementById('modalImg').alt = data.title;
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalPrice').textContent = data.price;
            document.getElementById('modalLocation').textContent = "📍 " + data.location;
            document.getElementById('modalDuration').textContent = "⏱ " + data.duration;
            document.getElementById('modalDifficulty').textContent = "⚡ " + data.difficulty;
            document.getElementById('modalDesc').textContent = data.desc;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal?.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    /* ------------------------------------------------------------
       7. EXPEDITION CALCULATOR / QUIZ
       ------------------------------------------------------------ */
    const quizForm = document.getElementById('expeditionQuiz');
    const quizResult = document.getElementById('quizResult');

    quizForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const terrain = document.getElementById('quizTerrain')?.value;

        let match = "White Water Rafting & Cliff Bungee Jump";
        if (terrain === 'mountain') match = "Summit Peak Trekking & Rock Climbing";
        if (terrain === 'air') match = "83m Cliff Bungee Jump & Ziplining";
        if (terrain === 'camp') match = "Wild River Camping & Stargazing";

        if (quizResult) {
            quizResult.style.display = 'block';
            quizResult.innerHTML = `
                <div style="font-size: 1.2rem; font-weight: 800; color: #00D4AA; margin-bottom: 0.5rem;">🎉 Your Match: ${match}</div>
                <p style="color: #94A3B8; font-size: 0.9rem;">Based on your thrill preference, our guides recommend booking our weekend package!</p>
                <a href="#adventures" class="btn btn-primary" style="margin-top: 1rem; padding: 0.6rem 1.2rem; font-size: 0.85rem;" onclick="document.getElementById('quizResult').style.display='none';">View Matched Adventures</a>
            `;
        }
    });

    /* ------------------------------------------------------------
       8. BOOKING FORM HANDLER
       ------------------------------------------------------------ */
    const modalForm = document.getElementById('modalBookingForm');
    modalForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = modalForm.querySelector('button[type="submit"]');
        if (!submitBtn) return;

        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Processing Booking...</span>`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            alert('🔥 Expedition Booked Successfully! Our lead guide will contact you via WhatsApp/Email shortly.');
            closeModal();
            modalForm.reset();
        }, 1200);
    });

    /* ------------------------------------------------------------
       9. SMOOTH SCROLL ANCHOR LINKS
       ------------------------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
