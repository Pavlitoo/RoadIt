// Основні JavaScript функції
document.addEventListener('DOMContentLoaded', function() {
    // Мобільне меню
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }
    
    // Закривання меню при кліку на посилання
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
    
    // Зміна стилю хедера при прокрутці
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Фільтрація проектів у портфоліо
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Видаляємо активний клас з усіх кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Додаємо активний клас до натиснутої кнопки
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Анімація прогресу навичок
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Функція для перевірки, чи елемент у видимій області
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Функція для анімації прогресу навичок
    function animateSkills() {
        skillLevels.forEach(skill => {
            if (isElementInViewport(skill) && !skill.classList.contains('animated')) {
                skill.classList.add('animated');
                skill.style.width = skill.style.width || '0%';
                
                const targetWidth = skill.parentElement.parentElement.querySelector('h4').textContent;
                // Визначаємо цільову ширину на основі назви навички або атрибута даних
                let width;
                switch(targetWidth) {
                    case 'HTML5': width = '90%'; break;
                    case 'CSS3': width = '85%'; break;
                    case 'JavaScript': width = '80%'; break;
                    case 'React': width = '75%'; break;
                    default: width = skill.getAttribute('data-level') || '70%';
                }
                
                skill.style.width = width;
            }
        });
    }
    
    // Викликаємо один раз для перевірки навичок, які вже у видимій області
    animateSkills();
    
    // Додаємо слухача подій прокрутки для анімації навичок
    window.addEventListener('scroll', animateSkills);
    
    // Обробка форми контактів
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Отримуємо дані форми
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Перевірка заповнення полів (можна розширити)
            if (!name || !email || !subject || !message) {
                alert('Будь ласка, заповніть усі поля');
                return;
            }
            
            // Тут ви б відправили дані на сервер
            // Але оскільки у нас статичний сайт, ми просто покажемо повідомлення
            alert(`Дякую, ${name}! Ваше повідомлення отримано. Я зв'яжуся з вами найближчим часом.`);
            
            // Очищаємо форму
            contactForm.reset();
        });
    }
    
    // Плавна прокрутка до секцій при кліку на посилання
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Компенсуємо висоту хедера
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ефект набору тексту для головного заголовка
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        const text = animatedText.textContent;
        animatedText.innerHTML = '';
        
        // Функція для послідовного виведення символів
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                animatedText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Запускаємо ефект через 1 секунду після завантаження сторінки
        setTimeout(typeWriter, 1000);
    }
});