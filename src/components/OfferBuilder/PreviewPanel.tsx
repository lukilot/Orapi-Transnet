import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { OfferData } from '@/lib/types';
import HeroSection from './Preview/HeroSection';
import PricingTable from './Preview/PricingTable';
import Footer from './Preview/Footer';
import { Loader2 } from 'lucide-react';

// Dynamically import DownloadButton to isolate @react-pdf/renderer
const DownloadButton = dynamic(() => import('./DownloadButton'), {
    ssr: false,
    loading: () => (
        <button className="bg-gray-200 text-gray-400 px-6 py-2 rounded-full font-bold flex items-center gap-2 cursor-wait">
            <Loader2 className="w-5 h-5 animate-spin" />
            Ładowanie PDF...
        </button>
    ),
});

interface PreviewPanelProps {
    offer: OfferData;
}

export default function PreviewPanel({ offer }: PreviewPanelProps) {
    return (
        <div className="transform origin-top scale-[0.6] sm:scale-[0.8] lg:scale-[0.85] xl:scale-100 transition-transform duration-300">

            {/* Actions Bar */}
            <div className="flex justify-end mb-4 print:hidden h-10">
                <DownloadButton offer={offer} />
            </div>

            {/* A4 Page Container */}
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col print:shadow-none">

                {/* Header / Brand */}
                <div className="px-12 pt-12 pb-6 flex justify-between items-end">
                    {/* Left: Logo */}
                    <div className="relative w-48 h-12">
                        <Image
                            src="/assets/transnet-logo.png"
                            alt="Transnet Logo"
                            fill
                            className="object-contain object-left"
                        />
                    </div>

                    {/* Right: Offer Details */}
                    <div className="text-right">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Numer Oferty</p>
                        <p className="text-[#001F3F] font-bold text-sm">{offer.id}</p>
                        <div className="mt-0.5">
                            <span className="text-gray-400 text-[10px]">Data: </span>
                            <span className="text-[#001F3F] font-bold text-xs">{offer.date}</span>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 px-12 pb-12">

                    {/* Hero Section (Product Card) */}
                    <HeroSection industry={offer.industry} mainProduct={offer.products[0]} />

                    {/* Introduction / Client Info */}
                    <div className="flex justify-between items-start mb-8 mt-8">
                        <div className="w-1/2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Dla Firmy</p>
                            <h3 className="text-xl font-bold text-[#001F3F]">{offer.client.companyName || '---'}</h3>
                            <p className="text-gray-600 mt-1 whitespace-pre-line">
                                {offer.client.street ? `${offer.client.street} ${offer.client.number}` : '---'}
                            </p>
                            <p className="text-gray-600 whitespace-pre-line">
                                {offer.client.zip && offer.client.city ? `${offer.client.zip} ${offer.client.city}` : ''}
                            </p>
                            <p className="text-gray-500 text-sm mt-2">NIP: {offer.client.nip || '---'}</p>

                        </div>
                        <div className="w-1/3 text-right">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ważność Oferty</p>
                            <p className="text-[#001F3F] font-bold text-lg mb-6">{offer.validUntil}</p>

                            {(offer.client.contactPerson || offer.client.phone || offer.client.email) && (
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Osoba Kontaktowa</p>
                                    {offer.client.contactPerson && <p className="text-gray-700 font-bold text-xs">{offer.client.contactPerson}</p>}
                                    {offer.client.phone && <p className="text-gray-500 text-[10px]">{offer.client.phone}</p>}
                                    {offer.client.email && <p className="text-gray-500 text-[10px]">{offer.client.email}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pricing Table */}
                    <PricingTable products={offer.products} />

                </div>

                {/* Footer */}
                <Footer salesRep={offer.salesRep} />
            </div>
        </div>
    );
}
