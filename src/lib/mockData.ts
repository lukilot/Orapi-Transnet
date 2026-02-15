import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Platinium',
        code: 'TN05050',
        description: 'Highly concentrated alkaline cleaner for heavy industrial soiling.',
        image: '/assets/iridium-canister.png',
        specs: { temp: 40, dilution: '1:50', isEco: true, ph: 13.5 },
        price: 150.00,
        quantity: 1,
        discount: 0,
        maxDiscount: 25
    },
    {
        id: 'p2',
        name: 'Alu-Clean Pro',
        description: 'Acidic cleaner for aluminum surfaces and rims.',
        specs: { temp: 20, dilution: '1:10', isEco: false, ph: 1.5 },
        price: 85.50,
        quantity: 1,
        discount: 0,
        maxDiscount: 20
    },
    {
        id: 'p3',
        name: 'Bio-Active Foam',
        description: 'pH neutral active foam for delicate surfaces.',
        specs: { temp: 30, dilution: '1:100', isEco: true, ph: 7.0 },
        price: 120.00,
        quantity: 1,
        discount: 5,
        maxDiscount: 15
    },
    {
        id: 'p4',
        name: 'Truck Wash',
        code: 'T-200',
        description: 'Strong TFR (Traffic Film Remover) for trucks.',
        specs: { temp: 50, dilution: '1:25', isEco: false, ph: 12.0 },
        price: 199.99,
        quantity: 1,
        discount: 0,
        maxDiscount: 30
    }
];

export const MOCK_SALES_REPS: import('./types').SalesRep[] = [
    {
        name: "Jan Kowalski",
        phone: "+48 123 456 789",
        email: "jan.kowalski@transnet.pl"
    },
    {
        name: "Anna Nowak",
        phone: "+48 987 654 321",
        email: "anna.nowak@transnet.pl"
    },
    {
        name: "Piotr Wiśniewski",
        phone: "+48 555 666 777",
        email: "piotr.wisniewski@transnet.pl"
    }
];
