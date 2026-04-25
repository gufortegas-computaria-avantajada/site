function entrarForum(nome) {
    localStorage.setItem("forumSelecionado", nome);
    window.location.href = "index.html";
}