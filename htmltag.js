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

function getStringOf(listItems) {
  return listItems != undefined ? (Array.isArray(listItems) ? listItems.join(' ') : listItems) : '';
}