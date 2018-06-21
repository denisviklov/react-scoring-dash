import { undecorated as PhoneInput } from "./phone";

it("clean should clean spec chars", () => {
  const exp = "952111";
  const val = "(952)-111-__-__";
  let phi = new PhoneInput();
  expect(phi.clean(val)).toEqual(exp);
});

it("format should format raw vals", () => {
  const exp = "(952)-111-23-45";
  const val = "9521112345";
  let phi = new PhoneInput();
  expect(phi.format(val)).toEqual(exp);
});
it("format should format raw only part with vals", () => {
  let phi = new PhoneInput();
  let exp = "(952)-111";
  let val = "952111";
  expect(phi.format(val)).toEqual(exp);

  exp = "(9";
  val = "9";
  expect(phi.format(val)).toEqual(exp);

  exp = "(952";
  val = "952";
  expect(phi.format(val)).toEqual(exp);

  exp = "(952)-1";
  val = "9521";
  expect(phi.format(val)).toEqual(exp);
});
it("format should not use extra raw vals", () => {
  const exp = "(952)-111-23-45";
  const val = "95211123456789";
  let phi = new PhoneInput();
  expect(phi.format(val)).toEqual(exp);
});
