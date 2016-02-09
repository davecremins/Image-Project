module.exports = function(io, imageIndexer, freq){      
   return {      
      Schedule: function(){
         setInterval(function() {
            console.log('Emitting at interval');
            io.emit('nextImage', imageIndexer.next());   
         }, freq);
      }      
   };
}