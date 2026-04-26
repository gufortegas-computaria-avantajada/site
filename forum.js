/* -----------------------------------------------------------
   🌊 LOTUS WATERS (AMBIENTE)
----------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    const lotus = new Audio("Lotus waters.mp3");
    lotus.loop = true;
    lotus.volume = 0.3;

    function tocar() {
        lotus.play().catch(() => {});
    }

    // tenta autoplay
    tocar();

    // fallback (navegador bloqueia autoplay)
    document.addEventListener("click", tocar, { once: true });

});


/* -----------------------------------------------------------
   ENTRAR NO FÓRUM (SEU CÓDIGO ORIGINAL)
----------------------------------------------------------- */
function entrarForum(nome) {
    localStorage.setItem("forumSelecionado", nome);
    window.location.href = "index.html";
}
