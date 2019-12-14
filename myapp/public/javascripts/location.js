'use strict';
// const socket = io.connect('http://localhost:3000/socket.io/socket.io.js');

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    //ユーザ名とメッセージの内容のデータをまとめる
    const userMessage = { userName, message };

    // 空文字以外ならTrue判定を逆転 == 空文字ならTrueになる
    if (!message.match(/\S/g)) {
        alert('テキストを入力してください');
        $('#message').val('');
        return false
    }

    // 投稿内容に正解が含まれているかの確認
    if (message.match(answer)) {
        alert('正解しました！');
        exit();
    }
    else{
      console.log(answer+ '不正解');
    }

    // 投稿内容を送信
    socket.emit('sendMessage', userMessage);

    // 投稿したら削除
    $('#message').val('');
    return false;
}

// 休止ボタンが押されたらフラッグを変更
function take_break() {
    take_break_flag = !take_break_flag;
    const userName = $('#userName').val();
    if (take_break_flag) {
        $('#take_break_button').val('休止中');
        const takeBreakText = '休止しました'
        const userMessage = { userName, takeBreakText }
        socket.emit('sendTakeBreakNotification', userMessage);
    } else {
        const takeBreakText = '復帰しました'
        const userMessage = { userName, takeBreakText }
        $('#take_break_button').val('休止する');
        socket.emit('sendTakeBreakNotification', userMessage);
    }
}

// function location_update() {
//     console.log('javascript/location',userMessage);
//     const canvas = document.getElementById('canvas');
  
//     const w = 400;
//     const h = 400;
//     canvas.width = w;
//     canvas.height = h;
//     canvas.style.width = `${w}px`;
//     canvas.style.height = `${h}px`;
    
//     document.body.appendChild(canvas);

//     const ctx = canvas.getContext('2d');
//     ctx.strokeRect(100, 200,10, 10);
// }
// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receive', function (userMessage) {
    console.log('javascript/location',userMessage);
    const canvas = document.getElementById('canvas');
  
    const w = 400;
    const h = 400;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.strokeRect(100, 200,10, 10);
});

