const checkBoxJs = document.getElementById('checkJs');
const cardsJs = document.getElementById('cardjs');
let data = info.events

const getCategories = (events) => events.category

const categoriesWithoutRepeating  = new Set(data.map(getCategories));


const arrayCategoriesWithoutRepeating = Array.from(categoriesWithoutRepeating);

function createCheckbox(value, container) {
    let template = ''
    value.forEach( value => template += `
        <label class="btn btn-primary active">
            <input type="checkbox" class="me-2" value="${value}" name="" id=""> ${value}
        </label>`)
    container.innerHTML = template;
    // console.log(value)
}

createCheckbox(arrayCategoriesWithoutRepeating, checkBoxJs);

function createCards(events) {
    cardsJs.innerHTML = '';
    let fragment = document.createDocumentFragment();
    events.forEach( event => {
    let div = document.createElement(`div`);
    div.classList.add("card");
    div.innerHTML += `<img src="${event.image}" class="imagenCartas" alt="${event.name}">
                <div class="card-body d-flex flex-column align-items-center justify-content-center p-0">
                    <h5 class="card-title"><b>${event.name}</b></h5>
                    <p class="card-text">${event.description}</p>
                    <p><b>Price: ${event.price}</b></p>
                    <a href="./details.html?id=${event._id}" class="boton btn btn-primary">Read More</a>
                </div>`
    fragment.appendChild(div);
    })
    cardsJs.appendChild(fragment);
}
createCards(data);

function filterCheckbox (events){
    const checked = Array.from(document.querySelectorAll( 'input[type=checkbox]:checked' )).map( input => input.value)
    if(checked.length!==0){
        return events.filter(event => checked.includes(event.category))
    } else {
        return events
    }
}

checkBoxJs.addEventListener('change', (_event) => {
    createCards (filterSearch ( filterCheckbox ( data ) ) );
})

let searchBar = document.getElementById('search');

function filterSearch(events){
    let search = searchBar.value.toLowerCase().trim()
    if(search !== " "){
        return events.filter(event => event.name.toLowerCase().includes(search));
    } else {
        return events;
    }
}

searchBar.addEventListener('keyup', (_e) =>{
    createCards (filterSearch ( filterCheckbox ( data ) ) );
} )

searchBar.addEventListener("submit" , (e) => e.preventDefault())