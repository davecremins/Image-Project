var ImageManager = (function(){
   var collection = [];
   var pointer = 0;
   var currentObj = null;
   
   function setCollection(data){
      collection = data;
   }
   
   function pushToCollection(obj){
      console.log('Previous length of collection ' + collection.length);
      
      collection.push(obj);
      
      console.log('New length of collection ' + collection.length);
   }
   
   function next(){
      if(collection.length === 0){
         console.log('collection length 0 so resetting pointer');
         pointer = 0;
      }
      
      if(pointer > (collection.length - 1)){
         console.log('pointer is ' + pointer);
         console.log('collection length - 1 is ' + (collection.length - 1));
         console.log('resetting pointer');
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