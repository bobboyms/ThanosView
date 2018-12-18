import axios from 'axios';

export class CarService {
    
    getCarsLazy(event) {
        console.log("Table lazy event",event);
        var filterJsonString=JSON.stringify(event);
        console.log("Filter",filterJsonString);
        //convert JSON string to Base64
        var filterJsonStringBase64=btoa(unescape(encodeURIComponent(filterJsonString)));
        //pass it to GET request as query string
        //return service.getRestClient().get('cars?filter=' + filterJsonStringBase64);
    }

    getCarsSmall() {
        return axios.get('assets/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    getCarsMedium() {
        return axios.get('assets/demo/data/cars-medium.json')
                .then(res => res.data.data);
    }

    getCarsLarge() {
        return axios.get('assets/demo/data/cars-large.json')
                .then(res => res.data.data);
    }
}