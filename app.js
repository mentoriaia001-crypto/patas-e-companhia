/* ==========================================================================
   Patas & Companhia — app.js
   Site de demonstração (empresa fictícia)
   Funcionalidades: menu mobile, rolagem suave, destaque de seção ativa,
   renderização de serviços e produtos, carrinho simples, toast,
   validação do formulário de contato e animações de entrada.
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     1. Dados de demonstração
     ---------------------------------------------------------------------- */

  const SERVICOS = [
    {
      icone: "🛁",
      titulo: "Banho & Tosa",
      descricao:
        "Banho com produtos hipoalergênicos, secagem suave, corte de unhas, limpeza de ouvidos e perfume pet.",
      preco: "a partir de R$ 69",
      duracao: "60 a 90 min",
    },
    {
      icone: "🩺",
      titulo: "Consultas Veterinárias",
      descricao:
        "Check-up completo, vacinação, vermifugação e acompanhamento nutricional com veterinários registrados no CRMV.",
      preco: "a partir de R$ 120",
      duracao: "40 min",
    },
    {
      icone: "🏠",
      titulo: "Hospedagem & Creche",
      descricao:
        "Suítes individuais climatizadas, monitoramento por câmeras e atualizações diárias enviadas no seu WhatsApp.",
      preco: "a partir de R$ 95/diária",
      duracao: "por diária",
    },
    {
      icone: "🎾",
      titulo: "Adestramento Positivo",
      descricao:
        "Aulas individuais ou em grupo com reforço positivo para sociabilidade, comandos básicos e passeio tranquilo.",
      preco: "a partir de R$ 140",
      duracao: "50 min",
    },
    {
      icone: "🚐",
      titulo: "Táxi Dog",
      descricao:
        "Buscamos e devolvemos o seu pet em casa com transporte seguro, caixa de contenção e motorista treinado.",
      preco: "a partir de R$ 25",
      duracao: "por trecho",
    },
    {
      icone: "🧡",
      titulo: "Pet Sitter em Casa",
      descricao:
        "Visitas programadas para alimentar, brincar e cuidar do seu companheiro enquanto você viaja.",
      preco: "a partir de R$ 55",
      duracao: "por visita",
    },
  ];

  const PRODUTOS = [
    {
      emoji: "🥣",
      categoria: "Alimentação",
      nome: "Ração Premium Patas & Cia",
      descricao:
        "Ração super premium para cães adultos, rica em ômega 3 e 6 para pelagem brilhante. Pacote de 10,1 kg.",
      precoAntigo: "R$ 259,90",
      preco: "R$ 219,90",
      avaliacao: 5,
      nota: "4.9 (218 avaliações)",
      selo: "Mais vendido",
      seloClasse: "tag-green",
    },
    {
      emoji: "🧸",
      categoria: "Brinquedos",
      nome: "Mordedor Osso Resistente",
      descricao:
        "Brinquedo de borracha atóxica para cães de porte médio e grande. Alivia o estresse e cuida da saúde bucal.",
      precoAntigo: "R$ 79,90",
      preco: "R$ 59,90",
      avaliacao: 4,
      nota: "4.7 (96 avaliações)",
      selo: "Durabilidade",
      seloClasse: "",
    },
    {
      emoji: "🛏️",
      categoria: "Conforto",
      nome: "Caminha Nuvem Lavável",
      descricao:
        "Caminha ortopédica com espuma de alta densidade, capa removível e antialérgica. Tamanho M (70 × 55 cm).",
      precoAntigo: "R$ 189,00",
      preco: "R$ 149,00",
      avaliacao: 5,
      nota: "4.8 (143 avaliações)",
      selo: "Frete grátis",
      seloClasse: "tag-amber",
    },
  ];

  /* ----------------------------------------------------------------------
     2. Utilidades
     ---------------------------------------------------------------------- */

  const $ = (seletor, contexto) => (contexto || document).querySelector(seletor);
  const $$ = (seletor, contexto) => Array.from((contexto || document).querySelectorAll(seletor));

  const estrelas = (nota) => "★".repeat(nota) + "☆".repeat(5 - nota);

  let toastTimer = null;

  /** Exibe uma mensagem flutuante temporária. */
  function mostrarToast(mensagem) {
    const toast = $("#toast");
    if (!toast) return;

    toast.textContent = mensagem;
    toast.classList.add("is-visible");

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  /* ----------------------------------------------------------------------
     3. Renderização de serviços e produtos
     ---------------------------------------------------------------------- */

  function renderizarServicos() {
    const grade = $("#servicesGrid");
    if (!grade) return;

    grade.innerHTML = SERVICOS.map(
      (servico) => `
        <article class="service-card reveal">
          <div class="service-icon" aria-hidden="true">${servico.icone}</div>
          <h3>${servico.titulo}</h3>
          <p>${servico.descricao}</p>
          <div class="service-meta">
            <span class="service-price">${servico.preco}</span>
            <span class="service-time">${servico.duracao}</span>
          </div>
        </article>`
    ).join("");
  }

  function renderizarProdutos() {
    const grade = $("#productsGrid");
    if (!grade) return;

    grade.innerHTML = PRODUTOS.map(
      (produto, indice) => `
        <article class="product-card reveal" data-indice="${indice}">
          <div class="product-media">
            <span class="product-tag ${produto.seloClasse}">${produto.selo}</span>
            <span aria-hidden="true">${produto.emoji}</span>
          </div>
          <div class="product-body">
            <span class="product-category">${produto.categoria}</span>
            <h3>${produto.nome}</h3>
            <p class="product-desc">${produto.descricao}</p>
            <p class="product-rating">
              <span class="stars" aria-hidden="true">${estrelas(produto.avaliacao)}</span>
              <span class="sr-only">Nota ${produto.avaliacao} de 5.</span>
              ${produto.nota}
            </p>
            <div class="product-footer">
              <div class="product-price">
                <span class="old">${produto.precoAntigo}</span>
                <span class="now">${produto.preco}</span>
              </div>
              <button class="btn btn-primary btn-sm" type="button" data-add-to-cart="${indice}">
                Adicionar
              </button>
            </div>
          </div>
        </article>`
    ).join("");
  }

  /* ----------------------------------------------------------------------
     4. Menu de navegação mobile
     ---------------------------------------------------------------------- */

  function iniciarMenu() {
    const botao = $("#navToggle");
    const menu = $("#menuPrincipal");
    if (!botao || !menu) return;

    const alternar = (abrir) => {
      menu.classList.toggle("is-open", abrir);
      botao.setAttribute("aria-expanded", String(abrir));
    };

    botao.addEventListener("click", () => {
      alternar(botao.getAttribute("aria-expanded") !== "true");
    });

    $$("a", menu).forEach((link) => link.addEventListener("click", () => alternar(false)));

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape") alternar(false);
    });

    document.addEventListener("click", (evento) => {
      if (!menu.classList.contains("is-open")) return;
      if (menu.contains(evento.target) || botao.contains(evento.target)) return;
      alternar(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 780) alternar(false);
    });
  }

  /* ----------------------------------------------------------------------
     5. Cabeçalho, seção ativa e animações de entrada
     ---------------------------------------------------------------------- */

  function iniciarScroll() {
    const cabecalho = $(".site-header");
    const links = $$(".nav-list a");
    const secoes = links
      .map((link) => $(link.getAttribute("href")))
      .filter(Boolean);

    const atualizarCabecalho = () => {
      if (cabecalho) cabecalho.classList.toggle("is-scrolled", window.scrollY > 12);

      const posicao = window.scrollY + 140;
      let ativa = null;
      secoes.forEach((secao) => {
        if (secao.offsetTop <= posicao) ativa = secao.id;
      });

      links.forEach((link) => {
        link.classList.toggle("is-active", ativa !== null && link.getAttribute("href") === `#${ativa}`);
      });
    };

    window.addEventListener("scroll", atualizarCabecalho, { passive: true });
    atualizarCabecalho();
  }

  function iniciarAnimacoes() {
    const alvos = $$(".reveal");
    const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefereMenosMovimento || !("IntersectionObserver" in window)) {
      alvos.forEach((alvo) => alvo.classList.add("is-visible"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((entrada, indice) => {
          if (!entrada.isIntersecting) return;
          window.setTimeout(() => entrada.target.classList.add("is-visible"), indice * 90);
          obs.unobserve(entrada.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    alvos.forEach((alvo) => observador.observe(alvo));
  }

  /* ----------------------------------------------------------------------
     6. Carrinho simples
     ---------------------------------------------------------------------- */

  const carrinho = { total: 0, valor: 0 };

  function atualizarCarrinho() {
    const contador = $("#cartCount");
    if (!contador) return;

    contador.textContent = String(carrinho.total);
    contador.classList.remove("is-bumped");
    // Força o navegador a reiniciar a animação:
    void contador.offsetWidth;
    contador.classList.add("is-bumped");
  }

  function iniciarCarrinho() {
    const grade = $("#productsGrid");
    const botaoCarrinho = $("#cartButton");
    if (!grade) return;

    grade.addEventListener("click", (evento) => {
      const botao = evento.target.closest("[data-add-to-cart]");
      if (!botao) return;

      const produto = PRODUTOS[Number(botao.dataset.addToCart)];
      if (!produto) return;

      carrinho.total += 1;
      carrinho.valor += Number(produto.preco.replace(/[^\d,]/g, "").replace(",", "."));
      atualizarCarrinho();
      mostrarToast(`🐾 ${produto.nome} adicionado ao carrinho!`);
    });

    if (botaoCarrinho) {
      botaoCarrinho.addEventListener("click", () => {
        if (carrinho.total === 0) {
          mostrarToast("Seu carrinho está vazio. Escolha um produto na loja!");
          return;
        }

        const total = carrinho.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        mostrarToast(
          `Carrinho: ${carrinho.total} ${carrinho.total === 1 ? "item" : "itens"} • ${total}`
        );
      });
    }
  }

  /* ----------------------------------------------------------------------
     7. Formulário de contato
     ---------------------------------------------------------------------- */

  const REGRAS = {
    name: (valor) => {
      if (!valor.trim()) return "Informe o seu nome.";
      if (valor.trim().length < 3) return "O nome precisa ter pelo menos 3 letras.";
      return "";
    },
    email: (valor) => {
      if (!valor.trim()) return "Informe o seu e-mail.";
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valor.trim())) return "Digite um e-mail válido.";
      return "";
    },
    phone: (valor) => {
      if (!valor.trim()) return "";
      if (valor.replace(/\D/g, "").length < 10) return "Informe DDD + número.";
      return "";
    },
    service: (valor) => (valor ? "" : "Escolha um serviço."),
    message: (valor) => {
      if (!valor.trim()) return "Escreva uma mensagem.";
      if (valor.trim().length < 10) return "Conte um pouco mais (mínimo 10 caracteres).";
      return "";
    },
  };

  function validarCampo(campo) {
    const regra = REGRAS[campo.name];
    if (!regra) return true;

    const mensagem = regra(campo.value);
    const wrapper = campo.closest(".field");
    const erro = $(`#error-${campo.name}`);

    if (wrapper) wrapper.classList.toggle("has-error", Boolean(mensagem));
    if (erro) erro.textContent = mensagem;
    campo.setAttribute("aria-invalid", mensagem ? "true" : "false");

    return !mensagem;
  }

  function iniciarFormulario() {
    const formulario = $("#contactForm");
    if (!formulario) return;

    const status = $("#formStatus");
    const campos = $$("input, select, textarea", formulario).filter((campo) => REGRAS[campo.name]);

    // Máscara simples de telefone: (11) 90000-0000
    const telefone = $("#phone");
    if (telefone) {
      telefone.addEventListener("input", () => {
        const digitos = telefone.value.replace(/\D/g, "").slice(0, 11);
        let formatado = digitos;
        if (digitos.length > 2) formatado = `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
        if (digitos.length > 7) {
          formatado = `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
        }
        telefone.value = formatado;
      });
    }

    campos.forEach((campo) => {
      campo.addEventListener("blur", () => validarCampo(campo));
      campo.addEventListener("input", () => {
        if (campo.closest(".field")?.classList.contains("has-error")) validarCampo(campo);
      });
    });

    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const resultados = campos.map(validarCampo);
      const valido = resultados.every(Boolean);

      if (!valido) {
        if (status) {
          status.textContent = "⚠️ Confira os campos destacados antes de enviar.";
          status.className = "form-status is-error";
        }
        const primeiroErro = $(".field.has-error input, .field.has-error select, .field.has-error textarea", formulario);
        if (primeiroErro) primeiroErro.focus();
        return;
      }

      const nome = $("#name").value.trim().split(" ")[0];
      const servico = $("#service").value;

      if (status) {
        status.textContent = `✅ Obrigado, ${nome}! Recebemos seu pedido de "${servico}". Vamos confirmar o horário por e-mail ou WhatsApp.`;
        status.className = "form-status is-success";
      }

      mostrarToast("Solicitação enviada com sucesso! 🐶");
      formulario.reset();
      campos.forEach((campo) => {
        campo.closest(".field")?.classList.remove("has-error");
        const erro = $(`#error-${campo.name}`);
        if (erro) erro.textContent = "";
      });
    });
  }

  /* ----------------------------------------------------------------------
     8. Ajustes finais
     ---------------------------------------------------------------------- */

  function iniciarRodape() {
    const ano = $("#anoAtual");
    if (ano) ano.textContent = String(new Date().getFullYear());
  }

  function iniciar() {
    renderizarServicos();
    renderizarProdutos();
    iniciarMenu();
    iniciarScroll();
    iniciarCarrinho();
    iniciarFormulario();
    iniciarRodape();
    iniciarAnimacoes();

    console.info("%c🐾 Patas & Companhia", "font-size:16px;font-weight:700;color:#f2762e");
    console.info("Site de demonstração carregado com sucesso. Empresa fictícia.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
