requirejs.config({
  baseUrl: 'js',

  paths: {
  },

  shim: {
  }
});

require(['app'],

function(App) {
  window.bTask = new App();

$.get('http://0.0.0.0:3000/guid', function(result){
    console.log(result)
})

});