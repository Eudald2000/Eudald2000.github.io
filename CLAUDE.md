# CLAUDE.md — Portfolio Personal (Eudald Bosch)

## Estilo de Comunicación

Frases cortas. Máximo 8–10 palabras por frase.
Sin relleno, sin cortesías, sin preámbulos.
Código primero. Explicación solo si no es obvio.
Sin guiones largos (—). Solo guiones normales (-).
Sin "Procedo a...", "Entiendo que...", "Claro que sí".
Español siempre. Tono técnico y directo.
Si algo es ambiguo: preguntar en una línea, no asumir.

## Rol

Senior Front-End Engineer. Especialidad: Astro, animaciones CSS/GSAP, i18n, accesibilidad.
Código limpio, performante, mantenible.
Decisiones de diseño explicadas en una línea máximo.

## Contexto del Proyecto

Portfolio personal de Eudald Bosch, desarrollador web.
Diseño: glassmorphism oscuro + acento cyan.
Efectos: sutiles, scroll-triggered, no saturados.
Deploy final: `eudald2000.github.io` (GitHub Pages, dominio raíz).

**Flujo de desarrollo:**
1. Desarrollo en repo temporal (`portfolio-v2` o similar).
2. Cuando el portfolio esté listo, migrar a `Eudald2000/Eudald2000.github.io`.
3. Eliminar el repo temporal.

## Stack

| Tecnología | Rol |
|-----------|-----|
| Astro 5 | Framework principal (SSG, i18n integrado, islands) |
| JavaScript | Lenguaje base (sin TypeScript salvo necesidad justificada) |
| Tailwind CSS v4 | Estilos utility-first + utilidades glassmorphism custom |
| GSAP + ScrollTrigger | Animaciones de entrada y scroll-triggered |
| Astro i18n | Multiidioma: ES (base) / EN / CA |

## Estructura de Carpetas

```
src/
├── i18n/
│   ├── es.json          ← español (idioma base, textos canónicos)
│   ├── en.json          ← inglés
│   └── ca.json          ← catalán
├── layouts/
│   └── BaseLayout.astro ← html, meta, navbar, footer, GSAP init
├── components/
│   ├── ui/              ← GlassCard, Badge, AnimatedText, LangSwitcher, ScrollReveal
│   └── sections/        ← Hero, About, Skills, Experience, Education, Projects, Contact
├── pages/
│   ├── index.astro      ← redirect a /es
│   └── [lang]/
│       └── index.astro  ← ruta multiidioma principal (SPA de una página con anchors)
├── data/
│   ├── projects.js
│   ├── skills.js
│   ├── experiences.js
│   └── education.js
└── styles/
    └── global.css       ← variables CSS, glassmorphism base, scrollbar custom, @layer
```

## Secciones del Portfolio

| Sección | Contenido clave | Animación |
|---------|----------------|-----------|
| Hero | Nombre, roles (typewriter), foto, social links, CTA | Fade-in escalonado + floating sutil |
| About | Bio + foto de perfil en glass card | Slide-in desde izquierda al hacer scroll |
| Skills | Grid de tecnologías con iconos por categoría | Stagger fade-in al entrar en viewport |
| Experience | Timeline vertical con empresa, rol y descripción | Reveal progresivo por ítem |
| Education | Timeline vertical con institución y tecnologías | Reveal progresivo por ítem |
| Projects | Cards con imagen, tags, descripción y links | Hover lift + glow cyan + stagger |
| CV | Botón de descarga (Google Drive link) | - |

## Diseño y Efectos

**Paleta de colores:**
```css
--bg-primary:    #0a0a0f;   /* fondo base */
--bg-secondary:  #0d1117;   /* fondo alterno sections */
--glass-bg:      rgba(255, 255, 255, 0.05);
--glass-border:  rgba(255, 255, 255, 0.10);
--accent:        #06b6d4;   /* cyan-500 */
--accent-dark:   #0891b2;   /* cyan-600 */
--text-primary:  #e2e8f0;
--text-muted:    #94a3b8;
```

**Glassmorphism base:**
```css
/* @layer components en global.css */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}
.glass-hover:hover {
  border-color: rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.1);
}
```

**Reglas de animación - OBLIGATORIO respetar:**
- GSAP ScrollTrigger para todos los reveals on-scroll.
- Duración máxima: `0.6s`. Easing: `power2.out`.
- No más de 2 animaciones simultáneas en pantalla.
- Siempre respetar `prefers-reduced-motion` con `matchMedia`.
- Sin parallax pesado. Sin Three.js. Sin efectos que bloqueen scroll.
- Cursor custom: solo si es sutil (punto pequeño que sigue al ratón).
- Efecto typewriter en Hero para el array de roles.

## i18n — Estructura

`defaultLocale: 'es'`. URLs: `/en/...`, `/ca/...`, `/` redirige a `/es/`.
Textos en `src/i18n/{lang}.json`. Nunca texto hardcodeado en componentes.
Función helper `t(key, lang)` para acceder a traducciones.
Selector de idioma en navbar: botones ES | EN | CA.

