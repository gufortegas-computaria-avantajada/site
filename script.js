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

        const audio = new Audio("track1secret.mp3");
        document.addEventListener("click", () => audio.play(), { once: true });

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
            overlay.style.overflow = "hidden";

            const video = document.createElement("video");
            video.src = "rickroll.mp4";

            video.autoplay = true;
            video.playsInline = true;
            video.controls = false;
            video.preload = "auto";

            // 🔥 AJUSTE FINAL SEM SCROLL E SEM CORTAR
            video.style.position = "absolute";
            video.style.top = "50%";
            video.style.left = "50%";
            video.style.transform = "translate(-50%, -50%)";

            video.style.width = "100vw";
            video.style.height = "100vh";
            video.style.objectFit = "contain";

            overlay.appendChild(video);
            document.body.appendChild(overlay);

            video.addEventListener("loadedmetadata", () => {
                video.play().catch(() => {
                    document.addEventListener("click", () => video.play(), { once: true });
                });
            });

            let finalizado = false;

            video.addEventListener("ended", () => {
                if (finalizado) return;
                finalizado = true;

                localStorage.setItem("forumSelecionado", "ultra");
                location.reload();
            });

            video.addEventListener("loadedmetadata", () => {
                const duracao = video.duration || 6;

                setTimeout(() => {
                    if (finalizado) return;
                    finalizado = true;

                    localStorage.setItem("forumSelecionado", "ultra");
                    location.reload();
                }, (duracao + 1) * 1000);
            });

        }, 3000);
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
            location.reload();
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
