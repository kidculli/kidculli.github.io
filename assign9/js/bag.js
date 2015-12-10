/**
 * Author: Cullin Lam clam@cs.uml.edu
 * File: bag.js
 * Created by Cullin on 12/8/15.
 * This file deals with functions that implement and deal with the Scrabble Bag of tiles.
 *
 * I got much of this code from Ramon Meza http://weblab.cs.uml.edu/~rmeza/scrabble/
 * I updated it to work with the pieces_array.js from Jesse Heines
 */


// ResetBag() will reset the bag with pieces and tile distribution and returns a new Bag
        function ResetBag() {
            // Empty bag
            var Bag = [];

            // Iterate through all pieces
            for (var i = 0; i < Object.keys(ScrabbleTiles).length; i++) {

                // Get letter
                if ( i < Object.keys( ScrabbleTiles ).length - 1 ) {
                    var char = String.fromCharCode(65 + i);
                }
                // Last value in Scrabble Tiles is '_'
                else if ( i == Object.keys( ScrabbleTiles ).length -1 ) {
                    char = "_";
                }
                // Push tiles into Bag
                for (var j = 0; j < ScrabbleTiles[char]["original-distribution"]; j++) {
                    Bag.push(char);

                }
                // reset distribution
                ScrabbleTiles[char]["number-remaining"] = ScrabbleTiles[char]["original-distribution"];
            }
            // reset table
            build_table();
            // reset word
            reset_curr_word();
            // Shuffle the bag
            shuffle(Bag);
            return Bag;
        }

// PickPiece() will return a letter piece and remove it from the bag
function PickPiece() {
    // Get a random index
    var RandomIndex = Math.floor(Math.random() * Bag.length);

    /// Get the piece to return
    var piece = Bag[RandomIndex];

    // Remove piece from bag
    Bag.splice(RandomIndex, 1);

    //console.log(piece);
    //decrement current distribution
    ScrabbleTiles[piece]["number-remaining"]--;

    // Shuffle the bag
    shuffle(Bag);

    // Return piece
    return piece;
}

// Wonderful shuffle function courtesy of http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}