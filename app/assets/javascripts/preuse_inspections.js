$(document).ready(function() {
  const elementId = $('form')[0].action.split('elements/')[1].split("/preuse")[0]

  $('#preuse_inspection_date').on('change', (event) => {
    $.ajax({
      url: `/elements/${elementId}/preuse_inspections/date/${event.target.value}`
    })
  });
});
