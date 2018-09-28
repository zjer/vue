import { baseUrl } from './env'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type == 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }



  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      // credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
      mode: "cors",
      cache: "no-cache"
    }

    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    /**登录用 */
    if (type == 'POST2') {
      requestConfig.headers = {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
      }
      Object.defineProperty(requestConfig, 'body', {
        value: data
      })
    }
    try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      console.log("response ",responseJson);
      //token失效跳转到登录页
      if(responseJson.message == '已拒绝为此请求授权。'){
        console.log("tocken过期了，重新登录...");
        location.href=baseurl+'/manage'
      }
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }
      if (type == 'POST2') {
        sendData = data;
      }

      requestObj.open(type, url, true);

      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}

export function ajax(cfg) {
  if (!cfg.url) {
    return;
  }
  if (!cfg.type) {
    cfg.type = "get";
  }
  if (cfg.async != false && cfg.async != true) {
    cfg.async = true;
  }
  var xmlHttp;
  if (window.ActiveXObject) {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  else if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }
  else {
    alert("您的浏览器不支持异步数据访问操作");
    return;
  }
  if (!cfg.dataType) {
    cfg.dataType = "";
  }
  else {
    cfg.dataType = cfg.dataType.toLowerCase();
  }
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4) {
      if (cfg.onAjaxReady) {
        cfg.onAjaxReady.call(xmlHttp);
      }
      if (xmlHttp.status == 200) {
        if (cfg.success) {
          var contentType = xmlHttp.getResponseHeader("Content-Type");
          if (contentType == null) {
            cfg.success(null);
          }
          else if (contentType.indexOf("application/json") > -1 || cfg.dataType == "json") {
            cfg.success(parseJson(xmlHttp.responseText));
          }
          else {
            cfg.success(xmlHttp.responseText);
          }
        }
      }
      else if (xmlHttp.status == 600) {
        window.top.location.href = xmlHttp.statusText;
      }
      else {
        if (cfg.error) {
          cfg.error(xmlHttp.responseText);
        }
      }
      if (cfg.complete) {
        if (cfg.complete) {
          cfg.complete();
        }
      }
    }
  }
  xmlHttp.open(cfg.type, cfg.url, cfg.async);
  if (!cfg.contentType) {
    cfg.contentType = "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (cfg.headers && cfg.headers.length > 0) {
    for (var i = 0; i < cfg.headers.length; i++) {
      xmlHttp.setRequestHeader(cfg.headers[i].name, cfg.headers[i].value);
    }
  }
  if (cfg.data) {
    if (typeof (cfg.data) == "object") {
      var temp = "", flag = 0;
      for (var i in cfg.data) {
        if (flag == 1) {
          temp += "&";
        }
        else {
          flag = 1;
        }
        temp += i + "=" + encodeURIComponent(cfg.data[i]);
      }
      cfg.data = temp;
    }
    //xmlHttp.setRequestHeader("Content-Type", cfg.contentType);
    //xmlHttp.setRequestHeader("Accept", cfg.accept);
    //xmlHttp.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8");
    //xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  }
  if (cfg.onAjaxSend) {
    cfg.onAjaxSend.call(xmlHttp);
  }
  xmlHttp.send(cfg.data);
}

function parseJson(data) {
  return (new Function("return " + data))();
}
