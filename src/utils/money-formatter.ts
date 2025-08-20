export const MoneyFormatter = (money: string | number): string => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
