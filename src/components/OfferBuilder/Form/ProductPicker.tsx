import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Plus, Trash2, Box, Info } from 'lucide-react';
import clsx from 'clsx';

interface ProductPickerProps {
    selectedProducts: Product[];
    onChange: (products: Product[]) => void;
}

export default function ProductPicker({ selectedProducts, onChange }: ProductPickerProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddProduct = (product: Product) => {
        // Enforce Single Product Limit: Replace existing with new
        const newProduct: Product = {
            ...product,
            id: `${product.id}-${Date.now()}`,
            // Default select first 2 available attributes
            selectedAttributeKeys: ['temp', 'dilution']
        };

        onChange([newProduct]);
        setSearchTerm('');
    };

    const handleRemoveProduct = (index: number) => {
        const newProducts = [...selectedProducts];
        newProducts.splice(index, 1);
        onChange(newProducts);
    };

    const handleUpdateProduct = (index: number, field: keyof Product, value: any) => {
        const newProducts = [...selectedProducts];
        const product = newProducts[index];

        if (field === 'discount') {
            const max = product.maxDiscount || 100;
            if (value > max) {
                newProducts[index] = { ...product, discount: max };
            } else {
                newProducts[index] = { ...product, discount: value };
            }
        } else {
            newProducts[index] = { ...product, [field]: value };
        }
        onChange(newProducts);
    };

    const toggleAttribute = (index: number, key: 'temp' | 'dilution' | 'eco' | 'ph') => {
        const newProducts = [...selectedProducts];
        const product = newProducts[index];
        const currentKeys = product.selectedAttributeKeys || [];

        if (currentKeys.includes(key)) {
            newProducts[index] = { ...product, selectedAttributeKeys: currentKeys.filter(k => k !== key) };
        } else {
            if (currentKeys.length < 3) {
                newProducts[index] = { ...product, selectedAttributeKeys: [...currentKeys, key] };
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
                    placeholder="Wyszukaj produkt (np. Platinium)..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredProducts.map(product => (
                            <button
                                key={product.id}
                                onClick={() => handleAddProduct(product)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex justify-between items-center text-sm"
                            >
                                <span className="font-medium text-[#001F3F]">{product.name}</span>
                                <span className="text-gray-500">{product.price.toFixed(2)} PLN</span>
                            </button>
                        ))}
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
                    const currentAttributes = product.selectedAttributeKeys || [];

                    return (
                        <div key={product.id} className="bg-gray-50 p-4 rounded-md border border-gray-100">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-semibold text-[#001F3F]">{product.name}</h4>
                                    <p className="text-xs text-gray-500">{product.description}</p>
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
                                <p className="text-xs font-medium text-gray-400 mb-2">Wybierz Atrybuty (Max 3)</p>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { key: 'temp', label: `Temp ${product.specs.temp > 0 ? product.specs.temp + '°C' : '-'}` },
                                        { key: 'dilution', label: `Doz. ${product.specs.dilution}` },
                                        { key: 'ph', label: `pH ${product.specs.ph}` },
                                        ...(product.specs.isEco ? [{ key: 'eco', label: 'Eco-Friendly' }] : [])
                                    ].map((attr) => (
                                        <button
                                            key={attr.key}
                                            onClick={() => toggleAttribute(index, attr.key as any)}
                                            disabled={!currentAttributes.includes(attr.key as any) && currentAttributes.length >= 3}
                                            className={clsx(
                                                "px-2 py-1 text-xs rounded-full border transition-colors",
                                                currentAttributes.includes(attr.key as any)
                                                    ? "bg-blue-100 border-blue-200 text-blue-700 font-medium"
                                                    : "bg-white border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            )}
                                        >
                                            {attr.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3 text-sm items-end">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Cena Kat.</label>
                                    <input
                                        type="number"
                                        value={product.price}
                                        readOnly
                                        className="w-full px-2 py-1 border border-gray-200 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
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
