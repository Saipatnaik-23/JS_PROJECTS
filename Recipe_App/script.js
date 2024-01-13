let randomMeal = `https://www.themealdb.com/api/json/v1/1/random.php`;
let mealContainer = document.querySelector(".meal-container");
let content = document.querySelector(".afterClick");
let favItems = document.querySelector(".fav_items");
let searchBar = document.querySelector(".search");
let container=document.querySelector(".container");
let popUp=document.querySelector(".popup");

let searchTerm = " ";
let searchBtn = document.querySelector("#search_btn");
let searchInput = document.querySelector(".search_bar");

getRandomMeal();
fetchMeal();

async function getRandomMeal() {
    let randomMealRes = await fetch(randomMeal);
    // console.log(randomMealRes);
    let respData = await randomMealRes.json();
    // console.log(respData.meals[0]);
    let randomMealData=respData.meals[0];
    addMeal(randomMealData, true);
}

async function getMealById(id) {
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    // console.log(response);
    let resData = await response.json();
    // console.log(resData);
    let meal = resData.meals[0];
    return meal;
}

async function getMealBySearch()
{
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    let respData=await response.json();
    // console.log(respData);
    let meals= respData.meals;
    console.log(meals);
     return meals;
}



function addMeal(randomMealData, random = false) {
    let meal = document.createElement("div");
    meal.classList.add("meals");
    meal.innerHTML = `
   ${random ? `<span class="random">
               Random recipe
              </span>`: " "}
              <span class="heart"><i class="fa-solid fa-heart"></i></span>
   <img src="${randomMealData.strMealThumb}" alt="${randomMealData.strMeal}" class="randomImg">
   <div class="rating_box">
       <h3>${randomMealData.strMeal}</h3>
       <div class="stars">
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
       </div>
   </div>`
    mealContainer.appendChild(meal);

    let mealImg=document.querySelector(".randomImg");
    mealImg.addEventListener("click",()=>
    {
        container.style.display="none";
        updatemeal(randomMealData);
        popUp.style.display="block";
       let exitBtn=document.querySelector(".exit_btn");
       exitBtn.addEventListener("click",()=>
       {
        container.style.display="block";
        popUp.style.display="none";
        popUp.innerHTML=" ";
       })
    })
    let stars = document.querySelectorAll(".fa-star");
    stars.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("yellow");
        });
    });


    let favoriteBtn = document.querySelector(".heart i");
    favoriteBtn.addEventListener("click", () => {

        if (favoriteBtn.classList.contains("active")) {
            removeMealLs(randomMealData.idMeal);
            favoriteBtn.classList.remove("active");
        } else {
            addMealLs(randomMealData.idMeal);
            favoriteBtn.classList.add("active");
        }
       
        fetchMeal();
    })


}

function updatemeal(randomMealData)
{


    let ingredients=[];
    for (let i = 1; i <= 20; i++) {
        if (randomMealData["strIngredient" + i]) {
            ingredients.push(
                `${randomMealData["strIngredient" + i]} - ${
                    randomMealData["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }

       let afterClick=document.createElement("div");
       afterClick.classList.add("afterClick");
       afterClick.innerHTML=
                            `<div class="img_container">
                            <img src="${randomMealData.strMealThumb}" alt="${randomMealData.strMeal}" class="img_afterclick">
                        </div>
                        <div class="information">
                            <div class="meal_box">
                                <h3 class="mealName">${randomMealData.strMeal}</h3>
                                <button class="exit_btn"><i class="fa-solid fa-right-from-bracket" id="exit"></i></button>
                            </div>
                            <div class="instructions">
                                <h4>${randomMealData.strInstructions}</h4>
                            </div>
            
            
                            <h3 class="heading">Requirements</h3>
                            <div class="things">
                                <div class="ingredients">
                                    <ul>
                                    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
                                        
                                    </ul>    
                                
                               
                                </div>
                        </div>
                        <div class="link">
                            <h3 class="links">Links</h3>
                            <a href="${randomMealData.strYoutube}"><i class="fa-brands fa-youtube"></i></a>
                            <a href="${randomMealData.strSource}"><i class="fa-solid fa-circle-info" ></i></a>
                        </div>
                    </div>
                            `
       popUp.appendChild(afterClick);
    }
function addMealLs(mealId) {

    let mealIds = getMealsLs();
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
    //    console.log(x);
}
function removeMealLs(mealId) {
    let mealIds = getMealsLs();
    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));
    // console.log(x);
}
function getMealsLs() {
    let mealIds = JSON.parse(localStorage.getItem("mealIds"));
    // console.log(mealIds);
    return mealIds === null ? [] : mealIds;
}

async function fetchMeal() {
    let favContainer = document.querySelector(".fav_items");
    favContainer.innerHTML = " ";
    let mealIds = getMealsLs();
    // console.log(mealIds);
    let meals = [];
    for (let i = 0; i < mealIds.length; i++) {
        let mealId = mealIds[i];
        let meal = await getMealById(mealId);
        addMealFav(meal);
    }
    // console.log(meals);

}

function addMealFav(mealData) {
    let favContainer = document.querySelector(".fav_items");
    let mealList = document.createElement("ul");
    mealList.classList.add("fav_meals");
    mealList.innerHTML = `<li>
                           <button class="delete"><i class="fa-solid fa-xmark" id="delete" ></i></button>
                           <img src="${mealData.strMealThumb}" class="img" alt="${mealData.strMeal}">
                           <p>${mealData.strMeal}</p>
                         </li>`;

    let deleteBtn = mealList.querySelector("#delete");
    deleteBtn.addEventListener("click", () => {
        let favoriteBtn = document.querySelector(".heart i");
        favoriteBtn.style.color = "rgb(117, 117, 117)"
        console.log("delete");
        removeMealLs(mealData.idMeal);
        fetchMeal();
    })

    favContainer.appendChild(mealList);
    let favImg=document.querySelector(".img");
    favImg.addEventListener("click",()=>
    {
        container.style.display="none";
        updatemeal(mealData);
        popUp.style.display="block";
       let exitBtn=document.querySelector(".exit_btn");
       exitBtn.addEventListener("click",()=>
       {
        container.style.display="block";
        popUp.style.display="none";
        popUp.innerHTML=" ";
       })
    })
}

searchBtn.addEventListener("click",async()=>
{

   mealContainer.innerHTML=" "; // clean the container
   searchTerm=searchInput.value;
//    console.log(await getMealBySearch(searchTerm));
   let meals=await getMealBySearch(searchTerm);
//    console.log(meals);
   
   if(meals)
   {
    meals.forEach(meal => {
        addMeal(meal);
   });
   }
   

})
