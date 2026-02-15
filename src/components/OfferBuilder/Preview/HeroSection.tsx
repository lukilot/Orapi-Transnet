import React from 'react';
import { Industry, Product } from '@/lib/types';
import { Thermometer, Droplets, Leaf, Package } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

interface HeroSectionProps {
    industry: Industry;
    mainProduct?: Product;
}

export default function HeroSection({ industry, mainProduct }: HeroSectionProps) {

    // Map Industry to Asset Path
    const BackgroundAsset = {
        TRUCKS: '/assets/trucks_blueprint_1771011586814.png',
        MARITIME: '/assets/maritime_blueprint_1771011600481.png',
        INDUSTRY: '/assets/industry_blueprint_1771011615007.png',
        AGRICULTURE: '/assets/agriculture_blueprint_1771011629016.png',
        CONSTRUCTION: '/assets/construction_blueprint_1771011642958.png',
    }[industry];

    const product = mainProduct || {
        name: "Wybierz Produkt",
        code: undefined,
        image: undefined,
        specs: { temp: 0, dilution: "-", isEco: false, ph: 7 }
    };

    return (
        <div className="relative w-full h-[350px] bg-slate-100 rounded-xl overflow-hidden mb-8 border border-slate-200 print:border-none print:shadow-none">
            {/* Layer 1: The Ghost (Background) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none overflow-hidden select-none">
                <div className="relative w-full h-full transform scale-125 -rotate-6 grayscale contrast-125">
                    <Image
                        src={BackgroundAsset}
                        alt={`${industry} blueprint`}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Layer 2: The Product (Center) */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                {product.image ? (
                    <div className="relative w-64 h-64">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                ) : (
                    /* Canister Placeholder - In valid app use actual image */
                    <div className="relative w-48 h-64 bg-gradient-to-br from-white to-gray-200 rounded-lg shadow-2xl flex items-center justify-center border border-white/50">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-lg" />
                        <Package className="w-24 h-24 text-gray-300 relative z-10" strokeWidth={1} />

                        {/* Product Label on Canister */}
                        <div className="absolute bottom-8 left-0 right-0 px-4 text-center z-20">
                            <p className="text-[10px] uppercase tracking-widest text-[#001F3F] font-bold">Transnet</p>
                            <p className="text-xs font-bold text-[#00A8E8] truncate">{product.name.split(' ')[0]}</p>
                        </div>
                    </div>
                )}
            </div>
            {/* Layer 3: Data Badges (Right Overlay) */}
            <div className="absolute top-[35%] -translate-y-1/2 right-8 z-20 flex flex-col gap-6 items-end">
                {(product.selectedAttributeKeys || []).map((key, index) => {
                    let icon, value, colorClass, bgClass;

                    switch (key) {
                        case 'temp':
                            icon = <Thermometer className="w-4 h-4" />;
                            value = product.specs.temp > 0 ? `${product.specs.temp}°C` : '-';
                            colorClass = 'text-[#00A8E8]';
                            bgClass = 'bg-blue-50';
                            break;
                        case 'dilution':
                            icon = <Droplets className="w-4 h-4" />;
                            value = product.specs.dilution;
                            colorClass = 'text-[#00A8E8]';
                            bgClass = 'bg-blue-50';
                            break;
                        case 'eco':
                            icon = <Leaf className="w-4 h-4" />;
                            value = 'Eco';
                            colorClass = 'text-green-500';
                            bgClass = 'bg-green-50';
                            break;
                        case 'ph':
                            icon = <span className="text-[10px] font-bold">pH</span>;
                            value = product.specs.ph;
                            colorClass = 'text-purple-500';
                            bgClass = 'bg-purple-50';
                            break;
                        default:
                            return null;
                    }

                    return (
                        <div key={key} className={clsx(
                            "group flex items-center gap-2 bg-white/95 backdrop-blur-md pl-1.5 pr-3 py-1.5 rounded-full shadow-lg border border-white/50 transition-all hover:scale-105",
                            index === 1 && "delay-75",
                            index === 2 && "delay-150"
                        )}>
                            <div className={clsx("p-1.5 rounded-full", bgClass, colorClass)}>
                                {icon}
                            </div>
                            <p className="text-sm font-bold text-[#001F3F]">{value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Product Name Title Overlay (Bottom Left) */}
            <div className="absolute bottom-8 left-8 z-20">
                <h2 className="text-4xl font-extrabold text-[#001F3F] tracking-tight">{product.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                    <p className="text-[#00A8E8] font-medium text-lg">{industry}</p>
                    {product.code && (
                        <>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <p className="text-gray-400 font-bold text-sm tracking-wide">{product.code}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Price Overlay (Bottom Right) */}
            <div className="absolute bottom-8 right-8 z-20 text-right">
                {product.discount > 0 && (
                    <p className="text-sm text-gray-400 line-through font-medium mb-0.5">
                        {product.price.toFixed(2)} PLN
                    </p>
                )}

                {/* Netto Price (Prominent - Minimalistic) */}
                <div className="flex items-baseline justify-end gap-1.5">
                    <p className="text-3xl font-black text-[#001F3F] tracking-tight leading-none">
                        {(product.price * (1 - (product.discount / 100))).toFixed(2)}
                    </p>
                    <p className="text-sm font-bold text-gray-400 leading-none">
                        PLN <span className="text-[#00A8E8] ml-0.5">NETTO</span>
                    </p>
                </div>

                {/* Brutto Price (Subtle) */}
                <p className="text-xs font-medium text-gray-400 mt-1">
                    {((product.price * (1 - (product.discount / 100))) * 1.23).toFixed(2)} PLN Brutto
                </p>
            </div>

        </div>
    );
}
