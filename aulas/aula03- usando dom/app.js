const form = document.querySelector('form');
const ul = document.querySelector('ul');

form.onsubmit = function(event){
    event.preventDefault();

    const input = form.querySelector('input');
    const value = input.value.trim(); 
    if(value == '') return;

    //criando um novo item
    const li = document.createElement('li');
    li.className = "px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out flex justify-between";

    const span = document.createElement('span');
    span.textContent = value;

    const button = document.createElement('button');
    button.className = "text-red-700 delete";
    button.textContent = "X"

    //adcionando o texto e o botao ao <li>
    li.appendChild(span);
    li.appendChild(button);
    //adcionando o li a lu
    ul.appendChild(li);

    input.value = '';
}

ul.onclick = function(event){ //quando eu clicar 
    //event.currentTarget refere-se a quem esta chamando o programa(ul)
    //event.target refere-se a quem esta sendo clicado no programa

    if(event.target.classList.contains('delete')){
        if(confirm("deseja deletar esse item?")){
            event.target.parentElement.remove(); //procurar o elemto pai acima do botao
        }
    }
    
}