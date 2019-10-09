(function(){
  // Add custom Method to HTML Element Object
  HTMLElement.prototype.setStyle = function(style) {
    for(let property in style) {
      if(!style.hasOwnProperty(property)) continue;

      this.style[property] = style[property];
      // console.log(dom)
    }
  }

  // Prepare HTML DOM Component
  const main = document.getElementById('main');

  // Prepare Style for main element
  let mainStyle = {
    backgroundColor: 'red',
    color: 'white',
    minHeight: '200px',
    width: '200px',
    borderRadius: '50%',
    transition: '1s',
    margin: '30px auto'
  }

  // Set delay 4s
  setTimeout(()=> {
    // Set Up Style
    main.setStyle(mainStyle)
  }, 1000);
})()