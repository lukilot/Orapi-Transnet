import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { OfferData, Product } from '@/lib/types';
import HeroSection from './Preview/HeroSection';
import PricingTable from './Preview/PricingTable';
import Footer from './Preview/Footer';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// Dynamically import DownloadButton to isolate @react-pdf/renderer
const DownloadButton = dynamic(() => import('./DownloadButton'), {
    ssr: false,
    loading: () => (
        <button className="bg-gray-200 text-gray-400 px-6 py-2 rounded-full font-bold flex items-center gap-2 cursor-wait text-sm">
            <Loader2 className="w-5 h-5 animate-spin" />
            PDF
        </button>
    ),
});

interface PreviewPanelProps {
    offer: OfferData;
}

const PreviewPage = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-full h-full flex flex-col bg-white print:shadow-none">
        {children}
    </div>
);

const PreviewHeader = ({ offer }: { offer: OfferData }) => (
    <div className="px-6 md:px-12 pt-6 md:pt-12 pb-4 md:pb-6 flex justify-between items-end">
        <div className="relative w-32 h-8 md:w-48 md:h-12">
            <Image
                src="/assets/transnet-logo.png"
                alt="Transnet Logo"
                fill
                className="object-contain object-left"
            />
        </div>
        <div className="text-right">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Numer Oferty</p>
            <p className="text-[#001F3F] font-bold text-sm">{offer.id}</p>
            <div className="mt-0.5">
                <span className="text-gray-400 text-[10px]">Data: </span>
                <span className="text-[#001F3F] font-bold text-xs">{offer.date}</span>
            </div>
        </div>
    </div>
);

export default function PreviewPanel({ offer }: PreviewPanelProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    const products = offer.products.length > 0 ? offer.products : [{
        id: 'placeholder',
        name: "Wybierz Produkt",
        specs: { temp: 0, dilution: "-", isEco: false, ph: 7 },
        features: [],
        price: 0,
        discount: 0,
        quantity: 0,
        description: ''
    } as Product];

    const totalPages = products.length + 1;

    // Handle pagination limits
    const handlePrev = () => setCurrentPage(p => Math.max(0, p - 1));
    const handleNext = () => setCurrentPage(p => Math.min(totalPages - 1, p + 1));

    const totalLinesNet = offer.products.reduce((acc, p) => acc + (p.price * p.quantity * (1 - p.discount / 100)), 0);

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            // A4 dimensions at 96PPI: ~794px width x ~1123px height
            const scaleW = clientWidth / 794;
            const scaleH = clientHeight / 1123;
            // Fit exactly, with a tiny 2% margin (0.98)
            setScale(Math.min(scaleW, scaleH) * 0.98);
        };

        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);
        updateScale(); // calculate immediately

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center p-4 lg:p-8 overflow-hidden">

            {/* Top Bar (Pagination + Download) */}
            <div className="w-full max-w-[210mm] flex justify-between items-center mb-4 shrink-0 relative z-10">
                <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className="text-gray-400 hover:text-[#00A8E8] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-bold text-[#001F3F] min-w-[80px] text-center">
                        {currentPage + 1} / {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages - 1}
                        className="text-gray-400 hover:text-[#00A8E8] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                <DownloadButton offer={offer} />
            </div>

            {/* Dynamic Scale Container - uses ResizeObserver to exactly fit 100% height */}
            <div ref={containerRef} className="relative w-full flex-1 min-h-0 flex items-center justify-center">
                <div
                    className="origin-center transition-transform duration-100 flex-shrink-0 shadow-2xl rounded-sm overflow-hidden bg-white flex flex-col"
                    style={{
                        transform: `scale(${scale})`,
                        width: '210mm',
                        height: '297mm'
                    }}
                >

                    {/* Product Pages */}
                    {currentPage < products.length && (
                        <PreviewPage>
                            <PreviewHeader offer={offer} />
                            <div className="flex-1 px-12 flex flex-col">
                                <HeroSection industry={offer.industry} mainProduct={products[currentPage]} />
                                <div className="mt-4">
                                    <PricingTable products={[products[currentPage]]} hideTotals={true} />
                                </div>
                            </div>

                            <div className="absolute bottom-32 left-0 right-0 text-center text-[10px] text-gray-400">
                                Strona {currentPage + 1} z {totalPages}
                            </div>

                            <div className="mt-auto">
                                <Footer salesRep={offer.salesRep} />
                            </div>
                        </PreviewPage>
                    )}

                    {/* Summary Page */}
                    {currentPage === products.length && (
                        <PreviewPage>
                            <PreviewHeader offer={offer} />
                            <div className="flex-1 px-12 pb-8 flex flex-col">
                                <div className="flex justify-between items-start mb-4 mt-2">
                                    <div className="w-1/2">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Dla Firmy</p>
                                        <h3 className="text-xl font-bold text-[#001F3F]">{offer.client.companyName || '---'}</h3>
                                        <p className="text-gray-600 mt-1 whitespace-pre-line">
                                            {offer.client.street ? `${offer.client.street} ${offer.client.number}` : '---'}
                                        </p>
                                        <p className="text-gray-600 whitespace-pre-line">
                                            {offer.client.zip && offer.client.city ? `${offer.client.zip} ${offer.client.city}` : ''}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">NIP: {offer.client.nip || '---'}</p>
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

                                <div className="flex-1">
                                    <PricingTable
                                        products={offer.products}
                                        leftContent={
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between text-sm bg-gray-50 p-3 rounded-md border border-gray-100">
                                                    <div className="text-gray-500">
                                                        <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Sposób płatności</span>
                                                        <span className="font-bold text-[#001F3F]">{offer.paymentMethod || "Przelew"}</span>
                                                    </div>
                                                    <div className="text-right text-gray-500">
                                                        <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Termin</span>
                                                        <span className="font-bold text-[#001F3F]">{offer.paymentTerm || "14 dni"}</span>
                                                    </div>
                                                </div>

                                                {totalLinesNet < 1000 && (
                                                    <div className="p-2 bg-red-50 border border-red-200 rounded-md text-left">
                                                        <p className="text-red-700 text-[10px] font-bold leading-tight">ZAMÓWIENIE PONIŻEJ MINIMUM LOGISTYCZNEGO!<br />Brakuje {(1000 - totalLinesNet).toFixed(2)} PLN netto do darmowej dostawy.</p>
                                                    </div>
                                                )}
                                            </div>
                                        }
                                    />
                                </div>
                            </div>

                            <div className="absolute bottom-32 left-0 right-0 text-center text-[10px] text-gray-400 mt-auto">
                                Strona {totalPages} z {totalPages}
                            </div>

                            <div className="mt-auto">
                                <Footer salesRep={offer.salesRep} />
                            </div>
                        </PreviewPage>
                    )}
                </div>
            </div>
        </div>
    );
}
