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
      method: "POST",
      body: JSON.stringify({ word: word }),
      headers: {
        "Content-Type": "application/json",
      },
    })
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

//LOGIC ZONE

/**
 * Constant zone
 */
const inputForm = document.getElementById("inputForm");
const btnForm = document.getElementById("btn");
const productsDiv = document.getElementById("products");
const navCat = document.getElementById("categories");
/**
 * Discount Price
 */
const calculatePrice = (price, disc) => {
  if (disc == 0) return price;
  let discValue = eval((price * disc) / 100);
  return price - discValue;
};

/**
 * Category Button Zone
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
    print(item, productsDiv);
  });
  validateDiv(productsDiv);
};
/**
 * Show all products
 */
const showAllProducts = async () => {
  const products = await getData(baseUrl + allProducts);
  autocomplete(inputForm, products);
  productsDiv.innerHTML = "";
  products.forEach((item) => {
    print(item, productsDiv);
  });
  validateDiv(productsDiv);
};
/**
 *
 * PRINT ZONE
 */
const notFound = (div) => {
  div.innerHTML += `
            <article class="productsArt">
                Product not found...
            </article
        `;
};
const print = (item, div) => {
  div.innerHTML += `
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
};
/**
 * Validate div
 */
const validateDiv = (div) => {
  if (div.innerHTML == "") notFound(div);
};
/**
 * AUTOCOMPLETE ZONE
 */
const autocomplete = (inp, arr) => { 
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].name.substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
};
/**
 * MAIN ZONE
 */
showAllProducts();
getCategories();
btnForm.addEventListener("click", async () => {
  if (!inputForm.value) return alert("You must write a word to search");
  const resp = await postData(baseUrl + searcher, inputForm.value);
  productsDiv.innerHTML = "";
  resp.forEach((item) => {
    print(item, productsDiv);
  });
  validateDiv(productsDiv);
  window.scrollTo(0, 0);
  inputForm.value='';
});
