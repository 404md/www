
var params = {
    container: document.getElementById('location'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../json/animation-data.json'
};

var anim;

anim = bodymovin.loadAnimation(params);
