import React, { useState } from 'react';
import { ClientDetails as ClientDetailsType } from '@/lib/types';
import { Building2, FileText, MapPin, User, Phone, Mail, Loader2, DownloadCloud } from 'lucide-react';
import clsx from 'clsx';

interface ClientDetailsProps {
    data: ClientDetailsType;
    onChange: (data: ClientDetailsType) => void;
}

export default function ClientDetails({ data, onChange }: ClientDetailsProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    // Parse stored phone string
    const phoneParts = data.phone?.split(' ') || [];
    const prefix = phoneParts[0]?.startsWith('+') ? phoneParts[0] : '+48';
    const rawNumber = phoneParts[0]?.startsWith('+') ? phoneParts.slice(1).join('') : phoneParts.join('');

    const formattedRawNumber = rawNumber.replace(/\D/g, '').replace(/(\d{3})(?=\d)/g, '$1 ').trim();

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 9) val = val.slice(0, 9);
        let formatted = val;
        if (val.length > 3 && val.length <= 6) {
            formatted = `${val.slice(0, 3)} ${val.slice(3)}`;
        } else if (val.length > 6) {
            formatted = `${val.slice(0, 3)} ${val.slice(3, 6)} ${val.slice(6)}`;
        }
        onChange({ ...data, phone: `${prefix} ${formatted}`.trim() });
    };

    const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ ...data, phone: `${e.target.value} ${formattedRawNumber}`.trim() });
    };

    const fetchGusData = async () => {
        if (!data.nip || data.nip.length < 10) {
            setError('Wprowadź poprawny NIP (10 cyfr)');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/gus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nip: data.nip.replace(/-/g, '') }), // remove dashes if any
            });

            if (!response.ok) throw new Error('Nie znaleziono firmy w bazie GUS (lub błąd serwera)');

            const gusData = await response.json();

            // Update form data with fetched values
            // Update form data with fetched values
            onChange({
                ...data,
                companyName: gusData.companyName || '',
                street: gusData.ulica || gusData.city, // Fallback if street is empty, though usually it's null in BIR1 if no street
                number: `${gusData.nrNieruchomosci}${gusData.nrLokalu ? '/' + gusData.nrLokalu : ''}`,
                city: gusData.miejscowosc || '',
                zip: gusData.kodPocztowy || '',
            });

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'Błąd pobierania danych');
            } else {
                setError('Błąd pobierania danych');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-[#001F3F] mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#00A8E8]" />
                Dane Klienta
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* NIP Field with Action */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">NIP</label>
                    <div className="relative flex gap-2">
                        <div className="relative flex-1">
                            <FileText className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                name="nip"
                                value={data.nip}
                                onChange={handleChange}
                                className={clsx(
                                    "w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm",
                                    error ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-[#00A8E8]"
                                )}
                                placeholder="000-000-00-00"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={fetchGusData}
                            disabled={loading}
                            className="bg-blue-50 text-[#00A8E8] hover:bg-blue-100 px-3 py-2 rounded-md border border-blue-100 transition-colors flex items-center gap-2 whitespace-nowrap text-xs font-bold disabled:opacity-50"
                            title="Pobierz dane z GUS"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
                            <span className="hidden sm:inline">Pobierz z GUS</span>
                        </button>
                    </div>
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Nazwa Firmy</label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="companyName"
                            value={data.companyName}
                            onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                            placeholder="np. Logistyka Polska Sp. z o.o."
                        />
                    </div>
                </div>

                {/* Address Fields */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Ulica</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="street"
                            value={data.street}
                            onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                            placeholder="Ul. Przemysłowa"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Nr Domu/Lokalu</label>
                    <input
                        type="text"
                        name="number"
                        value={data.number}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                        placeholder="10 / 2"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Kod Pocztowy</label>
                    <input
                        type="text"
                        name="zip"
                        value={data.zip}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                        placeholder="00-000"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 uppercase">Miejscowość</label>
                    <input
                        type="text"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] text-sm"
                        placeholder="Warszawa"
                    />
                </div>

                {/* Highlighted Contact Fields */}
                <div className="space-y-1 bg-orange-50/40 p-3 -mx-3 rounded-lg border border-orange-100">
                    <label className="text-xs font-bold text-orange-600 uppercase">Osoba Kontaktowa *</label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-orange-400" />
                        <input
                            type="text"
                            name="contactPerson"
                            value={data.contactPerson}
                            onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
                            placeholder="Jan Nowak"
                        />
                    </div>
                </div>

                <div className="space-y-1 bg-orange-50/40 p-3 -mx-3 rounded-lg border border-orange-100">
                    <label className="text-xs font-bold text-orange-600 uppercase">Telefon *</label>
                    <div className="flex gap-2">
                        <select
                            value={prefix}
                            onChange={handlePrefixChange}
                            className="w-24 px-2 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
                        >
                            <option value="+48">🇵🇱 +48</option>
                            <option value="+49">🇩🇪 +49</option>
                            <option value="+420">🇨🇿 +420</option>
                            <option value="+421">🇸🇰 +421</option>
                            <option value="+370">🇱🇹 +370</option>
                            <option value="+44">🇬🇧 +44</option>
                        </select>
                        <div className="relative flex-1">
                            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-orange-400" />
                            <input
                                type="text"
                                name="phone"
                                value={formattedRawNumber}
                                onChange={handlePhoneChange}
                                className="w-full pl-9 pr-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
                                placeholder="123 456 789"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1 bg-orange-50/40 p-3 -mx-3 rounded-lg border border-orange-100">
                    <label className="text-xs font-bold text-orange-600 uppercase">Email *</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-orange-400" />
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
                            placeholder="biuro@firma.pl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
