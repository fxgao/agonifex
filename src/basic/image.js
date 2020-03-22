function getBase64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
  }
  
const toBase64Image = function (imgUrl) {
    var image = new Image();
    image.crossOrigin = '';
    image.src = imgUrl;
    image.onload = function () {
      var base64 = getBase64(image);
      return base64
    }
};

export default{
    toBase64Image
}