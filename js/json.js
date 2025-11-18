/* STEP 2: Reference the HEADER and the SECTION elements with variables */
const header = document.querySelector('header');
const section = document.querySelector('section');


// STEP 3a: Create the asynchronous function populate()
async function populate() {

    // STEP 4: Store the URL of a JSON file in a variable (RAW GitHub!)
    const requestURL = 'https://raw.githubusercontent.com/AnthonyBurgic1/ClientSideJavaScriptLab4/main/js/i-scream.json';

    // STEP 5: Create the request object \\ 
    const request = new Request(requestURL);

    // STEP 6: Make a network request \\ 
    const response = await fetch(request);

    // STEP 7: Convert the response to JSON \\ 
    const jsonObj = await response.json();

    console.log(jsonObj);

    // STEP 9a: Populate header \\ 
    populateHeader(jsonObj);

    // STEP 10a: Populate flavors \\ 
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

        // Name \\ 
        h2.textContent = topFlavors[i].name;

        // Calories \\ 
        p.textContent = `Calories: ${topFlavors[i].calories}`;

        // Images \\ 
        const img = document.createElement('img');
        img.src = topFlavors[i].image;
        img.alt = topFlavors[i].name;

        // Calorie color coding \\ 
        if (topFlavors[i].calories < 200) {
            p.style.color = "green";
        } else if (topFlavors[i].calories <= 280) {
            p.style.color = "orange";
        } else {
            p.style.color = "red";
        }

        // Background color by type \\ 
        const typeColors = {
            classic: "#e6f7ff",
            premium: "#fff4cc",
            limited: "#ffe6f2",
            special: "#f3e8ff"
        };
        article.style.background = typeColors[topFlavors[i].type] || "#ffffff";

        // Ingredients \\ 
        const ingredients = topFlavors[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
            const li = document.createElement('li');
            li.textContent = ingredients[j];
            ul.appendChild(li);
        }

        // APPEND ELEMENTS TO ARTICLE \\ 
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(img);
        article.appendChild(ul);

        section.appendChild(article);
    }
};