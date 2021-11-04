var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

//background color
context.beginPath();
context.fillStyle = 'rgb( 51, 153, 102)';
context.fillRect(0, 0, canvas.width, canvas.height);

document.write('<img id="joker" src="./trump/joker.png" width="150vw" height="150vw">');
document.write('<button id="hit" type="button">ヒット</button>');
document.write('<button id="stand" type="button">スタンド</button>');
document.write('<button id="newgame" type="button">New Game</button>');

document.write('<p id="victory">VICTORY</p>');
document.write('<p id="lose">LOSE</p>');
document.write('<p id="draw">DRAW</p>');


window.onload = function(){
    hit.style.top = canvas.height - 350;
    hit.style.left = canvas.width / 2 - 69;

    stand.style.top = canvas.height - 350;
    stand.style.left = canvas.width / 2 - 13;

    newgame.style.top = canvas.height - 323;
    newgame.style.left = canvas.width / 2 - 70;
    newgame.style.display = 'block';

    victory.style.top = canvas.height - 170;
    victory.style.left = canvas.width / 2 - 180;

    lose.style.top = canvas.height - 170;
    lose.style.left = canvas.width / 2 - 100;
    
    draw.style.top = canvas.height - 170;
    draw.style.left = canvas.width / 2 - 100;
};


var card_back_top = 0;
var card_back_left = 0;
for(i = 0; i < 10; i++){
    document.write('<img id="card_back' + i +'" src="./trump/card_back.png" width="150vw" height="150vw">');
    var elem = document.getElementById("card_back"+ i);
    var width = elem.width;
    var height = elem.height;
    card_back_top = (canvas.height - height) / 2 - i;
    card_back_left = (canvas.width - width) / 2 - i;
    $("#card_back" + i).css({ 'position' : 'absolute', 'top' : card_back_top, 'left' : card_back_left});
}

for(i = 10; i < 30; i++){
    document.write('<img id="card_back' + i +'" src="./trump/card_back.png" width="150vw" height="150vw">');
    var elem = document.getElementById("card_back"+ i);
    var width = elem.width;
    var height = elem.height;
    card_back_top = (canvas.height - height) / 2 - 9;
    card_back_left = (canvas.width - width) / 2 - 9;
    
    if(i >= 13){
        $("#card_back" + i).css({ 'position' : 'absolute', 'top' : card_back_top, 'left' : card_back_left, 'z-index' : 100});
    }else{
        $("#card_back" + i).css({ 'position' : 'absolute', 'top' : card_back_top, 'left' : card_back_left});
    }
}



for(i = 1; i <= 13; i++){
    document.write('<img id="s' + i +'" src="./trump/s' + i + '.png" width="150vw" height="150vw">');
    $("#s" + i).css({ 'position' : 'absolute', 'top' : 0, 'left' : 0, 'display' : 'none'});
    document.write('<img id="h' + i +'" src="./trump/h' + i + '.png" width="150vw" height="150vw">');
    $("#h" + i).css({ 'position' : 'absolute', 'top' : 0, 'left' : 0, 'display' : 'none'});
    document.write('<img id="d' + i +'" src="./trump/d' + i + '.png" width="150vw" height="150vw">');
    $("#d" + i).css({ 'position' : 'absolute', 'top' : 0, 'left' : 0, 'display' : 'none'});
    document.write('<img id="c' + i +'" src="./trump/c' + i + '.png" width="150vw" height="150vw">');
    $("#c" + i).css({ 'position' : 'absolute', 'top' : 0, 'left' : 0, 'display' : 'none'});
}


var x = 0;
document.getElementById('s3').onclick = function(){
    x += 30;
    document.getElementById('s3').style.left = x;
}


