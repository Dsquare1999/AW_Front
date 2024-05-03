const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const prices = [0,0,0,200,200,200,200,200,150,150,200,200];

export const PriceTrendData = () => {
    return {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Price Trend',
                data: prices,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
        ]
        
    }
}