// Gallery Filter with "View More" functionality - shows 5 items at a time
function initializeGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid-large');
    const galleryItems = document.querySelectorAll('.gallery-item, .gallery-item-large');
    
    if (!galleryGrid || galleryItems.length === 0) return;
    
    const ITEMS_PER_PAGE = 5;
    let currentFilter = 'all';
    let viewMoreBtn = null;
    
    // Create view more button
    function createViewMoreButton() {
        if (viewMoreBtn) {
            viewMoreBtn.remove();
        }
        
        const container = document.createElement('div');
        container.className = 'view-more-container';
        
        const btn = document.createElement('button');
        btn.className = 'view-more-btn';
        btn.textContent = 'View More';
        btn.setAttribute('aria-label', 'Load more gallery images');
        
        container.appendChild(btn);
        galleryGrid.appendChild(container);
        viewMoreBtn = btn;
        
        return btn;
    }
    
    // Show items based on filter and limit
    function updateGalleryDisplay(filter, showAll = false) {
        let visibleCount = 0;
        let hiddenCount = 0;
        
        galleryItems.forEach(item => {
            const categories = item.dataset.category ? item.dataset.category.split(' ') : [];
            const matchesFilter = filter === 'all' || categories.includes(filter);
            
            if (matchesFilter) {
                if (showAll || visibleCount < ITEMS_PER_PAGE) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                    hiddenCount++;
                }
            } else {
                item.style.display = 'none';
            }
        });
        
        // Remove existing button
        if (viewMoreBtn) {
            viewMoreBtn.parentElement.remove();
            viewMoreBtn = null;
        }
        
        // Show "View More" button if there are hidden items
        if (hiddenCount > 0 && !showAll) {
            const btn = createViewMoreButton();
            btn.addEventListener('click', () => {
                updateGalleryDisplay(currentFilter, true);
            });
        }
    }
    
    // Initialize with first filter showing only 5 items
    updateGalleryDisplay('all', false);
    
    // Filter button click handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter;
            updateGalleryDisplay(currentFilter, false);
        });
    });
}