function move_card(startx, starty, endx, endy, id, del_flg, apper_card_id, z_index, is_hit, judge=''){
    var vecx = endx - startx;
    var vecy = endy - starty;
    var norm = (Math.sqrt(vecx * vecx + vecy * vecy));
    var evecx = vecx / norm * 5;
    var evecy = vecy / norm * 5;
    var x = startx;
    var y = starty;
    var move_norm_x = Math.abs(vecx);
    var move_norm_y = Math.abs(vecy);

    function trans(){
        if(move_norm_x <= 0 && move_norm_y <= 0){
            id.style.top = endx;
            id.style.left = endy;
            clearInterval(loop);
            function rem(){
                id.style.display = 'none';
            }
            $(apper_card_id).css({ 'position' : 'absolute', 'top' : endx, 
            'left' : endy, 'display' : 'block', 'z-index' : z_index});
            if(del_flg){
                setTimeout(rem, 150);
            }
            if(judge == 'lose'){
                lose.style.display = 'block';
                stand.style.display = 'none';
            }else if(judge == 'victory' && is_hit == false){
                victory.style.display = 'block';
                hit.style.display = 'none';
                stand.style.display = 'none';
            }else if(is_hit){
                hit.style.display = 'block';
            }
        }else{
            x += evecx;
            y += evecy;
            move_norm_x -= Math.abs(evecx);
            move_norm_y -= Math.abs(evecy);
            id.style.top = x;
            id.style.left = y;
        }
    }

    var loop = setInterval(trans,1);
    card_back14.style.top = base_card_back_posx;
    card_back14.style.left = base_card_back_posy;
    card_back14.style.display = 'block';
}

var player_cards = [];
var player_count = 0;
var dealer_cards = [];
var dealer_count = 0;

var base_card_back_posx = (canvas.width - width) / 2 - 9;
var base_card_back_posy = (canvas.height - height) / 2 - 9;

var cards = [];
function init_game(){
    cards.length = 0;
    player_cards.length = 0;
    dealer_cards.length = 0;

    for(i = 0; i < 52; i++){
        cards.push(i);
    }
    for(i = 1; i <= 13; i++){
        $("#s" + i).css({ 'position' : 'absolute', 'top' : 0, 'left' : 0, 'display' : 'none'});
        $("#h" + i).css({ 'position' : 'absolute', 'top' : 0, 'left' : 0, 'display' : 'none'});
        $("#d" + i).css({ 'position' : 'absolute', 'top' : 0, 'left' : 0, 'display' : 'none'});
        $("#c" + i).css({ 'position' : 'absolute', 'top' : 0, 'left' : 0, 'display' : 'none'});
    }
    var card_back_top = (canvas.height - height) / 2 - 9;
    var card_back_left = (canvas.width - width) / 2 - 9;
    for(i = 10; i <= 13; i++){
        $("#card_back" + i).css({ 'position' : 'absolute', 'top' : card_back_top, 'left' : card_back_left, 'display' : 'block'});
    }
    hit_count = 0;
    z_index = 0;
    victory.style.display = 'none';
    lose.style.display = 'none';
    draw.style.display = 'none';
}


function rand_card_id(){
    var rand_index = Math.floor(Math.random() * cards.length);
    var rand_num = cards[rand_index];
    cards.splice(rand_index, 1);

    var syou = Math.floor(rand_num / 13 );
    var card_mark = 'd';
    if(syou == 0){
        card_mark = 's';
    }else if(syou == 1){
        card_mark = 'c';
    }else if(syou == 2){
        card_mark = 'h';
    }

    return "#" + card_mark + String(Math.floor(rand_num % 13 ) + 1);
}

function count_card(cards){
    var count = 0;
    var ace_num = 0;
    cards.forEach(function(element){
        if(element == 1){
            ace_num += 1;
        }
        if(element < 10){
            count += element;
        }else{
            count += 10;
        }
        
    });

    while(ace_num != 0){
        if(count <= 11){
            count += 10;
            ace_num--;
        }else{
            break;
        }
    }

    return count;
}

