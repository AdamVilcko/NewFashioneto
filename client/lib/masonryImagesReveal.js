$.fn.masonryImagesReveal = function( $items ) {
  var msnry = this.data('masonry');
  var itemSelector = msnry.options.itemSelector;

  //BACKBONE remove outer wrapper container

  $items = $( $items.html() );

  // hide by default
  $items.hide();
  // append to container
  this.append( $items );
  $items.imagesLoaded().progress( function( imgLoad, image ) {
    // get item
    // image is imagesLoaded class, not <img>, <img> is image.img
    var $item = $( image.img ).parents( itemSelector );

    // masonry does its thing
    msnry.appended( $item );

    // un-hide item
    $item.fadeIn("slow");
  });

  return this;
};