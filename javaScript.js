/* ==========================================================================
   JAVASCRIPT.JS - COMPORTAMENTOS DO SITE
   1) Cabeçalho e menu   2) Carrossel de eventos
   3) Filtro de cidades  4) Ano do rodapé
   ========================================================================== */

/* ===== 1) CABEÇALHO E MENU ===== */
(function () {
    "use strict";

    const header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
        header.classList.toggle("is-scrolled", window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = header.querySelector(".menu-toggle");
    const nav = document.getElementById("menu-principal");

    if (toggle && nav) {
        const icon = toggle.querySelector(".menu-toggle__icon");

        function setOpen(open) {
            nav.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", String(open));
            if (icon) icon.textContent = open ? "close" : "menu";
        }

        toggle.addEventListener("click", () => {
            setOpen(toggle.getAttribute("aria-expanded") !== "true");
        });

        nav.addEventListener("click", (event) => {
            if (event.target.closest("a")) setOpen(false);
        });
    }
})();

/* ===== 2) CARROSSEL DE EVENTOS ===== */
(function () {
    "use strict";

    const EVENTOS = [
        {
            categoria: "Pesca esportiva",
            imagem: "img/evento-tucunasud.jpg",
            alt: "Arte de divulgação do 3º Torneio de Pesca TucunaSud 2026, em Sud Mennucci",
            titulo: "3º TucunaSud 2026",
            data: "21 de novembro • largada às 7h30",
            local: "Sud Mennucci – SP",
            descricao:
                "Torneio de pesca ao tucunaré nos Quiosques Recanto das Águas, com competição feminina, troféus, prêmios em dinheiro e sorteios. Inscrição: R$ 350 até 20/11.",
            link: "https://www.instagram.com/visitesudmennucci/p/DfZi_dhpbbb/",
            textoLink: "Ver no Instagram",
        },
        {
            categoria: "Piracema",
            imagem: "img/evento-piracema.jpg",
            alt: "Arte da campanha Período de Piracema, de 1º de novembro a 28 de fevereiro",
            titulo: "Período de Piracema",
            data: "1º de novembro a 28 de fevereiro",
            local: "Toda a Região Pantanal Paulista",
            descricao:
                "Fase de reprodução dos peixes: a pesca fica sujeita às restrições da lei ambiental. Turistas e pescadores devem respeitar as regras e preservar os rios.",
            link: "https://www.instagram.com/rtpantanal/p/DfIV8imhkKg/",
            textoLink: "Ver no Instagram",
        },
        {
            categoria: "Feira",
            imagem: "img/evento-feira-valparaiso.jpg",
            alt: 'Arte da Feira Itinerante Benedito da Silva "Dito Pipoqueiro", em Valparaíso',
            titulo: "Feira Itinerante Dito Pipoqueiro",
            data: "Domingo, 18 de outubro • 7h às 13h",
            local: "Praça Oscar de Arruda – Valparaíso",
            descricao:
                "Hortifrúti, alimentação, artesanato e produtos diversos, levando os feirantes para mais perto da população.",
            link: "https://www.instagram.com/cultura_esporte_vp/p/Dej3A-2jj_7/",
            textoLink: "Ver no Instagram",
        },
        {
            categoria: "Turismo",
            imagem: "img/evento-camara-tecnica.jpg",
            alt: "Representantes dos municípios na reunião da Câmara Técnica de Turismo",
            titulo: "Câmara Técnica de Turismo",
            data: "7 de outubro",
            local: "Região Turística Pantanal Paulista",
            descricao:
                "Representantes dos municípios discutiram a participação em feiras e eventos, o site oficial da região e o Plano Regional de Turismo.",
            link: "https://www.instagram.com/rtpantanal/p/DeNKpFwvY9O/",
            textoLink: "Ver no Instagram",
        },
        {
            categoria: "Concurso",
            imagem: "img/evento-miss-mister.jpg",
            alt: "Arte do Miss & Mister Turismo Sud Mennucci 2026",
            titulo: "Miss & Mister Turismo 2026",
            data: "Inscrições de 6 a 14 de outubro",
            local: "Sud Mennucci – SP",
            descricao:
                "Concurso para jovens de 16 a 26 anos de Sud Mennucci ou Bandeirantes D’Oeste, que celebra a beleza e o turismo da cidade.",
            link: "https://www.instagram.com/visitesudmennucci/p/DeK99U-J8yt/",
            textoLink: "Ver no Instagram",
        },
    ];

    const secao = document.getElementById("eventos");
    const trilho = document.getElementById("eventos-trilho");
    const botao = document.getElementById("eventos-pausa");
    if (!secao || !trilho || !botao) return;

    const janela = trilho.parentElement;
    const VELOCIDADE = 50;

    function imagemGenerica(indice) {
        const cores = [
            ["#163808", "#8fc79a"],
            ["#2f7d6d", "#a8dccf"],
            ["#3b7a2a", "#cfe3a0"],
        ];
        const par = cores[indice % cores.length];
        const svg =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">' +
            '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' +
            par[1] +
            '"/>' +
            '<stop offset="1" stop-color="' +
            par[0] +
            '"/></linearGradient></defs>' +
            '<rect width="400" height="600" fill="url(#g)"/>' +
            '<path d="M0 430 Q100 380 200 430 T400 430 V600 H0Z" fill="#fff" opacity=".25"/>' +
            '<path d="M0 480 Q100 430 200 480 T400 480 V600 H0Z" fill="#fff" opacity=".25"/></svg>';
        return "data:image/svg+xml," + encodeURIComponent(svg);
    }

    function el(tag, classe, texto) {
        const e = document.createElement(tag);
        if (classe) e.className = classe;
        if (texto) e.textContent = texto;
        return e;
    }

    function criarCard(ev, i) {
        const li = el("li", "eventos__item");
        const fig = el("figure", "evento");
        const midia = el("div", "evento__midia");

        const gatilho = el("button", "evento__gatilho");
        gatilho.type = "button";
        gatilho.setAttribute("aria-expanded", "false");
        gatilho.setAttribute("aria-label", ev.categoria + ": " + ev.titulo + ". Ver detalhes");

        const img = el("img", "evento__imagem");
        img.src = ev.imagem || imagemGenerica(i);
        img.alt = ev.alt || "";
        img.loading = "lazy";
        gatilho.appendChild(img);

        const info = el("div", "evento__info");
        info.appendChild(el("h3", "evento__subtitulo", ev.titulo));

        const meta = el("p", "evento__meta");
        meta.appendChild(document.createTextNode(ev.data));
        meta.appendChild(document.createElement("br"));
        meta.appendChild(document.createTextNode(ev.local));
        info.appendChild(meta);

        info.appendChild(el("p", "evento__descricao", ev.descricao));

        const saiba = el("a", "evento__saiba", ev.textoLink || "Saiba mais");
        saiba.href = ev.link || "#";
        if (/^https?:/.test(saiba.href) && saiba.origin !== location.origin) {
            saiba.target = "_blank";
            saiba.rel = "noopener noreferrer";
        }
        info.appendChild(saiba);

        midia.append(gatilho, info);
        fig.append(midia, el("figcaption", "evento__nome", ev.categoria));
        li.appendChild(fig);
        return li;
    }

    EVENTOS.forEach(function (ev, i) {
        trilho.appendChild(criarCard(ev, i));
    });
    const originais = Array.from(trilho.children);

    function copiar(lista) {
        lista.forEach(function (li) {
            const clone = li.cloneNode(true);
            clone.dataset.clone = "true";
            clone.setAttribute("aria-hidden", "true");
            clone.querySelectorAll("a, button").forEach(function (x) {
                x.tabIndex = -1;
            });
            trilho.appendChild(clone);
        });
    }

    function fechar() {
        trilho.querySelectorAll(".evento--aberto").forEach(function (c) {
            c.classList.remove("evento--aberto");
        });
        trilho.querySelectorAll(".evento__gatilho").forEach(function (b) {
            b.setAttribute("aria-expanded", "false");
        });
    }

    function alternar(card) {
        const abrir = !card.classList.contains("evento--aberto");
        fechar();
        if (abrir) {
            card.classList.add("evento--aberto");
            card.querySelector(".evento__gatilho").setAttribute("aria-expanded", "true");
        }
    }

    trilho.addEventListener("click", function (e) {
        const gatilho = e.target.closest(".evento__gatilho");
        if (gatilho) return alternar(gatilho.closest(".evento"));
        if (e.target.closest(".evento__info") && !e.target.closest("a")) fechar();
    });

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".evento")) fechar();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") fechar();
    });

    function montar() {
        fechar();
        trilho.querySelectorAll("[data-clone]").forEach(function (c) {
            c.remove();
        });
        const larguraOriginais = originais.reduce(function (soma, li) {
            return soma + li.offsetWidth;
        }, 0);
        if (!larguraOriginais) return;
        const repeticoes = Math.max(1, Math.ceil(janela.offsetWidth / larguraOriginais));
        for (let i = 1; i < repeticoes; i++) copiar(originais);
        const bloco = Array.from(trilho.children);
        const distancia = bloco.reduce(function (soma, li) {
            return soma + li.offsetWidth;
        }, 0);
        copiar(bloco);
        trilho.style.setProperty("--ev-distancia", distancia + "px");
        trilho.style.setProperty("--ev-duracao", distancia / VELOCIDADE + "s");
    }

    botao.addEventListener("click", function () {
        const pausado = secao.classList.toggle("eventos--pausado");
        botao.setAttribute("aria-pressed", pausado);
        botao.textContent = pausado ? "Retomar carrossel" : "Pausar carrossel";
    });

    let espera;
    let larguraAnterior = window.innerWidth;
    window.addEventListener("resize", function () {
        if (window.innerWidth === larguraAnterior) return;
        larguraAnterior = window.innerWidth;
        clearTimeout(espera);
        espera = setTimeout(montar, 200);
    });
    montar();
})();

