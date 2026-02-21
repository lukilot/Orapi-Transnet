import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image, Svg, Path, Circle } from '@react-pdf/renderer';
import { OfferData, Product } from '@/lib/types';

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
        padding: 24,
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'flex-end',
        height: 50,
    },
    logoImage: {
        width: 150,
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
    heroSection: {
        height: 280,
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        marginBottom: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    heroBgContainer: {
        position: 'absolute',
        top: -50,
        left: 0,
        right: 0,
        bottom: -50,
    },
    heroBgOverlay: {
        position: 'absolute',
        top: -50,
        left: 0,
        right: 0,
        bottom: -50,
        backgroundColor: '#F1F5F9E6', // Mimics 0.9 opacity overlay over the background
    },
    heroBgImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: 'rotate(-6deg) scale(1.2)'
    },
    heroProductImageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroProductImage: {
        width: 260,
        height: 260,
        objectFit: 'contain',
    },
    overlayLeft: {
        position: 'absolute',
        bottom: 20,
        left: 20,
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
    overlayLeftAttributes: {
        position: 'absolute',
        top: 25,
        left: 20,
        alignItems: 'flex-start',
    },
    overlayRightAttributes: {
        position: 'absolute',
        top: 25,
        right: 20,
        alignItems: 'flex-end',
    },
    attributePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 99,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#F8FAFC', // very subtle white/gray to prevent buggy rgba borders
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
    },
    iconCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSymbol: {
        fontSize: 7,
        fontWeight: 'bold',
    },
    overlayRightPrice: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'flex-end',
    },
    priceOld: {
        fontSize: 10,
        color: '#9CA3AF',
        textDecoration: 'line-through',
        marginBottom: 2,
        fontWeight: 'bold'
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
        color: '#9CA3AF',
        marginLeft: 4,
    },
    priceBrutto: {
        fontSize: 8,
        color: '#9CA3AF',
        marginTop: 2,
        fontWeight: 'bold',
    },
    clientSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    colLeft: { width: '50%' },
    colRight: { width: '40%', alignItems: 'flex-end' },
    label: { fontSize: 8, color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 4 },
    text: { fontSize: 10, color: '#475569', marginBottom: 2 },
    textBold: { fontSize: 12, color: '#001F3F', fontWeight: 'bold', marginBottom: 2 },
    table: { width: '100%', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' },
    tableHeader: { flexDirection: 'row', backgroundColor: '#001F3F', paddingVertical: 4, paddingHorizontal: 6 },
    tableHeaderCell: { color: '#FFFFFF', fontSize: 7, fontWeight: 'bold', textTransform: 'uppercase' },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingVertical: 4, paddingHorizontal: 6, alignItems: 'center' },
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
    },
    footerCol: { flexDirection: 'column' },
    footerLabel: { fontSize: 8, fontWeight: 'bold', color: 'white', textTransform: 'uppercase', marginBottom: 4 },
    footerText: { fontSize: 10, color: '#CBD5E1', marginBottom: 2 },
    footerName: { fontSize: 14, fontWeight: 'bold', color: 'white', marginBottom: 4 },
    footerContact: { fontSize: 10, color: '#CBD5E1', flexDirection: 'row', alignItems: 'center', marginBottom: 2, textAlign: 'right' },
    pageNumber: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 8,
        color: '#9CA3AF',
    },
    paymentBox: {
        marginTop: 6,
        padding: 8,
        backgroundColor: '#F8FAFC',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    warningBox: {
        marginTop: 6,
        padding: 6,
        backgroundColor: '#FEF2F2',
        borderWidth: 1,
        borderColor: '#FECACA',
        borderRadius: 4,
    },
    warningText: {
        color: '#B91C1C',
        fontSize: 9,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

const getPDFFeatureStyle = (feature: string) => {
    switch (feature) {
        case "produkt kwasowy": return { label: feature, icon: "FlaskConical", color: "#EF4444", bg: "#FEF2F2" }; // red
        case "produkt zasadowy": return { label: feature, icon: "Droplet", color: "#3B82F6", bg: "#EFF6FF" }; // blue
        case "wysokie PH": return { label: feature, icon: "AlertTriangle", color: "#A855F7", bg: "#FAF5FF" }; // purple
        case "niskie PH": return { label: feature, icon: "AlertTriangle", color: "#F97316", bg: "#FFF7ED" }; // orange
        case "produkt silnie pieniący": return { label: feature, icon: "Wind", color: "#06B6D4", bg: "#ECFEFF" }; // cyan
        case "produkt nie pieniący": return { label: feature, icon: "Droplets", color: "#6B7280", bg: "#F9FAFB" }; // gray
        case "bezpieczeństwo": return { label: feature, icon: "Shield", color: "#22C55E", bg: "#F0FDF4" }; // green
        case "ekologiczny": return { label: feature, icon: "Leaf", color: "#16A34A", bg: "#F0FDF4" }; // green-600
        case "certyfikat ECO CERT": return { label: feature, icon: "CheckCircle2", color: "#10B981", bg: "#ECFDF5" }; // emerald
        case "certyfikat NSF": return { label: feature, icon: "CheckCircle2", color: "#2563EB", bg: "#EFF6FF" }; // blue-600
        case "jakość spożywcza": return { label: feature, icon: "Apple", color: "#F87171", bg: "#FEF2F2" }; // red-400
        case "niwelowanie zapachów": return { label: feature, icon: "Sparkles", color: "#818CF8", bg: "#EEF2FF" }; // indigo
        case "wysoka wydajność": return { label: feature, icon: "Zap", color: "#EAB308", bg: "#FEFCE8" }; // yellow
        case "może wyschnąć": return { label: feature, icon: "Sun", color: "#FB923C", bg: "#FFF7ED" }; // orange-400
        case "do mycia ręcznego": return { label: feature, icon: "Hand", color: "#60A5FA", bg: "#EFF6FF" }; // blue-400
        case "do mycia automatycznego": return { label: feature, icon: "Factory", color: "#64748B", bg: "#F8FAFC" }; // slate
        default: return { label: feature, icon: "CheckCircle2", color: "#00A8E8", bg: "#EFF6FF" };
    }
}

const PdfIcon = ({ name, color }: { name: string, color: string }) => {
    let elements = null;
    switch (name) {
        case 'FlaskConical': elements = <>
            <Path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
            <Path d="M6.453 15h11.094" />
            <Path d="M8.5 2h7" />
        </>; break;
        case 'Droplet': elements = <Path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />; break;
        case 'AlertTriangle': elements = <>
            <Path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <Path d="M12 9v4" />
            <Path d="M12 17h.01" />
        </>; break;
        case 'Wind': elements = <>
            <Path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
            <Path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
            <Path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
        </>; break;
        case 'Droplets': elements = <>
            <Path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
            <Path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
        </>; break;
        case 'Shield': elements = <Path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />; break;
        case 'Leaf': elements = <>
            <Path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <Path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </>; break;
        case 'Apple': elements = <>
            <Path d="M12 6.528V3a1 1 0 0 1 1-1h0" />
            <Path d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21" />
        </>; break;
        case 'Sparkles': elements = <>
            <Path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <Path d="M20 2v4" />
            <Path d="M22 4h-4" />
        </>; break;
        case 'Zap': elements = <Path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />; break;
        case 'Sun': elements = <>
            <Path d="M12 2v2" /><Path d="M12 20v2" />
            <Path d="m4.93 4.93 1.41 1.41" /><Path d="m17.66 17.66 1.41 1.41" />
            <Path d="M2 12h2" /><Path d="M20 12h2" />
            <Path d="m6.34 17.66-1.41 1.41" /><Path d="m19.07 4.93-1.41 1.41" />
            <Circle cx="12" cy="12" r="4" />
        </>; break;
        case 'Hand': elements = <>
            <Path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
            <Path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
            <Path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
            <Path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
        </>; break;
        case 'Factory': elements = <>
            <Path d="M12 16h.01" /><Path d="M16 16h.01" /><Path d="M8 16h.01" />
            <Path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
        </>; break;
        case 'CheckCircle2':
        default:
            elements = <>
                <Path d="m9 12 2 2 4-4" />
                <Circle cx="12" cy="12" r="10" />
            </>;
    }
    return (
        <Svg viewBox="0 0 24 24" width="10" height="10" style={{ color }} stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {elements}
        </Svg>
    );
};

interface OfferDocumentProps {
    offer: OfferData;
}

// Extract components outside to prevent "Cannot create components during render" error
const DocumentHeader = ({ offer }: { offer: OfferData }) => (
    <View style={styles.header}>
        <View>
            <Image src="/assets/transnet-logo.png" style={styles.logoImage} />
        </View>
        <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.metaLabel}>Numer Oferty</Text>
            <Text style={styles.metaValue}>{offer.id}</Text>
            <Text style={[styles.metaLabel, { marginTop: 4 }]}>Data: {offer.date}</Text>
        </View>
    </View>
);

const DocumentFooter = ({ salesRep }: { salesRep: OfferData['salesRep'] }) => (
    <View style={styles.footer}>
        <View style={styles.footerCol}>
            <Text style={styles.footerLabel}>Wyłączny importer produktów Transnet:</Text>
            <Text style={[styles.footerText, { fontWeight: 'bold', color: 'white' }]}>Pol-Frans Jacek Rybiński</Text>
            <Text style={styles.footerText}>ul. 1 Praskiego Pułku WP 66</Text>
            <Text style={styles.footerText}>05-075 Warszawa</Text>
            <Text style={styles.footerText}>NIP: 5211223886</Text>
            <Text style={[styles.footerText, { color: '#00A8E8', marginTop: 2 }]}>www.orapi-transnet.pl</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.footerLabel}>Opiekun Handlowy</Text>
            <Text style={styles.footerName}>{salesRep.name}</Text>
            <Text style={styles.footerContact}>{salesRep.phone}</Text>
            <Text style={styles.footerContact}>{salesRep.email}</Text>
        </View>
    </View>
);

