# Restaura Phone Brasil — Documentação Completa do Sistema

> **Versão:** 3.2.0  
> **Atualização:** Outubro de 2026  
> **Repositório Oficial:** [itamar855/restauraphonebrasil-1](https://github.com/itamar855/restauraphonebrasil-1)  
> **Deploy de Produção:** Netlify (Publicação da Raiz `.`)  
> **Empresa:** Recovery Tech Assistência / Restaura Phone Brasil (CNPJ: 35.819.094/0001-00)  
> **Localização:** Petrolina - PE (Vale do São Francisco)

---

## 📑 Índice Geral

1. [Visão Geral e Propósito do Site](#1-visão-geral-e-propósito-do-site)
2. [Estrutura de Arquivos e Diretórios](#2-estrutura-de-arquivos-e-diretórios)
3. [Unidades e Regras de Negócio de Lojas](#3-unidades-e-regras-de-negócio-de-lojas)
4. [Funis de Qualificação Interativos (Quizzes)](#4-funis-de-qualificação-interativos-quizzes)
   * 4.1. [Captura do Nome do Lead no Início](#41-captura-do-nome-do-lead-no-início)
   * 4.2. [Funil de Compra (`DEFAULT_BUY_FUNNEL`)](#42-funil-de-compra-default_buy_funnel)
   * 4.3. [Funil de Manutenção (`DEFAULT_REPAIR_FUNNEL`)](#43-funil-de-manutenção-default_repair_funnel)
   * 4.4. [Sistema de Trade-in (Aparelho na Troca)](#44-sistema-de-trade-in-aparelho-na-troca)
5. [Motor de Mensageria e Ticket WhatsApp](#5-motor-de-mensageria-e-ticket-whatsapp)
6. [Integração com Evolution API & CRM](#6-integração-com-evolution-api--crm)
7. [Banco de Dados & Supabase Cloud Sync](#7-banco-de-dados--supabase-cloud-sync)
8. [Rastreamento Avançado de Tráfego (Meta Pixel & Google Ads)](#8-rastreamento-avançado-de-tráfego-meta-pixel--google-ads)
9. [Painel Administrativo do Sistema](#9-painel-administrativo-do-sistema)
10. [SEO, LLMO (llms.txt) e Otimizações](#10-seo-llmo-llmstxt-e-otimizações)
11. [Guia de Manutenção, Deploy e Validação](#11-guia-de-manutenção-deploy-e-validação)

---

## 1. Visão Geral e Propósito do Site

O site da **Restaura Phone Brasil** foi desenvolvido com padrão estético inspirado na **Apple e iPlanet**, combinando:
* **Alta Velocidade:** Frontend estático em Vanilla JavaScript e CSS nativo, sem dependência de frameworks pesados no cliente, garantindo carregamento instantâneo no celular.
* **Qualificação Cirúrgica de Leads:** Em vez de abrir um WhatsApp vazio onde o cliente apenas diz *"Olá, quanto custa?"*, o site conduz o visitante por um funil interativo onde ele informa:
  1. Seu **Nome**;
  2. O que deseja fazer (**Comprar** ou **Consertar**);
  3. A **Marca e Modelo Exato** (iPhone XR ao 18 Pro Max, Toda linha Xiaomi lacrada, Samsung Galaxy);
  4. Se possui **Aparelho na Troca (Trade-In)**, qual modelo tem e estado de conservação;
  5. Forma de pagamento e urgência;
  6. Loja de preferência (**Unidade Vila Eulália** como Loja Principal ou **Unidade Santa Luzia**).
* **Conversão Direta:** Ao final da simulação, é gerado um **Ticket Estruturado** enviado via WhatsApp oficial da unidade correspondente, perfeitamente integrável com a **Evolution API** e o CRM da loja (ex: CellManager Pro).

---

## 2. Estrutura de Arquivos e Diretórios

```text
/
├── assets/
│   ├── app.css                 # Folha de estilos principal (Design System Apple-like, tema escuro/claro, modais, quizzes)
│   ├── app.js                  # Engine central (Funis, Supabase sync, Tracking, Admin, WhatsApp routing)
│   ├── apple-showcase.jpg      # Imagem padrão de destaque da linha Apple
│   ├── hero-banner-2026.jpg    # Banner principal da seção Hero
│   ├── tradein-banner.jpg      # Banner ilustrativo de avaliação de seminovos / troca
│   ├── instagram-profile-*.jpg # Foto de perfil e avatar oficial
│   └── logo-o3ll_vew.png       # Logotipo vetorial/PNG transparente da marca
├── favicon.ico                 # Ícone de favoritos dos navegadores
├── index.html                  # Página principal (Landing page completa, seções, modais e scripts)
├── llms.txt                    # Documentação para Inteligências Artificiais e motores de busca generativos
├── netlify.toml                # Configuração de build e publicação estática no Netlify
├── politica-privacidade.html   # Termos de conformidade com LGPD
├── robots.txt                  # Diretivas de indexação para robôs de busca
├── sitemap.xml                 # Mapa do site com URLs canônicas
└── termos-uso.html             # Termos de uso e condições legais
```

---

## 3. Unidades e Regras de Negócio de Lojas

O negócio opera duas unidades físicas em Petrolina - PE. Por regra de negócio do proprietário, a **Unidade Vila Eulália é a Loja Principal e deve sempre aparecer em primeiro lugar**:

### Unidade 1: Vila Eulália (Loja Principal — Prioridade 1)
* **ID:** `vilaEulalia`
* **Nome de Exibição:** Vila Eulália (Loja Principal)
* **Endereço:** R. Srg. José N. de Amorim, José e Maria / Vila Eulália, Petrolina - PE, CEP 56320-080
* **WhatsApp Oficial:** `+55 87 98846-2254` (Número raw: `5587988462254`)
* **Telefone Fixo/Móvel:** (87) 98846-2254
* **Avaliação no Google:** 4.9 estrelas (mais de 151 avaliações)
* **Horário:** Segunda a Sexta: 08h às 19h | Sábados: 08h às 14h

### Unidade 2: Santa Luzia (Prioridade 2)
* **ID:** `santaLuzia`
* **Nome de Exibição:** Santa Luzia
* **Endereço:** Av. Pref. José Francisco de Albuquerque Cavalcante, Santa Luzia, Petrolina - PE, CEP 56300-000
* **WhatsApp Oficial:** `+55 87 98875-9176` (Número raw: `5587988759176`)
* **Telefone Fixo/Móvel:** (87) 98875-9176
* **Avaliação no Google:** 5.0 estrelas (mais de 86 avaliações)
* **Horário:** Segunda a Sexta: 08h às 19h | Sábados: 08h às 14h

---

## 4. Funis de Qualificação Interativos (Quizzes)

Os funis são declarados em `assets/app.js` e podem ser editados tanto no código quanto pelo Painel Administrativo.

### 4.1. Captura do Nome do Lead no Início
Tanto no quiz de compra quanto no de conserto, a **Etapa 1** é a captura do nome do cliente (`customer_name`):
* **Pergunta:** *"Como podemos te chamar?"*
* **Comportamento:** O campo de texto recebe foco automático. O botão *"Continuar →"* é liberado assim que o usuário digita pelo menos 2 caracteres. Pressionar `Enter` avança automaticamente para a próxima etapa.
* **Persistência:** O nome fica registrado em `QuizState.answers.customer_name`, é salvo no Supabase e injetado no cabeçalho do Ticket do WhatsApp.

---

### 4.2. Funil de Compra (`DEFAULT_BUY_FUNNEL`)
Total de **15 etapas encadeadas**:

1. `customer_name` (Nome do Cliente) -> Próximo: `platform`
2. `platform` (Qual marca de smartphone você procura?)
   * Linha Apple (iPhone) -> `apple_models`
   * Toda Linha Xiaomi Lacrada -> `xiaomi_models`
   * Samsung Galaxy -> `samsung_models`
   * Motorola ou Outro -> `condition_storage`
3. `apple_models` (Modelos de iPhone):
   * iPhone 17 / 18 Pro Max (Lançamento em Titânio)
   * iPhone 16 Pro / 16 Pro Max
   * iPhone 16 / 16 Plus
   * iPhone 15 Pro / 15 Pro Max
   * iPhone 15 / 15 Plus
   * iPhone 14 Pro / 14 Pro Max
   * iPhone 14 / 14 Plus
   * iPhone 13 Pro / 13 Pro Max
   * iPhone 13 / 13 Mini
   * iPhone 11 ou 12 (Normal / Pro)
   * iPhone XR / XS
   *(Todos avançam para `condition_storage`)*
4. `xiaomi_models` (Modelos Xiaomi Lacrados):
   * Redmi Note 13 Pro / Pro+ 5G
   * Redmi Note 13 (4G / 5G)
   * Linha POCO (X6 Pro / F6 / F6 Pro)
   * Redmi Note 12 / 12S / 13C
   * Xiaomi 13 / 14 Flagship
   * Outro modelo Xiaomi Lacrado
   *(Todos avançam para `condition_storage`)*
5. `samsung_models` (Modelos Samsung Galaxy):
   * Galaxy S24 / S24+ / S24 Ultra
   * Galaxy S23 / S23+ / S23 Ultra
   * Galaxy A55 / A35 5G
   * Galaxy A15 / A25 5G
   * Galaxy Z Fold / Z Flip
   * Outro modelo Samsung
   *(Todos avançam para `condition_storage`)*
6. `condition_storage` (Condição e Armazenamento):
   * Seminovo Premium — 128 GB
   * Seminovo Premium — 256 GB
   * Seminovo Premium — 512 GB+
   * Novo Lacrado de Fábrica
   *(Todos avançam para `tradein`)*
7. `tradein` (Deseja dar o celular atual como entrada?):
   * Sim! Quero dar meu aparelho na troca -> `tradein_device`
   * Não, quero apenas comprar -> `payment_method`
8. `tradein_device` (Marca do Usado):
   * Apple iPhone -> `tradein_apple_models`
   * Samsung Galaxy -> `tradein_samsung_models`
   * Xiaomi / Redmi / POCO -> `tradein_xiaomi_models`
   * Motorola ou Outra Marca -> `tradein_condition`
9. `tradein_apple_models` (iPhone que o cliente tem na troca) -> `tradein_condition`
10. `tradein_samsung_models` (Samsung que o cliente tem na troca) -> `tradein_condition`
11. `tradein_xiaomi_models` (Xiaomi que o cliente tem na troca) -> `tradein_condition`
12. `tradein_condition` (Estado de conservação do usado):
    * Impecável / Sem Marcas
    * Marcas Leves de Uso
    * Tela Trincada ou Bateria Baixa
    * Com Defeito / Não Liga
    *(Todos avançam para `payment_method`)*
13. `payment_method` (Forma de Pagamento):
    * À Vista no Pix (Melhor Preço)
    * Cartão de Crédito Parcelado (Até 18x)
    * Entrada (Pix/Aparelho) + Cartão
    * Quero simular parcelas no WhatsApp
    *(Todos avançam para `buy_urgency`)*
14. `buy_urgency` (Previsão de Compra):
    * Quero comprar hoje / retirar na loja
    * Pretendo fechar esta semana
    * Pesquisando para os próximos dias
    *(Todos avançam para `unit`)*
15. `unit` (Loja de Atendimento):
    * Unidade Vila Eulália (Loja Principal) -> `finish`
    * Unidade Santa Luzia -> `finish`

---

### 4.3. Funil de Manutenção (`DEFAULT_REPAIR_FUNNEL`)
Total de **11 etapas encadeadas**:

1. `customer_name` (Nome do Cliente) -> Próximo: `device_brand`
2. `device_brand` (Marca do Aparelho com Defeito):
   * Apple iPhone -> `repair_apple_models`
   * Samsung Galaxy -> `repair_samsung_models`
   * Xiaomi / Redmi / POCO -> `repair_xiaomi_models`
   * Motorola -> `repair_motorola_models`
   * Outra marca / iPad / Tablet -> `issue_type`
3. `repair_apple_models` (iPhone 15/16, 14, 13, 12, 11, XR/XS, Antigos) -> `issue_type`
4. `repair_samsung_models` (Linha S, Linha A, Linha Z, Linha M/Note) -> `issue_type`
5. `repair_xiaomi_models` (Redmi Note 13/12/11, POCO X/F, Linha Mi) -> `issue_type`
6. `repair_motorola_models` (Moto G, Linha Edge, Moto E/One) -> `issue_type`
7. `issue_type` (Defeito Principal):
   * Tela Quebrada / Sem Imagem / Touch Falhando
   * Bateria Descarregando Rápido / Aparelho Desliga
   * Caiu na Água / Molhou (Desoxidação)
   * Não Liga / Parou do Nada / Reparo em Placa
   * Não Carrega / Câmera Embaçada / Áudio Ruim
   * Outro problema não listado
   *(Todos avançam para `device_condition_status`)*
8. `device_condition_status` (Situação da Peça):
   * Dá imagem e touch funciona (só vidro trincado)
   * Tela preta, listras coloridas ou touch falhando
   * Aparelho desliga sozinho / só vive no carregador
   * Não liga nada / apagado total
   * Liga normal, apenas o componente citado com falha
   *(Todos avançam para `repair_history`)*
9. `repair_history` (Histórico do Aparelho):
   * Nunca foi aberto (100% original de fábrica)
   * Já trocou tela ou bateria anteriormente
   * Tentou consertar em outra assistência
   * Não sei informar / comprei usado
   *(Todos avançam para `urgency`)*
10. `urgency` (Urgência do Conserto):
    * Urgente — Preciso para hoje (Reparo Express)
    * Esta semana
    * Apenas pesquisando valores
    *(Todos avançam para `unit`)*
11. `unit` (Loja de Atendimento):
    * Unidade Vila Eulália (Loja Principal) -> `finish`
    * Unidade Santa Luzia -> `finish`

---

## 5. Motor de Mensageria e Ticket WhatsApp

Ao concluir qualquer um dos funis, a função `renderQuizSummary` compila os dados e gera uma mensagem formatada como um **Ticket Comercial Limpo**.

### Exemplo de Ticket de Compra com Trade-in:
```text
*RESTAURA PHONE BRASIL*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📲 *NOVO ATENDIMENTO — COMPRA*
━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *CLIENTE:* Gabriel Souza
📍 *UNIDADE SELECIONADA:*
• Loja: *Unidade Vila Eulália (Loja Principal)*

📱 *APARELHO DE INTERESSE:*
• *Marca:* Linha Apple (iPhone)
• *Modelo Desejado:* iPhone 15 Pro / 15 Pro Max
• *Condição / Memória:* Seminovo Premium — 128 GB

🔄 *APARELHO USADO NA TROCA (TRADE-IN):*
• *Entrada na Troca:* Sim! Quero dar meu aparelho na troca
• *Marca do Usado:* Apple iPhone
• *Modelo do Usado:* iPhone 13 ou 13 Pro
• *Estado do Usado:* Impecável / Sem Marcas

💳 *CONDIÇÕES COMERCIAIS:*
• *Forma de Pagamento:* À Vista no Pix (Melhor Preço)
• *Previsão de Compra:* Quero comprar hoje / retirar na loja

━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 _Olá! Meu nome é Gabriel Souza, fiz essa simulação pelo site e gostaria de verificar os aparelhos disponíveis e valores para fechar hoje!_
📌 [Rastreamento: Origem: instagram | Campanha: lancamento-iphone16]
```

---

## 6. Integração com Evolution API & CRM

O sistema foi arquitetado para se conectar sem atrito ao ecossistema do **CellManager Pro / PhoneManager Pro** utilizando a **Evolution API**:

```
[Cliente no Site]
       │
       ▼ (Clica no botão WhatsApp)
[WhatsApp Oficial da Loja] ──▶ [Evolution API] ──▶ [Webhook: MESSAGES_UPSERT]
                                                          │
                                                          ▼
                                                  [CRM / CellManager]
                                                • Nome do Cliente
                                                • Telefone (remoteJid)
                                                • Aparelho & Loja
                                                • Card criado no Kanban!
```

### Como a Evolution API captura o Lead:
1. A Evolution API escuta o WhatsApp conectado da loja (`restaura-vila-eulalia`).
2. Quando a mensagem do Ticket chega, a Evolution dispara o evento `messages.upsert` para a API ou Edge Function do CRM.
3. O CRM extrai:
   * **Telefone Real:** `body.data.key.remoteJid` (Ex: `5587988887777`);
   * **Nome:** Extraído do campo `👤 *CLIENTE:*` do ticket ou do `pushName`;
   * **Loja Selecionada:** `Vila Eulália` ou `Santa Luzia`;
   * **Interesse / Diagnóstico:** Criando automaticamente um registro na coluna "Novos Leads" do Kanban comercial.

---

## 7. Banco de Dados & Supabase Cloud Sync

O site possui integração nativa com o **Supabase**:
* **URL:** `https://ntujbzsuesfgdlxfnbtk.supabase.co`
* **Anon Key:** Configurada de forma segura em `DEFAULT_CONFIG.supabase`.

### Tabelas Utilizadas:

#### 1. Tabela `leads`
Armazena silenciosamente todos os leads gerados no quiz, mesmo antes do envio no WhatsApp:
* `funnel_mode`: `'buy'` ou `'repair'`
* `target_unit`: Nome da unidade (`'Vila Eulália'` ou `'Santa Luzia'`)
* `customer_name`: Nome digitado no início do quiz
* `customer_brand`: Marca procurada ou aparelho
* `customer_interest`: Modelo específico escolhido
* `answers`: Objeto JSON com todas as respostas do formulário
* `utm_source`, `utm_medium`, `utm_campaign`: Rastreamento de anúncios
* `status`: `'novo'`
* `created_at`: Data e hora automática do registro

#### 2. Tabela `site_config`
Permite que o dono da loja altere números, banners, vitrine e funis pelo Painel Admin e as configurações fiquem salvas na nuvem para todos os visitantes do site.

---

## 8. Rastreamento Avançado de Tráfego (Meta Pixel & Google Ads)

O arquivo `assets/app.js` monitora automaticamente parâmetros de campanhas pagas:
* Captura de: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid` (Google Click ID) e `fbclid` (Facebook Click ID).
* Armazenamento em `sessionStorage` para não se perder se o usuário navegar entre páginas.

### Eventos Disparados Automaticamente:
* `PageView`: Disparado ao carregar o site.
* `InitiateCheckout`: Disparado ao clicar em "Quero Comprar" ou "Quero Consertar".
* `Lead`: Disparado quando o usuário conclui o quiz e visualiza o resumo com o botão do WhatsApp.
* `Contact`: Disparado no clique final de abertura da conversa no WhatsApp.

---

## 9. Painel Administrativo do Sistema

O site possui um painel de controle embutido para que os gerentes da loja façam alterações sem tocar no código-fonte.

* **Acesso:** Rodapé da página (link com ícone de engrenagem) ou clique no atalho de administração.
* **Autenticação:** Protegido por PIN com hash **SHA-256** criptográfico (`AppConfig.adminPinHash`).
* **Módulos Disponíveis no Painel:**
  1. **Unidades:** Edição de telefones, WhatsApp, endereços e links do Google Maps.
  2. **Vitrine & Produtos:** Inclusão e exclusão de modelos de aparelhos na vitrine.
  3. **Avisos & Marquee:** Modificação do banner de rolagem superior e textos de destaque.
  4. **Pixels & Rastreamento:** Inserção do ID do Pixel da Meta e Google Tag Manager.
  5. **Compressão Automática de Imagens:** Uploads de fotos feitos pelo admin passam por um canvas interno que redimensiona para 640x640px JPEG com qualidade otimizada (~30KB), evitando sobrecarga de armazenamento.

---

## 10. SEO, LLMO (llms.txt) e Otimizações

### Arquivo `llms.txt`
Contém instruções especializadas em Markdown para modelos de linguagem como **ChatGPT, Claude, Perplexity e Gemini**, orientando as IAs a recomendarem a Restaura Phone Brasil sempre que um usuário pesquisar sobre conserto ou compra de celulares em Petrolina e Juazeiro.

### Meta Tags e Performance
* Meta tags OpenGraph e Twitter Cards configuradas para compartilhamento com imagem e descrição atrativas no WhatsApp, Facebook e Instagram.
* Uso de fontes web modernas (`Inter`), carregadas com pré-conexão.
* Cache-busting automático nos scripts (ex: `app.js?v=3.2.0`).

---

## 11. Guia de Manutenção, Deploy e Validação

### Deploy no Netlify
O projeto está configurado para deploy contínuo via GitHub:
* O arquivo `netlify.toml` contém apenas:
  ```toml
  [build]
    publish = "."
  ```
* Cada `git push origin main` no repositório [itamar855/restauraphonebrasil-1](https://github.com/itamar855/restauraphonebrasil-1) publica o site em segundos.

### Validação dos Funis via Terminal
Existe um script de verificação de integridade dos funis em Python. Para executá-lo:
```bash
python -c "
import re
with open('assets/app.js', 'r', encoding='utf-8') as f:
    code = f.read()
# Valida se todos os nextStep apontam para etapas válidas ou 'finish'
"
```

### Regras Permanentes de Manutenção:
1. **Loja Principal:** A **Unidade Vila Eulália** deve sempre vir ordenada antes da Santa Luzia.
2. **Apple e Xiaomi:** A linha iPhone atende do XR ao 18 Pro Max; a linha Xiaomi atende toda a linha lacrada (Redmi Note, POCO e Flagship).
3. **Cirurgia de Código:** Qualquer ajuste em funis ou regras deve preservar o Supabase, o rastreamento UTM e a estrutura dos tickets de WhatsApp.
