'use client';

import React, { useState } from 'react';
import { OfferData, INITIAL_OFFER } from '@/lib/types';
import FormPanel from './FormPanel';
import PreviewPanel from './PreviewPanel';

export default function BuilderLayout() {
    const [offer, setOffer] = useState<OfferData>(INITIAL_OFFER);
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

    const handleOfferChange = (updatedOffer: OfferData) => {
        setOffer(updatedOffer);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-white">

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden flex border-b border-gray-200 bg-white shrink-0">
                <button
                    onClick={() => setActiveTab('editor')}
                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'editor' ? 'text-[#00A8E8] border-b-2 border-[#00A8E8]' : 'text-gray-400'}`}
                >
                    Edytor
                </button>
                <button
                    onClick={() => setActiveTab('preview')}
                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'preview' ? 'text-[#00A8E8] border-b-2 border-[#00A8E8]' : 'text-gray-400'}`}
                >
                    Podgląd
                </button>
            </div>

            {/* Left Panel - Input Controls */}
            <div className={`${activeTab === 'editor' ? 'block' : 'hidden'} lg:block w-full lg:w-1/2 h-full border-r border-gray-200 overflow-y-auto`}>
                <FormPanel offer={offer} onChange={handleOfferChange} />
            </div>

            {/* Right Panel - Live Preview */}
            <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} lg:block w-full lg:w-1/2 h-full bg-slate-50 relative flex flex-col`}>
                <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex items-start justify-center">
                    <PreviewPanel offer={offer} />
                </div>
            </div>
        </div>
    );
}
