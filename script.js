document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("inputTexto");
    const botao = document.getElementById("enviar");
    const chat = document.getElementById("chat");
    const voltar = document.getElementById("voltarForum");

    const API_URL = "http://localhost:5044/ia";
    const CODIGO_SECRETO = "777*777*777";

    const forum = localStorage.getItem("forumSelecionado") || "geral";

    const titulo = document.querySelector(".container1 h2");
    const logo = document.querySelector(".logo");
    const inputArea = document.querySelector(".input-area");

    const foruns = {
        geral: { nome: "Geral", imagem: "images.jpg" },
        tecnologia: { nome: "Tecnologia", imagem: "images4.jpg" },
        teorias: { nome: "Teorias", imagem: "images2.png" },
        secreto: { nome: "???", imagem: "images3.jpg" },
        ultra: { nome: "ULTRA", imagem: "images3.jpg" }
    };

    if (foruns[forum]) {
        titulo.innerText = "Vienna - " + foruns[forum].nome;
        if (logo) logo.src = foruns[forum].imagem;
    }

    const ambience = new Audio("aquatic ambience.mp3");
    ambience.loop = true;

    function enterCutscene() {
        document.body.style.overflow = "hidden";
        if (inputArea) inputArea.style.display = "none";
        if (chat) chat.style.paddingBottom = "0px";
    }

    function enterUI() {
        document.body.style.overflow = "auto";
        if (inputArea) inputArea.style.display = "block";
        if (chat) chat.style.paddingBottom = "200px";
    }

    /* -----------------------------------------------------------
       🔘 BOTÃO + CAIXA (GLOBAL)
    ----------------------------------------------------------- */
    let btnCreditos = document.createElement("button");
    btnCreditos.innerText = "Créditos";
    btnCreditos.style.position = "fixed";
    btnCreditos.style.top = "20px";
    btnCreditos.style.left = "20px";
    btnCreditos.style.padding = "10px 15px";
    btnCreditos.style.borderRadius = "10px";
    btnCreditos.style.border = "none";
    btnCreditos.style.background = "#111";
    btnCreditos.style.color = "#00ffcc";
    btnCreditos.style.cursor = "pointer";
    btnCreditos.style.zIndex = "99999";

    let caixa = document.createElement("div");
    caixa.style.position = "fixed";
    caixa.style.top = "50%";
    caixa.style.left = "50%";
    caixa.style.transform = "translate(-50%, -50%)";
    caixa.style.background = "black";
    caixa.style.color = "#00ffcc";
    caixa.style.padding = "25px";
    caixa.style.borderRadius = "15px";
    caixa.style.boxShadow = "0 0 20px #00ffcc";
    caixa.style.display = "none";
    caixa.style.zIndex = "100000";
    caixa.style.textAlign = "center";

    caixa.innerHTML = `
        <h2>Créditos</h2>
        <p>Projeto: Whistler</p>
        <p>Interface: Gustavo F</p>
        <p>Sistema:Gustavo F</p>
        <p>Modo secreto:Gustavo F</p>
        <p>Estilo:😎<p>
        <br>
        <button id="fecharCreditos">Fechar</button>
    `;

    if (forum === "secreto" || forum === "ultra") {
        document.body.appendChild(btnCreditos);
        document.body.appendChild(caixa);
    }

    btnCreditos.onclick = () => {
        caixa.style.display = "block";
    };

    document.addEventListener("click", (e) => {
        if (e.target.id === "fecharCreditos") {
            caixa.style.display = "none";
        }
    });

    /* -----------------------------------------------------------
       🔥 MODO SECRETO
    ----------------------------------------------------------- */
    if (forum === "secreto") {
        enterCutscene();
        document.body.style.background = "black";

        const tela = document.createElement("div");
        tela.innerText = "ACESSO CONCEDIDO";
        tela.style.position = "fixed";
        tela.style.top = "50%";
        tela.style.left = "50%";
        tela.style.transform = "translate(-50%, -50%)";
        tela.style.color = "white";
        tela.style.fontSize = "28px";
        tela.style.zIndex = "9998";
        document.body.appendChild(tela);

        setTimeout(() => {
            tela.remove();

            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100vw";
            overlay.style.height = "100vh";
            overlay.style.background = "black";
            overlay.style.zIndex = "9999";

            const video = document.createElement("video");
            video.src = "rickroll.mp4";
            video.autoplay = true;
            video.style.width = "100vw";
            video.style.height = "100vh";
            video.style.objectFit = "contain";

            overlay.appendChild(video);
            document.body.appendChild(overlay);

            video.onended = () => {
                overlay.remove();
                localStorage.setItem("forumSelecionado", "ultra");
                location.reload();
            };

        }, 3000);
    }

    /* -----------------------------------------------------------
       🔥 MODO ULTRA
    ----------------------------------------------------------- */
    if (forum === "ultra") {
        enterUI();
        document.body.style.background = "black";
        document.body.style.color = "#00ffcc";
        if (titulo) titulo.innerText = "Vienna // ROOT";

        ambience.play().catch(() => {
            document.addEventListener("click", () => ambience.play(), { once: true });
        });
    }

    function atualizarBotao() {
        const temTexto = input && input.value.trim() !== "";
        if (botao) {
            botao.disabled = !temTexto;
            botao.classList.toggle("ativo", temTexto);
        }
    }

    if (input) {
        input.addEventListener("input", atualizarBotao);
    }

    /* -----------------------------------------------------------
       🚀 ENVIO DE MENSAGEM (CORRIGIDO)
    ----------------------------------------------------------- */
    function enviarMensagem() {
        const msg = input.value.trim();
        if (!msg) return;

        if (msg === CODIGO_SECRETO) {
            localStorage.setItem("forumSelecionado", "secreto");
            location.reload();
            return;
        }

        const div = document.createElement("div");
        div.innerText = "Você: " + msg;
        chat.appendChild(div);

        input.value = "";
        atualizarBotao();
    }

    if (botao) {
        botao.addEventListener("click", enviarMensagem);
    }

    if (input) {
input.addEventListener("keydown", (e) => {

    // ENTER normal = envia
    if (e.key === "Enter" && !e.shiftKey && !botao.disabled) {
        e.preventDefault();
        enviarMensagem();
    }

    // SHIFT + ENTER = quebra linha (não faz nada, deixa padrão)
});
    }

    if (voltar) {
        voltar.addEventListener("click", () => {
            window.location.href = "forum.html";
        });
    }

    atualizarBotao();
});