var FunctionHelper = (function(){
   var execute = function(func, count){
      for(var i = 0; i < count; i++)
         func();
   }
   
   return {
     exec: execute 
   };
}());

module.exports = FunctionHelper;