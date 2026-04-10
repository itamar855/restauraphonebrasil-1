// =============================================
// RESTAURA PHONE BRASIL — app.js
// =============================================

// ⚠️ CONFIGURE AQUI após criar conta no JSONBin.io
// Instruções: https://jsonbin.io → Sign Up → Create Bin
const JSONBIN_BIN_ID  = '69d8dc94aaba882197e3ae1f';       // Ex: 6615a3c0acd3cb34a83f1234
const JSONBIN_API_KEY = '$2a$10$AelfhOsosPOm6jx1Hstbf.EWUMr8M4oR3Gk.W19RILbu9p.97sCb2';       // Ex: $2a$10$...

const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`;

const WPP = {
    venda:       '5587988759176',
    santaLuzia:  '5587988759176',
    vilaEulalia: '5587988462254'
};
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzlrKO5d297-OMlZZ8KE83aHOLLfBSgLfmG7BYy05XdrfDbBbhqc0R2VI_Xt-2J09B6/exec';

// ---- CARREGAR APARELHOS DO JSONBIN ----
async function carregarAparelhos() {
    // Se ainda não configurou o JSONBin, usa lista padrão
    if (JSONBIN_BIN_ID === 'SEU_BIN_ID_AQUI') {
        return aparelhosPadrao();
    }
    try {
        const res = await fetch(JSONBIN_URL, {
            headers: { 'X-Master-Key': JSONBIN_API_KEY }
        });
        if (!res.ok) throw new Error('Falha ao carregar');
        const data = await res.json();
        const lista = data.record?.aparelhos ?? data.record ?? [];
        return lista.filter(a => a.ativo).sort((a,b) => (a.ordem||99)-(b.ordem||99));
    } catch(e) {
        console.warn('JSONBin indisponível, usando lista padrão.', e);
        return aparelhosPadrao();
    }
}

function aparelhosPadrao() {
    return [
        { id:1, nome:'iPhone 16 Pro Max',  preco:'R$ 6.599,00', specs:'Americano | 256GB',      imagem:'imagens/16pm.jpg',         destaque:true,  ordem:1, ativo:true },
        { id:2, nome:'iPhone 15 Pro Max',  preco:'R$ 5.399,00', specs:'Americano | 256GB',      imagem:'imagens/15pm.png',         destaque:true,  ordem:2, ativo:true },
        { id:3, nome:'iPhone 14 Pro',      preco:'R$ 3.499,00', specs:'Americano | 256GB',      imagem:'imagens/celular-1.webp',   destaque:false, ordem:3, ativo:true },
        { id:4, nome:'iPhone 13 Pro Max',  preco:'R$ 3.749,00', specs:'Americano | 256GB',      imagem:'imagens/13pm.jpg',         destaque:false, ordem:4, ativo:true },
        { id:5, nome:'iPhone 13',          preco:'R$ 2.399,00', specs:'Americano | 128GB',      imagem:'imagens/13.jpg',           destaque:false, ordem:5, ativo:true },
        { id:6, nome:'iPhone 11 Pro Max',  preco:'R$ 2.399,00', specs:'Americano | 256GB',      imagem:'imagens/11pm.jpg',         destaque:false, ordem:6, ativo:true },
        { id:7, nome:'Xiaomi Poco X7 Pro', preco:'R$ 1.599,00', specs:'256GB | AMOLED 120Hz | Bateria 5100mAh', imagem:'imagens/pocox7p.webp', destaque:true, ordem:7, ativo:true },
        { id:8, nome:'Realme Note 60',     preco:'R$ 699,90',   specs:'Tela 6.74" 90Hz | Bateria 5000mAh | IP54', imagem:'imagens/realmenote60.png', destaque:false, ordem:8, ativo:true },
    ];
}

// ---- RENDERIZAR CARROSSEL ----
function renderizarCarrossel(aparelhos) {
    const loading = document.getElementById('celulares-loading');
    const wrapper = document.getElementById('celulares-wrapper');
    const vazio   = document.getElementById('celulares-vazio');
    const swiperWrapper = document.getElementById('swiper-celulares-wrapper');

    loading.style.display = 'none';

    if (!aparelhos.length) {
        vazio.style.display = 'block';
        return;
    }

    aparelhos.forEach(ap => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="card-celular">
                ${ap.destaque ? '<div class="card-badge-destaque">⭐ Destaque</div>' : ''}
                <div class="card-foto">
                    <img src="${ap.imagem}" alt="${ap.nome}" loading="lazy">
                </div>
                <div class="card-info">
                    <h3 class="card-nome">${ap.nome}</h3>
                    ${ap.specs ? `<p class="card-specs">${ap.specs}</p>` : ''}
                    <div class="card-footer">
                        <span class="card-preco">${ap.preco}</span>
                        <span class="card-cta">Ver mais →</span>
                    </div>
                </div>
            </div>`;
        slide.querySelector('.card-celular').addEventListener('click', () => {
            abrirModalCelular({ nome: ap.nome, preco: ap.preco, specs: ap.specs, img: ap.imagem });
        });
        swiperWrapper.appendChild(slide);
    });

    wrapper.style.display = 'block';

    new Swiper('.swiper-celulares', {
        loop: true, slidesPerView: 1.15, spaceBetween: 14, centeredSlides: true,
        pagination: { el: '.swiper-pagination-celulares', clickable: true },
        breakpoints: {
            520:  { slidesPerView: 2.2, spaceBetween: 18 },
            768:  { slidesPerView: 3.2, spaceBetween: 22 },
            1024: { slidesPerView: 4.2, spaceBetween: 26 }
        }
    });
}

