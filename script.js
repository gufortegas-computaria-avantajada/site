document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("inputTexto");
    const botao = document.getElementById("enviar");
    const chat = document.getElementById("chat");
    const voltar = document.getElementById("voltarForum");

    // 🔥 API
    const API_URL = "http://127.0.0.1:5044/ia";

    const CODIGO_SECRETO = "777*777*777";

    // 🔥 fórum atual
    const forum = localStorage.getItem("forumSelecionado") || "geral";

    const titulo = document.querySelector(".container1 h2");
    const logo = document.querySelector(".logo");
    const inputArea = document.querySelector(".input-area");

    const foruns = {

        geral: {
            nome: "Geral",
            imagem: "images.jpg"
        },

        tecnologia: {
            nome: "Tecnologia",
            imagem: "images4.jpg"
        },

        teorias: {
            nome: "Teorias",
            imagem: "images2.png"
        },

        secreto: {
            nome: "???",
            imagem: "images3.jpg"
        },

        ultra: {
            nome: "ULTRA",
            imagem: "images3.jpg"
        }
    };

    // =========================================================
    // 🎨 VISUAL DO FÓRUM
    // =========================================================

    if (foruns[forum]) {

        titulo.innerText = "Vienna - " + foruns[forum].nome;

        if (logo) {
            logo.src = foruns[forum].imagem;
        }
    }

    // =========================================================
    // 🔊 SOM
    // =========================================================

    const ambience = new Audio("aquatic ambience.mp3");

    ambience.loop = true;

    // =========================================================
    // 🎬 CUTSCENE
    // =========================================================

    function enterCutscene() {

        document.body.style.overflow = "hidden";

        if (inputArea) {
            inputArea.style.display = "none";
        }

        if (chat) {
            chat.style.paddingBottom = "0px";
        }
    }

    // =========================================================
    // 💻 UI NORMAL
    // =========================================================

    function enterUI() {

        document.body.style.overflow = "auto";

        if (inputArea) {
            inputArea.style.display = "block";
        }

        if (chat) {
            chat.style.paddingBottom = "200px";
        }
    }

    // =========================================================
    // 🔘 BOTÃO DE CRÉDITOS
    // =========================================================

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

    // =========================================================
    // 📦 CAIXA DE CRÉDITOS
    // =========================================================

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
        <p>Sistema: Gustavo F</p>
        <p>Modo secreto: Gustavo F</p>
        <p>Estilo: 😎</p>

        <br>

        <button id="fecharCreditos">Fechar</button>
    `;

    // =========================================================
    // 🌑 APENAS MODOS SECRETOS
    // =========================================================

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

    // =========================================================
    // 🔥 MODO SECRETO
    // =========================================================

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

    // =========================================================
    // 🔥 MODO ULTRA
    // =========================================================

   // =========================================================
// 🔥 MODO ULTRA
// =========================================================

if (forum === "ultra") {

    enterUI();

    document.body.style.background = "black";
    document.body.style.color = "#00ffcc";

    // =====================================================
    // 🤖 DOWNLOAD GREGORY BETA
    // =====================================================

    const btnGregory = document.createElement("button");

    btnGregory.innerText = "Gregory Beta 1.0";

    btnGregory.style.position = "fixed";
    btnGregory.style.bottom = "20px";
    btnGregory.style.right = "20px";
    btnGregory.style.padding = "12px 20px";
    btnGregory.style.borderRadius = "10px";
    btnGregory.style.border = "1px solid #00ffcc";
    btnGregory.style.background = "black";
    btnGregory.style.color = "#00ffcc";
    btnGregory.style.cursor = "pointer";
    btnGregory.style.zIndex = "99999";

    btnGregory.onclick = () => {

        window.open(
    "GREGORY REBOOT.bat",
    "_blank"
);

    };

    document.body.appendChild(btnGregory);


    // =====================================================
    // 🖥 ROOT MODE
    // =====================================================

    if (titulo) {

        titulo.innerText = "Vienna // ROOT";

    }


    // =====================================================
    // 🔊 AMBIENTE
    // =====================================================

    ambience.play().catch(() => {

        document.addEventListener("click", () => {

            ambience.play();

        }, { once: true });

    });

}

    // =========================================================
    // 🔘 BOTÃO ENVIAR
    // =========================================================

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

    // =========================================================
    // 🚀 ENVIAR MENSAGEM
    // =========================================================

    async function enviarMensagem() {

        const msg = input.value.trim();

        if (!msg) return;

        // =====================================================
        // 🔥 CÓDIGO SECRETO
        // =====================================================

        if (msg === CODIGO_SECRETO) {

            localStorage.setItem("forumSelecionado", "secreto");

            location.reload();

            return;
        }

        // =====================================================
        // 👤 USUÁRIO
        // =====================================================

        const userDiv = document.createElement("div");

        userDiv.innerText = "Você: " + msg;

        chat.appendChild(userDiv);

        // limpa input
        input.value = "";

        atualizarBotao();

        // =====================================================
        // 🤖 IA
        // =====================================================

        const iaDiv = document.createElement("div");

        iaDiv.innerText = "IA: ...";

        chat.appendChild(iaDiv);

        chat.scrollTop = chat.scrollHeight;

        try {

            const resposta = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    msg: msg,
                    forum: forum
                })
            });

            if (!resposta.ok) {

                throw new Error(
                    "Erro HTTP: " + resposta.status
                );
            }

            const data = await resposta.json();

            const textoIA = data.resposta;

            iaDiv.innerText = "IA: " + textoIA;

            // =====================================================
            // 🎨 CORES DOS VEREDICTOS
            // =====================================================

            const textoMaiusculo = textoIA.toUpperCase();

            if (textoMaiusculo.includes("VERDADEIRO")) {

                iaDiv.classList.add("resposta-verdadeiro");
            }

            else if (textoMaiusculo.includes("FALSO")) {

                iaDiv.classList.add("resposta-falso");
            }

            else if (
                textoMaiusculo.includes("NÃO VERIFICÁVEL") ||
                textoMaiusculo.includes("NAO VERIFICAVEL")
            ) {

                iaDiv.classList.add("resposta-nao-verificavel");
            }
        }
        catch (erro) {

            console.error(erro);

            iaDiv.innerText = "IA: erro ao conectar.";
        }

        chat.scrollTop = chat.scrollHeight;
    }

    // =========================================================
    // 🖱 BOTÃO
    // =========================================================

    if (botao) {

        botao.addEventListener(
            "click",
            enviarMensagem
        );
    }

    // =========================================================
    // ⌨ ENTER / SHIFT+ENTER
    // =========================================================

    if (input) {

        input.addEventListener("keydown", (e) => {

            // ENTER normal
            if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !botao.disabled
            ) {

                e.preventDefault();

                enviarMensagem();
            }

            // SHIFT+ENTER:
            // quebra linha normal
        });
    }

    // =========================================================
    // 🔙 VOLTAR
    // =========================================================

    if (voltar) {

        voltar.addEventListener("click", () => {

            window.location.href = "forum.html";
        });
    }

    atualizarBotao();

});
