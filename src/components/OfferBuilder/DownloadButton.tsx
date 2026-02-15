'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OfferDocument from '../PDF/OfferDocument'; // Correct relative path from src/components/OfferBuilder
import { OfferData } from '@/lib/types';
import { Download, Loader2 } from 'lucide-react';

interface DownloadButtonProps {
    offer: OfferData;
}

export default function DownloadButton({ offer }: DownloadButtonProps) {
    return (
        <PDFDownloadLink
            document={<OfferDocument offer={offer} />}
            fileName={`oferta-transnet-${offer.id}.pdf`}
            className="bg-[#00A8E8] hover:bg-[#0090C5] text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-colors shadow-lg"
        >
            {({ loading }) => (
                <>
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                    {loading ? 'Generowanie...' : 'Pobierz PDF'}
                </>
            )}
        </PDFDownloadLink>
    );
}
