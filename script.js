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
        amplitude.track(eventName, properties);
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
        amplitude.setUserId(email);
        const identify = new amplitude.Identify();
        Object.keys(properties).forEach(key => {
        identify.set(key, properties[key]);
  });
  amplitude.identify(identify);
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

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Track mobile menu interaction
    trackEvent('Mobile Menu Toggle', {
        'action': navMenu.classList.contains('active') ? 'opened' : 'closed'
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Track navigation click
            trackEvent('Navigation Click', {
                'section': targetId.replace('#', ''),
                'link_text': this.textContent
            });
        }
    });
});

// Track CTA button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('CTA Button Click', {
            'button_text': this.textContent,
            'button_class': this.className,
            'page_section': this.closest('section')?.id || 'unknown'
        });
    });
});

// HubSpot Form Tracking and User Identification
window.addEventListener('message', function(event) {
    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
        console.log('Form submit started');
        trackEvent('Contact Form Submit', {
            'form_id': event.data.id,
            'form_type': 'hubspot'
        });
    }

    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
        console.log('Form submitted successfully', event.data);

        // Extract email and other data from form submission
        const formData = event.data.data || {};
        const submissionValues = formData.submissionValues || {};

        // Try to get email from various possible field names
        const email = submissionValues.email ||
                     submissionValues.Email ||
                     submissionValues.user_email ||
                     submissionValues.USER_EMAIL;

        // Get other fields
        const firstName = submissionValues.firstname || submissionValues.first_name || '';
        const lastName = submissionValues.lastname || submissionValues.last_name || '';
        const company = submissionValues.company || '';
        const service = submissionValues.service || '';

        if (email) {
            // Identify user across all analytics platforms
            identifyUser(email, {
                'first_name': firstName,
                'last_name': lastName,
                'company': company,
                'service_interested': service,
                'form_submission_date': new Date().toISOString()
            });
        }

        // Track submission event
        trackEvent('Contact Form Submitted', {
            'form_id': event.data.id,
            'form_type': 'hubspot',
            'has_email': !!email,
            'service': service
        });
    }
});

// Also listen for HubSpot global events (if available)
if (typeof window.hbspt !== 'undefined') {
    window.hbspt.forms = window.hbspt.forms || {};
    window.hbspt.forms.create = (function(original) {
        return function(options) {
            options.onFormSubmitted = function($form, data) {
                const email = data.find(field => field.name === 'email')?.value;
                const firstName = data.find(field => field.name === 'firstname')?.value || '';
                const lastName = data.find(field => field.name === 'lastname')?.value || '';
                const company = data.find(field => field.name === 'company')?.value || '';

                if (email) {
                    identifyUser(email, {
                        'first_name': firstName,
                        'last_name': lastName,
                        'company': company
                    });
                }
            };
            return original.call(this, options);
        };
    })(window.hbspt.forms.create);
}

// Track service card interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3')?.textContent || 'Unknown Service';
        trackEvent('Service Card Click', {
            'service_name': serviceName
        });
    });
});

// Track tool badge interactions
document.querySelectorAll('.tool-badge').forEach(badge => {
    badge.addEventListener('click', function() {
        trackEvent('Tool Badge Click', {
            'tool_name': this.textContent
        });
    });
});

// Track tool card interactions (with logos)
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', function() {
        const toolName = this.querySelector('.tool-name')?.textContent || 'Unknown Tool';
        trackEvent('Tool Card Click', {
            'tool_name': toolName
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
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

// Observe service cards and timeline items
document.querySelectorAll('.service-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
