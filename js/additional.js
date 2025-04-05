/**
 * Coffee Shops Tia Rosa - Funcionalidades Adicionais
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== Funcionalidade de abas na seção Sobre =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove a classe 'active' de todos os botões e conteúdos
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Adiciona a classe 'active' ao botão clicado
                btn.classList.add('active');

                // Ativa o conteúdo correspondente
                const tabId = btn.getAttribute('data-tab');
                const tabContent = document.getElementById(`${tabId}-tab`);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }

    // ===== Slider de Testemunhos =====
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    let currentTestimonialIndex = 0;

    if (testimonialSlides.length > 0) {
        // Função para mostrar o slide atual
        function showTestimonial(index) {
            // Remove a classe 'active' de todos os slides e dots
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));

            // Adiciona a classe 'active' ao slide e dot atuais
            testimonialSlides[index].classList.add('active');
            testimonialDots[index].classList.add('active');

            // Atualiza o índice atual
            currentTestimonialIndex = index;
        }

        // Mostra o primeiro slide inicialmente
        showTestimonial(0);

        // Event listeners para os botões de navegação
        if (prevTestimonialBtn && nextTestimonialBtn) {
            prevTestimonialBtn.addEventListener('click', () => {
                let prevIndex = currentTestimonialIndex - 1;
                if (prevIndex < 0) {
                    prevIndex = testimonialSlides.length - 1;
                }
                showTestimonial(prevIndex);
            });

            nextTestimonialBtn.addEventListener('click', () => {
                let nextIndex = currentTestimonialIndex + 1;
                if (nextIndex >= testimonialSlides.length) {
                    nextIndex = 0;
                }
                showTestimonial(nextIndex);
            });
        }

        // Event listeners para os dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });

        // Rotação automática dos testemunhos a cada 5 segundos
        setInterval(() => {
            let nextIndex = currentTestimonialIndex + 1;
            if (nextIndex >= testimonialSlides.length) {
                nextIndex = 0;
            }
            showTestimonial(nextIndex);
        }, 7000);
    }

    // ===== Acordeon de Perguntas Frequentes =====
    const accordionItems = document.querySelectorAll('.accordion-item');

    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');

            header.addEventListener('click', () => {
                // Fecha todos os outros itens
                accordionItems.forEach(i => {
                    if (i !== item) {
                        i.classList.remove('active');
                    }
                });

                // Toggle do item atual
                item.classList.toggle('active');
            });
        });
    }

    // ===== Modal de Planos Wi-Fi =====
    const modal = document.getElementById('wifi-modal');
    const modalOpenBtns = document.querySelectorAll('.open-modal');
    const modalCloseBtn = document.querySelector('.close-modal');
    const modalPlanName = document.getElementById('modal-plan-name');
    const modalPlanDesc = document.getElementById('modal-plan-description');
    const wifiForm = document.getElementById('wifi-form');

    if (modal && modalOpenBtns.length > 0) {
        // Dados dos planos para o modal
        const planData = {
            'Básico': 'O plano Básico oferece 30 minutos de acesso gratuito com consumo mínimo no estabelecimento. Ideal para quem precisa apenas checar e-mails ou enviar mensagens rapidamente.',
            'Premium': 'O plano Premium oferece acesso ilimitado durante todo o dia com velocidade de 50 Mbps, perfeito para trabalho remoto e streaming de vídeo. Você pode conectar até 3 dispositivos simultaneamente.',
            'Business': 'O plano Business é a solução completa para empresas e equipes, com acesso ilimitado mensal, velocidade de 100 Mbps, dispositivos ilimitados, espaço reservado e 1 café expresso por dia incluído.'
        };

        // Abrir o modal
        modalOpenBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                const planType = btn.getAttribute('data-plan');
                if (planType && modalPlanName && modalPlanDesc) {
                    modalPlanName.textContent = planType;
                    modalPlanDesc.textContent = planData[planType] || 'Informações do plano não disponíveis.';
                }

                modal.classList.add('open');
                document.body.style.overflow = 'hidden'; // Impede o scroll do body
            });
        });

        // Fechar o modal
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                modal.classList.remove('open');
                document.body.style.overflow = ''; // Restaura o scroll do body
            });
        }

        // Fechar o modal ao clicar fora dele
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        // Manipular o envio do formulário
        if (wifiForm) {
            wifiForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const submitBtn = wifiForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                submitBtn.disabled = true;
                submitBtn.textContent = 'Processando...';

                // Simula o envio do formulário
                setTimeout(() => {
                    const formData = new FormData(wifiForm);
                    const planType = modalPlanName.textContent;

                    // Cria uma mensagem de sucesso
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success';
                    successMessage.style.marginTop = '20px';
                    successMessage.style.padding = '15px';
                    successMessage.style.borderRadius = '4px';
                    successMessage.style.backgroundColor = '#d4edda';
                    successMessage.style.color = '#155724';
                    successMessage.style.border = '1px solid #c3e6cb';

                    successMessage.textContent = `Obrigado ${formData.get('name')}! Seu pedido para o plano ${planType} foi recebido com sucesso. Entraremos em contato pelo e-mail ${formData.get('email')} ou telefone ${formData.get('phone')} em breve.`;

                    // Limpa o formulário e adiciona a mensagem
                    wifiForm.reset();
                    wifiForm.parentNode.appendChild(successMessage);

                    // Restaura o botão
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;

                    // Remove a mensagem e fecha o modal após 5 segundos
                    setTimeout(() => {
                        successMessage.remove();
                        modal.classList.remove('open');
                        document.body.style.overflow = '';
                    }, 5000);
                }, 1500);
            });
        }
    }

    // ===== Zoom na Galeria =====
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (!img) return;

                // Cria o modal de zoom
                const zoomModal = document.createElement('div');
                zoomModal.className = 'zoom-modal';
                zoomModal.style.position = 'fixed';
                zoomModal.style.top = '0';
                zoomModal.style.left = '0';
                zoomModal.style.width = '100%';
                zoomModal.style.height = '100%';
                zoomModal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                zoomModal.style.display = 'flex';
                zoomModal.style.justifyContent = 'center';
                zoomModal.style.alignItems = 'center';
                zoomModal.style.zIndex = '2000';
                zoomModal.style.opacity = '0';
                zoomModal.style.transition = 'opacity 0.3s ease';

                // Cria a imagem ampliada
                const zoomImg = document.createElement('img');
                zoomImg.src = img.src;
                zoomImg.alt = img.alt;
                zoomImg.style.maxWidth = '90%';
                zoomImg.style.maxHeight = '90%';
                zoomImg.style.borderRadius = '8px';
                zoomImg.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                zoomImg.style.transform = 'scale(0.9)';
                zoomImg.style.transition = 'transform 0.3s ease';

                // Adiciona a imagem ao modal
                zoomModal.appendChild(zoomImg);

                // Adiciona o modal ao body
                document.body.appendChild(zoomModal);
                document.body.style.overflow = 'hidden';

                // Anima a entrada do modal
                setTimeout(() => {
                    zoomModal.style.opacity = '1';
                    zoomImg.style.transform = 'scale(1)';
                }, 50);

                // Fecha o modal ao clicar nele
                zoomModal.addEventListener('click', () => {
                    zoomModal.style.opacity = '0';
                    zoomImg.style.transform = 'scale(0.9)';
                    document.body.style.overflow = '';

                    setTimeout(() => {
                        document.body.removeChild(zoomModal);
                    }, 300);
                });
            });
        });
    }

    // ===== Filtro da Galeria =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryFilterItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryFilterItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove a classe 'active' de todos os botões
                filterBtns.forEach(b => b.classList.remove('active'));

                // Adiciona a classe 'active' ao botão clicado
                btn.classList.add('active');

                // Obtém o filtro selecionado
                const filter = btn.getAttribute('data-filter');

                // Filtra os itens da galeria
                galleryFilterItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';

                        // Adiciona animação de entrada
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';

                        // Esconde o item após a animação de saída
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===== Mostrar descrições da galeria ao passar o mouse =====
    const galleryDescriptions = document.querySelectorAll('.gallery-description');

    if (galleryDescriptions.length > 0) {
        galleryItems.forEach(item => {
            const description = item.querySelector('.gallery-description');

            if (description) {
                // Mostra a descrição ao passar o mouse
                item.addEventListener('mouseenter', () => {
                    description.style.opacity = '1';
                    description.style.transform = 'translateY(0)';
                });

                // Esconde a descrição ao remover o mouse
                item.addEventListener('mouseleave', () => {
                    description.style.opacity = '0';
                    description.style.transform = 'translateY(20px)';
                });
            }
        });
    }

    // ===== Animação nas informações de contato =====
    const infoItems = document.querySelectorAll('.info-item');
    const bookingCards = document.querySelectorAll('.booking-card');

    // Função para animar elementos quando entrarem na viewport
    function animateOnScroll(elements, animationClass) {
        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Aplica animações
    animateOnScroll(infoItems, 'fade-in');
    animateOnScroll(bookingCards, 'slide-up');

    // ===== Simulação de envio do formulário de contato =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            // Simula o envio do formulário
            setTimeout(() => {
                const formData = new FormData(contactForm);

                // Cria uma mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.style.marginTop = '20px';
                successMessage.style.padding = '15px';
                successMessage.style.borderRadius = '4px';
                successMessage.style.backgroundColor = '#d4edda';
                successMessage.style.color = '#155724';
                successMessage.style.border = '1px solid #c3e6cb';

                successMessage.textContent = `Obrigado ${formData.get('name')}! Sua mensagem foi enviada com sucesso. Responderemos para o e-mail ${formData.get('email')} o mais breve possível.`;

                // Limpa o formulário e adiciona a mensagem
                contactForm.reset();
                contactForm.appendChild(successMessage);

                // Restaura o botão
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;

                // Remove a mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
});
