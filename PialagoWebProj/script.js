// ===== Typing Effect =====
const typedTextEl = document.getElementById('typedText');
const words = ['Web Developer', 'UI/UX Designer', 'Student', 'Freelancer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const sidenav = document.getElementById('sidenav');
let overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

menuToggle.addEventListener('click', () => {
    sidenav.classList.toggle('open');
    overlay.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.className = sidenav.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});

overlay.addEventListener('click', () => {
    sidenav.classList.remove('open');
    overlay.classList.remove('active');
    menuToggle.querySelector('i').className = 'fas fa-bars';
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Close mobile nav on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidenav.classList.remove('open');
            overlay.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
});

// ===== Skill Bar Animation =====
const skillFills = document.querySelectorAll('.skill-fill');

function animateSkills() {
    skillFills.forEach(fill => {
        const rect = fill.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            fill.style.width = fill.getAttribute('data-width') + '%';
        }
    });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===== Project Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== Scroll Fade-In Animation =====
function addFadeIn() {
    const elements = document.querySelectorAll(
        '.skill-category, .project-card, .about-grid, .contact-grid, .detail-item, .contact-item'
    );
    elements.forEach(el => el.classList.add('fade-in'));
}

function handleFadeIn() {
    document.querySelectorAll('.fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('visible');
        }
    });
}

addFadeIn();
window.addEventListener('scroll', handleFadeIn);
window.addEventListener('load', handleFadeIn);

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Simple email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset();
});

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = target.offsetTop;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });
});
