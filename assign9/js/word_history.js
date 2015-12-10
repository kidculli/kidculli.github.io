/**
 * Created by Cullin on 12/9/15.
 */

function submit_word()
{
    // get the word into a string format
    var word = '';
    for(var i = 0 ; i < curr_word.length; i++)
    {
        word+= curr_word[i];
    }
    console.log($("#score").html());

    // create row
    var row ="<tr> <td>" + word + "</td><td>" + $("#score").html() + "</td> </tr>";
    $('#history').find('tbody:last').append(row);

    Deal();
}