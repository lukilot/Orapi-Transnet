import React from 'react';
import { Industry } from '@/lib/types';
import { Truck, Ship, Factory, Tractor, HardHat } from 'lucide-react';
import clsx from 'clsx';

interface IndustrySelectorProps {
    value: Industry;
    onChange: (value: Industry) => void;
}

const INDUSTRIES: { value: Industry; label: string; icon: React.ElementType }[] = [
    { value: 'TRUCKS', label: 'Ciężarowe', icon: Truck },
    { value: 'MARITIME', label: 'Morskie', icon: Ship },
    { value: 'INDUSTRY', label: 'Przemysł', icon: Factory },
    { value: 'AGRICULTURE', label: 'Rolnictwo', icon: Tractor },
    { value: 'CONSTRUCTION', label: 'Budownictwo', icon: HardHat },
];

export default function IndustrySelector({ value, onChange }: IndustrySelectorProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-[#001F3F] mb-4">Branża</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {INDUSTRIES.map((industry) => {
                    const Icon = industry.icon;
                    const isSelected = value === industry.value;
                    return (
                        <button
                            key={industry.value}
                            onClick={() => onChange(industry.value)}
                            className={clsx(
                                "flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200",
                                isSelected
                                    ? "border-[#00A8E8] bg-blue-50 text-[#001F3F] ring-1 ring-[#00A8E8]"
                                    : "border-gray-200 text-gray-500 hover:border-[#00A8E8] hover:text-[#00A8E8]"
                            )}
                        >
                            <Icon className={clsx("w-6 h-6 mb-2", isSelected ? "text-[#00A8E8]" : "text-gray-400 group-hover:text-[#00A8E8]")} />
                            <span className="text-sm font-medium">{industry.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
