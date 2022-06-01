---
title: Niet op basis van breakpoints, maar beschikbare ruimte
date: 2022-02-21
tags:
  - CSS
---

Sinds smartphones (en eventueel tablets) steeds meer werden gebruikt in de late
jaren 2000 hebben is snel opgevalen dat websites -- die in die tijd ontworpen
waren voor PC's -- niet toegankelijk waren voor de nieuwe kleine apparaten.
Weergaven waren te breed voor de vaak verticaal gebruikte apparaten waardoor men
onhandig zowel verticaal als horizontaal moest scrollen, en dat men flink moest
inzoomen om inhoud goed door te nemen.

## Responsive design

Responsive design -- het ontwerpen van een weergave zodat het schaalt
afhankelijk van de afmetingen van een venster/scherm -- werd de norm. Voor goede
reden natuurlijk. Nu kan je hetzelfde website makkelijk gebruiken onafhankelijk
van of je het op een smartphone, tablet, PC of smart TV bezoekt. Als techniek
werd er vooral media queries gebruikt in de CSS van een website.  Een media
query zorgt ervoor dat een CSS eigenschap alleen op een element wordt toegepast
als het aan bepaalde voorwaarden voldoet, bijvoorbeeld als een venster breder is
dan 700 pixels of als je een printversie van de webpagina bekijkt.

In het voorbeeld hieronder zie je hoe een element 200px is totdat het wordt
geladen op een beeldscherm van minstens 768 pixels breed. Vanaf 768 pixels wordt
het 700px breed.

```css
.element {
  width: 200px;
}

@media screen and (min-width: 768px) {
  .element {
    width: 700px;
  }
}
```

## Omarm flexibiliteit

Media queries als techniek werkt goed voor responsive design. Het is eenvoudig
om te gebruiken en de syntax spreekt voor zich. Echter, vensters zijn niet
altijd rigide en voorspelbaar. Als je een website maakt heb je geen idee met wat
voor vensters mensen je website gaan bezoeken. Dit kan ervoor zorgen dat sommige
weergaven niet passen met specifieke venstergroottes (bijvoorbeeld omdat je de
waarden voor een breakpoint niet fijnkorrelig genoeg hebt toegepast). De logica
van de weergave is nu alleen afhankelijk van hoe groot de venster is en niet van
hoeveel ruimte er is.

Met andere woorden: je layout is niet 100% veerkrachtig voor 'alle'
venstergroottes. Dit hoeft niet jouw schuld te zijn: CSS frameworks zijn vooral
vatbaar voor zulke scenario's en het is niet realistisch om van een ontwerper
te vragen een ontwerp te maken voor elk mogelijke vensterbreedte.

### Implementatie

Ons nieuwe beginpunt is nu dus: adaptieve layouts zijn afhankelijk van
beschikbare ruimte, niet voorgeschreven venstergroottes. Wat zijn de
mogelijkheden om dit na te leven?

Moderne CSS biedt fantastische mogelijkheden om dit aan te pakken. Laten we
gelijk kijken naar een voorbeeld: de containerelement. In layouts is het vaak
gangbaar om iets van een containerelement te hebben die er voor zorgen dat
content 1.) ademruimte krijgen aan de zijkanten van het venster op kleine
beeldschermen en 2.) niet te breed worden op breede beeldschermen (tekst is
moeilijk te lezen als een regel te lang is). Met breakpointgerichte CSS zou je
een containerelement als volgt kunnen schrijven:

```css
.container {
  padding-left: 2rem;
  padding-right: 2rem;
  margin-inline: auto; /* zorgt voor midden uitlijning */
}

@media screen and (min-width: 768px) {
  .container {
    padding-left: 0;
    padding-right: 0;
    max-width: 1600px;
  }
}
```

Met een aanpak gericht op flexibiliteit zou dat zo geschreven kunnen worden:

```css
  .container {
    width: min(100% - 2rem, 1600px);
    margin-inline: auto;
  }
```

Wat gebeurt er met deze aanpak? Als je bekend bent met JavaScript, ken je
wellicht de functie `min`. Deze functie accepteert twee parameters en geeft als
output de kleinere waarde uit de twee parameters. `min(100% - 2rem, 1600px)`
evalueert dus welk waarde kleiner is: 100% van de beschikbare ruimte minus 2rem
of 1600px? Als het venster kleiner is dan 1600px dan is 100% - 2rem de kleinere
waarde, dus wordt juist deze waarde gehanteerd. De 2rem fungeert als ademruimte
tussen de content en de randen van het venster.

Er zijn meerdere 'CSS functies' en parameters die je kunt gebruiken om layouts
te bouwen op basis van beschikbare ruimte in plaats van breakpoints. Ik zal zie
niet één voor één uitlichten, want de Mozilla Developer Network documentatie
legt het veel beter uit dan ik. Zie
[max](https://developer.mozilla.org/en-US/docs/Web/CSS/max),
[min-content](https://developer.mozilla.org/en-US/docs/Web/CSS/min-content),
[max-content](https://developer.mozilla.org/en-US/docs/Web/CSS/max-content),
[fit-content](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content). Er
zullen vast anderen zijn, maar als je ze tegenkomt zal je snel begrijpen dat ze
passen binnen onze nieuwe paradigma.