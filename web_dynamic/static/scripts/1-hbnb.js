$( () => {
  const dict = {};

  $('div.amenities li input').change( () => {
      if ($(this).is(':checked')) {
        dict[($(this).attr('data-id'))] = $(this).attr('data-name');
      } else {
        delete dict[($(this).attr('data-id'))];
      }
      $('div.amenities h4').html(Object.values(dict).join(', ') || '&nbsp;');
    });
});
