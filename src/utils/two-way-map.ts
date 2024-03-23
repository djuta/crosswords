class TwoWayMap<Key, Value> {
  map: Map<Key, Value>;

  revMap: Map<Value, Key>;

  constructor() {
    this.map = new Map();
    this.revMap = new Map();
  }

  get(key: Key) {
    return this.map.get(key);
  }

  getKey(value: Value) {
    return this.revMap.get(value);
  }

  set(key: Key, value: Value) {
    this.map.set(key, value);
    this.revMap.set(value, key);
  }

  getPrev(key: Key) {
    const keyArray = Array.from(this.map.keys());
    const index = keyArray.indexOf(key);
    const prevKey = keyArray[index - 1];
    return this.map.get(prevKey);
  }

  getNext(key: Key) {
    const keyArray = Array.from(this.map.keys());
    const index = keyArray.indexOf(key);
    const prevKey = keyArray[index + 1];
    return this.map.get(prevKey);
  }
}

export default TwoWayMap;
