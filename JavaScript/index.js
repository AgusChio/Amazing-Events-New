const { createApp } = Vue

createApp({
    data(){
        return{
        events: [],
        categories: [],
        categoriesChecked:[],
        inputSearch:'',
        currentDate:'',
        filtered:[]
        }
    },
    created(){
        fetch('http://amazing-events.herokuapp.com/api/events')
        .then( response => response.json() )
        .then( data => {
            let home = document.getElementById("mainHome")
            let upComing = document.getElementById("mainUpComing")
            let past = document.getElementById("mainPast")
            if(home){
                this.events = data.events
                this.filtered = data.events}
            if(upComing){
                this.events = data.events.filter( element => element.date > data.currentDate)
                this.filtered = data.events}
            if(past){
                this.events = data.events.filter( element => element.date < data.currentDate)
                this.filtered = data.events}
            this.getCategories()
            this.currentDate = data.currentDate
        })
        .catch( error => console.log(error))
    },
    methods: {
        getCategories(){
            let fn = (categories) => categories.category;
            this.categories = [... new Set(this.events.filter( fn ).map( fn ))  ]
        },

    },
    computed: {
        filters(){
            let firstFilterCheckBox = [ ... this.events].filter( event => this.categoriesChecked.includes(event.category) || this.categoriesChecked.length === 0);
            let secondFilterSearch = firstFilterCheckBox.filter(events => events.name.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()));
            this.filtered = secondFilterSearch;
        },

        // filtersUpcoming(){
        //     let firstFilterCheckBoxupComing = this.backupUpComing.filter( event => this.categoriesChecked.includes(event.category) || this.categoriesChecked.length === 0);
        //     let secondFilterSearchUpComig = firstFilterCheckBoxupComing .filter(events => events.name.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()));
        //     this.events = secondFilterSearchUpComig;
        // },

        // filtersPast(){
        //     let firstFilterCheckBoxPast= this.backupUpComing.filter( event => this.categoriesChecked.includes(event.category) || this.categoriesChecked.length === 0);
        //     let secondFilterSearchPast= firstFilterCheckBoxPast .filter(events => events.name.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()));
        //     this.events = secondFilterSearchPast;
        // }
    }
}).mount('#app')


