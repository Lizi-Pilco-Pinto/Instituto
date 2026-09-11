document.addEventListener('DOMContentLoaded', () => {
    // ===== MENÚ HAMBURGUESA =====
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open);
            toggle.textContent = open ? '×' : '☰';
            document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        });
    }

    // ===== DROPDOWNS (con teclado) =====
    function toggleDropdown(btn) {
        const parent = btn.closest('.dropdown');
        if (!parent) return;
        const wasOpen = parent.classList.contains('open');
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        if (!wasOpen) parent.classList.add('open');
    }

    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDropdown(btn);
        });
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown(btn);
            }
        });
    });

    // Cerrar dropdowns y menú al hacer clic fuera o con Escape
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown') && !e.target.closest('.menu-toggle')) {
            document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        }
        // Cerrar menú al hacer clic en un enlace
        const link = e.target.closest('.main-nav a:not(.dropdown-toggle)');
        if (link) {
            nav?.classList.remove('open');
            if (toggle) {
                toggle.textContent = '☰';
                toggle.setAttribute('aria-expanded', 'false');
            }
            document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (nav?.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.textContent = '☰';
                toggle.setAttribute('aria-expanded', 'false');
            }
            document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        }
    });

    // ===== RESALTAR ENLACE ACTIVO =====
    const path = location.pathname;
    document.querySelectorAll('.main-nav a, .dropdown-menu a').forEach(a => {
        if (a.getAttribute('href') && new URL(a.href, location.origin).pathname === path) {
            a.classList.add('active');
        }
    });

    // ===== ACORDEÓN (con icono +/−) =====
    document.querySelectorAll('.accordion-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.closest('.accordion-item').querySelector('.accordion-content');
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            content.style.maxHeight = expanded ? null : content.scrollHeight + 'px';
            const icon = btn.querySelector('.accordion-icon');
            if (icon) icon.textContent = expanded ? '+' : '−';
        });
    });

    // ===== TABS (generales) =====
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab)?.classList.add('active');
        });
    });

    // ===== TABS DE UNIDAD =====
    document.querySelectorAll('.tab-unit').forEach(tab => {
        tab.addEventListener('click', () => {
            const parent = tab.closest('.container');
            parent.querySelectorAll('.tab-unit').forEach(t => t.classList.remove('active'));
            parent.querySelectorAll('.tab-panel-unit').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            parent.querySelector('#' + tab.dataset.tab)?.classList.add('active');
        });
    });
    //  INICIALIZAR MODALES (NUEVO)
    initModal();
    initPersonalModal();

    //  INICIALIZAR SLIDERS
    initHeroSlider();
    initUnitSliders();
    initLightbox();
});

// ===== SLIDER HERO =====
function initHeroSlider() {
    const wrapper = document.querySelector('.hero-slider-wrapper');
    if (!wrapper) return;
    const slider = wrapper.querySelector('.hero-slider');
    if (!slider) return;
    const slides = slider.querySelectorAll('.slide');
    if (slides.length === 0) return;
    let current = 0;
    const total = slides.length;
    let interval;

    function goTo(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        current = index;
        slider.style.transform = `translateX(-${current * 100}%)`;
        wrapper.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function startAuto() { interval = setInterval(next, 5000); }
    function stopAuto() { if (interval) { clearInterval(interval); interval = null; } }

    wrapper.querySelector('.slider-prev')?.addEventListener('click', () => { stopAuto(); prev(); setTimeout(startAuto, 5000); });
    wrapper.querySelector('.slider-next')?.addEventListener('click', () => { stopAuto(); next(); setTimeout(startAuto, 5000); });
    wrapper.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            stopAuto();
            goTo(index);
            setTimeout(startAuto, 5000);
        });
    });
    startAuto();
}

// ===== SLIDER DE UNIDADES =====
function initUnitSliders() {
    document.querySelectorAll('.unit-slider-wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.unit-slider');
        if (!slider) return;
        const slides = slider.querySelectorAll('.slide');
        if (slides.length === 0) return;
        let current = 0;
        const total = slides.length;
        let interval;

        function goTo(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            current = index;
            slider.style.transform = `translateX(-${current * 100}%)`;
            wrapper.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === current);
            });
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }
        function startAuto() { interval = setInterval(next, 5000); }
        function stopAuto() { if (interval) { clearInterval(interval); interval = null; } }

        wrapper.querySelector('.unit-prev')?.addEventListener('click', () => { stopAuto(); prev(); setTimeout(startAuto, 5000); });
        wrapper.querySelector('.unit-next')?.addEventListener('click', () => { stopAuto(); next(); setTimeout(startAuto, 5000); });
        wrapper.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                stopAuto();
                goTo(index);
                setTimeout(startAuto, 5000);
            });
        });
        startAuto();
    });
}

// ===== MODAL DE NOTICIAS/EVENTOS =====
function initModal() {
    const modal = document.getElementById('modal-reciente');
    if (!modal) return;
    const closeBtn = document.getElementById('modal-close-btn');
    const acceptBtn = document.getElementById('modal-accept-btn');
    const firstFocusable = modal.querySelector('button, a, input');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (firstFocusable) firstFocusable.focus();
    }
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        sessionStorage.setItem('modal_visto', 'true');
    }

    if (!sessionStorage.getItem('modal_visto')) {
        openModal();
    }

    closeBtn?.addEventListener('click', closeModal);
    acceptBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

function initPersonalModal() {
    const modal = document.getElementById('modal-personal');
    if (!modal) return;
    const closeBtn = document.getElementById('modal-personal-close');
    const nombreEl = document.getElementById('modal-personal-nombre');
    const cargoEl = document.getElementById('modal-personal-cargo');
    const biografiaEl = document.getElementById('modal-personal-biografia');
    const fotoEl = document.getElementById('modal-personal-foto');

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.ver-mas-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            nombreEl.textContent = this.dataset.nombre;
            cargoEl.textContent = this.dataset.cargo;
            biografiaEl.textContent = this.dataset.biografia;
            fotoEl.src = this.dataset.foto;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}


// ===== LIGHTBOX =====
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('img:not(.logo-instituto):not(.logo-umsa)').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn?.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}