const apiKey = "kr846675498";

// Event Listener 
document.querySelector("#nameForm").addEventListener("submit", searchName);

// FUNCTION: Search Name 
async function searchName(event) {
    event.preventDefault();

    if (!validateName()) {
        return;
    }

    let name = document.querySelector("#name").value.trim();
    let exact = document.querySelector("#exact").checked ? "yes" : "no";

    let url = `https://www.behindthename.com/api/lookup.json?name=${name}&exact=${exact}&key=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        console.log(data);

        if (data.length === 0) {
            const results = document.querySelector("#results");
            results.textContent = "No name information found.";
            results.style.color = "red";
            return;
        }

        displayNameInfo(data[0]);
    }
    catch (error) {
        console.error(error);

        const results = document.querySelector("#results");
        results.textContent = "Unable to retrieve name information.";
        results.style.color = "red";   
    }
}

// FUNCTION: Validate Name Input 
function validateName() {
    let name = document.querySelector("#name").value.trim();
    let nameError = document.querySelector("#nameError");

    nameError.textContent = "";

    if (name.length < 2) {
        nameError.textContent = "Please enter a name with at least 2 letters.";
        nameError.style.color = "red";
        return false;
    }

    return true;
}

// FUNCTION: Display Name Information 
function displayNameInfo(nameData) {

    let results = document.querySelector("#results");

    let gender = "";

    if (nameData.gender === "m") {
        gender = "🪻 Male";
    }
    else if (nameData.gender === "f") {
        gender = "🌸 Female";
    }
    else {
        gender = "🌼 Unknown / Unisex";
    }

    let usages = "";

    for (let usage of nameData.usages) {
        usages += `<li>${usage.usage_full}</li>`;
    }

    results.innerHTML = `
    <div class="name-card">
        <h2>${nameData.name}</h2>
    
        <p><strong>Gender: </strong> ${gender}</p>
    
        <p><strong>Used In: </strong></p>
        
        <ul>
            ${usages}
        </ul>
    </div>
    `;
}