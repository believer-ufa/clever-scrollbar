if (typeof(Symbol) !== 'undefined') {
    NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
    HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
}
