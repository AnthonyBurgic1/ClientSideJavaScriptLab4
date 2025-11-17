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
