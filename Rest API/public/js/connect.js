/**
 * Created by caiomcg on 22/04/2017.
 */

const URL = "127.0.0.1:8080";

$(document).ready(function () {
    $("#connect").click(function () {
        console.log("Fetching: "  + URL + "/test.txt");
        jQuery.get("http://google.com", function (data, status) {
            if (status === 200) {
                console.log("Success");
                console.log(data);
            } else {
                console.log("Failed...");
            }
        });
    });
});