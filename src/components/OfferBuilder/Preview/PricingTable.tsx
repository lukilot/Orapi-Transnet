import React from 'react';
import { Product } from '@/lib/types';

interface PricingTableProps {
    products: Product[];
    hideTotals?: boolean;
    leftContent?: React.ReactNode;
}

export default function PricingTable({ products, hideTotals = false, leftContent }: PricingTableProps) {
    const calculateTotal = (products: Product[]) => {
        return products.reduce((sum, p) => {
            const discountedPrice = p.price * (1 - p.discount / 100);
            return sum + (discountedPrice * p.quantity);
        }, 0);
    };

    const totalNet = calculateTotal(products);
    const vat = totalNet * 0.23;
    const totalGross = totalNet + vat;

    const hasDiscount = products.some(p => p.discount > 0);

    return (
        <div className="mt-4">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#001F3F] text-white uppercase text-xs">
                        <tr>
                            <th className="px-4 py-2 font-semibold tracking-wider">Produkt</th>
                            <th className="px-4 py-2 text-center font-semibold tracking-wider">Ilość</th>
                            <th className="px-4 py-2 text-right font-semibold tracking-wider">Cena Netto</th>
                            {hasDiscount && <th className="px-4 py-2 text-right font-semibold tracking-wider">Rabat</th>}
                            <th className="px-4 py-2 text-right font-semibold tracking-wider">Wartość</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={hasDiscount ? 5 : 4} className="px-4 py-4 text-center text-gray-400 italic">
                                    Brak produktów w ofercie.
                                </td>
                            </tr>
                        ) : (
                            products.map((product, idx) => {
                                const lineValue = product.price * product.quantity * (1 - product.discount / 100);
                                return (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-2">
                                            <div className="flex flex-col items-start gap-0.5">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-[#001F3F]">{product.name}</p>
                                                    {product.selectedVariant && (
                                                        <span className="text-[10px] font-bold text-[#00A8E8] bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide inline-block">
                                                            {product.selectedVariant}
                                                        </span>
                                                    )}
                                                </div>
                                                {product.category && (
                                                    <p className="text-[10px] text-gray-500 font-medium">
                                                        {product.category}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-center text-gray-600">{product.quantity}</td>
                                        <td className="px-4 py-2 text-right text-gray-600">{product.price.toFixed(2)} PLN</td>
                                        {
                                            hasDiscount && (
                                                <td className="px-4 py-2 text-right text-gray-600">
                                                    {product.discount > 0 ? <span className="text-[#00A8E8] font-bold">-{product.discount}%</span> : '-'}
                                                </td>
                                            )
                                        }
                                        <td className="px-4 py-2 text-right font-bold text-[#001F3F]">{lineValue.toFixed(2)} PLN</td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {
                products.length > 0 && !hideTotals && (
                    <div className="mt-4 flex justify-between items-start gap-6">
                        <div className="flex-1">
                            {leftContent}
                        </div>
                        <div className="w-[300px] shrink-0 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="flex justify-between mb-2 text-gray-600">
                                <span>Suma Netto:</span>
                                <span className="font-medium">{totalNet.toFixed(2)} PLN</span>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-600">
                                <span>VAT (23%):</span>
                                <span className="font-medium">{vat.toFixed(2)} PLN</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-end">
                                <span className="text-lg font-bold text-[#001F3F]">Do Zapłaty:</span>
                                <span className="text-2xl font-extrabold text-[#00A8E8]">{totalGross.toFixed(2)} PLN</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
