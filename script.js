const credenciais = [
    { usuario: "admin", senha: "1234" },
    { usuario: "isac", senha: "pf2025" }
];
const policiais = [
    { nome: "Chicão", status: "Aguardando" },
    { nome: "Alandilson", status: "Aguardando" },
    { nome: "George", status: "Aguardando" },
    { nome: "Carvalho", status: "Aguardando" },
    { nome: "Elverth", status: "Aguardando" },
    { nome: "Dias", status: "Aguardando" },
    { nome: "Isac", status: "Aguardando" },
    { nome: "Diniz", status: "Aguardando" }
];
const historico = [];
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const valido = credenciais.find(c => c.usuario === usuario && c.senha === senha);
    if (valido) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-screen").style.display = "block";
    } else {
        document.getElementById("login-error").innerText = "Usuário ou senha inválidos!";
    }
});
function logout() {
    document.getElementById("main-screen").style.display = "none";
    document.getElementById("login-screen").style.display = "flex";
}
function carregarEscala() {
    const tabela = document.getElementById("escala");
    tabela.innerHTML = "";
    policiais.forEach(p => {
        tabela.innerHTML += `<tr><td>${p.nome}</td><td>${p.status}</td></tr>`;
    });
}
function carregarHistorico() {
    const tabela = document.getElementById("historico");
    tabela.innerHTML = "";
    historico.forEach(v => {
        tabela.innerHTML += `<tr><td>${v.destino}</td><td>${v.data}</td><td>${v.duracao} dias</td><td>${v.participantes.join(", ")}</td></tr>`;
    });
}
document.getElementById("form-viagem").addEventListener("submit", function(e) {
    e.preventDefault();
    const destino = document.getElementById("destino").value;
    const data = document.getElementById("data").value;
    const duracao = document.getElementById("duracao").value;
    const qtd = parseInt(document.getElementById("qtd").value);
    const participantes = [];
    for (let i = 0; i < qtd; i++) {
        const proximo = policiais.find(p => p.status === "Aguardando");
        if (proximo) {
            proximo.status = "Já viajou";
            participantes.push(proximo.nome);
        }
    }
    historico.push({ destino, data, duracao, participantes });
    document.getElementById("proxima-viagem").innerText = `${destino} - ${data} (${duracao} dias) Participantes: ${participantes.join(", ")}`;
    carregarEscala();
    carregarHistorico();
    this.reset();
});
document.addEventListener("DOMContentLoaded", () => {
    carregarEscala();
    carregarHistorico();
});
