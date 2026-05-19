import React from 'react';
import { OfferData } from '@/lib/types';
import { Calendar, Hash, Truck } from 'lucide-react';

interface OfferDetailsProps {
    data: Pick<OfferData, 'id' | 'date' | 'validUntil' | 'paymentMethod' | 'paymentTerm' | 'shippingCost'>;
    onChange: (data: Partial<OfferData>) => void;
}

export default function OfferDetails({ data, onChange }: OfferDetailsProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    const shippingEnabled = data.shippingCost !== undefined;

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

            {/* Shipping Cost Section */}
            <div className="mt-5 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={shippingEnabled}
                            onChange={(e) => {
                                onChange({ shippingCost: e.target.checked ? 0 : undefined });
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-[#00A8E8] focus:ring-[#00A8E8] cursor-pointer"
                        />
                        <Truck className="w-4 h-4 text-[#00A8E8]" />
                        <span className="text-sm font-medium text-gray-700">Dodaj koszt transportu</span>
                    </label>
                </div>

                {shippingEnabled && (
                    <div className="mt-3 flex items-center gap-3">
                        <div className="relative w-48">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={data.shippingCost || ''}
                                placeholder="0.00"
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    onChange({ shippingCost: isNaN(val) ? 0 : val });
                                }}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm pr-14"
                            />
                            <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-semibold">PLN netto</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
