const root = document.getElementById("root");

function Conteudo(...elementos) {
    const main = document.createElement("main");
    elementos.forEach((elemento) => main.append(elemento));
    return main;
}

function Rodape(texto) {
    const paragrafo = document.createElement("p");
    paragrafo.innerText = texto;
    const footer = document.createElement("footer");
    footer.append(paragrafo);
    return footer;
}

function Titulo(texto) {
    const h1 = document.createElement("h1");
    h1.innerText = texto;
    return h1;
}

function Icone(origem, texto) {
    const img = document.createElement("img");
    img.setAttribute("src", origem);
    img.setAttribute("alt", texto);
    return img;
}

function Input(id, tipo, rotulo) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = rotulo;

    const input = document.createElement("input");
    input.setAttribute("type", tipo);
    input.setAttribute("id", id);
    input.setAttribute("name", id);

    const div = document.createElement("div");
    div.append(label, input);
    return div;
}

function InputSubmit(valor) {
    const input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.setAttribute("value", valor);
    return input;
}

function Link(rota, texto) {
    const a = document.createElement("a");
    a.setAttribute("href", rota);
    a.innerText = texto;
    return a;
}

function onLogin(event) {
    event.preventDefault();
    Navega("/home");
}

function FormLogin() {
    const form = document.createElement("form");
    form.setAttribute("action", "/login");
    form.setAttribute("method", "post");

    const inputEmail = Input("email", "email", "E-mail");
    const inputSenha = Input("senha", "password", "Senha");
    const inputEntrar = InputSubmit("Entrar");

    form.append(inputEmail, inputSenha, inputEntrar);
    form.addEventListener("submit", onLogin);

    return form;
}

function PageLogin() {
    const logo = Icone("https://www.svgrepo.com/show/411955/learn.svg", "Logo da Aplicação");
    const titulo = Titulo("Aluno Online");
    const form = FormLogin();
    const link = Link("/esqueceu-senha", "Esqueceu sua Senha?");
    const conteudo = Conteudo(logo, titulo, form, link);
    conteudo.classList.add("login-container");
    const rodape = Rodape("Copyright (C) 2024");

    root.append(conteudo, rodape);
    document.title = "Login - Aluno Online";
}

function Navega(rota) {
    root.innerHTML = null;
    if (rota === "/login") {
        PageLogin();
    } else if (rota === "/home") {
        PageHome();
    } else if (rota === "/perfil") {
        PagePerfil();
    } else {
        root.innerHTML = "<p>Página não encontrada!</p>";
    }
}

Navega("/login");

// HOME PAGE
function InputSearch() {
    const input = document.createElement("input");
    input.setAttribute("type", "search");
    input.setAttribute("placeholder", "Pesquisar...");
    return input;
}

function Cabecalho() {
    const logo = Icone("https://www.svgrepo.com/show/411955/learn.svg", "Logo da Aplicação");
    const titulo = Titulo("Aluno Online");
    const grupo1 = document.createElement("div");
    grupo1.append(logo, titulo);

    const input = InputSearch();
    const icone = Icone("https://www.svgrepo.com/show/507851/search-square.svg", "Ícone de Pesquisar");
    const grupo2 = document.createElement("div");
    grupo2.append(input, icone);

    const header = document.createElement("header");
    header.append(grupo1, grupo2);
    return header;
}

function onClickMenu(event) {
    event.preventDefault();
    Navega(event.target.getAttribute("href"));
}

function Menu() {
    const opcoes = [
        { rota: "/home", titulo: "Home" },
        { rota: "/perfil", titulo: "Perfil" },
        { rota: "/login", titulo: "Sair" },
    ];

    const lista = document.createElement("ul");
    opcoes.forEach((opcao) => {
        const link = Link(opcao.rota, opcao.titulo);
        link.addEventListener("click", onClickMenu);
        const item = document.createElement("li");
        item.append(link);
        lista.append(item);
    });

    const nav = document.createElement("nav");
    nav.append(lista);
    return nav;
}

function Subtitulo(texto) {
    const h2 = document.createElement("h2");
    h2.innerText = texto;
    return h2;
}

function Painel(nome) {
    const titulo = document.createElement("h3");
    titulo.innerText = nome;

    const lista = document.createElement("ul");
    const painel = document.createElement("article");
    painel.append(titulo, lista);
    return painel;
}

