document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // ==================================================
    // ============= LÓGICA DO CURSOR ANIMADO ===========
    // ==================================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Verifica se é um dispositivo de toque para desativar o cursor customizado
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice()) {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    } else {
        // Apenas adiciona os eventos de mouse se não for um dispositivo de toque
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursorDot) {
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;
            }
        });

        // Adiciona efeito de hover em links e botões
        const interactiveElements = document.querySelectorAll('a, button, .menu-toggle, .btn-term');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseover', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    }


    // ==================================================
    // ============== LÓGICA DO MENU MÓVEL ==============
    // ==================================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // ==================================================
    // ========= LÓGICA DO TERMINAL "SOBRE MIM" =========
    // ==================================================
    const terminalContent = document.getElementById('terminal-content');
    if (terminalContent) {
        const lines = [
            { text: '<span class="terminal-greeting">Cammilly Rafaella | UX/UI Developer</span>', type: 'html', delay: 100 },
            { text: '<p class="terminal-headline">Criatividade na intersecção com a lógica.</p>', type: 'html' },
            { text: '<p class="terminal-description">Minha jornada na Gestão da Tecnologia da Informação é complementada por uma profunda experiência em Design Gráfico, o que me posiciona na intersecção perfeita entre a criatividade e a lógica. Sou uma autodidata movida pela curiosidade, dedicando-me ao Web Design e ao Desenvolvimento Front-End.</p>', type: 'html' },
            { text: '<p class="terminal-quote">Eu não apenas construo a web; eu a otimizo, garantindo que a experiência do usuário (UX/UI) seja fluida, funcional e visualmente impecável.</p>', type: 'html', delay: 500 }
        ];

        let lineIndex = 0;

        function typeLine() {
            if (lineIndex < lines.length) {
                const line = lines[lineIndex];
                const lineElement = document.createElement('div');
                terminalContent.appendChild(lineElement);

                if (line.type === 'html') {
                    lineElement.innerHTML = line.text;
                    lineElement.style.opacity = 1; // Mostra de uma vez
                } else {
                    // Simula a digitação para comandos e infos
                    let charIndex = 0;
                    function typeChar() {
                        if (charIndex < line.text.length) {
                            lineElement.textContent += line.text.charAt(charIndex);
                            charIndex++;
                            setTimeout(typeChar, 30);
                        }
                    }
                    typeChar();
                }

                lineIndex++;
                setTimeout(typeLine, line.delay || 200);
            }
        }
        typeLine();
    }

    // ==================================================
    // ========= LÓGICA DO FORMULÁRIO DE CONTATO ========
    // ==================================================
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');

    let currentStep = 1;

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < formSteps.length) {
                currentStep++;
                updateFormSteps();
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateFormSteps();
            }
        });
    });

    function updateFormSteps() {
        // Esconde todas as etapas
        formSteps.forEach(step => {
            step.classList.remove('active');
        });
        // Mostra a etapa atual
        document.getElementById(`step-${currentStep}`).classList.add('active');

        // Atualiza a barra de progresso
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index < currentStep);
        });
    }

    // ==================================================
    // ========= ANIMAÇÃO DE SCROLL (REVEAL) ============
    // ==================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    // Aplica um delay escalonado para um efeito de cascata
    revealElements.forEach((el, index) => {
        // A cada 5 elementos, o delay reinicia, evitando delays muito longos
        const delay = (index % 5) * 100; // Atraso de 100ms, 200ms, etc.
        el.style.transitionDelay = `${delay}ms`;
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para de observar após a animação
            }
        });
    }, {
        threshold: 0.1 // Ativa quando 10% do elemento estiver visível
    });

    revealElements.forEach(el => revealObserver.observe(el));
});