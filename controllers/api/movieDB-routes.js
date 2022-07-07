const router = require('express').Router();
const axios = require('axios').default;

// router.get('/', async (req, res) => {
//     // find all categories
//     // be sure to include its associated Product data
//     try {
//     //   const categoryData = await Category.findAll({
//     //     include: [
//     //       Product
//     //     ],
//     //   });
//       res.status(200).json("hello");
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });

// const testRequest = async () => {

//   const result = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=9e1589a2fc403d6de0df005fb8a3d78a')
//   console.log(result.data)

// }
// testRequest();







module.exports = router;