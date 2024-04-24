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
            labels.push(bond.isin + '_' + bond.type + '_' + bond.facial_rate + '%');
            detailValues.push(bond.outstanding);
        }
    });

    console.log("Portofolio Details" , labels, detailValues);
    const datasets = [{
        label: `Portofolio Outstandings Details -- ${formatDate(from)} to ${formatDate(to)}`,
        data: detailValues,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
    }];

    return {
        labels,
        datasets,
    };
};