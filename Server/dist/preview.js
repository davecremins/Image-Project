function readURL(input) {
   if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
         $('#imageToTag').attr('src', e.target.result).load(function(){
            captureOriginalDimensions({
               width: this.naturalWidth, 
               height: this.naturalHeight
            });
         });
      }

      reader.readAsDataURL(input.files[0]);
      var captureOriginalDimensions = function(dimensions){
         $('#origWidth').val(dimensions.width);
         $('#origHeight').val(dimensions.height);
      };
   }
}

$('#imageSelector').change(function() {
   readURL(this);
});