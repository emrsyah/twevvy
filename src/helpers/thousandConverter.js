export default function thousandConverter(angka) {
  const numb = angka;
  const format = numb?.toString().split("").reverse().join("");
  const convert = format?.match(/\d{1,3}/g);
  const thousand = convert?.join(".").split("").reverse().join("");
  return thousand;
}
