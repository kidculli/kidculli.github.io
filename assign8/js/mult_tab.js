

/**
 * Created by Cullin Lam clam@cs.uml.edu
 * on 11/19/15.
 *
 * Last Updated on 11/21/15
 *         11/21/15
 *           - created function to reset slider pos
 *         11/20/15
 *          - added 2 way binding to sliders
 *          - change form valid action to return false instead of disabling submit
 *
 *  This file holds all Javascript that runs the dynamic multiplication table
 *  found on kidculli.github.io/assign8/tab_mult_table.html
 *
 *  Adapted source code from Son Nguyen
 */


$(document).ready(function() {
    var tabs = $("#myTabs").tabs();
    // validator
    $.validator.addMethod('greaterThanRowStart', function(value, element, param) {
        if (colEndVal.value === "") {
            return true;
        }
        return parseInt(colEndVal.value) >= parseInt(colStartVal.value);
    }, "The ending point must be greater than the starting point.");

    $.validator.addMethod('greaterThanColStart', function(value, element, param) {
        return parseInt(rowEndVal.value) >= parseInt(rowStartVal.value);
    }, "The ending point must be greater than the starting point.");

    $('#form').validate({
        rules: {
            colStartVal: {
                required: true,
                number: true,
                range: [-100,100]
            },
            colEndVal: {
                required: true,
                number: true,
                greaterThanRowStart: true,
                range: [-100,100]
            },
            rowStartVal: {
                required: true,
                number: true,
                range: [-100,100]
            },
            rowEndVal: {
                required: true,
                number: true,
                greaterThanColStart: true,
                range: [-100,100]
            }
        },

        /* "The validation plugin allows you to configure these class names"
         * http://stackoverflow.com/questions/6168926/jquery-validation-how-to-make-fields-red
         */
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });

    // Moves slider when form input is recieved
    $( "#colStartVal" ).change(function() {
        curr_val = $("#colStartVal").val()
        $("#colStartslider").slider("value",curr_val);
    });

    $( "#colEndVal" ).change(function() {
        curr_val = $("#colEndVal").val()
        $("#colEndslider").slider("value",curr_val);
    });

    $( "#rowStartVal" ).change(function() {
        curr_val = $("#rowStartVal").val()
        $("#rowStartslider").slider("value",curr_val);
    });


    $( "#rowEndVal" ).change(function() {
        curr_val = $("#rowEndVal").val()
        $("#rowEndslider").slider("value",curr_val);
    });

    // creates  table in new tab
    function crTable(nextTabNo) {
        // getting the four values
        // putting a "+" to treat the value as a number instead of string
        var colStartVal = +document.getElementById("colStartVal").value;
        var colEndVal = +document.getElementById("colEndVal").value;
        var rowStartVal = +document.getElementById("rowStartVal").value;
        var rowEndVal = +document.getElementById("rowEndVal").value;
        // get the reference for the preview
        var preview = document.getElementById(nextTabNo);
        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        // creating all cells
        for (var i = colStartVal, ii = colEndVal + 1; i <= ii; ++i) {
            // creates a table row
            var row = document.createElement("tr");
            for (var j = rowStartVal, jj = rowEndVal + 1; j <= jj; ++j) {
                // creates a cell
                var cell = document.createElement("td");
                var cellText;
                // give some style to the cell/table
                var cellStyle = "padding: 10px; ";
                if (i == colStartVal && j == rowStartVal) {
                    cellText = document.createTextNode("");
                    cell.setAttribute("style", cellStyle +
                        "background-color: #069");
                } else if (i == colStartVal) {
                    cellText = document.createTextNode(j - 1);
                    cell.setAttribute("style", cellStyle +
                        "background-color: #069");
                } else if (j == rowStartVal) {
                    cellText = document.createTextNode(i - 1);
                    cell.setAttribute("style", cellStyle +
                        "background-color: #069");
                } else {
                    cellText = document.createTextNode((i - 1) * (j -
                        1));
                    cell.setAttribute("style", cellStyle +
                        "background-color: #8181F7");
                }
                // add the text to cell
                cell.appendChild(cellText);
                // add the cell to row
                row.appendChild(cell);
            }
            // add the row to the end of the table body
            tblBody.appendChild(row);
        }
        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into preview
        preview.appendChild(tbl);
    }
    var tabsdiv = $("#myTabs");
    var tabslist = tabsdiv.find("ul");
    var nextTabNo = tabslist.find("li").length;
    // When create button click, a new tab will generate
    $('#create').click(function() {
        // check for first time
        if (!$('form').valid()) {
            return false;
        }
        /* create a new tab with close button next to it
         * http://stackoverflow.com/questions/14357614/add-close-button-to-jquery-ui-tabs
         */
        tabslist.append('<li id="li' + nextTabNo +
            '"><a href="#tab' + nextTabNo + '">' + 'Tab ' +
            nextTabNo +
            '<\/a><input name="check" type="checkbox" id="checkbox' +
            nextTabNo + '"><span id="tabspan' + nextTabNo +
            '" class="ui-icon ui-icon-circle-close"></span><\/li>'
        );
        // add content to the new tab
        tabsdiv.append('<div id="tab' + nextTabNo + '"><\/div>');
        // create content table to the new tab
        crTable("tab" + nextTabNo);
        ++nextTabNo;
        $('#myTabs').tabs("refresh");
    });
    // When close span clicked, it will close the tab that are closest to which you clicked
    tabs.delegate("span.ui-icon-circle-close", "click", function() {
        var panelId = $(this).closest("li").remove().attr(
            "aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });
    $('#delete').click(function() {
        // push id in the selected
        var selected = [];
        $('input:checkbox:checked').each(function() {
            selected.push($(this).attr('id'));
        });
        // remove those unwanted tabs
        for (var m = 0; m < selected.length; m++) {
            var checkboxID = "" + selected[m];
            var num = checkboxID.substring(8, checkboxID.length);
            $('#tab' + num).remove();
            $('#li' + num).remove();
        }
        $('#tabs').tabs("refresh");
    });


    /*A click event handler if the close tab button was clicked.*/
    $("#tab" + (nextTabNo - 1) + " .close").bind("click", function() {
        var tabsdiv = $("#myTabs");
        var tabslist = tabsdiv.find("ul");

        /*Get the id of the tab to be removed.*/
        var id = $(this).parent().parent().attr("id");

        /*First, remove the div. */
        $(this).parent().parent().remove();

        /*Second, remove the tab itself. */
        $("#myTabs").find("ul").find("li a[href='#" + id + "']").parent().remove();

        /*Refresh to show the resulted tabs. */
        tabsdiv.tabs("refresh");
        total = total - 1;

        /*Remove the tabs widget if there is no tabs. */
        if (total == 0) {
            tabsdiv.tabs("destroy");
            nextTabNo = 0;
        }
    });


    //will make every tab gone
    $("#clear").bind("click", function() {

        $('#myTabs li').remove();
        $('#myTabs div').remove();

        nextTabNo = 0;


    });


});

// resets form input and sliders positions
function reset_frm_sld()
{
    $("#colStartslider").slider("value",1);
    $("#colEndslider").slider("value",1);
    $("#rowStartslider").slider("value",1);
    $("#rowEndslider").slider("value",1);

};