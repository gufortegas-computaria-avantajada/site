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

    const foruns = {
        geral: { nome: "Geral", imagem: "images.jpg" },
        tecnologia: { nome: "Tecnologia", imagem: "images4.jpg" },
        teorias: { nome: "Teorias", imagem: "images2.jpg" },
        secreto: { nome: "???", imagem: "images3.jpg" },
        ultra: { nome: "ULTRA", imagem: "images3.jpg" }
    };

    if (foruns[forum]) {
        titulo.innerText = "Vienna - " + foruns[forum].nome;
        if (logo) logo.src = foruns[forum].imagem;
    }

    // 🌑 MODO SECRETO
    if (forum === "secreto") {
        document.body.classList.add("secreto");

        const tela = document.createElement("div");
        tela.className = "tela-secreta glitch";
        tela.innerText = "ACESSO CONCEDIDO";
        document.body.appendChild(tela);

        // 🎧 áudio continua normal
        const audio = new Audio("track1secret.mp3");
        audio.volume = 0.4;

        function iniciarAudio() {
            audio.play().catch(() => {});
        }

        setTimeout(iniciarAudio, 1000);
        document.addEventListener("click", iniciarAudio, { once: true });

        // ⏳ DEPOIS DE 5s → VÍDEO
        setTimeout(() => {

            // cria overlay
            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.background = "black";
            overlay.style.zIndex = "9999";

            // cria vídeo
            const video = document.createElement("video");
            video.src = "rickroll.mp4";
            video.autoplay = true;
            video.muted = true; // 🔥 ESSENCIAL PRA FUNCIONAR
            video.playsInline = true;

            video.style.width = "100%";
            video.style.height = "100%";
            video.style.objectFit = "cover";

            overlay.appendChild(video);
            document.body.appendChild(overlay);

            // garante que toca
            video.play().catch(() => {
                console.log("autoplay bloqueado");
            });

            // ⏳ depois libera ULTRA
            setTimeout(() => {
                localStorage.setItem("forumSelecionado", "ultra");
                window.location.reload();
            }, 6000);

        }, 5000);
    }

    // 🔥 MODO ULTRA
    if (forum === "ultra") {
        document.body.style.background = "black";
        document.body.style.color = "#00ffcc";

        if (titulo) titulo.innerText = "Vienna // ROOT";

        setInterval(() => {
            document.body.style.filter =
                Math.random() > 0.5 ? "brightness(1.2)" : "brightness(0.8)";
        }, 200);
    }

    function atualizarBotao() {
        const temTexto = input.value.trim() !== "";
        botao.disabled = !temTexto;
        botao.classList.toggle("ativo", temTexto);
    }

    input.addEventListener("input", () => {
        atualizarBotao();
        input.style.height = "auto";
        input.style.height = input.scrollHeight + "px";
    });

    async function enviarMensagem() {
        const msg = input.value.trim();
        if (!msg) return;

        if (msg === CODIGO_SECRETO) {
            localStorage.setItem("forumSelecionado", "secreto");

            const aviso = document.createElement("div");
            aviso.innerText = "🔓 Acesso liberado...";
            chat.appendChild(aviso);

            setTimeout(() => location.reload(), 1000);
            return;
        }

        adicionarMensagem("Você: " + msg);

        input.value = "";
        atualizarBotao();

        const loading = document.createElement("div");
        loading.innerText = "IA: ...";
        chat.appendChild(loading);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ msg })
            });

            const resposta = await res.text();
            loading.innerText = "IA: " + resposta;

        } catch {
            loading.innerText = "IA: erro 😢";
        }
    }

    botao.addEventListener("click", enviarMensagem);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !botao.disabled) {
            e.preventDefault();
            enviarMensagem();
        }
    });

    if (voltar) {
        voltar.addEventListener("click", () => {
            window.location.href = "forum.html";
        });
    }

    function adicionarMensagem(texto) {
        const div = document.createElement("div");
        div.innerText = texto;
        chat.appendChild(div);
    }

    atualizarBotao();
});
