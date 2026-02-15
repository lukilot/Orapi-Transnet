import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { OfferData } from '@/lib/types';

// Register fonts (using standard fonts for now, or register from URL if needed)
Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
    ],
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Roboto',
        padding: 0,
    },
    container: {
        padding: 30, // Reduced padding
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'flex-end',
        height: 50, // Fixed height for header alignment
    },
    logoImage: {
        width: 150, // Approx 3x aspect ratio
        height: 'auto',
        objectFit: 'contain',
    },
    metaLabel: {
        fontSize: 8,
        color: '#9CA3AF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    metaValue: {
        fontSize: 12,
        color: '#001F3F',
        fontWeight: 'bold',
    },

    // HERO SECTION
    heroSection: {
        height: 240,
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        marginBottom: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    heroBgImage: {
        position: 'absolute',
        top: -50,
        left: 0,
        right: 0,
        bottom: -50,
        opacity: 0.1,
        objectFit: 'cover',
        transform: 'rotate(-6deg) scale(1.2)'
    },
    heroProductImage: {
        width: 140,
        height: 140,
        objectFit: 'contain',
        zIndex: 10,
    },

    // OVERLAYS
    overlayLeft: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 20,
    },
    productTitle: {
        fontSize: 24,
        color: '#001F3F',
        fontWeight: 'black',
        marginBottom: 2,
    },
    productSubtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#00A8E8',
        flexDirection: 'row',
    },

    overlayRightAttributes: {
        position: 'absolute',
        top: 25,
        right: 20,
        alignItems: 'flex-end',
        zIndex: 20,
    },
    attributePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 99, // Fully rounded
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSymbol: {
        fontSize: 10,
        fontWeight: 'black',
    },

    overlayRightPrice: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'flex-end',
        zIndex: 20,
    },
    priceNetto: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    priceValue: {
        fontSize: 24,
        fontWeight: 'black',
        color: '#001F3F',
    },
    priceLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#9CA3AF', // gray-400
        marginLeft: 4,
    },
    priceBrutto: {
        fontSize: 8,
        color: '#9CA3AF',
        marginTop: 2,
        fontWeight: 'bold',
    },

    // REST OF CONTENT
    clientSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    colLeft: { width: '50%' },
    colRight: { width: '40%', alignItems: 'flex-end' },
    label: { fontSize: 8, color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 4 },
    text: { fontSize: 10, color: '#475569', marginBottom: 2 },
    textBold: { fontSize: 12, color: '#001F3F', fontWeight: 'bold', marginBottom: 2 },

    table: { width: '100%', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' },
    tableHeader: { flexDirection: 'row', backgroundColor: '#001F3F', padding: 6 },
    tableHeaderCell: { color: '#FFFFFF', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase' },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', padding: 6, alignItems: 'center' },

    colName: { flex: 3 },
    colQty: { flex: 1, textAlign: 'center' },
    colPrice: { flex: 1.5, textAlign: 'right' },
    colDisc: { flex: 1, textAlign: 'right' },
    colTotal: { flex: 1.5, textAlign: 'right' },

    footer: {
        backgroundColor: '#001F3F',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
        color: 'white',
    },
    footerCol: { flexDirection: 'column' },
    footerLabel: { fontSize: 8, fontWeight: 'bold', color: 'white', textTransform: 'uppercase', marginBottom: 4 },
    footerText: { fontSize: 10, color: '#CBD5E1', marginBottom: 2 },
    footerName: { fontSize: 14, fontWeight: 'bold', color: 'white', marginBottom: 4 },
    footerContact: { fontSize: 10, color: '#CBD5E1', flexDirection: 'row', alignItems: 'center', marginBottom: 2, textAlign: 'right' }
});

interface OfferDocumentProps {
    offer: OfferData;
}

