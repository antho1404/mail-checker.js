$(function() {
  $.fn.mail_checker = function(token, options) {
    if(typeof token === 'object') {
      options = token;
      token = null;
    }
    var defaults = {
      token: null,
      trigger_on: "change",
      success:        function() { },
      invalid_format: function() { },
      invalid_domain: function() { },
      temporary_mail: function() { },
      error:          function(error) { console.error(error); },
      complete: function(response) {
        if(response.status === 200) options.success();
        if(response.status === 422) options.invalid_format();
        if(response.status === 502) options.invalid_domain();
        if(response.status === 406) options.temporary_mail();
        if(response.status === 400) options.error($.parseJSON(response.responseText).error);
      }
    }
    options = $.extend({}, defaults, options);
    if(!token) {
      token = options.token;
      if(!token) {
        console.error("Missing token parameter");
        return;
      }
    }
    $(this).bind(options.trigger_on, function() {
      var data = {
        token: token,
        domain: document.domain,
        email: $(this).val()
      };
      $.ajax({
        url: "http://www.mail-checker.com/check",
        data: data,
        dataType: "json",
        complete: options.complete
      });
    });
  };
})
