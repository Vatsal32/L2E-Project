/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function createGETQuery(token, dbname, rel, jsonStr) {
    var GETQuery = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n" + "\"cmd\" : \"GET\",\n"
            + "\"dbName\": \""
            + dbname
            + "\",\n"
            + "\"rel\" : \""
            + rel
            + "\",\n"
            + "\"jsonStr\":\n"
            + jsonStr
            + "\n"
            + "}";
    return GETQuery;
}

function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
function showData() {
    var token = "90935793|-31948838436345743|90934646";
    var dbname = "Student";
    var relationName = "stu-rel";
    var roll = document.getElementById("rollno").value;
    var jsonStr = {
        rollno: parseInt(roll)
    };
    var reqString = createGETQuery(token, dbname, relationName, JSON.stringify(jsonStr));
    alert(reqString);
    jQuery.ajaxSetup({async: false});
    try {
        var resultObj = executeCommand(reqString,
            "http://api.login2explore.com:5577", "/api/irl");
    } catch(err) {
        alert(err);
    }
    jQuery.ajaxSetup({async: true});

    var data = JSON.stringify(resultObj);
    var res = data.replace("{", "");
    res = res.replace("}", "");
    res = res.split(":");
    var mainContainer = document.getElementById("show");
    var name = res[5].replace("\\\"", "");
    name = name.replace("\\\"\",\"message\"", "");
    var rollNo = res[4].replace(",\\\"stuName\\\"", "");
    var course = res[2].replace("\\\"", "");
    course = course.replace("\\\",\\\"stuEmail\\\"", "");
    var email = res[3].replace("\\\"", "");
    email = email.replace("\\\",\\\"rollno\\\"", "");
    mainContainer.innerHTML = "Roll No.: " + rollNo + "<br><br>Name: " + name + "<br><br>Course: " + course + "<br><br>Email: " + email;
}
