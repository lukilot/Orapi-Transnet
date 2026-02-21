import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Platinium',
        code: 'TN05050',
        description: 'Highly concentrated alkaline cleaner for heavy industrial soiling.',
        image: '/assets/iridium-canister.png',
        features: ["wysoka wydajność", "produkt zasadowy"],
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
        features: ["produkt kwasowy"],
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
        features: ["bezpieczeństwo", "ekologiczny"],
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
        features: ["silnie pieniący"],
        specs: { temp: 50, dilution: '1:25', isEco: false, ph: 12.0 },
        price: 199.99,
        quantity: 1,
        discount: 0,
        maxDiscount: 30
    }
];

export const MOCK_SALES_REPS: import('./types').SalesRep[] = [
    { name: "Florkowski Jacek", phone: "+48 602 175 962", email: "jacek.florkowski@orapi.com" },
    { name: "Główczyk Janusz", phone: "+48 726 668 361", email: "jasjanusz@interia.pl" },
    { name: "Karwowski Ireneusz", phone: "+48 786 676 079", email: "i.karwowski.orapi@gmail.com" },
    { name: "Lasota Tomasz", phone: "+48 505 284 326", email: "tom.lasota@interia.pl" },
    { name: "Mikołajczyk Mateusz", phone: "+48 573 058 135", email: "mateusz.orapi@gmail.com" },
    { name: "Orapi Biuro", phone: "+48 692 986 344", email: "biuro@orapi.com" },
    { name: "Płocieniczak Bartosz", phone: "+48 576 439 351", email: "b.plocieniczak.orapi@gmail.com" }
];
