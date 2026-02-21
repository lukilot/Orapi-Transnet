import json

data = [
  {
    "name": "SUPERBOX PO",
    "category": "Zasadowy proszek do mycia karoserii",
    "description": "Skutecznie usuwa wszelkie zanieczyszczenia i zapobiega tworzeniu się kamienia na urządzeniach. Dzięki swojemu składowi umożliwia wytworzenie kontrolowanej piany zarówno w gorącej, jak i w ciepłej wodzie.",
    "variants": [
      { "capacity": "25 kg", "price_net": 257 }
    ]
  },
  {
    "name": "SUPERCREAM",
    "category": "Szampon do mycia karoserii",
    "description": "Intensywnie myjący, skoncentrowany produkt do mycia karoserii pojazdów. Wyjątkowo skuteczny, mocno pieniący się. Idealny do usuwania najtrudniejszych zabrudzeń, przywraca blask czyszczonej powierzchni.",
    "variants": [
      { "capacity": "25 kg", "price_net": 410 }
    ]
  },
  {
    "name": "SUPERFOAM ACTIVE",
    "category": "Piana aktywna",
    "description": None,
    "variants": [
      { "capacity": "25 kg", "price_net": 520 }
    ]
  },
  {
    "name": "SHINE DIAMANT",
    "category": "Wosk nabłyszczająco-osuszający",
    "description": "Wysokiej jakości wosk przeznaczony zarówno do samochodów osobowych, jak i ciężarowych. Silnie skoncentrowany, uszczelniający powierzchnię i chroniący ją wosk. Nie zawiera silikonu, rozpuszczalników na bazie węglowodoru czy olejów mineralnych. Nadaje długotrwały blask i połysk.",
    "variants": [
      { "capacity": "22 kg", "price_net": 640 }
    ]
  },
  {
    "name": "TRANSNET MECA-SUP",
    "category": "Pieniący się odtłuszczacz do części mechanicznych",
    "description": "Skoncentrowany, pieniący się, zasadowy środek do usuwania sadzy, osadów po spalaniu itp. Przeznaczony do części mechanicznych, podwozi, karoserii plandek. Może być stosowany na gorąco.",
    "variants": [
      { "capacity": "25 kg", "price_net": 450 }
    ]
  },
  {
    "name": "OXYD-TN05090",
    "category": "Kwasowy renowator do usuwania rdzy",
    "description": "Środek czyszczący na bazie kwasu, usuwający rdzę i kamień. Produkt pieniący się, skutecznie czyści kontenery kolejowe i drogowe oraz posadzki w chłodniach. Przeznaczony do aluminium: felg, szyn, cystern itp. Odpowiedni również do stali ocynkowanej i usuwania zabrudzeń cementowych.",
    "variants": [
      { "capacity": "25 kg", "price_net": 600 }
    ]
  },
  {
    "name": "TRANSNET FOAM",
    "category": "Piana do mycia karoserii",
    "description": "Mocno skoncentrowany szampon o właściwościach antystatycznych. Zrównoważona kombinacja różnych środków powierzchniowo czynnych pozwala na generowanie kontrolowanej piany. Zapobiega osadzaniu się kamienia na urządzeniach. Charakteryzuje się doskonałą spłukiwalnością przy minimalnej ilości zimnej lub ciepłej wody. Przeznaczony do czyszczenia karoserii pojazdów, szczególnie skuteczny w usuwaniu owadów, śladów węglowodorów i innych zanieczyszczeń.",
    "variants": [
      { "capacity": "26 kg", "price_net": 660 }
    ]
  },
  {
    "name": "PULVE 8",
    "category": "Profesjonalny opryskiwacz",
    "description": "Profesjonalny opryskiwacz PULVE LASER specjalnie przystosowany do pracy z kwasami, wykonany z polipropylenu. Może być także wykorzystywany do aplikacji środków owadobójczych, myjących, przeznaczonych do usuwania zanieczyszczeń z maszyn budowlanych i pojazdów przemysłowych.",
    "variants": [
      { "capacity": "8 l", "price_net": 900 }
    ]
  },
  {
    "name": "PERLE",
    "category": "Wysokiej jakości środek osuszający",
    "description": "Wysokiej jakości środek osuszający do stosowania na samochodach osobowych, ciężarowych, jak i w pojazdach transportu publicznego. Mocno skoncentrowany, zabezpiecza przed wodą. Nie zawiera silikonu i nie wymaga spłukiwania po umyciu. Tworzy na powierzchni niewidoczny hydrofobowy film, który odpycha cząsteczki wody. Pozwala uniknąć powstawania białych śladów i osadzania się kropelek wody oraz optymalizuje proces mycia i osuszania.",
    "variants": [
      { "capacity": "25 kg", "price_net": 520 }
    ]
  },
  {
    "name": "C SUPER",
    "category": "Szampon o wzmocnionym działaniu",
    "description": "Skoncentrowany szampon o właściwościach antystatycznych. Skuteczny w usuwaniu smarów i owadów. Działa dobrze nawet bez szorowania. Usuwa film drogowy. Przeznaczony do myjni portalowych, pianownic, itp.",
    "variants": [
      { "capacity": "5 kg", "price_net": 145 },
      { "capacity": "25 kg", "price_net": 600 },
      { "capacity": "240 kg", "price_net": 4900 },
      { "capacity": "1150 kg", "price_net": 15000 }
    ]
  },
  {
    "name": "C NATURE",
    "category": "Szampon z certyfikatem ECOCERT, neutralne pH",
    "description": "Skoncentrowany szampon do samochodów, opracowany na bazie odnawialnych składników, pozyskanych w sposób przyjazny dla środowiska. W pełni spełnia wymagania określone przez ECOCERT.",
    "variants": [
      { "capacity": "25 kg", "price_net": 620 },
      { "capacity": "210 kg", "price_net": 5160 }
    ]
  },
  {
    "name": "FROZEN",
    "category": "Szampon do stosowania w niskich temperaturach",
    "description": "Mocny, pieniący się szampon do mycia samochodów ciężarowych, zadaniowych itp. Skutecznie usuwa ślady węglowodorów, smarów, ziemi i soli. Dzięki połączeniu czynników maskujących, soli mineralnych i środków powierzchniowo czynnych, można go stosować aż do temperatury -20°C.",
    "variants": [
      { "capacity": "25 kg", "price_net": 420 },
      { "capacity": "240 kg", "price_net": 3900 }
    ]
  },
  {
    "name": "IRIDIUM",
    "category": "Mocny szampon myjący",
    "description": "Mocno skoncentrowany szampon samochodowy dla profesjonalistów. Wyjątkowa formuła, która łatwo usuwa film drogowy i różne plamy (owady, smary, olej itp.). Dzięki specjalnej formule, działa bardzo szybko na karoserii, a także na plandekach, przyczepach ciężarówek, maszynach budowlanych, transporcie publicznym itp.",
    "variants": [
      { "capacity": "20 kg", "price_net": 400 },
      { "capacity": "200 kg", "price_net": 3700 }
    ]
  },
  {
    "name": "PLATINIUM",
    "category": "Szampon klasy premium",
    "description": "Szampon do karoserii o wzmocnionych właściwościach myjących. Wszechstronny – może być stosowany w myjniach portalowych lub samoobsługowych. Skutecznie usuwa film drogowy i różne zabrudzenia. Szybko działa na karoserii, a także na plandekach, przyczepach, środkach transportu publicznego, itp. Łatwo się spłukuje. Biodegradowalność i optymalne bezpieczeństwo.",
    "variants": [
      { "capacity": "220 kg", "price_net": 4500 }
    ]
  },
  {
    "name": "TRANSNET MECA-D",
    "category": "Niepieniący się odtłuszczacz do części mechanicznych",
    "description": "Mocny środek czyszczący i odtłuszczający, może być stosowany na gorąco. Niepieniący się, przemysłowy preparat alkaliczny do warsztatów. Skuteczny na tłustych podłogach, częściach mechanicznych, silnikach wyjętych z obudowy, a także do czyszczenia felg.",
    "variants": [
      { "capacity": "25 kg", "price_net": 600 }
    ]
  },
  {
    "name": "TRUCK R",
    "category": "Szampon do stosowania w niskich temperaturach",
    "description": "Mocny, pieniący się szampon do mycia samochodów ciężarowych. Przeznaczony do stosowania w okresie zimowym, usuwa smary oraz wszelkie zanieczyszczenia powstałe podczas jazdy. Świetnie sprawdza się jako odtłuszczacz do mycia plandek, kontenerów, maszyn rolniczych.",
    "variants": [
      { "capacity": "25 kg", "price_net": 480 },
      { "capacity": "250 kg", "price_net": 3600 }
    ]
  },
  {
    "name": "S+",
    "category": "Szampon zapachowy",
    "description": "Szampon nowej generacji do wszystkich pojazdów. Usuwa brud drogowy, pozostawiając błyszczący film na karoserii pojazdu.",
    "variants": [
      { "capacity": "25 kg", "price_net": 422 }
    ]
  },
  {
    "name": "B",
    "category": "Środek do usuwania betonu",
    "description": "Silnie stężony produkt do usuwania betonu na bazie mieszanki silnych kwasów. Specjalnie opracowany do stosowania jako produkt czyszczący w zakładach produkcji betonu. Usuwa kamień, zaczyn cementowy i osady z kamienia na urządzeniach myjących czy pojazdach.",
    "variants": [
      { "capacity": "25 kg", "price_net": 350 },
      { "capacity": "240 kg", "price_net": 3000 }
    ]
  },
  {
    "name": "HT2002 P+",
    "category": "Skoncentrowany produkt do usuwania kamienia",
    "description": "Ultraskoncentrowany renowator kwasowy, gotowy do użycia. Czyści sprzęt zabrudzony wapnem, kredą, cementem, żużlem itp. Odpowiedni do niskiego i wysokiego ciśnienia.",
    "variants": [
      { "capacity": "25 kg", "price_net": 320 }
    ]
  },
  {
    "name": "DEG 3",
    "category": "Produkt do usuwania smoły",
    "description": "Przeznaczony do silników i części mechanicznych rozpuszczalnik w formie emulsji do usuwania smoły. Zawartość składników powierzchniowo-czynnych sprawia, że preparat ten jest wyjątkowo skuteczny w walce z osadami smaru i zabrudzeniami ropą.",
    "variants": [
      { "capacity": "20 kg", "price_net": 720 }
    ]
  },
  {
    "name": "ANTICOLBIO F",
    "category": "Chemia specjalistyczna",
    "description": None,
    "variants": [
      { "capacity": "20 l", "price_net": 704 }
    ]
  },
  {
    "name": "DEBIO BIO",
    "category": "Chemia specjalistyczna",
    "description": None,
    "variants": [
      { "capacity": "30 l", "price_net": 1659 }
    ]
  },
  {
    "name": "AF",
    "category": "Niskopieniący odtłuszczacz z jakością spożywczą",
    "description": "Bardzo silny alkaliczny odtłuszczacz do czyszczenia wnętrz ciężarówek i cystern spożywczych. Niskopieniący się detergent o wysokiej zwilżalności, odpowiedni do czyszczenia zbiorników i usuwania olejów, takich jak rzepakowy, palmowy, słonecznikowy.",
    "variants": [
      { "capacity": "25 kg", "price_net": 275 }
    ]
  },
  {
    "name": "NEUTRALODOR",
    "category": "Środek do usuwania zapachów",
    "description": "Bardzo skoncentrowany środek do usuwania zapachów. Do stosowania w wnętrzach chłodni samochodów, cystern spożywczych, kontenerów na śmieci, przechowywania materiałów gnijących, oczyszczalniach ścieków itp. Nie pozostawia zapachu po użyciu.",
    "variants": [
      { "capacity": "24 kg", "price_net": 1400 }
    ]
  },
  {
    "name": "OD",
    "category": "Środek do usuwania zapachów",
    "description": "Bardzo skoncentrowany środek do usuwania zapachów. Do stosowania w wnętrzach chłodni samochodów, cystern spożywczych, kontenerów na śmieci, przechowywania materiałów gnijących, oczyszczalniach ścieków itp. Nie pozostawia zapachu po użyciu.",
    "variants": [
      { "capacity": "4 kg", "price_net": 274 }
    ]
  },
  {
    "name": "VITRE",
    "category": "Środek do szkła i tworzyw sztucznych",
    "description": "Środek czyszcząco-odtłuszczający do powierzchni szklanych i tworzyw sztucznych. Nie powoduje korozji czyszczonej powierzchni, nie pozostawia śladów ani zacieków po zastosowaniu. Produkt można stosować na powierzchniach mających kontakt z żywnością.",
    "variants": [
      { "capacity": "5 kg", "price_net": 95 }
    ]
  },
  {
    "name": "TS 3274",
    "category": "Przemysłowy detergent do podłóg",
    "description": "Odtłuszczający, niepieniący się detergent na bazie naturalnych rozpuszczalników. Przeznaczony do podłóg betonowych, żywicznych, asfaltowych oraz kafelków podłogowych. Usuwa ślady kół pozostawione przez wózki widłowe itp. Pozostawia długotrwały zapach.",
    "variants": [
      { "capacity": "5 kg", "price_net": 130 },
      { "capacity": "24 kg", "price_net": 500 }
    ]
  },
  {
    "name": "TS",
    "category": "Przemysłowy detergent do podłóg",
    "description": "Odtłuszczający, niepieniący się detergent na bazie rozpuszczalników. Przeznaczony do podłóg betonowych, żywicznych, asfaltowych oraz kafelków podłogowych. Usuwa ślady kół pozostawione przez wózki widłowe itp. Pozostawia długotrwały zapach.",
    "variants": [
      { "capacity": "5 kg", "price_net": 97 }
    ]
  },
  {
    "name": "Pompa dozująca Translav CAR PRO / ACID",
    "category": "Urządzenia",
    "description": "Translav CAR PRO jest urządzeniem pozwalającym na rozpylenie i natryskiwanie uprzednio przygotowanego produktu na powierzchnie przeznaczone do mycia. Translav jest wyposażony w wąż, lancę oraz dysze dozujące, niezbędne do prawidłowego działania sprzętu.",
    "variants": [
      { "capacity": "1 szt.", "price_net": 1550 }
    ]
  }
]

