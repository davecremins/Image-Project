var MongoClient = require('mongodb').MongoClient;

module.exports = function(url, defaultCollection){

   if(typeof defaultCollection !== 'undefined')
      url += '/' + defaultCollection;
   var MongoConnection = function(cb){
      MongoClient.connect(url, function (err, db) {
         if (err) {
            console.log('Unable to connect to mongo server at %s. Error:', url, err);
         } else {
            console.log('Connection established to', url);
            if(typeof cb !== 'undefined')
               cb(db);
         }
      });   
   };   

   return {

      insert: function(collectionName, data, callback){
         MongoConnection(function(mongoDb){
            var collection = mongoDb.collection(collectionName);
            collection.insert(data, function (err, result) {
               if (err){
                  console.log("Error occured inserting data into mongodb");
                  console.log(err);
               }
               else{
                  console.log('New object with id %s inserted into collection - %s ', result._id, collectionName);
               }
               
               mongoDb.close();
               
               console.log(callback);
               
               if(typeof callback === 'function')
                  callback(result);
            });
         });            
      },

      get: function(collectionName, field, query, cb){
         MongoConnection(function(mongoDb){
            var collection = mongoDb.collection(collectionName);
            var findCriteria = {};
            findCriteria[field] = query;

            collection.find(findCriteria).toArray(function (err, result) {
               if (err)
                  console.log(err);
               else if (result.length)
                  console.log('Found results');
               else
                  console.log('No document(s) found with find criteria - %s', query);

               mongoDb.close();

               if(typeof cb !== 'undefined')
                  cb(result);
            });            
         });
      }
   };
};