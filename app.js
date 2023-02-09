const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const productsTemplate = document.querySelector("#template");
const productFragment = new DocumentFragment();
const rootDiv = document.getElementById("root")
const search = document.getElementById("search")
const select = document.getElementById("select")
const pricess = document.getElementById("prices")




btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



let searchedProd = []

async function fetcher() {
    const res = await fetch("https://fakestoreapi.com/products/")
    const data = await res.json()
    render(data)
}

search.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase()
    searchedProd.forEach((prod) => {
        const res = prod.title.toLowerCase().includes(value)
        prod.element.classList.toggle("hide", !res)
    })
})

select.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase()
    searchedProd.forEach((prod) => {
        const res = prod.category.toLowerCase().includes(value)
        prod.element.classList.toggle("hide", !res)
    })
})

let allPrices = 0
function render(dataArr) {
    searchedProd = dataArr.map((product) => {
        const card = productsTemplate.content.cloneNode(true).children[0]
        card.querySelector("[card-img]").src = product.image
        card.querySelector("[card-img]").alt = product.title
        card.querySelector("#card-title").textContent = product.title.slice(0, 20) + "..."
        card.querySelector("#card-pretitle").textContent = product.category.slice(0, 1).toUpperCase() + product.category.slice(1)
        card.querySelector("#card-price").textContent = "$" + product.price
        card.querySelector("#card-price").textContent = "$" + product.price
        card.querySelector("#plus-price").addEventListener("click", () => {
            allPrices += product.price
            // pricess.textContent = "$ " + allPrices.toFixed(2)
        })
        productFragment.append(card)
        return {
            title: product.title,
            category: product.category,
            price: product.price,
            desc: product.description,
            element: card
        }
    });
    rootDiv.append(productFragment)


    let categorys = searchedProd.map((v) => {
        return v.category
    })
    let unique = [...new Set(categorys)];

    unique.forEach((item) => {
        let option = document.createElement("option")
        option.value = item
        option.textContent = item.slice(0, 1).toUpperCase() + item.slice(1)
        select.appendChild(option)
    })
}


fetcher()

function ready() {
   

    const addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
ready()