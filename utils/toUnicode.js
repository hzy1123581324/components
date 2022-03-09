
/*
中文转Unicode
*/

function toUnicode(str){ 
          return str.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g,function(newStr){
            return "\\u" + newStr.charCodeAt(0).toString(16); 
　　　　　　}); 
　　　　}

// toUnicode('爱的发声阿斯蒂芬阿斯蒂芬阿萨德看得开的肯定看得开问额额')
//"\u7231\u7684\u53d1\u58f0\u963f\u65af\u8482\u82ac\u963f\u65af\u8482\u82ac\u963f\u8428\u5fb7\u770b\u5f97\u5f00\u7684\u80af\u5b9a\u770b\u5f97\u5f00\u95ee\u989d\u989d"

/*
unicode 转中文

*/
function tohanzi(str)
{
    return unescape(str.replace(/\\u/g, '%u'))
}