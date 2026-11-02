/* -----------------------------------------------------------
   LOTUS WATERS (AMBIENTE)
----------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const lotus = new Audio("Lotus waters.mp3");
    lotus.loop = true;
    lotus.volume = 0.3;

    function tocar() {
        lotus.play().catch(() => {});
    }

    document.addEventListener("click", tocar, { once: true });
});


/* -----------------------------------------------------------
   ENTRAR NO FÓRUM
----------------------------------------------------------- */

function entrarForum(nome) {
    const destinos = {
        geral: "geral.html",
        tecnologia: "tecnologia.html",
        teorias: "teorias.html"
    };

    if (!destinos[nome]) {
        console.error("Fórum não encontrado:", nome);
        return;
    }

    localStorage.setItem("forumSelecionado", nome);
    window.location.href = destinos[nome];
}