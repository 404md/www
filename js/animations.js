
var params = {
    container: document.getElementById('location'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/js/animation-data.json'
};

var anim;

anim = bodymovin.loadAnimation(params);
