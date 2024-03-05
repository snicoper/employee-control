/**
 * Crea un Guid.
 *
 * @returns Guid creado.
 */
export const createGuid = (): string => {
  const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

/**
 * Primera letra en mayúsculas, el resto en minúsculas.
 *
 * @param value  String a formatear.
 * @returns El string formateado.
 */
export const ucFirst = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Utiliza una de las propiedades de urls para remplazar {algo} por valor en los args.
 *
 * @param url Una de las propiedades.
 * @param args Remplaza el {key} por el value de.
 */
export const urlReplaceParams = (url: string, args: Record<string, string>): string => {
  const keys = Object.keys(args);
  const values = Object.values(args);

  for (let i = 0; i < keys.length; i++) {
    const key = '{' + keys[i] + '}';
    const value = values[i];
    url = url.replace(key, value);
  }

  return url;
};

/**
 * Obtener un color hexadecimal aleatorio.
 *
 * @returns Color hexadecimal.
 */
export const getRandomColorHexadecimal = (): string => {
  const color = Math.floor(Math.random() * 16777215).toString(16);

  return `#${color}`;
};

/**
 * Pasar bytes a una medida legible según el size.
 *
 * @param value Bytes a transformar.
 * @returns Un string con los bytes convertidos a la unidad mas cercana.
 */
export const formatSizeUnit = (value: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (value === 0) {
    return '0 Byte';
  }

  const i = parseInt(String(Math.floor(Math.log(value) / Math.log(1024))), 10);

  return `${Math.round(value / Math.pow(1024, i))} ${sizes[i]}`;
};

/**
 * Calcula el porcentaje de una cantidad total.
 *
 * @param total Cantidad total.
 * @param value Cantidad a calcular sobre el total.
 * @returns El valor % calculada sobre el total.
 */
export const calculatePercent = (total: number, value: number): number => {
  const percent = (value / total) * 100;

  return percent;
};
