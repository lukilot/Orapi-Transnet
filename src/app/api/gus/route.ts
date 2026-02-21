import { NextResponse } from 'next/server';
import Bir1 from 'bir1';

export async function POST(request: Request) {
    try {
        const { nip } = await request.json();

        if (!nip) {
            return NextResponse.json({ error: 'NIP is required' }, { status: 400 });
        }

        // Initialize BIR1 client with TEST key
        // The library uses the test environment by default if no key is provided.
        // Providing 'abcde12345...' explicitly as key triggers PRODUCTION mode in the library logic, which fails with test key.
        const bir = new Bir1();

        // Login to start session
        await bir.login();

        // Search by NIP (must assume object based on library 4.x behavior verified in test)
        const data = await bir.search({ nip });

        // Logout (optional but good practice if session management is strict, though creating new client per request implies short session)
        // await bir.logout(); 

        if (data) {
            // Map BIR1 response to our application format
            // Handle potential undefined fields gracefully
            const street = data.Ulica || data.Miejscowosc; // Don't prepend "ul."
            const house = data.NrNieruchomosci || '';
            const apt = data.NrLokalu ? `/${data.NrLokalu}` : '';
            const zip = data.KodPocztowy || '';
            const city = data.Miejscowosc || '';

            const fullAddress = `${street} ${house}${apt}, ${zip} ${city}`;

            return NextResponse.json({
                companyName: data.Nazwa,
                address: fullAddress,
                nip: data.Nip,
                city: city,
                zip: zip,
                // Pass raw fields in case client needs them
                ulica: data.Ulica,
                nrNieruchomosci: data.NrNieruchomosci,
                nrLokalu: data.NrLokalu,
                miejscowosc: data.Miejscowosc,
                kodPocztowy: data.KodPocztowy
            });
        } else {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }

    } catch (error) {
        console.error('GUS API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch company data' }, { status: 500 });
    }
}