// ---- MODAL GENÉRICO ----
function criarModal(titulo, subtitulo, botoes) {
    return new Promise(resolve => {
        const ov = document.createElement('div');
        ov.className = 'modal-overlay';
        ov.innerHTML = `<div class="modal-box">
            <button class="modal-close">✕</button>
            <h3>${titulo}</h3>
            ${subtitulo ? `<p style="color:#666;font-size:14px;margin-top:4px">${subtitulo}</p>` : ''}
            <div class="modal-btns">
                ${botoes.map(b => `<button class="modal-btn" data-action="${b.action}">${b.text}</button>`).join('')}
            </div>
        </div>`;
        document.body.appendChild(ov);
        requestAnimationFrame(() => ov.classList.add('active'));
        const fechar = val => { ov.classList.remove('active'); setTimeout(() => ov.remove(), 300); resolve(val ?? null); };
        ov.addEventListener('click', e => { if (e.target === ov) fechar(null); });
        ov.querySelector('.modal-close').addEventListener('click', () => fechar(null));
        ov.querySelectorAll('.modal-btn').forEach(b => b.addEventListener('click', () => fechar(b.dataset.action)));
    });
}

// ---- MODAL CELULAR ----
function abrirModalCelular(c) {
    const ov = document.createElement('div');
    ov.className = 'modal-overlay';
    ov.innerHTML = `<div class="modal-box modal-celular">
        <button class="modal-close" style="top:10px;right:10px;z-index:10">✕</button>
        <div class="modal-celular-foto"><img src="${c.img}" alt="${c.nome}"></div>
        <div class="modal-celular-info">
            <h3>${c.nome}</h3>
            ${c.specs ? `<p class="modal-specs">${c.specs}</p>` : ''}
            <p class="modal-preco">${c.preco}</p>
            <button class="btn-wpp-modal" id="cel-wpp">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Tenho interesse neste aparelho
            </button>
        </div>
    </div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('active'));
    const fechar = () => { ov.classList.remove('active'); setTimeout(() => ov.remove(), 300); };
    ov.addEventListener('click', e => { if (e.target === ov) fechar(); });
    ov.querySelector('.modal-close').addEventListener('click', fechar);
    ov.querySelector('#cel-wpp').addEventListener('click', () => {
        fechar();
        mostrarFormulario({ leadType: 'Venda', productName: c.nome, phone: WPP.venda, unitName: 'Vendas Online' });
    });
}

// ---- FORMULÁRIO CAPTURA ----
function mostrarFormulario(data) {
    window._leadData = data;
    const ov = document.createElement('div');
    ov.id = 'capture-ov';
    ov.className = 'modal-overlay';
    ov.innerHTML = `<div class="modal-box">
        <button class="modal-close">✕</button>
        <h3>Quase lá! 👋</h3>
        <p style="color:#666;font-size:14px;margin-bottom:20px;margin-top:6px">Preencha para agilizar seu atendimento:</p>
        <div class="form-group"><label>Nome</label><input type="text" id="lead-nome" placeholder="Seu nome completo"></div>
        <div class="form-group"><label>Telefone</label><input type="tel" id="lead-tel" placeholder="(87) 99999-9999"></div>
        <button class="btn-form-submit" id="form-submit">Iniciar Conversa no WhatsApp →</button>
    </div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('active'));
    const fechar = () => { ov.classList.remove('active'); setTimeout(() => ov.remove(), 300); };
    ov.addEventListener('click', e => { if (e.target === ov) fechar(); });
    ov.querySelector('.modal-close').addEventListener('click', fechar);
    ov.querySelector('#form-submit').addEventListener('click', enviarForm);
    setTimeout(() => { document.getElementById('lead-nome')?.focus(); }, 350);
}

