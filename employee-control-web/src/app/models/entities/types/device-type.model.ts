import { CommonUtils } from '../../../core/utils/common-utils';

export enum DeviceType {
  Unknown = 0,
  System = 1,
  Desktop = 2,
  Mobile = 3,
  Tablet = 4
}

/**
 * De un valor string, obtener el valor de DeviceType.
 *
 * @param device String con el tipo de dispositivo.
 * @returns DeviceType.
 */
export const deviceToDeviceType = (device: string): DeviceType => {
  return DeviceType[CommonUtils.ucFirst(device) as keyof typeof DeviceType];
};
