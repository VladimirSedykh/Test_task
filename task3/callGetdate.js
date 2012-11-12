$(document).ready(function() {

  $('body').getdate({
    format: 'days', // years, moth, days, hours.
    element: 'time', // tag name, class or id.
    attribute: 'data-interval'
  });

});
