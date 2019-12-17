$(document).ready(function() {
  $('#show-more-periodics').click(e => {
    e.preventDefault();
    if ($('#show-more-periodics')[0].innerText == "Show more") {
      $('.periodic-li').css('display', 'list-item');
      $('#show-more-periodics')[0].innerText = "Show fewer";
    } else {
      $('.periodic-li:nth-child(n+2)').css('display', 'none');
      $('#show-more-periodics')[0].innerText = "Show more";
    }
  });
});