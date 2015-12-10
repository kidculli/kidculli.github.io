/**
 * Created by Cullin on 12/8/15.
 */

//
//Deals the first hand of tiles on pageload
$(document).ready(
    function () {

        Bag = ResetBag();
        Deal();
    });

//Sets up drag and drop interface on pageload
$(document).ready(
    function () {
        DragAndDrop();

        // set up draw bag
        // Bag is the array that you will get your pieces from
        var Bag = [];

        // ResetBag() will reset the bag with pieces
        function ResetBag() {
            // Empty bag
            Bag = [];

            // Iterate through all pieces
            for(var i = 0; i < Object.keys(ScrabbleTiles).length; i++) {
                // Get letter
                var char = String.fromCharCode(65 + i);

                for(var j = 0; j < ScrabbleTiles[char]["original-distribution"]; j++) {
                    Bag.push(char);
                }
            }

            // Shuffle the bag
            shuffle(Bag);
        }
    });


//global vairables
var Bag = [];
var FirstDeal = 0; //is it the first deal? 0=yes, 1=no
var letters = "";  //string to keep track of
var Score = 0;  //score global
var Droppped = 0;
// array that holds characters of current word
var curr_word = ['','','','','','',''];

////alphabet array and the corresponding array of values in alphabetical order
//var piecesarray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
//var valuesarray = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];


//drag and drop stuff
function DragAndDrop() {
    $(".draggable").draggable({
        revert: 'invalid',
        snap: ".droppable",
        snapMode: "inner"
    });
    $(".droppable").droppable({
        accept: ".draggable",
        drop: function (event, ui) {

            //snap to center modified from here:
            /* http://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center */

            ui.draggable.position({
                my: "center",
                at: "center",
                of: $(this),
                using: function (pos) {
                    $(this).animate(pos, 200, "linear");
                }});

            //give scoring the current letter we dropped
            var current_letter = $(ui.draggable).children("img").attr("alt");
            Scoring(current_letter, $(this).children("img").attr("alt"));

            $(this).droppable('option', 'accept', ui.draggable);
            // Update current word
            var index;
            index = $(this).attr('id');
            curr_word[parseInt(index)] = current_letter;
            console.log(curr_word);
            // display word
            display_curr_word();

        },
        out: function (event, ui) {
            $(this).droppable('option', 'accept', '.draggable');
            UnScoring($(ui.draggable).children("img").attr("alt"));
        }

    });
}
;


//deals letter tiles to player
function Deal() {

    console.log("Bag length:"+Bag.length);
    var temp_piece;
    if (FirstDeal === 1)    //if its not the first deal, empty the rack before adding tiles
        $("#rack").html("");

    // if there are less than 7 tiles left in the Bag
    if (Bag.length < 7)
    {
        for (var j = 0; j< Bag.length; j++) {
            temp_piece = PickPiece()
            console.log(temp_piece);
            $("#rack").append("<div class='draggable'>"
                + "<img src='img/Scrabble_Tile_"
                + temp_piece
                + ".jpg' width=50 height=50 alt='"
                + temp_piece
                + "'>"
                + "</div>");
        }
    }
else {
        for (var j = 0; j < 7; j++) {
            temp_piece = PickPiece()
            //console.log(temp_piece);
            $("#rack").append("<div class='draggable'>"
                + "<img src='img/Scrabble_Tile_"
                + temp_piece
                + ".jpg' width=50 height=50 alt='"
                + temp_piece
                + "'>"
                + "</div>");
        }
    }
    //it is no longer the first deal
    FirstDeal = 1;

    //I dont know why but the drag and drop interface needs to be reimplented entirely after deal
    DragAndDrop();

    //resets score to zero, because we just dealt and there are no words yet
    Score = 0;

    //we have to rewrite the score on the page to zero
    $("#score").html("<p>Score: " + Score + "<p>");

    //update the table
    build_table();
}
;

//score the game
function Scoring(tile, square) {

    // get score of tile
    var letterscore = ScrabbleTiles[tile]["value"];

    if (square === "doubleletter") {
        Score += letterscore * 2;
    }
    else if (square === "tripleword") {
        Score += letterscore * 3;
    }
    else{
        Score+=letterscore;
    }
    //write the score on the page
    $("#score").html(Score);
}
;

function display_curr_word()
{
    var word_str = "";
    for(var i=0;i<curr_word.length;i++)
    {
        word_str +=  curr_word[i];
    }
    $("#curr_word").html(word_str);
};

function reset_curr_word()
{
    curr_word = ['','','','','','',''];
    $("#curr_word").html("");
}

function UnScoring(tile){

    var letterscore = 0; //score of our current tile

    for (var i = 0; i < 26; i++) {
        if (tile === piecesarray[i]) {
            letterscore = valuesarray[i];
        }
    }

    Score = Score - letterscore ;

    $("#score").html("<p>Score: " + Score + "<p>");

}