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

function getStringOf(listItems, devider = ' ') {
  return listItems != undefined ? (Array.isArray(listItems) ? listItems.join(devider) : listItems) : '';
}

function getAttrString(objAttr) {
  return Object.keys(objAttr).map(attr => {
    return `${attr}="${objAttr[attr]}"`;
  }).join(' ');
}

function getObjString(objItem, devider = '') {
  return objItem != undefined ? (typeof objItem === 'object' ? htmljson(objItem) : objItem) : '';
}

// console.log(typeof json);