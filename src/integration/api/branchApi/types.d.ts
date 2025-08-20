interface Salary {
    _id: string;
    role: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
}

interface GetSingleBranch {
    _id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    balance: number;
    salary: Salary[];
    breadPrice: number;
    doughPrice: number;
}