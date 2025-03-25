function loadRecipes() {
    const recipes = localStorage.getItem("recipes") || "";
    const recipeList = document.getElementById("recipe-list");
    const categoryFilter = document.getElementById("category-filter").value;

    recipeList.innerHTML = "";

    const categories = new Set(["All Categories"]);

    recipes.split(";;").filter(r => r.trim()).forEach(recipe => {
        const [title, category, description, imageURL] = recipe.split("|");

        if (category) categories.add(category);

        if (categoryFilter === "all" || category === categoryFilter) {
            const recipeBox = document.createElement("div");
            recipeBox.className = "recipe-box";
            recipeBox.innerHTML = `
                ${imageURL ? `<img src="${imageURL}" alt="Recipe Image">` : ""}
                <h3>${title}</h3>
                <p><strong>Category:</strong> ${category}</p>
                <p>${description}</p>

                <!-- Rating Section -->
                <div class="rating" data-title="${title}">
                    <span onclick="rateRecipe(this, 1)">★</span>
                    <span onclick="rateRecipe(this, 2)">★</span>
                    <span onclick="rateRecipe(this, 3)">★</span>
                    <span onclick="rateRecipe(this, 4)">★</span>
                    <span onclick="rateRecipe(this, 5)">★</span>
                </div>

                <!-- Comment Section -->
                <div class="comment-box">
                    <textarea id="comment-${title}" placeholder="Leave a comment..."></textarea>
                    <button onclick="submitComment('${title}')">Submit</button>
                    <p><strong>Comments:</strong></p>
                    <div id="comments-${title}"></div>
                </div>
            `;

            recipeList.appendChild(recipeBox);
            loadRatings(title);
            loadComments(title);
        }
    });

    if (categoryFilter === "all") {
        const dropdown = document.getElementById("category-filter");
        dropdown.innerHTML = "";
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.toLowerCase();
            option.textContent = cat;
            dropdown.appendChild(option);
        });
    }
}

function rateRecipe(element, rating) {
    const parent = element.parentElement;
    const recipeTitle = parent.getAttribute("data-title");

    localStorage.setItem(`rating-${recipeTitle}`, rating);
    highlightStars(parent, rating);
}

function highlightStars(parent, rating) {
    parent.querySelectorAll("span").forEach((star, index) => {
        star.classList.toggle("active", index < rating);
    });
}

function loadRatings(title) {
    const rating = localStorage.getItem(`rating-${title}`);
    if (rating) {
        const ratingDiv = document.querySelector(`.rating[data-title="${title}"]`);
        if (ratingDiv) highlightStars(ratingDiv, parseInt(rating));
    }
}

function loadComments(title) {
    const commentsDiv = document.getElementById(`comments-${title}`);
    const storedComments = localStorage.getItem(`comments-${title}`) || "";
    commentsDiv.innerHTML = storedComments.split(";;").filter(c => c).map(c => `<p>${c}</p>`).join("");
}

function submitComment(title) {
    const commentBox = document.getElementById(`comment-${title}`);
    const comment = commentBox.value.trim();

    if (comment) {
        const storedComments = localStorage.getItem(`comments-${title}`) || "";
        const updatedComments = storedComments ? storedComments + ";;" + comment : comment;
        localStorage.setItem(`comments-${title}`, updatedComments);
        loadComments(title);
        commentBox.value = "";
    }
}

loadRecipes();
