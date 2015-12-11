/**
 * Author: Cullin Lam clam@cs.uml.edu
 * Created by Cullin on 12/9/15.
 * File: word_history.js
 *
 * This file includes functions that deals with keeping track of words submitted
 *
 * Last Updated 12/10/15
 *  -Added Total score var
 *  - Added Total score counter to bottom of table
 *  - added error checking onsubmit
 *  - Added dictionary checking
 */



// The dictionary lookup object
var dict = {};

// Do a jQuery Ajax request for the text dictionary
$.get("words.txt", function (txt) {
    // Get an array of all the words
    var words = txt.split("\n");

    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for (var i = 0; i < words.length; i++) {
        //convert to upper case
        var str = '' + words[i];
        dict[str.toUpperCase()] = true;
    }
    console.log('done');
    console.log(dict['ON']);
});

var total_score = 0;

// submit curr word to history table if valid
function submit_word() {
    //check word to see if it is submittable
    if (!check_word()) {
        return;
    }

    // get the word into a string format
    var word = '';
    for (var i = 0; i < curr_word.length; i++) {
        word += curr_word[i];
    }
    // check if word in dict
    if (findWord(word)) {
        // increment total score
        total_score += Score;
        // create row
        var row = "<tr class='dynamic_row'> <td>" + word + "</td><td>" + $("#score").html() + "</td> </tr>";
        // Source Stack overflow for appending to last row
        //$('#history').find('tbody:last').append(row);
        //console.log($('#history').find('tbody:last').html());
        //$('#t_start').after(row);
        // append row
        $('#t_end').before(row);
        $('#t_score').html(total_score);
        Deal();
    }
    else {
        // write error message
        var message = word + " is not a valid word, please try another"
        $('#curr_word').html('<p style="color: red ">' + message + '</p>');
    }
}

// check word to see if has spaces inside word or is empty
function check_word() {
    var word = '';
    // get string version of word
    for (var i = 0; i < curr_word.length; i++) {
        word += curr_word[i];
    }
    //trim leading and trailing whitespace
    word = word.trim();
    // check if empty
    if (word == '') {
        // write error message
        $('#curr_word').html('<p style="color: red ">Make a word by placing tiles on the board</p>');
        return false;
    }
    // check if has spaces
    if (word.search(' ') !== -1) {
        // write error message
        $('#curr_word').html('<p style="color: red ">You cannot have spaces in your word</p>');
        return false;
    }
    return true;
}
// check to see if word is in dict
// source https://piazza.com/class/icm9jynacvn5kx?cid=43
// Modified to only pass in one word, which can then be verified.
function findWord(word) {
    // See if it's in the dictionary
    if (dict[word.trim()]) {
        // If it is, return that word

        return word;
    }

    // Otherwise, it isn't in the dictionary.
    return false;
}
