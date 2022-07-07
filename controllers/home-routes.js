const router = require("express").Router();
const { Movie, User, MovieUser, Preferences } = require("../models");
const axios = require("axios").default;
const { get_five_movies } = require("../utils/helpers.js");

// GET all galleries for homepage
router.get("/", async (req, res) => {
  try {
    const dbGalleryData = await Preferences.findAll({});

    const preferences = dbGalleryData.map((preferences) =>
      preferences.get({ plain: true })
    );

    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/550?api_key=9e1589a2fc403d6de0df005fb8a3d78a"
    );
    const movies = await get_five_movies(data);

    res.render("homepage", {
      data: movies,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
router.get("/gallery/:id", async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const dbGalleryData = await Gallery.findByPk(req.params.id, {
        include: [
          {
            model: Painting,
            attributes: [
              "id",
              "title",
              "artist",
              "exhibition_date",
              "filename",
              "description",
            ],
          },
        ],
      });
      const gallery = dbGalleryData.get({ plain: true });
      res.render("gallery", { gallery, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET one painting
router.get("/painting/:id", async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in, allow them to view the painting
    try {
      const dbPaintingData = await Painting.findByPk(req.params.id);

      const painting = dbPaintingData.get({ plain: true });

      res.render("painting", { painting, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
