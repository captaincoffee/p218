---
layout: null
---

// cookie agreement
$(function() {
  if ( $.cookie('cookiesAgreement') == undefined ){
    $('.cookiesAgreement').show();
    $('.agreeCockies').click(
      function(){
        $.cookie('cookiesAgreement', 'http://www.youtube.com/watch?v=MMb3fd7fwec', { expires: 365, path: '/' });
        $('.cookiesAgreement').hide();
      }
    );
  }
});