/* ===== 3) FILTRO DE CIDADES (cidades.html) ===== */
(function () {
    "use strict";

    const campo = document.getElementById("input-filtro-cidades");
    const lista = document.getElementById("grid-cidades");
    const aviso = document.getElementById("filtro-vazio");
    if (!campo || !lista) return;

    function normalizar(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    // Índice de busca: nome/slogan do card + texto da seção de detalhes da cidade
    const itens = Array.from(lista.querySelectorAll(".card-imagem-caixa")).map(function (card) {
        const detalhe = document.getElementById(card.id.replace("card-", "detalhe-"));
        const grade = detalhe ? detalhe.querySelector(".cidade__grade") : null;
        const titulo = detalhe ? detalhe.querySelector(".mapa-titulo") : null;
        const texto = [card.textContent, titulo && titulo.textContent, grade && grade.textContent].join(" ");
        return { card: card, indice: normalizar(texto) };
    });

    campo.addEventListener("input", function () {
        const termo = normalizar(campo.value);
        let visiveis = 0;
        itens.forEach(function (item) {
            const mostrar = !termo || item.indice.indexOf(termo) !== -1;
            item.card.hidden = !mostrar;
            if (mostrar) visiveis++;
        });
        if (aviso) aviso.hidden = visiveis > 0;
    });
})();

/* ===== 4) ANO DO RODAPÉ ===== */
(function () {
    "use strict";

    const ano = document.getElementById("rodape-ano");
    if (ano) ano.textContent = new Date().getFullYear();
})();