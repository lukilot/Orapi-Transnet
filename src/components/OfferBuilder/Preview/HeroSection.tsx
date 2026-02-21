import React from 'react';
import { Industry, Product, INDUSTRY_LABELS } from '@/lib/types';
import {
    Droplets, Leaf, Package, Shield, Wind, Sparkles,
    Zap, Hand, CheckCircle2, Factory, Sun, FlaskConical, AlertTriangle,
    Droplet, Apple
} from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

interface HeroSectionProps {
    industry: Industry;
    mainProduct?: Product;
}

// Map features to specific visual styles
const getFeatureStyle = (feature: string) => {
    switch (feature) {
        case "produkt kwasowy": return { icon: <FlaskConical className="w-4 h-4" />, color: "text-red-500", bg: "bg-red-50" };
        case "produkt zasadowy": return { icon: <Droplet className="w-4 h-4" />, color: "text-blue-500", bg: "bg-blue-50" };
        case "wysokie PH": return { icon: <AlertTriangle className="w-4 h-4" />, color: "text-purple-500", bg: "bg-purple-50" };
        case "niskie PH": return { icon: <AlertTriangle className="w-4 h-4" />, color: "text-orange-500", bg: "bg-orange-50" };
        case "produkt silnie pieniący": return { icon: <Wind className="w-4 h-4" />, color: "text-cyan-500", bg: "bg-cyan-50" };
        case "produkt nie pieniący": return { icon: <Droplets className="w-4 h-4" />, color: "text-gray-500", bg: "bg-gray-50" };
        case "bezpieczeństwo": return { icon: <Shield className="w-4 h-4" />, color: "text-green-500", bg: "bg-green-50" };
        case "ekologiczny": return { icon: <Leaf className="w-4 h-4" />, color: "text-green-600", bg: "bg-green-50" };
        case "certyfikat ECO CERT": return { icon: <CheckCircle2 className="w-4 h-4" />, color: "text-emerald-500", bg: "bg-emerald-50" };
        case "certyfikat NSF": return { icon: <CheckCircle2 className="w-4 h-4" />, color: "text-blue-600", bg: "bg-blue-50" };
        case "jakość spożywcza": return { icon: <Apple className="w-4 h-4" />, color: "text-red-400", bg: "bg-red-50" };
        case "niwelowanie zapachów": return { icon: <Sparkles className="w-4 h-4" />, color: "text-indigo-400", bg: "bg-indigo-50" };
        case "wysoka wydajność": return { icon: <Zap className="w-4 h-4" />, color: "text-yellow-500", bg: "bg-yellow-50" };
        case "może wyschnąć": return { icon: <Sun className="w-4 h-4" />, color: "text-orange-400", bg: "bg-orange-50" };
        case "do mycia ręcznego": return { icon: <Hand className="w-4 h-4" />, color: "text-blue-400", bg: "bg-blue-50" };
        case "do mycia automatycznego": return { icon: <Factory className="w-4 h-4" />, color: "text-slate-500", bg: "bg-slate-50" };
        default: return { icon: <CheckCircle2 className="w-4 h-4" />, color: "text-[#00A8E8]", bg: "bg-blue-50" };
    }
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
        specs: { temp: 0, dilution: "-", isEco: false, ph: 7 },
        features: [],
        price: 0,
        quantity: 0,
        discount: 0
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
                    <div className="relative w-[320px] h-[360px]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                ) : (
                    /* Canister Placeholder - In valid app use actual image */
                    <div className="relative w-64 h-80 bg-gradient-to-br from-white to-gray-200 rounded-lg shadow-2xl flex items-center justify-center border border-white/50">
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
            {/* Layer 3: Data Badges (Left Overlay) */}
            <div className="absolute top-[35%] -translate-y-1/2 left-8 z-20 flex flex-col gap-6 items-start">
                {(product.features || []).slice(0, 2).map((feature, index) => {
                    const style = getFeatureStyle(feature);
                    return (
                        <div key={feature} className={clsx(
                            "group flex items-center gap-2 bg-white/95 backdrop-blur-md pr-3 pl-1.5 py-1.5 rounded-full shadow-lg border border-white/50 transition-all hover:scale-105",
                            index === 1 && "delay-75"
                        )}>
                            <div className={clsx("p-1.5 rounded-full", style.bg, style.color)}>
                                {style.icon}
                            </div>
                            <p className="text-[10px] sm:text-xs font-bold text-[#001F3F]">{feature}</p>
                        </div>
                    );
                })}
            </div>

            {/* Layer 4: Data Badges (Right Overlay) */}
            <div className="absolute top-[35%] -translate-y-1/2 right-8 z-20 flex flex-col gap-6 items-end">
                {(product.features || []).slice(2, 4).map((feature, index) => {
                    const style = getFeatureStyle(feature);
                    return (
                        <div key={feature} className={clsx(
                            "group flex items-center gap-2 bg-white/95 backdrop-blur-md pl-1.5 pr-3 py-1.5 rounded-full shadow-lg border border-white/50 transition-all hover:scale-105",
                            index === 1 && "delay-75"
                        )}>
                            <div className={clsx("p-1.5 rounded-full", style.bg, style.color)}>
                                {style.icon}
                            </div>
                            <p className="text-[10px] sm:text-xs font-bold text-[#001F3F]">{feature}</p>
                        </div>
                    );
                })}
            </div>

            {/* Product Name Title Overlay (Bottom Left) */}
            <div className="absolute bottom-8 left-8 z-20">
                <h2 className="text-4xl font-extrabold text-[#001F3F] tracking-tight">{product.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                    <p className="text-[#00A8E8] font-medium text-lg">{INDUSTRY_LABELS[industry]}</p>
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
