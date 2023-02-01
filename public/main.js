// followed;
// https://www.youtube.com/watch?v=ytNyibPQFhw&ab_channel=iEatWebsites
// fetches movies and shows from Netflix with API
fetch('https://netflix-data.p.rapidapi.com/search/?query=&limit_titles=10&limit_suggestions=1', {
  "method": "GET",
  "headers": {
    'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
		'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
  }
})
.then(response => response.json())
.then(data => {
  // holds a list of stuff pulled from API
  const list = data.titles;
  list.map((item) => {
    // only continue if data is a show
    if (item.summary.type == 'show') {
      console.log("this is a show");
      console.log(item);
      const name = item.jawSummary.title;
      const poster = item.jawSummary.backgroundImage.url;
      const show = `<li><img src="${poster}"> <h2>${name}</h2></li>`
      document.querySelector('.movies').innerHTML += show;

    }
  })
})
.catch(err => {
  console.log(err);
})
