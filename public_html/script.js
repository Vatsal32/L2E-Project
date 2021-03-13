/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$("#empId").focus();

function validateData() {
    var empIdVar = $("#empId").val();
    if (empIdVar === "") {
        alert("Employee ID is required. ");
        return "";
    }

    var empNameVar = $("#empName").val();
    if (empNameVar === "") {
        alert("Employee Name is required. ");
        return "";
    }

    var empEmailVar = $("#empEmail").val();
    if (empEmailVar === "") {
        alert("Employee Email is required. ");
        return "";
    }

    var jsonStrObj = {
        empId: empIdVar,
        empName: empNameVar,
        empEmail: empEmailVar
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
    $("#empId").val("");
    $("#empName").val("");
    $("#empEmail").val("");
    $("#empId").focus();
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

function saveEmployee() {
    var jsonStr = validateData();
    if (jsonStr === "") {
        alert("ERROR. ");
        return;
    }
    // alert(jsonStr);
    var putQuery = createPUTQuery("90935793|-31948838436345743|90934646", "db", "emp-rel", jsonStr);
    alert(putQuery);
    jQuery.ajaxSetup({async: false});
    var resultObj = execute(putQuery, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
}

