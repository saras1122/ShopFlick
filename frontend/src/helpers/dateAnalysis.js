const dateAnalysis = [
    { id: 1, label: "sevendays", value: "Last 7 Days" },
    { id: 2, label: "lastMonth", value: "Last Month" },
    { id: 3, label: "lastYear", value: "Last Year" },
    { id: 4, label: "fiveYears", value: "Last 5 Years" },
];

const dummyData = {
    sevendays: [
        { name: "2024-06-08", users: 30 },
        { name: "2024-06-09", users: 50 },
        { name: "2024-06-10", users: 45 },
        { name: "2024-06-11", users: 60 },
        { name: "2024-06-12", users: 70 },
        { name: "2024-06-13", users: 55 },
        { name: "2024-06-14", users: 80 },
    ],
    lastMonth: [
        { name: "2024-05-01", users: 300 },
        { name: "2024-05-08", users: 450 },
        { name: "2024-05-15", users: 500 },
        { name: "2024-05-22", users: 400 },
        { name: "2024-05-29", users: 600 },
    ],
    lastYear: [
        { name: "2023-06", users: 1000 },
        { name: "2023-07", users: 1500 },
        { name: "2023-08", users: 2000 },
        { name: "2023-09", users: 2500 },
        { name: "2023-10", users: 3000 },
        { name: "2023-11", users: 3500 },
        { name: "2023-12", users: 4000 },
        { name: "2024-01", users: 4500 },
        { name: "2024-02", users: 5000 },
        { name: "2024-03", users: 5500 },
        { name: "2024-04", users: 6000 },
        { name: "2024-05", users: 6500 },
    ],
    fiveYears: [
        { name: "2019", users: 5000 },
        { name: "2020", users: 10000 },
        { name: "2021", users: 15000 },
        { name: "2022", users: 20000 },
        { name: "2023", users: 25000 },
    ],
};

export default dateAnalysis;
export { dummyData };
