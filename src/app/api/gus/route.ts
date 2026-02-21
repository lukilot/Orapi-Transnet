import { NextResponse } from 'next/server';

import Bir from 'bir1';

export async function POST(req: Request) {
    try {
        const { nip } = await req.json();

        if (!nip) {
            return NextResponse.json({ error: 'NIP is required' }, { status: 400 });
        }

        const key = process.env.GUS_API_KEY;
        if (!key) {
            throw new Error('GUS_API_KEY is missing');
        }

        const bir = new Bir({ key });
        await bir.login();

        const result = await bir.search({ nip });

        if (!result) {
            return NextResponse.json({ error: 'Nie znaleziono firmy' }, { status: 404 });
        }

        // bir.search usually returns an object, but wrap it defensively.
        const data = Array.isArray(result) ? result[0] : result;

        return NextResponse.json({
            companyName: data.Nazwa,
            ulica: data.Ulica,
            nrNieruchomosci: data.NrNieruchomosci,
            nrLokalu: data.NrLokalu,
            miejscowosc: data.Miejscowosc,
            kodPocztowy: data.KodPocztowy,
            city: data.Miejscowosc, // Fallback map
        });
    } catch (error: unknown) {
        console.error('Błąd GUS API Route:', error);
        const errMessage = error instanceof Error ? error.message : 'Błąd podczas komunikacji z GUS';
        return NextResponse.json({ error: errMessage }, { status: 500 });
    }
}
