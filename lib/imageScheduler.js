module.exports = function(io, imageIndexer, freq){      
   return {      
      Schedule: function(){
         setTimeout(function() {
            io.emit('nextImage', imageIndexer.next());   
         }, freq);
      }      
   };
}