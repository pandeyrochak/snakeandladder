var mul_factor_x=[1,3,5,7,9,11,13,15,17,19];
var mul_factor_y=[19,17,15,13,11,9,7,5,3,1];
let snakes=[[3,37],[10,28],[16,47],[32,75],[42,96],[71,94]];
let ladders=[[4,56],[12,50],[14,55],[22,58],[41,79],[54,88]];
let die_value,i=1;
var canvas=document.querySelector('canvas');
canvas.height=700;
canvas.width=700;
var c=canvas.getContext('2d');

var cord_x,cord_y;
let p1_position={
    player_pos:0,
    p_no:1,
    cord_x:-100,
    cord_y:-100
};
let p2_position={
    player_pos:0,
    p_no:2,
    cord_x:-100,
    cord_y:-100
};
function reset()
{
    p1_position.player_pos=0;
    p2_position.player_pos=0;
    i=1;
    c.clearRect(0,0,700,700);
    p1_position.cord_x=-100;
    p1_position.cord_y=-100;
    p2_position.cord_x=-100;
    p2_position.cord_y=-100;
}
function turnbyturn()
{
    i=!i;
    console.log(i+1+" 's turn ")
    if(i==0)
    {
        x=p1_position;
    }
    if(i==1)
    {
        x=p2_position;
    }
    generate_random(x);
}
function generate_random(x)
{
    die_value=Math.floor(Math.random()*5)+1;
    dispDice();
    if((x.player_pos+die_value)<=100)
        update_player(x);
}
function dispDice()
{
    console.log("Dice value: "+die_value);
    for(let i=1;i<=6;i++)
    {
        let id="d1";
        if(die_value==i)
        {
            let newsrc="dice-"+i+".png";
            document.getElementById(id).src=newsrc;
        }
    }
}
function update_player(x)
{
    x.player_pos+=die_value;
    for(let i=0;i<snakes.length;i++)
    {
        if(x.player_pos==snakes[i][1])
        {
            x.player_pos=snakes[i][0];
        }
        if(x.player_pos==ladders[i][0])
        {
            x.player_pos=ladders[i][1];
        }
    }
    if(x.player_pos>100)
        x.player_pos=100;
    console.log("player "+ x.p_no+" at "+x.player_pos);
    setTimeout(movePiece,1000,x);
    setTimeout(checkwinner,2000,x);
}
function checkwinner()
{
    if(p1_position.player_pos>=100)
    {
        alert("! Player 1 Wins the game !");   
        reset();
    }

    if(p2_position.player_pos>=100)
    {
        alert("! Player 2 Wins the game !");
        reset();
    }
}
function movePiece(x)
{
    var pos=x.player_pos-1;
    if((pos>=0&&pos<=9)||(pos>=20&&pos<=29)||(pos>=40&&pos<=49)||(pos>=60&&pos<=69)||(pos>=80&&pos<=89))
    {
        var x_rem=pos%10;
        var y_rem=Math.floor(pos/10);
        x.cord_x=mul_factor_x[x_rem];
        x.cord_y=mul_factor_y[y_rem];
    }
    else
    {
        var x_rem=pos%10;
        var y_rem=Math.floor(pos/10);
        x.cord_x=mul_factor_y[x_rem];
        x.cord_y=mul_factor_y[y_rem];
    }
    x.cord_x=35*x.cord_x;
    x.cord_y=35*x.cord_y;
    c.clearRect(0,0,700,700);
    c.beginPath();
    c.fillStyle="blue";
    c.arc(p1_position.cord_x,p1_position.cord_y,23,0,Math.PI*2,false);
    c.fill();
    c.closePath();
    c.beginPath();
    c.fillStyle="green";
    c.arc(p2_position.cord_x,p2_position.cord_y,23,0,Math.PI*2,false);
    c.fill();
    c.closePath();       
}