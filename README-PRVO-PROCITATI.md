# APARTMANI LUCIA — DEMO WEB

Višestranična, responzivna HTML/CSS/JS web stranica za Apartmane Lucia, Marka Marulića 3a, Biograd na Moru. Pripremljena za GitHub + Cloudflare Pages, bez Node paketa, builda, WordPressa i baze podataka.

## BRZO POSTAVLJANJE U GITHUB I CLOUDFLARE PAGES

1. Raspakirajte ZIP. **Sadržaj mape** prenesite u korijen GitHub repozitorija (tako da se `index.html` nalazi u korijenu repozitorija).
2. U Cloudflare Pages: **Workers & Pages > Create > Pages > Connect to Git**. Odaberite repozitorij.
3. Framework preset: **None**. Build command ostavite prazan. Build output directory: **/** (korijen repozitorija), odnosno `.` ako sučelje traži relativnu putanju.
4. Objavite i posjetite Cloudflare Pages `pages.dev` adresu. Pošaljite privatni preview link vlasniku.
5. Za sada je uključen `noindex` i `robots.txt: Disallow /` kako se **demo ne bi indeksirao**.

## ŠTO JE UKLJUČENO

- 39 zasebnih HTML stranica: 13 stranica × HR/EN/DE. Sve osnovne stranice i sva četiri apartmana imaju svoju URL putanju.
- Početna, pregled apartmana, četiri podstranice smještaja, galerija s lightboxom, lokacija, o nama, kontakt, politika privatnosti, uvjeti i 404.
- Elegantne animacije pri skrolanju, responzivni layout, mobilna navigacija, mobilni sticky CTA, galerija s tipkovničkim strelicama.
- Autentični podaci o objektu provjereni prema javnim oglasima: četiri apartmana, dvije terase i dva balkona, kontakt i adresa.
- Četiri optimizirane **lokalne AVIF** ilustrativnih fotografija mediteranske obale, s 85–91 % quality. Nisu fotografije konkretnog apartmana.
- Fotografije samog smještaja povezane su s javnim oglasima **kao udaljene JPEG poveznice** (nisu lokalni AVIF). Ako stranica izvora blokira prikaz, učitava se AVIF ilustracija kako web ne bi izgledao pokvareno.
- `favicon.svg`, `social-share.jpg`, OG metapodaci, opisi, ALT tekstovi, hreflang, osnovni strukturirani podaci `LodgingBusiness`.
- Bez analitičkih skripti, oglasnih kolačića, vanjskih fontova ili vanjskih widgeta koji prate korisnike. Tipografija koristi sistemske fontove i zato ne šalje posjetiteljeve podatke font servisima.

## VAŽNO — FOTOGRAFIJE

**Za demo pregled** uključene su poveznice na fotografije stvarne kuće Lucia s oglasa na Apartmanija / Direct-Croatia / sestrinskim portalima. Pojedine slike nisu pouzdano povezane s točnim brojem apartmana (A-1, A-2, A-3, A-4). Na webu je zato diskretno navedeno da vlasnik treba potvrditi raspored fotografija.

Za **javno korištenje** zatražite vlasnikove originalne fotografije, prava/odobrenje za uporabu, točan raspored po apartmanima i aktualne podatke. Tada lokalno konvertirajte fotografije u visoko kvalitetan AVIF (plus JPG/WebP fallback prema potrebi) i zamijenite udaljene `src=` veze u HTML-u. Nemojte predstavljati generirane obalne slike kao fotografije samog objekta.

Izvori za potvrdu: https://www.hrvatska-smjestaj.com.hr/smjestaj/apartmani-lucia-biograd-na-moru.html i https://www.apartmanija.hr/apartmani/biograd-na-moru/apartmani-vila-lucia/987.

## SUSTAV ZA UPITE — BITNO

U **`assets/js/config.js`** je pripremljeno polje `web3formsAccessKey: ''`.

- **Sada**, bez ključa, obrazac radi kao neobvezujući upit kroz `mailto:`: validira obavezna polja i datume, zatim otvara e-mail aplikaciju gosta s popunjenom porukom za `apartmenthouse.lucia@gmail.com`. Ne prikazuje lažnu potvrdu slanja. Za direktni prijem poruka bez otvaranja e-mail aplikacije potrebno je aktivirati servis.
- **Za direktno slanje** otvorite https://web3forms.com, registrirajte e-mail primatelja, potvrdite ga i unesite vlastiti access key u `assets/js/config.js`. Nakon toga obrazac šalje upit kroz Web3Forms, bez vlastitog servera. Testirajte stvarnim upitom i potvrdite primitak poruke.
- Prije produkcije provjerite privacy policy i eventualnu CAPTCHA/antispam postavku. E-mail i telefonski broj su onakvi kakvi stoje na javnim oglasima i na lead prijavi.

## ŠTO JOŠ POTVRDITI S VLASNIKOM

1. Točne fotografije uz apartmane A-1 do A-4, aktualnu opremu i površine.
2. Potvrdu korištenja fotografija, opis izleta i popratnih usluga.
3. Službene podatke iznajmljivača i politiku privatnosti.
4. Želi li istaknuti cijene ili radije ostaviti izravni upit.
5. E-mail destinaciju za slanje upita i Web3Forms ključ.
6. Konačnu domenu.

## TEK NAKON ODOBRENJA — SEO ZA PRODUKCIJU

Trenutačno je site namjerno zatvoren za indeksiranje. Kada dobijete konačnu domenu, iz korijena weba pokrenite:

`python tools/prepare-production.py https://VASA-DOMENA.HR`

Skripta će ažurirati canonical i Open Graph URL-ove, hreflang, indeksiranje, `robots.txt` i izraditi `sitemap.xml` s pravim HTTPS URL-ovima. **Ne pokretati za `pages.dev` preview.** Nakon toga testirajte sve poveznice i prijavite sitemap u Google Search Console. Skripta ne uklanja oznaku noindex sa stranica 404.

## NAPOMENA O DIZAJNU

Vizualni smjer: elegantan boutique mediteranski smještaj, tamnozelena i boja pijeska, editorial serifna tipografija, veliki vizuali, minimalističke animacije i bez nepotrebnih dekorativnih elemenata. Izrađeno kao personalizirani DEMO, ne kao službena već odobrena stranica vlasnika.
