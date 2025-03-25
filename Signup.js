document.getElementById('toggle-link').onclick = function () {
    document.getElementById('login-box').classList.toggle('hidden');
    document.getElementById('signup-box').classList.toggle('hidden');
};

document.getElementById('toggle-link-2').onclick = function () {
    document.getElementById('login-box').classList.toggle('hidden');
    document.getElementById('signup-box').classList.toggle('hidden');
};

// Validate and Redirect for Login
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();

    if (email && password) {
        window.location.href = "index.html"; // Redirect if all fields are filled
    } else {
        alert("Please fill in all fields.");
    }
});

// Validate and Redirect for Signup
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    let name = document.getElementById("signup-name").value.trim();
    let email = document.getElementById("signup-email").value.trim();
    let password = document.getElementById("signup-password").value.trim();

    if (name && email && password) {
        window.location.href = "index.html"; // Redirect if all fields are filled
    } else {
        alert("Please fill in all fields.");
    }
});
