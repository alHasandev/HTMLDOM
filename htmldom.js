// HTML DOM Element Prototype
export const DOM = {

  element: (name, attributes = {}, closeTag = '') => {
    let attrs = '';
    for (let attr in attributes) {
      // skip loop if property is from prototype
      if (!attributes.hasOwnProperty(attr)) continue;
      attrs += attr + `="${attributes[attr]}" `;
    }

    return `<${name} ${attrs}>` + closeTag;

  },

  image: (src, alt = '') => {
    return DOM.element('img', {
      src: src,
      alt: alt
    });
  },

  test: function (a) {
    return a;
  }
}