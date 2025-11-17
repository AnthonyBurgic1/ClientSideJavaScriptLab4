/* STEP 2: Reference the HEADER and the SECTION elements with variables */
const header = document.querySelector('header');
const section = document.querySelector('section');


// STEP 3a: Create the asynchronous function populate()
async function populate() {

    // Introducing JavaScript Object Notation (JSON): https://json.org/
    // STEP 4: Store the URL of a JSON file in a variable */
    const requestURL = 'js/iScream.json';

    // STEP 5: Use the new URL to create a new request object
    const request = new Request(requestURL);

    // STEP 6: Make a network request with the fetch() function, which returns a Response object
    const response = await fetch(request);

    // STEP 7: Capture the returned Response object and covert to a JSON object using json()
    const jsonObj = await response.json();

    // STEP 8: Output the iScream JSON object to the console 
    console.log(jsonObj);

    // STEP 9a: Invoke the populateHeader function here, then build it below
    populateHeader(jsonObj);

    // STEP 10a: Invoke the showTopFlavors function here, then build it below
    showTopFlavors(jsonObj);

};

// STEP 3b: Call the populate() function
populate();


/* STEP 9b: Build out the populateHeader() function */
function populateHeader(jsonObj) {
    // Create the H1 element
    const h1 = document.createElement('h1');
    
    // Grab the company name from the JSON object and use it for the text node
    h1.textContent = jsonObj.companyName;
    
    // Inject the complete H1 element into the DOM, inside the HEADER
    header.appendChild(h1);
};


/* STEP 10b: Assemble the showTopFlavors() function */
function showTopFlavors(jsonObj) {
    // STEP 10c: Attache the JSON topFlavors object to a variable
    let topFlavors = jsonObj.topFlavors;

    // STEP 10d: Loop through the topFlavors object
    for (let i = 0; i < topFlavors.length; i ++) {

        // STEP 10e: build HTML elements for the content
        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const ul = document.createElement('ul');

        // NEW → image element
        const img = document.createElement('img'); 

        // STEP 10f: Set the textContent property for each of the above elements (except the UL), based on the JSON content
        h2.textContent = topFlavors[i].name;
        p.textContent = `Calories: ${topFlavors[i].calories}`;

        // NEW → add the image from JSON  
        img.src = topFlavors[i].image;
        img.alt = topFlavors[i].name;

        // NEW → something interesting with calories  
        if (topFlavors[i].calories < 200) {
            p.style.color = "green"; // low calories
        } else if (topFlavors[i].calories <= 280) {
            p.style.color = "orange"; // medium calories
        } else {
            p.style.color = "red"; // high calories
        }

        // NEW → something interesting with type  
        article.dataset.type = topFlavors[i].type;  
        if (topFlavors[i].type === "classic") {
            article.style.background = "#e6f7ff";
        } else if (topFlavors[i].type === "premium") {
            article.style.background = "#fff4cc";
        } else if (topFlavors[i].type === "limited") {
            article.style.background = "#ffe6f2";
        } else if (topFlavors[i].type === "special") {
            article.style.background = "#f3e8ff";
        }

        // STEP 10g: Build a loop for the ingredients array in the JSON
        const ingredients = topFlavors[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
            const li = document.createElement('li');
            // add the ingredient to the UL
            li.textContent = ingredients[j];
            ul.appendChild(li);
        }
        
    // STEP 10h: Append each of the above HTML elements to the ARTICLE element
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(img); // NEW
        article.appendChild(ul);

        // STEP 10i: Append each complete ARTICLE element to the SECTION element
        section.appendChild(article);
    };
};