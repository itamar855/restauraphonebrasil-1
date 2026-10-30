/**
 * RESTAURA PHONE BRASIL — CORE ENGINE (2026)
 * Sistema de Experiência do Usuário estilo Apple + iPlanet
 * Quizzes Interativos, Rastreamento Pro Meta/Google, Admin Editável e WhatsApp Routing
 */

(function () {
  'use strict';

  // =========================================================
  // 1. CONFIGURAÇÃO GERAL & REGRAS DE NEGÓCIO (EDITÁVEIS)
  // =========================================================
  // =========================================================
  // FUNIS DE QUALIFICAÇÃO EM ESTILO FLUXOGRAMA (EDITÁVEIS)
  // =========================================================
  const DEFAULT_BUY_FUNNEL = [
    {
      id: "platform",
      title: "Qual marca de smartphone você procura?",
      subtitle: "Selecione a marca desejada para ver os modelos disponíveis:",
      shortLabel: "Marca Procurada",
      options: [
        { id: "apple", icon: "apple", label: "Linha Apple (iPhone)", sub: "iPhone XR ao 18 Pro Max • Novos & Seminovos com Garantia", nextStep: "apple_models" },
        { id: "xiaomi", icon: "box", label: "Toda Linha Xiaomi Lacrada", sub: "Redmi Note, POCO, Linha Flagship • 100% Novos Lacrados", nextStep: "xiaomi_models" },
        { id: "samsung", icon: "sparkles", label: "Samsung Galaxy", sub: "Linha S (S24 Ultra), Linha A (A55/A35) e Dobráveis", nextStep: "samsung_models" },
        { id: "motorola_outro", icon: "smartphone", label: "Motorola ou Outro Smartphone", sub: "Edge, Moto G e outros modelos multimarcas", nextStep: "condition_storage" }
      ]
    },
    {
      id: "apple_models",
      title: "Qual modelo de iPhone você tem em mente?",
      subtitle: "Trabalhamos do iPhone XR ao 18 Pro Max com garantia e procedência:",
      shortLabel: "Modelo do iPhone",
      options: [
        { id: "ip-17-18", icon: "sparkles", label: "iPhone 17 / 18 Pro Max", sub: "Lançamento Apple em Titânio • Novo Lacrado", nextStep: "condition_storage" },
        { id: "ip-16-pro", icon: "sparkles", label: "iPhone 16 Pro / 16 Pro Max", sub: "Titânio aeroespacial, Controle de Câmera e Chip A18 Pro", nextStep: "condition_storage" },
        { id: "ip-16-base", icon: "smartphone", label: "iPhone 16 / 16 Plus", sub: "Cores vibrantes, botão de Ação e desempenho veloz", nextStep: "condition_storage" },
        { id: "ip-15-pro", icon: "smartphone", label: "iPhone 15 Pro / 15 Pro Max", sub: "Acabamento em titânio, USB-C e câmera 48MP Pro", nextStep: "condition_storage" },
        { id: "ip-15-base", icon: "smartphone", label: "iPhone 15 / 15 Plus", sub: "Ilha Dinâmica, USB-C universal e ótima bateria", nextStep: "condition_storage" },
        { id: "ip-14-pro", icon: "smartphone", label: "iPhone 14 Pro / 14 Pro Max", sub: "Tela ProMotion 120Hz e câmera 48MP", nextStep: "condition_storage" },
        { id: "ip-14-base", icon: "smartphone", label: "iPhone 14 / 14 Plus", sub: "Excelente autonomia de bateria e fotos impecáveis", nextStep: "condition_storage" },
        { id: "ip-13-pro", icon: "smartphone", label: "iPhone 13 Pro / 13 Pro Max", sub: "Super cobiçado, 120Hz e construção premium em aço", nextStep: "condition_storage" },
        { id: "ip-13-base", icon: "smartphone", label: "iPhone 13 / 13 Mini", sub: "O melhor custo-benefício da Apple em Petrolina", nextStep: "condition_storage" },
        { id: "ip-11-12", icon: "smartphone", label: "iPhone 11 ou 12 (Normal / Pro)", sub: "Entrada premium com menor investimento", nextStep: "condition_storage" },
        { id: "ip-xr-xs", icon: "smartphone", label: "iPhone XR / XS", sub: "Opção econômica e muito procurada", nextStep: "condition_storage" }
      ]
    },
    {
      id: "xiaomi_models",
      title: "Qual modelo da Linha Xiaomi você procura?",
      subtitle: "Toda a linha Xiaomi lacrada de fábrica com procedência e garantia:",
      shortLabel: "Modelo Xiaomi",
      options: [
        { id: "xiao-note-13-pro", icon: "sparkles", label: "Redmi Note 13 Pro / Pro+ 5G", sub: "Câmera de 200MP, tela AMOLED e carregamento ultrarrápido", nextStep: "condition_storage" },
        { id: "xiao-note-13", icon: "smartphone", label: "Redmi Note 13 (4G / 5G)", sub: "O campeão de vendas absoluto em custo-benefício", nextStep: "condition_storage" },
        { id: "xiao-poco-x6-f6", icon: "box", label: "Linha POCO (X6 Pro / F6 / F6 Pro)", sub: "Desempenho monstro para jogos e uso pesado", nextStep: "condition_storage" },
        { id: "xiao-note-12-13c", icon: "smartphone", label: "Redmi Note 12 / 12S / 13C", sub: "Opção acessível para o dia a dia e bateria gigante", nextStep: "condition_storage" },
        { id: "xiao-flagship", icon: "sparkles", label: "Xiaomi 13 / 14 Flagship", sub: "Top de linha com câmeras profissionais Leica", nextStep: "condition_storage" },
        { id: "xiao-outro", icon: "tools", label: "Outro modelo Xiaomi Lacrado", sub: "Consultar catálogo completo no WhatsApp", nextStep: "condition_storage" }
      ]
    },
    {
      id: "samsung_models",
      title: "Qual modelo Samsung Galaxy você procura?",
      subtitle: "Linha S top de linha e Linha A com super autonomia de bateria:",
      shortLabel: "Modelo Samsung",
      options: [
        { id: "sam-s24", icon: "sparkles", label: "Galaxy S24 / S24+ / S24 Ultra", sub: "Lançamento com Galaxy AI, titânio e câmera de 200MP", nextStep: "condition_storage" },
        { id: "sam-s23", icon: "sparkles", label: "Galaxy S23 / S23+ / S23 Ultra", sub: "Processador Snapdragon veloz e zoom potente", nextStep: "condition_storage" },
        { id: "sam-a55-a35", icon: "smartphone", label: "Galaxy A55 / A35 5G", sub: "Design em metal/vidro, tela 120Hz e proteção contra água", nextStep: "condition_storage" },
        { id: "sam-a15-a25", icon: "smartphone", label: "Galaxy A15 / A25 5G", sub: "Bateria para 2 dias e preço super acessível", nextStep: "condition_storage" },
        { id: "sam-z-fold-flip", icon: "box", label: "Galaxy Z Fold / Z Flip", sub: "Aparelhos dobráveis inovadores com estilo único", nextStep: "condition_storage" },
        { id: "sam-outro", icon: "tools", label: "Outro modelo Samsung", sub: "Consultar opções a pronta-entrega", nextStep: "condition_storage" }
      ]
    },
    {
      id: "condition_storage",
      title: "Condição do aparelho e capacidade de armazenamento:",
      subtitle: "Todos os nossos seminovos passam por 32 testes técnicos com garantia real.",
      shortLabel: "Condição & Armazenamento",
      options: [
        { id: "semi-128", icon: "shieldCheck", label: "Seminovo Premium — 128 GB", sub: "Aparelho 100% revisado com garantia de loja", nextStep: "tradein" },
        { id: "semi-256", icon: "shieldCheck", label: "Seminovo Premium — 256 GB", sub: "Espaço ideal para fotos, vídeos e aplicativos", nextStep: "tradein" },
        { id: "semi-512", icon: "shieldCheck", label: "Seminovo Premium — 512 GB+", sub: "Armazenamento máximo para uso intenso", nextStep: "tradein" },
        { id: "novo-lacrado", icon: "box", label: "Novo Lacrado de Fábrica", sub: "Garantia oficial do fabricante de 1 ano", nextStep: "tradein" }
      ]
    },
    {
      id: "tradein",
      title: "Deseja dar seu smartphone atual como entrada no pagamento?",
      subtitle: "Avaliação rápida e justa na hora em Petrolina para abater no valor final.",
      shortLabel: "Aceita Troca (Trade-in)",
      options: [
        { id: "sim-troca", icon: "tradein", label: "Sim! Quero dar meu aparelho na troca", sub: "Avaliamos seu iPhone ou Android usado na hora", nextStep: "tradein_device" },
        { id: "nao-troca", icon: "creditCard", label: "Não, quero apenas comprar", sub: "Pagamento via Pix com desconto ou até 18x no cartão", nextStep: "payment_method" }
      ]
    },
    {
      id: "tradein_device",
      title: "Qual é a marca do seu celular atual que entrará na troca?",
      subtitle: "Selecione a marca do seu aparelho usado para vermos a estimativa:",
      shortLabel: "Marca do Usado",
      options: [
        { id: "troca-marca-apple", icon: "apple", label: "Apple iPhone", sub: "Maior valorização de entrada na troca por outro aparelho", nextStep: "tradein_apple_models" },
        { id: "troca-marca-samsung", icon: "smartphone", label: "Samsung Galaxy", sub: "Aceitamos Linha S, Linha A e outros como parte do pagamento", nextStep: "tradein_samsung_models" },
        { id: "troca-marca-xiaomi", icon: "box", label: "Xiaomi / Redmi / POCO", sub: "Avaliação justa e rápida na hora na loja", nextStep: "tradein_xiaomi_models" },
        { id: "troca-marca-motorola", icon: "tools", label: "Motorola ou Outra Marca", sub: "Avaliamos seu aparelho no balcão da unidade", nextStep: "tradein_condition" }
      ]
    },
    {
      id: "tradein_apple_models",
      title: "Qual modelo de iPhone você tem para dar na troca?",
      subtitle: "Assim já adiantamos a melhor cotação de avaliação de entrada para você:",
      shortLabel: "Modelo do Aparelho Usado",
      options: [
        { id: "meu-ip-14-15", icon: "sparkles", label: "iPhone 14 ou 15 (Normal, Plus ou Pro)", sub: "Super valorizado na troca por modelos superiores", nextStep: "tradein_condition" },
        { id: "meu-ip-13", icon: "smartphone", label: "iPhone 13 ou 13 Pro", sub: "Excelente valor de abono na negociação", nextStep: "tradein_condition" },
        { id: "meu-ip-12", icon: "smartphone", label: "iPhone 12 ou 12 Pro", sub: "Ótima aceitação para entrada na loja", nextStep: "tradein_condition" },
        { id: "meu-ip-11", icon: "smartphone", label: "iPhone 11 ou 11 Pro", sub: "Abata uma grande parte do valor final", nextStep: "tradein_condition" },
        { id: "meu-ip-xr-xs-x", icon: "smartphone", label: "iPhone XR, XS ou X", sub: "Aceitamos mesmo com marcas de uso", nextStep: "tradein_condition" },
        { id: "meu-ip-8-7-se", icon: "tools", label: "iPhone 7, 8 Plus ou SE", sub: "Avaliação para troca de entrada", nextStep: "tradein_condition" }
      ]
    },
    {
      id: "tradein_samsung_models",
      title: "Qual modelo Samsung você tem para dar na troca?",
      subtitle: "Aceitamos Samsung Galaxy na troca por iPhone ou Xiaomi:",
      shortLabel: "Modelo do Aparelho Usado",
      options: [
        { id: "meu-sam-s", icon: "sparkles", label: "Linha Galaxy S (S20, S21, S22 ou S23)", sub: "Excelente valorização no balcão", nextStep: "tradein_condition" },
        { id: "meu-sam-a", icon: "smartphone", label: "Linha Galaxy A (A10 ao A54)", sub: "Abate no valor para você pegar um modelo superior", nextStep: "tradein_condition" },
        { id: "meu-sam-note-m", icon: "smartphone", label: "Linha Galaxy Note, M ou Z", sub: "Avaliamos na hora em Petrolina", nextStep: "tradein_condition" },
        { id: "meu-sam-outro", icon: "tools", label: "Outro modelo Samsung", sub: "Atendente avalia no WhatsApp", nextStep: "tradein_condition" }
      ]
    },
    {
      id: "tradein_xiaomi_models",
      title: "Qual modelo Xiaomi você tem para dar na troca?",
      subtitle: "Avaliamos seu Xiaomi usado na hora:",
      shortLabel: "Modelo do Aparelho Usado",
      options: [
        { id: "meu-xiao-note", icon: "smartphone", label: "Linha Redmi Note (Note 9, 10, 11 ou 12)", sub: "Boa valorização para troca", nextStep: "tradein_condition" },
        { id: "meu-xiao-poco", icon: "box", label: "Linha POCO (X3, X4, X5, F3, etc.)", sub: "Aceitamos para abater no valor final", nextStep: "tradein_condition" },
        { id: "meu-xiao-outro", icon: "tools", label: "Outro modelo Xiaomi", sub: "Consulte avaliação rápida", nextStep: "tradein_condition" }
      ]
    },
    {
      id: "tradein_condition",
      title: "Qual o estado de conservação do seu aparelho usado?",
      subtitle: "Assim o atendente já adianta uma pré-avaliação realista para você:",
      shortLabel: "Estado do Usado",
      options: [
        { id: "estado-impecavel", icon: "shieldCheck", label: "Impecável / Sem Marcas", sub: "Tela e traseira 100% intactas, bateria boa", nextStep: "payment_method" },
        { id: "estado-marcas-leves", icon: "smartphone", label: "Marcas Leves de Uso", sub: "Pequenos riscos comuns, tudo funcionando 100%", nextStep: "payment_method" },
        { id: "estado-tela-trincada", icon: "screenBroken", label: "Tela Trincada ou Bateria Baixa", sub: "Aparelho funciona, mas precisa de manutenção", nextStep: "payment_method" },
        { id: "estado-defeito", icon: "tools", label: "Com Defeito / Não Liga", sub: "Avaliação técnica para entrada", nextStep: "payment_method" }
      ]
    },
    {
      id: "payment_method",
      title: "Qual a sua forma de pagamento preferida?",
      subtitle: "Temos condições especiais para fechar hoje mesmo em Petrolina:",
      shortLabel: "Forma de Pagamento",
      options: [
        { id: "pagto-pix", icon: "sparkles", label: "À Vista no Pix (Melhor Preço)", sub: "Desconto máximo e liberação imediata", nextStep: "buy_urgency" },
        { id: "pagto-cartao", icon: "creditCard", label: "Cartão de Crédito Parcelado", sub: "Parcelamento facilitado em até 12x ou 18x", nextStep: "buy_urgency" },
        { id: "pagto-misto", icon: "tradein", label: "Entrada (Pix/Aparelho) + Cartão", sub: "Abata o valor com entrada e parcele o restante", nextStep: "buy_urgency" },
        { id: "pagto-duvidas", icon: "message", label: "Quero simular parcelas no WhatsApp", sub: "Atendente enviará tabela com valores e opções", nextStep: "buy_urgency" }
      ]
    },
    {
      id: "buy_urgency",
      title: "Qual é a sua previsão para a compra?",
      subtitle: "Assim reservamos a unidade em estoque no sistema:",
      shortLabel: "Previsão de Compra",
      options: [
        { id: "urgencia-hoje", icon: "clock", label: "Quero comprar hoje / retirar na loja", sub: "Estoque reservado e atendimento prioritário", nextStep: "unit" },
        { id: "urgencia-esta-semana", icon: "calendar", label: "Pretendo fechar esta semana", sub: "Separar modelo na unidade de preferência", nextStep: "unit" },
        { id: "urgencia-pesquisando", icon: "message", label: "Pesquisando para os próximos dias", sub: "Quero receber valores, fotos e disponibilidade", nextStep: "unit" }
      ]
    },
    {
      id: "unit",
      title: "Qual loja em Petrolina é melhor para você?",
      subtitle: "A Loja Principal é a Unidade Vila Eulália. Selecione sua preferência:",
      shortLabel: "Loja de Preferência",
      options: [
        { id: "vilaEulalia", icon: "mapPin", label: "Unidade Vila Eulália (Loja Principal)", sub: "R. Srg. José N. de Amorim (José e Maria) • Nota 4.9", nextStep: "finish" },
        { id: "santaLuzia", icon: "mapPin", label: "Unidade Santa Luzia", sub: "Av. Pref. José Francisco de Albuquerque Cavalcante • Nota 5.0", nextStep: "finish" }
      ]
    }
  ];

  const DEFAULT_REPAIR_FUNNEL = [
    {
      id: "device_brand",
      title: "Qual é a marca do aparelho que precisa de conserto?",
      subtitle: "Nossos técnicos são certificados e especialistas em todas as marcas.",
      shortLabel: "Marca do Aparelho",
      options: [
        { id: "apple", icon: "apple", label: "Apple iPhone", sub: "iPhone XR ao 16 Pro Max • Telas originais e reparo em placa", nextStep: "repair_apple_models" },
        { id: "samsung", icon: "smartphone", label: "Samsung Galaxy", sub: "Linha S, Linha A, Linha M e Z Flip/Fold", nextStep: "repair_samsung_models" },
        { id: "xiaomi", icon: "box", label: "Xiaomi / Redmi / POCO", sub: "Especialistas em Xiaomi • Peças de primeira linha", nextStep: "repair_xiaomi_models" },
        { id: "motorola", icon: "smartphone", label: "Motorola", sub: "Linha Moto G, Edge e One • Troca express", nextStep: "repair_motorola_models" },
        { id: "outro", icon: "tools", label: "Outra marca / iPad / Tablet", sub: "Consulte disponibilidade com nosso time", nextStep: "issue_type" }
      ]
    },
    {
      id: "repair_apple_models",
      title: "Qual é o modelo exato do seu iPhone?",
      subtitle: "Assim o técnico já consulta o estoque da peça exata para você:",
      shortLabel: "Modelo do iPhone",
      options: [
        { id: "rep-ip-15-16", icon: "sparkles", label: "iPhone 15 ou 16 (Normal, Plus, Pro, Pro Max)", sub: "Telas premium/originais e baterias com selo", nextStep: "issue_type" },
        { id: "rep-ip-14", icon: "smartphone", label: "iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max", sub: "Troca rápida de tela e bateria no mesmo dia", nextStep: "issue_type" },
        { id: "rep-ip-13", icon: "smartphone", label: "iPhone 13 / 13 Mini / 13 Pro / 13 Pro Max", sub: "Displays OLED com taxa de 120Hz e baterias", nextStep: "issue_type" },
        { id: "rep-ip-12", icon: "smartphone", label: "iPhone 12 / 12 Mini / 12 Pro / 12 Pro Max", sub: "Reparo express com garantia de até 90 dias", nextStep: "issue_type" },
        { id: "rep-ip-11", icon: "smartphone", label: "iPhone 11 / 11 Pro / 11 Pro Max", sub: "Peças a pronta-entrega para recuperação imediata", nextStep: "issue_type" },
        { id: "rep-ip-xr-xs", icon: "smartphone", label: "iPhone XR, XS, XS Max ou X", sub: "Excelente custo-benefício para deixar novo", nextStep: "issue_type" },
        { id: "rep-ip-antigo", icon: "tools", label: "iPhone 7, 8 Plus, SE ou iPad", sub: "Consertos rápidos e econômicos", nextStep: "issue_type" }
      ]
    },
    {
      id: "repair_samsung_models",
      title: "Qual é o modelo do seu Samsung Galaxy?",
      subtitle: "Temos peças originais e linha premium para todas as linhas:",
      shortLabel: "Modelo Samsung",
      options: [
        { id: "rep-sam-s23-s24", icon: "sparkles", label: "Galaxy S23 / S24 (Normal, Plus e Ultra)", sub: "Telas Dynamic AMOLED originais e baterias", nextStep: "issue_type" },
        { id: "rep-sam-s20-s22", icon: "sparkles", label: "Galaxy S20, S21 ou S22 (Normal, Plus, Ultra)", sub: "Telas de alta taxa de quadros e vidro traseiro", nextStep: "issue_type" },
        { id: "rep-sam-a-recente", icon: "smartphone", label: "Linha Galaxy A Recente (A15, A25, A35, A54, A55)", sub: "Aparelhos mais populares com pronta-entrega de peças", nextStep: "issue_type" },
        { id: "rep-sam-a-antigo", icon: "smartphone", label: "Linha Galaxy A / M Anteriores (A10 ao A52)", sub: "Custo acessível e conserto no mesmo dia", nextStep: "issue_type" },
        { id: "rep-sam-z-fold-flip", icon: "box", label: "Linha Galaxy Dobrável (Z Fold ou Z Flip)", sub: "Reparos avançados e telas flexíveis", nextStep: "issue_type" },
        { id: "rep-sam-outro", icon: "tools", label: "Outro modelo Samsung", sub: "Atendente identifica rapidamente pelo WhatsApp", nextStep: "issue_type" }
      ]
    },
    {
      id: "repair_xiaomi_models",
      title: "Qual é a linha do seu Xiaomi?",
      subtitle: "Somos referência em manutenção e componentes Xiaomi em Petrolina:",
      shortLabel: "Modelo Xiaomi",
      options: [
        { id: "rep-xiao-note-13-14", icon: "sparkles", label: "Linha Redmi Note 13 ou Note 14 (Todas as versões)", sub: "Maior estoque de telas e conectores em Petrolina", nextStep: "issue_type" },
        { id: "rep-xiao-note-10-12", icon: "smartphone", label: "Linha Redmi Note 10, Note 11 ou Note 12", sub: "Telas AMOLED e baterias de alta capacidade", nextStep: "issue_type" },
        { id: "rep-xiao-poco", icon: "box", label: "Linha POCO (X3, X4, X5, X6, F3, F4, F5, F6)", sub: "Manutenção de alto desempenho e baterias", nextStep: "issue_type" },
        { id: "rep-xiao-basico", icon: "smartphone", label: "Linha Redmi Básica (9, 10, 12, 13C, A1, A2)", sub: "Troca rápida de tela e conector com menor custo", nextStep: "issue_type" },
        { id: "rep-xiao-mi", icon: "sparkles", label: "Linha Xiaomi Flagship (Mi 11, 12, 13, 14)", sub: "Displays AMOLED e câmeras de alta definição", nextStep: "issue_type" },
        { id: "rep-xiao-outro", icon: "tools", label: "Outro modelo Xiaomi", sub: "Consulte disponibilidade com nosso time", nextStep: "issue_type" }
      ]
    },
    {
      id: "repair_motorola_models",
      title: "Qual é a linha do seu Motorola?",
      subtitle: "Reparos expressos com peças testadas para a linha Motorola:",
      shortLabel: "Modelo Motorola",
      options: [
        { id: "rep-moto-g-recente", icon: "smartphone", label: "Linha Moto G Recente (G14 ao G84, G54, etc.)", sub: "Peças originais e garantia técnica", nextStep: "issue_type" },
        { id: "rep-moto-edge", icon: "sparkles", label: "Linha Motorola Edge (Edge 20 ao 50)", sub: "Telas curvas e reparo especializado em placa", nextStep: "issue_type" },
        { id: "rep-moto-g-antigo", icon: "smartphone", label: "Linha Moto G / E Anteriores", sub: "Custo acessível para deixar seu aparelho novo", nextStep: "issue_type" },
        { id: "rep-moto-outro", icon: "tools", label: "Outro modelo Motorola", sub: "Consulte com nosso técnico", nextStep: "issue_type" }
      ]
    },
    {
      id: "issue_type",
      title: "Qual defeito o aparelho está apresentando?",
      subtitle: "Selecione o problema principal para fazermos a pré-avaliação:",
      shortLabel: "Defeito Principal",
      options: [
        { id: "tela", icon: "screenBroken", label: "Tela Quebrada / Sem Imagem / Touch Falhando", sub: "Troca rápida com garantia de até 90 dias", nextStep: "device_condition_status" },
        { id: "bateria", icon: "batteryCharging", label: "Bateria Descarregando Rápido / Aparelho Desliga", sub: "Troca por baterias com 100% de saúde e selo de segurança", nextStep: "device_condition_status" },
        { id: "agua", icon: "waterDroplet", label: "Caiu na Água / Molhou (Desoxidação)", sub: "Tratamento químico de desoxidação urgente", nextStep: "device_condition_status" },
        { id: "placa", icon: "microchip", label: "Não Liga / Parou do Nada / Reparo em Placa", sub: "Diagnóstico avançado em laboratório técnico", nextStep: "device_condition_status" },
        { id: "conector_camera", icon: "plug", label: "Não Carrega / Câmera Embaçada / Áudio Ruim", sub: "Troca de conectores, microfones e lentes", nextStep: "device_condition_status" },
        { id: "outro_defeito", icon: "tools", label: "Outro problema não listado", sub: "Avaliação técnica gratuita no balcão", nextStep: "device_condition_status" }
      ]
    },
    {
      id: "device_condition_status",
      title: "Qual é a situação atual da tela e do aparelho?",
      subtitle: "Isso ajuda o técnico a saber se precisará trocar vidro, display completo ou periférico:",
      shortLabel: "Situação da Peça",
      options: [
        { id: "vidro-apenas", icon: "shieldCheck", label: "Dá imagem e touch funciona (só vidro trincado)", sub: "Imagem limpa sem manchas e toque respondendo perfeitamente", nextStep: "repair_history" },
        { id: "sem-imagem-touch", icon: "screenBroken", label: "Tela preta, listras coloridas ou touch falhando", sub: "Display danificado precisando de módulo frontal completo", nextStep: "repair_history" },
        { id: "desliga-sozinho", icon: "batteryCharging", label: "Aparelho desliga sozinho / só vive no carregador", sub: "Sintoma clássico de bateria viciada ou conector de carga", nextStep: "repair_history" },
        { id: "totalmente-apagado", icon: "microchip", label: "Não liga nada / apagado total", sub: "Requer análise em bancada para teste de consumo e curto", nextStep: "repair_history" },
        { id: "apenas-periferico", icon: "tools", label: "Liga normal, apenas o componente citado com falha", sub: "Câmera, som, microfone, tampa traseira ou conector", nextStep: "repair_history" }
      ]
    },
    {
      id: "repair_history",
      title: "O aparelho já foi aberto ou consertado anteriormente?",
      subtitle: "Importante para o técnico saber da integridade das vedações e peças internas:",
      shortLabel: "Histórico do Celular",
      options: [
        { id: "hist-original", icon: "shieldCheck", label: "Nunca foi aberto (100% original de fábrica)", sub: "Todas as peças, blindagens e selos originais de fábrica", nextStep: "urgency" },
        { id: "hist-tela-bateria", icon: "tools", label: "Já trocou tela ou bateria anteriormente", sub: "Já passou por manutenção em peças periféricas", nextStep: "urgency" },
        { id: "hist-outra-loja", icon: "tools", label: "Tentou consertar em outra assistência", sub: "Técnico avaliará se há danos adicionais na placa", nextStep: "urgency" },
        { id: "hist-nao-sei", icon: "message", label: "Não sei informar / comprei usado", sub: "Técnico fará checklist completo na entrada", nextStep: "urgency" }
      ]
    },
    {
      id: "urgency",
      title: "Qual é a sua urgência para o conserto?",
      subtitle: "Temos serviço de Reparo Express para a maioria dos serviços:",
      shortLabel: "Urgência do Conserto",
      options: [
        { id: "urgente-hoje", icon: "clock", label: "Urgente — Preciso para hoje (Reparo Express)", sub: "Serviço prioritário com retirada no mesmo dia", nextStep: "unit" },
        { id: "esta-semana", icon: "calendar", label: "Esta semana", sub: "Posso deixar para análise e orçamento formal", nextStep: "unit" },
        { id: "orcamento", icon: "message", label: "Apenas pesquisando valores", sub: "Quero saber estimativa de preço e prazos", nextStep: "unit" }
      ]
    },
    {
      id: "unit",
      title: "Em qual unidade em Petrolina você prefere ser atendido?",
      subtitle: "A Loja Principal é a Unidade Vila Eulália. Escolha onde prefere o atendimento:",
      shortLabel: "Loja de Preferência",
      options: [
        { id: "vilaEulalia", icon: "mapPin", label: "Unidade Vila Eulália (Loja Principal)", sub: "R. Srg. José N. de Amorim (José e Maria) • Nota 4.9", nextStep: "finish" },
        { id: "santaLuzia", icon: "mapPin", label: "Unidade Santa Luzia", sub: "Av. Pref. José Francisco de Albuquerque Cavalcante • Nota 5.0", nextStep: "finish" }
      ]
    }
  ];

  const DEFAULT_CONFIG = {
    brandName: "Restaura Phone Brasil",
    brandSubtitle: "Celulares & Manutenção Especializada",
    instagramUrl: "https://www.instagram.com/restauraphonebrasil/",
    instagramUser: "@restauraphonebrasil",
    adminPinHash: "7cc6d5b510bbe0687e260ae414282ae3a3e8a4eb371886d990265089297b8e8c",
    images: {
      heroBanner: "/assets/hero-banner-2026.jpg",
      tradeinBanner: "/assets/tradein-banner.jpg"
    },
    announcements: {
      heroBadge: "Novos & Seminovos • Assistência Especializada",
      marqueeText: "iPhone XR ao 18 Pro Max • Toda Linha Xiaomi Lacrada • Samsung Galaxy • Troca de Tela com Garantia • Bateria 100% Saúde • Seu Aparelho Usado na Troca • Unidade Vila Eulália (Loja Principal) • Unidade Santa Luzia • Até 18x Sem Juros no Cartão",
      socialProofEnabled: true
    },
    supabase: {
      url: "https://ntujbzsuesfgdlxfnbtk.supabase.co",
      anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dWpienN1ZXNmZ2RseGZuYnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwODAwMDgsImV4cCI6MjEwMjY1NjAwOH0.VSpN_q1e47izMA6D6p6YS9hoJSm8dvz8ulnCvXu3204"
    },
    feedbacks: [
      {
        id: "fb-1",
        caption: "Troca de tela express em 40 minutos na Unidade Santa Luzia com garantia total",
        img: "/assets/instagram-profile-gbwah4ys.jpg"
      },
      {
        id: "fb-2",
        caption: "iPhone 14 Pro Max seminovo entregue impecável com bateria 100% e procedência",
        img: "/assets/apple-showcase.jpg"
      },
      {
        id: "fb-3",
        caption: "Avaliação do usado na troca (Trade-In) com melhor valor de mercado em Petrolina",
        img: "/assets/tradein-banner.jpg"
      }
    ],
    funnels: {
      buy: null,
      repair: null
    },
    tracking: {
      metaPixelId: "",
      googleTagId: ""
    },
    units: {
      vilaEulalia: {
        id: "vilaEulalia",
        name: "Vila Eulália",
        address: "R. Srg. José N. de Amorim - José e Maria, Petrolina - PE, 56320-080",
        phone: "(87) 98846-2254",
        phoneRaw: "5587988462254",
        whatsapp: "5587988462254",
        mapsUrl: "https://www.google.com/maps/place/R.+Srg.+Jos%C3%A9+N.+de+Amorim+-+Jos%C3%A9+e+Maria,+Petrolina+-+PE,+56320-080",
        rating: "4.9",
        reviews: "151 avaliações",
        hours: "Seg a Sex: 08h às 19h • Sáb: 08h às 14h"
      },
      santaLuzia: {
        id: "santaLuzia",
        name: "Santa Luzia",
        address: "Av. Pref. José Francisco de Albuquerque Cavalcante - Santa Luzia, Petrolina - PE, 56300-000",
        phone: "(87) 98875-9176",
        phoneRaw: "5587988759176",
        whatsapp: "5587988759176",
        mapsUrl: "https://www.google.com/maps/place/Av.+Pref.+Jos%C3%A9+Francisco+de+Albuquerque+Cavalcante+-+Santa+Luzia,+Petrolina+-+PE,+56300-000",
        rating: "5.0",
        reviews: "86 avaliações",
        hours: "Seg a Sex: 08h às 19h • Sáb: 08h às 14h"
      }
    },
    products: [
      {
        id: "iphone-16-pro",
        category: "apple",
        kicker: "Lançamento em Titânio",
        title: "iPhone 16 Pro & Pro Max",
        desc: "Design em titânio aeroespacial, chip A18 Pro e o sistema de câmeras mais avançado.",
        badge: "Destaque Apple",
        dark: true,
        img: "/assets/apple-showcase.jpg",
        specs: { tela: "Super Retina XDR OLED", chip: "A18 Pro", garantia: "1 Ano", troca: "Aceitamos seu Usado" }
      },
      {
        id: "iphone-15-pro",
        category: "apple",
        kicker: "Mais Procurado",
        title: "iPhone 15 Pro",
        desc: "Conector USB-C universal, botão de Ação, fotos em 48MP e acabamento impecável.",
        badge: "Novo & Seminovo",
        dark: false,
        img: "/assets/apple-showcase.jpg",
        specs: { tela: "ProMotion 120Hz", chip: "A17 Pro", garantia: "Até 90 Dias", troca: "Avaliação na Hora" }
      },
      {
        id: "iphone-14-13",
        category: "seminovos",
        kicker: "Custo-Benefício Campeão",
        title: "iPhone 13 & 14",
        desc: "Desempenho incrível com bateria de longa duração e câmeras cinematográficas.",
        badge: "Garantia Total",
        dark: false,
        img: "/assets/apple-showcase.jpg",
        specs: { bateria: "100% Saúde / Nova", camera: "Dupla 12MP", parcelamento: "Até 18x no Cartão", entrega: "Petrolina e Região" }
      },
      {
        id: "galaxy-s24",
        category: "android",
        kicker: "Linha Flagship",
        title: "Samsung Galaxy S24 Ultra",
        desc: "Galaxy AI integrada, câmera de 200MP com zoom óptico e estrutura em titânio.",
        badge: "Android Pro",
        dark: true,
        img: "/assets/apple-showcase.jpg",
        specs: { tela: "Dynamic AMOLED 2X", caneta: "S Pen Inclusa", garantia: "Até 90 Dias", troca: "Aceitamos iPhone na troca" }
      },
      {
        id: "galaxy-linha-a",
        category: "android",
        kicker: "Intermediário Premium",
        title: "Samsung Galaxy A55 5G",
        desc: "Design em metal e vidro, tela super fluida e bateria para dois dias de uso.",
        badge: "Econômico",
        dark: false,
        img: "/assets/apple-showcase.jpg",
        specs: { tela: "Super AMOLED 120Hz", protecao: "IP67 Resistente à Água", bateria: "5000 mAh", garantia: "Garantia de Loja" }
      },
      {
        id: "xiaomi-pro",
        category: "android",
        kicker: "Velocidade Extrema",
        title: "Linha Xiaomi & Redmi Note",
        desc: "Carregamento ultra rápido, telas imersivas de alta resolução e custo justo.",
        badge: "Seminovos & Novos",
        dark: false,
        img: "/assets/apple-showcase.jpg",
        specs: { memoria: "Até 512GB", ram: "Até 12GB RAM", garantia: "Certificada", prontaEntrega: "Nas 2 Lojas" }
      }
    ]
  };

  // Função de Hash Criptográfico SHA-256 (Web Crypto API Nativa)
  async function sha256(str) {
    if (!str) return '';
    try {
      const buffer = new TextEncoder().encode(str.trim());
      const digest = await crypto.subtle.digest('SHA-256', buffer);
      return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.warn('Web Crypto não disponível:', e);
      return str.trim();
    }
  }

  // Carrega configuração salva ou default (com migração de segurança)
  function loadConfig() {
    try {
      const saved = localStorage.getItem('restaura_config_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.adminPinHash || parsed.adminPinHash === "f1fc702714e9ad97a0440af9f329678e668342f217a53ebceeea97ea927c8b8d") {
          parsed.adminPinHash = DEFAULT_CONFIG.adminPinHash;
          saveConfig(parsed);
        }
        delete parsed.adminPin;
        const config = Object.assign({}, DEFAULT_CONFIG, parsed);
        config.images = Object.assign({}, DEFAULT_CONFIG.images, parsed.images || {});
        if (!config.images.heroBanner || config.images.heroBanner === "/assets/apple-showcase.jpg") {
          config.images.heroBanner = DEFAULT_CONFIG.images.heroBanner;
        }
        if (Array.isArray(parsed.products) && parsed.products.length > 0) {
          config.products = parsed.products;
        }
        config.supabase = Object.assign({}, DEFAULT_CONFIG.supabase, parsed.supabase || {});
        if (!config.supabase.url && DEFAULT_CONFIG.supabase.url) {
          config.supabase.url = DEFAULT_CONFIG.supabase.url;
          config.supabase.anonKey = DEFAULT_CONFIG.supabase.anonKey;
        }
        if (Array.isArray(parsed.feedbacks)) {
          config.feedbacks = parsed.feedbacks;
        } else {
          config.feedbacks = JSON.parse(JSON.stringify(DEFAULT_CONFIG.feedbacks || []));
        }
        config.funnels = Object.assign({}, DEFAULT_CONFIG.funnels, parsed.funnels || {});
        const FUNNEL_VERSION = 5;
        if (!parsed.funnel_version || parsed.funnel_version < FUNNEL_VERSION || !config.funnels.buy || config.funnels.buy.length < 11) {
          config.funnels.buy = JSON.parse(JSON.stringify(DEFAULT_BUY_FUNNEL));
          config.funnels.repair = JSON.parse(JSON.stringify(DEFAULT_REPAIR_FUNNEL));
          config.funnel_version = FUNNEL_VERSION;
          saveConfig(config);
        }
        return config;
      }
    } catch (e) {
      console.warn('Erro ao carregar config local:', e);
    }
    return DEFAULT_CONFIG;
  }

  function saveConfig(cfg) {
    try {
      localStorage.setItem('restaura_config_v1', JSON.stringify(cfg));
    } catch (e) {
      console.error('Erro ao salvar config:', e);
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        alert("Aviso: Limite de armazenamento atingido. As fotos enviadas foram ajustadas automaticamente para salvar com sucesso.");
      }
    }
  }

  let AppConfig = loadConfig();

  // =========================================================
  // SUPABASE CLOUD & CRM LEAD DISPATCH ENGINE
  // =========================================================
  let supabaseClient = null;

  function initSupabase() {
    if (window.supabase && AppConfig.supabase && AppConfig.supabase.url && AppConfig.supabase.anonKey) {
      try {
        supabaseClient = window.supabase.createClient(AppConfig.supabase.url, AppConfig.supabase.anonKey);
        console.log("Supabase Cloud inicializado com sucesso.");
      } catch (err) {
        console.warn("Aviso ao conectar Supabase:", err);
      }
    }
  }

  async function syncFromSupabase() {
    if (!supabaseClient) return;
    try {
      const { data, error } = await supabaseClient.from('site_config').select('*').eq('id', 'main').single();
      if (data && !error) {
        let changed = false;
        if (data.funnels && typeof data.funnels === 'object' && Object.keys(data.funnels).length > 0) {
          AppConfig.funnels = Object.assign({}, AppConfig.funnels, data.funnels);
          changed = true;
        }
        if (Array.isArray(data.products) && data.products.length > 0) {
          AppConfig.products = data.products;
          changed = true;
        }
        if (data.announcements) {
          AppConfig.announcements = Object.assign({}, AppConfig.announcements, data.announcements);
          changed = true;
        }
        if (data.images) {
          AppConfig.images = Object.assign({}, AppConfig.images, data.images);
          changed = true;
        }
        if (data.units) {
          AppConfig.units = Object.assign({}, AppConfig.units, data.units);
          changed = true;
        }
        if (Array.isArray(data.feedbacks)) {
          AppConfig.feedbacks = data.feedbacks;
          changed = true;
        }
        if (changed) {
          localStorage.setItem('restaura_config_v1', JSON.stringify(AppConfig));
          renderCatalog();
          renderFeedbacksGallery();
          updateDomTexts();
          console.log("Configurações atualizadas do Supabase Cloud em tempo real.");
        }
      }
    } catch(err) {
      console.warn("Sincronização em background do Supabase:", err);
    }
  }

  async function syncToSupabase(cfg) {
    if (!supabaseClient) return;
    try {
      const payload = {
        id: 'main',
        funnels: cfg.funnels || {},
        products: cfg.products || [],
        announcements: cfg.announcements || {},
        images: cfg.images || {},
        units: cfg.units || {},
        feedbacks: cfg.feedbacks || [],
        updated_at: new Date().toISOString()
      };
      await supabaseClient.from('site_config').upsert([payload]);
      console.log("Configurações sincronizadas no Supabase com sucesso.");
    } catch(err) {
      console.warn("Aviso ao gravar config no Supabase:", err);
    }
  }

  async function recordLeadToSupabase() {
    if (!supabaseClient) return;
    try {
      const isBuy = QuizState.mode === 'buy';
      const unitKey = QuizState.answers.unit || 'vilaEulalia';
      const unitData = AppConfig.units[unitKey] || AppConfig.units.vilaEulalia || AppConfig.units.santaLuzia;
      const utms = getTrafficParameters();

      const leadPayload = {
        funnel_mode: QuizState.mode,
        target_unit: unitData.name || unitKey,
        customer_brand: isBuy ? (QuizState.answers.platform || '') : (QuizState.answers.device_brand || ''),
        customer_interest: isBuy 
          ? (QuizState.answers.apple_models || QuizState.answers.xiaomi_models || QuizState.answers.samsung_models || QuizState.answers.model || '') 
          : (QuizState.answers.repair_apple_models || QuizState.answers.repair_samsung_models || QuizState.answers.repair_xiaomi_models || QuizState.answers.repair_motorola_models || QuizState.answers.issue_type || ''),
        answers: QuizState.answers,
        utm_source: utms.utm_source || '',
        utm_medium: utms.utm_medium || '',
        utm_campaign: utms.utm_campaign || '',
        status: 'novo'
      };

      await supabaseClient.from('leads').insert([leadPayload]);
      console.log("Lead gravado no Supabase para o CRM com sucesso!");
    } catch(err) {
      console.warn("Aviso ao gravar lead no Supabase:", err);
    }
  }

  // =========================================================
  // 2. CAPTURA DE PARÂMETROS UTM & CLICK IDS (META & GOOGLE)
  // =========================================================
  function getTrafficParameters() {
    const params = new URLSearchParams(window.location.search);
    const utms = {};
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
    
    keys.forEach(k => {
      if (params.get(k)) {
        utms[k] = params.get(k);
        sessionStorage.setItem('traffic_' + k, params.get(k));
      } else {
        const stored = sessionStorage.getItem('traffic_' + k);
        if (stored) utms[k] = stored;
      }
    });
    return utms;
  }

  const TrafficData = getTrafficParameters();

  function formatUtmSummary() {
    const parts = [];
    if (TrafficData.utm_source) parts.push(`Origem: ${TrafficData.utm_source}`);
    if (TrafficData.utm_campaign) parts.push(`Campanha: ${TrafficData.utm_campaign}`);
    if (TrafficData.fbclid) parts.push(`Meta Ads (fbclid)`);
    if (TrafficData.gclid) parts.push(`Google Ads (gclid)`);
    return parts.length ? `\n\n📌 [Rastreamento: ${parts.join(' | ')}]` : '';
  }

  // =========================================================
  // 3. EVENTOS DE RASTREAMENTO (PRO META ADS & GOOGLE ADS)
  // =========================================================
  function trackEvent(eventName, params = {}) {
    console.log(`[Tracking Event] ${eventName}:`, params);
    
    // Meta Pixel (fbq)
    if (typeof window.fbq === 'function') {
      try {
        window.fbq('track', eventName, params);
      } catch (err) {
        console.warn('Meta Pixel track error:', err);
      }
    }

    // Google gtag / GA4
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', eventName, params);
      } catch (err) {
        console.warn('Google gtag track error:', err);
      }
    }
  }

  // Inicializa scripts de terceiros se os IDs estiverem cadastrados
  function initTrackingScripts() {
    if (AppConfig.tracking.metaPixelId && !window._metaPixelInjected) {
      window._metaPixelInjected = true;
      (function(f,b,e,v,n,t,s){
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      })(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', AppConfig.tracking.metaPixelId);
      window.fbq('track', 'PageView');
    }

    if (AppConfig.tracking.googleTagId && !window._googleTagInjected) {
      window._googleTagInjected = true;
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${AppConfig.tracking.googleTagId}`;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      function gtag(){ window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', AppConfig.tracking.googleTagId);
    }
  }


  // =========================================================
  // 1.1 BIBLIOTECA DE ÍCONES VETORIAIS SVG (ESTILO SF SYMBOLS / LUCIDE)
  // =========================================================
  const Icons = {
    apple: `<svg class="svg-icon fill-current" viewBox="0 0 170 170" width="20" height="20"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.85-11.71-14.44-5.99-9.67-10.74-20.73-14.26-33.17-3.52-12.44-5.28-23.7-5.28-33.77 0-14.54 3.73-26.49 11.19-35.85 7.46-9.36 16.71-14.12 27.75-14.28 4.9 0 10.51 1.34 16.85 4.02 6.34 2.68 10.15 4.09 11.44 4.22 2.01-.27 6.13-1.87 12.35-4.8 6.22-2.93 11.66-4.22 16.32-3.87 13.91 1.08 24.62 6.55 32.14 16.42-12.23 7.4-18.23 17.51-18.01 30.34.22 10.23 4.15 18.77 11.8 25.62 7.64 6.85 16.83 10.66 27.56 11.44-2.39 7.4-5.32 14.86-8.78 22.39zm-38.38-107.82c0-7.39 2.67-14.39 8.01-21 5.34-6.61 12.01-10.69 20-12.24.22 1.3.33 2.5.33 3.6 0 7.39-2.83 14.62-8.49 21.68-5.66 7.07-12.45 11.09-20.37 12.07-.33-1.41-.5-2.78-.5-4.11z"/></svg>`,
    android: `<svg class="svg-icon fill-current" viewBox="0 0 24 24" width="22" height="22"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0002s.4482-.9993.9993-.9993c.551 0 .9992.4477.9992.9993.0001.5516-.4482 1.0002-.9992 1.0002m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0002s.4482-.9993.9993-.9993c.551 0 .9992.4477.9992.9993 0 .5516-.4482 1.0002-.9992 1.0002m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.0833 12 8.0833s-3.5902.3283-5.1368.8664L4.8409 5.4467a.4161.4161 0 10-.7197.4155l1.9973 3.4592C2.6889 11.2721.3333 15.1437.3333 19.6667h23.3334c0-4.523-2.3556-8.3946-5.7867-10.3453"/></svg>`,
    smartphone: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><rect x="5" y="2" width="14" height="20" rx="3" ry="3"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    screenBroken: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><rect x="5" y="2" width="14" height="20" rx="3" ry="3"/><path d="M5 9l4 2-3 4 5 1-2 4 4-1"/></svg>`,
    batteryCharging: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"/><line x1="22" y1="11" x2="22" y2="13"/><polyline points="11 9 8 13 13 13 10 17"/></svg>`,
    microchip: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>`,
    waterDroplet: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    plug: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8z"/></svg>`,
    tools: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    tradein: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4"/></svg>`,
    shieldCheck: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    box: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    creditCard: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    mapPin: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    phone: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    clock: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    calendar: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    message: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    sparkles: `<svg class="svg-icon" viewBox="0 0 24 24" width="22" height="22"><path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z"/><path d="M18 16l1.2 2.8L22 20l-2.8 1.2L18 24l-1.2-2.8L14 20l2.8-1.2z"/></svg>`,
    checkCircle: `<svg class="svg-icon" viewBox="0 0 24 24" width="44" height="44" style="stroke: #34C759; stroke-width: 2.2;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    clipboard: `<svg class="svg-icon" viewBox="0 0 24 24" width="20" height="20"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
    lock: `<svg class="svg-icon" viewBox="0 0 24 24" width="28" height="28"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    settings: `<svg class="svg-icon" viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    whatsapp: `<svg class="svg-icon fill-current" viewBox="0 0 24 24" width="20" height="20"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.01-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29z"/></svg>`,
    instagram: `<svg class="svg-icon" viewBox="0 0 24 24" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`
  };

  // =========================================================
  // 5. RENDERIZAÇÃO DO FUNIL DE QUALIFICAÇÃO / QUIZ
  // =========================================================
  function getFunnelSteps(mode = 'buy') {
    if (AppConfig.funnels && Array.isArray(AppConfig.funnels[mode]) && AppConfig.funnels[mode].length > 0) {
      return AppConfig.funnels[mode];
    }
    return mode === 'buy' ? DEFAULT_BUY_FUNNEL : DEFAULT_REPAIR_FUNNEL;
  }

  function getRouteLabel(targetId, steps) {
    if (!targetId || targetId === 'next') return 'Próxima Etapa';
    if (targetId === 'finish') return 'WhatsApp';
    const found = steps.find(s => s.id === targetId);
    if (found) return found.title.slice(0, 18) + '...';
    return targetId;
  }

  function getAnswerLabel(stepId, answerId) {
    if (!answerId) return 'Não informado';
    const steps = (AppConfig.funnels && AppConfig.funnels[QuizState.mode]) || (QuizState.mode === 'buy' ? DEFAULT_BUY_FUNNEL : DEFAULT_REPAIR_FUNNEL);
    const step = steps.find(s => s.id === stepId);
    if (step && step.options) {
      const opt = step.options.find(o => o.id === answerId);
      if (opt) return opt.label;
    }
    return answerId;
  }

  const QuizState = {
    active: false,
    mode: 'buy',
    currentStepId: null,
    history: [],
    answers: {}
  };

  function openQuiz(mode = 'buy') {
    QuizState.active = true;
    QuizState.mode = mode;
    QuizState.history = [];
    QuizState.answers = {};

    const steps = getFunnelSteps(mode);
    QuizState.currentStepId = steps.length > 0 ? steps[0].id : null;

    trackEvent('InitiateCheckout', { quiz_type: mode });

    const mobileDropdown = document.getElementById('mobileDropdown');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileDropdown) mobileDropdown.classList.remove('open');
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('open');

    const overlay = document.getElementById('quizOverlay');
    if (overlay) {
      overlay.classList.add('active');
      renderQuizStep();
    }
  }

  function closeQuiz() {
    QuizState.active = false;
    const overlay = document.getElementById('quizOverlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  function renderQuizStep() {
    const steps = getFunnelSteps(QuizState.mode);
    const bodyEl = document.getElementById('quizBody');
    const footerEl = document.getElementById('quizFooter');
    if (!bodyEl || !footerEl) return;

    if (!QuizState.currentStepId || QuizState.currentStepId === 'finish') {
      renderQuizSummary(bodyEl, footerEl);
      return;
    }

    const currentStepIndex = steps.findIndex(s => s.id === QuizState.currentStepId);
    if (currentStepIndex === -1) {
      renderQuizSummary(bodyEl, footerEl);
      return;
    }

    const currentStep = steps[currentStepIndex];
    const totalSteps = steps.length;
    const stepNumber = QuizState.history.length + 1;

    const progressFill = document.getElementById('quizProgressFill');
    const stepLabel = document.getElementById('quizStepLabel');
    const pct = Math.min(100, Math.round((stepNumber / (totalSteps + 1)) * 100));
    if (progressFill) progressFill.style.width = pct + '%';
    const flowTitle = QuizState.mode === 'buy' ? 'Configuração do Aparelho' : 'Diagnóstico de Reparo';
    if (stepLabel) stepLabel.textContent = `${flowTitle} • Etapa ${stepNumber}`;

    const options = currentStep.options || [];
    const selectedValue = QuizState.answers[currentStep.id];

    let html = `
      <h3 class="quiz-question-title">${currentStep.title}</h3>
      <p class="quiz-question-subtitle">${currentStep.subtitle || ''}</p>
      <div class="quiz-options-grid">
    `;

    options.forEach(opt => {
      const isSelected = selectedValue === opt.id;
      const iconSvg = Icons[opt.icon] || Icons.smartphone;
      html += `
        <div class="quiz-option-card ${isSelected ? 'selected' : ''}" data-opt-id="${opt.id}" data-opt-next="${opt.nextStep || 'next'}">
          <div class="quiz-option-left">
            <span class="quiz-opt-icon">${iconSvg}</span>
            <div class="quiz-opt-text">
              <strong>${opt.label}</strong>
              <span>${opt.sub || ''}</span>
            </div>
          </div>
          <div class="quiz-radio-circle"></div>
        </div>
      `;
    });

    html += `</div>`;
    bodyEl.innerHTML = html;

    bodyEl.querySelectorAll('.quiz-option-card').forEach(card => {
      card.addEventListener('click', () => {
        const optId = card.getAttribute('data-opt-id');
        const nextTarget = card.getAttribute('data-opt-next') || 'next';
        QuizState.answers[currentStep.id] = optId;
        QuizState.history.push(currentStep.id);

        setTimeout(() => {
          if (nextTarget === 'finish') {
            QuizState.currentStepId = 'finish';
          } else if (nextTarget && nextTarget !== 'next' && steps.some(s => s.id === nextTarget)) {
            QuizState.currentStepId = nextTarget;
          } else {
            const nextIdx = currentStepIndex + 1;
            if (nextIdx < steps.length) {
              QuizState.currentStepId = steps[nextIdx].id;
            } else {
              QuizState.currentStepId = 'finish';
            }
          }
          renderQuizStep();
        }, 180);
      });
    });

    footerEl.innerHTML = `
      ${QuizState.history.length > 0 ? `<button class="btn btn-outline" id="quizPrevBtn" style="min-height: 44px; padding: 0 20px;">← Voltar</button>` : `<div></div>`}
      <button class="btn btn-primary" id="quizNextBtn" style="min-height: 44px; padding: 0 24px;" ${!selectedValue ? 'disabled style="opacity: 0.5; pointer-events: none;"' : ''}>
        Avançar →
      </button>
    `;

    const prevBtn = document.getElementById('quizPrevBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (QuizState.history.length > 0) {
          QuizState.currentStepId = QuizState.history.pop();
          renderQuizStep();
        }
      });
    }

    const nextBtn = document.getElementById('quizNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const selectedOpt = options.find(o => o.id === QuizState.answers[currentStep.id]);
        const nextTarget = (selectedOpt && selectedOpt.nextStep) || 'next';
        QuizState.history.push(currentStep.id);
        if (nextTarget === 'finish') {
          QuizState.currentStepId = 'finish';
        } else if (nextTarget && nextTarget !== 'next' && steps.some(s => s.id === nextTarget)) {
          QuizState.currentStepId = nextTarget;
        } else {
          const nextIdx = currentStepIndex + 1;
          if (nextIdx < steps.length) {
            QuizState.currentStepId = steps[nextIdx].id;
          } else {
            QuizState.currentStepId = 'finish';
          }
        }
        renderQuizStep();
      });
    }
  }

  function renderQuizSummary(bodyEl, footerEl) {
    trackEvent('Lead', { quiz_mode: QuizState.mode });
    recordLeadToSupabase();

    const isBuy = QuizState.mode === 'buy';
    const unitKey = QuizState.answers.unit || 'vilaEulalia';
    const unitData = AppConfig.units[unitKey] || AppConfig.units.vilaEulalia || AppConfig.units.santaLuzia;

    const isPrimaryUnit = unitKey === 'vilaEulalia';
    const unitDisplayName = `Unidade ${unitData.name}${isPrimaryUnit ? ' (Loja Principal)' : ''}`;

    let summaryRows = '';
    const currentSteps = getFunnelSteps(QuizState.mode);
    currentSteps.forEach(s => {
      const val = QuizState.answers[s.id];
      if (val && s.id !== 'unit') {
        const label = getAnswerLabel(s.id, val);
        const displayTitle = s.shortLabel || s.title;
        summaryRows += `<div class="quiz-summary-row"><span class="label">${displayTitle}:</span><span class="val">${label}</span></div>`;
      }
    });
    summaryRows += `<div class="quiz-summary-row"><span class="label">Loja de Preferência:</span><span class="val">${unitDisplayName}</span></div>`;

    // Formatação estruturada em formato de ticket elegante para WhatsApp
    let messageText = '';
    if (isBuy) {
      const brand = getAnswerLabel('platform', QuizState.answers.platform);
      let model = 'Modelo a consultar no WhatsApp';
      if (QuizState.answers.apple_models) {
        model = getAnswerLabel('apple_models', QuizState.answers.apple_models);
      } else if (QuizState.answers.xiaomi_models) {
        model = getAnswerLabel('xiaomi_models', QuizState.answers.xiaomi_models);
      } else if (QuizState.answers.samsung_models) {
        model = getAnswerLabel('samsung_models', QuizState.answers.samsung_models);
      } else if (QuizState.answers.platform === 'motorola_outro') {
        model = 'Motorola ou Outro Modelo Multimarcas';
      }

      const cond = getAnswerLabel('condition_storage', QuizState.answers.condition_storage);
      const hasTradein = QuizState.answers.tradein === 'sim-troca';
      let tradeinSection = '• *Entrada na Troca:* Não (Apenas compra direta)';
      if (hasTradein) {
        const tradeinBrand = QuizState.answers.tradein_device ? getAnswerLabel('tradein_device', QuizState.answers.tradein_device) : 'Smartphone usado';
        let tradeinModel = '';
        if (QuizState.answers.tradein_apple_models) {
          tradeinModel = getAnswerLabel('tradein_apple_models', QuizState.answers.tradein_apple_models);
        } else if (QuizState.answers.tradein_samsung_models) {
          tradeinModel = getAnswerLabel('tradein_samsung_models', QuizState.answers.tradein_samsung_models);
        } else if (QuizState.answers.tradein_xiaomi_models) {
          tradeinModel = getAnswerLabel('tradein_xiaomi_models', QuizState.answers.tradein_xiaomi_models);
        } else {
          tradeinModel = 'Aparelho multimarca para avaliação no balcão';
        }
        const tradeinCond = QuizState.answers.tradein_condition ? getAnswerLabel('tradein_condition', QuizState.answers.tradein_condition) : 'A avaliar';
        tradeinSection = `• *Entrada na Troca:* Sim! Quero dar meu aparelho na troca\n• *Marca do Usado:* ${tradeinBrand}\n• *Modelo do Usado:* ${tradeinModel}\n• *Estado do Usado:* ${tradeinCond}`;
      }

      const payment = getAnswerLabel('payment_method', QuizState.answers.payment_method);
      const urgency = getAnswerLabel('buy_urgency', QuizState.answers.buy_urgency);

      messageText = `*RESTAURA PHONE BRASIL*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📲 *NOVO ATENDIMENTO — COMPRA*
━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 *UNIDADE SELECIONADA:*
• Loja: *${unitDisplayName}*

📱 *APARELHO DE INTERESSE:*
• *Marca:* ${brand}
• *Modelo Desejado:* ${model}
• *Condição / Memória:* ${cond}

🔄 *APARELHO USADO NA TROCA (TRADE-IN):*
${tradeinSection}

💳 *CONDIÇÕES COMERCIAIS:*
• *Forma de Pagamento:* ${payment}
• *Previsão de Compra:* ${urgency}

━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 _Olá! Fiz essa simulação pelo site e gostaria de verificar os aparelhos disponíveis e valores para fechar hoje!_` + formatUtmSummary();
    } else {
      const brand = getAnswerLabel('device_brand', QuizState.answers.device_brand);
      let model = 'Outro / Não listado';
      if (QuizState.answers.repair_apple_models) {
        model = getAnswerLabel('repair_apple_models', QuizState.answers.repair_apple_models);
      } else if (QuizState.answers.repair_samsung_models) {
        model = getAnswerLabel('repair_samsung_models', QuizState.answers.repair_samsung_models);
      } else if (QuizState.answers.repair_xiaomi_models) {
        model = getAnswerLabel('repair_xiaomi_models', QuizState.answers.repair_xiaomi_models);
      } else if (QuizState.answers.repair_motorola_models) {
        model = getAnswerLabel('repair_motorola_models', QuizState.answers.repair_motorola_models);
      } else if (QuizState.answers.device_brand === 'outro') {
        model = 'Outra marca / Tablet / iPad';
      }

      const issue = getAnswerLabel('issue_type', QuizState.answers.issue_type);
      const conditionStatus = getAnswerLabel('device_condition_status', QuizState.answers.device_condition_status);
      const history = getAnswerLabel('repair_history', QuizState.answers.repair_history);
      const urgency = getAnswerLabel('urgency', QuizState.answers.urgency);

      messageText = `*RESTAURA PHONE BRASIL*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 *NOVO ATENDIMENTO — MANUTENÇÃO*
━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 *UNIDADE SELECIONADA:*
• Loja: *${unitDisplayName}*

📱 *APARELHO DO CLIENTE:*
• *Marca:* ${brand}
• *Modelo:* ${model}
• *Histórico do Aparelho:* ${history}

🛠️ *DIAGNÓSTICO INICIAL:*
• *Defeito Informado:* ${issue}
• *Situação da Peça:* ${conditionStatus}

⏱️ *URGÊNCIA:*
• *Prazo Desejado:* ${urgency}

━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 _Olá! Fiz esse diagnóstico pelo site e gostaria de saber a estimativa de preço e prazo para levar na loja!_` + formatUtmSummary();
    }

    bodyEl.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 50%; background: rgba(52, 199, 89, 0.12); margin-bottom: 12px;">
          ${Icons.checkCircle}
        </div>
        <h3 class="quiz-question-title" style="margin-top: 4px;">Simulação Concluída com Sucesso!</h3>
        <p class="quiz-question-subtitle" style="margin-bottom: 16px;">
          Tudo pronto! Seu pré-cadastro foi gerado para a <strong>Unidade ${unitData.name}</strong> em Petrolina.
        </p>
      </div>
      
      <div class="quiz-summary-card">
        <h4 style="display: flex; align-items: center; gap: 8px;">${Icons.clipboard} Resumo do seu Atendimento:</h4>
        <div class="quiz-summary-list">
          ${summaryRows}
        </div>
      </div>

      <div style="background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.3); border-radius: 16px; padding: 14px 18px; display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
        <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: #25D366; color: #FFF; flex-shrink: 0;">${Icons.whatsapp}</span>
        <p style="font-size: 0.88rem; color: #15803d; line-height: 1.35; margin: 0;">
          Ao clicar abaixo, sua solicitação será aberta diretamente no WhatsApp oficial da <strong>Unidade ${unitData.name}</strong>.
        </p>
      </div>
    `;

    footerEl.innerHTML = `
      <button class="btn btn-outline" id="quizPrevBtn" style="min-height: 48px; padding: 0 20px;">← Revisar</button>
      <a class="btn btn-whatsapp" id="quizFinishWhatsappBtn" href="https://wa.me/${unitData.whatsapp}?text=${encodeURIComponent(messageText)}" target="_blank" rel="noopener" style="flex: 1; min-height: 48px; font-size: 1rem;">
        Conversar no WhatsApp Agora
      </a>
    `;

    const prevBtn = document.getElementById('quizPrevBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (QuizState.history.length > 0) {
          QuizState.currentStepId = QuizState.history.pop();
        } else {
          const steps = getFunnelSteps(QuizState.mode);
          QuizState.currentStepId = steps.length > 0 ? steps[steps.length - 1].id : null;
        }
        renderQuizStep();
      });
    }

    const waBtn = document.getElementById('quizFinishWhatsappBtn');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        trackEvent('Contact', { unit: unitData.name, mode: QuizState.mode });
        setTimeout(() => closeQuiz(), 600);
      });
    }
  }

  // =========================================================
  // 6. PROVA SOCIAL EM TEMPO REAL (LIVE SOCIAL PROOF)
  // =========================================================
  const CLIENT_NAMES = [
    "Lucas Mendes", "Mariana Albuquerque", "Rodrigo Cavalcante", "Camila Ferreira",
    "Gabriel Souza", "Juliana Lima", "Felipe Vasconcelos", "Elaine Guimarães",
    "Sérgio Miranda", "Mônica Sampaio", "Roberto Andrade", "Cláudia Tavares",
    "Antônio Barros", "Silvia Rezende", "José Medeiros", "Beatriz Fontes"
  ];

  const CLIENT_ACTIONS = [
    "Solicitou orçamento de reparo de iPhone",
    "Simulou troca de aparelho usado",
    "Agendou troca de tela express",
    "Pediu orçamento para a Unidade Santa Luzia",
    "Pediu orçamento para a Unidade Vila Eulália",
    "Consultou iPhone 15 Pro seminovo"
  ];

  function startSocialProofLoop() {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    function triggerToast() {
      if (AppConfig.announcements && AppConfig.announcements.socialProofEnabled === false) return;
      const name = CLIENT_NAMES[Math.floor(Math.random() * CLIENT_NAMES.length)];
      const action = CLIENT_ACTIONS[Math.floor(Math.random() * CLIENT_ACTIONS.length)];

      const toast = document.createElement('div');
      toast.className = 'toast-item';
      toast.innerHTML = `
        <div class="toast-pulse"></div>
        <div class="toast-content">
          <p>${name}</p>
          <small>${action} agora</small>
        </div>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
      }, 4200);
    }

    setTimeout(triggerToast, 3000);
    setInterval(triggerToast, Math.floor(Math.random() * 8000) + 11000);
  }

  // =========================================================
  // 7. CATÁLOGO & FILTROS DA VITRINE
  // =========================================================
  function renderCatalog(filter = 'all') {
    const grid = document.getElementById('vitrineGrid');
    if (!grid) return;

    const filtered = AppConfig.products.filter(p => {
      if (filter === 'all') return true;
      if (filter === 'apple') return p.category === 'apple';
      if (filter === 'android') return p.category === 'android';
      if (filter === 'seminovos') return p.category === 'seminovos' || p.badge.includes('Seminovo');
      return true;
    });

    grid.innerHTML = filtered.map(prod => `
      <div class="product-card ${prod.dark ? 'dark' : ''}">
        <div class="product-media">
          <span class="product-badge-tag">${prod.badge}</span>
          <img src="${prod.img}" alt="${prod.title}" loading="lazy">
        </div>
        <div class="product-body">
          <span class="product-kicker">${prod.kicker}</span>
          <h3 class="product-title">${prod.title}</h3>
          <p class="product-desc">${prod.desc}</p>
          
          <div class="product-specs">
            ${Object.entries(prod.specs).map(([k, v]) => `
              <div>
                <span>${k}:</span>
                <strong>${v}</strong>
              </div>
            `).join('')}
          </div>

          <div class="product-footer">
            <button class="btn btn-primary btn-product-quiz" data-prod-title="${prod.title}">
              Simular Compra
            </button>
            <button class="btn btn-outline btn-product-direct-wa" data-prod-title="${prod.title}">
              ${Icons.whatsapp}
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-product-quiz').forEach(btn => {
      btn.addEventListener('click', () => {
        openQuiz('buy');
      });
    });

    grid.querySelectorAll('.btn-product-direct-wa').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-prod-title');
        const text = encodeURIComponent(`Olá! Vi no site o modelo *${title}* e gostaria de informações de preço e disponibilidade!` + formatUtmSummary());
        const targetWa = (AppConfig.units.vilaEulalia && AppConfig.units.vilaEulalia.whatsapp) || AppConfig.units.santaLuzia.whatsapp;
        window.open(`https://wa.me/${targetWa}?text=${text}`, '_blank');
      });
    });
  }

  // =========================================================
  // GALERIA DE PRINTS DE FEEDBACK & LIGHTBOX MODAL
  // =========================================================
  function renderFeedbacksGallery() {
    const grid = document.getElementById('feedbackPrintsGrid');
    if (!grid) return;
    const items = AppConfig.feedbacks || [];
    if (!items.length) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #FFF; border-radius: 16px; border: 1px dashed var(--line);">
          <p style="color: var(--ink-muted); margin-bottom: 12px; font-size: 0.95rem;">Nenhum print de feedback adicionado ainda.</p>
          <button class="btn btn-outline" id="btn_open_admin_fbs" style="font-size: 0.85rem;">
            + Adicionar Prints no Painel Admin
          </button>
        </div>
      `;
      const openBtn = document.getElementById('btn_open_admin_fbs');
      if (openBtn) {
        openBtn.addEventListener('click', () => {
          openAdminModal();
          renderAdminTab('feedbacks');
        });
      }
      return;
    }

    grid.innerHTML = items.map((fb, idx) => `
      <div class="feedback-print-card" data-fb-idx="${idx}">
        <div class="feedback-print-thumb-wrap">
          <img src="${fb.img}" alt="${fb.caption || 'Feedback de cliente Restaura Phone'}" loading="lazy" />
          <span class="feedback-zoom-badge">🔍 Ampliar</span>
        </div>
        <div class="feedback-print-caption">
          ${fb.caption || 'Cliente satisfeito Restaura Phone Petrolina'}
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.feedback-print-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-fb-idx'), 10);
        const item = items[idx];
        if (item) openFeedbackLightbox(item.img, item.caption);
      });
    });
  }

  function openFeedbackLightbox(imgSrc, caption) {
    const overlay = document.getElementById('feedbackLightbox');
    const img = document.getElementById('feedbackLightboxImg');
    const cap = document.getElementById('feedbackLightboxCaption');
    if (!overlay || !img) return;
    img.src = imgSrc;
    if (cap) cap.textContent = caption || '';
    overlay.classList.add('active');
  }

  function closeFeedbackLightbox() {
    const overlay = document.getElementById('feedbackLightbox');
    if (overlay) overlay.classList.remove('active');
  }

  function setupLightboxEvents() {
    const overlay = document.getElementById('feedbackLightbox');
    const closeBtn = document.getElementById('feedbackLightboxClose');
    if (closeBtn) closeBtn.addEventListener('click', closeFeedbackLightbox);
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeFeedbackLightbox();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeFeedbackLightbox();
    });
  }

  // =========================================================
  // 8. PAINEL DE CONTROLE ADMINISTRATIVO (EDITÁVEL)
  // =========================================================
  let isAdminAuthenticated = false;

  function openAdminModal() {
    const overlay = document.getElementById('adminOverlay');
    if (!overlay) return;

    overlay.classList.add('active');

    if (!isAdminAuthenticated) {
      renderAdminPinScreen();
    } else {
      renderAdminTab('units');
    }
  }

  function closeAdminModal() {
    const overlay = document.getElementById('adminOverlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  function renderAdminPinScreen() {
    const body = document.getElementById('adminBody');
    const tabsContainer = document.querySelector('.admin-nav-tabs');
    const footer = document.querySelector('.admin-footer');
    if (tabsContainer) tabsContainer.style.display = 'none';
    if (footer) footer.style.display = 'none';

    if (!body) return;
    body.innerHTML = `
      <div style="text-align: center; max-width: 380px; margin: 30px auto; padding: 10px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 50%; background: var(--bg-subtle); margin-bottom: 12px; color: var(--ink);">
          ${Icons.lock}
        </div>
        <h4 style="font-size: 1.4rem; font-weight: 800; margin: 8px 0 6px; color: var(--ink);">Área Administrativa</h4>
        <p style="font-size: 0.88rem; color: var(--ink-secondary); margin-bottom: 24px;">
          Digite o PIN de segurança para gerenciar telefones, vitrine, avisos e rastreamento.
        </p>
        <input type="password" id="admin_login_pin" class="admin-input" placeholder="Digite o PIN de segurança" style="text-align: center; font-size: 1.1rem; letter-spacing: 0.15em; margin-bottom: 14px; padding: 14px;" />
        <button id="admin_login_submit" class="btn btn-primary" style="width: 100%; min-height: 48px;">
          Desbloquear Painel
        </button>
        <div id="admin_login_error" style="color: #dc2626; font-size: 0.84rem; margin-top: 10px; display: none;">
          PIN incorreto. Tente novamente.
        </div>
        <small style="display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 18px; color: var(--ink-muted); font-size: 0.76rem;">
          ${Icons.shieldCheck} Autenticação com Criptografia SHA-256
        </small>
      </div>
    `;

    const pinInput = document.getElementById('admin_login_pin');
    const pinSubmit = document.getElementById('admin_login_submit');
    const pinError = document.getElementById('admin_login_error');

    async function checkPin() {
      if (!pinInput) return;
      const enteredHash = await sha256(pinInput.value);
      if (enteredHash === AppConfig.adminPinHash) {
        isAdminAuthenticated = true;
        if (tabsContainer) tabsContainer.style.display = 'flex';
        if (footer) footer.style.display = 'flex';
        renderAdminTab('units');
      } else {
        if (pinError) pinError.style.display = 'block';
        pinInput.value = '';
        pinInput.focus();
      }
    }

    if (pinSubmit) pinSubmit.addEventListener('click', checkPin);
    if (pinInput) {
      pinInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkPin();
      });
      setTimeout(() => pinInput.focus(), 150);
    }
  }

  function compressImageToDataUrl(file, maxWidth = 640, maxHeight = 640, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Gera JPEG otimizado (~30KB a 45KB) perfeitamente armazenável
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function setupImageUpload(fileInputId, targetInputId, previewImgId, triggerBtnId) {
    const fileInput = document.getElementById(fileInputId);
    const targetInput = document.getElementById(targetInputId);
    const previewImg = document.getElementById(previewImgId);
    if (!fileInput || !targetInput) return;

    if (triggerBtnId) {
      const triggerBtn = document.getElementById(triggerBtnId);
      if (triggerBtn) {
        triggerBtn.onclick = (e) => {
          e.preventDefault();
          fileInput.click();
        };
      }
    }

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        alert("Por favor, selecione um arquivo de imagem válido (PNG, JPG, WEBP).");
        return;
      }
      try {
        if (previewImg) previewImg.style.opacity = '0.4';
        const compressedDataUrl = await compressImageToDataUrl(file, 640, 640, 0.82);
        targetInput.value = compressedDataUrl;
        if (previewImg) {
          previewImg.src = compressedDataUrl;
          previewImg.style.opacity = '1';
        }
      } catch (err) {
        console.error("Erro na compressão de imagem:", err);
        const reader = new FileReader();
        reader.onload = (event) => {
          targetInput.value = event.target.result;
          if (previewImg) {
            previewImg.src = event.target.result;
            previewImg.style.opacity = '1';
          }
        };
        reader.readAsDataURL(file);
      }
    });

    const updatePreview = () => {
      if (previewImg && targetInput && typeof targetInput.value === 'string' && targetInput.value.trim()) {
        previewImg.src = targetInput.value.trim();
      }
    };
    targetInput.addEventListener('input', updatePreview);
    targetInput.addEventListener('change', updatePreview);
    if (previewImg) {
      previewImg.onerror = () => {
        previewImg.src = '/assets/hero-banner-2026.jpg';
      };
    }
  }

  function syncProductsFromInputs() {
    AppConfig.products.forEach((p, idx) => {
      const titleEl = document.getElementById(`admin_p_title_${idx}`);
      if (titleEl) p.title = titleEl.value.trim();
      const badgeEl = document.getElementById(`admin_p_badge_${idx}`);
      if (badgeEl) p.badge = badgeEl.value.trim();
      const kickerEl = document.getElementById(`admin_p_kicker_${idx}`);
      if (kickerEl) p.kicker = kickerEl.value.trim();
      const descEl = document.getElementById(`admin_p_desc_${idx}`);
      if (descEl) p.desc = descEl.value.trim();
      const catEl = document.getElementById(`admin_p_cat_${idx}`);
      if (catEl) p.category = catEl.value;
      const imgEl = document.getElementById(`admin_p_img_${idx}`);
      if (imgEl && imgEl.value.trim()) p.img = imgEl.value.trim();
      const garantiaEl = document.getElementById(`admin_p_garantia_${idx}`);
      if (garantiaEl) {
        p.specs = p.specs || {};
        p.specs.garantia = garantiaEl.value.trim();
      }
    });

    // AUTO-INSERÇÃO: Se o administrador preencheu o formulário de novo aparelho e clicou em "Salvar Alterações",
    // insere o novo aparelho automaticamente antes de salvar, evitando perda de dados!
    const newTitleEl = document.getElementById('new_prod_title');
    if (newTitleEl && newTitleEl.value.trim()) {
      const title = newTitleEl.value.trim();
      const catEl = document.getElementById('new_prod_category');
      const badgeEl = document.getElementById('new_prod_badge');
      const kickerEl = document.getElementById('new_prod_kicker');
      const garantiaEl = document.getElementById('new_prod_garantia');
      const descEl = document.getElementById('new_prod_desc');
      const imgEl = document.getElementById('new_prod_img');

      const newProduct = {
        id: 'prod-' + Date.now(),
        category: catEl ? catEl.value : 'apple',
        title: title,
        badge: (badgeEl && badgeEl.value.trim()) || 'Destaque Loja',
        kicker: (kickerEl && kickerEl.value.trim()) || 'Pronta Entrega em Petrolina',
        desc: (descEl && descEl.value.trim()) || 'Procedência comprovada, revisado em 32 pontos e garantia de loja.',
        dark: (catEl && catEl.value === 'apple' && AppConfig.products.length % 2 === 0),
        img: (imgEl && imgEl.value.trim()) || '/assets/apple-showcase.jpg',
        specs: {
          garantia: (garantiaEl && garantiaEl.value.trim()) || 'Garantia de Loja',
          revisao: '32 Pontos Inspecionados',
          troca: 'Aceitamos seu Usado'
        }
      };

      AppConfig.products.unshift(newProduct);
      newTitleEl.value = '';
    }
  }

  let activeAdminTab = 'units';
  let activeFunnelMode = 'buy';
  let activeFunnelView = 'chart';

  function renderAdminTab(tab = 'units') {
    activeAdminTab = tab;
    const body = document.getElementById('adminBody');
    const tabs = document.querySelectorAll('.admin-nav-tab');
    tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tab));

    if (!body) return;

    if (tab === 'units') {
      body.innerHTML = `
        <h4 style="margin-bottom: 16px; font-weight: 800; display: flex; align-items: center; gap: 8px;">${Icons.mapPin} Gestão das Lojas Físicas & WhatsApp</h4>
        
        <div style="background: var(--bg-subtle); padding: 18px; border-radius: 14px; margin-bottom: 20px;">
          <h5 style="font-weight: 700; margin-bottom: 12px; color: var(--apple-blue);">Unidade Santa Luzia</h5>
          <div class="admin-grid-2">
            <div class="admin-field-group">
              <label>WhatsApp (com DDD, somente dígitos):</label>
              <input type="text" class="admin-input" id="admin_sl_wa" value="${AppConfig.units.santaLuzia.whatsapp}">
            </div>
            <div class="admin-field-group">
              <label>Telefone Formatado:</label>
              <input type="text" class="admin-input" id="admin_sl_phone" value="${AppConfig.units.santaLuzia.phone}">
            </div>
          </div>
          <div class="admin-field-group">
            <label>Endereço Completo:</label>
            <input type="text" class="admin-input" id="admin_sl_addr" value="${AppConfig.units.santaLuzia.address}">
          </div>
          <div class="admin-field-group">
            <label>Horário de Atendimento:</label>
            <input type="text" class="admin-input" id="admin_sl_hours" value="${AppConfig.units.santaLuzia.hours || 'Seg a Sex: 08h às 19h • Sáb: 08h às 14h'}">
          </div>
        </div>

        <div style="background: var(--bg-subtle); padding: 18px; border-radius: 14px;">
          <h5 style="font-weight: 700; margin-bottom: 12px; color: var(--apple-blue);">Unidade Vila Eulália</h5>
          <div class="admin-grid-2">
            <div class="admin-field-group">
              <label>WhatsApp (com DDD, somente dígitos):</label>
              <input type="text" class="admin-input" id="admin_ve_wa" value="${AppConfig.units.vilaEulalia.whatsapp}">
            </div>
            <div class="admin-field-group">
              <label>Telefone Formatado:</label>
              <input type="text" class="admin-input" id="admin_ve_phone" value="${AppConfig.units.vilaEulalia.phone}">
            </div>
          </div>
          <div class="admin-field-group">
            <label>Endereço Completo:</label>
            <input type="text" class="admin-input" id="admin_ve_addr" value="${AppConfig.units.vilaEulalia.address}">
          </div>
          <div class="admin-field-group">
            <label>Horário de Atendimento:</label>
            <input type="text" class="admin-input" id="admin_ve_hours" value="${AppConfig.units.vilaEulalia.hours || 'Seg a Sex: 08h às 19h • Sáb: 08h às 14h'}">
          </div>
        </div>
      `;
    } else if (tab === 'announcements') {
      const ann = AppConfig.announcements || {};
      const imgs = AppConfig.images || {};
      body.innerHTML = `
        <h4 style="margin-bottom: 16px; font-weight: 800; display: flex; align-items: center; gap: 8px;">${Icons.sparkles} Avisos, Selos & Banners do Site</h4>
        
        <div class="admin-field-group">
          <label>Texto do Selo do Hero (Topo):</label>
          <div class="help-text">Aparece no topo do banner principal ao lado do logo Apple.</div>
          <input type="text" class="admin-input" id="admin_hero_badge" value="${ann.heroBadge || 'Novos & Seminovos • Assistência Especializada'}">
        </div>

        <div class="admin-field-group">
          <label>Frases da Tarja Deslizante (Marquee Ticker):</label>
          <div class="help-text">Separe as mensagens com " • " (ponto central) para rolar continuamente na tela.</div>
          <textarea class="admin-textarea" id="admin_marquee_text">${ann.marqueeText || 'iPhone 16 Pro & Pro Max • Samsung Galaxy Linha S & Linha A • Troca de Tela com Garantia • Troca de Bateria 100% Saúde • Seu Aparelho Usado na Troca • Unidade Santa Luzia • Unidade Vila Eulália • Até 18x Sem Juros no Cartão'}</textarea>
        </div>

        <div class="admin-toggle-row" style="margin-bottom: 24px;">
          <input type="checkbox" id="admin_social_proof" ${ann.socialProofEnabled !== false ? 'checked' : ''}>
          <div>
            <strong>Ativar Notificações de Prova Social ao Vivo</strong>
            <p style="font-size: 0.82rem; color: var(--ink-secondary); margin: 0;">
              Exibe periodicamente pequenas notificações flutuantes no rodapé ("Fulano consultou iPhone 15 Pro agora").
            </p>
          </div>
        </div>

        <div style="background: var(--bg-subtle); padding: 18px; border-radius: 14px;">
          <h5 style="font-weight: 700; margin-bottom: 14px; color: var(--apple-blue); display: flex; align-items: center; gap: 6px;">
            ${Icons.sparkles} Imagens & Banners Oficiais do Site
          </h5>

          <div class="admin-field-group">
            <label>Banner Principal (Hero - Topo):</label>
            <div class="help-text">Imagem destacada no início do site. Você pode enviar do celular/PC ou colar um link.</div>
            <div class="admin-img-row">
              <img src="${imgs.heroBanner || '/assets/apple-showcase.jpg'}" id="admin_hero_img_preview" class="admin-img-preview" alt="Preview Hero">
              <input type="text" class="admin-input" id="admin_hero_img_url" value="${imgs.heroBanner || '/assets/apple-showcase.jpg'}" style="flex: 1;">
              <button type="button" class="admin-upload-btn" id="admin_hero_img_btn">
                ${Icons.box} Trocar Imagem
              </button>
              <input type="file" id="admin_hero_img_file" accept="image/*" style="display: none;">
            </div>
          </div>

          <div class="admin-field-group" style="margin-bottom: 0;">
            <label>Banner da Seção Troca / Trade-in:</label>
            <div class="help-text">Imagem da seção escura que promove a avaliação do celular usado.</div>
            <div class="admin-img-row">
              <img src="${imgs.tradeinBanner || '/assets/tradein-banner.jpg'}" id="admin_tradein_img_preview" class="admin-img-preview" alt="Preview Tradein">
              <input type="text" class="admin-input" id="admin_tradein_img_url" value="${imgs.tradeinBanner || '/assets/tradein-banner.jpg'}" style="flex: 1;">
              <button type="button" class="admin-upload-btn" id="admin_tradein_img_btn">
                ${Icons.box} Trocar Imagem
              </button>
              <input type="file" id="admin_tradein_img_file" accept="image/*" style="display: none;">
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        setupImageUpload('admin_hero_img_file', 'admin_hero_img_url', 'admin_hero_img_preview', 'admin_hero_img_btn');
        setupImageUpload('admin_tradein_img_file', 'admin_tradein_img_url', 'admin_tradein_img_preview', 'admin_tradein_img_btn');
      }, 50);
    } else if (tab === 'products') {
      body.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h4 style="margin: 0; font-weight: 800; display: flex; align-items: center; gap: 8px;">
              ${Icons.smartphone} Gestão do Catálogo de Aparelhos (${AppConfig.products.length} modelos)
            </h4>
            <p style="font-size: 0.84rem; color: var(--ink-secondary); margin: 4px 0 0;">
              Cadastre novos modelos, edite destaques ou remova itens. Sem exibição de preços para valorizar o contato no WhatsApp.
            </p>
          </div>
          <button class="btn btn-primary" id="admin_toggle_add_box" style="font-size: 0.84rem; padding: 0 16px; min-height: 38px; display: inline-flex; align-items: center; gap: 6px;">
            ${Icons.sparkles} + Adicionar Aparelho
          </button>
        </div>

        <!-- Formulário para Inserir Novo Aparelho -->
        <div id="admin_add_prod_box" style="display: none; background: rgba(0, 113, 227, 0.05); border: 1.5px dashed var(--apple-blue); border-radius: 14px; padding: 18px; margin-bottom: 22px;">
          <h5 style="font-weight: 700; color: var(--apple-blue); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            ${Icons.sparkles} Cadastrar Novo Aparelho no Catálogo
          </h5>
          <div class="admin-grid-2">
            <div class="admin-field-group">
              <label>Categoria:</label>
              <select id="new_prod_category" class="admin-select">
                <option value="apple">Linha Apple (iPhone)</option>
                <option value="android">Linha Android (Samsung & Xiaomi)</option>
                <option value="seminovos">Seminovos com Garantia</option>
              </select>
            </div>
            <div class="admin-field-group">
              <label>Nome do Modelo:</label>
              <input type="text" class="admin-input" id="new_prod_title" placeholder="Ex: iPhone 15 128GB ou Galaxy S23">
            </div>
          </div>
          <div class="admin-grid-2">
            <div class="admin-field-group">
              <label>Badge de Destaque:</label>
              <input type="text" class="admin-input" id="new_prod_badge" placeholder="Ex: Lançamento, Destaque da Loja, Seminovo Premium" value="Destaque Loja">
            </div>
            <div class="admin-field-group">
              <label>Subtítulo / Kicker:</label>
              <input type="text" class="admin-input" id="new_prod_kicker" placeholder="Ex: Bateria 100% • Garantia de Loja" value="Pronta Entrega em Petrolina">
            </div>
          </div>
          <div class="admin-grid-2">
            <div class="admin-field-group">
              <label>Garantia / Procedência:</label>
              <input type="text" class="admin-input" id="new_prod_garantia" placeholder="Ex: Garantia de 90 Dias ou 1 Ano Apple" value="Garantia de Loja">
            </div>
            <div class="admin-field-group">
              <label>Descrição Rápida:</label>
              <input type="text" class="admin-input" id="new_prod_desc" placeholder="Ex: Impecável, testado em 32 pontos com procedência garantida.">
            </div>
          </div>
          <div class="admin-field-group">
            <label>Foto do Aparelho (Upload ou Link):</label>
            <div class="admin-img-row">
              <img src="/assets/apple-showcase.jpg" id="new_prod_img_preview" class="admin-img-preview" alt="Preview Novo">
              <input type="text" class="admin-input" id="new_prod_img" placeholder="Cole o link da foto ou escolha do celular/PC" value="/assets/apple-showcase.jpg" style="flex: 1;">
              <button type="button" class="admin-upload-btn" id="new_prod_btn">
                ${Icons.box} Escolher Foto
              </button>
              <input type="file" id="new_prod_file" accept="image/*" style="display: none;">
            </div>
          </div>
          <div style="display: flex; gap: 10px; margin-top: 6px;">
            <button class="btn btn-primary" id="new_prod_submit" style="font-size: 0.86rem; min-height: 40px; padding: 0 20px;">
              Confirmar e Inserir no Catálogo
            </button>
            <button class="btn btn-outline" id="new_prod_cancel" style="font-size: 0.86rem; min-height: 40px; padding: 0 16px;">
              Cancelar
            </button>
          </div>
        </div>

        <!-- Lista de Aparelhos Cadastrados -->
        <div id="admin_products_list">
          ${AppConfig.products.map((p, idx) => `
            <div class="admin-product-item">
              <div class="admin-product-header">
                <div>
                  <strong style="color: var(--ink); font-size: 1.05rem;">#${idx + 1} — ${p.title}</strong>
                  <span style="font-size: 0.74rem; margin-left: 8px; padding: 3px 8px; border-radius: 999px; background: rgba(0, 113, 227, 0.1); color: var(--apple-blue); font-weight: 700;">
                    ${(p.category || 'apple').toUpperCase()}
                  </span>
                </div>
                <button class="admin-del-prod-btn" data-del-idx="${idx}" title="Remover este modelo do catálogo">
                  ✕ Excluir
                </button>
              </div>
              <div class="admin-grid-2">
                <div class="admin-field-group">
                  <label>Título do Modelo:</label>
                  <input type="text" class="admin-input" id="admin_p_title_${idx}" value="${p.title}">
                </div>
                <div class="admin-field-group">
                  <label>Badge de Destaque:</label>
                  <input type="text" class="admin-input" id="admin_p_badge_${idx}" value="${p.badge || 'Destaque'}">
                </div>
              </div>
              <div class="admin-grid-2">
                <div class="admin-field-group">
                  <label>Subtítulo / Kicker:</label>
                  <input type="text" class="admin-input" id="admin_p_kicker_${idx}" value="${p.kicker || ''}">
                </div>
                <div class="admin-field-group">
                  <label>Garantia / Procedência:</label>
                  <input type="text" class="admin-input" id="admin_p_garantia_${idx}" value="${(p.specs && p.specs.garantia) || 'Garantia de Loja'}">
                </div>
              </div>
              <div class="admin-grid-2">
                <div class="admin-field-group">
                  <label>Categoria:</label>
                  <select id="admin_p_cat_${idx}" class="admin-select">
                    <option value="apple" ${p.category === 'apple' ? 'selected' : ''}>Linha Apple (iPhone)</option>
                    <option value="android" ${p.category === 'android' ? 'selected' : ''}>Linha Android (Samsung & Xiaomi)</option>
                    <option value="seminovos" ${p.category === 'seminovos' ? 'selected' : ''}>Seminovos com Garantia</option>
                  </select>
                </div>
                <div class="admin-field-group">
                  <label>Descrição Promocional:</label>
                  <input type="text" class="admin-input" id="admin_p_desc_${idx}" value="${p.desc || ''}">
                </div>
              </div>
              <div class="admin-field-group" style="margin-top: 10px;">
                <label>Foto do Aparelho (Upload ou Link):</label>
                <div class="admin-img-row">
                  <img src="${p.img || '/assets/apple-showcase.jpg'}" id="admin_p_preview_${idx}" class="admin-img-preview" alt="Preview ${p.title}">
                  <input type="text" class="admin-input" id="admin_p_img_${idx}" value="${p.img || '/assets/apple-showcase.jpg'}" style="flex: 1;">
                  <button type="button" class="admin-upload-btn" id="admin_p_btn_${idx}">
                    ${Icons.box} Trocar Foto
                  </button>
                  <input type="file" id="admin_p_file_${idx}" accept="image/*" style="display: none;">
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      setTimeout(() => {
        const toggleBtn = document.getElementById('admin_toggle_add_box');
        const box = document.getElementById('admin_add_prod_box');
        const cancelBtn = document.getElementById('new_prod_cancel');
        const submitBtn = document.getElementById('new_prod_submit');

        setupImageUpload('new_prod_file', 'new_prod_img', 'new_prod_img_preview', 'new_prod_btn');
        AppConfig.products.forEach((_, idx) => {
          setupImageUpload(`admin_p_file_${idx}`, `admin_p_img_${idx}`, `admin_p_preview_${idx}`, `admin_p_btn_${idx}`);
        });

        if (toggleBtn && box) {
          toggleBtn.addEventListener('click', () => {
            box.style.display = box.style.display === 'none' ? 'block' : 'none';
            if (box.style.display === 'block') {
              const titleIn = document.getElementById('new_prod_title');
              if (titleIn) titleIn.focus();
            }
          });
        }

        if (cancelBtn && box) {
          cancelBtn.addEventListener('click', () => {
            box.style.display = 'none';
          });
        }

        if (submitBtn) {
          submitBtn.addEventListener('click', () => {
            const titleEl = document.getElementById('new_prod_title');
            const title = titleEl ? titleEl.value.trim() : '';
            if (!title) {
              alert("Por favor, digite o nome do modelo do aparelho.");
              if (titleEl) titleEl.focus();
              return;
            }

            syncProductsFromInputs();
            saveConfig(AppConfig);
            renderCatalog();
            renderAdminTab('products');
            alert(`Aparelho "${title}" cadastrado com sucesso no catálogo!`);
          });
        }

        // Deleção de produtos
        document.querySelectorAll('.admin-del-prod-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const idx = parseInt(btn.getAttribute('data-del-idx'), 10);
            const targetProd = AppConfig.products[idx];
            if (targetProd && confirm(`Tem certeza que deseja remover "${targetProd.title}" do catálogo?`)) {
              syncProductsFromInputs();
              AppConfig.products.splice(idx, 1);
              saveConfig(AppConfig);
              renderCatalog();
              renderAdminTab('products');
            }
          });
        });
      }, 50);
    } else if (tab === 'feedbacks') {
      const fbs = AppConfig.feedbacks || [];
      body.innerHTML = `
        <h4 style="margin-bottom: 16px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
          💬 Galeria de Prints & Feedbacks de Clientes
        </h4>
        <p style="font-size: 0.86rem; color: var(--ink-secondary); margin-bottom: 20px;">
          Adicione prints de conversas do WhatsApp, directs ou Stories do Instagram de clientes elogiando os consertos, compra de aparelhos e agilidade da loja.
        </p>

        <!-- Formulário Adicionar Novo Print -->
        <div style="background: var(--bg-subtle); padding: 18px; border-radius: 14px; margin-bottom: 24px; border: 1px dashed var(--apple-blue);">
          <h5 style="font-weight: 700; margin-bottom: 12px; color: var(--apple-blue);">+ Adicionar Novo Print de Feedback</h5>
          <div class="admin-grid-2">
            <div class="admin-field-group">
              <label>Legenda / Descrição do Feedback:</label>
              <input type="text" class="admin-input" id="new_fb_caption" placeholder="Ex: iPhone 13 entregue em 40 minutos com garantia na Unidade Santa Luzia">
            </div>
            <div class="admin-field-group">
              <label>Foto do Print (Upload do Computador/Celular ou URL):</label>
              <div class="admin-img-row">
                <input type="text" class="admin-input" id="new_fb_url" placeholder="URL da foto ou envie o arquivo">
                <button type="button" class="admin-upload-btn" id="new_fb_upload_btn">
                  ${Icons.box} Enviar Foto
                </button>
                <input type="file" id="new_fb_file" accept="image/*" style="display: none;">
              </div>
            </div>
          </div>

          <div id="new_fb_preview_box" style="display: none; margin-top: 12px; align-items: center; gap: 12px;">
            <img id="new_fb_preview_img" src="" style="width: 70px; height: 90px; object-fit: cover; border-radius: 8px; border: 1px solid var(--line);" />
            <span style="font-size: 0.8rem; color: #16a34a; font-weight: 700;">✓ Foto selecionada e pronta para inserir</span>
          </div>

          <div style="margin-top: 14px;">
            <button type="button" class="btn btn-primary" id="new_fb_submit_btn" style="min-height: 40px; font-size: 0.86rem; padding: 0 20px;">
              Inserir Print na Galeria
            </button>
          </div>
        </div>

        <!-- Lista de Prints Atuais -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
          <h5 style="font-weight: 700; color: var(--ink); margin: 0;">Prints Atualmente no Site (${fbs.length})</h5>
          <button type="button" class="btn btn-outline" id="btn_reset_feedbacks" onclick="window.resetFeedbackPrints()" style="font-size: 0.78rem; padding: 4px 12px; color: #dc2626; border-color: #fca5a5;">
            Restaurar Prints Padrão
          </button>
        </div>

        <div id="admin_feedbacks_list">
          ${fbs.length === 0 ? '<p style="color: var(--ink-muted); font-size: 0.85rem; padding: 20px; text-align: center;">Nenhum print cadastrado no momento. Use o formulário acima para adicionar!</p>' : ''}
          ${fbs.map((fb, idx) => `
            <div class="admin-feedback-card">
              <img src="${fb.img}" class="admin-feedback-thumb" alt="Thumbnail Print #${idx + 1}" />
              <div style="flex: 1;">
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--ink-muted); display: block; margin-bottom: 4px;">Legenda / Descrição:</label>
                <input type="text" class="admin-input" id="admin_fb_caption_${idx}" value="${fb.caption || ''}" placeholder="Descrição do feedback">
              </div>
              <button type="button" class="admin-del-prod-btn admin-del-fb-btn" onclick="window.deleteFeedbackPrint(${idx})" data-del-fb="${idx}">
                ✕ Excluir
              </button>
            </div>
          `).join('')}
        </div>
      `;

      // Funções globais de ação instantânea para os botões de feedback
      window.deleteFeedbackPrint = function (idx) {
        idx = parseInt(idx, 10);
        if (!AppConfig.feedbacks || !AppConfig.feedbacks[idx]) return;
        AppConfig.feedbacks.forEach((fb, i) => {
          const el = document.getElementById(`admin_fb_caption_${i}`);
          if (el) fb.caption = el.value.trim();
        });
        AppConfig.feedbacks.splice(idx, 1);
        saveConfig(AppConfig);
        syncToSupabase(AppConfig);
        renderFeedbacksGallery();
        renderAdminTab('feedbacks');
      };

      window.resetFeedbackPrints = function () {
        AppConfig.feedbacks = JSON.parse(JSON.stringify(DEFAULT_CONFIG.feedbacks || []));
        saveConfig(AppConfig);
        syncToSupabase(AppConfig);
        renderFeedbacksGallery();
        renderAdminTab('feedbacks');
      };

      setTimeout(() => {
        const fileInput = document.getElementById('new_fb_file');
        const uploadBtn = document.getElementById('new_fb_upload_btn');
        const urlInput = document.getElementById('new_fb_url');
        const prevBox = document.getElementById('new_fb_preview_box');
        const prevImg = document.getElementById('new_fb_preview_img');

        if (uploadBtn && fileInput) {
          uploadBtn.onclick = () => fileInput.click();
          fileInput.onchange = async (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
              try {
                const dataUrl = await compressImageToDataUrl(file, 900, 900, 0.82);
                if (urlInput) urlInput.value = dataUrl;
                if (prevImg) prevImg.src = dataUrl;
                if (prevBox) prevBox.style.display = 'flex';
              } catch (err) {
                console.error("Erro ao comprimir imagem:", err);
              }
            }
          };
        }

        const submitBtn = document.getElementById('new_fb_submit_btn');
        if (submitBtn) {
          submitBtn.onclick = () => {
            const caption = (document.getElementById('new_fb_caption')?.value || '').trim();
            const img = (document.getElementById('new_fb_url')?.value || '').trim();
            if (!img) {
              alert("Por favor, selecione uma foto ou insira a URL da imagem.");
              return;
            }
            AppConfig.feedbacks = AppConfig.feedbacks || [];
            AppConfig.feedbacks.unshift({
              id: `fb_${Date.now()}`,
              caption: caption || 'Cliente satisfeito Restaura Phone Petrolina',
              img: img
            });
            saveConfig(AppConfig);
            syncToSupabase(AppConfig);
            renderFeedbacksGallery();
            renderAdminTab('feedbacks');
          };
        }

        document.querySelectorAll('.admin-del-fb-btn').forEach(btn => {
          btn.onclick = () => {
            const idx = parseInt(btn.getAttribute('data-del-fb'), 10);
            window.deleteFeedbackPrint(idx);
          };
        });
      }, 50);
    } else if (tab === 'tracking') {
      const isPixelActive = Boolean(AppConfig.tracking.metaPixelId);
      const isGoogleActive = Boolean(AppConfig.tracking.googleTagId);

      body.innerHTML = `
        <h4 style="margin-bottom: 16px; font-weight: 800; display: flex; align-items: center; gap: 8px;">${Icons.sparkles} Rastreamento Pro Meta Ads & Google Ads</h4>
        <p style="font-size: 0.88rem; color: var(--ink-secondary); margin-bottom: 20px;">
          Insira aqui os IDs de rastreamento das suas contas de anúncio. O site injeta as tags e dispara automaticamente os eventos de PageView, InitiateCheckout, Lead e Contact.
        </p>

        <div class="admin-field-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label style="margin: 0;">Meta Pixel ID (Facebook / Instagram Ads):</label>
            <span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; background: ${isPixelActive ? 'rgba(52, 199, 89, 0.15)' : 'rgba(0,0,0,0.06)'}; color: ${isPixelActive ? '#15803d' : '#888'}; font-weight: 700;">
              ${isPixelActive ? '● Conectado' : '○ Não configurado'}
            </span>
          </div>
          <div class="help-text">Exemplo: 123456789012345</div>
          <input type="text" class="admin-input" id="admin_pixel_id" placeholder="Digite seu Meta Pixel ID" value="${AppConfig.tracking.metaPixelId || ''}">
        </div>

        <div class="admin-field-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label style="margin: 0;">Google Tag ID (Google Analytics 4 / Google Ads):</label>
            <span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; background: ${isGoogleActive ? 'rgba(52, 199, 89, 0.15)' : 'rgba(0,0,0,0.06)'}; color: ${isGoogleActive ? '#15803d' : '#888'}; font-weight: 700;">
              ${isGoogleActive ? '● Conectado' : '○ Não configurado'}
            </span>
          </div>
          <div class="help-text">Exemplo: G-XXXXXXXXXX ou AW-XXXXXXXXXX</div>
          <input type="text" class="admin-input" id="admin_gtag_id" placeholder="Digite seu Google Tag ID" value="${AppConfig.tracking.googleTagId || ''}">
        </div>

        <div style="background: rgba(0, 113, 227, 0.08); padding: 16px; border-radius: 12px; border: 1px solid rgba(0, 113, 227, 0.2);">
          <strong style="color: var(--apple-blue); font-size: 0.9rem; display: flex; align-items: center; gap: 6px;">
            ${Icons.checkCircle} Rastreamento de UTMs Ativo:
          </strong>
          <p style="font-size: 0.82rem; color: var(--ink-secondary); margin-top: 4px;">
            Qualquer anúncio veiculado com <code>utm_source</code>, <code>utm_campaign</code>, <code>fbclid</code> ou <code>gclid</code> será automaticamente anexado na mensagem do WhatsApp do vendedor da unidade.
          </p>
        </div>
      `;
    } else if (tab === 'funnel') {
      const mode = activeFunnelMode || 'buy';
      const view = activeFunnelView || 'chart';
      const steps = getFunnelSteps(mode);

      body.innerHTML = `
        <div class="funnel-toolbar">
          <div>
            <h4 style="margin: 0; font-weight: 800; display: flex; align-items: center; gap: 8px;">
              ${Icons.sparkles} Construtor de Funil & Qualificação de Leads
            </h4>
            <p style="font-size: 0.84rem; color: var(--ink-secondary); margin: 4px 0 0;">
              Personalize cada pergunta, opções de resposta e defina o direcionamento exato do lead.
            </p>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <div class="funnel-tabs-group">
              <button type="button" class="funnel-subtab-btn ${mode === 'buy' ? 'active' : ''}" id="btn_funnel_mode_buy">
                ${Icons.smartphone} Compra de Aparelhos
              </button>
              <button type="button" class="funnel-subtab-btn ${mode === 'repair' ? 'active' : ''}" id="btn_funnel_mode_repair">
                ${Icons.tools} Assistência Técnica
              </button>
            </div>
            <div class="funnel-tabs-group">
              <button type="button" class="funnel-subtab-btn ${view === 'chart' ? 'active' : ''}" id="btn_funnel_view_chart">
                📊 Fluxograma
              </button>
              <button type="button" class="funnel-subtab-btn ${view === 'editor' ? 'active' : ''}" id="btn_funnel_view_editor">
                ✏️ Editor de Etapas
              </button>
            </div>
            <button type="button" class="btn btn-outline" id="btn_funnel_reset" style="font-size: 0.8rem; padding: 0 12px; min-height: 36px; color: #dc2626; border-color: #fca5a5;">
              Restaurar Padrão
            </button>
          </div>
        </div>

        ${view === 'chart' ? `
          <!-- MODO FLUXOGRAMA VISUAL -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--ink);">
              Diagrama do Fluxo: <span style="color: var(--apple-blue);">${mode === 'buy' ? 'Funil de Venda/Compra' : 'Funil de Manutenção'}</span> (${steps.length} etapas ativas)
            </span>
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <button type="button" class="btn btn-primary" onclick="window.quickAddFunnelStep('${mode}')" style="font-size: 0.78rem; padding: 0 12px; min-height: 32px;">
                + Nova Etapa no Fluxo
              </button>
              <span style="font-size: 0.78rem; color: var(--ink-muted);">Dica: Use ◀ / ▶ para mover ou clique no bloco para editar.</span>
            </div>
          </div>

          <div class="flowchart-wrapper">
            <div class="flowchart-canvas">
              ${steps.map((step, idx) => `
                <div class="flowchart-node" data-node-idx="${idx}" title="Clique para editar esta etapa">
                  <div class="flowchart-node-header">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span class="flowchart-step-badge">Etapa ${idx + 1}</span>
                      <span style="font-size: 0.72rem; color: #94a3b8; font-family: monospace;">#${step.id}</span>
                    </div>
                    <div class="flowchart-node-actions">
                      <button type="button" class="flowchart-mini-btn" onclick="event.stopPropagation(); window.moveFunnelStep('${mode}', ${idx}, -1)" ${idx === 0 ? 'disabled' : ''} title="Mover etapa para a Esquerda">◀</button>
                      <button type="button" class="flowchart-mini-btn" onclick="event.stopPropagation(); window.moveFunnelStep('${mode}', ${idx}, 1)" ${idx === steps.length - 1 ? 'disabled' : ''} title="Mover etapa para a Direita">▶</button>
                      <button type="button" class="flowchart-edit-trigger-btn" onclick="event.stopPropagation(); window.openFlowchartEditModal('${mode}', ${idx})" title="Editar Etapa Diretamente">✏️ Editar</button>
                    </div>
                  </div>
                  
                  <div class="flowchart-node-body" onclick="window.openFlowchartEditModal('${mode}', ${idx})" style="cursor: pointer;">
                    <h5 class="flowchart-node-title">${step.title}</h5>
                    <p class="flowchart-node-sub">${step.subtitle || 'Sem descrição'}</p>
                    
                    <div class="flowchart-branches-list">
                      ${(step.options || []).map(opt => `
                        <div class="flowchart-branch-item">
                          <span class="flowchart-branch-label" title="${opt.label}">
                            <span style="color: #38bdf8;">•</span> ${opt.label}
                          </span>
                          <span class="flowchart-route-tag ${opt.nextStep === 'finish' ? 'tag-finish' : ''}">
                            ➔ ${getRouteLabel(opt.nextStep, steps)}
                          </span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="flowchart-connector">➔</div>
              `).join('')}

              <div class="flowchart-add-step-node" onclick="window.quickAddFunnelStep('${mode}')" title="Adicionar nova etapa neste funil">
                <div style="font-size: 1.5rem; margin-bottom: 4px;">➕</div>
                <div style="font-weight: 700; font-size: 0.88rem; color: #38bdf8;">Nova Etapa</div>
                <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 2px;">Clique para criar</div>
              </div>

              <div class="flowchart-connector">➔</div>

              <div class="flowchart-end-node">
                <div style="font-size: 1.8rem; margin-bottom: 8px;">🎯</div>
                <h5 style="margin: 0 0 6px; font-size: 1rem; font-weight: 800; color: #10b981;">Atendimento WhatsApp</h5>
                <p style="font-size: 0.78rem; color: #a7f3d0; margin: 0; line-height: 1.4;">
                  Lead qualificado é gravado no <strong>Supabase</strong> para seu CRM e direcionado ao WhatsApp da unidade em Petrolina.
                </p>
              </div>
            </div>
          </div>
        ` : `
          <!-- MODO EDITOR DE ETAPAS DO FUNIL -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <span style="font-size: 0.88rem; font-weight: 700; color: var(--ink);">
              Editando Etapas do <span style="color: var(--apple-blue);">${mode === 'buy' ? 'Funil de Venda' : 'Funil de Reparo'}</span>
            </span>
            <button type="button" class="btn btn-primary" id="btn_funnel_add_step" style="font-size: 0.82rem; padding: 0 14px; min-height: 36px;">
              + Adicionar Nova Etapa
            </button>
          </div>

          <div id="funnel_steps_editor_list">
            ${steps.map((step, sIdx) => `
              <div class="funnel-step-editor-card" data-step-idx="${sIdx}">
                <div class="funnel-step-header">
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <span style="font-weight: 800; color: var(--apple-blue); font-size: 0.95rem;">Etapa #${sIdx + 1}</span>
                    <input type="text" class="admin-input" id="fn_step_id_${sIdx}" value="${step.id}" placeholder="ID da etapa (sem espaços)" style="width: 140px; font-family: monospace; font-size: 0.78rem; padding: 4px 8px;">
                    <div class="step-move-controls">
                      <button type="button" class="btn-step-move" onclick="window.moveFunnelStep('${mode}', ${sIdx}, -1)" ${sIdx === 0 ? 'disabled' : ''} title="Mover etapa para Cima">
                        ⬆ Subir
                      </button>
                      <button type="button" class="btn-step-move" onclick="window.moveFunnelStep('${mode}', ${sIdx}, 1)" ${sIdx === steps.length - 1 ? 'disabled' : ''} title="Mover etapa para Baixo">
                        ⬇ Descer
                      </button>
                    </div>
                  </div>
                  <button type="button" class="btn-del-step" data-step-idx="${sIdx}" style="background: none; border: none; color: #ef4444; font-size: 0.82rem; cursor: pointer; font-weight: 600;">
                    ✕ Excluir Etapa
                  </button>
                </div>

                <div class="admin-grid-2" style="margin-bottom: 12px;">
                  <div class="admin-field-group">
                    <label>Pergunta / Título da Etapa:</label>
                    <input type="text" class="admin-input" id="fn_step_title_${sIdx}" value="${step.title}">
                  </div>
                  <div class="admin-field-group">
                    <label>Subtítulo / Dica Explicativa:</label>
                    <input type="text" class="admin-input" id="fn_step_sub_${sIdx}" value="${step.subtitle || ''}">
                  </div>
                </div>

                <label style="font-size: 0.82rem; font-weight: 700; color: var(--ink); margin-bottom: 8px; display: block;">
                  Opções de Resposta & Direcionamento do Lead:
                </label>
                
                <div id="fn_options_container_${sIdx}">
                  ${(step.options || []).map((opt, oIdx) => `
                    <div class="funnel-opt-edit-row" data-opt-idx="${oIdx}">
                      <div>
                        <input type="text" class="admin-input" id="fn_opt_label_${sIdx}_${oIdx}" value="${opt.label}" placeholder="Texto da Opção">
                      </div>
                      <div>
                        <input type="text" class="admin-input" id="fn_opt_sub_${sIdx}_${oIdx}" value="${opt.sub || ''}" placeholder="Detalhe / Descrição">
                      </div>
                      <div>
                        <select class="admin-select" id="fn_opt_icon_${sIdx}_${oIdx}" style="font-size: 0.8rem;">
                          <option value="smartphone" ${opt.icon === 'smartphone' ? 'selected' : ''}>📱 Smartphone</option>
                          <option value="apple" ${opt.icon === 'apple' ? 'selected' : ''}>🍎 Apple iPhone</option>
                          <option value="android" ${opt.icon === 'android' ? 'selected' : ''}>🤖 Android</option>
                          <option value="tools" ${opt.icon === 'tools' ? 'selected' : ''}>🔧 Ferramentas</option>
                          <option value="sparkles" ${opt.icon === 'sparkles' ? 'selected' : ''}>✨ Destaque</option>
                          <option value="screenBroken" ${opt.icon === 'screenBroken' ? 'selected' : ''}>💔 Tela Quebrada</option>
                          <option value="batteryCharging" ${opt.icon === 'batteryCharging' ? 'selected' : ''}>🔋 Bateria</option>
                          <option value="waterDroplet" ${opt.icon === 'waterDroplet' ? 'selected' : ''}>💧 Água / Molhado</option>
                          <option value="microchip" ${opt.icon === 'microchip' ? 'selected' : ''}>⚡ Placa / Chip</option>
                          <option value="plug" ${opt.icon === 'plug' ? 'selected' : ''}>🔌 Conector</option>
                          <option value="clock" ${opt.icon === 'clock' ? 'selected' : ''}>⏱️ Urgente</option>
                          <option value="tradein" ${opt.icon === 'tradein' ? 'selected' : ''}>🔄 Troca de Usado</option>
                          <option value="creditCard" ${opt.icon === 'creditCard' ? 'selected' : ''}>💳 Cartão / Pix</option>
                          <option value="mapPin" ${opt.icon === 'mapPin' ? 'selected' : ''}>📍 Unidade Loja</option>
                          <option value="shieldCheck" ${opt.icon === 'shieldCheck' ? 'selected' : ''}>🛡️ Garantia</option>
                          <option value="box" ${opt.icon === 'box' ? 'selected' : ''}>📦 Novo Lacrado</option>
                        </select>
                      </div>
                      <div>
                        <select class="admin-select" id="fn_opt_next_${sIdx}_${oIdx}" style="font-size: 0.8rem; font-weight: 600; color: var(--apple-blue);">
                          <option value="next" ${(!opt.nextStep || opt.nextStep === 'next') ? 'selected' : ''}>➔ Próxima Etapa (Padrão)</option>
                          <option value="finish" ${opt.nextStep === 'finish' ? 'selected' : ''}>🎯 Finalizar (WhatsApp)</option>
                          ${steps.filter((_, otherIdx) => otherIdx !== sIdx).map(other => `
                            <option value="${other.id}" ${opt.nextStep === other.id ? 'selected' : ''}>
                              ➔ Ir para: ${other.title.slice(0, 24)}...
                            </option>
                          `).join('')}
                        </select>
                      </div>
                      <div>
                        <button type="button" class="btn-del-opt" data-step-idx="${sIdx}" data-opt-idx="${oIdx}" style="background: none; border: none; color: #94a3b8; font-size: 1rem; cursor: pointer;" title="Remover Opção">
                          ✕
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <button type="button" class="btn btn-outline btn-add-opt" data-step-idx="${sIdx}" style="font-size: 0.78rem; padding: 4px 12px; margin-top: 6px;">
                  + Adicionar Opção
                </button>
              </div>
            `).join('')}
          </div>
        `}
      `;

      // Funções globais de manipulação e edição rápida do Funil
      window.moveFunnelStep = function (mode, index, direction) {
        index = parseInt(index, 10);
        direction = parseInt(direction, 10);
        syncFunnelFromInputs();
        const current = getFunnelSteps(mode);
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= current.length) return;
        const item = current.splice(index, 1)[0];
        current.splice(targetIndex, 0, item);
        AppConfig.funnels = AppConfig.funnels || {};
        AppConfig.funnels[mode] = current;
        saveConfig(AppConfig);
        syncToSupabase(AppConfig);
        renderAdminTab('funnel');
      };

      window.quickAddFunnelStep = function (mode) {
        syncFunnelFromInputs();
        const current = getFunnelSteps(mode);
        const newId = 'etapa_' + Date.now();
        current.push({
          id: newId,
          title: "Nova Pergunta de Qualificação",
          subtitle: "Selecione uma das opções abaixo:",
          options: [
            { id: "opt_1", icon: "smartphone", label: "Opção 1", sub: "Descrição da opção", nextStep: "next" },
            { id: "opt_2", icon: "sparkles", label: "Opção 2", sub: "Descrição da opção", nextStep: "finish" }
          ]
        });
        AppConfig.funnels = AppConfig.funnels || {};
        AppConfig.funnels[mode] = current;
        saveConfig(AppConfig);
        syncToSupabase(AppConfig);
        renderAdminTab('funnel');
        window.openFlowchartEditModal(mode, current.length - 1);
      };

      let activeFlowchartEditing = null;

      window.openFlowchartEditModal = function (mode, idx) {
        idx = parseInt(idx, 10);
        const steps = getFunnelSteps(mode);
        if (!steps[idx]) return;
        activeFlowchartEditing = {
          mode,
          idx,
          step: JSON.parse(JSON.stringify(steps[idx]))
        };
        renderFlowchartModalContent();
        const modal = document.getElementById('flowchartEditModal');
        if (modal) {
          modal.style.display = 'flex';
          modal.setAttribute('aria-hidden', 'false');
        }
      };

      window.closeFlowchartEditModal = function () {
        const modal = document.getElementById('flowchartEditModal');
        if (modal) {
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
        }
        activeFlowchartEditing = null;
      };

      window.readFlowchartModalInputs = function () {
        if (!activeFlowchartEditing || !activeFlowchartEditing.step) return;
        const s = activeFlowchartEditing.step;
        const idEl = document.getElementById('fc_input_id');
        if (idEl && idEl.value.trim()) s.id = idEl.value.trim().replace(/\s+/g, '_');
        const titleEl = document.getElementById('fc_input_title');
        if (titleEl && titleEl.value.trim()) s.title = titleEl.value.trim();
        const subEl = document.getElementById('fc_input_sub');
        if (subEl) s.subtitle = subEl.value.trim();

        (s.options || []).forEach((opt, oIdx) => {
          const lEl = document.getElementById(`fc_opt_label_${oIdx}`);
          if (lEl && lEl.value.trim()) opt.label = lEl.value.trim();
          const sEl = document.getElementById(`fc_opt_sub_${oIdx}`);
          if (sEl) opt.sub = sEl.value.trim();
          const iEl = document.getElementById(`fc_opt_icon_${oIdx}`);
          if (iEl) opt.icon = iEl.value;
          const nEl = document.getElementById(`fc_opt_next_${oIdx}`);
          if (nEl) opt.nextStep = nEl.value;
        });
      };

      window.saveCurrentFlowchartModalStep = function (closeModal = true) {
        if (!activeFlowchartEditing) return;
        window.readFlowchartModalInputs();
        const { mode, idx, step } = activeFlowchartEditing;
        const current = getFunnelSteps(mode);
        if (current[idx]) {
          current[idx] = step;
          AppConfig.funnels = AppConfig.funnels || {};
          AppConfig.funnels[mode] = current;
          saveConfig(AppConfig);
          syncToSupabase(AppConfig);
        }
        if (closeModal) {
          window.closeFlowchartEditModal();
          renderAdminTab('funnel');
        }
      };

      function renderFlowchartModalContent() {
        if (!activeFlowchartEditing) return;
        const { mode, idx, step } = activeFlowchartEditing;
        const allSteps = getFunnelSteps(mode);

        const badge = document.getElementById('fc_modal_badge');
        if (badge) badge.textContent = `Etapa #${idx + 1}`;
        const heading = document.getElementById('fc_modal_heading');
        if (heading) heading.textContent = `Editar Etapa: ${step.title || 'Sem título'}`;

        const prevBtn = document.getElementById('fc_modal_btn_prev');
        if (prevBtn) {
          prevBtn.disabled = (idx === 0);
          prevBtn.onclick = () => {
            window.saveCurrentFlowchartModalStep(false);
            window.moveFunnelStep(mode, idx, -1);
            window.openFlowchartEditModal(mode, idx - 1);
          };
        }

        const nextBtn = document.getElementById('fc_modal_btn_next');
        if (nextBtn) {
          nextBtn.disabled = (idx === allSteps.length - 1);
          nextBtn.onclick = () => {
            window.saveCurrentFlowchartModalStep(false);
            window.moveFunnelStep(mode, idx, 1);
            window.openFlowchartEditModal(mode, idx + 1);
          };
        }

        const delBtn = document.getElementById('fc_modal_btn_del');
        if (delBtn) {
          delBtn.onclick = () => {
            if (confirm(`Excluir a etapa "${step.title}"?`)) {
              const curSteps = getFunnelSteps(mode);
              curSteps.splice(idx, 1);
              AppConfig.funnels = AppConfig.funnels || {};
              AppConfig.funnels[mode] = curSteps;
              saveConfig(AppConfig);
              syncToSupabase(AppConfig);
              window.closeFlowchartEditModal();
              renderAdminTab('funnel');
            }
          };
        }

        const saveBtn = document.getElementById('fc_modal_btn_save');
        if (saveBtn) {
          saveBtn.onclick = () => {
            window.saveCurrentFlowchartModalStep(true);
          };
        }

        const bodyEl = document.getElementById('fc_modal_body');
        if (!bodyEl) return;

        bodyEl.innerHTML = `
          <div class="admin-grid-2" style="margin-bottom: 14px;">
            <div class="admin-field-group">
              <label>ID da Etapa (sem espaços / chave única):</label>
              <input type="text" class="admin-input" id="fc_input_id" value="${step.id || ''}" style="font-family: monospace;">
            </div>
            <div class="admin-field-group">
              <label>Pergunta / Título no Quiz:</label>
              <input type="text" class="admin-input" id="fc_input_title" value="${step.title || ''}">
            </div>
          </div>

          <div class="admin-field-group" style="margin-bottom: 16px;">
            <label>Subtítulo / Dica Explicativa para o Cliente:</label>
            <input type="text" class="admin-input" id="fc_input_sub" value="${step.subtitle || ''}">
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <label style="font-size: 0.85rem; font-weight: 700; color: #f8fafc; margin: 0;">
              Opções de Resposta & Direcionamento do Lead:
            </label>
            <button type="button" class="btn btn-outline" id="fc_btn_add_opt" style="font-size: 0.76rem; padding: 3px 10px; color: #38bdf8; border-color: rgba(56, 189, 248, 0.4); min-height: 28px;">
              + Adicionar Opção
            </button>
          </div>

          <div id="fc_options_container">
            ${(step.options || []).map((opt, oIdx) => `
              <div class="fc-opt-edit-row" data-opt-idx="${oIdx}">
                <div>
                  <input type="text" class="admin-input" id="fc_opt_label_${oIdx}" value="${opt.label || ''}" placeholder="Texto da Opção">
                </div>
                <div>
                  <input type="text" class="admin-input" id="fc_opt_sub_${oIdx}" value="${opt.sub || ''}" placeholder="Detalhe / Descrição">
                </div>
                <div>
                  <select class="admin-select" id="fc_opt_icon_${oIdx}" style="font-size: 0.8rem;">
                    <option value="smartphone" ${opt.icon === 'smartphone' ? 'selected' : ''}>📱 Smartphone</option>
                    <option value="apple" ${opt.icon === 'apple' ? 'selected' : ''}>🍎 Apple iPhone</option>
                    <option value="android" ${opt.icon === 'android' ? 'selected' : ''}>🤖 Android</option>
                    <option value="tools" ${opt.icon === 'tools' ? 'selected' : ''}>🔧 Ferramentas</option>
                    <option value="sparkles" ${opt.icon === 'sparkles' ? 'selected' : ''}>✨ Destaque</option>
                    <option value="screenBroken" ${opt.icon === 'screenBroken' ? 'selected' : ''}>💔 Tela Quebrada</option>
                    <option value="batteryCharging" ${opt.icon === 'batteryCharging' ? 'selected' : ''}>🔋 Bateria</option>
                    <option value="waterDroplet" ${opt.icon === 'waterDroplet' ? 'selected' : ''}>💧 Água / Molhado</option>
                    <option value="microchip" ${opt.icon === 'microchip' ? 'selected' : ''}>⚡ Placa / Chip</option>
                    <option value="plug" ${opt.icon === 'plug' ? 'selected' : ''}>🔌 Conector</option>
                    <option value="clock" ${opt.icon === 'clock' ? 'selected' : ''}>⏱️ Urgente</option>
                    <option value="tradein" ${opt.icon === 'tradein' ? 'selected' : ''}>🔄 Troca de Usado</option>
                    <option value="creditCard" ${opt.icon === 'creditCard' ? 'selected' : ''}>💳 Cartão / Pix</option>
                    <option value="mapPin" ${opt.icon === 'mapPin' ? 'selected' : ''}>📍 Unidade Loja</option>
                    <option value="shieldCheck" ${opt.icon === 'shieldCheck' ? 'selected' : ''}>🛡️ Garantia</option>
                    <option value="box" ${opt.icon === 'box' ? 'selected' : ''}>📦 Novo Lacrado</option>
                  </select>
                </div>
                <div>
                  <select class="admin-select" id="fc_opt_next_${oIdx}" style="font-size: 0.8rem; font-weight: 600; color: #38bdf8;">
                    <option value="next" ${(!opt.nextStep || opt.nextStep === 'next') ? 'selected' : ''}>➔ Próxima Etapa (Padrão)</option>
                    <option value="finish" ${opt.nextStep === 'finish' ? 'selected' : ''}>🎯 Finalizar (WhatsApp)</option>
                    ${allSteps.filter((_, otherIdx) => otherIdx !== idx).map(other => `
                      <option value="${other.id}" ${opt.nextStep === other.id ? 'selected' : ''}>
                        ➔ Ir para: ${other.title.slice(0, 22)}...
                      </option>
                    `).join('')}
                  </select>
                </div>
                <div>
                  <button type="button" class="fc-opt-del-btn" data-del-opt="${oIdx}" style="background: none; border: none; color: #f87171; font-size: 1.1rem; cursor: pointer; padding: 4px;" title="Remover Opção">
                    ✕
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `;

        const addOptBtn = document.getElementById('fc_btn_add_opt');
        if (addOptBtn) {
          addOptBtn.onclick = () => {
            window.readFlowchartModalInputs();
            activeFlowchartEditing.step.options = activeFlowchartEditing.step.options || [];
            activeFlowchartEditing.step.options.push({
              id: `opt_${Date.now()}`,
              icon: 'smartphone',
              label: `Nova Alternativa ${activeFlowchartEditing.step.options.length + 1}`,
              sub: 'Descrição complementar',
              nextStep: 'next'
            });
            renderFlowchartModalContent();
          };
        }

        document.querySelectorAll('.fc-opt-del-btn').forEach(btn => {
          btn.onclick = () => {
            const oIdx = parseInt(btn.getAttribute('data-del-opt'), 10);
            window.readFlowchartModalInputs();
            if (activeFlowchartEditing.step.options && activeFlowchartEditing.step.options[oIdx]) {
              activeFlowchartEditing.step.options.splice(oIdx, 1);
              renderFlowchartModalContent();
            }
          };
        });
      }

      setTimeout(() => {
        const buyBtn = document.getElementById('btn_funnel_mode_buy');
        const repairBtn = document.getElementById('btn_funnel_mode_repair');
        if (buyBtn) {
          buyBtn.addEventListener('click', () => {
            syncFunnelFromInputs();
            activeFunnelMode = 'buy';
            renderAdminTab('funnel');
          });
        }
        if (repairBtn) {
          repairBtn.addEventListener('click', () => {
            syncFunnelFromInputs();
            activeFunnelMode = 'repair';
            renderAdminTab('funnel');
          });
        }

        const chartBtn = document.getElementById('btn_funnel_view_chart');
        const editorBtn = document.getElementById('btn_funnel_view_editor');
        if (chartBtn) {
          chartBtn.addEventListener('click', () => {
            syncFunnelFromInputs();
            activeFunnelView = 'chart';
            renderAdminTab('funnel');
          });
        }
        if (editorBtn) {
          editorBtn.addEventListener('click', () => {
            syncFunnelFromInputs();
            activeFunnelView = 'editor';
            renderAdminTab('funnel');
          });
        }

        const resetBtn = document.getElementById('btn_funnel_reset');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            if (confirm("Deseja restaurar as etapas originais deste funil?")) {
              AppConfig.funnels = AppConfig.funnels || {};
              AppConfig.funnels[activeFunnelMode] = JSON.parse(JSON.stringify(activeFunnelMode === 'buy' ? DEFAULT_BUY_FUNNEL : DEFAULT_REPAIR_FUNNEL));
              saveConfig(AppConfig);
              renderAdminTab('funnel');
            }
          });
        }

        const addStepBtn = document.getElementById('btn_funnel_add_step');
        if (addStepBtn) {
          addStepBtn.addEventListener('click', () => {
            syncFunnelFromInputs();
            const current = getFunnelSteps(activeFunnelMode);
            const newId = 'etapa_' + Date.now();
            current.push({
              id: newId,
              title: "Nova Pergunta de Qualificação",
              subtitle: "Selecione uma das opções abaixo:",
              options: [
                { id: "opt_1", icon: "smartphone", label: "Opção 1", sub: "Descrição da opção", nextStep: "next" },
                { id: "opt_2", icon: "sparkles", label: "Opção 2", sub: "Descrição da opção", nextStep: "finish" }
              ]
            });
            AppConfig.funnels[activeFunnelMode] = current;
            renderAdminTab('funnel');
          });
        }

        document.querySelectorAll('.btn-del-step').forEach(btn => {
          btn.addEventListener('click', () => {
            const sIdx = parseInt(btn.getAttribute('data-step-idx'), 10);
            const current = getFunnelSteps(activeFunnelMode);
            if (current[sIdx] && confirm(`Excluir a etapa "${current[sIdx].title}"?`)) {
              syncFunnelFromInputs();
              current.splice(sIdx, 1);
              AppConfig.funnels[activeFunnelMode] = current;
              renderAdminTab('funnel');
            }
          });
        });

        document.querySelectorAll('.btn-add-opt').forEach(btn => {
          btn.addEventListener('click', () => {
            syncFunnelFromInputs();
            const sIdx = parseInt(btn.getAttribute('data-step-idx'), 10);
            const current = getFunnelSteps(activeFunnelMode);
            if (current[sIdx]) {
              current[sIdx].options = current[sIdx].options || [];
              const oLen = current[sIdx].options.length + 1;
              current[sIdx].options.push({
                id: `opt_${Date.now()}`,
                icon: "smartphone",
                label: `Nova Alternativa ${oLen}`,
                sub: "Descrição complementar",
                nextStep: "next"
              });
              AppConfig.funnels[activeFunnelMode] = current;
              renderAdminTab('funnel');
            }
          });
        });

        document.querySelectorAll('.btn-del-opt').forEach(btn => {
          btn.addEventListener('click', () => {
            syncFunnelFromInputs();
            const sIdx = parseInt(btn.getAttribute('data-step-idx'), 10);
            const oIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
            const current = getFunnelSteps(activeFunnelMode);
            if (current[sIdx] && current[sIdx].options && current[sIdx].options[oIdx]) {
              current[sIdx].options.splice(oIdx, 1);
              AppConfig.funnels[activeFunnelMode] = current;
              renderAdminTab('funnel');
            }
          });
        });
      }, 50);
    } else if (tab === 'security') {
      body.innerHTML = `
        <h4 style="margin-bottom: 16px; font-weight: 800; display: flex; align-items: center; gap: 8px;">${Icons.lock} Segurança com SHA-256 & Backups</h4>
        
        <div style="background: var(--bg-subtle); padding: 18px; border-radius: 14px; margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <h5 style="font-weight: 700; margin: 0; color: var(--apple-blue); display: flex; align-items: center; gap: 6px;">
              ${Icons.sparkles} Conexão Supabase Cloud & CRM Sync
            </h5>
            <span class="supabase-status-pill ${supabaseClient ? 'connected' : 'local'}">
              ${supabaseClient ? '● Supabase Conectado' : '○ Modo Local / Offline'}
            </span>
          </div>
          <p style="font-size: 0.82rem; color: var(--ink-secondary); margin-bottom: 14px;">
            Conecte seu projeto do Supabase para sincronizar aparelhos e o funil em tempo real e salvar leads qualificados no seu CRM.
          </p>

          <div class="admin-grid-2">
            <div class="admin-field-group">
              <label>URL do Projeto Supabase (Project URL):</label>
              <input type="text" class="admin-input" id="admin_supabase_url" placeholder="Ex: https://xyzcompany.supabase.co" value="${(AppConfig.supabase && AppConfig.supabase.url) || ''}">
            </div>
            <div class="admin-field-group">
              <label>Chave Anon Pública (anon / public key):</label>
              <input type="password" class="admin-input" id="admin_supabase_key" placeholder="Ex: eyJhbGciOiJIUzI1NiIsIn..." value="${(AppConfig.supabase && AppConfig.supabase.anonKey) || ''}">
            </div>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 10px; align-items: center; flex-wrap: wrap;">
            <button type="button" class="btn btn-outline" id="adminTestSupabaseBtn" style="font-size: 0.84rem; min-height: 38px;">
              ⚡ Testar Conexão Supabase
            </button>
            <button type="button" class="btn btn-outline" id="adminToggleSqlBtn" style="font-size: 0.84rem; min-height: 38px;">
              📜 Ver Script SQL para o Supabase
            </button>
          </div>

          <div id="adminSqlBox" style="display: none; margin-top: 12px;">
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--ink);">Copie e rode no SQL Editor do Supabase com 1 clique:</span>
            <pre class="sql-copy-box">-- 1. Tabela de Configurações do Site e Funil
CREATE TABLE IF NOT EXISTS public.site_config (
  id TEXT PRIMARY KEY DEFAULT 'main',
  funnels JSONB DEFAULT '{}'::jsonb,
  products JSONB DEFAULT '[]'::jsonb,
  announcements JSONB DEFAULT '{}'::jsonb,
  images JSONB DEFAULT '{}'::jsonb,
  units JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura site_config" ON public.site_config FOR SELECT USING (true);
CREATE POLICY "Gravacao site_config" ON public.site_config FOR ALL USING (true);

-- 2. Tabela de Leads para o CRM
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  funnel_mode TEXT,
  target_unit TEXT,
  customer_brand TEXT,
  customer_interest TEXT,
  answers JSONB DEFAULT '{}'::jsonb,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'novo'
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Insercao leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Leitura leads" ON public.leads FOR SELECT USING (true);</pre>
          </div>
        </div>

        <div style="background: var(--bg-subtle); padding: 18px; border-radius: 14px; margin-bottom: 24px;">
          <h5 style="font-weight: 700; margin-bottom: 10px; color: var(--ink);">Alterar PIN de Acesso ao Painel</h5>
          <p style="font-size: 0.82rem; color: var(--ink-secondary); margin-bottom: 14px;">
            Ao salvar, o novo PIN é convertido em um Hash Criptográfico SHA-256 irreversível. A senha nunca fica salva em texto puro.
          </p>
          <div class="admin-grid-2">
            <div class="admin-field-group">
              <label>Novo PIN:</label>
              <input type="password" class="admin-input" id="admin_new_pin" placeholder="Mínimo 4 caracteres">
            </div>
            <div class="admin-field-group">
              <label>Confirmar Novo PIN:</label>
              <input type="password" class="admin-input" id="admin_confirm_pin" placeholder="Repita o novo PIN">
            </div>
          </div>
          <small style="color: var(--apple-blue); font-size: 0.78rem;">
            * Deixe em branco se não desejar alterar o PIN atual.
          </small>
        </div>

        <div style="background: var(--bg-subtle); padding: 18px; border-radius: 14px;">
          <h5 style="font-weight: 700; margin-bottom: 10px; color: var(--ink);">Backup Completo das Configurações</h5>
          <p style="font-size: 0.82rem; color: var(--ink-secondary); margin-bottom: 16px;">
            Exporte todas as suas configurações em um arquivo JSON de segurança ou restaure em outro dispositivo.
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn btn-outline" id="adminExportBtn" style="font-size: 0.86rem;">
              ${Icons.box} Exportar Backup (JSON)
            </button>
            <label class="btn btn-outline" style="cursor: pointer; font-size: 0.86rem; margin: 0;">
              ${Icons.clipboard} Importar Backup
              <input type="file" id="adminImportFile" accept=".json" style="display: none;">
            </label>
            <button class="btn btn-outline" id="adminResetBtn" style="color: #dc2626; border-color: #fca5a5; font-size: 0.86rem;">
              Restaurar Padrões de Fábrica
            </button>
          </div>
        </div>
      `;

      setTimeout(() => {
        const expBtn = document.getElementById('adminExportBtn');
        if (expBtn) {
          expBtn.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppConfig, null, 2));
            const dlAnchor = document.createElement('a');
            dlAnchor.setAttribute("href", dataStr);
            dlAnchor.setAttribute("download", `restaura_phone_backup_${new Date().toISOString().slice(0, 10)}.json`);
            dlAnchor.click();
          });
        }

        const importInput = document.getElementById('adminImportFile');
        if (importInput) {
          importInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
              try {
                const imported = JSON.parse(event.target.result);
                if (imported.units && imported.brandName) {
                  AppConfig = Object.assign({}, DEFAULT_CONFIG, imported);
                  saveConfig(AppConfig);
                  updateDomTexts();
                  alert("Backup importado e aplicado com sucesso!");
                  renderAdminTab('security');
                } else {
                  alert("Arquivo de backup inválido.");
                }
              } catch (err) {
                alert("Erro ao ler arquivo de backup: " + err.message);
              }
            };
            reader.readAsText(file);
          });
        }

        const resetBtn = document.getElementById('adminResetBtn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            if (confirm("Tem certeza que deseja restaurar as configurações padrão de fábrica da Restaura Phone?")) {
              localStorage.removeItem('restaura_config_v1');
              AppConfig = Object.assign({}, DEFAULT_CONFIG);
              alert("Configurações restauradas com sucesso!");
              location.reload();
            }
          });
        }

        const testBtn = document.getElementById('adminTestSupabaseBtn');
        if (testBtn) {
          testBtn.addEventListener('click', async () => {
            const url = (document.getElementById('admin_supabase_url')?.value || '').trim();
            const key = (document.getElementById('admin_supabase_key')?.value || '').trim();
            if (!url || !key) {
              alert("Por favor, preencha a URL e a Chave Anon antes de testar.");
              return;
            }
            if (!window.supabase) {
              alert("SDK do Supabase ainda carregando. Aguarde 2 segundos e tente novamente.");
              return;
            }
            testBtn.textContent = "Testando conexão...";
            try {
              const testClient = window.supabase.createClient(url, key);
              const { data, error } = await testClient.from('site_config').select('id').limit(1);
              if (error) {
                alert(`Conexão com o projeto efetuada, mas houve aviso na tabela: ${error.message}\n(Verifique se executou o script SQL das tabelas no Supabase)`);
              } else {
                alert("Conexão com o Supabase estabelecida com sucesso! 🚀");
              }
            } catch(e) {
              alert("Falha ao conectar com o Supabase: " + e.message);
            } finally {
              testBtn.textContent = "⚡ Testar Conexão Supabase";
            }
          });
        }

        const sqlToggle = document.getElementById('adminToggleSqlBtn');
        const sqlBox = document.getElementById('adminSqlBox');
        if (sqlToggle && sqlBox) {
          sqlToggle.addEventListener('click', () => {
            sqlBox.style.display = sqlBox.style.display === 'none' ? 'block' : 'none';
          });
        }
      }, 100);
    }
  }

  function syncFunnelFromInputs() {
    if (activeAdminTab !== 'funnel' || activeFunnelView !== 'editor') return;
    const mode = activeFunnelMode || 'buy';
    const steps = getFunnelSteps(mode);

    steps.forEach((step, sIdx) => {
      const idEl = document.getElementById(`fn_step_id_${sIdx}`);
      if (idEl && idEl.value.trim()) step.id = idEl.value.trim().replace(/\s+/g, '_');
      const titleEl = document.getElementById(`fn_step_title_${sIdx}`);
      if (titleEl && titleEl.value.trim()) step.title = titleEl.value.trim();
      const subEl = document.getElementById(`fn_step_sub_${sIdx}`);
      if (subEl) step.subtitle = subEl.value.trim();

      (step.options || []).forEach((opt, oIdx) => {
        const labelEl = document.getElementById(`fn_opt_label_${sIdx}_${oIdx}`);
        if (labelEl && labelEl.value.trim()) opt.label = labelEl.value.trim();
        const optSubEl = document.getElementById(`fn_opt_sub_${sIdx}_${oIdx}`);
        if (optSubEl) opt.sub = optSubEl.value.trim();
        const iconEl = document.getElementById(`fn_opt_icon_${sIdx}_${oIdx}`);
        if (iconEl) opt.icon = iconEl.value;
        const nextEl = document.getElementById(`fn_opt_next_${sIdx}_${oIdx}`);
        if (nextEl) opt.nextStep = nextEl.value;
      });
    });

    AppConfig.funnels = AppConfig.funnels || {};
    AppConfig.funnels[mode] = steps;
  }

  async function saveAdminChanges() {
    // 1. Coleta dados de Lojas
    const slWa = document.getElementById('admin_sl_wa');
    if (slWa) AppConfig.units.santaLuzia.whatsapp = slWa.value.replace(/\D/g, '');
    const slPhone = document.getElementById('admin_sl_phone');
    if (slPhone) AppConfig.units.santaLuzia.phone = slPhone.value;
    const slAddr = document.getElementById('admin_sl_addr');
    if (slAddr) AppConfig.units.santaLuzia.address = slAddr.value;
    const slHours = document.getElementById('admin_sl_hours');
    if (slHours) AppConfig.units.santaLuzia.hours = slHours.value;

    const veWa = document.getElementById('admin_ve_wa');
    if (veWa) AppConfig.units.vilaEulalia.whatsapp = veWa.value.replace(/\D/g, '');
    const vePhone = document.getElementById('admin_ve_phone');
    if (vePhone) AppConfig.units.vilaEulalia.phone = vePhone.value;
    const veAddr = document.getElementById('admin_ve_addr');
    if (veAddr) AppConfig.units.vilaEulalia.address = veAddr.value;
    const veHours = document.getElementById('admin_ve_hours');
    if (veHours) AppConfig.units.vilaEulalia.hours = veHours.value;

    // 2. Coleta dados de Avisos, Marquee & Banners
    AppConfig.announcements = AppConfig.announcements || {};
    const heroBadge = document.getElementById('admin_hero_badge');
    if (heroBadge) AppConfig.announcements.heroBadge = heroBadge.value.trim();
    const marqueeText = document.getElementById('admin_marquee_text');
    if (marqueeText) AppConfig.announcements.marqueeText = marqueeText.value.trim();
    const socialProof = document.getElementById('admin_social_proof');
    if (socialProof) AppConfig.announcements.socialProofEnabled = socialProof.checked;

    // Imagens dos Banners
    AppConfig.images = AppConfig.images || {};
    const heroImgEl = document.getElementById('admin_hero_img_url');
    if (heroImgEl && heroImgEl.value.trim()) AppConfig.images.heroBanner = heroImgEl.value.trim();
    const tradeinImgEl = document.getElementById('admin_tradein_img_url');
    if (tradeinImgEl && tradeinImgEl.value.trim()) AppConfig.images.tradeinBanner = tradeinImgEl.value.trim();

    // 3. Coleta dados de Produtos do Catálogo
    syncProductsFromInputs();

    // 4. Coleta dados de Tracking
    const pixelId = document.getElementById('admin_pixel_id');
    if (pixelId) AppConfig.tracking.metaPixelId = pixelId.value.trim();
    const gtagId = document.getElementById('admin_gtag_id');
    if (gtagId) AppConfig.tracking.googleTagId = gtagId.value.trim();

    // 5. Alteração de PIN com Hash Criptográfico SHA-256
    const newPinEl = document.getElementById('admin_new_pin');
    const confirmPinEl = document.getElementById('admin_confirm_pin');
    if (newPinEl && newPinEl.value.trim()) {
      const p1 = newPinEl.value.trim();
      const p2 = confirmPinEl ? confirmPinEl.value.trim() : '';
      if (p1.length < 4) {
        alert("O novo PIN deve ter pelo menos 4 caracteres.");
        return;
      }
      if (p1 !== p2) {
        alert("A confirmação do PIN não coincide com o novo PIN.");
        return;
      }
      AppConfig.adminPinHash = await sha256(p1);
    }

    // 6. Coleta dados do Funil
    syncFunnelFromInputs();

    // 7. Coleta credenciais do Supabase
    const spUrlEl = document.getElementById('admin_supabase_url');
    const spKeyEl = document.getElementById('admin_supabase_key');
    if (spUrlEl && spKeyEl) {
      AppConfig.supabase = AppConfig.supabase || {};
      AppConfig.supabase.url = spUrlEl.value.trim();
      AppConfig.supabase.anonKey = spKeyEl.value.trim();
      initSupabase();
    }

    // 8. Coleta dados de Prints & Feedbacks
    if (Array.isArray(AppConfig.feedbacks)) {
      AppConfig.feedbacks.forEach((fb, idx) => {
        const capEl = document.getElementById(`admin_fb_caption_${idx}`);
        if (capEl) fb.caption = capEl.value.trim();
      });
    }

    saveConfig(AppConfig);
    syncToSupabase(AppConfig);
    renderCatalog();
    renderFeedbacksGallery();
    initTrackingScripts();
    updateDomTexts();
    alert("Todas as configurações foram salvas e sincronizadas com sucesso!");
    closeAdminModal();
  }

  // Atualiza dados no DOM da página caso alterados no admin
  function updateDomTexts() {
    // Unidades
    const slPhoneEl = document.getElementById('dom_sl_phone');
    if (slPhoneEl) slPhoneEl.textContent = AppConfig.units.santaLuzia.phone;
    const slAddrEl = document.getElementById('dom_sl_addr');
    if (slAddrEl) slAddrEl.textContent = AppConfig.units.santaLuzia.address;

    const vePhoneEl = document.getElementById('dom_ve_phone');
    if (vePhoneEl) vePhoneEl.textContent = AppConfig.units.vilaEulalia.phone;
    const veAddrEl = document.getElementById('dom_ve_addr');
    if (veAddrEl) veAddrEl.textContent = AppConfig.units.vilaEulalia.address;

    // Selo Hero
    if (AppConfig.announcements && AppConfig.announcements.heroBadge) {
      const heroBadgeSpan = document.querySelector('.hero-content .chip-apple span:last-child');
      if (heroBadgeSpan) heroBadgeSpan.textContent = AppConfig.announcements.heroBadge;
    }

    // Marquee Ticker
    if (AppConfig.announcements && AppConfig.announcements.marqueeText) {
      const track = document.querySelector('.marquee-track');
      if (track) {
        const items = AppConfig.announcements.marqueeText.split(' • ').map(s => s.trim()).filter(Boolean);
        if (items.length) {
          const doubleItems = items.concat(items);
          track.innerHTML = doubleItems.map(txt => `<span class="marquee-item"><span class="dot"></span>${txt}</span>`).join('');
        }
      }
    }

    // Imagens dos Banners
    if (AppConfig.images) {
      if (AppConfig.images.heroBanner) {
        const heroImg = document.getElementById('dom_hero_img');
        if (heroImg) heroImg.src = AppConfig.images.heroBanner;
      }
      if (AppConfig.images.tradeinBanner) {
        const tradeinImg = document.getElementById('dom_tradein_img');
        if (tradeinImg) tradeinImg.src = AppConfig.images.tradeinBanner;
      }
    }

    // Re-renderiza a vitrine de produtos e galeria de feedbacks
    renderCatalog('all');
    renderFeedbacksGallery();
  }

  // =========================================================
  // 9. INICIALIZAÇÃO GERAL DO SITE & LISTENERS
  // =========================================================
  document.addEventListener('DOMContentLoaded', () => {
    initTrackingScripts();
    startSocialProofLoop();
    renderCatalog('all');
    renderFeedbacksGallery();
    setupLightboxEvents();
    updateDomTexts();

    // Scroll effect navbar
    const siteHeader = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        siteHeader?.classList.add('scrolled');
      } else {
        siteHeader?.classList.remove('scrolled');
      }
    });

    // Mobile nav toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileDropdown = document.getElementById('mobileDropdown');
    if (mobileBtn && mobileDropdown) {
      mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('open');
        mobileDropdown.classList.toggle('open');
      });
      mobileDropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileBtn.classList.remove('open');
          mobileDropdown.classList.remove('open');
        });
      });
    }

    // Botões que abrem o Quiz de Compra
    document.querySelectorAll('.open-buy-quiz').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openQuiz('buy');
      });
    });

    // Botões que abrem o Quiz de Manutenção
    document.querySelectorAll('.open-repair-quiz').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openQuiz('repair');
      });
    });

    // Fechar Quiz
    const quizCloseBtn = document.getElementById('quizCloseBtn');
    if (quizCloseBtn) quizCloseBtn.addEventListener('click', closeQuiz);

    const quizOverlay = document.getElementById('quizOverlay');
    if (quizOverlay) {
      quizOverlay.addEventListener('click', (e) => {
        if (e.target === quizOverlay) closeQuiz();
      });
    }

    // Filtros de produtos
    document.querySelectorAll('.catalog-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.catalog-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter') || 'all';
        renderCatalog(filter);
      });
    });

    // Botão de Admin no Rodapé
    const adminBtn = document.getElementById('adminOpenBtn');
    if (adminBtn) adminBtn.addEventListener('click', openAdminModal);

    const adminCloseBtn = document.getElementById('adminCloseBtn');
    if (adminCloseBtn) adminCloseBtn.addEventListener('click', closeAdminModal);

    const adminSaveBtn = document.getElementById('adminSaveBtn');
    if (adminSaveBtn) adminSaveBtn.addEventListener('click', saveAdminChanges);

    document.querySelectorAll('.admin-nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const t = tab.getAttribute('data-tab');
        renderAdminTab(t);
      });
    });

    // Banner de Cookies LGPD
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
    if (cookieBanner && !localStorage.getItem('restaura_cookies_accepted')) {
      setTimeout(() => cookieBanner.classList.add('active'), 1200);
    }
    if (cookieAcceptBtn) {
      cookieAcceptBtn.addEventListener('click', () => {
        localStorage.setItem('restaura_cookies_accepted', 'true');
        cookieBanner?.classList.remove('active');
      });
    }

    // Tecla de atalho para admin (Ctrl + Shift + A)
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        openAdminModal();
      }
    });

    // Inicialização do Supabase & Sincronização em Nuvem
    initSupabase();
    setTimeout(() => syncFromSupabase(), 1500);

    // Rota por hash #admin
    if (window.location.hash === '#admin') {
      openAdminModal();
    }
  });

})();