var z_index = 0;
$('#newgame').click(function(){
    console.log('jquery');
    init_game();
    card_back10.style.left = 500;
    hit.style.display = 'block';
    stand.style.display = 'block';

    var card_id = rand_card_id();
    var id = card_id;
    move_card(base_card_back_posx, base_card_back_posy,
        100, 
        (canvas.width) / 2 - card_back0.width,
        card_back12, true, card_id, z_index++, false);
    var res = Number(id.replace(/[^0-9]/g, ''));
    dealer_cards.push(res);

    card_id = rand_card_id();
    id = card_id;
    move_card(base_card_back_posx, base_card_back_posy,
            (canvas.height - card_back0.height) - 100, 
            (canvas.width) / 2 - card_back0.width,
            card_back10, true, card_id, z_index++, false);
    res = Number(id.replace(/[^0-9]/g, ''));
    player_cards.push(res);

    card_id = rand_card_id();
    id = card_id;
    move_card(base_card_back_posx, base_card_back_posy,
            100, 
            (canvas.width) / 2 - card_back0.width + 50,
            card_back13, false, card_id, z_index++, false);
    res = Number(id.replace(/[^0-9]/g, ''));
    dealer_cards.push(res);

    card_id = rand_card_id();
    id = card_id;
    res = Number(id.replace(/[^0-9]/g, ''));
    player_cards.push(res);
    dealer_count = count_card(dealer_cards);
    player_count = count_card(player_cards);
    var judge = '';
    //プレイヤーがブラックジャック
    if(player_count == 21){
        judge = 'victory';
    }
    move_card(base_card_back_posx, base_card_back_posy,
            (canvas.height - card_back0.height) - 100, 
            (canvas.width) / 2 - card_back0.width + 50,
            card_back11, true, card_id, z_index++, false, judge);


    console.log(dealer_cards);
    console.log(player_cards);

    console.log(dealer_count);
    console.log(player_count);
})

var hit_count = 0;
$('#hit').click(function(){
    hit_count++;
    console.log('hit');
    hit.style.display = 'none';
    var endx = (canvas.height - card_back0.height) - 100;
    var endy = (canvas.width) / 2 - card_back0.width + 50 * (hit_count + 1);

    var card_id = rand_card_id();
    var id = card_id;
    var res = Number(id.replace(/[^0-9]/g, ''));
    player_cards.push(res);
    player_count = count_card(player_cards);
    console.log(player_cards);
    console.log(player_count);
    var judge = '';
    if(player_count > 21){
        judge = 'lose';
    }
    move_card(base_card_back_posx, base_card_back_posy,
        endx, endy, card_back14, true, card_id, z_index++, true, judge);
})

function judge_game(){
    if(dealer_count < player_count || dealer_count > 21){
        victory.style.display = 'block';
    }else if(dealer_count > player_count){
        lose.style.display = 'block';
    }else{
        draw.style.display = 'block';
    }
    hit.style.display = 'none';
    stand.style.display = 'none';
}


function sleepByPromise(sec) {
    return new Promise(resolve => setTimeout(resolve, sec*1000));
}

$('#stand').click(function(){
    hit.style.display = 'none';
    stand.style.display = 'none';
    card_back13.style.display = 'none';
    //ディーラーがブラックジャック
    if(dealer_count == 21){
         lose.style.display = 'block';
    }else if(dealer_count >= 17){
        judge_game();
    }else{
        for(i = 0; true; i++){
            if(dealer_count >= 17){
                break;
            }else{
                var card_id = rand_card_id();
                var id = card_id;
                var res = Number(id.replace(/[^0-9]/g, ''));
                dealer_cards.push(res);
                dealer_count = count_card(dealer_cards);
                var endx = 100;
                var endy = (canvas.width) / 2 - card_back0.width + 50 * (i + 2);

                move_card(base_card_back_posx, base_card_back_posy,
                    endx, endy, card_back14, true, card_id, z_index++, false);
            }
        }
        judge_game();
    }
})

var vec = 1;
var y = 0
function _draw(){
    joker.style.top = y;
    y += vec;

    if(y >= 300 || y < 0){
        vec *= -1;
    }
}
setInterval(_draw, 3);






