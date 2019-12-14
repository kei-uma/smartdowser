setInterval(location_update, 500);
function location_update() {
    // 例
$.ajax({
    url: "../location/user",
    type: 'GET',
    data: { foo: 'var', hoge: 'fuga' },
    cache: false,
}).done(function(res){
    const canvas = document.getElementById('canvas');
  
    const w = 400;
    const h = 400;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#00FFFF";
    ctx.strokeStyle = "#0000FF";
    ctx.fillStyle = "#00FFFF";

    // Canvas全体をクリア
    ctx.clearRect(0, 0, w, h);

    const json = JSON.stringify(res);
    // console.log(res['user_1'],res['user_1']['x'],res['user_1']['y']);
    var min = 0 ;
    var max = 400 ;

    var x = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    var y = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    // console.log(res);
    // console.log(res[0]);
    for (var i = 0; i < res.length; i++) {
        console.log(res[i]);
        x = res[i]['x'];
        y = res[i]['y']

        // 要素を描画する
        ctx.beginPath();
        ctx.strokeRect(x, y, 10, 10);
        // ctx.strokeRect(y, x, 10, 10);
    }
}).fail(function(){
    // alert('Failed!!');
});

}