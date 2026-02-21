import { NextResponse } from 'next/server';

import Bir from 'bir1';

// Global instance cache to keep the session alive between subsequent API calls
let birInstance: InstanceType<typeof Bir> | null = null;

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

        // Initialize and login if no active instance exists
        if (!birInstance) {
            birInstance = new Bir({ key });
            await birInstance.login();
        }

        let result;
        try {
            // Attempt search with cached session
            result = await birInstance.search({ nip });
        } catch (searchError) {
            // If it fails (e.g. session timeout), purge and regenerate once
            birInstance = new Bir({ key });
            await birInstance.login();
            result = await birInstance.search({ nip });
        }

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
