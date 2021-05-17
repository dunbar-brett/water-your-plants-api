const { dbQuery } = require("../db/dbQuery");
const moment = require('moment');
const { successMessage, errorMessage, status } = require('../helpers/status');
const { isEmpty } = require("../helpers/validations");


const NOT_UNIQUE_ROUTINE = '_bt_check_unique';

const addPlant = async (req, res) => {
  const { userId } = req.params;
  const {
    name
  } = req.body;
  // get this from middleware
  const {
    id
  } = req.user;

  if (id != userId) { // todo: type mismatch-- fix it
    console.log(`uId: ${userId} tId: ${id}`);
    errorMessage.error = 'User id param and token user id do not match.';
    return res.status(status.unauthorized).send(errorMessage);
  }

  if (isEmpty(name)) {
    errorMessage.error = 'name cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  
  
  try {
    const createdOn = moment(new Date()).format();
  
    const createPlantQuery = `INSERT INTO 
        plants(user_id, name, created_on)
        VALUES($1, $2, $3)
        returning *;`;
    const values = [
      userId,
      name,
      createdOn
    ];
    const { rows } = await dbQuery(createPlantQuery, values);
    const dbResponse = rows[0];

    successMessage.data = dbResponse;

    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log(error);
    errorMessage.error = 'Unable to create plant';
    return res.status(status.error).send(errorMessage);
  }
};
const deletePlant = async (req, res) => {
  const { plantId } = req.params;
  const { userId } = req.user;
  const deletePlantQuery = 'DELETE FROM booking WHERE id=$1 AND user_id = $2 returning *';

  try {
    const { rows } = await dbQuery(deletePlantQuery, [plantId, userId]);
    const dbResponse = rows[0];
    
    if (!dbResponse) {
      errorMessage.error = 'You have no booking with that id';
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = {};
    successMessage.data.message = 'Booking deleted successfully';

    return res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.error).send(error);
  }
};
const updatePlant = async (req, res) => {
  const { plantId } = req.params;
  const { userId, locationId, sunReqId, name, waterFrequency, fertilizerFrequency, lastWaterted, lastFertilized}
  
  if (isEmpty(userId) || isEmpty(name)) {
    errorMessage.error = 'User ID and Name field cannot be empty';
    
    return res.status(status.bad).send(errorMessage);
  }

  const findPlantQuery = `SELECT * FROM plants WHERE id=${plantId}`;

  const updatePlantQuery = `UPDATE plants
    SET location_id='${locationId}', 
    sun_req_id='${sunReqId}',
    water_frequency=${waterFrequency},
    fertilizer_frequency=${fertilizerFrequency},
    last_watered=${lastWaterted},
    last_fertilized=${lastFertilized}
    WHERE user_id='${userId}' AND id='${plantId}' returning *;`;
 
  

  return
};

const getAllPlants = async (req, res) => {
  const getAllPlantsQuery = 'SELECT * FROM plants ORDER BY id DESC;';

  try{
    const { rows } = await dbQuery(getAllPlantsQuery);
    const dbResponse = rows;

    if (dbResponse[0] === undefined) {
      return res.send("There are no plants");
    }
    
    return res.json(dbResponse);

  } catch (error) {

    return res.send(error);
  }
};

const getPlantById = async (req, res) => {return};
const getAllPlantsByUserId = async (req, res) => {return};

module.exports = {
  addPlant,
  deletePlant,
  updatePlant,
  getAllPlants,
  getPlantById,
  getAllPlantsByUserId
}