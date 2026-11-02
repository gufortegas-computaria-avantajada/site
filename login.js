// ============================================================
// WHISTLER — LOGIN 2.0
// SLIDESHOW + CONTROLES + LOGIN/CADASTRO
// ============================================================

const CONFIG = {
    pastaSlides: "Slides-Login/",
    tempoImagem: 9000,
    tempoTransicao: 2500
};

// ============================================================
// SLIDES
// ============================================================

const imagens = [
    ...Array.from({ length: 9 }, (_, i) => `oceano-${i + 1}.jpg`),
    ...Array.from({ length: 9 }, (_, i) => `floresta-${i + 1}.jpg`),
    ...Array.from({ length: 9 }, (_, i) => `paisagem-${i + 1}.jpg`)
].map(nome => CONFIG.pastaSlides + nome);

const slideA = document.getElementById("slideA");
const slideB = document.getElementById("slideB");

let indiceAtual = 0;
let imagemVisivel = "A";
let pausado = false;
let mudando = false;
let temporizador = null;

// ============================================================
// PRÉ-CARREGAMENTO
// ============================================================

const cacheImagens = new Map();

function carregarImagem(caminho) {
    if (cacheImagens.has(caminho)) {
        return cacheImagens.get(caminho);
    }

    const promessa = new Promise((resolve, reject) => {
        const imagem = new Image();

        imagem.onload = () => resolve(caminho);
        imagem.onerror = () => reject(caminho);

        imagem.src = caminho;
    });

    cacheImagens.set(caminho, promessa);
    return promessa;
}

async function prepararSlides() {
    const carregamento = imagens.map(caminho =>
        carregarImagem(caminho).catch(() => {
            console.warn("Não foi possível carregar:", caminho);
            return null;
        })
    );

    await Promise.all(carregamento);
}

// ============================================================
// TRANSIÇÃO ENTRE SLIDES
// ============================================================

async function trocarSlide(novoIndice) {
    if (mudando) return;

    mudando = true;

    novoIndice = (novoIndice + imagens.length) % imagens.length;

    const caminho = imagens[novoIndice];

    try {
        await carregarImagem(caminho);
    } catch {
        console.error("Imagem não encontrada:", caminho);
        mudando = false;
        return;
    }

    const imagemNova = imagemVisivel === "A" ? slideB : slideA;
    const imagemAntiga = imagemVisivel === "A" ? slideA : slideB;

    imagemNova.classList.remove("active");
    imagemNova.src = caminho;

    await new Promise(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });

    imagemNova.classList.add("active");
    imagemAntiga.classList.remove("active");

    imagemVisivel = imagemVisivel === "A" ? "B" : "A";
    indiceAtual = novoIndice;

    atualizarControles();

    await new Promise(resolve =>
        setTimeout(resolve, CONFIG.tempoTransicao)
    );

    mudando = false;
}

// ============================================================
// CONTROLES
// ============================================================

function proximoSlide() {
    trocarSlide(indiceAtual + 1);
}

function slideAnterior() {
    trocarSlide(indiceAtual - 1);
}

function atualizarControles() {
    const contador = document.getElementById("slideCounter");

    if (contador) {
        contador.textContent =
            `${String(indiceAtual + 1).padStart(2, "0")} / ${imagens.length}`;
    }
}

function alternarPausa() {
    pausado = !pausado;

    const botao = document.getElementById("pauseButton");

    if (botao) {
        botao.textContent = pausado ? "▶" : "Ⅱ";
        botao.setAttribute(
            "aria-label",
            pausado ? "Continuar apresentação" : "Pausar apresentação"
        );
    }
}

// ============================================================
// APRESENTAÇÃO AUTOMÁTICA
// ============================================================

function iniciarApresentacao() {
    if (temporizador) {
        clearInterval(temporizador);
    }

    temporizador = setInterval(() => {
        if (!pausado && !mudando) {
            proximoSlide();
        }
    }, CONFIG.tempoImagem);
}

// ============================================================
// LOGIN E CADASTRO
// ============================================================

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

function abrirCadastro(event) {
    if (event) event.preventDefault();

    if (loginForm) loginForm.hidden = true;
    if (registerForm) registerForm.hidden = false;
}

function abrirLogin(event) {
    if (event) event.preventDefault();

    if (registerForm) registerForm.hidden = true;
    if (loginForm) loginForm.hidden = false;
}

if (showRegister) {
    showRegister.addEventListener("click", abrirCadastro);
}

if (showLogin) {
    showLogin.addEventListener("click", abrirLogin);
}

// ============================================================
// MOSTRAR / ESCONDER SENHA
// ============================================================

document.querySelectorAll("[data-toggle-password]").forEach(botao => {
    botao.addEventListener("click", () => {
        const campo = document.getElementById(
            botao.dataset.togglePassword
        );

        if (!campo) return;

        const mostrando = campo.type === "text";

        campo.type = mostrando ? "password" : "text";
        botao.textContent = mostrando ? "◉" : "◎";
    });
});

// ============================================================
// ENVIO DOS FORMULÁRIOS — PROTÓTIPO
// ============================================================

if (loginForm) {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();

        alert(
            "O sistema de autenticação do Whistler ainda está em desenvolvimento."
        );
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", event => {
        event.preventDefault();

        alert(
            "O cadastro do Whistler ainda está em desenvolvimento."
        );
    });
}

// ============================================================
// EVENTOS DOS BOTÕES DOS SLIDES
// ============================================================

const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const pauseButton = document.getElementById("pauseButton");

if (nextButton) {
    nextButton.addEventListener("click", proximoSlide);
}

if (previousButton) {
    previousButton.addEventListener("click", slideAnterior);
}

if (pauseButton) {
    pauseButton.addEventListener("click", alternarPausa);
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

async function iniciarWhistler() {
    slideA.src = imagens[0];
    slideA.classList.add("active");

    slideB.classList.remove("active");

    atualizarControles();

    prepararSlides();
    iniciarApresentacao();
}

document.addEventListener("DOMContentLoaded", iniciarWhistler);