AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic'
});
lucide.createIcons();
emailjs.init("qceElIiwyAr5RHB7Z");

const themeBtn = document.getElementById('theme-btn');
const body = document.body;

themeBtn.addEventListener('click', () => {
    const icon = document.getElementById('theme-icon');
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        icon.setAttribute('data-lucide', 'sun');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        icon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons();
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

const scrollTopBtn = document.getElementById('scroll-top');
const scrollDownBtn = document.getElementById('scroll-btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollDownBtn.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-sm');
    } else {
        nav.classList.remove('shadow-sm');
    }

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        let count = 0;

        projectItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all') {
                item.classList.remove('hide');
            } else if (filter === 'react') {
                if (category === 'react') {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            } else if (filter === 'javascript') {
                if (category === 'javascript') {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            }
        });
    });
});

const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset errors
        nameError.classList.add('d-none');
        emailError.classList.add('d-none');
        contactSuccess.classList.add('d-none');
        
        const nameVal = document.getElementById('form-name').value.trim();
        const emailVal = document.getElementById('form-email').value.trim();
        const messageVal = document.getElementById('form-message').value.trim();
        let isValid = true;
        
        if (!nameVal) {
            nameError.classList.remove('d-none');
            isValid = false;
        }
        
        if (!emailVal || !emailVal.includes('@')) {
            emailError.classList.remove('d-none');
            isValid = false;
        }
        
        if (!isValid) return;
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending...';
        
        const templateParams = {
            name: nameVal,
            email: emailVal,
            message: messageVal
        };

        emailjs.send('service_evx0089', 'template_i4mrwsm', templateParams)
            .then(() => {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                
                contactSuccess.classList.remove('d-none');
                contactForm.reset();
                
                setTimeout(() => {
                    contactSuccess.classList.add('d-none');
                }, 5000);
            }, (error) => {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                alert("Failed to send message. Please try again later.");
                console.error('EmailJS Error:', error);
            });
    });
}
