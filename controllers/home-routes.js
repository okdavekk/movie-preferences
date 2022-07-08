const router = require("express").Router();
const { Favorite } = require("../models");
const axios = require("axios").default;


// API fetch request
router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=9e1589a2fc403d6de0df005fb8a3d78a"
    );
    // console.log(data.results.slice(0, 5).length)
    const movies = data.results.slice(0, 4);

    res.render("homepage", {
      data: movies,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//send to different page
router.get("/search-results", async (req, res) => {
  try {
    const {title} = req.query;

    if (!title) {
      return res.status(404).render('not-found');
    }

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=9e1589a2fc403d6de0df005fb8a3d78a&language=en-US&query=${title}&page=1`
    );
    const movies = data.results.slice(0, 8);
   

    res.render("search-results", {
      movies,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//this needs work in order to leverage user_id
router.get("/favorite", async (req, res) => {
  try {
    Favorite.findAll()
    //find user id here in order to get favorites for each user
    const movies = data.results.slice(0, 8);

    res.render("favorite", {
      data: movies,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/favorite", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("favorite");
});

router.get("/reviews", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("reviews");
});

module.exports = router;
