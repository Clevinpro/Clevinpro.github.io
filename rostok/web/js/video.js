
$('document').ready(function() {
    var options = {
        videoId: '180727422',
        zIndex: -1,
        parameters: {
            autopause: 1,
            autoplay: 1,
            badge: 1,
            byline: 1,
            color: '000',
            loop: 1,
            player_id: 'demo',
            portrait: 1,
            title: 1
        }
    };
    $('#video').vimelar(options);
    
});