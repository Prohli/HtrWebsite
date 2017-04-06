/*überwachen der Position der Navbar und setzen der Klasse 'scrolled'.*/
$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());	
  });
});