function Secao(nome, conteudo) {
    const titulo = Subtitulo(nome);
    const section = document.createElement("section");
    section.append(titulo, conteudo);
    return section;
}

function PageHome() {
    const menu = Menu();
    const grupo = document.createElement("div");
    grupo.classList.add("card-grid");

    const itens = [
        "Mural de Avisos",
        "Agenda Acadêmica",
        "Histórico de Notas",
        "Histórico de Faltas",
    ];

    itens.forEach((item) => {
        if (item === "Mural de Avisos") {
            const painelAvisos = PainelAvisos();
            grupo.append(painelAvisos);
        
        } else if (item === "Histórico de Notas") {
            const painelNotas = PainelHistoricoNotas();
            grupo.append(painelNotas);
        }
        else {
            grupo.append(Painel(item));
        }
    });

    const secao = Secao("Página Inicial", grupo);
    const conteudo = Conteudo(menu, secao);
    const cabecalho = Cabecalho();

    root.append(cabecalho, conteudo);
    document.title = "Home - Aluno Online";
}

// Função para o painel de Mural de Avisos
function PainelAvisos() {
    const painel = document.createElement("div");
    painel.classList.add("painel-avisos");

    // Título do painel de avisos
    const titulo = document.createElement("h2");
    titulo.innerText = "Avisos Importantes";
    painel.append(titulo);

    // Lista de avisos (exemplo estático)
    const listaAvisos = document.createElement("ul");
    const aviso1 = document.createElement("li");
    aviso1.innerText = "Lembre-se de entregar a tarefa até sexta-feira!";
    listaAvisos.append(aviso1);

    // Você pode adicionar mais avisos assim
    const aviso2 = document.createElement("li");
    aviso2.innerText = "Aula de programação foi adiada para segunda-feira!";
    listaAvisos.append(aviso2);

    painel.append(listaAvisos);

    // Função para adicionar novos avisos
    painel.adicionarAviso = function(aviso) {
        const novoAviso = document.createElement("li");
        novoAviso.innerText = aviso;
        listaAvisos.append(novoAviso);
    };

    return painel;
}
//historico de notas
function PainelHistoricoNotas() {
    const painel = document.createElement("div");
    painel.classList.add("painel-notas");

    // Título do painel de histórico de notas
    const titulo = document.createElement("h2");
    titulo.innerText = "Histórico de Notas";
    painel.append(titulo);

    // Lista de notas (exemplo estático)
    const listaNotas = document.createElement("ul");
    
    const nota1 = document.createElement("li");
    nota1.innerText = "Matemática: 8.5";
    listaNotas.append(nota1);

    const nota2 = document.createElement("li");
    nota2.innerText = "Programação: 9.2";
    listaNotas.append(nota2);

    const nota3 = document.createElement("li");
    nota3.innerText = "Física: 7.8";
    listaNotas.append(nota3);

    painel.append(listaNotas);

    // Função para adicionar novas notas
    painel.adicionarNota = function(nota) {
        const novaNota = document.createElement("li");
        novaNota.innerText = nota;
        listaNotas.append(novaNota);
    };

    return painel;
}


// PERFIL PAGE
function onSalvar(event) {
    event.preventDefault();
    Navega("/perfil");
}

function FormPerfil() {
    const form = document.createElement("form");
    form.setAttribute("action", "#");
    form.setAttribute("method", "post");

    const inputNome = Input("nome", "text", "Nome");
    const inputEmail = Input("email", "email", "E-mail");
    const inputSenha = Input("senha", "password", "Senha");
    const inputSalvar = InputSubmit("Salvar");

    form.append(inputNome, inputEmail, inputSenha, inputSalvar);
    form.addEventListener("submit", onSalvar);
    return form;
}

function PagePerfil() {
    const menu = Menu();
    const titulo = Subtitulo("Perfil do Aluno");
    const form = FormPerfil();
    const secao = document.createElement("section");
    secao.append(titulo, form);

    const conteudo = Conteudo(menu, secao);
    const cabecalho = Cabecalho();

    root.append(cabecalho, conteudo);
    document.title = "Perfil - Aluno Online";
}
