const options = {
  method: 'GET',
  url: 'https://netflix54.p.rapidapi.com/search/',
  params: {
    query: '',
    offset: '0',
    limit_titles: '5',
    limit_suggestions: '20',
    lang: 'en'
  },
  headers: {
    'X-RapidAPI-Key': '38e290991bmsh9817eeb750d1539p19c713jsnb4e0e828f286',
    'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
  }
};

/*
axios.request(options).then((response) => {
    for (const item of Object.entries(response.data.titles)) {
        
        console.log(item);

        const title = item[1].jawSummary.title;
        console.log(title);

        const background_image = item[1].jawSummary.backgroundImage.url;
        console.log(background_image);

        const logo_image = item[1].jawSummary.logoImage.url;
        console.log(logo_image);

        const show_id = item[1].jawSummary.id;
        console.log(show_id);
    }
	//console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
*/

axios.request(options).then((response) => {
    const list = response.data.titls;

    if(list.length > 0){
        return (
            list.map((item) => {
                console.log(item);

                const title = item[1].jawSummary.title;
                console.log(title);
        
                const background_image = item[1].jawSummary.backgroundImage.url;
                console.log(background_image);
        
                const logo_image = item[1].jawSummary.logoImage.url;
                console.log(logo_image);
        
                const show_id = item[1].jawSummary.id;
                console.log(show_id);

            })
        )
    }
}).catch(function (error) {
	console.error(error);
});


/*
axios.request(options).then(function (response) {
	console.log(response.data.titles);

}).catch(function (error) {
	console.error(error);
});
*/