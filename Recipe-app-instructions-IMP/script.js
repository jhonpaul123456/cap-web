const searchBtn = document.querySelector('.btn-search-meal');
const searchInput = document.getElementById('search-box');
const menuList = document.querySelector('.snippets-results-list');

//NEW
const form = document.querySelector('form');

let searchText = '';
//modal
const modalDetails = document.querySelector('.meal-details-content');
const modalClose = document.querySelector('.recipe-close-btn');
// searchBtn.addEventListener('click', (e) => {
//     fetchMealList();                                                  OLD
// })

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchText = e.target.querySelector('#search-box').value;
    console.log(searchText);
    fetchAPI();
})


menuList.addEventListener('click', (e) => {
    fetchDetails(e);
})

modalClose.addEventListener('click', (e) => { 
    modalDetails.parentElement.classList.remove('showRecipe');
})

function fetchAPI() {
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchText}&apiKey=b325a7eeef4a4dcb98d0a7399c188596&number=35`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let jsx = '';
        if(data) {
            data.forEach(menu => {
                jsx += 
                `
                <div class="snippets-item" data-id=${menu.id}>
                <div class="snippets-img">
                        <img src="${menu.image}" alt="food">
                </div>
                <div class="snippets-content">
                    <div class="snippets-content-title">
                        <h1>${menu.title}</h1>
                        <a href="#" class="btn recipe-btn">View Details</a>
                    </div>
                </div>
            </div>
                
                `
            })
        }
        menuList.innerHTML = jsx;
    })
}


function fetchDetails(e) {
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let menuList = e.target.parentElement.parentElement.parentElement
         fetch(`https://api.spoonacular.com/recipes/${menuList.dataset.id}/information?&apiKey=b325a7eeef4a4dcb98d0a7399c188596`)
        .then(response => response.json())
        .then(data => menuModal(data))
    }
 }
//  menuModal(data)
function menuModal(menu) {
    console.log(menu)
    data = [0];
    if(!menu.diets === 0) {
        `<small>${menu.diets}</small>`
    }else {
        `<small>No diets</small>`
    }

  
    let modalJSX = 

    `

    
    <div class="details-first-section">
    <div class="first-section-title">
        <div class="title">
            <h1>${menu.title}</h3>
        </div>
       
        <h4>Dishtype:${menu.dishTypes}</h4> </h4>
    </div>
    <div class="first-section-img">
        <div class="img-wrapper">
            <img src="${menu.image}" alt="">
        </div>
        <div class="add-details-wrapper">
            <div class="stat-reviews">
                <div class="dietary">
                    <small>Dietary Type: ${menu.diets}</small>
                </div>
                <div class="likes">
                <small>Aggregate Likes: ${menu.aggregateLikes} <i class="fas fa-thumbs-up"></i></small>
                </div>
            </div>
         
        </div>
    </div>
</div>

 <!-- second details -->
 <div class="details-second-section">
    <div class="instructions">
        <h1>Instructions</h1>
        <li>${menu.analyzedInstructions[0].steps.map(x=> x.step).join('<br>')}</li>
        
    </div>
    <div class="time-ready">
        <div class="clock">
        <i class="fas fa-utensils"></i>
        <h3>No. of Servings: ${menu.servings}</h3>
        </div>
        <div class="price">
            <i class="fas fa-dollar-sign"></i>
            <h3>Price per Servings: ${menu.pricePerServing}</h3>
        </div>
    </div>
</div>

<!-- thid details -->

<div class="recipe-details">
    <div class="recipe-list">
    <h1>Ingredients</h1>
    <li>${menu.extendedIngredients.map(ingredient => ingredient.originalString).join('<br>')}</li>
   
  
    </div>
</div>
</div>
    
    `
    modalDetails.innerHTML = modalJSX;
    modalDetails.parentElement.classList.add('showRecipe');
}