// Testimonial Slider (only run if elements exist)
function initializeTestimonialSlider() {
    const slider = document.getElementById('testimonialSlider');
    const dots = document.querySelectorAll('.dot');

    if (slider && dots.length > 0) {
        let currentSlide = 0;

        function showSlide(n) {
            currentSlide = n;
            slider.style.transform = `translateX(-${n * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === n);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                showSlide(parseInt(dot.dataset.slide));
            });
        });

        // Auto-advance testimonials
        setInterval(() => {
            currentSlide = (currentSlide + 1) % dots.length;
            showSlide(currentSlide);
        }, 5000);
    }
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
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
}

// Load background images from data-bg attributes
document.addEventListener('DOMContentLoaded', () => {
    const bgElements = document.querySelectorAll('[data-bg]');
    bgElements.forEach(el => {
        const bgUrl = el.getAttribute('data-bg');
        el.style.backgroundImage = `url('${bgUrl}')`;
    });
});

// Enhanced scroll animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply scroll animations to sections and elements
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    // Skip animation on very small screens for better performance
    // Also skip gallery sections to prevent blank page issue
    if (window.innerWidth > 768 && !section.id.includes('gallery') && !section.classList.contains('gallery-filters')) {
        section.classList.add('animate-on-scroll');
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    }
});

// Animate service cards on scroll
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    if (window.innerWidth > 768) {
        observer.observe(card);
    }
});

// Animate benefit items on scroll
const benefitItems = document.querySelectorAll('.benefit-item');
benefitItems.forEach((item, index) => {
    if (window.innerWidth > 768) {
        observer.observe(item);
    }
});

// Animate gallery items on scroll (skip to keep them visible on load)
const galleryItems = document.querySelectorAll('.gallery-item, .gallery-item-large');
galleryItems.forEach((item, index) => {
    if (window.innerWidth > 768) {
        // Don't hide gallery items initially - they need to be visible
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// Add smooth hover effects to CTA buttons
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate numbers counter for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Observe stat boxes and trigger counter animation
const statBoxes = document.querySelectorAll('.stat-box strong, .trust-stat strong');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent.trim();
            const hasPlus = text.includes('+');
            const number = parseInt(text.replace(/\D/g, ''));
            if (!isNaN(number)) {
                entry.target.textContent = '0' + (hasPlus ? '+' : '');
                animateCounter(entry.target, number);
            }
        }
    });
}, { threshold: 0.5 });

statBoxes.forEach(box => statObserver.observe(box));

// Add ripple effect to service cards
const cards = document.querySelectorAll('.service-card, .benefit-item');
cards.forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Enhanced testimonial slider with touch support
const testimonialSlider = document.getElementById('testimonialSlider');
if (testimonialSlider) {
    let startX = 0;
    let isDragging = false;

    testimonialSlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    testimonialSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    testimonialSlider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            const currentSlide = parseInt(document.querySelector('.dot.active').dataset.slide);
            const totalSlides = document.querySelectorAll('.dot').length;
            let newSlide = currentSlide;

            if (diff > 0 && currentSlide < totalSlides - 1) {
                newSlide = currentSlide + 1;
            } else if (diff < 0 && currentSlide > 0) {
                newSlide = currentSlide - 1;
            }

            const event = new Event('click');
            document.querySelector(`.dot[data-slide="${newSlide}"]`).dispatchEvent(event);
        }

        isDragging = false;
    });
}

// Rebate Calculator
function calculateRebate() {
    const sqft = parseFloat(document.getElementById('rebate-sqft').value);
    const resultDiv = document.getElementById('rebate-result');
    
    if (!sqft || sqft < 200) {
        resultDiv.innerHTML = '<p>⚠️ Minimum 200 sq ft required for rebate eligibility.</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    const rebatePerSqFt = 2.00;
    const maxRebate = 1000;
    let calculatedRebate = sqft * rebatePerSqFt;
    
    if (calculatedRebate > maxRebate) {
        calculatedRebate = maxRebate;
    }
    
    resultDiv.innerHTML = `
        <h3>Estimated Rebate: $${calculatedRebate.toFixed(2)}</h3>
        <p>${sqft} sq ft × $${rebatePerSqFt}/sq ft = $${(sqft * rebatePerSqFt).toFixed(2)}</p>
        ${calculatedRebate >= maxRebate ? '<p>Maximum rebate of $1,000 reached!</p>' : ''}
        <p style="margin-top: 1rem; font-size: 0.9rem;">Contact Valencia Turf to help with your rebate application!</p>
    `;
    resultDiv.classList.add('show');
}

// Cost Calculator
function calculateCost() {
    const sqft = parseFloat(document.getElementById('calc-sqft').value);
    const quality = parseFloat(document.getElementById('calc-quality').value);
    const petUpgrade = document.getElementById('calc-pet').checked;
    const hardscape = document.getElementById('calc-hardscape').checked;
    const difficultRemoval = document.getElementById('calc-removal').checked;
    
    const resultDiv = document.getElementById('cost-result');
    
    if (!sqft || !quality) {
        resultDiv.innerHTML = '<p>Please fill in all required fields.</p>';
        resultDiv.classList.add('show');
        return;
    }
    
    let pricePerSqFt = quality;
    
    // Add upgrades
    if (petUpgrade) pricePerSqFt += 1;
    if (difficultRemoval) pricePerSqFt += 1;
    
    let totalCost = sqft * pricePerSqFt;
    
    // Hardscape is typically 30-50% additional
    let hardscapeCost = 0;
    if (hardscape) {
        hardscapeCost = totalCost * 0.4; // 40% average
        totalCost += hardscapeCost;
    }
    
    const lowEstimate = totalCost * 0.9;
    const highEstimate = totalCost * 1.1;
    
    resultDiv.innerHTML = `
        <h3>Estimated Investment Range</h3>
        <p class="big-number">$${lowEstimate.toFixed(0)} - $${highEstimate.toFixed(0)}</p>
        <div style="text-align: left; margin-top: 1rem;">
            <p><strong>Breakdown:</strong></p>
            <p>• Turf Installation: $${(sqft * quality).toFixed(0)}</p>
            ${petUpgrade ? `<p>• Pet-Friendly Upgrade: $${(sqft * 1).toFixed(0)}</p>` : ''}
            ${difficultRemoval ? `<p>• Difficult Removal: $${(sqft * 1).toFixed(0)}</p>` : ''}
            ${hardscape ? `<p>• Hardscape Features: ~$${hardscapeCost.toFixed(0)}</p>` : ''}
        </div>
        <p style="margin-top: 1rem; font-size: 0.9rem;">Don't forget: You may qualify for up to $1,000 in Tucson Water rebates!</p>
    `;
    resultDiv.classList.add('show');
}

// FAQ Toggle (for Resources page and Homepage)
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle clicked FAQ item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // In a real implementation, this would send to a server
            // For now, we'll show a success message
            alert('Thank you for your request! We\'ll contact you within 24 hours.\n\nIn the meantime, feel free to call us at (520) 907-7795 for immediate assistance.');
            
            // Reset form
            contactForm.reset();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Smooth Scroll to Section on Page Load (for anchor links)
if (window.location.hash) {
    setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// Mobile Menu Toggle with Accessibility
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        // Set initial ARIA attributes
        navLinks.setAttribute('id', 'main-menu');
        
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = navLinks.classList.toggle('mobile-active');
            
            // Update button appearance
            mobileMenuBtn.textContent = isExpanded ? '✕' : '☰';
            
            // Update ARIA attributes for screen readers
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
            mobileMenuBtn.setAttribute('aria-label', isExpanded ? 'Close mobile menu' : 'Open mobile menu');
            
            // Focus management - trap focus in menu when open
            if (isExpanded) {
                const firstLink = navLinks.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });

        // Close menu when clicking a link (except dropdown triggers)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close if this is a dropdown trigger
                if (link.closest('.has-dropdown') && !link.closest('.dropdown-menu')) {
                    return; // Let the dropdown handler manage this
                }
                
                // Close menu for regular links
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.textContent = '☰';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'Open mobile menu');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.textContent = '☰';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'Open mobile menu');
            }
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.textContent = '☰';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'Open mobile menu');
                mobileMenuBtn.focus(); // Return focus to button
            }
        });
    }
}

// Sticky CTA - Show after scrolling down, hide when at form
function initializeStickyCTA() {
    const stickyCTA = document.getElementById('sticky-cta');
    const estimateForm = document.getElementById('estimate-form');
    
    if (stickyCTA) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Check if user is scrolled to the estimate form section
            let isAtForm = false;
            if (estimateForm) {
                const formRect = estimateForm.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Hide CTA if form is visible in viewport
                isAtForm = formRect.top < windowHeight && formRect.bottom > 0;
            }
            
            // Show sticky CTA after scrolling 500px down, but hide if at form
            if (currentScroll > 500 && !isAtForm) {
                stickyCTA.classList.add('visible');
            } else {
                stickyCTA.classList.remove('visible');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Back to Top Button - Show only after scrolling 1/3 of page
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        // Click handler
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Scroll handler - show only after 1/3 of page height
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            const oneThirdOfPage = pageHeight / 3;
            
            if (scrollPosition > oneThirdOfPage) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    }
}

// Gallery Lightbox
function initializeGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item-large, .gallery-item');
    
    let currentIndex = 0;
    let visibleItems = [];
    
    // Update visible items based on current filter and display
    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => {
            return item.style.display !== 'none' && item.offsetParent !== null;
        });
    }
    
    // Open lightbox
    function openLightbox(index) {
        updateVisibleItems();
        currentIndex = index;
        const item = visibleItems[currentIndex];
        
        if (!item) return;
        
        const img = item.querySelector('img');
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || 'Gallery image';
        
        // Simple caption with just the alt text
        lightboxCaption.innerHTML = img.alt ? `<p>${img.alt}</p>` : '';
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons visibility
        lightboxPrev.style.display = currentIndex > 0 ? 'block' : 'none';
        lightboxNext.style.display = currentIndex < visibleItems.length - 1 ? 'block' : 'none';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navigate to previous image
    function prevImage() {
        if (currentIndex > 0) {
            openLightbox(currentIndex - 1);
        }
    }
    
    // Navigate to next image
    function nextImage() {
        if (currentIndex < visibleItems.length - 1) {
            openLightbox(currentIndex + 1);
        }
    }
    
    // Add click events to gallery items
    galleryItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            updateVisibleItems();
            const visibleIndex = visibleItems.indexOf(item);
            if (visibleIndex !== -1) {
                openLightbox(visibleIndex);
            }
        });
    });
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

// ========================================
// DROPDOWN MENU HANDLING
// ========================================
function initializeDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.has-dropdown');
    let activeDropdown = null;
    
    dropdownTriggers.forEach(trigger => {
        const dropdown = trigger.querySelector('.dropdown-menu');
        const link = trigger.querySelector('a');
        
        // Toggle dropdown on click
        link.addEventListener('click', function(e) {
            // On mobile (when menu is vertical), toggle the dropdown
            const isMobile = window.innerWidth <= 900;
            
            if (isMobile) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle this dropdown
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                } else {
                    dropdown.style.display = 'block';
                }
            } else {
                // On desktop, prevent default and toggle
                e.preventDefault();
                e.stopPropagation();
                
                // If this dropdown is already active, close it
                if (activeDropdown === dropdown && dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                    activeDropdown = null;
                } else {
                    // Close any other open dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(d => {
                        d.style.display = 'none';
                    });
                    
                    // Open this dropdown
                    dropdown.style.display = 'block';
                    activeDropdown = dropdown;
                }
            }
        });
        
        // Also show on hover (for desktop only)
        trigger.addEventListener('mouseenter', function() {
            if (window.innerWidth > 900) {
                dropdown.style.display = 'block';
                activeDropdown = dropdown;
            }
        });
    });
    
    // Close dropdown on scroll (desktop only)
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 900 && activeDropdown) {
            activeDropdown.style.display = 'none';
            activeDropdown = null;
        }
    });
    
    // Close dropdown when clicking outside (desktop only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 900 && !e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(d => {
                d.style.display = 'none';
            });
            activeDropdown = null;
        }
    });
}

// ========================================
// SERVICE ACCORDION
// ========================================
function initializeServiceAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        // Add both click and touchstart for mobile compatibility
        const handleToggle = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const accordionItem = this.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const toggle = this.querySelector('.accordion-toggle');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Find the parent accordion container
            const parentAccordion = this.closest('.service-accordion');
            
            // Close other accordion items in the same container only
            if (parentAccordion) {
                parentAccordion.querySelectorAll('.accordion-item').forEach(item => {
                    if (item !== accordionItem) {
                        const otherHeader = item.querySelector('.accordion-header');
                        const otherContent = item.querySelector('.accordion-content');
                        const otherToggle = item.querySelector('.accordion-toggle');
                        if (otherHeader && otherContent && otherToggle) {
                            otherHeader.setAttribute('aria-expanded', 'false');
                            otherContent.style.maxHeight = '0';
                            otherToggle.textContent = '+';
                        }
                    }
                });
            }
            
            // Toggle current accordion item
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                accordionContent.style.maxHeight = '0';
                toggle.textContent = '+';
            } else {
                this.setAttribute('aria-expanded', 'true');
                // Use scrollHeight + extra padding for all content
                accordionContent.style.maxHeight = (accordionContent.scrollHeight + 100) + 'px';
                toggle.textContent = '−';
            }
        };
        
        // Add both click and touchstart events for mobile
        header.addEventListener('click', handleToggle);
        header.addEventListener('touchstart', handleToggle, { passive: false });
    });
}

// ========================================
// ANIMATED LADDER STEPS
// ========================================
function initializeLadderSteps() {
    const ladderSteps = document.querySelectorAll('.ladder-step');
    
    if (ladderSteps.length === 0) return;
    
    ladderSteps.forEach(step => {
        const header = step.querySelector('.step-header');
        
        const handleToggle = (e) => {
            e.preventDefault();
            const isActive = step.classList.contains('active');
            
            // Close all other steps
            ladderSteps.forEach(s => s.classList.remove('active'));
            
            // Toggle current step
            if (!isActive) {
                step.classList.add('active');
            }
        };
        
        // Add both click and touch events for mobile
        header.addEventListener('click', handleToggle);
        header.addEventListener('touchstart', handleToggle, { passive: false });
    });
}

// ========================================
// MASTER INITIALIZATION
// ========================================
// Run all initialization functions when DOM is ready
function initializeAll() {
    // Initialize all interactive elements
    initializeGalleryFilter();
    initializeTestimonialSlider();
    initializeSmoothScroll();
    initializeFAQ();
    initializeContactForm();
    initializeMobileMenu();
    initializeLadderSteps();
    initializeStickyCTA();
    initializeBackToTop();
    initializeGalleryLightbox();
    initializeServiceAccordion();
    initializeDropdowns();
}

// Check if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM not ready yet, wait for it
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    // DOM is already ready, run immediately
    initializeAll();
}

