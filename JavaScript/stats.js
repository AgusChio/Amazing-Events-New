const  {createApp}  = Vue       //Creamos la app 

createApp ( {
    data(){    //
        return{
            cards : [],
            pastEvents : [],
            upcomingEvents : [],
            pastEventsCategory: [],
            upcomingEventsCategory: [],
            pastCategoryArray: [],
            upcomingCategoryArray: [],
            highAssistance: [],
            lowAssistance: [],
            highCapacity: []
        }
    },
    created(){                 
        this.loadCards()
    },
    mounted(){                  

    },
    methods: {                   
        loadCards() {
            fetch('https://amazing-events.herokuapp.com/api/events')
            .then(response => response.json())
            .then(data => {
                this.cards = data.events
                this.pastEvents = this.cards.filter(event => (event.date < data.currentDate) )
                this.upcomingEvents = this.cards.filter(event => (event.date >= data.currentDate) )
                const fnCategory = events => events.category
                this.upcomingEventsCategory = Array.from(new Set (this.upcomingEvents.map(fnCategory)))
                this.pastEventsCategory = Array.from(new Set (this.pastEvents.map(fnCategory)))
                const attendanceEvents = this.percentajeDescendent(this.pastEvents);
                const capacityEvents = this.capacityDescendent(this.pastEvents);
                this.highAssistance = attendanceEvents[0];
                this.lowAssistance = attendanceEvents[attendanceEvents.length - 1];
                this.highCapacity = capacityEvents[0];

                this.pastCategoryArray = this.statsPast(this.pastEventsCategory, this.pastEvents)

                this.upcomingCategoryArray = this.statsUp(this.upcomingEventsCategory, this.upcomingEvents)

            })
            },

            statsPast( category, event ){
                let array = []
                category.forEach(element => {

                    let equalEvents = event.filter( event => event.category === element)

                    let revenues = equalEvents.map(event => (event.assistance * event.price)).reduce((accumulator, value)=> accumulator + value)

                    const assistance = equalEvents.map(evento => (evento.assistance * 100 ) / evento.capacity)
                    const additionAssistance = assistance.reduce((accumulator, value) => accumulator + value) / assistance.length 
            
                    const data = {
                        name: element,
                        revenue: revenues,
                        percentage: additionAssistance.toFixed(2)

                    }
                    array.push(data)
                });
                return array
            },
            statsUp( categoria, events ){
                let array = []
                categoria.forEach(element => {

                    const equalEvents = events.filter( events => events.category === element)
                    
                    const revenues = equalEvents.map(events => (events.estimate * events.price)).reduce((accumulator, value)=> accumulator + value)
            
            
            
                    const assistance = equalEvents.map(events => (events.estimate * 100 ) / events.capacity)
                    const additionAssistance = assistance.reduce((accumulator, value) => accumulator + value) / assistance.length 
            
                    const data = {
                        name: element,
                        revenue: revenues,
                        percentage: additionAssistance.toFixed(2)

                    }
                    array.push(data)
                });
                return array
            },
            percentajeDescendent(array) {
                return array.map(events => events).sort((b, a) => (((a.assistance * 100) / a.capacity) - ((b.assistance * 100) / b.capacity)))
            },
            capacityDescendent(array) {
                return array.map(events => events).sort((b, a) => (a.capacity - b.capacity));
            }
    },

    computed: {    
    }
}).mount("#app")