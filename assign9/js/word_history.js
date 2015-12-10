/**
 * Author: Cullin Lam clam@cs.uml.edu
 * Created by Cullin on 12/9/15.
 * File: word_history.js
 *
 * This file includes functions that deals with keeping track of words submitted
 */

// Accesses current word array and appends it to history table
function submit_word()
{
    // get the word into a string format
    var word = '';
    for(var i = 0 ; i < curr_word.length; i++)
    {
        word+= curr_word[i];
    }

    // create row
    var row ="<tr> <td>" + word + "</td><td>" + $("#score").html() + "</td> </tr>";
    // Source Stack overflow for appending to last row
    $('#history').find('tbody:last').append(row);

    Deal();
}