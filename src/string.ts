export function parse(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function parseBool(str?: string): boolean {
  if (!str) return false;
  switch (str.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
      return false;
    default:
      return false;
  }
}

export function capitalizeFirstLetter<S extends string>(str: S): Capitalize<S> {
  const [first, ...rest] = str;
  if (!first) return "" as Capitalize<S>;
  return (first.toUpperCase() + rest.join("")) as Capitalize<S>;
}

export function decapitalizeFirstLetter(str: string): string {
  const [first, ...rest] = str;
  if (!first) return "";
  return first.toLowerCase() + rest.join("");
}
export function camelCase(str: string): string {
  const words = str.match(/[A-Za-z]([a-z\d]+)|[A-Z]+(?=[A-Z])/g);
  if (!words) return "";

  const [first, ...rest] = words;
  return [decapitalizeFirstLetter(first), ...rest.map(capitalizeFirstLetter)].join("");
}

export function pascalCase(str: string): string {
  const words = str.match(/[A-Za-z]([a-z\d]+)|[A-Z]+(?=[A-Z])/g);
  if (!words) return "";
  return words.map(capitalizeFirstLetter).join("");
}

export function titleCase(str: string): string {
  const words = str.split(/(\s)/);
  return words.map(capitalizeFirstLetter).join(" ");
}
