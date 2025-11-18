/* STEP 2: Reference the HEADER and the SECTION elements with variables */
const header = document.querySelector('header');
const section = document.querySelector('section');


// STEP 3a: Create the asynchronous function populate()
async function populate() {

    // STEP 4: Store the URL of a JSON file in a variable
    const requestURL = 'https://github.com/AnthonyBurgic1/ClientSideJavaScriptLab4/blob/main/js/i-scream.json';

    // STEP 5: Use the new URL to create a new request object
    const request = new Request(requestURL);

    // STEP 6: Make a network request
    const response = await fetch(request);

    // STEP 7: Convert to JSON
    const jsonObj = await response.json();

    console.log(jsonObj);

    // STEP 9a: Populate header
    populateHeader(jsonObj);

    // STEP 10a: Populate flavors
    showTopFlavors(jsonObj);
};

// STEP 3b: Call populate()
populate();


/* STEP 9b: Build populateHeader() */
function populateHeader(jsonObj) {
    const h1 = document.createElement('h1');
    h1.textContent = jsonObj.companyName;

    header.appendChild(h1);
};


/* STEP 10b: Assemble showTopFlavors() */
function showTopFlavors(jsonObj) {

    let topFlavors = jsonObj.topFlavors;

    for (let i = 0; i < topFlavors.length; i++) {

        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const ul = document.createElement('ul');
        const img = document.createElement('img');

        // Name
        h2.textContent = topFlavors[i].name;

        // Calories
        p.textContent = `Calories: ${topFlavors[i].calories}`;

        // Images
        img.src = topFlavors[i].image;
        img.alt = topFlavors[i].name;

        // Set calorie color
        if (topFlavors[i].calories < 200) {
            p.style.color = "green";
        } else if (topFlavors[i].calories <= 280) {
            p.style.color = "orange";
        } else {
            p.style.color = "red";
        }

        // Backgrounds by type
        const type = topFlavors[i].type;
        article.dataset.type = type;

        const typeColors = {
            classic: "#e6f7ff",
            premium: "#fff4cc",
            limited: "#ffe6f2",
            special: "#f3e8ff"
        };

        article.style.background = typeColors[type] || "#ffffff";

        // Ingredients
        const ingredients = topFlavors[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
            const li = document.createElement('li');
            li.textContent = ingredients[j];
            ul.appendChild(li);
        }

        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(img);
        article.appendChild(ul);

        section.appendChild(article);
    }
};
