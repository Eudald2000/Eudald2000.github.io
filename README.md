# Portfolio - Eudald Bosch

Portfolio personal desplegado en [eudald2000.github.io](https://eudald2000.github.io).

## Stack

- **Framework:** Astro 5 (SSG)
- **Estilos:** Tailwind CSS v4, glassmorphism dark
- **Animaciones:** GSAP + ScrollTrigger
- **i18n:** ES / EN / CA
- **Deploy:** GitHub Pages via GitHub Actions

## Estructura

```
src/
├── i18n/           # Traducciones (es.json, en.json, ca.json)
├── layouts/        # BaseLayout.astro
├── components/
│   ├── ui/         # GlassCard, Badge, AnimatedText, etc.
│   └── sections/   # Hero, About, Skills, Experience, Projects, CV
├── data/           # projects.js, skills.js, experiences.js, education.js
├── pages/
│   ├── index.astro         # Redirect a /es
│   └── [lang]/index.astro  # Ruta multiidioma
└── styles/
    └── global.css
```

## Comandos

| Comando           | Acción                              |
| :---------------- | :---------------------------------- |
| `npm install`     | Instala dependencias                |
| `npm run dev`     | Servidor local en `localhost:4321`  |
| `npm run build`   | Build estático en `./dist/`         |
| `npm run preview` | Preview del build antes del deploy  |

## Contenido

Todo el contenido vive en `src/data/` y `src/i18n/`. No editar texto directamente en componentes `.astro`.

- Nuevo proyecto: `src/data/projects.js` + imagen en `public/images/projects/`
- Nueva traducción: los tres archivos `src/i18n/*.json`