export default function OfferDocument({ offer }: OfferDocumentProps) {
    const calculateLineTotal = (p: Product) => p.price * p.quantity * (1 - p.discount / 100);
    const totalNet = offer.products.reduce((sum, p) => sum + calculateLineTotal(p), 0);
    const vat = totalNet * 0.23;
    const totalGross = totalNet + vat;

    const BackgroundAsset = {
        TRUCKS: '/assets/trucks_blueprint_1771011586814.png',
        MARITIME: '/assets/maritime_blueprint_1771011600481.png',
        INDUSTRY: '/assets/industry_blueprint_1771011615007.png',
        AGRICULTURE: '/assets/agriculture_blueprint_1771011629016.png',
        CONSTRUCTION: '/assets/construction_blueprint_1771011642958.png',
    }[offer.industry];

    const products = offer.products.length > 0 ? offer.products : [{
        id: 'placeholder',
        name: "Wybierz Produkt",
        specs: { temp: 0, dilution: "-", isEco: false, ph: 7 },
        features: [],
        price: 0,
        discount: 0,
        quantity: 0,
        image: undefined,
        code: undefined,
        description: ''
    } as unknown as Product];

    const totalPages = products.length + 1; // 1 page per product + 1 summary page

    const renderFeaturePill = (feature: string) => {
        const style = getPDFFeatureStyle(feature);
        return (
            <View key={feature} style={styles.attributePill}>
                <View style={[styles.iconCircle, { backgroundColor: style.bg }]}>
                    <PdfIcon name={style.icon} color={style.color} />
                </View>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#001F3F' }}>
                    {style.label}
                </Text>
            </View>
        );
    };

    return (
        <Document>
            {/* Cover Page */}
            <Page size="A4" style={{ backgroundColor: '#001F3F', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15 }}>
                    <Image src={BackgroundAsset} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.5) rotate(-5deg)' }} />
                </View>

                {/* White Top Bar for Logo */}
                <View style={{ backgroundColor: 'white', paddingVertical: 40, paddingHorizontal: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 4, borderColor: '#00A8E8', zIndex: 10 }}>
                    <Image src="/assets/transnet-logo.png" style={{ width: 160 }} />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 50, zIndex: 10 }}>
                    <View style={{ borderLeftWidth: 4, borderColor: '#00A8E8', paddingLeft: 24, paddingVertical: 8 }}>
                        <Text style={{ fontFamily: 'Roboto', color: '#00A8E8', fontSize: 16, fontWeight: 'bold', marginBottom: 12, letterSpacing: 3, textTransform: 'uppercase' }}>OFERTA HANDLOWA DLA</Text>
                        <Text style={{ fontFamily: 'Roboto', color: 'white', fontSize: 32, fontWeight: 'black', lineHeight: 1.2 }}>
                            {offer.client.companyName || 'Szanownego Klienta'}
                        </Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 50, paddingBottom: 50, zIndex: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.2)', paddingTop: 24 }}>
                        <View>
                            <Text style={{ fontFamily: 'Roboto', color: 'rgba(255,255,255,0.6)', fontSize: 10, marginBottom: 6, fontWeight: 'bold', letterSpacing: 1 }}>DATA SPORZĄDZENIA</Text>
                            <Text style={{ fontFamily: 'Roboto', color: 'white', fontSize: 14, fontWeight: 'bold' }}>{offer.date}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontFamily: 'Roboto', color: 'rgba(255,255,255,0.6)', fontSize: 10, marginBottom: 6, fontWeight: 'bold', letterSpacing: 1 }}>WAŻNA DO</Text>
                            <Text style={{ fontFamily: 'Roboto', color: 'white', fontSize: 14, fontWeight: 'bold' }}>{offer.validUntil}</Text>
                        </View>
                    </View>
                </View>
            </Page>

            {products.map((heroProduct, index) => {
                const nettoPrice = heroProduct.price * (1 - ((heroProduct.discount || 0) / 100));
                const bruttoPrice = nettoPrice * 1.23;
                const features = heroProduct.features || [];

                return (
                    <Page key={`product-page-${index}`} size="A4" style={styles.page}>
                        <View style={styles.container}>
                            <DocumentHeader offer={offer} />

                            <View style={styles.heroSection}>
                                <View style={styles.heroBgContainer}>
                                    <Image src={BackgroundAsset} style={styles.heroBgImage} />
                                    <View style={styles.heroBgOverlay} />
                                </View>

                                {heroProduct.image && (
                                    <View style={styles.heroProductImageContainer}>
                                        <Image src={heroProduct.image} style={styles.heroProductImage} />
                                    </View>
                                )}

                                {/* Pills Left */}
                                <View style={styles.overlayLeftAttributes}>
                                    {features.slice(0, 2).map((feature: string) => renderFeaturePill(feature))}
                                </View>

                                {/* Pills Right */}
                                <View style={styles.overlayRightAttributes}>
                                    {features.slice(2, 4).map((feature: string) => renderFeaturePill(feature))}
                                </View>

                                {/* Title (Left) */}
                                <View style={styles.overlayLeft}>
                                    <Text style={styles.productTitle}>{heroProduct.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {heroProduct.category && (
                                            <Text style={{ fontSize: 10, color: '#00A8E8', fontWeight: 'bold' }}>{heroProduct.category}</Text>
                                        )}
                                        {heroProduct.code && <Text style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 8, fontWeight: 'bold' }}>{heroProduct.code}</Text>}
                                    </View>
                                </View>

                                {/* Price (Right Bottom) */}
                                <View style={styles.overlayRightPrice}>
                                    {heroProduct.discount > 0 && (
                                        <Text style={styles.priceOld}>{heroProduct.price.toFixed(2)} PLN</Text>
                                    )}
                                    <View style={styles.priceNetto}>
                                        <Text style={styles.priceValue}>{nettoPrice.toFixed(2)}</Text>
                                        <Text style={styles.priceLabel}>PLN <Text style={{ color: '#00A8E8' }}>NETTO</Text></Text>
                                    </View>
                                    <Text style={styles.priceBrutto}>{bruttoPrice.toFixed(2)} PLN Brutto</Text>
                                </View>
                            </View>

                            {/* Individual Product Table */}
                            <View style={{ marginTop: 10 }}>
                                <View style={styles.table}>
                                    <View style={styles.tableHeader}>
                                        <Text style={[styles.tableHeaderCell, styles.colName]}>Produkt</Text>
                                        <Text style={[styles.tableHeaderCell, styles.colQty]}>Ilość</Text>
                                        <Text style={[styles.tableHeaderCell, styles.colPrice]}>Cena Netto</Text>
                                        {heroProduct.discount > 0 && <Text style={[styles.tableHeaderCell, styles.colDisc]}>Rabat</Text>}
                                        <Text style={[styles.tableHeaderCell, styles.colTotal]}>Wartość</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={styles.colName}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#001F3F' }}>{heroProduct.name}</Text>
                                                {heroProduct.selectedVariant && (
                                                    <View style={{ backgroundColor: '#EFF6FF', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 8, marginLeft: 6 }}>
                                                        <Text style={{ fontSize: 6, fontWeight: 'bold', color: '#00A8E8', textTransform: 'uppercase' }}>
                                                            {heroProduct.selectedVariant}
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                            {heroProduct.category && <Text style={{ fontSize: 7, color: '#64748B', marginTop: 2 }}>{heroProduct.category}</Text>}
                                        </View>
                                        <Text style={[styles.text, styles.colQty]}>{heroProduct.quantity}</Text>
                                        <Text style={[styles.text, styles.colPrice]}>{heroProduct.price.toFixed(2)}</Text>
                                        {heroProduct.discount > 0 && <Text style={[styles.text, styles.colDisc]}>-{heroProduct.discount}%</Text>}
                                        <Text style={[styles.textBold, styles.colTotal]}>{calculateLineTotal(heroProduct).toFixed(2)}</Text>
                                    </View>
                                </View>
                                {heroProduct.description && (
                                    <View style={{ marginTop: 15, padding: 10, backgroundColor: '#F8FAFC', borderRadius: 4 }}>
                                        <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 4 }}>Opis Produktu</Text>
                                        <Text style={{ fontSize: 9, color: '#475569', lineHeight: 1.4 }}>{heroProduct.description}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                        <DocumentFooter salesRep={offer.salesRep} />
                        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Strona ${pageNumber - 1} z ${totalPages - 1}`} fixed />
                    </Page>
                );
            })}

            {/* Summary Page */}
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <DocumentHeader offer={offer} />

                    {/* Client Section */}
                    <View style={styles.clientSection}>
                        <View style={styles.colLeft}>
                            <Text style={styles.label}>Nabywca</Text>
                            <Text style={[styles.textBold, { fontSize: 14 }]}>{offer.client.companyName || '---'}</Text>
                            <Text style={styles.text}>{offer.client.street ? `${offer.client.street} ${offer.client.number}` : '---'}</Text>
                            <Text style={styles.text}>{(offer.client.zip || offer.client.city) ? `${offer.client.zip} ${offer.client.city}` : ''}</Text>
                            <Text style={[styles.text, { marginTop: 4 }]}>NIP: {offer.client.nip || '---'}</Text>
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
                            {offer.products.some(p => p.discount > 0) && <Text style={[styles.tableHeaderCell, styles.colDisc]}>Rabat</Text>}
                            <Text style={[styles.tableHeaderCell, styles.colTotal]}>Wartość</Text>
                        </View>
                        {offer.products.map((p, i) => (
                            <View key={i} style={styles.tableRow}>
                                <View style={styles.colName}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#001F3F' }}>{p.name}</Text>
                                        {p.selectedVariant && (
                                            <View style={{ backgroundColor: '#EFF6FF', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 8, marginLeft: 6 }}>
                                                <Text style={{ fontSize: 6, fontWeight: 'bold', color: '#00A8E8', textTransform: 'uppercase' }}>
                                                    {p.selectedVariant}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                    {p.category && <Text style={{ fontSize: 7, color: '#64748B', marginTop: 2 }}>{p.category}</Text>}
                                </View>
                                <Text style={[styles.text, styles.colQty]}>{p.quantity}</Text>
                                <Text style={[styles.text, styles.colPrice]}>{p.price.toFixed(2)}</Text>
                                {offer.products.some(prod => prod.discount > 0) && (
                                    <Text style={[styles.text, styles.colDisc]}>{p.discount > 0 ? `-${p.discount}%` : '-'}</Text>
                                )}
                                <Text style={[styles.textBold, styles.colTotal]}>{calculateLineTotal(p).toFixed(2)}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Payment, Warnings and Totals Side-by-Side */}
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* Left Side: Payment & Warnings */}
                        <View style={{ width: '48%' }}>
                            <View style={[styles.paymentBox, { marginTop: 0 }]}>
                                <View>
                                    <Text style={styles.label}>Sposób Płatności</Text>
                                    <Text style={styles.textBold}>{offer.paymentMethod || "Przelew"}</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={[styles.label, { textAlign: 'right' }]}>Termin</Text>
                                    <Text style={[styles.textBold, { textAlign: 'right' }]}>{offer.paymentTerm || "14 dni"}</Text>
                                </View>
                            </View>

                            {totalNet < 1000 && (
                                <View style={[styles.warningBox, { marginTop: 6, width: '100%' }]}>
                                    <Text style={styles.warningText}>
                                        Zamówienie poniżej minimum! Brakuje {(1000 - totalNet).toFixed(2)} PLN netto.
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Right Side: Totals */}
                        <View style={{ width: '48%', padding: 8, backgroundColor: '#F8FAFC', borderRadius: 4 }}>
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
                <DocumentFooter salesRep={offer.salesRep} />
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Strona ${pageNumber - 1} z ${totalPages - 1}`} fixed />
            </Page>
        </Document>
    );
}