function enviarForm() {
    const data = window._leadData;
    const nome = (document.getElementById('lead-nome').value || '').trim();
    const tel  = (document.getElementById('lead-tel').value  || '').trim();
    if (!nome || !tel) { alert('Preencha todos os campos.'); return; }

    const btn = document.getElementById('form-submit');
    btn.disabled = true; btn.textContent = 'Aguarde...';

    const up = new URLSearchParams(window.location.search);
    const fbclid = up.get('fbclid') || '';
    const leadData = {
        lead_id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        customer_name: nome, customer_phone: tel,
        lead_type: data.leadType, product_name: data.productName || 'N/A',
        unit_name: data.unitName || 'N/A',
        utm_source: up.get('utm_source') || '', utm_medium: up.get('utm_medium') || '', utm_campaign: up.get('utm_campaign') || '',
        user_agent: navigator.userAgent,
        fbc: fbclid ? `fb.1.${Date.now()}.${fbclid}` : ''
    };

    fetch(WEB_APP_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leadData) }).catch(() => {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', ...leadData });

    const msg = data.leadType === 'Reparo'
        ? `Olá! Meu nome é ${nome} e gostaria de um orçamento de reparo na ${data.unitName}.`
        : `Olá! Meu nome é ${nome} e tenho interesse em: ${data.productName}.`;

    setTimeout(() => {
        window.open(`https://wa.me/${data.phone}?text=${encodeURIComponent(msg)}`, '_blank');
        const ov = document.getElementById('capture-ov');
        if (ov) { ov.classList.remove('active'); setTimeout(() => ov.remove(), 300); }
    }, 400);
}

// ---- PROVA SOCIAL ----
function iniciarProvaSocial() {
    const names   = ["Maria S.","João P.","Ana C.","Lucas M.","Juliana F.","Marcos V.","Fernanda L.","Rafael G."];
    const actions = ["solicitou um reparo de tela","comprou um iPhone 14 Pro","acabou de comprar um iPhone 13","agendou uma troca de bateria","solicitou reparo de conector de carga","comprou um Xiaomi Poco X7 Pro"];
    const times   = ["agora mesmo","há 2 min","há 5 min","há 10 min","há 18 min"];

    function show() {
        const box = document.createElement('div');
        box.className = 'social-proof-box';
        box.innerHTML = `<div class="sp-icon">🔔</div><div><strong>${names[Math.floor(Math.random() * names.length)]}</strong><span>${actions[Math.floor(Math.random() * actions.length)]} <em>${times[Math.floor(Math.random() * times.length)]}</em></span></div>`;
        document.getElementById('notification-container').appendChild(box);
        requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add('sp-show')));
        setTimeout(() => { box.classList.remove('sp-show'); setTimeout(() => box.remove(), 400); }, 5500);
    }
    setTimeout(() => { show(); setInterval(show, 18000 + Math.random() * 8000); }, 9000);
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', async function () {

    // Carrossel depoimentos
    new Swiper('.swiper-depoimentos', {
        loop: true, slidesPerView: 1.3, spaceBetween: 14, centeredSlides: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 640: { slidesPerView: 2.3 }, 1024: { slidesPerView: 3.3 } }
    });

    // Carregar e renderizar aparelhos
    const aparelhos = await carregarAparelhos();
    renderizarCarrossel(aparelhos);

    // Botões hero
    document.getElementById('btn-venda')?.addEventListener('click', () => {
        criarModal('Que tipo de aparelho você procura?', '', [
            { text: '📱 iPhone (iOS)', action: 'iPhone' },
            { text: '🤖 Android (Samsung, Xiaomi...)', action: 'Android' }
        ]).then(tipo => {
            if (!tipo) return;
            mostrarFormulario({ leadType: 'Venda', productName: `Interesse em ${tipo}`, phone: WPP.santaLuzia, unitName: 'Unidade Santa Luzia' });
        });
    });

    document.getElementById('btn-reparo')?.addEventListener('click', () => {
        criarModal('Escolha a unidade para o reparo', '', [
            { text: '📍 Unidade Santa Luzia', action: 'santaLuzia' },
            { text: '📍 Unidade Vila Eulália', action: 'vilaEulalia' }
        ]).then(unit => {
            if (!unit) return;
            mostrarFormulario({ leadType: 'Reparo', productName: 'Reparo Geral', phone: WPP[unit], unitName: unit === 'santaLuzia' ? 'Unidade Santa Luzia' : 'Unidade Vila Eulália' });
        });
    });

    document.querySelectorAll('.btn-contato').forEach(btn => {
        btn.addEventListener('click', () => {
            mostrarFormulario({ leadType: 'Reparo', productName: `Reparo (${btn.dataset.unitName})`, phone: btn.dataset.phone, unitName: btn.dataset.unitName });
        });
    });

    // Header scroll
    window.addEventListener('scroll', () => {
        document.getElementById('main-header').classList.toggle('scrolled', window.scrollY > 40);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const el = document.querySelector(a.getAttribute('href'));
            if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    iniciarProvaSocial();
});
