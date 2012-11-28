$(function() {
  $.fn.mail_checker = function(options) {
    var defaults = {
      trigger_on: "change",
      success:        function() { },
      invalid_format: function() { },
      invalid_domain: function() { },
      temporary_mail: function() { },
      complete: function(response) {
        if(response.status === 200) options.success();
        if(response.status === 422) options.invalid_format();
        if(response.status === 502) options.invalid_domain();
        if(response.status === 406) options.temporary_mail();
      }
    }
    options = $.extend({}, defaults, options);
    $(this).bind(options.trigger_on, function() {
      var data = { email: $(this).val() };
      $.ajax({
        url: "http://mail-checker.com/emails.json",
        data: data,
        dataType: "json",
        complete: options.complete
      });
    });
  };
})
