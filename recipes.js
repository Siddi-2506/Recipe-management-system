function loadRecipes() {
    let recipes = localStorage.getItem("recipes") || "";
    let recipeArray = recipes.split(";;").filter(recipe => recipe.trim() !== "");

    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    recipeArray.forEach(recipe => {
        let [title, category, description, imageURL] = recipe.split("|");

        let recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            ${imageURL ? `<img src="${imageURL}" alt="Recipe Image">` : ""}
            <h3>${title}</h3>
            <p><strong>Category:</strong> ${category}</p>
            <p>${description}</p>
            <button class="delete-btn" onclick="deleteRecipe('${title}')">Delete</button>
        `;

        recipeList.appendChild(recipeCard);
    });
}

function deleteRecipe(title) {
    let recipes = localStorage.getItem("recipes") || "";
    let recipeArray = recipes.split(";;").filter(recipe => recipe.trim() !== "");
    let updatedRecipes = recipeArray.filter(recipe => !recipe.startsWith(title + "|")).join(";;");

    localStorage.setItem("recipes", updatedRecipes);
    loadRecipes();
}

loadRecipes();
