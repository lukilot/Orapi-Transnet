import React, { useState } from 'react';
import { Product, AVAILABLE_FEATURES } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Trash2, Box, Info } from 'lucide-react';
import clsx from 'clsx';

interface ProductPickerProps {
    selectedProducts: Product[];
    onChange: (products: Product[]) => void;
}

export default function ProductPicker({ selectedProducts, onChange }: ProductPickerProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleAddProduct = (product: Product) => {
        if (selectedProducts.length >= 6) {
            alert("Maksymalna liczba produktów na jednej ofercie to 6.");
            return;
        }

        const newProduct: Product = {
            ...product,
            id: `${product.id}-${crypto.randomUUID()}`,
            features: product.features && product.features.length > 0 ? product.features.slice(0, 4) : []
        };

        onChange([...selectedProducts, newProduct]);
        setSearchTerm('');
        setIsDropdownOpen(false);
    };

    const handleRemoveProduct = (index: number) => {
        const newProducts = [...selectedProducts];
        newProducts.splice(index, 1);
        onChange(newProducts);
    };

    const handleUpdateProduct = (index: number, field: keyof Product, value: string | number) => {
        const newProducts = [...selectedProducts];
        const product = newProducts[index];

        if (field === 'discount') {
            const max = product.maxDiscount || 100;
            if (typeof value === 'number' && value > max) {
                newProducts[index] = { ...product, discount: max };
            } else {
                newProducts[index] = { ...product, discount: value as number };
            }
        } else if (field === 'quantity') {
            newProducts[index] = { ...product, [field]: value as number };
        } else {
            // fallback for string values just in case
            (newProducts[index] as unknown as Record<string, unknown>)[field] = value;
        }
        onChange(newProducts);
    };

    const toggleAttribute = (index: number, feature: string) => {
        const newProducts = [...selectedProducts];
        const product = newProducts[index];
        const currentFeatures = product.features || [];

        if (currentFeatures.includes(feature)) {
            newProducts[index] = { ...product, features: currentFeatures.filter(f => f !== feature) };
        } else {
            if (currentFeatures.length < 4) {
                newProducts[index] = { ...product, features: [...currentFeatures, feature] };
            }
        }
        onChange(newProducts);
    };

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-[#001F3F] mb-4 flex items-center gap-2">
                <Box className="w-5 h-5 text-[#00A8E8]" />
                Produkty
            </h3>

            {/* Product Search/Add */}
            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder={selectedProducts.length >= 6 ? "Osiągnięto limit 6 produktów" : "Wyszukaj produkt (np. Platinium)..."}
                    disabled={selectedProducts.length >= 6}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                />
                {isDropdownOpen && selectedProducts.length < 6 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredProducts.map(product => {
                            const hasVariants = product.variants && product.variants.length > 0;
                            const displayPrice = hasVariants
                                ? `od ${Math.min(...product.variants!.map(v => v.price)).toFixed(2)} PLN`
                                : `${product.price.toFixed(2)} PLN`;

                            return (
                                <button
                                    key={product.id}
                                    onClick={() => handleAddProduct(product)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between items-center text-sm gap-3"
                                >
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="font-medium text-[#001F3F] truncate">{product.name}</span>
                                        {product.category && <span className="text-[10px] text-gray-400 truncate mt-0.5">{product.category}</span>}
                                    </div>
                                    <span className="text-gray-500 whitespace-nowrap flex-shrink-0">{displayPrice}</span>
                                </button>
                            );
                        })}
                        {filteredProducts.length === 0 && (
                            <div className="px-4 py-2 text-gray-400 text-sm">Brak wyników</div>
                        )}
                    </div>
                )}
            </div>

            {/* Selected Products List */}
            <div className="space-y-4">
                {selectedProducts.map((product, index) => {
                    const transactionPrice = product.price * (1 - (product.discount / 100));
                    const currentFeatures = product.features || [];

                    return (
                        <div key={product.id} className="bg-gray-50 p-4 rounded-md border border-gray-100">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h4 className="font-bold text-[#001F3F] text-lg">{product.name}</h4>
                                        {product.category && (
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 text-[10px] uppercase font-bold tracking-wider rounded-full">
                                                {product.category}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed pr-8">{product.description}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveProduct(index)}
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Attributes Selection */}
                            <div className="mb-4">
                                <p className="text-xs font-medium text-gray-400 mb-2">Wybierz Cechy Produktu (Max 4, po 2 na stronę)</p>
                                <div className="flex flex-wrap gap-2">
                                    {AVAILABLE_FEATURES.map((feature) => (
                                        <button
                                            key={feature}
                                            onClick={() => toggleAttribute(index, feature)}
                                            disabled={!currentFeatures.includes(feature) && currentFeatures.length >= 4}
                                            className={clsx(
                                                "px-2 py-1 text-xs rounded-full border transition-colors",
                                                currentFeatures.includes(feature)
                                                    ? "bg-blue-100 border-blue-200 text-blue-700 font-medium"
                                                    : "bg-white border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            )}
                                        >
                                            {feature}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Variant Selection (If Applicable) */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Dostępne Warianty (Pojemność/Waga)</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {product.variants.map(variant => (
                                            <button
                                                key={variant.name}
                                                onClick={() => {
                                                    handleUpdateProduct(index, 'selectedVariant', variant.name);
                                                    handleUpdateProduct(index, 'price', variant.price);
                                                }}
                                                className={clsx(
                                                    "px-3 py-1.5 text-xs rounded-md border transition-colors font-medium",
                                                    product.selectedVariant === variant.name
                                                        ? "bg-[#00A8E8] text-white border-[#00A8E8]"
                                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 -hover:border-gray-300"
                                                )}
                                            >
                                                {variant.name} <span className={product.selectedVariant === variant.name ? "text-blue-100" : "text-gray-400"}>({variant.price.toFixed(2)} zł)</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-4 gap-3 text-sm items-end">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Cena (PLN)</label>
                                    <input
                                        type="number"
                                        value={product.price}
                                        onChange={(e) => handleUpdateProduct(index, 'price', parseFloat(e.target.value))}
                                        className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-[#00A8E8]"
                                        min={0}
                                        step="0.01"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">
                                        Rabat % <span className="text-[10px] text-gray-300">(Max {product.maxDiscount || 100}%)</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={product.discount}
                                        min={0}
                                        max={product.maxDiscount || 100}
                                        onChange={(e) => handleUpdateProduct(index, 'discount', parseFloat(e.target.value))}
                                        className={clsx(
                                            "w-full px-2 py-1 border rounded focus:ring-1 focus:ring-[#00A8E8]",
                                            (product.discount > (product.maxDiscount || 100)) ? "border-red-300 text-red-600" : "border-gray-200"
                                        )}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Cena Trans.</label>
                                    <div className="w-full px-2 py-1 border border-gray-200 rounded bg-blue-50 text-[#001F3F] flex flex-col justify-center h-[38px]">
                                        <span className="text-sm font-bold leading-none">
                                            {transactionPrice.toFixed(2)} <span className="text-[10px] font-normal text-gray-500">netto</span>
                                        </span>
                                        <span className="text-[10px] text-gray-400 leading-none mt-0.5">
                                            {(transactionPrice * 1.23).toFixed(2)} brutto
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Ilość</label>
                                    <input
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) => handleUpdateProduct(index, 'quantity', parseFloat(e.target.value))}
                                        className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-[#00A8E8]"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}

                {selectedProducts.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-lg">
                        <Info className="w-6 h-6 mx-auto mb-2 opacity-50" />
                        Brak produktów w ofercie. Wyszukaj i dodaj produkt powyżej.
                    </div>
                )}
            </div>
        </div>
    );
}
