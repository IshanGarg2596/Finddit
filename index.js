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

