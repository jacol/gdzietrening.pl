var mongoose = require('mongoose');

var UAT = 'mongodb://gdzietrening:gdzietrening!1@ds035573.mongolab.com:35573/gdzietrening';
var DEV = 'mongodb://jacol-gdzietrening-1826025';

exports.connect = function(env, cb){
  var address = null;
  if(env === 'DEV') mongoose.connect(DEV);
  else if (env === 'UAT') mongoose.connect(UAT);
  
  var db = mongoose.connection;
  db.on('error', function(err){
    console.error(err)
    cb(err)
  });
  
  db.once('open', function (callback) {
    mongoose.model('facilities', SCHEMA_facilities);
    cb();
  });
}

exports.close = function(){
  mongoose.connection.close();
};

exports.facility = function(){
  return mongoose.model('facilities', SCHEMA_facilities);
};


var SCHEMA_facilities = mongoose.Schema({
    name: String,
    location: {
      city: String,
      address: String,
      postal: String,
      lon: Number,
      lat: Number
    },
    phone: String,
    web: String,
    type: [],
    rating:{
      votes: Number,
      value: Number
    },
    images:[
      {
        url: String,
        description: String
      }
    ],
    schedule:{
      mon:[
        {
          name: String,
          time: String,
          description: String
        }
      ],
      tue:[
        {
          name: String,
          time: String,
          description: String
        }
      ],
      wed:[
        {
          name: String,
          time: String,
          description: String
        }
      ],
      thu:[
        {
          name: String,
          time: String,
          description: String
        }
      ],
      fri:[
        {
          name: String,
          time: String,
          description: String
        }
      ],
      sat:[
        {
          name: String,
          time: String,
          description: String
        }
      ],
      sun:[
        {
          name: String,
          time: String,
          description: String
        }
      ]
    },
    openhours:{
      mon:[],
      tue:[],
      wed:[],
      thu:[],
      fri:[],
      sat:[],
      sun:[]
    },
    systems:
    [
      {
        name: String,
        payment: String
      }
    ]
  });