require('dotenv').config();
const express = require('express');
const router = express.Router();
const calculateController = require('../../controllers/calculateController'); // Import the controller
const {authenticate} = require ('../../middleware/authMiddlewar')

router.get('/spots', authenticate,calculateController.getspotbyLimit);
  router.get('/spotname/:spotName', authenticate, calculateController.getSpotByName);
  router.post('/calculate', authenticate, calculateController.calculatebyInput);
  router.get('/estimate', authenticate, calculateController.calculateEstimate);
  router.post('/calculatebyaccesible', authenticate, calculateController.calculateEstimatedTime);
  router.get('/getallspots', authenticate,calculateController.getAllSpots);

  

  module.exports=router;

