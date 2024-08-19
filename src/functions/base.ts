export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function numberToFixedLengthHex(num: number) {
  let hexString = num.toString(16);
  while (hexString.length < 6) {
    hexString = "0" + hexString;
  }

  return hexString.toUpperCase();
}

export function isNumeric(inputString: string) {
  return inputString.trim() === Number.parseInt(inputString).toString().trim();
}


export function randomColorCode() : string {
  let num = getRandomInt(0, 16777215);
  return `#${numberToFixedLengthHex(num)}`;
}