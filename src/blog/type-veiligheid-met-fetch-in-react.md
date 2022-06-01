---
title: Type veiligheid met fetch en React
date: 2022-06-01
tags:
  - React
  - TypeScript
  - JavaScript
---

In een [eerdere blogartikel](/blog/fetch-axios-verzoeken-die-mij-zenuwachtig-maken) schreef ik hoe het onveilig is om een generic of type casting
te gebruiken om de resultaten je Fetch of Axios verzoek een type aan te duiden. Ik wil in deze korte post een snippet delen van een mogelijke
React hook om HTTP verzoeken te maken en ze gelijk valideren en/of parsen. Je kan je eigen validatiemethode maken, maar ik gebruik graag [Zod](https://github.com/colinhacks/zod) als tijd beperkt is.

```ts
import { useState, useEffect } from 'react'
import { ZodObject, ZodRawShape } from 'zod'

const useSafeFetch = <T>(url: string, parser: ZodObject<T>) => {
  const [data, setData] = useState<T>()
  const [error, setError] = useState()

  useEffect(async () => {
    await function fetchData() {
      fetch(url)
        .then((res) => res.json())
        .then((payload) => parser.parse(payload))
        .then((data) => setData(data))
        .catch((error) => setError(error))
    }

    fetchData()
  }, [url])

  return { data, error } as const
}
```

Uiteraard kan je ook gebruik maken van SWR of React Query met hetzelfde idee.