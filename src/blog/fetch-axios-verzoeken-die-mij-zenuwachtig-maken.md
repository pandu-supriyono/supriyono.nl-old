---
title: "Fetch/Axios verzoeken die mij zenuwachtig maken"
date: 2022-06-01
tags:
  - TypeScript
---

Er was een tijd dat je met een Fetch request een generic kon specificeren om op zo'n manier aangeven wat voor type je
van een HTTP-resultaat verwacht. Zoiets:

```ts
interface Person {
  id: string
  name: string
  tel: string
}

type ExpectedPayload = Person[]

// Let op! Onvelig geschreven t.b.v. voorbeeld. Gebruik in het echt .catch
const result = await fetch("http://get-request.nl/people")
                .then((res) => res.json<ExpectedPayload>())
```

Sinds [een commit in 2018](https://github.com/DefinitelyTyped/DefinitelyTyped/commit/78cdbac#diff-16dd1699972b26236bcd5bc367af23fbL128) is dit niet meer mogelijk,
maar ik kom code tegen die dit met [type casting](https://www.w3schools.com/typescript/typescript_casting.php) omzeilen:

```ts
// Let op! Onvelig geschreven t.b.v. voorbeeld. Gebruik in het echt .catch
const result = await fetch("http://get-request.nl/people")
                .then((res) => res.json() as ExpectedPayload[])
```

Tevens kan je met [Axios nog een generic gebruiken](https://github.com/axios/axios/blob/7d6bddba2d8de29c263feaef4c40daa50cb4b176/index.d.ts#L146).

Ik heb zelf weinig ervaring in werken bij een team dus ik vraag mij af of dit ook in de echte wereld gebeurt? Ik vind zo'n manier van HTTP verzoeken maken
zeer griezelig; hoe weet je zeker dat hetgeen wat je verwacht, ook daadwerkelijk gaat krijgen? Als blijkt dat de API is verandert of als je een andere
(menselijk) fout hebt gemaakt is de kans groot dat je gaat sjoemelen met data die je niet eens hebt, waardoor je toepassing gaat crashen. Net zo goed geen
TypeScript gebruiken?

In sommige functionele programmeertalen moet je altijd parsers maken die valideren of je van een HTTP-verzoek daadwerkelijk krijgt wat je verwacht. Vervolgens
kan je direct de ontvangen data omzetten naar je eigen datatype (bijvoorbeeld een klasse of een record die overeenkomt met je domeinmodel). Als je parser slaagt,
dan weet je 10000% zeker dat de data die je hebt gekregen veilig is om te gebruiken. Daarnaast hoef je ook niet meer verdere validatie uit te voeren. Het is ook fijn
dat je dat zo vroeg mogelijk doet zodra je data je toepassing binnenkomt, dan kan je gelijk computaties met die data doen voor de rest van zijn levencyclus.

Vergelijk het een beetje met een festival waar je bij de ingang een polsband krijgt als je oud genoeg bent om alcohol te kopen. Als je eenmaal zo'n polsbandje hebt,
hoeven mensen binnen de festival geen overbodige validatie te doen want de medewerkers aan de ingang hebben al je identificatie gecontroleerd.

Je eigen parser maken is een enorme operatie, dus ik gebruik het vaakst [Zod](https://github.com/colinhacks/zod). Met Zod kan je, niet zoals andere schema validatie 
libraries zoals Yup of Ajv, je data gelijk omzetten naar je eigen datatype:

```ts
import * as z from "zod"

const personParser = z.object({
  id: z.string().uuid(),
  name: z.string().min(1) // Fijnkorrelige validatie: je verwacht altijd string met minstens 1 karakter
  tel: z.string()
}).transform((props) => new Person(props))

const expectedPayload = z.array(personParser)

// Let op! Onvelig geschreven t.b.v. voorbeeld. Gebruik in het echt .catch
const result = await fetch("http://get-request.nl/people")
                .then((res) => res.json())
                .then((payload) => expectedPayload.parse(payload))
```

In het kort: zorg dat je zeker weet dat de data waarmee je handeld goed is om te gebruiken. Dat wil zeggen: overeenkomend met wat je verwacht. Parsen of valideren
is de enige manier om dit te doen. Daarnaast biedt dit je ook een kans om ervoor te zorgen dat een error goed wordt behandeld en uiteindelijk op een 'vriendelijke'
manier weergegeven aan je eindgebruiker.

Enorm leerzaam is om de bekende artikel ['Parse, Don't Validate' te lezen van Alexis King](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/).