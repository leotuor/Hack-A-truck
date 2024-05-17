// let titulo = document.getElementById("titulo");
// let botaoTeste = document.getElementById("botaoTeste")
// console.log(titulo);
// titulo.innerText = "oi";
// titulo.style.color = "blue";
// botaoTeste.addEventListener("click", () => {
//   alert("clicou");
// })
// function clickTeste(event){
//   alert("clicou")
// }

let input = document.getElementById("todos");
let botao = document.getElementById("botao");
let seletor = document.getElementById("select");
let corLetra = document.getElementById("letras");
let divItens = document.getElementById("divItens");
let editButton = document.getElementById("editor");

let itens = [];
console.log(seletor);
getLocalStorage();
botao.addEventListener("click", (_) => {
  if(input.value.replace(/ /g, "")){
    itens.push(
      {       
          descricao: input.value,
          cor: seletor.value,
          letra: corLetra.value
      }
    )
  }
  console.log(itens);
  addCard();

});

function addCard(_) {
  divItens.innerHTML = "";
  itens.forEach((objeto, indice) => {
    let {descricao, cor, letra} = objeto;
    let linha = document.createElement("div");
    linha.className = "row mt-3";
    linha.innerHTML = 
    `
      <div class="col-12">
        <div class = "card" style="border: solid ${cor} 5px;">
          <div class = "card-body">
            <h5 style="color: ${letra};">
              ${indice} - ${descricao}
            </h5>
            <div class = "text container-fluid" style = "display: flex; justify-content: right;">
              <button type="button" value="" onclick="editCard(${indice})" id="editor" style = "width = 150%;"><i class="bi bi-pencil-fill"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;

    divItens.appendChild(linha);
  })
  addLocalStorage();
  input.value = "";
  
}

// function excluir(_){
//   divItens.removeChild(divItens.lastChild);
//   itens.pop();
// }
function excluir(_){
  const idExclusao = prompt("informe o nome para Exclusão: ");
  if(idExclusao.toString().replace(/\D/g,"")){
    itens.splice(idExclusao, 1);
  }
  addCard();
}
function addLocalStorage(){
  localStorage.setItem("itens", JSON.stringify(itens));
}
function editCard(card){
  novaDescricao = prompt("Informe o novo a nova info do card: ");
  itens[card].descricao = novaDescricao;
  addLocalStorage();
  addCard();
}
function getLocalStorage(){
  try {
    itens = JSON.parse(localStorage.getItem("itens"));
    addCard();
  } catch (error) {
    localStorage.setItem("itens", ("[]"));
  }
}