// hex转json字符串,16进制ASCII
var hex2str = function(hex) {
    var arr = hex.split("")
    var out = ""
    for (var i = 0; i < arr.length / 2; i++) {
        var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
        var charValue = String.fromCharCode(tmp);
        out += charValue
    }
    return out
};

// json字符串转hex
var str2hex = function(str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {

        val += str.charCodeAt(i).toString(16);
        
    }

    return "0x" + val
}

export default {
    str2hex,
    hex2str
}
