export type Industry = 'TRUCKS' | 'MARITIME' | 'INDUSTRY' | 'AGRICULTURE' | 'CONSTRUCTION';

export const INDUSTRY_LABELS: Record<Industry, string> = {
    TRUCKS: 'Ciężarowe',
    MARITIME: 'Morskie',
    INDUSTRY: 'Przemysł',
    AGRICULTURE: 'Rolnictwo',
    CONSTRUCTION: 'Budownictwo',
};

export const AVAILABLE_FEATURES = [
    "produkt kwasowy",
    "produkt zasadowy",
    "wysokie PH",
    "niskie PH",
    "produkt silnie pieniący",
    "produkt nie pieniący",
    "bezpieczeństwo",
    "ekologiczny",
    "certyfikat ECO CERT",
    "certyfikat NSF",
    "jakość spożywcza",
    "niwelowanie zapachów",
    "wysoka wydajność",
    "może wyschnąć",
    "do mycia ręcznego",
    "do mycia automatycznego"
]; export interface ProductParam {
    label: string;
    value: string;
    unit?: string;
}

export interface ProductVariant {
    name: string; // e.g. "5 L", "20 L", "200 kg"
    price: number;
}

export interface Product {
    id: string;
    name: string;
    category?: string;
    code?: string;
    description: string;
    image?: string; // /canister-placeholder.png
    features: string[];
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
    variants?: ProductVariant[];
    selectedVariant?: string; // name of the selected variant
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
    paymentMethod: string;
    paymentTerm: string;
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
    },
    paymentMethod: "Przelew",
    paymentTerm: "14 dni"
};