out = "export const MOCK_PRODUCTS: Product[] = [\n"
for i, p in enumerate(data):
    features = []
    cat = p["category"].lower()
    if "zasad" in cat: features.append("produkt zasadowy")
    if "kwas" in cat: features.append("produkt kwasowy")
    if "pieniący" in cat or "piana" in cat: features.append("produkt silnie pieniący")
    if "niepieniący" in cat:
        if "produkt silnie pieniący" in features: features.remove("produkt silnie pieniący")
        features.append("produkt nie pieniący")
    if "odtłuszczacz" in cat: features.append("wysoka wydajność")
    if "ecocert" in cat or "bio " in p["name"].lower(): features.append("certyfikat ECO CERT")
    if "zapachów" in cat: features.append("niwelowanie zapachów")
    if "osusz" in cat: features.append("może wyschnąć")
    if "spożywcza" in cat: features.append("jakość spożywcza")
    
    # ensure no duplicates
    features = list(set(features))
    
    desc = p["description"] or p["category"]
    
    variants_str = ",\n".join([f'            {{ name: "{v["capacity"]}", price: {v["price_net"]} }}' for v in p["variants"]])
    
    out += f"""    {{
        id: 'p{i+1}',
        name: '{p["name"]}',
        description: '{desc.replace("'", "\\'")}',
        features: {json.dumps(features)},
        specs: {{ temp: 20, dilution: '-', isEco: {"true" if "ECO" in p["name"] or "BIO" in p["name"] else "false"}, ph: 7 }},
        price: {p["variants"][0]["price_net"]},
        quantity: 1,
        discount: 0,
        maxDiscount: 20,
        variants: [
{variants_str}
        ]
    }},
"""

out = out.rstrip(",\n") + "\n];\n"

with open("out.ts", "w") as f:
    f.write(out)

