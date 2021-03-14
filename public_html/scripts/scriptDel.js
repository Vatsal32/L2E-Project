/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function validateData() {
    var rollnoVar = $("#rollno").val();
    if (rollnoVar === "") {
        alert("Roll No. is required. ");
        return "";
    }

    return rollnoVar;
}

function createREMOVEQuery(token, dbname, rel, rollno) {
    var DELQuery = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\"dbName\": \""
            + dbname
            + "\",\n" + "\"cmd\" : \"REMOVE\",\n"
            + "\"rel\" : \""
            + rel + "\","
            + "\"record\": \n"
            + rollno
            + "\n"
            + "}";

    return DELQuery;
}

function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr, createTime, updateTime) {
    if (createTime !== undefined) {
        if (createTime !== true) {
            createTime = false;
        }
    } else {
        createTime = false;
    }
    if (updateTime !== undefined) {
        if (updateTime !== true) {
            updateTime = false;
        }
    } else {
        updateTime = false;
    }
    var value1 = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
            + "\"dbName\": \""
            + dbname
            + "\",\n"
            + "\"rel\" : \""
            + relationName
            + "\",\n"
            + "\"jsonStr\":\n"
            + jsonObjStr
            + "\,"
            + "\"createTime\":"
            + createTime
            + "\,"
            + "\"updateTime\":"
            + updateTime
            + "\n"
            + "}";
    return value1;
}

function resetForm() {
    $("#rollno").val("");
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

function GETRecordNum() {
    var token = "90935793|-31948838436345743|90934646";
    var dbname = "Student";
    var relationName = "stu-rel";
    var rollnoVal = $("#rollno").val();
    var jsonStr = {
        rollno: parseInt(rollnoVal)
    };
    var reqString = createGET_BY_KEYRequest(token, dbname, relationName, JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommand(reqString,
            "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({async: true});

    var data = JSON.stringify(resultObj);
    var res = data.replace("{", "");
    res = res.replace("}", "");
    res = res.split(":");
    var recordNum = res[2].replace(",\"record\"", "");
    return parseInt(recordNum);
}

function delData() {
    try {
        var delQuery = createREMOVEQuery("90935793|-31948838436345743|90934646", "Student", "stu-rel", GETRecordNum());
    } catch (err) {
        alert(err);
    }
    alert(delQuery);
    jQuery.ajaxSetup({async: false});
    var resultObj = execute(delQuery, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

    resetForm();
}

