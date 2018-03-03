const moviesApiUrl='http://localhost:8000/api/movies',clearMovies=()=>$('ul.peliculas li').remove(),areMoviesEqual=(a,b)=>a.name.toUpperCase()===b.name.toUpperCase(),doesMovieExist=(a,b)=>{let c=!1;return b.forEach((b)=>{areMoviesEqual(a,b)&&(c=!0)}),c};$.delete=(a,b)=>$.ajax({url:a,type:'DELETE',success:b});const getMovies=(a)=>$.get(moviesApiUrl,{},a),newMovie=(a,b)=>$.post(moviesApiUrl,a,b),deleteMovie=(a,b)=>$.delete(`${moviesApiUrl}/${a}`,b),createMovieIfItDoesntExist=(a,b,c)=>{const d={name:a,genre:b};getMovies((a)=>{doesMovieExist(d,a)||newMovie(d,c)})},handleDeleteMovie=(a)=>deleteMovie(a.dataset.id,listMoviesInView),listMoviesInView=()=>{clearMovies(),getMovies((a)=>{a.forEach((a)=>{$('ul.peliculas').append(`
        <li>
          <span class="delete-movie" onclick="handleDeleteMovie(this)" data-id="${a.id}">⨯</span>
          <span class="movie-title">${a.name}</span>
          <span class="movie-genre">${a.genre}</span>
        </li>
      `)})})},handleFormSubmit=(a)=>{a.preventDefault();const b=$(a.target).find('#nombre').val(),c=$(a.target).find('#genero').val();return createMovieIfItDoesntExist(b,c,listMoviesInView),!1};