---
title: Vertrouw jij de browser of frameworks?
date: 2022-05-13
tags: 
  - Opinie
  - JavaScript
  - TypeScript
---

Jeremy Keith schreef een [artikel op zijn
blog](https://adactio.com/journal/19021) over zijn observatie dat ontwikkelaars
eerder geneigd zijn om frameworks van derde partijen snel te adopteren in plaats
van het simpelweg gebruiken van APIs die al op de browser beschikbaar zijn. Hij
observeerde dat ontwikkelaars sneller Bootstrap erbij pakken in plaats van CSS
Grid of custom properties, of dat ontwikkelaars snel `npm install react` op de
terminals invoeren in plaats van web components gebruiken.

Hij maakt een punt. Waarom externe frameworks gebruiken -- die het oppervlak
voor fouten en aanvallen vergroten -- wanneer je ook native APIs van de browser
kan gebruiken? Met deze APIs weet je dat de specificaties zeer uitegbreid onderzocht,
bestudeerd en getoetst zijn door experts.

Zijn hypothese is dat dit komt omdat vacatures eerder frameworks benoemen dan
browser technologieën. Je hebt vast wel vacatures gezien die eisen dat je
Bootstrap, React of Vue kent, maar nooit vacatures die flexbox of CSS grid
benoemen.

Ik weet niet in hoeverre zijn hypothese waar is (alhoewel ik het inderdaad kan
identificeren en begrijpen). [Chris
Ferdinandi](https://twitter.com/ChrisFerdinandi), een voorvechter van het
gebruik van 'vanille JavaScript' in plaats van comlexe frameworks, schrijft in
[zijn nieuwsbrief](https://gomakethings.com/are-developers-lazy/) over hoe de wereld van professionele webontwikkeling dit soort
gedrag stimuleert. Hij noemt drie factoren hierachter:

- Vacatures gebruiken veel zogenaamde 'buzzwords' en 'buzzword tooling', wat een
indruk geeft dat je al deze tools moet kennen om onderdeel zijn van 'tech talent'.

- Er heerst een grote druk om veel output te maken in een te korte tijdlijn, waardoor
een mindset van 'pak de eerstvolgende tool om het probleem op te lossen' ontstaat.

- Zoekresultaten op Google worden bevolkt door framework- of libraryspecifieke
oplossingen, wat ervoor zorgt dat native oplossingen gegraven worden.  Dit geeft
ook de indruk dat deze frameworks belangrijk zijn om technische problemen op te
lossen.

Ook hierin zie ik een goed punt. Echter, ik denk ook dat onze aversie voor de
browserindustrie ook een rol speelt. In het kort: wij vertrouwen browsers gewoon
niet.  Niet alle browsers ondersteunen (nieuwe) APIs. Als ze dat wel doen, is er
geen garantie dat ze op de zelfde manieren worden geimplementeerd. Voor deze
reden gebruiken we tools zoals [caniuse.com](https://caniuse.com/). Daarnaast
weten we vantevoren ook nooit welke browsers en browserversises websitebezoekers
gebruiken. Wij gebruiken vaak JavaScript-gebaseerde polyfills om hier mee om te
gaan, met als gevolg dat de drempel om JavaScript te adopteren laag is.
Frameworks bieden vaak ook een 'universele' gebruikerservaring waarin de browser
en browserversie minder relevant is. 

Het is naar mijn mening niet genoeg om de verantwoording te leggen op de
recruitmentindustrie.  Kijk ook naar producenten van browsers die allemaal
verschillende belangen en middelen hebben.  Ik begrijp dus waarom ontwikkelaars
snel frameworks erbij pakken (Chris Ferdinandi overigens ook), en er is in
principe niks mis met de mindset van deze ontwikkelaars gegeven de context
waarin ze werken. Echter, sommige frameworks nemen zaken zoals toegankelijkheid
minder serieus dan een ander. Dit betekent dus dat het web minder toegankelijk
wordt als frameworks de regie hebben op hoe het web werkt.

Door onvoorspelbaarheden van browsers en browsergebruiken te omarmen ben je als
ontwikkelaar genoodzaakt om gebruik te maken van [progressive
enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
waarmee je website een bruikbare basis heeft (onafhankelijk van browser) en een betere
gebruikerservaring krijgt als de browser daar ondersteuning voor heeft. Zo krijg je een 
veerkrachtige website die werkt binnen veel contexten. Maar laten we op een andere blogartikel
daar verder op ingaan.