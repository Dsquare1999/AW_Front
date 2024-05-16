import { BondProp } from "@/app/types/BondType"

function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
}

export const PortofolioDetailData = (bonds: BondProp[], detailLabel: string, detailData: number) => {

    const from: Date = new Date(detailLabel.split(' || ')[0]);
    const to: Date = new Date(detailLabel.split(' || ')[1]);

    let labels: string[] = [];
    let detailValues: number[] = [];

    bonds.map((bond) => {
        if (from >= new Date(bond.value_date) && to <= new Date(bond.due_date)) {
            const facialRate = (bond.facial_rate * 100).toFixed(1);
            labels.push(bond.admin_bond.isin + '_' + bond.type + '_' + facialRate + '%');
            detailValues.push(bond.outstanding);
        }
    });

    const datasets = [{
        label: `${formatDate(from)} - ${formatDate(to)}`,
        data: detailValues,
        backgroundColor: labels.map(() => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`)
    }];

    return {
        labels,
        datasets,
    };
};