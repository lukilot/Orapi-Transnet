import React from 'react';
import { OfferData } from '@/lib/types';
import ClientDetails from './Form/ClientDetails';
import IndustrySelector from './Form/IndustrySelector';
import ProductPicker from './Form/ProductPicker';
import OfferDetails from './Form/OfferDetails';
import SalespersonPicker from './Form/SalespersonPicker';

interface FormPanelProps {
    offer: OfferData;
    onChange: (offer: OfferData) => void;
}

export default function FormPanel({ offer, onChange }: FormPanelProps) {

    const updateOffer = (updates: Partial<OfferData>) => {
        onChange({ ...offer, ...updates });
    };

    return (
        <div className="p-6 space-y-6 pb-20">
            <div>
                <h1 className="text-2xl font-bold text-[#001F3F]">Generator Ofert v1.0</h1>
                <p className="text-gray-500 text-sm mt-1">Stwórz nową ofertę handlową.</p>
            </div>

            <IndustrySelector
                value={offer.industry}
                onChange={(industry) => updateOffer({ industry })}
            />

            <SalespersonPicker
                value={offer.salesRep}
                onChange={(salesRep) => updateOffer({ salesRep })}
            />

            <ClientDetails
                data={offer.client}
                onChange={(client) => updateOffer({ client })}
            />

            <OfferDetails
                data={{
                    id: offer.id,
                    date: offer.date,
                    validUntil: offer.validUntil,
                    paymentMethod: offer.paymentMethod,
                    paymentTerm: offer.paymentTerm
                }}
                onChange={(details) => updateOffer(details)}
            />

            <ProductPicker
                selectedProducts={offer.products}
                onChange={(products) => updateOffer({ products })}
            />
        </div>
    );
}
