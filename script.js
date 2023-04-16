const searchBtn = document.querySelector(".btn");
const inputField = document.getElementById("searchInput");


//this is code for getmeals from api


//this function for keypress
const mealInput = document.getElementById('searchInput');

mealInput.addEventListener('input', function() {
  getMeals();
});


//this is the code clcik search button
searchBtn.addEventListener("click", getMeals);

function getMeals(){
    let searchInputTxt = document.querySelector(".input-search").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
      .then(response => response.json())
      .then(data => {
        let mealList = document.querySelector('.meal-card');
        let html = "";
        if(data.meals){
            data.meals.forEach(meal =>{
                html +=
                 `<div class="meal-item" data-id="${meal.idMeal}">
                 <div class="meal-image">
                    <img src="${meal.strMealThumb}">
                    <figcaption><h5>"${meal.strMeal}"</h5></figcaption>
                 </div>
                 <div class="meal-btn">
                    <button id="btn1" class="view-D btn btn-gradient">View Details</button>
                    <button id="btn2" class="add-F btn btn-gradient">Add Favorite</button>
                 </div>
              </div>
              `
            })
        }
        else{
            let resultBody = document.querySelector('.result-body');
            resultBody.innerHTML = `<h1 class="resultBodyHeading d-flex justify-content-center align-item-center mt-4 p-4">No Result Found</h1>`;
        }
            mealList.innerHTML = html;
    })
      
}
  

//function for view details
const mealListContent = document.querySelector(".meal-details");
const mealList = document.querySelector(".meal-card");

mealList.addEventListener("click", viewdetails);

function viewdetails(event) {
    event.preventDefault();
  
    // console.log(event.target);
    if (event.target.classList.contains("view-D")) {
      let mealItem = event.target.parentElement.parentElement;
      
    //   console.log(mealItem);
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals[0]))  
    }
  }
  

//this is function for result body
function mealRecipeModal(meal) {
  let html = `   <button class="meal-close-btn btn-close">
                 </button>
    <div class="meal-details-content">
            <div  class="meal-details-head">
                <h2>"${meal.strMeal}"</h2>
                <p>"${meal.strCategory}"</p>
            </div>
            <div class="meal-detail-instruction">
                <h3>Instruction</h3>
                <p>"${meal.strInstructions}"</p>
            </div>
            <div class="meal-details-img">
                <img src="${meal.strMealThumb}">
            </div>
            <div class="meal-details-link">
                <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>
    </div> `;

  mealListContent.innerHTML = html;
  mealListContent.classList.add("meal-details");
  document.querySelector(".meal-details").style.display = "block";


  // this code is for close button
const closeBtn = document.querySelector('.btn-close');

if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    mealListContent.classList.remove('meal-details');
    mealListContent.innerHTML = "";
  });
}
}


  
//show favorite page
const favoritePage = document.querySelector(".favorite-page")
const favoriteLink = document.getElementById("favorite-link");

favoriteLink.addEventListener("click", function(event) {
    console.log("Favorite link clicked");
    showFavoritePage();
});

function showFavoritePage() {
    console.log(favoritePage);
    console.log("Showing favorite page");

    favoritePage.classList.contains("favorite-page");
    favoritePage.style.display = "block";

}


//hide for favorite page
const favoriteLinkBack = document.querySelector("#favorite-back-link");
console.log(favoriteLinkBack);

favoriteLinkBack.addEventListener("click", hideFavoritePage);

function hideFavoritePage() {
    console.log(favoritePage);
    console.log("Hiding favorite page");

    favoritePage.classList.contains("favorite-page");
    favoritePage.style.display = "none";
}



//this is code for add favorite button

const favoritePageBody = document.querySelector(".favorite-page-body");
mealList.addEventListener('click', addFavorite);
const retrievedItem='';
let parsedItem = '';


function addFavorite(event){
  event.preventDefault();

  if (event.target.classList.contains("add-F")) {
    let mealItem = event.target.parentElement.parentElement;
    console.log("addToFav function triggered");
    console.log(mealItem);

    confirm('Do you want to Add to Favorites');

    //console.log(mealItem);

    let meal_image = mealItem.firstElementChild.firstElementChild;
    let meal_caption = mealItem.firstElementChild.lastElementChild.firstElementChild;

    // Get meal data
    let meal = {
      strMealThumb: meal_image.src,
      strMealName: meal_caption.textContent
    };

    console.log(meal)

   // Save to local storage
    let mealItemLocal = JSON.stringify(meal);
    localStorage.setItem('items', mealItemLocal);

    mealItemListed(parsedItem);
  }
}




function loadFavorites() {
  // Get from local storage
  let retrievedItem = localStorage.getItem('items');
  if (retrievedItem !== null) {
    
    let parsedItem = JSON.parse(retrievedItem);
    console.log(parsedItem);
    // Add to favorite page
    mealItemListed(parsedItem);
  }
}



// this is code for meal item listed to favorite page body
function mealItemListed(meal) {

    let retrievedItem = localStorage.getItem('items');
    let parsedItem = JSON.parse(retrievedItem);
    console.log(parsedItem);


  const mealHTML = `
    <div class="favorite-page-item">
      <img src="${parsedItem.strMealThumb}">
      <div class="favorite-page-item-right">
        <figcaption>${parsedItem.strMealName}</figcaption>
        <div class="favorite-page-button">
          <i class="bi bi-heart-fill">&nbsp;Like</i>
          <a class = "removedItem"><i class="bi bi-trash-fill" id="removeItem">&nbsp;Remove</i></a>
        </div>    
      </div>
    </div>
  `;

  const newMealItem = document.createElement("div");
  newMealItem.innerHTML = mealHTML;
  favoritePageBody.appendChild(newMealItem);
}
loadFavorites();


//this is code for meal item remove from listed inside page favorite body
function mealItemListed(meal) {

  let retrievedItem = localStorage.getItem('items');
  let parsedItem = JSON.parse(retrievedItem);
  console.log(parsedItem);


  const mealHTML = `
    <div class="favorite-page-item">
      <img src="${parsedItem.strMealThumb}">
      <div class="favorite-page-item-right">
        <figcaption>${parsedItem.strMealName}</figcaption>
        <div class="favorite-page-button">
          <a class="like"><i class="bi bi-heart-fill">&nbsp;Like</i></a>
          <a class="removedItem"><i class="bi bi-trash-fill" id="removeItem">&nbsp;Remove</i></a>
        </div>    
      </div>
    </div>
  `;

  const newMealItem = document.createElement("div");
  newMealItem.innerHTML = mealHTML;
  favoritePageBody.appendChild(newMealItem);

  const removeBtn = newMealItem.querySelector(".removedItem");
  removeBtn.addEventListener("click", function(event) {
    event.preventDefault();

    confirm('Do you want to remove Favorite')

    const mealToRemove = event.target.closest(".favorite-page-item");
    const mealName = meal.strMealName;
    localStorage.removeItem(mealName);
    mealToRemove.remove();
  });
}



  //this is code for go back to home page
  const searchHeaderLeft = document.querySelector('.search-headr-left');
  searchHeaderLeft.addEventListener('click', function(event) {
    
    event.preventDefault();
    location.reload();
    searchHeaderLeft.style.color = 'orange';
  });
  
