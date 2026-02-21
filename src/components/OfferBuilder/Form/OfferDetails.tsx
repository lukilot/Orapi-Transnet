import React from 'react';
import { OfferData } from '@/lib/types';
import { Calendar, Hash } from 'lucide-react';

interface OfferDetailsProps {
    data: Pick<OfferData, 'id' | 'date' | 'validUntil' | 'paymentMethod' | 'paymentTerm'>;
    onChange: (data: Partial<OfferData>) => void;
}

export default function OfferDetails({ data, onChange }: OfferDetailsProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-[#001F3F] mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-[#00A8E8]" />
                Szczegóły Oferty
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Numer Oferty</label>
                    <div className="relative">
                        <Hash className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={data.id}
                            disabled
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Data Wystawienia</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="date"
                            name="date"
                            value={data.date}
                            min={new Date().toISOString().split('T')[0]} // Restrict earlier dates
                            onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2 border border-gray-100 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm text-gray-600 cursor-not-allowed"
                            title="Data wystawienia powinna być aktualna"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Ważna Do</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="date"
                            name="validUntil"
                            value={data.validUntil}
                            onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Sposób płatności</label>
                    <input
                        type="text"
                        name="paymentMethod"
                        value={data.paymentMethod || "Przelew"}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Termin płatności</label>
                    <div className="flex gap-2 items-center">
                        <input
                            type="text"
                            name="paymentTerm"
                            value={data.paymentTerm || "14 dni"}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
