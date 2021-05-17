const moment = require('moment');

const { dbQuery } = require('../db/dbQuery');
const { successMessage, errorMessage, status } = require('../helpers/status');
const { isEmpty } = require('../helpers/validations');

const addPlant = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const { id } = req.user;

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
  const deletePlantQuery = 'DELETE FROM plants WHERE id=$1 AND user_id = $2 returning *';

  try {
    const { rows } = await dbQuery(deletePlantQuery, [plantId, userId]);
    const dbResponse = rows[0];
    
    if (!dbResponse) {
      errorMessage.error = 'You have no plant with that id';
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = {};
    successMessage.data.message = 'Plant deleted successfully';

    return res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.error).send(error);
  }
};

const updatePlant = async (req, res) => {
  const { plantId } = req.params;
  const { 
    userId,
    locationId,
    sunReqId,
    name,
    waterFrequency,
    fertilizerFrequency, 
    lastWaterted,
    lastFertilized } = req.body;
  
  if (isEmpty(userId) || isEmpty(name)) {
    errorMessage.error = 'User ID and Name field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }

  const findPlantQuery = 'SELECT * FROM plants WHERE id=$1';

  const updatePlantQuery = `UPDATE plants
    SET name=$1,
    location_id=$2, 
    sun_req_id=$3,
    water_frequency=$4,
    fertilizer_frequency=$5,
    last_watered=$6,
    last_fertilized=$7
    WHERE user_id=$8 AND id=$9 returning *;`;
 
  const values = [
    name,
    locationId,
    sunReqId,
    waterFrequency,
    fertilizerFrequency,
    lastWaterted,
    lastFertilized,
    userId,
    plantId
  ]

  try {
    const { rows } = await dbQuery(findPlantQuery, [plantId]);
    const dbResponse = rows[0];

    if(!dbResponse) {
      errorMessage.error = 'Plant cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }

    const response = await dbQuery(updatePlantQuery, values);
    const dbResult = response.rows[0];
    
    successMessage.data = dbResult;
    return res.status(status.success).send(successMessage);
  }
  catch (error) {
    console.log(error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
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

const getPlantById = async (req, res) => {return res.status(status.notImplemented).send(errorMessage)};
const getAllPlantsByUserId = async (req, res) => {return res.status(status.notImplemented).send(errorMessage)};

module.exports = {
  addPlant,
  deletePlant,
  updatePlant,
  getAllPlants,
  getPlantById,
  getAllPlantsByUserId
}