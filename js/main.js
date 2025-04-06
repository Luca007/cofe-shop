/**
 * Coffee Shops Tia Rosa - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Referências aos elementos do DOM
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    // Adiciona classe 'sticky' ao cabeçalho quando o usuário rola a página
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Toggle do menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Scroll suave ao clicar em links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - header.offsetHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Filtro de itens do menu
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            categoryBtns.forEach(btn => btn.classList.remove('active'));

            // Adiciona a classe 'active' ao botão clicado
            btn.classList.add('active');

            // Obtém a categoria do botão clicado
            const filter = btn.getAttribute('data-filter');

            // Filtra os itens do menu
            menuItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';

                    // Anima a entrada dos itens
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = 0;
                    item.style.transform = 'translateY(20px)';

                    // Oculta o item após a animação
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animação de entrada para os itens do menu ao carregar a página
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Manipulação do formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simula o envio do formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            // Simula um atraso de envio
            setTimeout(() => {
                // Exibe mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.';

                this.reset();
                this.parentNode.insertBefore(successMessage, this);

                submitBtn.disabled = false;
                submitBtn.textContent = originalText;

                // Remove a mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }

    // Manipulação do formulário de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simula o envio do formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const emailInput = this.querySelector('input[type="email"]');

            submitBtn.disabled = true;
            submitBtn.textContent = 'Processando...';

            // Simula um atraso de envio
            setTimeout(() => {
                // Exibe mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = `Obrigado por assinar nossa newsletter! Acabamos de enviar um e-mail de confirmação para ${emailInput.value}.`;

                this.reset();
                this.parentNode.insertBefore(successMessage, this);

                submitBtn.disabled = false;
                submitBtn.textContent = originalText;

                // Remove a mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1000);
        });
    }

    // Animação de fade-in para elementos durante o scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFade() {
        const triggerBottom = window.innerHeight * 0.8;

        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }

    // Adiciona a classe 'fade-in' a elementos selecionados
    document.querySelectorAll('.section-header, .about-image, .about-text, .menu-item, .plan, .gallery-item, .contact-info, .contact-form').forEach(el => {
        el.classList.add('fade-in');
        el.style.opacity = 0;
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.style.transform = 'translateY(20px)';
    });

    // Define a classe .visible para os elementos fade-in
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .fade-in.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            /* Excluir títulos e descrições da galeria do efeito de fade */
            .gallery-title-container, .gallery-title, .gallery-description {
                opacity: 1 !important;
                transform: none !important;
            }
        </style>
    `);

    // Verifica os elementos ao carregar a página
    window.addEventListener('load', checkFade);

    // Verifica os elementos ao rolar a página
    window.addEventListener('scroll', checkFade);
});
