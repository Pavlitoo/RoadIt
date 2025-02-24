// React компоненти для інтерактивних елементів сайту
// Зберегти як js/react-components.js

// Переконайтесь, що React і ReactDOM завантажені перед цим файлом

// Компонент для інтерактивного навігаційного меню
const NavMenu = () => {
    const [activeLink, setActiveLink] = React.useState('home');
    const [scrolled, setScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    
    // Ефект для відстеження прокрутки
    React.useEffect(() => {
        const handleScroll = () => {
            // Встановлюємо стан прокрутки
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
            
            // Визначаємо активний розділ на основі позиції прокрутки
            const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
            let currentSection = 'home';
            
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        currentSection = section;
                    }
                }
            });
            
            setActiveLink(currentSection);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    // Обробник кліку по пункту меню
    const handleLinkClick = (e, sectionId) => {
        e.preventDefault();
        setActiveLink(sectionId);
        setMobileMenuOpen(false);
        
        const target = document.getElementById(sectionId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    };
    
    // Переключення мобільного меню
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    
    return React.createElement('div', { className: 'header-content' },
        React.createElement('div', { className: 'logo' },
            React.createElement('h1', null, 'Ваше Ім\'я')
        ),
        React.createElement('nav', { className: `navbar ${mobileMenuOpen ? 'active' : ''}` },
            React.createElement('ul', null,
                [
                    { id: 'home', label: 'Головна' },
                    { id: 'about', label: 'Про мене' },
                    { id: 'skills', label: 'Навички' },
                    { id: 'portfolio', label: 'Портфоліо' },
                    { id: 'contact', label: 'Контакти' }
                ].map(item => (
                    React.createElement('li', { key: item.id },
                        React.createElement('a', {
                            href: `#${item.id}`,
                            className: activeLink === item.id ? 'active' : '',
                            onClick: (e) => handleLinkClick(e, item.id)
                        }, item.label)
                    )
                ))
            )
        ),
        React.createElement('div', {
            className: `hamburger ${mobileMenuOpen ? 'active' : ''}`,
            onClick: toggleMobileMenu
        },
            React.createElement('span', null),
            React.createElement('span', null),
            React.createElement('span', null)
        )
    );
};

// Компонент для анімованого лічильника досягнень
const AnimatedCounter = ({ target, label, duration = 2000, symbol = '' }) => {
    const [count, setCount] = React.useState(0);
    const counterRef = React.useRef(null);
    
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    startCounting();
                    observer.unobserve(counterRef.current);
                }
            },
            { threshold: 0.5 }
        );
        
        if (counterRef.current) {
            observer.observe(counterRef.current);
        }
        
        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, []);
    
    const startCounting = () => {
        const increment = Math.ceil(target / (duration / 16));
        const startTime = Date.now();
        
        const updateCount = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Використовуємо easeOutQuad для більш плавного закінчення
            const easedProgress = 1 - (1 - progress) * (1 - progress);
            const currentCount = Math.round(target * easedProgress);
            
            setCount(currentCount);
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };
        
        updateCount();
    };
    
    return React.createElement('div', {
        className: 'counter-item',
        ref: counterRef
    },
        React.createElement('div', { className: 'counter-value' }, `${count}${symbol}`),
        React.createElement('div', { className: 'counter-label' }, label)
    );
};

