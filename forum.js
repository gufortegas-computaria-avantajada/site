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

    tocar();

    document.addEventListener("click", tocar, { once: true });

});


/* -----------------------------------------------------------
   ENTRAR NO FÓRUM
----------------------------------------------------------- */
function entrarForum(nome) {
    localStorage.setItem("forumSelecionado", nome);
    window.location.href = "index.html";
}