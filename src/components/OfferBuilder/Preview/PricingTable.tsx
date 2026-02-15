import React from 'react';
import { Product } from '@/lib/types';

interface PricingTableProps {
    products: Product[];
}

export default function PricingTable({ products }: PricingTableProps) {
    const calculateTotal = (products: Product[]) => {
        return products.reduce((sum, p) => {
            const discountedPrice = p.price * (1 - p.discount / 100);
            return sum + (discountedPrice * p.quantity);
        }, 0);
    };

    const totalNet = calculateTotal(products);
    const vat = totalNet * 0.23;
    const totalGross = totalNet + vat;

    return (
        <div className="mt-8">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#001F3F] text-white uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">Produkt</th>
                            <th className="px-6 py-4 text-center font-semibold tracking-wider">Ilość</th>
                            <th className="px-6 py-4 text-right font-semibold tracking-wider">Cena Netto</th>
                            <th className="px-6 py-4 text-right font-semibold tracking-wider">Rabat</th>
                            <th className="px-6 py-4 text-right font-semibold tracking-wider">Wartość</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-400 italic">
                                    Brak produktów w ofercie.
                                </td>
                            </tr>
                        ) : (
                            products.map((product, idx) => {
                                const lineValue = product.price * product.quantity * (1 - product.discount / 100);
                                return (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-[#001F3F]">{product.name}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center text-gray-600">{product.quantity}</td>
                                        <td className="px-6 py-4 text-right text-gray-600">{product.price.toFixed(2)} PLN</td>
                                        <td className="px-6 py-4 text-right text-gray-600">
                                            {product.discount > 0 ? <span className="text-[#00A8E8] font-bold">-{product.discount}%</span> : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-[#001F3F]">{lineValue.toFixed(2)} PLN</td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {products.length > 0 && (
                <div className="mt-6 flex justify-end">
                    <div className="w-1/2 bg-gray-50 p-6 rounded-lg border border-gray-100">
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
            )}
        </div>
    );
}
