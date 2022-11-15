let data = info.events

const queryString = location.search 
const params = new URLSearchParams(queryString)
const id = params.get("id")


const events = data.find(events => events._id == id)

const div = document.getElementById('cartota')
div.innerHTML = `<div class="d-flex justify-content-center gap-4 cardsolita p-2 bg-light bg-gradient">
                    <img src="${events.image}" class="card-img-top p-2 bg-light bg-gradient" alt="${events.name}">
                    <div class="card-body d-flex justify-content-center align-items-center flex-column">
                        <h3 class="card-title">${events.name}</h3>
                        <br>
                        <p class="card-text d-flex justify-content-evenly"><b>Date:</b>${events.date}</p>
                        <p class="card-text d-flex justify-content-evenly"><b>Description:</b>${events.description}</p>
                        <p class="card-text d-flex justify-content-evenly"><b>Place:</b>${events.place}</p>
                        <p class="card-text d-flex justify-content-evenly"><b>Capacity:</b>${events.capacity}</p>
                        <p class="card-text d-flex justify-content-evenly"><b>Assistance:</b>${events.assistance}</p>
                        <p class="card-text d-flex justify-content-evenly"><b>Price:</b>${events.price}</p>
                    </div>
                </div> `
