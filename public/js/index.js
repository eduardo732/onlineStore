//dev baseUrl http://localhost:port/api/
const baseUrl = "/api/";
const allProducts = "product/findAll";
const searcher = "product/searcher";
const allCategories = "category/findAll";
const productsFromCategory = "category/products";

//FETCH ZONE
const getData = (url) => {
  return new Promise((resolve) => {
    fetch(url)
      .then((data) => {
        if (data.status === 200) {
          resolve(data.json());
        } else {
          resolve(data.statusText);
        }
      })
      .catch((err) => resolve(err));
  });
};

const postData = (url, word) => {
  return new Promise((resolve) => {
    fetch(url, {
      method: 'POST',
      body: { word: word },
      headers: {
      'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          resolve(data.json());
        } else {
          resolve(data.statusText);
        }
      })
      .catch((err) => resolve(err));
  });
};

//LOGIC ZONE

/**
 * Searcher zone
 */
const inputForm = document.getElementById("inputForm");
const btnForm = document.getElementById("btn");
const productsDiv = document.getElementById("products");
const navCat = document.getElementById("categories");

const calculatePrice = (price, disc) => {
  if (disc == 0) return price;
  let discValue = eval((price * disc) / 100);
  return price - discValue;
};

const filter = async () => {
  const products = await getData(baseUrl + allProducts);
  const text = inputForm.value.toLowerCase();
  productsDiv.innerHTML = "";
  products.forEach((item) => {
    let name = item.name.toLowerCase();
    if (name.indexOf(text) !== -1) {
      productsDiv.innerHTML += `
            <div class="card pos" style="width: 18rem;">
              <img src="${item.url_image}" class="card-img-top" alt="Product">
              <div class="card-body">
                <p class="card-text">${item.name}</p>
                <hr>
                <p>$ ${calculatePrice(item.price, item.discount)}
                <img
                  src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTExLjk5OSA1MTEuOTk5IiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMS45OTkgNTExLjk5OSIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48cGF0aCBkPSJtMjI0IDQwOGMtMjIuMDYgMC00MCAxNy45NC00MCA0MHMxNy45NCA0MCA0MCA0MCA0MC0xNy45NCA0MC00MC0xNy45NC00MC00MC00MHptMCA1NmMtOC44NCAwLTE2LTcuMTYtMTYtMTZzNy4xNi0xNiAxNi0xNiAxNiA3LjE2IDE2IDE2LTcuMTYgMTYtMTYgMTZ6Ii8+PHBhdGggZD0ibTQwOCA0MDhjLTIyLjA2IDAtNDAgMTcuOTQtNDAgNDBzMTcuOTQgNDAgNDAgNDAgNDAtMTcuOTQgNDAtNDAtMTcuOTQtNDAtNDAtNDB6bTAgNTZjLTguODQgMC0xNi03LjE2LTE2LTE2czcuMTYtMTYgMTYtMTYgMTYgNy4xNiAxNiAxNi03LjE2IDE2LTE2IDE2eiIvPjxwYXRoIGQ9Im00NDggMzc2aC0yOTUuNzdjLTIuNDI0LTIxLjE3MiAxNC4yNjQtNDAgMzUuNzctNDBoNjVjMS42NTcgMCAzLTEuMzQzIDMtM3YtNjZjMC0xLjY1Ny0xLjM0My0zLTMtM2gtODIuNThsLTMuMTQtMTZoODUuNzJjMS42NTcgMCAzLTEuMzQzIDMtM3YtNThjMC0xLjY1Ny0xLjM0My0zLTMtM2gtOTguMjRsLTMuMTMtMTZoMTAxLjM3YzEuNjU3IDAgMy0xLjM0MyAzLTN2LTY2YzAtMS42NTctMS4zNDMtMy0zLTNoLTExNS40NmwtNy4xNi0zNi42MWMtMi4yLTExLjIzLTEyLjEtMTkuMzktMjMuNTUtMTkuMzloLTEwLjgzdi04YzAtNC40MTgtMy41ODItOC04LThoLTYzLjQ1M2MtMTMuNDIyIDAtMjQuNzY2IDEwLjk4My0yNC41NDQgMjQuNDAyLjIxNiAxMy4wNDUgMTAuOTAxIDIzLjU5OCAyMy45OTcgMjMuNTk4aDY0YzQuNDE4IDAgOC0zLjU4MiA4LTh2LThoMTAuODNjMy44MSAwIDcuMTIgMi43MiA3Ljg1IDYuNDcuNDczIDIuNDE0IDUxLjM0IDI2Mi4zMTUgNTEuMzQgMjYyLjQyLTIyLjkwOSAxMC43MzctMzQuOTEgMzYuMzk3LTI4LjE2IDYwLjg5MS4wMzguMTg2LjE1NS41ODUuMi43MiA0Ljg4IDE2Ljc5MiAxOC4wMjEgMzAuMTAyIDM0LjcxNSAzNS4yMi45MDIuMjc3IDEuODYzLS4xNTEgMi4zMjEtLjk3NyAyMS42MjMtMzguOTgzIDc4LjcxMy0zOC4yMDIgOTguOTQ4IDIuMTQuMzQxLjY3OSAxLjAyNyAxLjExNyAxLjc4NyAxLjExN2g4MC4zMzhjLjc2IDAgMS40NDYtLjQzOCAxLjc4Ny0xLjExNyAyMC4wMDgtMzkuODc0IDc2LjYzLTQxLjUwMyA5OC43MTgtMi41NTEuNTQxLjk1NCAxLjczNCAxLjMzMyAyLjcuODEzIDIuMDM3LTEuMDk1IDMuOTI5LTIuNDk2IDUuNjE2LTQuMTc2IDE0Ljk1Ny0xNS4wMjQgNC40MzktNDAuOTctMTYuOTktNDAuOTd6Ii8+PHBhdGggZD0ibTM2NSA5NmgtOTBjLTEuNjU3IDAtMyAxLjM0My0zIDN2NjZjMCAxLjY1NyAxLjM0MyAzIDMgM2g5MGMxLjY1NyAwIDMtMS4zNDMgMy0zdi02NmMwLTEuNjU3LTEuMzQzLTMtMy0zeiIvPjxwYXRoIGQ9Im0zNjUgMTg0aC05MGMtMS42NTcgMC0zIDEuMzQzLTMgM3Y1OGMwIDEuNjU3IDEuMzQzIDMgMyAzaDkwYzEuNjU3IDAgMy0xLjM0MyAzLTN2LTU4YzAtMS42NTctMS4zNDMtMy0zLTN6Ii8+PHBhdGggZD0ibTM2NSAyNjRoLTkwYy0xLjY1NyAwLTMgMS4zNDMtMyAzdjY2YzAgMS42NTcgMS4zNDMgMyAzIDNoOTBjMS42NTcgMCAzLTEuMzQzIDMtM3YtNjZjMC0xLjY1Ny0xLjM0My0zLTMtM3oiLz48cGF0aCBkPSJtMzg0IDMzM2MwIDEuNjU3IDEuMzQzIDMgMyAzaDc2LjU3YzMuODcgMCA3LjE5LTIuNzcgNy44Ny02LjU4bDExLjE3Mi02MS44ODdjLjMzMi0xLjg0LTEuMDgyLTMuNTMzLTIuOTUyLTMuNTMzaC05Mi42NmMtMS42NTcgMC0zIDEuMzQzLTMgM3oiLz48cGF0aCBkPSJtMzg3IDI0OGg5Ni42MzNjMS40NTEgMCAyLjY5NS0xLjAzOSAyLjk1Mi0yLjQ2N2wxMC40NjctNThjLjMzMi0xLjg0LTEuMDgyLTMuNTMzLTIuOTUyLTMuNTMzaC0xMDcuMWMtMS42NTcgMC0zIDEuMzQzLTMgM3Y1OGMwIDEuNjU3IDEuMzQzIDMgMyAzeiIvPjxwYXRoIGQ9Im01MDQgOTZoLTExN2MtMS42NTcgMC0zIDEuMzQzLTMgM3Y2NmMwIDEuNjU3IDEuMzQzIDMgMyAzaDExMS4wNjNjMS40NTEgMCAyLjY5NC0xLjAzOSAyLjk1Mi0yLjQ2N2wxMC44NTUtNjAuMTEzYy44ODYtNC45MTktMi44OTItOS40Mi03Ljg3LTkuNDJ6Ii8+PC9nPjwvc3ZnPg=="
                  id="iconCard"
                  />
                </p>
              </div>
            </div>
        `;
    }
  });
  if (productsDiv.innerHTML == "") {
    productsDiv.innerHTML += `
            <article class="productsArt">
                Product not found...
            </article
        `;
  }
  window.scrollTo(0, 0);
};
/**
 * Category Row Zone
 */
