
// Min OpenAI API key
const apiKey1 = "";
// Rasmus OpenAI API key
const apiKey2 = "";

// DOM elements
const planetSelect = document.querySelector('#planetary-objects');
const getFactsBtn = document.querySelector('.get-facts');
const responseDiv = document.querySelector('#response');
const loadingSpan = document.querySelector('.loader');

//


// Event listener for button
getFactsBtn.addEventListener('click', () => {
    // Show the loading span
    loadingSpan.classList.remove('hidden');
    // Clear the response div
    responseDiv.innerHTML = '';
    // Disable the button
    getFactsBtn.disabled = true;
    // Disable select
    planetSelect.disabled = true;
    // Create a data object
    const data = {
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user',
            content: `Please provide me with 5 facts about the following object in our solar system: ${planetSelect.value}`
        }]
    };
    // Fetch the data from the API
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey2}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // Log the response in the console
            console.log(data.choices[0].message.content);
            // Create a span element and append it to the response div
            const span = document.createElement('span');
            span.innerText = data.choices[0].message.content;
            responseDiv.append(span);
            // Hide the loading span and enable the button and select
            loadingSpan.classList.add('hidden');
            getFactsBtn.disabled = false;
            planetSelect.disabled = false;
        });

});


