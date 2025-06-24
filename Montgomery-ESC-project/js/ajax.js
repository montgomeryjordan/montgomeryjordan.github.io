/* 
Function: fetchQuote
Description: This function fetches a random motivational quote using the Quotable API
and displays it in the #quoteContainer div on the homepage (index.html)
*/

document.addEventListener('DOMContentLoaded', () => {
    const quoteContainer = document.getElementById('quoteContainer');
    const quoteButton = document.getElementById('getQuote');

    quoteButton.addEventListener('click', () => {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                quoteContainer.innerHTML = `
                    <p>"${data.content}"</p>
                    <small>- ${data.author}</small>
                `;
            })
            .catch(error => {
                quoteContainer.innerHTML = `<p>Error loading quote. Please try again later.</p>`;
                console.error('Error:', error);
            });
    });
});
