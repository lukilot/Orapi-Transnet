import React from 'react';
import { SalesRep } from '@/lib/types';
import { MOCK_SALES_REPS } from '@/lib/mockData';
import { Users } from 'lucide-react';

interface SalespersonPickerProps {
    value: SalesRep;
    onChange: (salesRep: SalesRep) => void;
}

export default function SalespersonPicker({ value, onChange }: SalespersonPickerProps) {
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = e.target.value;
        const salesRep = MOCK_SALES_REPS.find(rep => rep.name === selectedName);
        if (salesRep) {
            onChange(salesRep);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-[#001F3F] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00A8E8]" />
                Opiekun Handlowy
            </h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wybierz Opiekuna
                </label>
                <select
                    value={value.name}
                    onChange={handleSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                >
                    {MOCK_SALES_REPS.map((rep) => (
                        <option key={rep.email} value={rep.name}>
                            {rep.name}
                        </option>
                    ))}
                </select>

                <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
                    <p><span className="font-semibold">Telefon:</span> {value.phone}</p>
                    <p><span className="font-semibold">Email:</span> {value.email}</p>
                </div>
            </div>
        </div>
    );
}
