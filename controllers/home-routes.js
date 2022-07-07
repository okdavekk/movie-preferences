const router = require("express").Router();
const { Movie, User, MovieUser, Preferences } = require("../models");
const axios = require("axios").default;
const { get_five_movies } = require("../utils/helpers.js");

// GET all galleries for homepage
router.get("/", async (req, res) => {
  try {
    // console.log("hello");
    // const dbGalleryData = await Preferences.findAll({});

    // const preferences = dbGalleryData.map((preferences) =>
    //   preferences.get({ plain: true })
    // );

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

router.get("/search-results", async (req, res) => {
  try {
    // console.log("hello");
    // const dbGalleryData = await Preferences.findAll({});

    // const preferences = dbGalleryData.map((preferences) =>
    //   preferences.get({ plain: true })
    // );
    const {title} = req.query;

    if (!title) {
      return res.status(404).render('not-found');
    }

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=9e1589a2fc403d6de0df005fb8a3d78a&language=en-US&query=${title}&page=1`
    );
    // console.log(data.results.slice(0, 5).length)
    const movies = data.results;

    res.render("search-results", {
      movies,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, './public/index.html'))
// );
// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, './public/notes.html'))
// );
// app.get('api/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, './db/db.json'))
// });
// app.get('/api/notes', (req, res) => {
//   console.info(`${req.method} request received to get notes`);
//   res.json(notes);
// });
// app.post('/api/notes', (req, res) => {
//   console.info(`${req.method} request received to add a note`);
//   const {title, text} = req.body;
//   if (title && text) {
//     const pointer = {
//       title,
//       text,
//       id: uuid(),
//     };
//     notes.push(pointer);
//     let answers = JSON.stringify((notes), null, 2);
//     fs.writeFile('./db/db.json', answers, (err) =>
//     err
//     ? console.error(err)
//         : console.log(`Note for ${pointer.title} has been written to JSON file`)
//     );
//     const input = {
//       status: "success",
//       body: pointer,
//     };
//     console.log(input);
//     res.status(201).json(input);
//   } else {
//     res.status(500).json("Error in posting note");
//   }
// });

// GET one gallery
// router.get("/gallery/:id", async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//   if (!req.session.loggedIn) {
//     res.redirect("/login");
//   } else {
//     // If the user is logged in, allow them to view the gallery
//     try {
//       const dbGalleryData = await Gallery.findByPk(req.params.id, {
//         include: [
//           {
//             model: Painting,
//             attributes: [
//               "id",
//               "title",
//               "artist",
//               "exhibition_date",
//               "filename",
//               "description",
//             ],
//           },
//         ],
//       });
//       const gallery = dbGalleryData.get({ plain: true });
//       res.render("gallery", { gallery, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// });

// GET one painting
// router.get("/painting/:id", async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//   if (!req.session.loggedIn) {
//     res.redirect("/login");
//   } else {
//     // If the user is logged in, allow them to view the painting
//     try {
//       const dbPaintingData = await Painting.findByPk(req.params.id);

//       const painting = dbPaintingData.get({ plain: true });

//       res.render("painting", { painting, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// });

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/reviews", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("reviews");
});

module.exports = router;
