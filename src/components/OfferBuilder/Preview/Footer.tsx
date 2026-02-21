import React from 'react';
import { SalesRep } from '@/lib/types';
import { Phone, Mail, Globe } from 'lucide-react';

interface FooterProps {
    salesRep: SalesRep;
}

export default function Footer({ salesRep }: FooterProps) {
    return (
        <div className="bg-[#001F3F] text-white p-8 mt-auto">
            <div className="flex justify-between items-start">

                {/* Static Company Data (Left) */}
                <div className="text-xs text-gray-400 leading-relaxed">
                    <p className="uppercase font-bold tracking-wider mb-2 text-white">Wyłączny importer produktów Transnet:</p>
                    <p className="font-bold text-white">Pol-Frans Jacek Rybiński</p>
                    <p>ul. Władysława Raczkiewicza 66</p>
                    <p>05-075 Warszawa</p>
                    <p>NIP: 5211223886</p>
                    <div className="flex items-center gap-2 mt-2 text-[#00A8E8]">
                        <Globe className="w-3 h-3" />
                        <span>www.orapi-transnet.pl</span>
                    </div>
                </div>

                {/* Dynamic Sales Rep Data (Right) */}
                <div className="text-right">
                    <p className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">Opiekun Handlowy</p>
                    <h3 className="text-xl font-bold mb-3">{salesRep.name}</h3>

                    <div className="flex flex-col gap-1 items-end text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                            <span>{salesRep.phone}</span>
                            <Phone className="w-4 h-4 text-[#00A8E8]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span>{salesRep.email}</span>
                            <Mail className="w-4 h-4 text-[#00A8E8]" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