// Компонент галереї проектів з фільтрацією
const PortfolioGallery = () => {
    // Приклад проектів
    const projects = [
        { id: 1, title: 'Веб-сайт компанії', category: 'web', image: '/api/placeholder/400/300' },
        { id: 2, title: 'Мобільний додаток', category: 'mobile', image: '/api/placeholder/400/300' },
        { id: 3, title: 'Дизайн логотипу', category: 'design', image: '/api/placeholder/400/300' },
        { id: 4, title: 'Онлайн магазин', category: 'web', image: '/api/placeholder/400/300' },
        { id: 5, title: 'Макет інтерфейсу', category: 'design', image: '/api/placeholder/400/300' },
        { id: 6, title: 'Ігровий додаток', category: 'mobile', image: '/api/placeholder/400/300' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const [visibleProjects, setVisibleProjects] = React.useState(projects);
    
    // Ефект для фільтрації проектів
    React.useEffect(() => {
        if (filter === 'all') {
            setVisibleProjects(projects);
        } else {
            setVisibleProjects(projects.filter(project => project.category === filter));
        }
    }, [filter]);
    
    return React.createElement('div', null,
        React.createElement('div', { className: 'portfolio-filters' },
            [
                { value: 'all', label: 'Усі' },
                { value: 'web', label: 'Веб-сайти' },
                { value: 'mobile', label: 'Мобільні додатки' },
                { value: 'design', label: 'Дизайн' }
            ].map(item => (
                React.createElement('button', {
                    key: item.value,
                    className: `filter-btn ${filter === item.value ? 'active' : ''}`,
                    onClick: () => setFilter(item.value)
                }, item.label)
            ))
        ),
        React.createElement('div', { className: 'portfolio-grid' },
            visibleProjects.map(project => (
                React.createElement('div', {
                    key: project.id,
                    className: 'portfolio-item',
                    'data-category': project.category
                },
                    React.createElement('div', { className: 'portfolio-image' },
                        React.createElement('img', {
                            src: project.image,
                            alt: project.title
                        }),
                        React.createElement('div', { className: 'overlay' },
                            React.createElement('div', { className: 'overlay-content' },
                                React.createElement('h3', null, project.title),
                                React.createElement('p', null, project.category === 'web' ? 'Веб-розробка' :
                                    project.category === 'mobile' ? 'Мобільна розробка' : 'Дизайн'),
                                React.createElement('a', {
                                    href: '#',
                                    className: 'btn',
                                    onClick: (e) => e.preventDefault()
                                }, 'Переглянути')
                            )
                        )
                    )
                )
            ))
        )
    );
};

// Компонент форми зворотного зв'язку з валідацією
const ContactForm = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const [errors, setErrors] = React.useState({});
    const [submitted, setSubmitted] = React.useState(false);
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        
        // Очищаємо помилку при введенні нового значення
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: null
            }));
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Будь ласка, введіть ваше ім\'я';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Будь ласка, введіть вашу електронну пошту';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Введіть коректну адресу електронної пошти';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Будь ласка, введіть тему повідомлення';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Будь ласка, введіть текст повідомлення';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Повідомлення має містити щонайменше 10 символів';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Тут був би код для відправки даних на сервер
            console.log('Form data:', formData);
            
            // Показуємо повідомлення про успішну відправку
            setSubmitted(true);
            
            // Очищаємо форму
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            
            // Через 5 секунд ховаємо повідомлення
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        }
    };
    
    return React.createElement('div', { className: 'contact-form' },
        submitted && React.createElement('div', { className: 'success-message' },
            'Дякую! Ваше повідомлення успішно надіслано. Я зв\'яжуся з вами найближчим часом.'
        ),
        React.createElement('form', { id: 'contactForm', onSubmit: handleSubmit },
            React.createElement('div', { className: 'form-group' },
                React.createElement('input', {
                    type: 'text',
                    id: 'name',
                    placeholder: 'Ваше ім\'я',
                    value: formData.name,
                    onChange: handleChange,
                    className: errors.name ? 'error' : ''
                }),
                errors.name && React.createElement('div', { className: 'error-message' }, errors.name)
            ),
            React.createElement('div', { className: 'form-group' },
                React.createElement('input', {
                    type: 'email',
                    id: 'email',
                    placeholder: 'Ваш email',
                    value: formData.email,
                    onChange: handleChange,
                    className: errors.email ? 'error' : ''
                }),
                errors.email && React.createElement('div', { className: 'error-message' }, errors.email)
            ),
            React.createElement('div', { className: 'form-group' },
                React.createElement('input', {
                    type: 'text',
                    id: 'subject',
                    placeholder: 'Тема',
                    value: formData.subject,
                    onChange: handleChange,
                    className: errors.subject ? 'error' : ''
                }),
                errors.subject && React.createElement('div', { className: 'error-message' }, errors.subject)
            ),
            React.createElement('div', { className: 'form-group' },
                React.createElement('textarea', {
                    id: 'message',
                    placeholder: 'Ваше повідомлення',
                    value: formData.message,
                    onChange: handleChange,
                    className: errors.message ? 'error' : ''
                }),
                errors.message && React.createElement('div', { className: 'error-message' }, errors.message)
            ),
            React.createElement('button', { 
                type: 'submit', 
                className: 'btn primary' 
            }, 'Надіслати повідомлення')
        )
    );
};

// Компонент навичок з анімацією
const SkillsSection = () => {
    const skills = [
        { name: 'HTML5', level: 90, icon: 'fab fa-html5' },
        { name: 'CSS3', level: 85, icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', level: 80, icon: 'fab fa-js' },
        { name: 'React', level: 75, icon: 'fab fa-react' },
        { name: 'Node.js', level: 70, icon: 'fab fa-node-js' },
        { name: 'UI/UX', level: 85, icon: 'fas fa-paint-brush' }
    ];
    
    return React.createElement('div', { className: 'skills-grid' },
        skills.map((skill, index) => (
            React.createElement(SkillItem, {
                key: index,
                name: skill.name,
                level: skill.level,
                icon: skill.icon
            })
        ))
    );
};

// Компонент однієї навички
const SkillItem = ({ name, level, icon }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const skillRef = React.useRef(null);
    
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(skillRef.current);
                }
            },
            { threshold: 0.1 }
        );
        
        if (skillRef.current) {
            observer.observe(skillRef.current);
        }
        
        return () => {
            if (skillRef.current) {
                observer.unobserve(skillRef.current);
            }
        };
    }, []);
    
    return React.createElement('div', { className: 'skill-item', ref: skillRef },
        React.createElement('div', { className: 'skill-icon' },
            React.createElement('i', { className: icon })
        ),
        React.createElement('h4', null, name),
        React.createElement('div', { className: 'skill-bar' },
            React.createElement('div', {
                className: 'skill-level',
                style: {
                    width: isVisible ? `${level}%` : '0%',
                    transition: 'width 1.5s ease-in-out'
                }
            })
        )
    );
};

// Основний компонент, який рендерить наші React-компоненти в DOM
document.addEventListener('DOMContentLoaded', function() {
    // Монтуємо навігаційне меню
    const headerContainer = document.querySelector('.header-content');
    if (headerContainer) {
        ReactDOM.render(
            React.createElement(NavMenu),
            headerContainer.parentNode.replaceChild(
                document.createElement('div'),
                headerContainer
            )
        );
    }
    
    // Монтуємо компонент навичок
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        ReactDOM.render(
            React.createElement(SkillsSection),
            skillsGrid
        );
    }
    
    // Монтуємо галерею портфоліо
    const portfolioContainer = document.querySelector('.portfolio-grid').parentNode;
    if (portfolioContainer) {
        const newContainer = document.createElement('div');
        portfolioContainer.replaceChild(newContainer, portfolioContainer.querySelector('.portfolio-filters').parentNode);
        ReactDOM.render(
            React.createElement(PortfolioGallery),
            newContainer
        );
    }
    
    // Монтуємо форму контактів
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        ReactDOM.render(
            React.createElement(ContactForm),
            contactForm
        );
    }
});