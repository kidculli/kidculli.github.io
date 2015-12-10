/**
 * Created by Cullin on 12/8/15.
 */
// Bag is the array that you will get your pieces from


// ResetBag() will reset the bag with pieces and tile distribution
        function ResetBag() {
            // Empty bag
            var Bag = [];
            console.log(Object.keys(ScrabbleTiles).length);
            // Iterate through all pieces
            for (var i = 0; i < Object.keys(ScrabbleTiles).length; i++) {
                //console.log(i);
                // Get letter
                if ( i < Object.keys( ScrabbleTiles ).length - 1 ) {
                    var char = String.fromCharCode(65 + i);
                }
                else if ( i == Object.keys( ScrabbleTiles ).length -1 ) {
                    char = "_";
                    console.log("Added _ to bag");
                }
                for (var j = 0; j < ScrabbleTiles[char]["original-distribution"]; j++) {
                    Bag.push(char);

                }
                // reset distribution
                ScrabbleTiles[char]["number-remaining"] = ScrabbleTiles[char]["original-distribution"];
            }
            // reset table
            build_table();
            console.log(Bag.length);
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

// PieceValue(letter) returns the value of 'letter'
function PieceValue(letter) {
    return ScrabbleTiles[letter]["value"];
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