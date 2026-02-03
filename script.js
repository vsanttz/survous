// ===== LOADING STATE =====
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    const loadingBar = document.getElementById('loadingBar');
    
    // Animar barra de loading
    loadingBar.style.transform = 'scaleX(1)';
    
    // Adicionar delay para garantir que tudo carregou
    setTimeout(() => {
        loadingBar.style.transform = 'scaleX(0)';
        loading.classList.add('loaded');
        
        setTimeout(() => {
            loading.style.display = 'none';
            loadingBar.style.display = 'none';
            showToast('Bem-vindo!');
        }, 500);
    }, 1000);
});

// ===== PARTÍCULAS OTIMIZADAS =====
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 70, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: '#8a2be2' 
                },
                shape: { 
                    type: 'circle' 
                },
                opacity: { 
                    value: 0.5, 
                    random: true,
                    anim: { 
                        enable: true, 
                        speed: 1, 
                        opacity_min: 0.1 
                    } 
                },
                size: { 
                    value: 3, 
                    random: true,
                    anim: { 
                        enable: true, 
                        speed: 2, 
                        size_min: 0.1 
                    } 
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#8a2be2',
                    opacity: 0.2,
                    width: 1
                },
                move: { 
                    enable: true, 
                    speed: 1.5, 
                    direction: 'none', 
                    random: true,
                    out_mode: 'out' 
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { 
                        enable: true, 
                        mode: 'repulse' 
                    },
                    onclick: { 
                        enable: true, 
                        mode: 'push' 
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// ===== HEADER SCROLL EFFECT =====
let lastScrollTop = 0;
const header = document.getElementById('header');

function handleHeaderScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
        
        // Esconder/mostrar baseado na direção do scroll
        if (currentScroll > lastScrollTop && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.classList.remove('scrolled');
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

function handleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    showToast('Menu aberto');
});

menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Fechar menu ao clicar fora
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== TYPEWRITER EFFECT =====
const typewriterText = document.getElementById('typewriterText');
const texts = [
    "Design que impressiona...",
    "Desenvolvimento web premium...",
    "Soluções digitais completas...",
    "Inovação e tecnologia...",
    "Experiências revolucionárias..."
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let typewriterPaused = false;
let lastTypingTime = Date.now();
let typewriterTimeout = null;
let isTabActive = true;

// Função principal do typewriter otimizada
function typeWriter() {
    if (!typewriterText) return;
    
    const now = Date.now();
    const timeSinceLastTyping = now - lastTypingTime;
    const currentText = texts[textIndex];
    
    // Se a aba estava inativa por muito tempo, continuar de onde parou
    if (typewriterTimeout && timeSinceLastTyping > typingSpeed * 10) {
        // Ajustar o tempo para continuar suavemente
        lastTypingTime = now - typingSpeed;
    }
    
    if (isDeleting) {
        typewriterText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriterText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pausa no final
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pausa antes de começar novo texto
    }
    
    lastTypingTime = now;
    clearTimeout(typewriterTimeout);
    typewriterTimeout = setTimeout(typeWriter, typingSpeed);
}

// Iniciar o typewriter
function startTypewriter() {
    if (!typewriterText) return;
    
    // Limpar qualquer timeout existente
    clearTimeout(typewriterTimeout);
    
    // Resetar se estiver vazio ou se o texto atual não corresponde
    const currentText = texts[textIndex];
    const currentDisplay = typewriterText.textContent;
    
    if (!currentDisplay || currentDisplay.trim() === '' || 
        (!currentDisplay.startsWith(currentText.substring(0, Math.max(0, charIndex - 1))) && 
         !currentDisplay.startsWith(currentText.substring(0, Math.max(0, charIndex + 1))))) {
        // Reset para evitar travamentos
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        typewriterText.textContent = '';
    }
    
    // Iniciar a animação
    typewriterTimeout = setTimeout(typeWriter, 100);
}

// Pausar/continuar baseado na visibilidade
function handleTypewriterVisibility() {
    if (!typewriterText) return;
    
    const typewriterRect = typewriterText.getBoundingClientRect();
    const isVisible = (
        typewriterRect.top < window.innerHeight &&
        typewriterRect.bottom > 0
    );
    
    typewriterPaused = !isVisible;
    
    if (!typewriterPaused && isTabActive) {
        startTypewriter();
    }
}

// Gerenciar estado da aba
document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
    
    if (isTabActive) {
        // Quando a aba volta a ficar ativa
        lastTypingTime = Date.now(); // Atualizar o tempo
        
        // Recalcular a posição atual baseada no tempo passado
        if (typewriterText && typewriterText.textContent) {
            const currentText = texts[textIndex];
            const expectedProgress = Math.min(
                currentText.length,
                Math.floor((Date.now() - lastTypingTime) / typingSpeed)
            );
            
            // Ajustar se houver grande discrepância
            if (Math.abs(charIndex - expectedProgress) > 5) {
                charIndex = Math.max(0, Math.min(currentText.length, expectedProgress));
                typewriterText.textContent = currentText.substring(0, charIndex);
            }
        }
        
        handleTypewriterVisibility();
    } else {
        // Quando a aba fica inativa, apenas limpamos o timeout
        // mas mantemos o estado para continuar depois
        clearTimeout(typewriterTimeout);
    }
});

