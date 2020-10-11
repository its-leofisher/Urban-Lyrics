export function $x(xpath: string, document: Document) {
  const xpathResult = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  const nodes = [];
  for (let i = 0; i < xpathResult.snapshotLength; ++i) {
    nodes.push(xpathResult.snapshotItem(i));
  }
  return nodes;
}
