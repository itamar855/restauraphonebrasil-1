# Restaura Phone Brasil — Web Engine & Funis Interativos

Plataforma oficial da **Restaura Phone Brasil** (Petrolina - PE), construída com arquitetura de alta conversão estilo Apple/iPlanet, funis interativos de qualificação cirúrgica de leads para WhatsApp, sincronização com Supabase Cloud e integração com Evolution API / CRM.

---

## 🚀 Principais Tecnologias & Recursos

* **Frontend Nativo:** HTML5 semântico, Vanilla CSS (Design Tokens, Dark/Light mode, Glassmorphism) e Vanilla JavaScript modular.
* **Funis de Qualificação:**
  * **Compra:** Captura de nome, seleção exata de modelo (iPhone XR ao 18 Pro Max, Toda linha Xiaomi lacrada, Samsung Galaxy), sistema de Trade-In (aparelho usado na troca), forma de pagamento e unidade.
  * **Manutenção:** Captura de nome, modelo específico, tipo de defeito, estado da peça, histórico do aparelho e urgência.
* **Loja Principal Prioritária:** **Unidade Vila Eulália** configurada como loja prioritária número 1.
* **Integração WhatsApp & Evolution API:** Formatação de mensagens em formato de ticket estruturado, com nome do cliente, unidade, aparelho e condições comerciais.
* **Persistência Supabase Cloud:** Gravação silenciosa de leads na tabela `leads` e configurações do site em `site_config`.
* **Rastreamento Pro:** Eventos do Meta Ads (Pixel) e Google Ads com captura e persistência de parâmetros UTM.
* **Painel Administrativo:** Acesso protegido por PIN criptografado (SHA-256) para gerenciar telefones, vitrine, avisos e tags.

---

## 📂 Estrutura de Pastas

```text
/
├── assets/
│   ├── app.css              # Folha de estilos central
│   ├── app.js               # Engine central dos funis, tracking e admin
│   └── *.jpg / *.png        # Imagens, banners e logo oficiais
├── DOCUMENTACAO.md          # Manual técnico e operacional detalhado
├── index.html               # Landing page principal
├── llms.txt                 # Instruções de recomendação para IAs (LLMO)
├── netlify.toml             # Configuração de deploy no Netlify
└── robots.txt / sitemap.xml # SEO e indexação
```

---

## 📖 Documentação Completa

Para detalhes aprofundados sobre a arquitetura dos funis, tabelas do Supabase, webhook da Evolution API e regras de negócio das unidades, consulte o arquivo:

👉 **[DOCUMENTACAO.md](./DOCUMENTACAO.md)**

---

## 🛠️ Deploy

O deploy é gerenciado automaticamente pelo Netlify conectado ao repositório GitHub:
* **Repositório:** [itamar855/restauraphonebrasil-1](https://github.com/itamar855/restauraphonebrasil-1)
* **Branch Principal:** `main`
