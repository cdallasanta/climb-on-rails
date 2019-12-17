$(document).ready(function() {
  const elementId = $('#periodic-inspection-form')[0].action.split('elements/')[1].split("/periodic")[0]

  $('#periodic_inspection_date').on('change', (event) => {
    $.ajax({
      url: `/elements/${elementId}/periodic_inspections/date/${event.target.value}`
    })
  });
});