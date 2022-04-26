
// 设置cookie
export  function setCookie(name,value,time="d30"){
  const strsec = getsec(time);
  const exp = new Date();
  exp.setTime(exp.getTime() + strsec*1);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}


//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
// setCookie(“name”,“hayden”,“s20”);
function getsec(str){
    // alert(str);
    const str1=str.substring(1,str.length)*1; 
    const str2=str.substring(0,1); 
    if (str2=="s"){
    return str1*1000;
    }else if (str2=="h"){
    return str1*60*60*1000;
    }else if (str2=="d"){
    return str1*24*60*60*1000;
    }
}
// 根据name获取cookie对应的值
export function getCookie(name){
  let arr;
  const reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return unescape(arr[2]);
  }else{
    return null;
  }
}
// 删除cookie
export function delCookie(name){
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval=getCookie(name);
  if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}