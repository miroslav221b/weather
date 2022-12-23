function msToTime(duration) {
    let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes 
  //+ ":" + seconds + "." + milliseconds;
}
let state = {
    added_locations:new Set(),
    active_page:"now",
    active_city:"boston",
    active_icon:"",
    city_info:{
        wind:"3.5 km/h",
        temperature:"14°",
        feels_like:"10°",
        weather:"clouds",
        Sunrise:"10:30",
        Sunset:"18:54",
    },
    render(){
        let container = document.querySelector(".container")
        container.innerHTML="";
        // creating search bar 
        let search_bar_div = document.createElement("div")
        search_bar_div.classList.add("search-bar")
        search_bar_div.classList.add("block")

        let search_bar_form = document.createElement("form")
        search_bar_form.classList.add("search-bar_form")
        search_bar_div.appendChild(search_bar_form)

        let search_bar_text_input = document.createElement("input")
        search_bar_text_input.classList.add("search-bar_text")
        search_bar_text_input.setAttribute("type","text")
        search_bar_form.appendChild(search_bar_text_input)

        let search_bar_submit_input = document.createElement("input")
        search_bar_submit_input.classList.add("search-bar_button")
        search_bar_submit_input.setAttribute("type","submit")
        search_bar_form.appendChild(search_bar_submit_input)

        container.appendChild(search_bar_div)

        // creating list of added_locations title
        let added_loations_title_div = document.createElement("div")
        added_loations_title_div.classList.add("added-locations-title") 
        added_loations_title_div.classList.add("block")
        added_loations_title_div.innerHTML = "added locations:" 

        container.appendChild(added_loations_title_div)

        // cerating list of added_locations
        let added_locations_list_div = document.createElement("div")
        added_locations_list_div.classList.add("added-locations-list")
        added_locations_list_div.classList.add("block")
        let added_locations_list_ul = document.createElement("ul")
        for(let item of this.added_locations){
            let list_item_li = document.createElement("li")
            list_item_li.classList.add("list_item_of_added_locations")
            list_item_li.innerHTML = item;
            added_locations_list_ul.appendChild(list_item_li)
        }
        added_locations_list_ul.classList.add("added-locations-list_list")
        added_locations_list_div.appendChild(added_locations_list_ul)

        container.appendChild(added_locations_list_div)




        // creating page 
        if(this.active_page == "now"){
            let now_page_div = document.createElement("div")
            now_page_div.classList.add("now-page")
            now_page_div.classList.add("block")

            let temperature_div = document.createElement("div")
            temperature_div.classList.add("temperature")
            temperature_div.innerHTML = this.city_info.temperature
            now_page_div.appendChild(temperature_div)

            let icon_img = document.createElement("img")
            icon_img.classList.add("icon")
            icon_img.setAttribute("src",`${this.active_icon}`)
            now_page_div.appendChild(icon_img)

            let container_info_div = document.createElement("div")
            container_info_div.classList.add("container-info")
            now_page_div.appendChild(container_info_div)


            let countre_div = document.createElement("div")
            countre_div.classList.add("countre")
            countre_div.innerHTML = this.active_city
            container_info_div.appendChild(countre_div)

            let add_to_list_div = document.createElement("div")
            add_to_list_div.classList.add("add-button")
            if(this.added_locations.has(this.active_city)){
                add_to_list_div.innerHTML="remove"
            }else{
                add_to_list_div.innerHTML="add"
            }
            container_info_div.appendChild(add_to_list_div)

            container.appendChild(now_page_div)
        }else if(this.active_page == "details"){
            let details_block_div = document.createElement("div")
            details_block_div.classList.add("block")
            details_block_div.classList.add("details-page")

            let country_name_div = document.createElement("div")
            country_name_div.classList.add("country-name")
            country_name_div.innerHTML = this.active_city
            details_block_div.appendChild(country_name_div)

            let info_list_div = document.createElement("div")
            info_list_div.classList.add("info-list")

            let info_list_ul = document.createElement("ul")
            for(let property in this.city_info){
                let info_list_item_li = document.createElement("li")
                info_list_item_li.innerHTML = `${property}: ${this.city_info[property]}`
                info_list_ul.appendChild(info_list_item_li)
            }
            info_list_div.appendChild(info_list_ul)
            details_block_div.appendChild(info_list_div)
            container.appendChild(details_block_div)

        }else if(this.active_page == "forecast"){
            let details_block_div = document.createElement("div")
            details_block_div.classList.add("block")
            details_block_div.classList.add("forecast-page")
            container.appendChild(details_block_div)
        }

        //creating page buttons
        let now_div = document.createElement("div")
        now_div.innerHTML="Now"
        now_div.classList.add("now-button")
        now_div.classList.add("block")

        let ditails_div = document.createElement("div")
        ditails_div.innerHTML="Ditails"
        ditails_div.classList.add("details-button")
        ditails_div.classList.add("block")

        // let forecast_div = document.createElement("div")
        // forecast_div.innerHTML="Forecast"
        // forecast_div.classList.add("foreast-button")
        // forecast_div.classList.add("block")

        if(this.active_page == "now"){
            now_div.classList.add("active")
        }else if(this.active_page == "details"){
            ditails_div.classList.add("active")
        }else if(this.active_page == "forecast"){
           // forecast_div.classList.add("active")
        }
        container.appendChild(now_div)
        container.appendChild(ditails_div)
        //container.appendChild(forecast_div)

        document.querySelector(".search-bar_form").addEventListener("submit",(event)=>{
            event.preventDefault()
            let sity_name = document.querySelector(".search-bar_text").value
            state.change_active_city(sity_name)
        
        })
    },
    add_location_to_local_list(location){
        localStorage.setItem(location, location)
    },
    remove_location_from_local_list(location){
        localStorage.removeItem(location)
    },
    set_location_to_local_list(location){
        localStorage.setItem("active_city",location)
    },
    set_info_from_local_list(){
        this.change_active_city(localStorage.getItem("active_city"))
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            console.log(`${key}: ${localStorage.getItem(key)}`);
            if(key !== "active_city"){
                this.add_added_locations(key)
            }
        }

    },
    change_active_city(city){
        this.set_location_to_local_list(city)
        this.active_city = city
        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const cityName = city;
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`
        let fech_info = fetch(url).then((data)=>{
           return data.text()
        }).then((data)=>{
            console.log(data)
            let info_obj = JSON.parse(data);
            console.log(info_obj)
            this.city_info = {
                wind: `${info_obj.wind.speed} km/h`,
                temperature: `${Math.round(info_obj.main.temp-273)}°`,
                feels_like: `${Math.round(info_obj.main.feels_like-273)}°`,
                weather: info_obj.weather[0].main,
                Sunrise:msToTime(info_obj.sys.sunrise),
                Sunset:msToTime(info_obj.sys.sunset),
            }
            let night_icon = info_obj.weather[0].icon
            night_icon = night_icon[0] + night_icon[1] + "n";
            this.active_icon = `http://openweathermap.org/img/wn/${night_icon}@2x.png`
            this.render()
        })

    },
    add_added_locations(location){
        this.add_location_to_local_list(location)
        this.added_locations.add(location)
        this.render()
    },
    remuve_added_location(location){
        this.added_locations.delete(location)
        this.remove_location_from_local_list(location)
        this.render()
    },
    change_active_page(page){
        this.active_page = page;
        this.render()
    },
}
document.querySelector(".container").addEventListener("click",(event)=>{
    if(event.target.innerHTML == "Now"){
        state.change_active_page("now")
    }else if(event.target.innerHTML == "Ditails"){
        state.change_active_page("details")
    }else if(event.target.innerHTML == "Forecast"){
        state.change_active_page("forecast")
    }

    if(event.target.classList.contains('list_item_of_added_locations')){
        state.change_active_city(event.target.innerHTML)
    }
    if(event.target.classList.contains("add-button")){
        if(state.added_locations.has(state.active_city)){
            state.remuve_added_location(state.active_city)
        }else{
            state.add_added_locations(state.active_city)
        }
    }
    
})

state.set_info_from_local_list()
state.render()