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
  async function getUser() {
    try {
      const response = await axios.get('/user?ID=12345');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

console.log('Bye');





module.exports = router;