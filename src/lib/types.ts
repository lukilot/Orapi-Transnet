export type Industry = 'TRUCKS' | 'MARITIME' | 'INDUSTRY' | 'AGRICULTURE' | 'CONSTRUCTION';

export interface ProductParam {
    label: string;
    value: string;
    unit?: string;
}

export interface Product {
    id: string;
    name: string;
    code?: string;
    description: string;
    image?: string; // /canister-placeholder.png
    selectedAttributeKeys?: ('temp' | 'dilution' | 'eco' | 'ph')[];
    specs: {
        temp: number; // e.g. 40
        dilution: string; // e.g. "1:50"
        isEco: boolean;
        ph: number;
    };
    price: number;
    quantity: number;
    discount: number; // percentage
    maxDiscount?: number; // admin setting
}

export interface ClientDetails {
    companyName: string;
    nip: string;
    street: string;
    number: string;
    city: string;
    zip: string;
    contactPerson: string;
    phone: string;
    email: string;
}

export interface SalesRep {
    name: string;
    phone: string;
    email: string;
}

export interface OfferData {
    id: string;
    date: string;
    validUntil: string;
    industry: Industry;
    client: ClientDetails;
    products: Product[];
    salesRep: SalesRep;
}

export const INITIAL_OFFER: OfferData = {
    id: "OFR-2026-001",
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    industry: 'TRUCKS',
    client: {
        companyName: "",
        nip: "",
        street: "",
        number: "",
        city: "",
        zip: "",
        contactPerson: "",
        phone: "",
        email: ""
    },
    products: [],
    salesRep: {
        name: "Jan Kowalski",
        phone: "+48 123 456 789",
        email: "jan.kowalski@transnet.pl"
    }
};
