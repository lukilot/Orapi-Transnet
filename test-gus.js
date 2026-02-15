async function testGus() {
    console.log('Importing Bir1...');
    const { default: Bir1 } = await import('bir1');

    console.log('Initializing client (no args for TEST env)...');
    // If we pass a key, it assumes PROD. 
    // We want TEST env, so we must rely on default key logic in the lib.
    const bir = new Bir1();

    try {
        await bir.login();
        console.log('Login success! Session ID:', bir.sid);

        console.log('Attempting search with OBJECT { nip: ... }');
        // Try T-Mobile NIP from docs example
        const data = await bir.search({ nip: '5261040567' });
        console.log('Search result (Object):', data);

        console.log('Attempting search with STRING (to see if it fails)');
        try {
            const data2 = await bir.search('1111111111');
            console.log('Search result (String):', data2);
        } catch (e) {
            console.log('Search with String failed as expected or returned weird data:', e.message);
        }

    } catch (e) {
        console.error('Test failed:', e);
    }
}

testGus();
