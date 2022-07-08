const saveClickHandler = async (event) => {
    event.preventDefault();
  
    const movieId = document.querySelector('.savebtn').getAttribute("data-id");
    console.log(movieId);
    const posterPath = document.querySelector('.movie-poster').getAttribute('src');
    console.log(posterPath);
    const movieTitle = document.querySelector('.movie-title').getAttribute('data-title');
    console.log(movieTitle);
    // const userId = document.querySelector('.movie-title').getAttribute('data-title');
    // console.log(movieTitle);
    // const password = document.querySelector('#password-login').value.trim();
  
    if (movieId && posterPath && movieTitle) {
      const response = await fetch('/api/users/movies', {
        method: 'POST',
        body: JSON.stringify({ movieTitle, posterPath, movieId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };

  document
  .querySelector('.savebtn')
  .addEventListener('click', saveClickHandler);