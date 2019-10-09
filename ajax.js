function getAjax(filename) {
  return new Promise((resolve, reject) => {
    ajax("GET", filename).then(resolve).catch(reject);
  });
}

function postAjax(filename, data) {
  return new Promise((resolve, reject) => {
    ajax("POST", filename, data).then(resolve).catch(reject);
  });
}

function ajax(method, filename, data) {
  const xhttp = new XMLHttpRequest();

  xhttp.open(method, filename, true);

  if (method == "POST") {
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(formUrlEncode(data));
  } else {
    xhttp.send();
  }

  return new Promise((resolve, reject) => {
    let message = {};
    let response = {};
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        message.status = "ready";
        if (this.status >= 500) {
          message.error = "Server Error";
          message.code = this.status;
        } else if (this.status >= 400) {
          message.error = "Client Error";
          message.code = this.status;
        } else if (this.status >= 300) {
          message.error = "Redirection";
          message.code = this.status;
        } else if (this.status >= 200) {
          message.error = "Server Error";
          message.status = "success";
          message.code = this.status;
        }

        response.message = message;

        if (this.status === 200) {
          let data = JSON.parse(this.responseText);
          response.data = data;
          resolve(response);
        } else {
          reject(response);
        }

      }
    }
  });
}

function formUrlEncode(obj) {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}