export default function OfferDocument({ offer }: OfferDocumentProps) {
    // Helpers
    const calculateLineTotal = (p: any) => p.price * p.quantity * (1 - p.discount / 100);
    const totalNet = offer.products.reduce((sum, p) => sum + calculateLineTotal(p), 0);
    const vat = totalNet * 0.23;
    const totalGross = totalNet + vat;

    // Assets
    const BackgroundAsset = {
        TRUCKS: '/assets/trucks_blueprint_1771011586814.png',
        MARITIME: '/assets/maritime_blueprint_1771011600481.png',
        INDUSTRY: '/assets/industry_blueprint_1771011615007.png',
        AGRICULTURE: '/assets/agriculture_blueprint_1771011629016.png',
        CONSTRUCTION: '/assets/construction_blueprint_1771011642958.png',
    }[offer.industry];

    // Main Product for Hero
    const heroProduct = offer.products[0] || {
        name: "Wybierz Produkt",
        specs: { temp: 0, dilution: "-", isEco: false, ph: 7 },
        price: 0,
        discount: 0,
        selectedAttributeKeys: []
    };

    const nettoPrice = heroProduct.price * (1 - (heroProduct.discount / 100));
    const bruttoPrice = nettoPrice * 1.23;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            {/* Logo instead of Text */}
                            <Image src="/assets/transnet-logo.png" style={styles.logoImage} />
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.metaLabel}>Numer Oferty</Text>
                            <Text style={styles.metaValue}>{offer.id}</Text>
                            <Text style={[styles.metaLabel, { marginTop: 4 }]}>Data: {offer.date}</Text>
                        </View>
                    </View>

                    {/* HERO SECTION */}
                    <View style={styles.heroSection}>
                        <Image src={BackgroundAsset} style={styles.heroBgImage} />

                        {heroProduct.image && (
                            <Image
                                src={heroProduct.image}
                                style={styles.heroProductImage}
                            />
                        )}

                        {/* OVERLAYS */}

                        {/* 1. Title Overlay (Left) */}
                        <View style={styles.overlayLeft}>
                            <Text style={styles.productTitle}>{heroProduct.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.productSubtitle}>{offer.industry}</Text>
                                {heroProduct.code && <Text style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 8, fontWeight: 'bold' }}>{heroProduct.code}</Text>}
                            </View>
                        </View>

                        {/* 2. Attributes Overlay (Right Top) */}
                        <View style={styles.overlayRightAttributes}>
                            {(heroProduct.selectedAttributeKeys || []).map((key: string, i: number) => {
                                let label = '', color = '#000', bgColor = '#ccc', symbol = '';

                                if (key === 'temp') {
                                    label = heroProduct.specs.temp > 0 ? `${heroProduct.specs.temp}°C` : '-';
                                    color = '#00A8E8';
                                    bgColor = '#EFF6FF'; // blue-50
                                    symbol = '°C';
                                }
                                if (key === 'dilution') {
                                    label = heroProduct.specs.dilution;
                                    color = '#00A8E8';
                                    bgColor = '#EFF6FF';
                                    symbol = '%';
                                }
                                if (key === 'eco') {
                                    label = 'Eco';
                                    color = '#22C55E';
                                    bgColor = '#F0FDF4'; // green-50
                                    symbol = 'E';
                                }
                                if (key === 'ph') {
                                    label = `pH ${heroProduct.specs.ph}`;
                                    color = '#A855F7';
                                    bgColor = '#FAF5FF'; // purple-50
                                    symbol = 'pH';
                                }

                                return (
                                    <View key={i} style={styles.attributePill}>
                                        {/* Icon Circle */}
                                        <View style={[styles.iconCircle, { backgroundColor: bgColor }]}>
                                            <Text style={[styles.iconSymbol, { color: color }]}>{symbol}</Text>
                                        </View>
                                        {/* Text */}
                                        <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#001F3F' }}>
                                            {label}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>

                        {/* 3. Price Overlay (Right Bottom) */}
                        <View style={styles.overlayRightPrice}>
                            <View style={styles.priceNetto}>
                                <Text style={styles.priceValue}>{nettoPrice.toFixed(2)}</Text>
                                <Text style={styles.priceLabel}>PLN <Text style={{ color: '#00A8E8' }}>NETTO</Text></Text>
                            </View>
                            <Text style={styles.priceBrutto}>{bruttoPrice.toFixed(2)} PLN Brutto</Text>
                        </View>
                    </View>

                    {/* Client Section */}
                    <View style={styles.clientSection}>
                        <View style={styles.colLeft}>
                            <Text style={styles.label}>Nabywca</Text>
                            <Text style={[styles.textBold, { fontSize: 14 }]}>{offer.client.companyName}</Text>
                            <Text style={styles.text}>{offer.client.street ? `${offer.client.street} ${offer.client.number}` : ''}</Text>
                            <Text style={styles.text}>{offer.client.zip ? `${offer.client.zip} ${offer.client.city}` : ''}</Text>
                            <Text style={[styles.text, { marginTop: 4 }]}>NIP: {offer.client.nip}</Text>
                        </View>
                        <View style={styles.colRight}>
                            <Text style={styles.label}>Ważność Oferty</Text>
                            <Text style={[styles.textBold, { marginBottom: 15 }]}>{offer.validUntil}</Text>

                            {(offer.client.contactPerson || offer.client.phone || offer.client.email) && (
                                <View style={{ alignItems: 'flex-end', width: '100%' }}>
                                    <Text style={[styles.label, { textAlign: 'right' }]}>Osoba Kontaktowa</Text>
                                    {offer.client.contactPerson ? <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#001F3F', textAlign: 'right' }}>{offer.client.contactPerson}</Text> : null}
                                    {offer.client.phone ? <Text style={{ fontSize: 8, color: '#64748B', textAlign: 'right' }}>{offer.client.phone}</Text> : null}
                                    {offer.client.email ? <Text style={{ fontSize: 8, color: '#64748B', textAlign: 'right' }}>{offer.client.email}</Text> : null}
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Table */}
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderCell, styles.colName]}>Produkt</Text>
                            <Text style={[styles.tableHeaderCell, styles.colQty]}>Ilość</Text>
                            <Text style={[styles.tableHeaderCell, styles.colPrice]}>Cena Netto</Text>
                            <Text style={[styles.tableHeaderCell, styles.colDisc]}>Rabat</Text>
                            <Text style={[styles.tableHeaderCell, styles.colTotal]}>Wartość</Text>
                        </View>
                        {offer.products.map((p, i) => (
                            <View key={i} style={styles.tableRow}>
                                <View style={styles.colName}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#001F3F' }}>{p.name}</Text>
                                    <Text style={{ fontSize: 8, color: '#64748B' }}>{p.description}</Text>
                                </View>
                                <Text style={[styles.text, styles.colQty]}>{p.quantity}</Text>
                                <Text style={[styles.text, styles.colPrice]}>{p.price.toFixed(2)}</Text>
                                <Text style={[styles.text, styles.colDisc]}>{p.discount > 0 ? `-${p.discount}%` : '-'}</Text>
                                <Text style={[styles.textBold, styles.colTotal]}>{calculateLineTotal(p).toFixed(2)}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Totals */}
                    <View style={{ marginTop: 20, alignItems: 'flex-end' }}>
                        <View style={{ width: '50%', padding: 10, backgroundColor: '#F8FAFC', borderRadius: 4 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                <Text style={styles.text}>Suma Netto:</Text>
                                <Text style={styles.textBold}>{totalNet.toFixed(2)} PLN</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Text style={styles.text}>VAT (23%):</Text>
                                <Text style={styles.textBold}>{vat.toFixed(2)} PLN</Text>
                            </View>
                            <View style={{ borderTopWidth: 1, borderColor: '#E2E8F0', paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Do Zapłaty:</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'black', color: '#00A8E8' }}>{totalGross.toFixed(2)} PLN</Text>
                            </View>
                        </View>
                    </View>

                </View>

                {/* Footer - Updated Layout */}
                <View style={styles.footer}>
                    {/* Left: Static Company Data */}
                    <View style={styles.footerCol}>
                        <Text style={styles.footerLabel}>Dane Firmy</Text>
                        <Text style={[styles.footerText, { fontWeight: 'bold', color: 'white' }]}>ORAPI TRANSNET Sp. z o.o.</Text>
                        <Text style={styles.footerText}>ul. Domaniewska 37</Text>
                        <Text style={styles.footerText}>02-672 Warszawa</Text>
                        <Text style={styles.footerText}>NIP: 521-36-33-471</Text>
                        <Text style={[styles.footerText, { color: '#00A8E8', marginTop: 2 }]}>www.orapi-transnet.pl</Text>
                    </View>

                    {/* Right: Dynamic Sales Rep */}
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.footerLabel}>Opiekun Handlowy</Text>
                        <Text style={styles.footerName}>{offer.salesRep.name}</Text>
                        <Text style={styles.footerContact}>{offer.salesRep.phone}</Text>
                        <Text style={styles.footerContact}>{offer.salesRep.email}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
