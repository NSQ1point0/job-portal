const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.listing-container');

filters.forEach(function(filter) {
    filter.addEventListener('change', function(event) {
        const checkedFilters = document.querySelectorAll('.filter:checked');

        // get names of all selected forms
        const checkedFilterValues = Array.from(checkedFilters).map(function(checkedFilter) {
            return checkedFilter.name.toLowerCase();
        });

        // Loop through each card and show only matched ones
        cards.forEach(function(card) {
            const loc = card.querySelector('.location').textContent.toLowerCase();
            const dept = card.querySelector('.department').textContent.toLowerCase();
            let cardActive = false;

            // to match all the selected checkbox
            checkedFilterValues.forEach(function(val){
                if(loc.includes(val) || dept.includes(val)){
                    cardActive = true;
                }
            });

            if (cardActive) {
                card.style.display = 'block';
            } 
            else {
                card.style.display = 'none';
            }

            // Reset if no checkbox is selected
            if(checkedFilterValues == ""){
                card.style.display = 'block';
            }
        });
    });
});

const applyBtn = document.getElementById('apply-btn');
const closeBtn = document.getElementById('close-btn');
const formContainer = document.getElementsByClassName('form-container');

applyBtn.addEventListener('click', function(){
    formContainer[0].classList.remove('hide');
});

closeBtn.addEventListener('click', function(){
    formContainer[0].classList.add('hide');
});

const form = document.getElementById('application-form');

// Add a submit event listener to the form
form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Get the form data
    const formData = new FormData(form);

    // update the link to send form data to proper location
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        if (response.ok) {
            alert('Form data submitted successfully!');
            form.reset(); // Reset the form
            formContainer[0].classList.add('hide');
        } else {
            throw new Error('Form data submission failed.');
        }
    })
    .catch(function (error){
        console.error(error);
        alert('Form data submission failed. Please try again later.');
        formContainer[0].classList.add('hide');
    });
});