export function deepEqual(obj1, obj2) {
  // Same reference or both null/undefined
  if (obj1 === obj2) return true;
  
  // One is null/undefined, other isn't
  if (obj1 == null || obj2 == null) return false;
  
  // Different types
  if (typeof obj1 !== typeof obj2) return false;
  
  // Primitive types (already checked === above, so must be different)
  if (typeof obj1 !== 'object') return false;
  
  // Arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) return false;
    }
    return true;
  }
  
  // One is array, other isn't
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
  
  // Objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
}

export function lerpAngle(start, end, t) {
    let diff = end - start;
    // Handle wraparound (shortest path)
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    return start + diff * t;
}

export function arraySubtract(arr1, arr2) { 
    if (arr1.length !== arr2.length) {
        throw new Error("Arrays must be of the same length");
    }
    return arr1.map((val, idx) => val - arr2[idx]);
}

export function vectorAdd(vec1, vec2) {
    return {
        x: vec1.x + vec2.x,
        y: vec1.y + vec2.y
    };
}

export function lerp(start, end, t) {
  return start + (end - start) * t;
}