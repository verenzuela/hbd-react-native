export default class hotelsbyday {

	constructor(){}

	static getQueryURL = (lan='en') => {
		let baseUrl = 'https://www.hotelsbyday.com/';
		let url = baseUrl;
		url += lan;
		return url; 
	};


	urlFetch = ( url, options ) => {
		return fetch( url, options ).then( res => res.json() ).then( res => {
			return Promise.resolve(	res );
		}).catch( function(error) {
			console.warn('Error: ' + error.message);
			throw error;
		});
	};


	setFormBody = ( params ) => {
		var formBody = [];
	    for (var property in params) {
	      var encodedKey = encodeURIComponent(property);
	      var encodedValue = encodeURIComponent(params[property]);
	      formBody.push(encodedKey + "=" + encodedValue);
	    }
	    formBody = formBody.join("&");
	    return formBody;
	};


	getCities = ($cityName='') => {
		let url = hotelsbyday.getQueryURL('en');
		let options = {};

		if($cityName != ''){
			url += '/search/city_autocomplete?city='+$cityName;
		}else{
			url += '/search/city_autocomplete';
		}
		
		return this.urlFetch(url, options);
	};

}