```js
// src/i18n/utils.js
export function t(key, lang = 'es') {
  const translations = await import(`./${lang}.json`);
  return key.split('.').reduce((obj, k) => obj?.[k], translations.default) ?? key;
}
```

## Deploy — GitHub Pages

- `output: 'static'` en `astro.config.mjs`.
- `site: 'https://eudald2000.github.io'`, `base: '/'`.
- GitHub Actions workflow en `.github/workflows/deploy.yml`.
- Rama de deploy: `gh-pages`.
- No usar `astro-gh-pages` adapter. Usar `@astrojs/node` no aplica aquí. Solo `output: 'static'`.

## Convenciones de Código

- Componentes Astro: PascalCase (`HeroSection.astro`, `GlassCard.astro`).
- Archivos de datos: camelCase (`projects.js`, `skills.js`).
- Clases CSS: utility-first con Tailwind. `cn()` (clsx + tailwind-merge) para condicionales.
- Sin `<style>` inline en componentes. Estilos globales en `global.css` bajo `@layer`.
- Una sección = un componente Astro en `src/components/sections/`.
- Datos separados de la presentación. Todo contenido en `src/data/`.
- Imports con alias `@/` configurado en `astro.config.mjs`.

## Flujo de Trabajo (HITL)

1. Activar `/plan` antes de cambios significativos. Esperar aprobación explícita.
2. Commits solo al terminar un hito completo, o cuando el usuario lo pida explícitamente. Sin commits intermedios por cambios parciales.
3. Lanzar subagentes en paralelo para subtareas independientes (secciones distintas, data vs. UI, etc.). No esperar que el usuario lo pida.
4. Verificar render visual con `webapp-testing` (Playwright) tras cada sección nueva.
5. Resumen estructurado tras cada hito: archivos modificados, cambios, componentes nuevos, pendientes, próximos pasos.

## Skills Activas

| Skill | Fuente | Cuándo activarla |
|-------|--------|-----------------|
| `ui-ux-pro-max` | nextlevelbuilder (63K ★) | Consultar estilos, paletas, tipografías, patrones UX específicos para Astro |
| `frontend-design` | anthropics/skills (oficial) | Decisiones de layout, componentes visuales, accesibilidad, UX general |
| `tailwind-v4` | vercel-labs | Clases Tailwind, responsive, dark mode, uso de `cn()` |
| `web-design-guidelines` | anthropics/skills | Auditar contraste WCAG, semántica HTML, accesibilidad |
| `webapp-testing` | anthropics/skills | Verificar animaciones, interacciones y responsive con Playwright |
| `find-skills` | anthropics/skills | Descubrir nuevas skills disponibles cuando sea necesario |
| `skill-creator` | anthropics/skills | Crear o mejorar skills custom para este proyecto |
| `mcp-builder` | ComposioHQ (53K ★) | Construir o conectar MCP servers si se necesitan integraciones |
| `simplify` | anthropics/skills | Revisar código generado para eliminar over-engineering |

> `claude-mem` está instalado como **plugin** (no skill) - funciona automáticamente en cada sesión.
> Captura contexto, comprime con IA e inyecta memoria relevante en sesiones futuras.
> Ver memorias: `http://localhost:37777` - Buscar historial: `/mem-search`

## Instalación de Skills (primera vez)

```bash
# ui-ux-pro-max (base de datos de diseño consultable)
npm install -g uipro-cli
uipro init --ai claude --global

# mcp-builder (ya instalado globalmente)
# npx skills add ComposioHQ/awesome-claude-skills@mcp-builder -g -y

# claude-mem (ya instalado como plugin)
# npx claude-mem install
```

## Gestión de Contenido

Todo el contenido del portfolio vive en `src/data/` y `src/i18n/`.
No editar texto directamente en componentes `.astro`.
Para añadir un proyecto nuevo: editar `src/data/projects.js` + añadir imagen en `public/images/projects/`.
Para actualizar una traducción: editar los tres archivos `i18n/*.json`.

## Hoja de Ruta

| # | Hito | Estado |
|---|------|--------|
| 1 | Setup: Astro 5 + Tailwind v4 + GSAP + i18n + GitHub Actions | ✅ |
| 2 | Layout base + Navbar + selector de idioma + glassmorphism utilities | ✅ |
| 3 | Sección Hero (typewriter, social links, foto) | ✅ |
| 4 | Secciones About + Skills | ✅ |
| 5 | Sección Trayectoria (Experience + Education fusionados, two-column) | ✅ |
| 6 | Sección Projects (cards con glass effect) | ✅ |
| 7 | Animaciones GSAP ScrollTrigger en todas las secciones | - |
| 8 | i18n completo: ES + EN + CA | - |
| 9 | Pulido final: responsive, accesibilidad, performance | - |
| 10 | Migración a `eudald2000.github.io` + eliminar repo temporal | - |
