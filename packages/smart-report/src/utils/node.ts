import { DefaultTreeAdapterTypes, html } from 'parse5';

export type Element = DefaultTreeAdapterTypes.Element;

const findNodeById = (node: Element, id: string): Element | null => {
  if (node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === id)) {
    return node;
  }
  if (node.childNodes) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const foundNode = findNodeById(node.childNodes[i] as Element, id);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
}

const findNodeByTag = (node: Element, tag: html.TAG_NAMES): Element | null => {
  if (node.tagName && node.tagName === tag) {
    return node;
  }
  if (node.childNodes) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const foundNode = findNodeByTag(node.childNodes[i] as Element, tag);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
}

const modifyNodeText = (node: Element | null, text: string) => {
  if (node) {
    (node.childNodes[0] as unknown as DefaultTreeAdapterTypes.TextNode).value = text;
  }
}

const appendNodeText = (node: Element | null, text: string) => {
  if (node) {
    const firstChild = node.childNodes[0] as unknown as DefaultTreeAdapterTypes.TextNode
    firstChild.value = `${firstChild.value};${text}`;
  }
}

const getNodeAttr = (node: Element | null, key: string): string | null => {
  if (node) {
    const attrs = node.attrs || [];
    return attrs.find((attr) => attr.name === key)?.value || null;
  }
  return null;
}


const modifyNodeAttr = (node: Element | null, key: string, value: string) => {
  if (node) {
    const attrs = node.attrs || [];
    const attr = attrs.find((attr) => attr.name === key);
    if (attr) {
      attr.value = value;
    } else {
      attrs.push({
        name: key,
        value
      });
    }
  }
}

export {
  findNodeById,
  findNodeByTag,
  modifyNodeText,
  appendNodeText,
  modifyNodeAttr,
  getNodeAttr,
}