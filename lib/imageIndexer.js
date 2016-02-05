var ImageIndexer = (function(){
   var collection = [];
   var pointer = 0;
   var currentObj = null;
   
   function resetCollection(){
      collection = [];
      pointer = 0;
      currentObj = null;
   }
   
   function setCollection(data){
      resetCollection();
      collection = data;
      currentObj = collection[pointer]; 
   }
   
   function pushToCollection(obj){
      collection.push(obj);
   }
   
   function next(){
      if(collection.length === 0){
         throw Error('collection is empty, no next available!');
      }
      
      if(pointer >= (collection.length - 1)){
         pointer = 0;
      }
      else{
         pointer++;
      }
      
      currentObj = collection[pointer]; 
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

module.exports = ImageIndexer;