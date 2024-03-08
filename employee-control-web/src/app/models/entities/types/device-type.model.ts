export enum DeviceType {
  unknown = 0,
  system = 1,
  desktop = 2,
  mobile = 3,
  tablet = 4
}

/**
 * De un valor string, obtener el valor de DeviceType.
 *
 * @param device String con el tipo de dispositivo.
 * @returns DeviceType.
 */
export const deviceToDeviceType = (device: string): DeviceType => {
  return DeviceType[device as keyof typeof DeviceType];
};
