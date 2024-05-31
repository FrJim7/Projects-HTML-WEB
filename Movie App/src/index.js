const API_KEY = '0525bcd35174232b87d24b5a25f6e519';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0525bcd35174232b87d24b5a25f6e519&page=';
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=0525bcd35174232b87d24b5a25f6e519&query=";
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const movie_section = document.getElementById("movie-section");
const movie_form = document.getElementById("movie-form");
const movie_query = document.getElementById("query");

let current_id = 1;
let query = API_URL;

returnMovies(API_URL);

function returnMovies(url, id = 1) {
  movie_section.innerHTML = '';
  
  fetch(query+id).then(response => response.json()).then(function (data) {
    console.log(data.results);
    data.results.forEach(element => {
      const div_column = document.createElement('div');
      div_column.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 g-3');

      const div_card = document.createElement('div');
      div_card.setAttribute('class', 'card text-center ');

      const div_card_body = document.createElement('div');
      div_card_body.setAttribute('class', 'card-body');

      const image_movie = document.createElement('img');
      image_movie.setAttribute('class', 'thumbnail');

      const title_movie = document.createElement('h3');
      title_movie.setAttribute('class', 'card-title');

      title_movie.innerHTML = `${element.title}`;
      image_movie.src = IMG_URL + element.poster_path;

      div_card_body.appendChild(image_movie);
      div_card.appendChild(div_card_body);
      div_card.appendChild(title_movie);
      div_column.appendChild(div_card);

      movie_section.appendChild(div_column);
    });
    displayPageTurner(current_id, data.total_pages);
  });
}

function pageTurn(value = 0, set = 0) {
  if (value != 0) current_id += value;
  if (set != 0) current_id = set;
  
}

function displayPageTurner(first, last) {
  const page_section = document.getElementById("pages");
  page_section.innerHTML = '';

  const go_back_one = document.createElement('button');
  go_back_one.setAttribute('class', 'col-1 page-turner');
  go_back_one.innerHTML = `<`;
  go_back_one.onclick = function() {pageTurn(-1)};

  page_section.appendChild(go_back_one);

  const go_next_one = document.createElement('button');
  go_next_one.setAttribute('class', 'col-1 page-turner');
  go_next_one.innerHTML = `>`;
  go_next_one.onclick = function() {pageTurn(1)};

  if (last > 500) last = 500;

  let max_display = 0;

  if ((last - first) > 7) { 
    max_display = first + 7;
  } else {
    max_display = last - first;
  }


    for (let i = first; i < max_display; i++) {
      let temp = document.createElement('button');
      temp.setAttribute('class', 'col-1 page-turner');
      temp.innerHTML = i;
      temp.onclick = function() {pageTurn(0, i)};
      if(i == first) temp.setAttribute('class', 'col-1 page-turner active');
    
      page_section.appendChild(temp);
    }

  const dots = document.createElement('button');
  dots.setAttribute('class', 'col-1 page-turner-dots');
  dots.innerHTML = `...`;
  page_section.appendChild(dots);

  const last_page = document.createElement('button');
  last_page.setAttribute('class', 'col-1 page-turner');
  last_page.innerHTML = last;
  last_page.onclick = function() {pageTurn(0, last)};
  page_section.appendChild(last_page);

  page_section.appendChild(go_next_one);
}

document.addEventListener('click', function (page_turn) {
  let page_target = page_turn.target; 
  if (page_target.classList.contains("page-turner")) {
    returnMovies(query, current_id);
  }

});

document.addEventListener('click', function (e) {
  var target = e.target;
  if (target.tagName && target.tagName.toLowerCase() == "a") {
    alert(target.id);
  }
});

movie_form.addEventListener("submit", (e) => {
  e.preventDefault();
  current_id = 1;
  const search_query = movie_query.value;
  
  if (search_query) {
    query = API_SEARCH + search_query + '&page=';
    returnMovies(query, current_id);
    search_query.value = '';
  } else {
    query = API_URL;
    current_id = 1;
    returnMovies(API_URL, current_id);
  }
});
