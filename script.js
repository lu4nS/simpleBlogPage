let novoPostForm = document.getElementById('novo-post-form');
let postsFeed = document.getElementById('posts-feed');
let posts = [];
let formatoSelecionado = null;
let comentarios = [];


function criarNovoPost() {
    let titulo = document.getElementById('titulo').value;
    let conteudo = document.getElementById('conteudo').value;
    let tags = document.getElementById('tags').value;

    let post = {
        titulo: titulo,
        conteudo: conteudo,
        tags: tags,
        comentarios: []

    };

    posts.push(post);
    comentarios.push([]);

    document.getElementById('titulo').value = '';
    document.getElementById('conteudo').value = '';
    document.getElementById('tags').value = '';
}

// função para exibir os posts
function exibirPosts() {
    postsFeed.innerHTML = '';

    posts.forEach((post, index) => {
        let postHTML = `
            <div class="post">
                <h2 class="titulo">${post.titulo}</h2>
                <p class="conteudo">${post.conteudo}</p>
                <p class="tags">${post.tags}</p>
                <button class="deletar-btn" onclick="deletarPost(${index})">Deletar</button>
                <div class="comentarios">
                    <h3>Comentários</h3>
                    <ul id="comentarios-list-${index}"></ul>
                    <form id="add-comentario-form-${index}" class="add-comentario-form">
                        <input type="text" id="comentario-text-${index}" placeholder="Adicione um comentário" class="comentario-input">
                        <button type="button" id="enviar-comentario-btn-${index}" class="enviar-comentario-btn">Enviar</button>
                    </form>
                </div>
            </div>
        `;

        postsFeed.innerHTML += postHTML;

        let comentariosList = document.getElementById(`comentarios-list-${index}`);
        comentariosList.innerHTML = '';
        comentarios[index].forEach((comentario) => {
            let comentarioHTML = `<li class="comentario-item">${comentario}</li>`;
            comentariosList.innerHTML += comentarioHTML;
        });

        let enviarComentarioBtn = document.getElementById(`enviar-comentario-btn-${index}`);
        enviarComentarioBtn.addEventListener('click', () => {
            let comentarioText = document.getElementById(`comentario-text-${index}`).value;
            if (comentarioText !== '') {
                comentarios[index].push(comentarioText);
                document.getElementById(`comentario-text-${index}`).value = '';
                exibirPosts(); // update post display
            }
        });
    });
}

function deletarPost(index) {
    posts.splice(index, 1);
    exibirPosts();
}

function aplicarFormatacao(formato) {
    let textoSelecionado = window.getSelection().toString();
    let conteudoTextarea = document.getElementById('conteudo');
    let lines = textoSelecionado.split('\n');

    switch (formato) {
        case 'negrito':
            conteudoTextarea.value = conteudoTextarea.value.replace(textoSelecionado, `<b>${textoSelecionado}</b>`);
            break;
        case 'itálico':
            conteudoTextarea.value = conteudoTextarea.value.replace(textoSelecionado, `<i>${textoSelecionado}</i>`);
            break;
        case 'marcadores de balas':
            let lista = '';
            lines.forEach((line) => {
                lista += `<li>${line}</li>`;
            });
            conteudoTextarea.value = conteudoTextarea.value.replace(textoSelecionado, `<ul>${lista}</ul>`);
            break;
        case 'marcadores de números':
            let listaNumerada = '';
            lines.forEach((line, index) => {
                listaNumerada += `<li> ${line}</li>`;
            });
            conteudoTextarea.value = conteudoTextarea.value.replace(textoSelecionado, `<ol>${listaNumerada}</ol>`);
            break;
    }
}

document.getElementById('novo-post-btn').addEventListener('click', () => {
    novoPostForm.style.display = 'block';
    postsFeed.style.display = 'none';
});

document.getElementById('ver-posts-btn').addEventListener('click', () => {
    novoPostForm.style.display = 'none';
    postsFeed.style.display = 'block';
    exibirPosts();
});

document.getElementById('publicar-btn').addEventListener('click', criarNovoPost);

document.getElementById('negrito-btn').addEventListener('click', () => {
    aplicarFormatacao('negrito');
});

document.getElementById('italico-btn').addEventListener('click', () => {
    aplicarFormatacao('itálico');
});

document.getElementById('marcadores-balas-btn').addEventListener('click', () => {
    aplicarFormatacao('marcadores de balas');
});

document.getElementById('marcadores-numeros-btn').addEventListener('click', () => {
    aplicarFormatacao('marcadores de números');
});