const express = require('express');
const {validateUserToken} = require('../middlewares/verifyAuth');

const {
  addPlant,
  deletePlant,
  updatePlant,
  getAllPlants,
  getPlantById,
  getAllPlantsByUserId
} = require ('../controllers/plantController');
const router = express.Router();

router.get('/plants', validateUserToken, getAllPlants); // dev route, comment out for prod
router.post('/plants/:userId', validateUserToken, addPlant);
router.get('/plants/:plantId', validateUserToken, getPlantById);
router.delete('/plants/:plantId', validateUserToken, deletePlant);
router.put('/plants/:plantId', validateUserToken, updatePlant);
router.get('/plants/all/:userId', validateUserToken, getAllPlantsByUserId);

module.exports = router;