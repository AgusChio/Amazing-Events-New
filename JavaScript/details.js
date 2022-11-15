const div = document.getElementById('card-details')

let data;

let info;

let queryString;

let params;

let id;

let events;

fetch ("http://amazing-events.herokuapp.com/api/events")
    .then( response => response.json() )
    .then( (response) => {
        info = response;
        data = info.events;
        queryString = location.search;
        params = new URLSearchParams(queryString);
        id = params.get("id")
        events = data.find((events) => events._id == id);
            div.innerHTML = `
            <div class="d-flex justify-content-center gap-4 card-alone p-2 bg-light bg-gradient">
                    <img src="${events.image}" class="card-img-top p-2 bg-light bg-gradient" alt="${events.name}">
                    <div class="card-body d-flex justify-content-center align-items-center flex-column">
                        <h3 class="card-title">${events.name}</h3>
                        <br>
                        <p class="card-text d-flex justify-content-evenly"><b>Date:</b>${events.date}</p>
                        <p class="card-text d-flex justify-content-evenly"><b>Description:</b>${events.description}</p>
                        <p class="card-text d-flex justify-content-evenly"><b>Place:</b>${events.place}</p>
                        <p class="card-text d-flex justify-content-evenly"><b>Price:</b>${events.price}</p>
                        <p class="card-text d-flex justify-content-evenly"><b>Capacity:</b> ${events.capacity}</p>
                        <p class="card-text d-flex justify-content-evenly">${events.estimate
					? "<b>Estimate:</b> " + events.estimate
					: "<b>Asisstance:</b> " + events.assistance}</p>
                    </div>
                    `

} )
.catch( error => console.log(error) )
