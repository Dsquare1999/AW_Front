import { BondProp } from "@/app/types/BondType"

function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0'); // Jour sur 2 chiffres avec un zéro devant si nécessaire
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois sur 2 chiffres avec un zéro devant si nécessaire
    const year = date.getFullYear().toString(); // Année sur 4 chiffres
    return `${day}-${month}-${year}`;
}

export const OutstandingData = (bonds: BondProp[], detail: boolean = false) => {
    let labels : string[] = [];
    let outstandingValues : number[] = [];

    let datasets : {
        label: string;
        data: number[];
        backgroundColor: string;
    }[] = [];


    let allDates: string[] = [];
    bonds.map((bond) => {
        allDates.push(bond.value_date);
        allDates.push(bond.due_date);
    });
    allDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    allDates = Array.from(new Set(allDates));
    for(let i = 0; i < allDates.length - 1; i++){
        labels.push(allDates[i] +' || '+ allDates[i+1]);
    }


    if(detail){
        bonds.forEach(bond => {
            let bondOutstandingValues : number[] = [];
            for(let i = 0; i < allDates.length - 1; i++){
                let outstanding = 0;
                if (new Date(allDates[i]) >= new Date(bond.value_date) && new Date(allDates[i+1]) <= new Date(bond.due_date)) {
                    outstanding += bond.outstanding;
                }
                bondOutstandingValues.push(outstanding);
            }
            datasets.push({
                label: bond.admin_bond.isin,
                data: bondOutstandingValues,
                backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
            });
        });
    }else{
        for(let i = 0; i < allDates.length - 1; i++){
            let outstanding = 0;
            bonds.forEach(bond => {
                if (new Date(allDates[i]) >= new Date(bond.value_date) && new Date(allDates[i+1]) <= new Date(bond.due_date)) {
                    outstanding += bond.outstanding;
                }
            });
            outstandingValues.push(outstanding);
        }
        datasets.push({
            label: `Outstanding`,
            data: outstandingValues,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        });
    }

    return {
        labels,
        datasets,
    };
};