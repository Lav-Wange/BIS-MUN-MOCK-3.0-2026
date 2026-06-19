/**
 * BIS-MUN 2026 - Interactive Script
 * Handles scrolling animations, tab switching, menu navigation, and registration simulation.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Scroll Indicator action
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Header styling shift on scroll
    const header = document.getElementById('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial invocation on page load

    // Mobile Hamburger Menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when links are clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Highlight active menu links based on section positions
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const selectActiveLink = () => {
        let currentSectionId = 'home';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Buffer to activate links slightly before scroll reaches the section midpoint
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', selectActiveLink);

    // Committee Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const committeeCards = document.querySelectorAll('.committee-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Deactivate all buttons & cards
            tabBtns.forEach(b => b.classList.remove('active'));
            committeeCards.forEach(c => c.classList.remove('active'));

            // Activate clicked button & matching card
            btn.classList.add('active');
            const targetCard = document.getElementById(targetTab);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        });
    });

    // Background Guide simulated download
    const guideBtns = document.querySelectorAll('.guide-btn');
    guideBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const committeeName = btn.getAttribute('data-committee');
            
            // Premium custom toast or message block notification
            alert(`The background research guide for ${committeeName} is currently undergoing final reviews by the Executive Board.\n\nIt will be directly emailed to all registered delegates in PDF format. Thank you for your patience!`);
        });
    });

    // Registration Form Submission Simulation
    const registrationForm = document.getElementById('mun-registration-form');
    const formSuccess = document.getElementById('form-success');
    const resetFormBtn = document.getElementById('reset-form-btn');

    if (registrationForm && formSuccess && resetFormBtn) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation check
            const nameInput = document.getElementById('full-name');
            const emailInput = document.getElementById('email');
            const institutionInput = document.getElementById('institution');
            const prefInput = document.getElementById('committee-pref');
            const countriesInput = document.getElementById('country-pref');

            if (!nameInput.value || !emailInput.value || !institutionInput.value || !prefInput.value || !countriesInput.value) {
                return;
            }

            // Button loading visual effect
            const submitBtn = registrationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing Application...';
            submitBtn.disabled = true;

            // Simulate server network latency
            setTimeout(() => {
                registrationForm.style.display = 'none';
                formSuccess.style.display = 'block';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll success container smoothly into view
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1200);
        });

        // Reset form for multiple entries
        resetFormBtn.addEventListener('click', () => {
            registrationForm.reset();
            formSuccess.style.display = 'none';
            registrationForm.style.display = 'block';
        });
    }

    // Scroll Reveal Intersection Observer setup
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve since we want it static once triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // offset threshold for cleaner transitions
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
