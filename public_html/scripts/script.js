/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$("#rollno").focus();

function validateData() {
    var rollnoVar = $("#rollno").val();
    if (rollnoVar === "") {
        alert("Roll No. is required. ");
        return "";
    }

    var stuNameVar = $("#stuName").val();
    if (stuNameVar === "") {
        alert("Student Name is required. ");
        return "";
    }

    var stuEmailVar = $("#stuEmail").val();
    if (stuEmailVar === "") {
        alert("Student Email is required. ");
        return "";
    }
    
    var stuCourseVar = $("#stuCourse").val();
    if (stuCourseVar === "") {
        alert("Student Course is required. ");
        return;
    }

    var jsonStrObj = {
        rollno: parseInt(rollnoVar),
        stuName: stuNameVar,
        stuCourse: stuCourseVar,
        stuEmail: stuEmailVar
    };

    return JSON.stringify(jsonStrObj);
}

function createPUTQuery(token, dbname, rel, jsonStr) {
    var PUTQuery = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\"dbName\": \""
            + dbname
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + rel + "\","
            + "\"jsonStr\": \n"
            + jsonStr
            + "\n"
            + "}";

    return PUTQuery;
}

function resetForm() {
    $("#rollno").val("");
    $("#stuName").val("");
    $("#stuEmail").val("");
    $("#stuCourse").val("");
    $("#rollno").focus();
}

function execute(reqStr, baseUrl, apiUrl) {
    var url = baseUrl + apiUrl;
    var jsonObj;
    $.post(url, reqStr, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJson = result.responseText;
        jsonObj = JSON.parse(dataJson);
    });

    return jsonObj;
}

function saveStudent() {
    var jsonStr = validateData();
    if (jsonStr === "") {
        alert("ERROR. ");
        return;
    }
    //  alert(jsonStr);
    var putQuery = createPUTQuery("90935793|-31948838436345743|90934646", "Student", "stu-rel", jsonStr);
    alert(putQuery);
    jQuery.ajaxSetup({async: false});
    var resultObj = execute(putQuery, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    
    resetForm();
}

