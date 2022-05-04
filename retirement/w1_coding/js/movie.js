const elemButton = document.getElementById("suggest");
const elemTitle = document.getElementById("movie-title");
const elemRating = document.getElementById("rating");
const elemStar1 = document.getElementById("star1");
const elemStar2 = document.getElementById("star2");
const elemStar3 = document.getElementById("star3");
const elemMovieImg = document.getElementById("movimg");
let movies;

function suggest() {
  let index = getRandomInt(movies.items.length);
  const movie = movies.items[index];

  elemTitle.innerText = movie.fullTitle;
  elemRating.innerText = movie.imDbRating;
  let stars = movie.crew.split(",");
  elemStar1.innerText = stars[0];
  elemStar2.innerText = stars[1];
  elemStar3.innerText = stars[2];
  fillImg(movie)
}

function fillImg(movie) {
  let line = `<img src=${movie.image} alt="img/movie1.jpg" class="movie-img" />`
  elemMovieImg.innerHTML = line
}

async function getMovies() {
  movies = JSON.parse(localStorage.getItem("imdbMovies"));
  if (movies != null) {
    console.log(movies);
    suggest();
    return;
  }

  // alert("getting movie from imdb")
  let res = await fetch("https://imdb-api.com/en/API/Top250Movies/k_7b5cpl5n");
  let data = await res.json();
  movies = data;
  localStorage.setItem("imdbMovies", JSON.stringify(movies));
  suggest();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

getMovies()
