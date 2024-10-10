
let meals = new Array();

let ingredient = new Array();


const result = document.getElementById("result");

const form = document.querySelector("form");

const input = document.getElementById("serch");

let api = 'https://www.themealdb.com/api/json/v1/1/search.php?s='



async function fetchMeals(meal) {
    
    await fetch(api + meal)
    .then((res) =>res.json())
    .then(data => meals = data.meals);

    console.log(meals[0].strMeal);
}


function mealsDisplay() {
    if(meals == null) {
        result.innerHTML = "<h2> Aucun résultat</h2>";
    } else {
        meals.length = 12

        result.innerHTML = meals.map(
            (repas) => {
                for(i = 1; i < 21; i++) {
                    if(repas[`strIngredient${i}`]) {
                        let ing = repas[`strIngredient${i}`];
                        let qt = repas[`strMeasure${i}`];
                        ingredient.push(`<li>${ing}  -  ${qt}</li>`);
                    }

                    //on ne peut pas accéder à repas.strIngredient1 et 2
                    // avec cette syntaxe js propose
                    // une syntaxe particulière pour les objets
                }

                return `
                <li class="card">
                    <h2>${repas.strMeal}</h2>
                    <p>${repas.strArea}</p>
                    <img src="${repas.strMealThumb}" alt="photo ${repas.strMeal}"/>
                    <ul>
                        ${ingredient.join("")}
                    </ul>
                </li>
                    `  ;
            } 
                
        ).join("");
    }
}

input.addEventListener("input", (e) => {
    fetchMeals(e.target.value);
});



form.addEventListener("submit", (e) => {
    e.preventDefault();
    mealsDisplay();
})

//cette logique permet d'obtenir des plats juste 
//lorsque on valide l'aliment

