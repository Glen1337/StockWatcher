// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require activestorage
//= require_tree .

$(function(){ $(document).foundation(); });

// Prettify nubmers by adding commas for thousands and rounding if needed
var NumOutput = function(input){
  num = +input.toFixed(2);
  num = parseFloat(num).toLocaleString();
  return num;
}

// Prettify nubmers by adding commas for thousands and rounding if needed with sign in front
var SignNumOutput = function(input, prepend = ''){
  num = +input.toFixed(2);
  num = parseFloat(num);

  if (num > 0){
    return `+${prepend}${num.toLocaleString()}`;
  }else if (num < 0){
    return `-${prepend}${Math.abs(num).toLocaleString()}`;
  }else{
    return '0';
  }
}

$(function(){
      var flashDurationInSeconds = 10;
      var flashContainerId = 'flash-messages';

      function removeFlashMessages() {
        $('#' + flashContainerId).remove();
      }

      setTimeout(removeFlashMessages, flashDurationInSeconds * 1000);
    })
