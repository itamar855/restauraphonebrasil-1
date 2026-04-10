<?php
$user_ip = $_SERVER['REMOTE_ADDR'];

// Carregar aparelhos do JSON
$json_path = __DIR__ . '/dados/aparelhos.json';
$aparelhos = [];
if (file_exists($json_path)) {
    $raw = file_get_contents($json_path);
    $todos = json_decode($raw, true) ?? [];
    // Apenas ativos, ordenados
    $aparelhos = array_filter($todos, fn($a) => !empty($a['ativo']));
    usort($aparelhos, fn($a, $b) => ($a['ordem'] ?? 99) <=> ($b['ordem'] ?? 99));
    $aparelhos = array_values($aparelhos);
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaura Phone Brasil | Conserto e Venda de Celulares em Petrolina</title>
    <meta name="description" content="Assistência técnica especializada em iPhone, Samsung e todas as marcas em Petrolina. Venda de celulares seminovos com garantia. Orçamento rápido e sem compromisso.">
    <meta name="keywords" content="conserto celular petrolina, iphone petrolina, assistencia tecnica celular, venda celular seminovo petrolina">
    <link rel="canonical" href="https://restauraphonebrasil.com.br/">
    <link rel="icon" type="image/png" href="imagens/LOGO.png">

    <!-- Open Graph -->
    <meta property="og:title" content="Restaura Phone Brasil | Celulares & Manutenção">
    <meta property="og:description" content="Venda de iPhones e Smartphones com garantia. Assistência técnica especializada em Petrolina-PE.">
    <meta property="og:type" content="website">

    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-W98RCCCF');</script>

    <script>window.USER_IP = '<?php echo htmlspecialchars($user_ip); ?>';</script>
</head>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W98RCCCF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

    <div id="modal-container"></div>
    <div id="notification-container"></div>

    <!-- ===== HEADER ===== -->
    <header id="main-header">
        <div class="header-inner">
            <a href="/" class="logo-link">
                <img src="imagens/LOGO.png" alt="Restaura Phone Brasil" class="logo-img">
                <div class="logo-text">
                    <span class="logo-name">Restaura Phone Brasil</span>
                    <span class="logo-sub">Celulares & Manutenção</span>
                </div>
            </a>
            <nav class="header-nav">
                <a href="#celulares" class="nav-link">Celulares</a>
                <a href="#servicos" class="nav-link">Serviços</a>
                <a href="#unidades" class="nav-link">Unidades</a>
                <a href="https://www.instagram.com/restauraphonebrasil/" target="_blank" rel="noopener" class="nav-insta">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    <span>Instagram</span>
                </a>
            </nav>
        </div>
    </header>

    <main>
        <!-- ===== HERO ===== -->
        <section class="hero-section">
            <div class="hero-bg-pattern"></div>
            <div class="hero-content">
                <div class="hero-badge">
                    <span class="hero-badge-dot"></span>
                    Petrolina • PE — 2 Unidades
                </div>
                <h1 class="hero-title">
                    Seu próximo celular<br>
                    <span class="hero-title-accent">está aqui.</span>
                </h1>
                <p class="hero-desc">
                    iPhones e Smartphones com garantia e confiança.<br>
                    Especialistas em reparos para Apple e Android.
                </p>
                <div class="hero-actions">
                    <button id="btn-venda" class="btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>
                        Ver Celulares Disponíveis
                    </button>
                    <button id="btn-reparo" class="btn-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        Solicitar Orçamento
                    </button>
                </div>
                <!-- Stats rápidos -->
                <div class="hero-stats">
                    <div class="hero-stat">
                        <strong>7.100+</strong>
                        <span>Aparelhos restaurados</span>
                    </div>
                    <div class="hero-stat-divider"></div>
                    <div class="hero-stat">
                        <strong>5.0 ⭐</strong>
                        <span>Avaliação no Google</span>
                    </div>
                    <div class="hero-stat-divider"></div>
                    <div class="hero-stat">
                        <strong>Garantia</strong>
                        <span>Em todos os serviços</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== CELULARES ===== -->
        <section id="celulares" class="section-celulares">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Aparelhos Disponíveis</h2>
                    <p class="section-subtitle">Clique em qualquer aparelho para falar no WhatsApp</p>
                </div>

                <?php if (empty($aparelhos)): ?>
                <div class="sem-aparelhos">
                    <p>Em breve novos aparelhos! Entre em contato pelo WhatsApp.</p>
                </div>
                <?php else: ?>
                <div class="swiper swiper-celulares">
                    <div class="swiper-wrapper">
                        <?php foreach ($aparelhos as $ap): ?>
                        <div class="swiper-slide">
                            <div class="card-celular" onclick="abrirModalCelular(<?= htmlspecialchars(json_encode([
                                'nome'  => $ap['nome'],
                                'preco' => $ap['preco'],
                                'specs' => $ap['specs'],
                                'img'   => $ap['imagem'],
                            ])) ?>)">
                                <?php if (!empty($ap['destaque'])): ?>
                                <div class="card-badge-destaque">⭐ Destaque</div>
                                <?php endif; ?>
                                <div class="card-foto">
                                    <img src="<?= htmlspecialchars($ap['imagem']) ?>"
                                         alt="<?= htmlspecialchars($ap['nome']) ?>"
                                         loading="lazy">
                                </div>
                                <div class="card-info">
                                    <h3 class="card-nome"><?= htmlspecialchars($ap['nome']) ?></h3>
                                    <?php if (!empty($ap['specs'])): ?>
                                    <p class="card-specs"><?= htmlspecialchars($ap['specs']) ?></p>
                                    <?php endif; ?>
                                    <div class="card-footer">
                                        <span class="card-preco"><?= htmlspecialchars($ap['preco']) ?></span>
                                        <span class="card-cta">Ver mais →</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                <div class="swiper-pagination swiper-pagination-celulares"></div>
                <?php endif; ?>
            </div>
        </section>

        <!-- ===== SERVIÇOS ===== -->
        <section id="servicos" class="section-servicos">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Nossos Serviços</h2>
                    <p class="section-subtitle">Mais de 7.100 celulares restaurados com excelência e garantia.</p>
                </div>
                <div class="servicos-grid">
                    <div class="servico-card">
                        <div class="servico-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
                        </div>
                        <h3>Substituição de Tela</h3>
                        <p>Telas trincadas ou sem imagem? Resolvemos na hora com peças de alta qualidade.</p>
                        <span class="servico-tag">Garantia de até 1 Ano</span>
                    </div>
                    <div class="servico-card">
                        <div class="servico-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect width="16" height="10" x="2" y="7" rx="2"/><line x1="22" x2="22" y1="11" y2="13"/></svg>
                        </div>
                        <h3>Substituição de Bateria</h3>
                        <p>Seu celular desliga sozinho? Trocamos com peças originais ou de primeira linha.</p>
                        <span class="servico-tag">Garantia de até 1 Ano</span>
                    </div>
                    <div class="servico-card">
                        <div class="servico-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg>
                        </div>
                        <h3>Reparo em Placa</h3>
                        <p>Serviço especializado em reparo de placa-mãe, um dos mais complexos do mercado.</p>
                        <span class="servico-tag">Diagnóstico gratuito</span>
                    </div>
                    <div class="servico-card">
                        <div class="servico-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
                        </div>
                        <h3>Danos por Líquido</h3>
                        <p>Celular caiu na água? Traga o quanto antes! Não conecte o carregador.</p>
                        <span class="servico-tag">Atendimento prioritário</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== DEPOIMENTOS ===== -->
        <section class="section-depoimentos">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">O que dizem nossos clientes</h2>
                    <p class="section-subtitle">A satisfação de quem confia na Restaura Phone Brasil.</p>
                </div>
                <div class="swiper swiper-depoimentos">
                    <div class="swiper-wrapper">
                        <?php
                        $depoimentos = [
                            ['src' => 'imagens/depoimento-1.jpeg', 'alt' => 'Depoimento 1'],
                            ['src' => 'imagens/depoimento-2.jpeg', 'alt' => 'Depoimento 2'],
                            ['src' => 'imagens/depoimento-3.jpeg', 'alt' => 'Depoimento 3'],
                            ['src' => 'imagens/depoimento-4.jpeg', 'alt' => 'Depoimento 4'],
                        ];
                        foreach ($depoimentos as $d): ?>
                        <div class="swiper-slide">
                            <div class="depoimento-slide">
                                <img src="<?= $d['src'] ?>" alt="<?= $d['alt'] ?>" loading="lazy">
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </section>

        <!-- ===== INSTAGRAM ===== -->
        <section class="section-instagram">
            <div class="container">
                <div class="insta-content">
                    <div class="insta-text">
                        <h2>Acompanhe nosso dia a dia</h2>
                        <p>Fique por dentro das novidades, promoções e dicas de tecnologia no nosso Instagram.</p>
                        <a href="https://www.instagram.com/restauraphonebrasil/" target="_blank" rel="noopener" class="btn-insta">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            Seguir @restauraphonebrasil
                        </a>
                    </div>
                    <div class="insta-preview">
                        <img src="imagens/instagram.jpg" alt="Instagram Restaura Phone Brasil">
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== UNIDADES ===== -->
        <section id="unidades" class="section-unidades">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Nossas Unidades</h2>
                    <p class="section-subtitle">Estamos em dois pontos de Petrolina para te atender melhor.</p>
                </div>
                <div class="unidades-grid">
                    <!-- Unidade 1 -->
                    <div class="unidade-card">
                        <div class="unidade-header">
                            <div>
                                <h3>Unidade Santa Luzia</h3>
                                <div class="unidade-rating">
                                    <span class="stars">★★★★★</span>
                                    <strong>5.0</strong>
                                    <span class="rating-count">(91 avaliações)</span>
                                </div>
                            </div>
                        </div>
                        <div class="unidade-info">
                            <div class="info-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span>Av. Pref. José Francisco de Albuquerque Cavalcante - Santa Luzia, Petrolina - PE</span>
                            </div>
                            <div class="info-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                <span>(87) 98875-9176</span>
                            </div>
                            <div class="info-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span class="status-aberto">● Aberto • Fecha às 20h</span>
                            </div>
                        </div>
                        <div class="unidade-actions">
                            <button class="btn-wpp btn-contato" data-phone="5587988759176" data-unit-name="Unidade Santa Luzia">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                WhatsApp
                            </button>
                            <a href="https://www.google.com/maps/search/?api=1&query=Av+Pref+Jose+Francisco+Albuquerque+Cavalcante+Santa+Luzia+Petrolina+PE" target="_blank" class="btn-mapa">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                Ver no Mapa
                            </a>
                        </div>
                    </div>
                    <!-- Unidade 2 -->
                    <div class="unidade-card">
                        <div class="unidade-header">
                            <div>
                                <h3>Unidade Vila Eulália</h3>
                                <div class="unidade-rating">
                                    <span class="stars">★★★★★</span>
                                    <strong>4.9</strong>
                                    <span class="rating-count">(155 avaliações)</span>
                                </div>
                            </div>
                        </div>
                        <div class="unidade-info">
                            <div class="info-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span>R. Srg. José N. de Amorim - José e Maria, Petrolina - PE</span>
                            </div>
                            <div class="info-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                <span>(87) 98846-2254</span>
                            </div>
                            <div class="info-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span class="status-aberto">● Aberto • Fecha às 20h</span>
                            </div>
                        </div>
                        <div class="unidade-actions">
                            <button class="btn-wpp btn-contato" data-phone="5587988462254" data-unit-name="Unidade Vila Eulália">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                WhatsApp
                            </button>
                            <a href="https://www.google.com/maps/search/?api=1&query=Rua+Sargento+Jose+N+de+Amorim+Jose+e+Maria+Petrolina+PE" target="_blank" class="btn-mapa">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                Ver no Mapa
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <img src="imagens/LOGO.png" alt="Restaura Phone Brasil" class="footer-logo">
                    <p>Restaura Phone Brasil</p>
                    <span>CNPJ: 35.819.094/0001-00</span>
                </div>
                <div>
                    <h5>Unidades</h5>
                    <ul>
                        <li><a href="#unidades">Santa Luzia</a></li>
                        <li><a href="#unidades">Vila Eulália</a></li>
                    </ul>
                </div>
                <div>
                    <h5>Legal</h5>
                    <ul>
                        <li><a href="/politica-privacidade.html">Política de Privacidade</a></li>
                        <li><a href="/termos-uso.html">Termos de Uso</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2025 Restaura Phone Brasil. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Botão WhatsApp flutuante -->
    <a href="https://wa.me/5587988759176" target="_blank" class="wpp-float" aria-label="WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>

    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {

        const WHATSAPP = {
            venda: '5587988759176',
            santaLuzia: '5587988759176',
            vilaEulalia: '5587988462254'
        };
        const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzlrKO5d297-OMlZZ8KE83aHOLLfBSgLfmG7BYy05XdrfDbBbhqc0R2VI_Xt-2J09B6/exec';

        // ---- CARROSSÉIS ----
        new Swiper('.swiper-celulares', {
            loop: true,
            slidesPerView: 1.15,
            spaceBetween: 14,
            centeredSlides: true,
            pagination: { el: '.swiper-pagination-celulares', clickable: true },
            breakpoints: {
                520: { slidesPerView: 2.2, spaceBetween: 18 },
                768: { slidesPerView: 3.2, spaceBetween: 22 },
                1024: { slidesPerView: 4.2, spaceBetween: 26 }
            }
        });

        new Swiper('.swiper-depoimentos', {
            loop: true,
            slidesPerView: 1.3,
            spaceBetween: 14,
            centeredSlides: true,
            autoplay: { delay: 3500, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                640: { slidesPerView: 2.3 },
                1024: { slidesPerView: 3.3 }
            }
        });

        // ---- MODAL GENÉRICO ----
        function criarModal(titulo, corpo, botoes) {
            return new Promise(resolve => {
                const overlay = document.createElement('div');
                overlay.className = 'modal-overlay';
                overlay.innerHTML = `
                    <div class="modal-box">
                        <button class="modal-close" id="modal-close-btn">✕</button>
                        <h3>${titulo}</h3>
                        ${corpo ? `<p>${corpo}</p>` : ''}
                        <div class="modal-btns">
                            ${botoes.map(b => `<button class="modal-btn" data-action="${b.action}">${b.text}</button>`).join('')}
                        </div>
                    </div>`;
                document.body.appendChild(overlay);
                setTimeout(() => overlay.classList.add('active'), 10);

                const fechar = (val) => {
                    overlay.classList.remove('active');
                    setTimeout(() => overlay.remove(), 300);
                    resolve(val ?? null);
                };

                overlay.addEventListener('click', e => { if (e.target === overlay) fechar(null); });
                overlay.querySelector('#modal-close-btn').addEventListener('click', () => fechar(null));
                overlay.querySelectorAll('.modal-btn').forEach(b => b.addEventListener('click', () => fechar(b.dataset.action)));
            });
        }

        // ---- MODAL CELULAR ----
        window.abrirModalCelular = function(celular) {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.innerHTML = `
                <div class="modal-box modal-celular">
                    <button class="modal-close" id="cel-close">✕</button>
                    <div class="modal-celular-foto">
                        <img src="${celular.img}" alt="${celular.nome}">
                    </div>
                    <div class="modal-celular-info">
                        <h3>${celular.nome}</h3>
                        ${celular.specs ? `<p class="modal-specs">${celular.specs}</p>` : ''}
                        <p class="modal-preco">${celular.preco}</p>
                        <button class="btn-wpp-modal" id="cel-wpp-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            Tenho interesse neste aparelho
                        </button>
                    </div>
                </div>`;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.classList.add('active'), 10);

            const fechar = () => {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 300);
            };
            overlay.addEventListener('click', e => { if (e.target === overlay) fechar(); });
            overlay.querySelector('#cel-close').addEventListener('click', fechar);
            overlay.querySelector('#cel-wpp-btn').addEventListener('click', () => {
                fechar();
                mostrarFormulario({ leadType: 'Venda', productName: celular.nome, phone: WHATSAPP.venda, unitName: 'Vendas Online' });
            });
        };

        // ---- FORMULÁRIO DE CAPTURA ----
        window.mostrarFormulario = function(data) {
            window._leadData = data;
            const overlay = document.createElement('div');
            overlay.id = 'capture-overlay';
            overlay.className = 'modal-overlay';
            overlay.innerHTML = `
                <div class="modal-box">
                    <button class="modal-close" id="form-close">✕</button>
                    <h3>Quase lá! 👋</h3>
                    <p style="color:#666;font-size:14px;margin-bottom:20px">Preencha para agilizar seu atendimento:</p>
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="lead-nome" placeholder="Seu nome completo">
                    </div>
                    <div class="form-group">
                        <label>Telefone</label>
                        <input type="tel" id="lead-tel" placeholder="(87) 99999-9999">
                    </div>
                    <button class="btn-form-submit" id="form-submit">Iniciar Conversa no WhatsApp →</button>
                </div>`;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.classList.add('active'), 10);

            const fechar = () => {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 300);
            };
            overlay.addEventListener('click', e => { if (e.target === overlay) fechar(); });
            overlay.querySelector('#form-close').addEventListener('click', fechar);
            overlay.querySelector('#form-submit').addEventListener('click', enviarFormulario);
        };

        function enviarFormulario() {
            const data = window._leadData;
            const nome = document.getElementById('lead-nome').value.trim();
            const tel  = document.getElementById('lead-tel').value.trim();
            if (!nome || !tel) { alert('Preencha todos os campos.'); return; }

            const btn = document.getElementById('form-submit');
            btn.disabled = true;
            btn.textContent = 'Aguarde...';

            const urlParams = new URLSearchParams(window.location.search);
            const fbclid = urlParams.get('fbclid') || '';
            const leadData = {
                lead_id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                customer_name: nome,
                customer_phone: tel,
                lead_type: data.leadType,
                product_name: data.productName || 'N/A',
                unit_name: data.unitName || 'N/A',
                utm_source: urlParams.get('utm_source') || '',
                utm_medium: urlParams.get('utm_medium') || '',
                utm_campaign: urlParams.get('utm_campaign') || '',
                user_agent: navigator.userAgent,
                ip_address: window.USER_IP || '',
                fbc: fbclid ? `fb.1.${Date.now()}.${fbclid}` : ''
            };

            fetch(WEB_APP_URL, { method: 'POST', mode: 'no-cors', headers: {'Content-Type':'application/json'}, body: JSON.stringify(leadData) }).catch(() => {});
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'generate_lead', ...leadData });

            const msg = data.leadType === 'Reparo'
                ? `Olá! Meu nome é ${nome} e gostaria de um orçamento de reparo na ${data.unitName}.`
                : `Olá! Meu nome é ${nome} e tenho interesse em: ${data.productName}.`;

            setTimeout(() => {
                window.open(`https://wa.me/${data.phone}?text=${encodeURIComponent(msg)}`, '_blank');
                const overlay = document.getElementById('capture-overlay');
                if (overlay) { overlay.classList.remove('active'); setTimeout(() => overlay.remove(), 300); }
            }, 400);
        }

        // ---- BOTÕES HERO ----
        document.getElementById('btn-venda')?.addEventListener('click', () => {
            criarModal('Que tipo de aparelho você procura?', '', [
                { text: '📱 iPhone (iOS)', action: 'iPhone' },
                { text: '🤖 Android (Samsung, Xiaomi...)', action: 'Android' }
            ]).then(tipo => {
                if (!tipo) return;
                mostrarFormulario({ leadType: 'Venda', productName: `Interesse em ${tipo}`, phone: WHATSAPP.santaLuzia, unitName: 'Unidade Santa Luzia' });
            });
        });

        document.getElementById('btn-reparo')?.addEventListener('click', () => {
            criarModal('Escolha a unidade para o reparo', '', [
                { text: '📍 Unidade Santa Luzia', action: 'santaLuzia' },
                { text: '📍 Unidade Vila Eulália', action: 'vilaEulalia' }
            ]).then(unit => {
                if (!unit) return;
                mostrarFormulario({ leadType: 'Reparo', productName: 'Reparo Geral', phone: WHATSAPP[unit], unitName: unit === 'santaLuzia' ? 'Unidade Santa Luzia' : 'Unidade Vila Eulália' });
            });
        });

        document.querySelectorAll('.btn-contato').forEach(btn => {
            btn.addEventListener('click', () => {
                mostrarFormulario({ leadType: 'Reparo', productName: `Reparo (${btn.dataset.unitName})`, phone: btn.dataset.phone, unitName: btn.dataset.unitName });
            });
        });

        // ---- PROVA SOCIAL ----
        (function() {
            const names = ["Maria S.","João P.","Ana C.","Lucas M.","Juliana F.","Marcos V.","Fernanda L.","Rafael G."];
            const actions = [
                "solicitou um reparo de tela",
                "comprou um iPhone 14 Pro",
                "acabou de comprar um iPhone 13",
                "agendou uma troca de bateria",
                "solicitou reparo de conector de carga",
                "comprou um Xiaomi Poco X7 Pro"
            ];
            const times = ["agora mesmo","há 2 min","há 5 min","há 10 min","há 18 min"];

            function show() {
                const box = document.createElement('div');
                box.className = 'social-proof-box';
                box.innerHTML = `
                    <div class="sp-icon">🔔</div>
                    <div>
                        <strong>${names[Math.floor(Math.random()*names.length)]}</strong>
                        <span>${actions[Math.floor(Math.random()*actions.length)]} <em>${times[Math.floor(Math.random()*times.length)]}</em></span>
                    </div>`;
                document.getElementById('notification-container').appendChild(box);
                setTimeout(() => box.classList.add('sp-show'), 100);
                setTimeout(() => { box.classList.remove('sp-show'); setTimeout(() => box.remove(), 400); }, 5500);
            }

            setTimeout(() => { show(); setInterval(show, 18000 + Math.random() * 8000); }, 9000);
        })();

        // ---- HEADER SCROLL ----
        window.addEventListener('scroll', () => {
            document.getElementById('main-header').classList.toggle('scrolled', window.scrollY > 40);
        });

        // ---- SMOOTH SCROLL ----
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const el = document.querySelector(a.getAttribute('href'));
                if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
            });
        });
    });
    </script>
</body>
</html>
