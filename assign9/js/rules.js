/**
 * Author: Cullin Lam clam@cs.uml.edu
 * File: rules.js
 *
 * Created by Cullin on 12/8/15.
 *
 * This file contains some global variable declarations as well as functions
 * that deal with basic game mechanics. Utilizes jquery ui plugin for
 * draggable and droppable feature
 *
 * - Utilizes some code from Alex Nevers, however I changed it a bit
 *  to work with the pieces array and bag.js and I added new methods
 *
 */


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
            for (var i = 0; i < Object.keys(ScrabbleTiles).length; i++) {
                // Get letter
                var char = String.fromCharCode(65 + i);

                for (var j = 0; j < ScrabbleTiles[char]["original-distribution"]; j++) {
                    Bag.push(char);
                }
            }

            // Shuffle the bag
            shuffle(Bag);
        }
    });


//global variables
// Array that contains all the scrabble pieces in a random order
var Bag = [];
//Boolean that keeps track if first deal or not
var FirstDeal = 0; //is it the first deal? 0=yes, 1=no
//Keeps track of word score
var Score = 0;
// array that holds characters of current word initialized with 7 blank chars
var curr_word = ['', '', '', '', '', '', ''];

//set drag and drop feature
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
                }
            });

            //Get current letter
            var current_letter = $(ui.draggable).children("img").attr("alt");
            //give scoring the current letter we dropped
            Scoring(current_letter, $(this).children("img").attr("alt"));

            $(this).droppable('option', 'accept', ui.draggable);


            var index;
            // get index position of scrabble board
            index = $(this).attr('id');
            // Update current word with letter placed on board
            curr_word[parseInt(index)] = current_letter;
            // display word
            display_curr_word();

        },
        // decrement points if tile removed, and fix curr word
        out: function (event, ui) {
            $(this).droppable('option', 'accept', '.draggable');
            UnScoring($(ui.draggable).children("img").attr("alt"));
            // get index of Scrabble tile
            var index = $(this).attr('id');
            // set letter in curr word to empty string and redisplay
            curr_word[index]="";
            display_curr_word();
        }

    });
};


//deals letter tiles to player
function Deal() {
    // iterator
    var j;
    // Holds scrabble tile
    var temp_piece;
    //if its not the first deal, empty the rack before adding tiles
    if (FirstDeal === 1)
        $("#rack").html("");

    // if there are less than 7 tiles left in the Bag deal whatever amount is left
    if (Bag.length < 7) {
        for (j = 0; j < Bag.length; j++) {
            // take piece from Bag
            temp_piece = PickPiece();
            //Add piece image to rack
            $("#rack").append("<div class='draggable'>"
                + "<img src='img/Scrabble_Tile_"
                + temp_piece
                + ".jpg' width=50 height=50 alt='"
                + temp_piece
                + "'>"
                + "</div>");
        }
    }
    //Get 7 pieces
    else {
        for (j= 0; j < 7; j++) {
            temp_piece = PickPiece();
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

    // reset Drag and Drop
    DragAndDrop();

    //resets score to zero, because we just dealt and there are no words yet
    Score = 0;

    //we have to rewrite the score on the page to zero
    $("#score").html(Score);

    //update the table
    build_table();

    //Reset Curr Word
    reset_curr_word();
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
    else {
        Score += letterscore;
    }
    //write the score on the page
    $("#score").html(Score);
}
;
//Displays current word onto the page
function display_curr_word() {
    var word_str = "";
    for (var i = 0; i < curr_word.length; i++) {
        word_str += curr_word[i];
    }
    $("#curr_word").html(word_str);
};
// reset curr word array and remove display
function reset_curr_word() {
    curr_word = ['', '', '', '', '', '', ''];
    $("#curr_word").html("");
}

// decrement score when tile is removed
function UnScoring(tile) {

    // get value of tile
    var letterscore = ScrabbleTiles[tile]["value"];
    //decrement from score
    Score -= letterscore;

    $("#score").html(Score);

}