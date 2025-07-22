export const getFormatValue = (
  val: number,
  fractionDigits?: number
): string => {
  const result = Number(val.toFixed(fractionDigits ?? 2)).toLocaleString(
    ["en"],
    {
      minimumFractionDigits: fractionDigits ?? 2,
      maximumFractionDigits: fractionDigits ?? 2,
    }
  );

  const [whole, fractions] = result.split(".");

  if (!+fractions) {
    return whole;
  }

  return result;
};

export const getFiatAmountCorrect = (amount?: string, isChart?: boolean) => {
  if (amount) {
    if (isChart) {
      return getFormatValue(
        Number.parseFloat(
          (+amount).toFixed(Math.trunc(+amount).toString().length > 1 ? 2 : 5)
        )
      );
    } else {
      return getFormatValue(Number.parseFloat((+amount).toFixed(2)));
    }
  } else {
    return getFormatValue(0.0);
  }
};
