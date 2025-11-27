// Analytics Helper Functions
function trackEvent(eventName, properties = {}) {
    // Track with Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track(eventName, properties);
    }

    // Track with GTM/GA4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }

    // Track with GTM dataLayer
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': eventName,
            ...properties
        });
    }

    // Track with PostHog
    if (typeof posthog !== 'undefined') {
        posthog.capture(eventName, properties);
    }

    // Track with Amplitude
    if (typeof amplitude !== 'undefined') {
        amplitude.getInstance().logEvent(eventName, properties);
    }
}

// User Identification Function
function identifyUser(email, properties = {}) {
    console.log('Identifying user:', email);

    // Mixpanel identify
    if (typeof mixpanel !== 'undefined') {
        mixpanel.identify(email);
        mixpanel.people.set({
            '$email': email,
            ...properties
        });
    }

    // PostHog identify
    if (typeof posthog !== 'undefined') {
        posthog.identify(email, {
            email: email,
            ...properties
        });
    }

    // Amplitude identify
    if (typeof amplitude !== 'undefined') {
        amplitude.getInstance().setUserId(email);
        if (Object.keys(properties).length > 0) {
            amplitude.getInstance().setUserProperties(properties);
        }
    }

    // Hotjar identify
    if (typeof hj !== 'undefined') {
        hj('identify', email, {
            email: email,
            ...properties
        });
    }

    // Microsoft Clarity identify
    if (typeof clarity !== 'undefined') {
        clarity('identify', email, {
            email: email,
            ...properties
        });
    }

    console.log('User identified across all platforms');
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        trackEvent('Mobile Menu Toggle', {
            'action': navMenu.classList.contains('active') ? 'opened' : 'closed',
            'page': 'portfolio'
        });
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter portfolio items
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        // Track filter interaction
        trackEvent('Portfolio Filter', {
            'filter_type': filter,
            'items_shown': document.querySelectorAll('.portfolio-item:not(.hidden)').length
        });

        // Smooth scroll to top of grid
        const gridSection = document.querySelector('.portfolio-grid-section');
        if (gridSection) {
            const offset = 150;
            const targetPosition = gridSection.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Track portfolio card clicks
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3')?.textContent || 'Unknown Project';
        const tag = this.querySelector('.portfolio-tag')?.textContent || 'Unknown Category';

        trackEvent('Portfolio Card Click', {
            'project_title': title,
            'project_category': tag
        });
    });
});

// Track CTA button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('CTA Button Click', {
            'button_text': this.textContent,
            'button_location': 'portfolio_page',
            'page_section': this.closest('section')?.className || 'unknown'
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;

        if (maxScroll >= 25 && maxScroll < 50) {
            trackEvent('Scroll Depth', { 'depth': '25%', 'page': 'portfolio' });
        } else if (maxScroll >= 50 && maxScroll < 75) {
            trackEvent('Scroll Depth', { 'depth': '50%', 'page': 'portfolio' });
        } else if (maxScroll >= 75 && maxScroll < 90) {
            trackEvent('Scroll Depth', { 'depth': '75%', 'page': 'portfolio' });
        } else if (maxScroll >= 90) {
            trackEvent('Scroll Depth', { 'depth': '90%', 'page': 'portfolio' });
        }
    }
});
