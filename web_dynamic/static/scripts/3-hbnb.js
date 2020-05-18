$(document).ready(main);
function main () {
  const ame = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      ame[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete ame[$(this).attr('data-name')];
    }
    const names = Object.keys(ame);
    $('.amenities h4').text(names.sort().join(', '));
  });
  status();
  placesGet();
}
function status () {
  $.get('http://0.0.0.0:5001/api/v1/status/', (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}
function placesGet () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (result) {
      for (const item of result) {
        const placess = ['<article>',
          '<div class="title_box">',
        `<h2>${item.name}</h2>`,
        `<div class="price_by_night">$ ${item.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${item.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${item.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${item.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${item.description}`,
        '</div>',
        '</article>'];
        $('section.places').append(placess.join(''));
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}
