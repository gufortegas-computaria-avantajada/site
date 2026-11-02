
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("inputTexto");
    const botao = document.getElementById("enviar");
    const chat = document.getElementById("chat");
    const voltar = document.getElementById("voltarForum");

    // API
    const API_URL = "http://127.0.0.1:5044/ia";

    const CODIGO_SECRETO = "777*777*777";
    const CODIGO_GIF_MODE = "77*77*77";

    // FÓRUM ATUAL
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

    // VISUAL DO FÓRUM
    if (foruns[forum]) {
        if (titulo) {
            titulo.innerText = "Vienna - " + foruns[forum].nome;
        }

        if (logo) {
            logo.src = foruns[forum].imagem;
        }
    }

    // SOM AMBIENTE
    const ambience = new Audio("aquatic ambience.mp3");
    ambience.loop = true;

    // CUTSCENE
    function enterCutscene() {
        document.body.style.overflow = "hidden";

        if (inputArea) {
            inputArea.style.display = "none";
        }

        if (chat) {
            chat.style.paddingBottom = "0px";
        }
    }

    // INTERFACE NORMAL
    function enterUI() {
        document.body.style.overflow = "auto";

        if (inputArea) {
            inputArea.style.display = "block";
        }

        if (chat) {
            chat.style.paddingBottom = "200px";
        }
    }

    // BOTÃO DE CRÉDITOS
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

    // CAIXA DE CRÉDITOS
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
        <p>Interface: GUSTAEXP</p>
        <p>Sistema: GUSTAEXP</p>
        <p>Modo secreto: GUSTAEXP</p>
        <p>Estilo: GUSTAEXP</p>
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

    // MODO SECRETO
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

    // MODO ULTRA
    if (forum === "ultra") {

        enterUI();

        document.body.style.background = "black";
        document.body.style.color = "#00ffcc";

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
            window.open("GREGORY REBOOT.exe", "_blank");
        };

        document.body.appendChild(btnGregory);

        if (titulo) {
            titulo.innerText = "Vienna // ROOT";
        }

        ambience.play().catch(() => {
            document.addEventListener("click", () => {
                ambience.play();
            }, { once: true });
        });
    }

    // ATUALIZAR BOTÃO ENVIAR
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
    // GIF MODE — PLAYLIST PERSONALIZADA
    // =========================================================

    function abrirGifMode() {

        // PLAYLIST
        const playlist = [
            "Animal I Have Become.mp3",
            "Somewhere I Belong.mp3",
            "Dream On.mp3",
            "I Hate Everything About You.mp3",
            "I Was Made For Lovin' You.mp3",
            "Toxicity.mp3",
            "Chop Suey!.mp3",
            "No More Tears.mp3",
            "Aerials.mp3",
            "Master Of Puppets.mp3",
            "Livin' On A Prayer.mp3",
            "Bring Me To Life.mp3",
            "I'm Still Standing.mp3"
        ];

        let musicaAtual = 0;
        let errosSeguidos = 0;

        const audio = new Audio();
        audio.preload = "auto";
        audio.volume = 0.7;

        // OVERLAY
        const overlay = document.createElement("div");

        overlay.id = "gifModeOverlay";

        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 200000;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 14px;
            padding: 20px;
            box-sizing: border-box;
            background: #080808;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
        `;

        // TÍTULO
        const tituloGif = document.createElement("h1");

        tituloGif.textContent = "GIF MODE";

        tituloGif.style.cssText = `
            margin: 0;
            color: white;
            letter-spacing: 5px;
            font-size: clamp(24px, 4vw, 38px);
        `;

        // GIF
        const gif = document.createElement("img");

        gif.src = "Gif-maniero.gif";
        gif.alt = "GIF do Maniero";

        gif.style.cssText = `
            display: block;
            width: min(1200px, 94vw);
            height: min(68vh, 700px);
            object-fit: cover;
            object-position: center;
            border-radius: 8px;
        `;

        gif.onerror = () => {
            gif.style.display = "none";
            avisoGif.style.display = "block";
        };

        const avisoGif = document.createElement("p");

        avisoGif.textContent =
            "Não foi possível carregar Gif-maniero.gif. Confira o nome do arquivo.";

        avisoGif.style.cssText = `
            display: none;
            color: #ffaaaa;
        `;

        // NOME DA MÚSICA
        const nomeMusica = document.createElement("div");

        nomeMusica.textContent = "Preparando playlist...";

        nomeMusica.style.cssText = `
            color: #ccc;
            font-size: 14px;
            max-width: 90vw;
        `;

        // CONTROLES
        const controles = document.createElement("div");

        controles.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
            background: #151515;
            padding: 12px 16px;
            border-radius: 12px;
            border: 1px solid #333;
        `;

        // BOTÃO PLAY/PAUSE
        const botaoPlay = document.createElement("button");

        botaoPlay.textContent = "▶ Reproduzir";

        botaoPlay.style.cssText = `
            padding: 9px 16px;
            border: 1px solid #555;
            border-radius: 8px;
            background: #252525;
            color: white;
            cursor: pointer;
        `;

        // VOLUME
        const volumeLabel = document.createElement("label");

        volumeLabel.textContent = "Volume";

        volumeLabel.style.cssText = `
            color: #bbb;
            font-size: 13px;
        `;

        const volume = document.createElement("input");

        volume.type = "range";
        volume.min = "0";
        volume.max = "1";
        volume.step = "0.01";
        volume.value = "0.7";

        volume.style.cssText = `
            width: 100px;
            cursor: pointer;
        `;

        volume.addEventListener("input", () => {
            audio.volume = Number(volume.value);
        });

        // BOTÃO DE VOLTAR
        const fechar = document.createElement("button");

        fechar.type = "button";
        fechar.textContent = "← Voltar ao Vienna";

        fechar.style.cssText = `
            padding: 10px 18px;
            border: 1px solid #555;
            border-radius: 8px;
            background: #202020;
            color: white;
            cursor: pointer;
            font-size: 14px;
        `;

        // TROCAR MÚSICA
        function tocarMusica() {

            if (errosSeguidos >= playlist.length) {
                nomeMusica.textContent =
                    "Não foi possível encontrar as músicas. Confira a pasta Soundtracks-gif.";
                botaoPlay.textContent = "▶ Reproduzir";
                return;
            }

            const arquivo = playlist[musicaAtual];

            audio.src = "Soundtracks-gif/" + arquivo;

            nomeMusica.textContent =
                "♪ " + arquivo.replace(".mp3", "");

            audio.play().then(() => {
                botaoPlay.textContent = "⏸ Pausar";
            }).catch(() => {
                botaoPlay.textContent = "▶ Reproduzir";
                nomeMusica.textContent =
                    "Clique em Reproduzir para iniciar: " +
                    arquivo.replace(".mp3", "");
            });
        }

        // PRÓXIMA MÚSICA
        function proximaMusica() {

            musicaAtual++;

            if (musicaAtual >= playlist.length) {
                musicaAtual = 0;
            }

            tocarMusica();
        }

        // AVANÇO AUTOMÁTICO
        audio.addEventListener("ended", () => {
            errosSeguidos = 0;
            proximaMusica();
        });

        // ARQUIVO NÃO ENCONTRADO
        audio.addEventListener("error", () => {

            errosSeguidos++;

            if (errosSeguidos >= playlist.length) {
                nomeMusica.textContent =
                    "Erro: não foi possível carregar a playlist.";
                botaoPlay.textContent = "▶ Reproduzir";
                return;
            }

            proximaMusica();
        });

        // PLAY / PAUSE
        botaoPlay.addEventListener("click", () => {

            if (audio.paused) {

                if (!audio.src) {
                    tocarMusica();
                } else {
                    audio.play().then(() => {
                        botaoPlay.textContent = "⏸ Pausar";
                    }).catch(() => {
                        botaoPlay.textContent = "▶ Reproduzir";
                    });
                }

            } else {

                audio.pause();
                botaoPlay.textContent = "▶ Reproduzir";
            }
        });

        // FECHAR GIF MODE
        function fecharGifMode() {

            audio.pause();
            audio.removeAttribute("src");
            audio.load();

            document.removeEventListener("keydown", teclaEsc);

            overlay.remove();
        }

        fechar.addEventListener("click", fecharGifMode);

        function teclaEsc(e) {
            if (e.key === "Escape") {
                fecharGifMode();
            }
        }

        document.addEventListener("keydown", teclaEsc);

        // MONTAGEM
        volumeLabel.appendChild(volume);

        controles.append(
            botaoPlay,
            volumeLabel
        );

        overlay.append(
            tituloGif,
            gif,
            avisoGif,
            nomeMusica,
            controles,
            fechar
        );

        document.body.appendChild(overlay);

        // TENTAR AUTOPLAY
        tocarMusica();
    }

    // =========================================================
    // ENVIAR MENSAGEM
    // =========================================================

    async function enviarMensagem() {

        const msg = input.value.trim();

        if (!msg) return;

        // GIF MODE
        if (msg === CODIGO_GIF_MODE) {

            input.value = "";
            atualizarBotao();

            abrirGifMode();

            return;
        }

        // CÓDIGO SECRETO ORIGINAL
        if (msg === CODIGO_SECRETO) {

            localStorage.setItem("forumSelecionado", "secreto");

            location.reload();

            return;
        }

        // USUÁRIO
        const userDiv = document.createElement("div");

        userDiv.innerText = "Você: " + msg;

        chat.appendChild(userDiv);

        input.value = "";

        atualizarBotao();

        // IA
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
                throw new Error("Erro HTTP: " + resposta.status);
            }

            const data = await resposta.json();

            const textoIA = data.resposta;

            iaDiv.innerText = "IA: " + textoIA;

            // CORES DOS VEREDICTOS
            const textoMaiusculo = textoIA.toUpperCase();

            if (textoMaiusculo.includes("VERDADEIRO")) {

                iaDiv.classList.add("resposta-verdadeiro");

            } else if (textoMaiusculo.includes("FALSO")) {

                iaDiv.classList.add("resposta-falso");

            } else if (
                textoMaiusculo.includes("NÃO VERIFICÁVEL") ||
                textoMaiusculo.includes("NAO VERIFICAVEL")
            ) {

                iaDiv.classList.add("resposta-nao-verificavel");
            }

        } catch (erro) {

            console.error(erro);

            iaDiv.innerText = "IA: erro ao conectar.";
        }

        chat.scrollTop = chat.scrollHeight;
    }

    // BOTÃO
    if (botao) {
        botao.addEventListener("click", enviarMensagem);
    }

    // ENTER / SHIFT+ENTER
    if (input) {

        input.addEventListener("keydown", (e) => {

            if (
                e.key === "Enter" &&
                !e.shiftKey &&
                botao &&
                !botao.disabled
            ) {

                e.preventDefault();

                enviarMensagem();
            }
        });
    }

    // VOLTAR
    if (voltar) {

        voltar.addEventListener("click", () => {
            window.location.href = "forum.html";
        });
    }

    atualizarBotao();

});
