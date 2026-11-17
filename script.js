let carrinho = [];

function adicionar(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);

    total += item.preco;
  });

  totalSpan.textContent = total.toFixed(2);
}

function abrirCarrinho() {
  document.querySelector(".carrinho").classList.toggle("ativo");
}

function finalizarPedido() {
  const pagamento = document.getElementById("pagamento").value;
  const total = document.getElementById("total").textContent;

  alert(`Pedido feito!\nTotal: R$ ${total}\nPagamento: ${pagamento}`);
}

document.querySelectorAll(".avaliacao").forEach(avaliacao => {
  const estrelas = avaliacao.querySelectorAll(".estrela");
  const item = avaliacao.getAttribute("data-item");

  estrelas.forEach(estrela => {
    estrela.addEventListener("click", () => {
      let valor = estrela.getAttribute("data-valor");

      // salva no navegador
      localStorage.setItem("avaliacao_" + item, valor);

      atualizarEstrelas(estrelas, valor);
    });
  });

  // carregar avaliação salva
  let salvo = localStorage.getItem("avaliacao_" + item);
  if (salvo) {
    atualizarEstrelas(estrelas, salvo);
  }
});

function atualizarEstrelas(estrelas, valor) {
  estrelas.forEach(estrela => {
    estrela.classList.remove("ativa");
    if (estrela.getAttribute("data-valor") <= valor) {
      estrela.classList.add("ativa");
    }
  });
}
let total = 0;
let lista = document.getElementById("lista");

// função de adicionar item
function adicionar(nome, preco) {
    total += preco;

    // cria item na lista
    let item = document.createElement("li");
    item.innerText = nome + " - R$ " + preco.toFixed(2);

    lista.appendChild(item);

    atualizarTotal();
}

// atualiza o total
function atualizarTotal() {
    document.getElementById("total").innerText =
        "Total: R$ " + total.toFixed(2);
}

// finalizar pedido
function finalizar() {
    if (total === 0) {
        alert("Carrinho vazio!");
        return;
    }

    alert("Pedido finalizado! Total: R$ " + total.toFixed(2));

    // limpa carrinho
    lista.innerHTML = "";
    total = 0;
    atualizarTotal();
}