    ymaps.ready(init);
var myMap,
    myPlacemark;

function init() {
    myMap = new ymaps.Map("ymaps", {
        center: [55.704122, 37.572757],
        zoom: 15
    });

    myPlacemark = new ymaps.Placemark([55.704879, 37.565022], {
        hintContent: 'Москва, улица Косыгина, 15',
        balloonContent: 'Москва, улица Косыгина, 15'
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
}
