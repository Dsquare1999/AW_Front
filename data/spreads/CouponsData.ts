const labels = ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032']
const coupons = [-10000, 1599, 1599, 1599, 1599, 1599, 1599, 1599, 1599, 11599]

export const CouponData = () => {
    return {
        labels,
        datasets: [
            {
                label: 'Coupon',
                data: coupons,
                backgroundColor: labels.map((label, index) => coupons[index] > 0 ? `rgba(203, 14, 14,1)`: `rgba(14, 203, 129,1)` ),
            }
        ]
    }
}