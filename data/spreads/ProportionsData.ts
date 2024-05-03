import {
    headers as volumeHeaders,
    rows as volumeRows,
} from "@/data/spreads/VolumeData";

const labels = volumeRows.map((row) => row["pays"])
const proportions = volumeRows.map((row) => parseFloat(row["proportion"].replace("%", "")));
const amounts = volumeRows.map((row) => parseFloat(row["volumes"].replace("$", "")));

export const ProportionData = () => {
    return {
        labels,
        datasets: [
            {
                label: "Proportion (%)",
                data: proportions,
                backgroundColor: labels.map((label, index) => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`),
            }
        ]
    }
}

export const AmountData = () => {
    return {
        labels,
        datasets: [
            {
                label: "Amount",
                data: amounts,
                backgroundColor: labels.map((label, index) => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`),
            }
        ]
    }
}