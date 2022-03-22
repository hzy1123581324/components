// 强制跳转到https，要判断环境是否是h5


var reg = /^(192.168.1.)/;
if(window.location.hostname !== 'localhost' && !reg.test(window.location.hostname)) {
  // 判断非本地server时 http强制转换成https
  var targetProtocol = "https:";
  if (window.location.protocol != targetProtocol)
  window.location.href = targetProtocol +
  window.location.href.substring(window.location.protocol.length);
}