$('input').addClass("ui-corner-all");
$('input').addClass("ui-widget ui-widget-content");

$('#cardname').change(function() {

    var result = fuse.search($('#cardname').val());
    var imageurl = "";
    console.log(result[0]);
    if(result[0].image_url) {
        imageurl = result[0].image_url;
    } else {
        imageurl = template.replace("{code}",result[0].code);
    }
    var img = $('<img>');
    img.on('load', function() {
        $('#cardimage').hide('slide', {direction:"right"}, function() {
            $('#cardimage').attr('src', imageurl).show('slide', {direction:"right"});
        });
    });
    img.attr('src', imageurl);

    $('#cardname').val("");
});
$('#cardclose').click(function() {
    $('#cardimage').hide('slide', {direction:"right"});
});
$(document).click(function() {
    $('#cardname').focus();
});

template = "";

var cards = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'https://netrunnerdb.com/api/2.0/public/cards',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    template = json.imageUrlTemplate;
    return json;
})();


var options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["title"],
};
var fuse = new Fuse(cards.data, options);
