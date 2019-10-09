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

function htmltag({
  tag,
  classNames,
  attributes,
  innerHtml
}, closeTag = true) {

  classNames = classNames ? 'class="' + getStringOf(classNames) + '"' : '';

  let attrs = '';
  if (attributes != undefined) {
    for (let attr in attributes) {
      // skip if property not belong to attibutes object / is from its prototype
      if (!attributes.hasOwnProperty(attr)) continue;
      // else
      if (attributes[attr] != false) {
        attrs += attr + '="' + attributes[attr] + '" ';
      }
    }
  }
  innerHtml = getStringOf(innerHtml);

  return `<${tag} ${classNames !== null ? classNames : null} ${attrs}>${innerHtml}` + (closeTag ? `</${tag}>` : '');
}

function htmljson({
  tag,
  classNames,
  attributes,
  closeTag = true,
  innerHtml
}) {
  let closing = closeTag ? `</${tag}>` : '';

  // Set class names string
  classNames = classNames ? 'class="' + getStringOf(classNames) + '"' : '';

  // Set Attributes String
  attributes = attributes ? getAttrString(attributes) : '';

  // innerHtml = getObjString(innerHtml);

  // Check if inner html is Array
  if (Array.isArray(innerHtml)) {
    innerHtml = innerHtml.map(inner => {
      return getObjString(inner);
    }).join('');
  } else if (typeof innerHtml === 'object') {
    innerHtml = htmljson(innerHtml);
  }

  // result += `${result} ${classNames} ${attributes}>`

  return `<${tag} ${classNames} ${attributes}>${innerHtml}${closing}`;
}

function getAttrString(objAttr) {
  return Object.keys(objAttr).map(attr => {
    return `${attr}="${objAttr[attr]}"`;
  }).join(' ');
}

function getObjString(objItem, devider = '') {
  return objItem != undefined ? (typeof objItem === 'object' ? htmljson(objItem) : objItem) : '';
}

function getStringOf(listItems) {
  return listItems != undefined ? (Array.isArray(listItems) ? listItems.join(' ') : listItems) : '';
}

