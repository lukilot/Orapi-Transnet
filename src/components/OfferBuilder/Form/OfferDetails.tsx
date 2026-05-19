import React from 'react';
import { OfferData } from '@/lib/types';
import { Calendar, Hash, Truck, AlertTriangle } from 'lucide-react';

interface OfferDetailsProps {
    data: Pick<OfferData, 'id' | 'date' | 'validUntil' | 'paymentMethod' | 'paymentTerm' | 'shippingCost' | 'showLogisticsWarning'>;
    onChange: (data: Partial<OfferData>) => void;
}

export default function OfferDetails({ data, onChange }: OfferDetailsProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    const shippingEnabled = data.shippingCost !== undefined;
    const logisticsWarningEnabled = data.showLogisticsWarning === true;

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
                            min={new Date().toISOString().split('T')[0]}
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
                    <input
                        type="text"
                        name="paymentTerm"
                        value={data.paymentTerm || "14 dni"}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                    />
                </div>
            </div>

            {/* Dostawa i Logistyka */}
            <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Dostawa i Logistyka</p>

                <div className="flex flex-col gap-2">
                    {/* Transport toggle row */}
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-150 ${shippingEnabled ? 'bg-blue-50 border-[#00A8E8]/30' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <button
                                type="button"
                                role="switch"
                                aria-checked={shippingEnabled}
                                onClick={() => onChange({ shippingCost: shippingEnabled ? undefined : 0 })}
                                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00A8E8] focus:ring-offset-1 ${shippingEnabled ? 'bg-[#00A8E8]' : 'bg-gray-300'}`}
                            >
                                <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${shippingEnabled ? 'translate-x-4' : 'translate-x-1'}`} />
                            </button>
                            <Truck className={`w-4 h-4 shrink-0 ${shippingEnabled ? 'text-[#00A8E8]' : 'text-gray-400'}`} />
                            <span className={`text-sm font-medium ${shippingEnabled ? 'text-[#001F3F]' : 'text-gray-500'}`}>
                                Koszt transportu
                            </span>
                        </div>

                        {shippingEnabled && (
                            <div className="relative shrink-0">
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
                                    className="w-36 px-3 py-1.5 border border-[#00A8E8]/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm pr-14 bg-white"
                                    autoFocus
                                />
                                <span className="absolute right-2.5 top-1.5 text-xs text-gray-400 font-semibold pointer-events-none">PLN netto</span>
                            </div>
                        )}
                    </div>

                    {/* Logistics warning toggle row */}
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-150 ${logisticsWarningEnabled ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center gap-3 flex-1">
                            <button
                                type="button"
                                role="switch"
                                aria-checked={logisticsWarningEnabled}
                                onClick={() => onChange({ showLogisticsWarning: !logisticsWarningEnabled })}
                                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 ${logisticsWarningEnabled ? 'bg-orange-400' : 'bg-gray-300'}`}
                            >
                                <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${logisticsWarningEnabled ? 'translate-x-4' : 'translate-x-1'}`} />
                            </button>
                            <AlertTriangle className={`w-4 h-4 shrink-0 ${logisticsWarningEnabled ? 'text-orange-400' : 'text-gray-400'}`} />
                            <span className={`text-sm font-medium ${logisticsWarningEnabled ? 'text-orange-700' : 'text-gray-500'}`}>
                                Informacja o minimum logistycznym
                            </span>
                        </div>
                        {logisticsWarningEnabled && (
                            <span className="text-[10px] font-bold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full shrink-0">2 000 PLN netto</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
