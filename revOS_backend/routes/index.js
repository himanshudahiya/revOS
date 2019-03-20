var express = require('express');
var router = express.Router();

var csv = require("csv-parser");
var fs = require('fs');
var mongoose = require('mongoose');
const Bikes = require('../models/Bikes');
var csvfile = __dirname + "/../public/bikes.csv";
var stream = fs.createReadStream(csvfile);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RevOS' });
});

router.get('/loadcsv', function(req, res, next){
    bikes = [];

    fs.createReadStream(csvfile)
    .pipe(csv({
      mapHeaders: ({ header, index }) => "h"+index
    }))
    .on('data', function(data){
        try {
            var bike = new Bikes({
              _id: mongoose.Types.ObjectId(),
              tripduration: parseInt(data.h0, 10),
              starttime: new Date(data.h1),
              stoptime: new Date(data.h2),
              startStationID: parseInt(data.h3, 10),
              startStationName: data.h4,
              startStationLatitude: parseFloat(data.h5, 10),
              startStationLongitude: parseFloat(data.h6, 10),
              endStationID: parseInt(data.h7, 10),
              endStationName: data.h8,
              endStationLatitude: parseFloat(data.h9, 10),
              endStationLongitude: parseFloat(data.h10, 10),
              bikeID: parseInt(data.h11, 10),
              userType: data.h12,
              birthYear: data.h13,
              gender: parseInt(data.h14, 10)
            });
            bikes.push(bike);
            console.log(bike.tripduration);
        }
        catch(err) {
            //error handler
            console.log(err);
        }
    })
    .on('end',function(){
        Bikes.insertMany(bikes, function(error, docs){
          if(error){
              console.log(error);
            }
        });
        console.log(" End of file import");
        res.json({success : "Data imported successfully.", status : 200});
    });

});

router.get('/getData', function(req, res, next){
  Bikes.find({})
    .exec()
    .then(bike=>{
      if (!bike||bike.length < 1) {
                return res.status(401).json({
                    success: false,
                    error: "Bikes Not found"
                });
            } else {
                res.status(201).json({
                    success: true,
                    bike_details: bike
                });
            }
    })
    .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                success: false
            });
        });
});

router.get('/getStations', function(req, res, next){
      Bikes.aggregate([{
        $group: {
          _id: {
            startStationID: "$startStationID",
            startStationName: "$startStationName" ,
            startStationLatitude: "$startStationLatitude",
            startStationLongitude: "$startStationLongitude"
          }
        }
      }])
      .exec()
      .then(result=>{
        res.status(201).json({
            success: true,
            station: result
        });
      })
      .catch(
        err => {
          console.log(err);
          res.status(500).json({
              error: err,
              success: false
          });
        });
});


router.post('/getStationDetails', function(req, res, next){
  console.log(req.body);
  if(!req.body.stationID){
    res.status(500).json({
        error: "No StationID Given",
        success: false
    });
  } else if(!req.body.startTime){
    res.status(500).json({
        error: "No Start Time Given",
        success: false
    });
  } else if(!req.body.endTime){
    res.status(500).json({
        error: "No End Time Given",
        success: false
    });
  } else{
    Bikes.find({
      $and:
      [{
        "endStationID":parseInt(req.body.stationID, 10)
      },
      {
        "stoptime":{
          $gte: new Date(req.body.startTime),
          $lte: new Date(req.body.endTime)
        }
      }
      ]})
    .exec()
    .then(result=>{
      if(req.body.allData=='false'){
        res.status(201).json({
            success: true,
            count: result.length
        });
      } else{
        res.status(201).json({
            success: true,
            count: result.length,
            bikes: result
        });
      }
    })
    .catch(err=>{
      res.status(500).json({
          error: err,
          success: false
      });
    });
  }
});

module.exports = router;
