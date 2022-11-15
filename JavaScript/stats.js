// ------------------contenedores-----------------//
const tableHighest = document.getElementById('highPercentageAttendance');
const tableLower = document.getElementById('lowerPercentageAttendance');
const tableLarger = document.getElementById('largerCapacity');
const tableUpComing = document.getElementById('table-UpCpmingEvents');
const tablePastEvents = document.getElementById('table-PastEvents')

//------------------Variables Declaradas------------------//
let data;
let info;
let pastEvents;
let upcomingEvents;
let CategoriesUpcoming = [];
let CategoriesPast = [];
let eventsWithCategoryPast;
let pastCategoriesNoRepeat;
let eventsWithCategoryUpcoming;
let upcomingCategoriesNoRepeat;
let getCategories = (events) => events.category;

//------------------Datos Asincronicos------------------//
fetch ("http://amazing-events.herokuapp.com/api/events")
    .then( response => response.json() )
    .then( (response) => {
        info = response;
        data = info.events;
        data.forEach((event) => {
			event.percentage = parseInt(
				event.assistance
					? ((event.assistance * 100) / event.capacity).toFixed(2)
					: ((event.estimate * 100) / event.capacity).toFixed(2)
			);

			event.revenue = parseInt(
				event.assistance
					? event.assistance * event.price
					: event.estimate * event.price
			);
		});
		allFunction()
	})
    .catch((error) => console.log(error));

    function eventsStatistics(){
        pastEvents = data.filter((event) => event.date < info.currentDate);
    
        upcomingEvents = data.filter((event) => event.date > info.currentDate);
        pastEvents.sort((a, b) => b.percentage - a.percentage);
        tableLargerCapacity = data.sort((a, b) => b.capacity - a.capacity).slice(0, 1);
        tableLowerPercentage = pastEvents.slice(-1);
        tableHighestPercentage = pastEvents.slice(0, 1);

         //Create highest %/ lowest %/ larger capacity  events
        tableHighest.innerHTML = tableHighestPercentage[0].name;
        tableLower.innerHTML = tableLowerPercentage[0].name;
        tableLarger.innerHTML = tableLargerCapacity[0].name;

        eventsWithCategoryPast = pastEvents.filter(getCategories);
        pastCategoriesNoRepeat = Array.from(new Set(eventsWithCategoryPast.map(getCategories)));

        eventsWithCategoryUpcoming = upcomingEvents.filter(getCategories);
        upcomingCategoriesNoRepeat = Array.from(
            new Set(eventsWithCategoryUpcoming.map(getCategories))
        );

    }

    function upComingOrPastStatisticsByCategory(){
        function createObj(arrayNoRepeat, arrayUpcomingOrPast, objName) {
                    arrayNoRepeat.sort().forEach((category) => {
                        let newObj = {
                            name: "",
                            revenue: 0,
                            percentage: 0,
                        };
            
                        newObj.name = category;
                        newObj.revenue = arrayUpcomingOrPast
                            .filter((events) => events.category == category)
                            .map((events) => events.revenue)
                            .reduce((a, b) => a + b, 0);
            
                        newObj.percentage =
                            arrayUpcomingOrPast
                                .filter((events) => events.category == category)
                                .map((events) => events.percentage)
                                .reduce((a, b) => a + b, 0) /
                            arrayUpcomingOrPast.filter((events) => events.category == category).length;
                        objName.push(newObj);
                    });
                }
                createObj(upcomingCategoriesNoRepeat, upcomingEvents, CategoriesUpcoming);
                createObj(pastCategoriesNoRepeat, pastEvents, CategoriesPast);
            
                function createTableRow(objUpcomingOrPast, container) {
                    objUpcomingOrPast.forEach((event) => {
                        container.innerHTML += `
                    <tr>
                        <td>${event.name}</td>
                        <td>$${event.revenue}</td>
                        <td>${event.percentage.toFixed(2)}%</td>
                    </tr>
                    
                    `;
                    });
                }
                createTableRow(CategoriesUpcoming, tableUpComing);
                createTableRow(CategoriesPast, tablePastEvents);
            }

    function allFunction(){
        eventsStatistics()
        upComingOrPastStatisticsByCategory()
    }
