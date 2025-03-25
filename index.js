document.getElementById("recipe-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const imageInput = document.getElementById("image").files[0];

    if (!title || !description) {
        alert("Please enter a title and description.");
        return;
    }

    let imageURL = "";
    if (imageInput) {
        const reader = new FileReader();
        reader.readAsDataURL(imageInput);
        reader.onload = function () {
            imageURL = reader.result;
            saveRecipe(title, category, description, imageURL);
        };
    } else {
        saveRecipe(title, category, description, imageURL);
    }

    document.getElementById("recipe-form").reset();
});

function saveRecipe(title, category, description, imageURL) {
    let recipes = localStorage.getItem("recipes") || "";
    let newRecipe = `${title}|${category}|${description}|${imageURL};;`;
    localStorage.setItem("recipes", recipes + newRecipe);

    window.location.href = "recipes.html";
}