// Função de recuperação se algo der errado
function recoverTypewriter() {
    if (!typewriterText || !isTabActive) return;
    
    const currentText = texts[textIndex];
    const currentDisplay = typewriterText.textContent;
    
    // Verificar se o texto atual está muito diferente do esperado
    if (currentDisplay && currentText) {
        const expectedStart = currentText.substring(0, Math.max(0, charIndex - 3));
        const actualStart = currentDisplay.substring(0, Math.max(0, charIndex - 3));
        
        if (expectedStart !== actualStart) {
            // Resetar para evitar travamentos visuais
            textIndex = 0;
            charIndex = 0;
            isDeleting = false;
            typewriterText.textContent = '';
            startTypewriter();
            console.log('Typewriter recuperado');
        }
    }
}

// ===== SERVICE CARDS ANIMATION =====
const serviceCards = document.querySelectorAll('.service-card');
let animationEnabled = window.innerWidth > 768;

function animateServiceCard(card) {
    if (!animationEnabled) return;
    
    card.classList.add('animated');
    setTimeout(() => {
        card.classList.remove('animated');
    }, 600);
}

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        if (window.innerWidth > 768) {
            animateServiceCard(card);
            
            // Mostrar toast com informações do serviço
            const service = card.getAttribute('data-service');
            const serviceTitles = {
                'web': 'Desenvolvimento Web',
                'design': 'Design UI/UX',
                'branding': 'Identidade Visual'
            };
            
            showToast(`Interessado em ${serviceTitles[service]}? Entre em contato!`);
        }
    });
    
    // Desktop: hover effect
    if (window.innerWidth > 768) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('animated')) {
                card.style.transform = 'translateY(0)';
            }
        });
    }
});

// ===== MOBILE SCROLL ANIMATION =====
function setupIntersectionObserver() {
    if (window.innerWidth <= 768) {
        animationEnabled = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animar elementos filhos
                    const childElements = entry.target.querySelectorAll('.tech-item, .service-card, .visual-card');
                    childElements.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('fade-in');
                        }, index * 100);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar todas as seções
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    } else {
        animationEnabled = true;
    }
}

