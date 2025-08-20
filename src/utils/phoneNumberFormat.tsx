export const isValidPhone = (phone: string) => {
  return /^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(phone);
};

export function formatPhoneNumber(input: string): string {
  const digits = input.replace(/\D/g, "");

  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 5);
  const part3 = digits.slice(5, 8);
  const part4 = digits.slice(8, 10);
  const part5 = digits.slice(10, 12);

  let formatted = "";

  if (part1) formatted = `+${part1}`;
  if (part2) formatted += ` ${part2}`;
  if (part3) formatted += ` ${part3}`;
  if (part4) formatted += ` ${part4}`;
  if (part5) formatted += ` ${part5}`;

  return formatted;
}
