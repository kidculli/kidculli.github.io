/**
 * Created by Cullin on 11/3/15.
 */
function genTable() {
    /*
     This function will generate a dynamic multiplication table if the input parameters are valid
     else error messages will be displayed.
     */
    // set x as DOM object for frm1
    x = document.getElementById("frm1");
    // save input from form into appropriate vars, global so they can be accessed by the validate function
    // horizontal start number
    h_start = x.elements[0].value;
    //horizontal end number
    h_end = x.elements [1].value;
    //vertical start number
    v_start = x.elements[2].value;
    //vertical end number
    v_end = x.elements[3].value;
    // string that will be used to construct table html
    table_struct = "";
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