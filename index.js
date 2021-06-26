import reddit from './RedditAPI';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');


// Form Event Listner
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    // Get search term
    const searchTerm = searchInput.value;

    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;

    // Get limit
    const searchLimit = document.querySelector('#limit').value;

    // Check input 
    if(searchTerm === '' ){
        // Show message 
        showMessage('Please add a search term', 'alert-danger');
    }

    // Clear input
    searchInput.value = " ";

    // Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        let output = '<div class="card-columns">';
        results.forEach(post => {
            //Check for image
            const image = post.preview ? post.preview.images[0].source.url : 'https://rdwgroup.com/wp-content/uploads/2018/10/reddit2-800x450-1.png';

            output += `
            <div class="card">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${truncateText(post.selftext, 100)}</p>
                <a href="${post.url}" class="btn btn-primary">Read More</a>
                <hr>
                <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                <span class="badge badge-dark">Score: ${post.score}</span>
                </div>
            </div>
            `;
        });
        output += '</div>';

        document.querySelector('#results').innerHTML = output;
    });

});


//Show Message
function showMessage(message, className){
    // Create div
    const div = document.createElement('div');
    // Add Classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent 
    const searchContainer = document.querySelector('#search-container');
    // Get search
    const search = document.querySelector('#search');

    // Insert message
    searchContainer.insertBefore(div, search);

    // Timeout Alert
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}

//Truncate text
function truncateText(text, limit){
    const shortened = text.indexOf(' ', limit);
    if(shortened === -1) return text;
    return text.substring(0,shortened);
}