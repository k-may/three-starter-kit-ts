require.config({

  paths: {
    //main libraries
    jquery: './components/jquery/dist/jquery.min',
    three: './components/threejs/build/three',
  },


  shim: {
    'tweenjs' : {
      exports : 'TWEEN'
    },
    'jquery': {
      exports: '$'
    },
    'underscore' : {
      exports: '_'
    },
    'three' : {
      exports : 'THREE'
    }
  }
});
/**
 * Created by kev on 15-10-08.
 */
require(["ts/main_view"],
  function (MainView) {

  'use strict';
  var mainView;

  var init = function() {
    mainView = new MainView();
    $(document).ready(function () {
      draw(Date.now());
    });
  }

  var draw = function(time) {
    requestAnimationFrame(draw);
    mainView.draw(time);
  }

  init();
});
//# sourceMappingURL=main.js.map
