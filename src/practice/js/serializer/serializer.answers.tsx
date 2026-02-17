/**
 * TODO: Define `Serializable` type, using following value examples:
 *
 * 1
 * "abc"
 * [1, 2, "xyz", [1, 2, 3]]
 * {a: 1, b: 2}
 * [1, 2, {a: 3, b: 4}, [5, 6]]
 * ()=>"some string"
 */

type Serializable =
  | number
  | string
  | ((...args: unknown[]) => unknown)
  | Serializable[]
  | { [key: string]: Serializable };

/**
 * Returns string representation of the given `value` of `Serializable` type,
 * up to the nesting level, specified in `maxNestingLevel` param.
 *
 * For function - returns a string representation of the function
 *
 * @example
 * serialize(1)
 * > "1"
 *
 * serialize([1, 2])
 * > Array(1, 2)
 *
 * serialize({a: 1, b: 2, c: [3, 4]})
 * > Object(a = 1, b = 2, c = Array(3, 4))
 *
 * serialize(()=>{return "funcresult"})
 * > function(){return"funcresult";}
 *
 * Tip:
 * /\s/g - regexp for removing empty spaces,tabs,new line symbols etc
 */

function serialize(
  value: Serializable,
  maxNestingLevel = 2,
  seen: WeakSet<object> = new WeakSet(),
): string {
  let result: string = '';

  switch (typeof value) {
    case 'string': {
      result += `"${value}"`;
      break;
    }
    case 'number': {
      result += `${value}`;
      break;
    }
    case 'function': {
      result += `${value}`.replace(/\s/g, '');

      break;
    }
    case 'object': {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
      try {
        const isArray = Array.isArray(value);
        const name = isArray ? 'Array(' : 'Object(';
        const nextNestingLevel = maxNestingLevel - 1;
        const shouldSerializeNextLevel = nextNestingLevel >= 0;

        const serializedValues = shouldSerializeNextLevel
          ? Object.entries(value).reduce((acc, [key, value]) => {
              const prefix = acc.length ? ', ' : '';
              const keyName = isArray ? '' : `${key} = `;

              acc += `${prefix}${keyName}${serialize(value, nextNestingLevel, seen)}`;

              return acc;
            }, '')
          : '...';

        const serializedObject = `${name}${serializedValues})`;

        result += serializedObject;
      } finally {
        seen.delete(value);
      }
      break;
    }

    default: {
      const unhandledValue: never = value;
      console.warn("Can't resolve this value type", unhandledValue);
    }
  }
  return result;
}