// ===== STATS COUNTER =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    const section = document.querySelector('.stats-container');
    if (!section) return;
    
    const sectionPosition = section.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
        
        statsAnimated = true;
        showToast('Nossas estatísticas impressionam!');
    }
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm?.querySelector('.submit-btn');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validação básica
        const name = contactForm.querySelector('#name');
        const email = contactForm.querySelector('#email');
        const subject = contactForm.querySelector('#subject');
        const message = contactForm.querySelector('#message');
        const nameError = contactForm.querySelector('#nameError');
        const emailError = contactForm.querySelector('#emailError');
        const subjectError = contactForm.querySelector('#subjectError');
        const messageError = contactForm.querySelector('#messageError');
        
        let isValid = true;
        
        // Reset errors
        [nameError, emailError, subjectError, messageError].forEach(el => el.textContent = '');
        
        // Validação
        if (!name.value.trim()) {
            nameError.textContent = 'Por favor, insira seu nome completo';
            isValid = false;
        }
        
        if (!email.value.trim()) {
            emailError.textContent = 'Por favor, insira seu email';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            emailError.textContent = 'Por favor, insira um email válido';
            isValid = false;
        }
        
        if (!subject.value) {
            subjectError.textContent = 'Por favor, selecione o tipo de projeto';
            isValid = false;
        }
        
        if (!message.value.trim()) {
            messageError.textContent = 'Por favor, descreva seu projeto';
            isValid = false;
        } else if (message.value.trim().length < 20) {
            messageError.textContent = 'Por favor, forneça mais detalhes (mínimo 20 caracteres)';
            isValid = false;
        }
        
        if (!isValid) {
            showToast('Por favor, preencha todos os campos obrigatórios corretamente.', 'warning');
            return;
        }
        
        // Simular envio
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        showToast('Enviando sua proposta...');
        
        // Simulação de API call
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Mostrar modal de sucesso
            const modal = document.getElementById('successModal');
            const successMessage = document.getElementById('successMessage');
            const closeModal = document.getElementById('closeModal');
            const scheduleCall = document.getElementById('scheduleCall');
            
            successMessage.textContent = `Obrigado, ${name.value}! Sua proposta para "${subject.options[subject.selectedIndex].text}" foi enviada com sucesso. Nossa equipe entrará em contato em até 24 horas úteis.`;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Fechar modal
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Agendar call
            scheduleCall.addEventListener('click', () => {
                modal.classList.remove('active');
                showToast('Redirecionando para agendamento...');
                setTimeout(() => {
                    // Aqui você redirecionaria para um calendário
                    alert('Funcionalidade de agendamento será implementada em breve!');
                }, 500);
            });
            
            // Fechar modal ao clicar fora
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Fechar modal com ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Reset form
            contactForm.reset();
            
            // Mostrar toast de confirmação
            showToast('Proposta enviada com sucesso! Entraremos em contato em breve.');
            
        }, 2000);
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Se for a seção de serviços, animar stats
                if (entry.target.classList.contains('services-section')) {
                    setTimeout(animateStats, 500);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se aberto
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// ===== TOAST NOTIFICATION =====
const toast = document.getElementById('toast');
const toastText = toast.querySelector('.toast-text');

function showToast(message, type = 'info') {
    toastText.textContent = message;
    
    // Remover classes anteriores
    toast.classList.remove('info', 'success', 'warning', 'error');
    toast.classList.add(type);
    
    // Mostrar toast
    toast.classList.add('show');
    
    // Esconder após 5 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ===== PERFORMANCE MONITORING =====
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                if (loadTime > 3000) {
                    console.log('Performance Alert: Carregamento demorou', loadTime, 'ms');
                } else {
                    console.log('Performance: Excelente tempo de carregamento', loadTime, 'ms');
                }
            }, 0);
        });
    }
}

// ===== RESIZE HANDLER =====
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        setupIntersectionObserver();
        handleHeaderScroll();
        handleBackToTop();
        handleTypewriterVisibility();
    }, 250);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar funcionalidades principais
    initParticles();
    initLazyLoading();
    initScrollAnimations();
    setupIntersectionObserver();
    monitorPerformance();
    
    // Iniciar typewriter imediatamente e garantir que continue
    setTimeout(() => {
        startTypewriter();
        
        // Monitorar periodicamente se precisa de recuperação
        setInterval(recoverTypewriter, 5000);
    }, 1500);
    
    // Event listeners
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        handleBackToTop();
        handleTypewriterVisibility();
    });
    
    window.addEventListener('resize', handleResize);
    
    // Inicializar estados
    handleHeaderScroll();
    handleBackToTop();
    handleTypewriterVisibility();
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        showToast('Bem-vindo!');
    }, 2000);
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registrado com sucesso:', registration.scope);
        }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}