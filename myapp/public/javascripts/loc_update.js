setInterval(location_update, 500);
let Treasure = [
    {
        "name": "fastpass",
        "lat": 250,
        "lng": 250
    }
]
function location_update() {
    // 例
$.ajax({
    url: "../location/user",
    type: 'GET',
    data: { foo: 'var', hoge: 'fuga' },
    cache: false,
}).done(function(res){
    let img = new Image();    //新規画像オブジェクト
    img.src = "../img/takarabune.png";
    
    const canvas = document.getElementById('canvas');
    const w = document.getElementById('canvas').clientWidth;
    const h = document.getElementById('canvas').clientHeight;
    // canvas.width = w;
    // canvas.height = h;
    // canvas.style.width = `${w}px`;
    // canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = "#0000FF";
    ctx.fillStyle = "#0000FF";

    // Canvas全体をクリア
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < Treasure.length; i++){
        console.log(Treasure[i]['lat'],Treasure[i]['lng']);
        ctx.drawImage(img, Treasure[i]['lng']-60,Treasure[i]['lat']-160, 50,50);
        // ctx.drawImage(img, Treasure[i]['loc'],Treasure[i]['lng']);
    }
    const json = JSON.stringify(res);
    // console.log(res['user_1'],res['user_1']['x'],res['user_1']['y']);

    // console.log(res);
    // console.log(res[0]);
    for (var i = 0; i < res.length; i++) {
        console.log(res[i]);
        x = res[i]['x'];
        y = res[i]['y'];

        // 要素を描画する
        ctx.beginPath();
        // ctx.strokeRect(x/10, x/10, 1, 1);
        // ctx.arc(x/10, x/10, 1, 0, 2 * Math.PI);

        var circle = new Path2D();
        circle.arc(x/10, y/10, 1, 0, 2 * Math.PI);
        ctx.fill(circle);

        // ctx.fill();
        // ctx.strokeRect(y, x, 10, 10);
    }
}).fail(function(){
    // alert('Failed!!');
});

}
