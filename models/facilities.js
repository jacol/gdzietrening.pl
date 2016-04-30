var db = require('../db');


function handleResult(err, docs, cb){
  if (err) return cb(err);
    if(docs == null || docs.length == 0){
      cb(new Error('Facility not found!'));
    }
    if(docs.length > 1){
      cb(new Error('Found more than 1 facilities!'));
    }
    cb(null, docs[0]);
}

exports.get = function(id, cb) {
  db.facility().find({_id:id}, function(err, docs) {
    handleResult(err, docs, cb);
  });
};

exports.getByName = function(name, cb) {
  db.facility().find({name:name}, function(err, docs) {
    handleResult(err, docs, cb);
  });
};

exports.all = function(cb) {
  db.facility().find({}, function(err, result){
    if (err) return cb(err);
    if(result == null || result.length == 0){
      cb(new Error('Facilities not found!'));
    }
    
    cb(null, result);
  });
};
