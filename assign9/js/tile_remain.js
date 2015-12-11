/**
 * Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 * Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely
 * copied or excerpted for educational purposes with credit to the author.
 *
 * This file builds current distribution table
 *
 * Updated by Cullin 12/9/15
 *  - Initializes table with table heading
 */


// This function builds the tiles remaining table

var tiles_remaining = 100;

function build_table()
    {
        // define variables here to thwart hoisting
        var char ;          // uppercase character indicated by the loop index
        var newTableRow ;   // one row of the table
        var newTableCell ;  // one cell in a table row
        var nTiles = 0 ;    // number of tiles (to check that all 100 accounted for)

        // Clear table if exists

        $("#tbl").html("<tr> <th>Tile</th> <th>Value</th> <th>Number<br>Remaining</th> </tr>");

        // populate table of tile values
        // note that an associative array is actually an object, so to get its length
        //    we have to first reference its keys and count those
        for ( k = 0 ; k < Object.keys( ScrabbleTiles ).length + 1 ; k++ ) {
            // convert the integer loop index to an uppercase character, which the
            //    subscript of the associative array of tile objects
            if ( k < Object.keys( ScrabbleTiles ).length - 1 ) {
                char = String.fromCharCode( 65 + k ) ;
            } else if ( k < Object.keys( ScrabbleTiles ).length ) {
                char = "_" ;
            } else {
                char = "Total" ;
            }

            // create a new table row to hold the info on one tile
            newTableRow = $("<tr></tr>" ) ;

            // create a new table cell to hold the letter of the tile we're looking at
            newTableCell = $("<td></td>" ) ;
            if ( k < Object.keys( ScrabbleTiles ).length ) {
                if ( char !== "_" ) {
                    // put the letter of the tile into the new table cell
                    newTableCell.text( char ) ;
                } else {
                    newTableCell.text( "Blank" ) ;
                }
            } else {
                newTableCell.attr( "colspan", "2" ) ;
                newTableCell.css( {
                    "font-weight" : "bold",
                    "font-style" : "italic",
                    "background-color" : "black",
                    "color" : "white",
                    "text-align" : "right" } ) ;
                newTableCell.text( "Total Tiles:" ) ;
            }
            // append the new table cell to the new table row
            newTableRow.append( newTableCell ) ;

            if ( k < Object.keys( ScrabbleTiles ).length ) {
                // create a new table cell to hold the value of the tile we're looking at
                newTableCell = $("<td></td>" ) ;
                // put the letter of the tile into the new table cell
                // here we can use the dot syntax because "value" is a plain indentifier
                newTableCell.text( ScrabbleTiles[ char ].value ) ;
                // append the new table cell to the new table row
                newTableRow.append( newTableCell ) ;
            }

            // create a new table cell to hold the number of tiles remaining of the tile
            //    we're looking at
            newTableCell = $("<td></td>");
            if ( k < Object.keys( ScrabbleTiles ).length ) {
                // put the numer of tiles for the letter into the new table cell
                // here we must use the 2-D array syntax because "number-remaining" contains a hyphen
                newTableCell.text( ScrabbleTiles[ char ][ "number-remaining" ] ) ;
                // add number of tiles for this letter to the count of the total number of tiles
                nTiles += ScrabbleTiles[ char ][ "number-remaining" ] ;
            } else {
                newTableCell.css( {
                    "font-weight" : "bold",
                    "background-color" : "black",
                    "color" : "white" } ) ;
                newTableCell.text( nTiles ) ;
                tiles_remaining = nTiles;
            }
            // append the new table cell to the new table row
            newTableRow.append( newTableCell ) ;
            //$('#t_remain').html(newTableCell.text);
            // append the complete table row to the table
            $("#tbl").append( newTableRow ) ;
        }
};


$(document).ready( function (){
    build_table();
} ) ;