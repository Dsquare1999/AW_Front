import { BondProp } from "@/app/types/BondType"

function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0'); // Jour sur 2 chiffres avec un zéro devant si nécessaire
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois sur 2 chiffres avec un zéro devant si nécessaire
    const year = date.getFullYear().toString(); // Année sur 4 chiffres
    return `${day}-${month}-${year}`;
}

export const OutstandingData = ( bonds: BondProp[]) => {

    let allDates: Date[] = [];

    bonds.forEach(bond => {
        allDates.push(new Date(bond.value_date));
        allDates.push(new Date(bond.due_date));
    });

    allDates.sort((a, b) => a.getTime() - b.getTime());
    allDates = Array.from(new Set(allDates));

    let outstandingValues : number[] = [];
    let labels : string[] = [];

    for(let i = 0; i < allDates.length - 1; i++){
        labels.push(formatDate(allDates[i]) +' || '+ formatDate(allDates[i+1]))
        let outstanding = 0;
        bonds.forEach(bond => {
            if (allDates[i] >= new Date(bond.value_date) && allDates[i+1] <= new Date(bond.due_date)) {
                outstanding += bond.outstanding;
            }
        });
        outstandingValues.push(outstanding);
    }

    const datasets = [{
        label: `Outstanding`,
        data: outstandingValues,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
    }];

    return {
        labels,
        datasets,
    };
};