const getCategories = async () => {
  const categories = await getData(baseUrl + allCategories);
  categories.forEach((item) => {
    navCat.innerHTML += `<button class="btn btn-light" onClick="showItems('${
      item.name
    }')">${item.name.toUpperCase()}</button>  `;
  });
};
/**
 *
 * Show products from categories
 */
const showItems = async (item) => {
  const data = await getData(baseUrl + productsFromCategory);
  const category = data.find((element) => element.name === item);
  productsDiv.innerHTML = "";
  category.products.forEach((item) => {
    productsDiv.innerHTML += `
            <div class="card pos" style="width: 18rem;">
              <img src="${item.url_image}" class="card-img-top" alt="Product">
              <div class="card-body">
                <p class="card-text">${item.name}</p>
                <hr>
                <p>$ ${calculatePrice(item.price, item.discount)}
                <img
                  src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTExLjk5OSA1MTEuOTk5IiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMS45OTkgNTExLjk5OSIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48cGF0aCBkPSJtMjI0IDQwOGMtMjIuMDYgMC00MCAxNy45NC00MCA0MHMxNy45NCA0MCA0MCA0MCA0MC0xNy45NCA0MC00MC0xNy45NC00MC00MC00MHptMCA1NmMtOC44NCAwLTE2LTcuMTYtMTYtMTZzNy4xNi0xNiAxNi0xNiAxNiA3LjE2IDE2IDE2LTcuMTYgMTYtMTYgMTZ6Ii8+PHBhdGggZD0ibTQwOCA0MDhjLTIyLjA2IDAtNDAgMTcuOTQtNDAgNDBzMTcuOTQgNDAgNDAgNDAgNDAtMTcuOTQgNDAtNDAtMTcuOTQtNDAtNDAtNDB6bTAgNTZjLTguODQgMC0xNi03LjE2LTE2LTE2czcuMTYtMTYgMTYtMTYgMTYgNy4xNiAxNiAxNi03LjE2IDE2LTE2IDE2eiIvPjxwYXRoIGQ9Im00NDggMzc2aC0yOTUuNzdjLTIuNDI0LTIxLjE3MiAxNC4yNjQtNDAgMzUuNzctNDBoNjVjMS42NTcgMCAzLTEuMzQzIDMtM3YtNjZjMC0xLjY1Ny0xLjM0My0zLTMtM2gtODIuNThsLTMuMTQtMTZoODUuNzJjMS42NTcgMCAzLTEuMzQzIDMtM3YtNThjMC0xLjY1Ny0xLjM0My0zLTMtM2gtOTguMjRsLTMuMTMtMTZoMTAxLjM3YzEuNjU3IDAgMy0xLjM0MyAzLTN2LTY2YzAtMS42NTctMS4zNDMtMy0zLTNoLTExNS40NmwtNy4xNi0zNi42MWMtMi4yLTExLjIzLTEyLjEtMTkuMzktMjMuNTUtMTkuMzloLTEwLjgzdi04YzAtNC40MTgtMy41ODItOC04LThoLTYzLjQ1M2MtMTMuNDIyIDAtMjQuNzY2IDEwLjk4My0yNC41NDQgMjQuNDAyLjIxNiAxMy4wNDUgMTAuOTAxIDIzLjU5OCAyMy45OTcgMjMuNTk4aDY0YzQuNDE4IDAgOC0zLjU4MiA4LTh2LThoMTAuODNjMy44MSAwIDcuMTIgMi43MiA3Ljg1IDYuNDcuNDczIDIuNDE0IDUxLjM0IDI2Mi4zMTUgNTEuMzQgMjYyLjQyLTIyLjkwOSAxMC43MzctMzQuOTEgMzYuMzk3LTI4LjE2IDYwLjg5MS4wMzguMTg2LjE1NS41ODUuMi43MiA0Ljg4IDE2Ljc5MiAxOC4wMjEgMzAuMTAyIDM0LjcxNSAzNS4yMi45MDIuMjc3IDEuODYzLS4xNTEgMi4zMjEtLjk3NyAyMS42MjMtMzguOTgzIDc4LjcxMy0zOC4yMDIgOTguOTQ4IDIuMTQuMzQxLjY3OSAxLjAyNyAxLjExNyAxLjc4NyAxLjExN2g4MC4zMzhjLjc2IDAgMS40NDYtLjQzOCAxLjc4Ny0xLjExNyAyMC4wMDgtMzkuODc0IDc2LjYzLTQxLjUwMyA5OC43MTgtMi41NTEuNTQxLjk1NCAxLjczNCAxLjMzMyAyLjcuODEzIDIuMDM3LTEuMDk1IDMuOTI5LTIuNDk2IDUuNjE2LTQuMTc2IDE0Ljk1Ny0xNS4wMjQgNC40MzktNDAuOTctMTYuOTktNDAuOTd6Ii8+PHBhdGggZD0ibTM2NSA5NmgtOTBjLTEuNjU3IDAtMyAxLjM0My0zIDN2NjZjMCAxLjY1NyAxLjM0MyAzIDMgM2g5MGMxLjY1NyAwIDMtMS4zNDMgMy0zdi02NmMwLTEuNjU3LTEuMzQzLTMtMy0zeiIvPjxwYXRoIGQ9Im0zNjUgMTg0aC05MGMtMS42NTcgMC0zIDEuMzQzLTMgM3Y1OGMwIDEuNjU3IDEuMzQzIDMgMyAzaDkwYzEuNjU3IDAgMy0xLjM0MyAzLTN2LTU4YzAtMS42NTctMS4zNDMtMy0zLTN6Ii8+PHBhdGggZD0ibTM2NSAyNjRoLTkwYy0xLjY1NyAwLTMgMS4zNDMtMyAzdjY2YzAgMS42NTcgMS4zNDMgMyAzIDNoOTBjMS42NTcgMCAzLTEuMzQzIDMtM3YtNjZjMC0xLjY1Ny0xLjM0My0zLTMtM3oiLz48cGF0aCBkPSJtMzg0IDMzM2MwIDEuNjU3IDEuMzQzIDMgMyAzaDc2LjU3YzMuODcgMCA3LjE5LTIuNzcgNy44Ny02LjU4bDExLjE3Mi02MS44ODdjLjMzMi0xLjg0LTEuMDgyLTMuNTMzLTIuOTUyLTMuNTMzaC05Mi42NmMtMS42NTcgMC0zIDEuMzQzLTMgM3oiLz48cGF0aCBkPSJtMzg3IDI0OGg5Ni42MzNjMS40NTEgMCAyLjY5NS0xLjAzOSAyLjk1Mi0yLjQ2N2wxMC40NjctNThjLjMzMi0xLjg0LTEuMDgyLTMuNTMzLTIuOTUyLTMuNTMzaC0xMDcuMWMtMS42NTcgMC0zIDEuMzQzLTMgM3Y1OGMwIDEuNjU3IDEuMzQzIDMgMyAzeiIvPjxwYXRoIGQ9Im01MDQgOTZoLTExN2MtMS42NTcgMC0zIDEuMzQzLTMgM3Y2NmMwIDEuNjU3IDEuMzQzIDMgMyAzaDExMS4wNjNjMS40NTEgMCAyLjY5NC0xLjAzOSAyLjk1Mi0yLjQ2N2wxMC44NTUtNjAuMTEzYy44ODYtNC45MTktMi44OTItOS40Mi03Ljg3LTkuNDJ6Ii8+PC9nPjwvc3ZnPg=="
                  id="iconCard"
                  />
                </p>
              </div>
            </div>
        `;
  });
};

//inputForm.addEventListener("keyup", filter);
//filter();
btnForm.addEventListener("click", async () => {
  if (!inputForm.value) return alert("You must write a word to search");
  const resp = await postData(baseUrl + searcher, inputForm.value);
  resp.forEach((item) => {
    console.log(item);
  });
});
getCategories();
