/* ==========================================================================
   JAVASCRIPT.JS - COMPORTAMENTOS DO SITE
   1) Cabeçalho e menu   2) Carrossel de eventos
   3) Filtro de cidades  4) Ano do rodapé
   5) Contatos (dados.json)   6) Detalhes das cidades (cidades.json)
   7) Painel administrativo
   ========================================================================== */

/* ===== CONFIGURAÇÃO ===== */
// Arquivos (na raiz do repositório) onde o painel salva o conteúdo editável.
const ARQUIVO_DADOS = "dados.json"; // contatos do rodapé
const ARQUIVO_CIDADES = "cidades.json"; // conteúdo das 12 cidades
// Opcional: preencha "usuario/repositorio" para o painel já vir preenchido.
const REPOSITORIO_PADRAO = "";

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

    // Índice de busca: nome/slogan do card + texto da seção de detalhes da cidade.
    // Montado no primeiro uso, para já incluir textos vindos de dados.json.
    let itens = null;

    function montarIndice() {
        itens = Array.from(lista.querySelectorAll(".card-imagem-caixa")).map(function (card) {
            const detalhe = document.getElementById(card.id.replace("card-", "detalhe-"));
            const grade = detalhe ? detalhe.querySelector(".cidade__grade") : null;
            const titulo = detalhe ? detalhe.querySelector(".mapa-titulo") : null;
            const texto = [card.textContent, titulo && titulo.textContent, grade && grade.textContent].join(" ");
            return { card: card, indice: normalizar(texto) };
        });
    }

    document.addEventListener("cidades:prontas", function () {
        itens = null;
    });

    campo.addEventListener("input", function () {
        if (!itens) montarIndice();
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

/* ===== 5) CONTEÚDO EDITÁVEL: CONTATOS (dados.json) =====
   Aplica em todas as páginas o telefone, e-mail e redes sociais salvos pelo
   painel. Sem o arquivo (ou abrindo a página direto do disco), vale o HTML. */
(function () {
    "use strict";

    function somenteUsuario(valor) {
        return String(valor || "").replace(/[^\w.\-]/g, "");
    }

    function definirTexto(id, texto) {
        const alvo = document.getElementById(id);
        if (alvo && texto) alvo.textContent = texto;
        return alvo;
    }

    function aplicarContato(contato) {
        definirTexto("display-telefone", contato.telefone);

        const email = definirTexto("display-email", contato.email);
        if (email && contato.email) email.href = "mailto:" + contato.email;

        const redes = [
            ["link-instagram", "https://www.instagram.com/", contato.instagram],
            ["link-facebook", "https://www.facebook.com/", contato.facebook],
        ];
        redes.forEach(function (rede) {
            const alvo = document.getElementById(rede[0]);
            const usuario = somenteUsuario(rede[2]);
            if (alvo && usuario) alvo.href = rede[1] + usuario + "/";
        });
    }

    fetch(ARQUIVO_DADOS, { cache: "no-cache" })
        .then(function (resposta) {
            return resposta.ok ? resposta.json() : null;
        })
        .then(function (dados) {
            if (dados) aplicarContato(dados.contato || {});
        })
        .catch(function () {
            /* sem dados.json: mantém o conteúdo original */
        });
})();

/* ===== 6) DETALHES DAS CIDADES (cidades.html) =====
   Todo o conteúdo das cidades vem de cidades.json, com a mesma estrutura para
   as 12: nome, slogan, descrição, dados rápidos, destaques (com descrição e
   detalhes opcionais), informações, contato e mapa. */
(function () {
    "use strict";

    const area = document.getElementById("mapas");
    if (!area) return;

    const REGEX_EMAIL = /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/;
    const REGEX_SITE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;

    function el(tag, classe, texto) {
        const e = document.createElement(tag);
        if (classe) e.className = classe;
        if (texto) e.textContent = texto;
        return e;
    }

    function paragrafos(texto) {
        return String(texto || "").split(/\n{2,}/).map(function (p) {
            return p.trim();
        }).filter(Boolean);
    }

    // E-mails e endereços de site viram links; o restante continua texto.
    function valorComLink(valor) {
        const texto = String(valor || "").trim();
        if (REGEX_EMAIL.test(texto)) {
            const a = el("a", "", texto);
            a.href = "mailto:" + texto;
            return a;
        }
        if (REGEX_SITE.test(texto)) {
            const a = el("a", "", texto);
            a.href = /^https?:/i.test(texto) ? texto : "https://" + texto;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            return a;
        }
        return document.createTextNode(texto);
    }

    // Linhas "Rótulo: valor" separadas por quebra de linha
    function linhasRotuloValor(classe, itens) {
        const p = el("p", classe);
        itens.forEach(function (item, i) {
            if (i) p.appendChild(document.createElement("br"));
            if (item.rotulo) {
                p.appendChild(el("strong", "", item.rotulo + ":"));
                p.appendChild(document.createTextNode(" "));
            }
            p.appendChild(valorComLink(item.valor));
        });
        return p;
    }

    function bloco(classe, titulo) {
        const b = el("div", "vidro " + classe);
        b.appendChild(el("div", "info-subtitulo", titulo));
        return b;
    }

    function blocoSobre(c) {
        const b = bloco("cidade__sobre", c.slogan || c.nome);
        const desc = el("div", "info-descricao");
        paragrafos(c.descricao).forEach(function (texto) {
            desc.appendChild(el("p", "", texto));
        });
        b.appendChild(desc);
        return b;
    }

    function blocoDados(itens) {
        const b = el("div", "vidro cidade__dados");
        const dl = el("dl", "info-dados");
        itens.forEach(function (item) {
            const linha = el("div", "info-dado");
            linha.appendChild(el("dt", "info-dado-titulo", item.rotulo));
            linha.appendChild(el("dd", "info-dado-valor", item.valor));
            dl.appendChild(linha);
        });
        b.appendChild(dl);
        return b;
    }

    function itemDestaque(d) {
        const li = el("li");
        const textos = paragrafos(d.descricao);
        const detalhes = d.detalhes || [];
        if (!textos.length && !detalhes.length) {
            li.textContent = d.nome;
            return li;
        }
        const det = el("details", "atrativo");
        det.appendChild(el("summary", "atrativo__nome", d.nome));
        const corpo = el("div", "atrativo__corpo");
        textos.forEach(function (texto) {
            corpo.appendChild(el("p", "", texto));
        });
        if (detalhes.length) corpo.appendChild(linhasRotuloValor("atrativo__detalhes", detalhes));
        det.appendChild(corpo);
        li.appendChild(det);
        return li;
    }

    function blocoDestaques(itens) {
        const b = bloco("cidade__atracoes", "Destaques e Visitas");
        const ul = el("ul", "info-lista");
        itens.forEach(function (d) {
            ul.appendChild(itemDestaque(d));
        });
        b.appendChild(ul);
        return b;
    }

    function blocoInformacoes(c) {
        const b = bloco("cidade__acesso", "Informações");
        const desc = el("div", "info-descricao");
        paragrafos(c.informacoes).forEach(function (texto) {
            desc.appendChild(el("p", "", texto));
        });
        if (c.contato && c.contato.length) desc.appendChild(linhasRotuloValor("info-contato", c.contato));
        b.appendChild(desc);
        return b;
    }

    function blocoMapa(local) {
        const b = bloco("cidade__mapa", "Localização no Mapa");
        const iframe = el("iframe");
        iframe.src = "https://www.google.com/maps?q=" + encodeURIComponent(local) + "&output=embed";
        iframe.loading = "lazy";
        iframe.title = "Mapa: " + local;
        iframe.setAttribute("allowfullscreen", "");
        b.appendChild(iframe);
        return b;
    }

    function montarCidade(alvo, c) {
        alvo.textContent = "";
        alvo.appendChild(el("h2", "mapa-titulo", c.nome));

        const grade = el("div", "cidade__grade");
        grade.appendChild(blocoSobre(c));
        if (c.dados && c.dados.length) grade.appendChild(blocoDados(c.dados));
        if (c.destaques && c.destaques.length) grade.appendChild(blocoDestaques(c.destaques));
        if (paragrafos(c.informacoes).length || (c.contato && c.contato.length)) grade.appendChild(blocoInformacoes(c));
        alvo.appendChild(grade);

        if (c.mapa) alvo.appendChild(blocoMapa(c.mapa));

        const voltar = el("a", "card-botao cidade__voltar", "← Voltar às cidades");
        voltar.href = "#cidades";
        alvo.appendChild(voltar);
    }

    fetch(ARQUIVO_CIDADES, { cache: "no-cache" })
        .then(function (resposta) {
            if (!resposta.ok) throw new Error("HTTP " + resposta.status);
            return resposta.json();
        })
        .then(function (dados) {
            Object.keys(dados.cidades || {}).forEach(function (slug) {
                const alvo = document.getElementById("detalhe-" + slug);
                if (alvo) montarCidade(alvo, dados.cidades[slug]);
            });
            document.dispatchEvent(new CustomEvent("cidades:prontas"));
            // quem chegou por um link direto (#detalhe-...) já estava posicionado antes do conteúdo existir
            const destino = location.hash ? document.getElementById(location.hash.slice(1)) : null;
            if (destino && area.contains(destino)) destino.scrollIntoView();
        })
        .catch(function () {
            const aviso = el("p", "filtro__vazio", "Não foi possível carregar os detalhes das cidades. Tente novamente em instantes.");
            area.appendChild(aviso);
        });
})();

/* ===== 7) PAINEL ADMINISTRATIVO (admin.html) =====
   Não há servidor nem banco de dados: o painel grava dados.json (contatos) e
   cidades.json (conteúdo das cidades) direto no repositório do GitHub, pela API
   do GitHub e com um token de acesso. Cada salvamento vira um commit e o GitHub
   Pages republica o site. */
(function () {
    "use strict";

    const formLogin = document.getElementById("form-login");
    const formEdicao = document.getElementById("form-edicao");
    if (!formLogin || !formEdicao) return;

    const API = "https://api.github.com";
    const campo = function (id) {
        return document.getElementById(id);
    };

    // Tudo fica só em memória (nada em localStorage/cookies); recarregar a página descarta o token.
    // arquivos.<nome>: { sha, dados (objeto de trabalho), original (JSON salvo por último) }
    const estado = vazio();

    function vazio() {
        return {
            repo: "",
            token: "",
            branch: "",
            cidadeAtual: "",
            arquivos: { contato: null, cidades: null },
        };
    }

    /* ---------- utilidades ---------- */
    function paraBase64(texto) {
        let binario = "";
        new TextEncoder().encode(texto).forEach(function (b) {
            binario += String.fromCharCode(b);
        });
        return btoa(binario);
    }

    function deBase64(base64) {
        const binario = atob(base64.replace(/\s/g, ""));
        return new TextDecoder().decode(Uint8Array.from(binario, function (c) {
            return c.charCodeAt(0);
        }));
    }

    function serializar(objeto) {
        return JSON.stringify(objeto, null, 2) + "\n";
    }

    function github(caminho, opcoes) {
        const config = opcoes || {};
        const cabecalhos = {
            Accept: "application/vnd.github+json",
            Authorization: "Bearer " + estado.token,
            "X-GitHub-Api-Version": "2022-11-28",
        };
        if (config.body) cabecalhos["Content-Type"] = "application/json";
        return fetch(API + caminho, { method: config.method || "GET", headers: cabecalhos, body: config.body });
    }

    function mostrarMensagem(id, texto) {
        ["login-erro", "edit-sucesso", "edit-erro"].forEach(function (outro) {
            campo(outro).textContent = outro === id ? texto : "";
        });
    }

    function alternarTelas(logado) {
        campo("box-login").classList.toggle("oculto", logado);
        campo("box-painel").classList.toggle("oculto", !logado);
    }

    function el(tag, classe, texto) {
        const e = document.createElement(tag);
        if (classe) e.className = classe;
        if (texto) e.textContent = texto;
        return e;
    }

    /* ---------- construtores de campos repetíveis ---------- */
    function campoTexto(classe, valor, placeholder) {
        const input = el("input", classe);
        input.type = "text";
        input.value = valor || "";
        input.placeholder = placeholder || "";
        input.setAttribute("aria-label", placeholder || "");
        input.autocomplete = "off";
        return input;
    }

    function botao(texto, classe, aoClicar) {
        const b = el("button", "btn-salvar btn-mini " + classe, texto);
        b.type = "button";
        b.addEventListener("click", aoClicar);
        return b;
    }

    function adicionarLinha(lista, par, rotuloPh, valorPh) {
        const linha = el("div", "admin-linha");
        linha.append(
            campoTexto("admin-linha__rotulo", par.rotulo, rotuloPh),
            campoTexto("admin-linha__valor", par.valor, valorPh),
            botao("Remover", "btn-salvar--neutro", function () {
                linha.remove();
            })
        );
        lista.appendChild(linha);
    }

    function lerLinhas(lista) {
        return Array.from(lista.querySelectorAll(":scope > .admin-linha")).map(function (linha) {
            const campos = linha.querySelectorAll("input");
            return { rotulo: campos[0].value.trim(), valor: campos[1].value.trim() };
        }).filter(function (par) {
            return par.valor;
        });
    }

    function adicionarDestaque(destaque) {
        const item = el("div", "admin-destaque");
        const nome = campoTexto("admin-destaque__nome", destaque.nome, "Nome do atrativo");
        const descricao = el("textarea", "admin-destaque__descricao");
        descricao.value = destaque.descricao || "";
        descricao.placeholder = "Descrição (opcional; separe parágrafos com uma linha em branco)";
        descricao.setAttribute("aria-label", "Descrição do atrativo");

        const detalhes = el("div", "admin-destaque__detalhes");
        (destaque.detalhes || []).forEach(function (par) {
            adicionarLinha(detalhes, par, "Rótulo (ex.: Telefone)", "Valor");
        });

        const acoes = el("div", "admin-acoes");
        acoes.append(
            botao("+ Detalhe (endereço, telefone, horário…)", "btn-salvar--neutro", function () {
                adicionarLinha(detalhes, {}, "Rótulo (ex.: Telefone)", "Valor");
            }),
            botao("Remover atrativo", "btn-salvar--neutro", function () {
                item.remove();
            })
        );
        item.append(nome, descricao, detalhes, acoes);
        campo("lista-destaques").appendChild(item);
    }

    function lerDestaques() {
        return Array.from(campo("lista-destaques").querySelectorAll(":scope > .admin-destaque")).map(function (item) {
            const destaque = { nome: item.querySelector(".admin-destaque__nome").value.trim() };
            const descricao = item.querySelector(".admin-destaque__descricao").value.trim();
            const detalhes = lerLinhas(item.querySelector(".admin-destaque__detalhes"));
            if (descricao) destaque.descricao = descricao;
            if (detalhes.length) destaque.detalhes = detalhes;
            return destaque;
        }).filter(function (destaque) {
            return destaque.nome;
        });
    }

    /* ---------- formulário da cidade ---------- */
    function preencherCidade(slug) {
        const cidade = estado.arquivos.cidades.dados.cidades[slug] || {};
        estado.cidadeAtual = slug;

        campo("edit-cidade-nome").value = cidade.nome || "";
        campo("edit-cidade-slogan").value = cidade.slogan || "";
        campo("edit-cidade-desc").value = cidade.descricao || "";
        campo("edit-cidade-info").value = cidade.informacoes || "";
        campo("edit-cidade-mapa").value = cidade.mapa || "";

        ["lista-dados", "lista-destaques", "lista-contato"].forEach(function (id) {
            campo(id).textContent = "";
        });
        (cidade.dados || []).forEach(function (par) {
            adicionarLinha(campo("lista-dados"), par, "Rótulo (ex.: Praia)", "Valor (ex.: Pôr do Sol)");
        });
        (cidade.destaques || []).forEach(adicionarDestaque);
        (cidade.contato || []).forEach(function (par) {
            adicionarLinha(campo("lista-contato"), par, "Rótulo (ex.: Telefone)", "Valor");
        });
    }

    function lerCidade() {
        return {
            nome: campo("edit-cidade-nome").value.trim(),
            slogan: campo("edit-cidade-slogan").value.trim(),
            descricao: campo("edit-cidade-desc").value.trim(),
            dados: lerLinhas(campo("lista-dados")),
            destaques: lerDestaques(),
            informacoes: campo("edit-cidade-info").value.trim(),
            contato: lerLinhas(campo("lista-contato")),
            mapa: campo("edit-cidade-mapa").value.trim(),
        };
    }

    // Guarda no rascunho a cidade que está na tela
    function guardarCidadeAtual() {
        if (!estado.cidadeAtual) return;
        estado.arquivos.cidades.dados.cidades[estado.cidadeAtual] = lerCidade();
    }

    function lerContato() {
        const contato = {
            telefone: campo("edit-telefone").value.trim(),
            email: campo("edit-email").value.trim(),
            instagram: campo("edit-instagram").value.trim(),
            facebook: campo("edit-facebook").value.trim(),
        };
        Object.keys(contato).forEach(function (chave) {
            if (!contato[chave]) delete contato[chave];
        });
        return contato;
    }

    function preencherContato(contato) {
        campo("edit-telefone").value = contato.telefone || "";
        campo("edit-email").value = contato.email || "";
        campo("edit-instagram").value = contato.instagram || "";
        campo("edit-facebook").value = contato.facebook || "";
    }

    /* ---------- leitura e gravação no GitHub ---------- */
    async function lerArquivo(nome) {
        const resposta = await github(
            "/repos/" + estado.repo + "/contents/" + nome + "?ref=" + encodeURIComponent(estado.branch)
        );
        if (resposta.status === 404) return null;
        if (!resposta.ok) throw new Error("Não foi possível ler " + nome + " (erro " + resposta.status + ").");

        const arquivo = await resposta.json();
        try {
            return { sha: arquivo.sha, dados: JSON.parse(deBase64(arquivo.content)) };
        } catch (erro) {
            throw new Error(nome + " está com formato inválido no repositório.");
        }
    }

    async function gravarArquivo(nome, dados, sha) {
        const corpo = {
            message: "Atualiza " + nome + " pelo painel administrativo",
            content: paraBase64(serializar(dados)),
            branch: estado.branch,
        };
        if (sha) corpo.sha = sha;

        const resposta = await github("/repos/" + estado.repo + "/contents/" + nome, {
            method: "PUT",
            body: JSON.stringify(corpo),
        });
        if (resposta.status === 409 || resposta.status === 422) {
            throw new Error("O arquivo " + nome + " foi alterado por outra pessoa. Saia, entre novamente e refaça a edição.");
        }
        if (resposta.status === 401 || resposta.status === 403 || resposta.status === 404) {
            throw new Error("Sem permissão para gravar. Confira se o token tem acesso de escrita em \"Contents\".");
        }
        if (!resposta.ok) throw new Error("Falha ao salvar " + nome + " (erro " + resposta.status + ").");
        return (await resposta.json()).content.sha;
    }

    /* ---------- entrar ---------- */
    async function entrar(evento) {
        evento.preventDefault();
        mostrarMensagem("login-erro", "");

        const repo = campo("admin-repo").value.trim().replace(/^https?:\/\/github\.com\//, "").replace(/\.git$/, "").replace(/\/$/, "");
        const token = campo("admin-token").value.trim();
        if (!/^[\w.\-]+\/[\w.\-]+$/.test(repo)) {
            mostrarMensagem("login-erro", "Informe o repositório no formato usuario/repositorio.");
            return;
        }

        const botaoEntrar = formLogin.querySelector("button[type='submit']");
        botaoEntrar.disabled = true;
        estado.repo = repo;
        estado.token = token;

        try {
            const resposta = await github("/repos/" + repo);
            if (resposta.status === 401) throw new Error("Token inválido ou expirado.");
            if (resposta.status === 404) throw new Error("Repositório não encontrado, ou o token não tem acesso a ele.");
            if (!resposta.ok) throw new Error("Não foi possível acessar o GitHub (erro " + resposta.status + ").");

            const info = await resposta.json();
            if (info.permissions && info.permissions.push === false) {
                throw new Error("Este token não tem permissão de escrita no repositório.");
            }
            estado.branch = info.default_branch;

            const contato = await lerArquivo(ARQUIVO_DADOS);
            const cidades = await lerArquivo(ARQUIVO_CIDADES);
            if (!cidades) throw new Error(ARQUIVO_CIDADES + " não foi encontrado no repositório. Envie esse arquivo junto com o site.");

            const dadosContato = { contato: (contato && contato.dados.contato) || {} };
            estado.arquivos.contato = { sha: contato ? contato.sha : null, dados: dadosContato, original: serializar(dadosContato) };
            const dadosCidades = { cidades: cidades.dados.cidades || {} };
            estado.arquivos.cidades = { sha: cidades.sha, dados: dadosCidades, original: serializar(dadosCidades) };

            campo("admin-token").value = "";
            preencherContato(dadosContato.contato);
            preencherCidade(campo("select-cidade").value);
            alternarTelas(true);
        } catch (erro) {
            Object.assign(estado, vazio());
            mostrarMensagem("login-erro", erro.message || "Falha ao entrar.");
        } finally {
            botaoEntrar.disabled = false;
        }
    }

    /* ---------- salvar ---------- */
    async function salvar(evento) {
        evento.preventDefault();
        mostrarMensagem("edit-sucesso", "");

        guardarCidadeAtual();
        estado.arquivos.contato.dados.contato = lerContato();

        const nomes = { contato: ARQUIVO_DADOS, cidades: ARQUIVO_CIDADES };
        const pendentes = Object.keys(nomes).filter(function (chave) {
            return serializar(estado.arquivos[chave].dados) !== estado.arquivos[chave].original;
        });
        if (!pendentes.length) {
            mostrarMensagem("edit-sucesso", "Nenhuma alteração para salvar.");
            return;
        }

        const botaoSalvar = formEdicao.querySelector("button[type='submit']");
        botaoSalvar.disabled = true;
        try {
            for (const chave of pendentes) {
                const arquivo = estado.arquivos[chave];
                arquivo.sha = await gravarArquivo(nomes[chave], arquivo.dados, arquivo.sha);
                arquivo.original = serializar(arquivo.dados);
            }
            mostrarMensagem("edit-sucesso", "Alterações salvas! O site é atualizado em cerca de 1 minuto.");
        } catch (erro) {
            mostrarMensagem("edit-erro", erro.message || "Falha ao salvar.");
        } finally {
            botaoSalvar.disabled = false;
        }
    }

    function sair() {
        Object.assign(estado, vazio());
        formEdicao.reset();
        formLogin.reset();
        campo("admin-repo").value = REPOSITORIO_PADRAO;
        mostrarMensagem("login-erro", "");
        alternarTelas(false);
    }

    /* ---------- eventos ---------- */
    campo("admin-repo").value = REPOSITORIO_PADRAO;
    formLogin.addEventListener("submit", entrar);
    formEdicao.addEventListener("submit", salvar);
    campo("btn-logout").addEventListener("click", sair);
    campo("select-cidade").addEventListener("change", function (evento) {
        guardarCidadeAtual();
        preencherCidade(evento.target.value);
    });
    campo("btn-add-dado").addEventListener("click", function () {
        adicionarLinha(campo("lista-dados"), {}, "Rótulo (ex.: Praia)", "Valor (ex.: Pôr do Sol)");
    });
    campo("btn-add-destaque").addEventListener("click", function () {
        adicionarDestaque({});
    });
    campo("btn-add-contato").addEventListener("click", function () {
        adicionarLinha(campo("lista-contato"), {}, "Rótulo (ex.: Telefone)", "Valor");
    });
})();
