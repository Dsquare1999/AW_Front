import {
    headers as ratesHeaders,
    rows as ratesRows,
} from "@/data/spreads/RatesData";

const labels = ratesRows.map((row) => row["maturity"])
const coupons = ratesRows.map((row) => parseFloat(row["coupon"].replace("%", "")));
const rates = ratesRows.map((row) => parseFloat(row["taux"].replace("%", "")));

export const RatesCurveData = () => {
    return {
        labels,
        datasets: [
            {
                label: 'Après lissage',
                data: rates,
                borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
                backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
                lineTension: 0.5,
                pointRadius : 0,
              },
              {
                label: 'Zero Coupon',
                data: coupons,
                borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
                backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
                showLine: false
              },
        ]
    }
}