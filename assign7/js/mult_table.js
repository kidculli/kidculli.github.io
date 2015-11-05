/**
 * Created by Cullin Lam clam@cs.uml.edu
 * on 11/3/15.
 *
 * Last Updated on 11/5/15
 *
 *    11/5/15
 *      - Changed variables in genTable to be local instead of global
 *
 *    11/4/15
 *      - Added document ready function call to this js file from html
 *
 *
 *
 *  This file holds all Javascript that runs the dynamic multiplication table
 *  found on kidculli.github.io/assign7/validate__mult_table.html
 */
function genTable() {
    /*
     This function will generate a dynamic multiplication table using the parameters from frm1 input
     */

    // set x as DOM object for frm1
    var x = document.getElementById("frm1");
    // save input from form into appropriate vars
    // horizontal start number
    var h_start = x.elements[0].value;
    //horizontal end number
    var h_end = x.elements [1].value;
    //vertical start number
    var v_start = x.elements[2].value;
    //vertical end number
    var v_end = x.elements[3].value;
    // string that will be used to construct table html
    var table_struct = "";
    // local iterators
    var i;
    var j;

    //debug
    console.log(h_start);
    console.log(h_end);
    console.log(v_start);
    console.log(v_end);

    // Clear previous table if exists
    document.getElementById("dynamic").innerHTML = "";

    // construct and display table if input params are valid

    // add multiplication table horizontal header row
    table_struct += "<tr><th>x</th>";
    for (i = h_start; i <= h_end; i++) {
        table_struct += "<th>" + i + "</th>";
    }
    table_struct += "</tr>";

    // construct table data rows
    for (j = v_start; j <= v_end; j++) {
        // add multiplication table vertical header row
        table_struct += "<tr><th>" + j + "</th>";
        for (i = h_start; i <= h_end; i++) {
            table_struct += "<td>" + (i * j) + "</td>";
        }
        table_struct += "</tr>";
    }

    // debug message
    console.log(table_struct);
    // set table content
    document.getElementById("dynamic").innerHTML = table_struct;
}

// When page is ready, validation will begin
$(document).ready(function() {
    // source for this type of method http://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot

    // add  a validate method that checks if the starting value is greater than the ending value
    $.validator.addMethod("lessThan",
        function (value, element, param) {
            var $otherElement = $(param);
            return parseInt(value, 10) <= parseInt($otherElement.val(), 10);
        },"Starting value is greater than ending value");

    $("#frm1").validate({
        rules:{
            h_start:{
                number:true,
                required:true,
                range:[-1000,1000],
                lessThan:"#h_end"
            },
            h_end: {
                number:true,
                required:true,
                range:[-1000,1000]
            },
            v_start: {
                number:true,
                required:true,
                range:[-1000,1000],
                lessThan:"#v_end"
            },
            v_end: {
                number:true,
                required:true,
                range:[-1000,1000]
            }
        }, // end of rules

        // custom error messages
        messages: {
            h_start: {
                lessThan: "Horizontal starting value is greater than horizontal ending value"
            },
            v_start: {
                lessThan: "Vertical staring value is greater than vertical ending value"
            }
        } // end messages
    }); //end validate

});