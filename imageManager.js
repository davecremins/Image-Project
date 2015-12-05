var ImageManager = (function(){
   var collection = [];
   var pointer = 0;
   var currentObj = null;
   
   function setCollection(data){
      collection = data;
   }
   
   function pushToCollection(obj){
      collection.push(obj);
   }
   
   function next(){
      if(collection.length === 0){
         pointer = 0;
      }
      
      if(pointer > (collection.length - 1)){
         pointer = 0;
      }
      
      currentObj = collection[pointer++]; 
      return currentObj;      
   }
   
   function peek(){
      return currentObj;
   }
   
   function collectionSize(){
      return collection.length;      
   }
   
   return {
     set: setCollection,
     add: pushToCollection,
     next: next,
     current: peek,
     size: collectionSize
   };
}());

module.exports = ImageManager;