import { DefaultTreeAdapterTypes } from 'parse5';

const findNodeById = (node: DefaultTreeAdapterTypes.Element, id: string): DefaultTreeAdapterTypes.Element | null => {
  if (node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === id)) {
    return node;
  }
  if (node.childNodes) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const foundNode = findNodeById(node.childNodes[i] as DefaultTreeAdapterTypes.Element, id);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
}

export {
  findNodeById
}