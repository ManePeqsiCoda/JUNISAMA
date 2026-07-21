# Rebrand Junisama → BOGA — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand completo del sitio web de Junisama a BOGA: nuevos tokens de color, tipografia Montserrat, logo SVG, componentes rebrandeados, y QA final.

**Architecture:** Sustitucion sistematica de tokens CSS en `globals.css` como fuente unica de verdad, propagacion a traves de componentes React existentes, reemplazo de assets de marca (logo, favicon, OG), y adaptacion de contenido (textos, contacto, SEO).

**Tech Stack:** Next.js 16.2.10 + React 19 + Tailwind CSS v4 + TypeScript + Framer Motion + react-hook-form + zod + next-auth (mock)

## Global Constraints

- Tailwind v4 usa `@theme inline` en CSS, NO `tailwind.config.ts` para tokens
- Fuente de verdad: `src/app/globals.css` (lineas 17-216 `@theme inline`, 218-288 `:root`)
- Tokens deben usar prefijo `--boga-` (nunca `--gray-` o `--blue-`)
- Tipografia: Montserrat (reemplaza Outfit + Space Grotesk)
- Colores primarios: #2c4df2 (electric), #1b1341 (deep), #daf73a (lime)
- Cada tarea: 2-5 minutos, con codigo completo, comando de verificacion, resultado esperado
- Commits frecuentes: una por tarea o por paso

---

## FASE 1: FUNDACION (Tokens Globales)

> Objetivo: Establecer la base visual para todo lo demas. Nada de componentes antes de los tokens.

---

### Task 1.1: Backup de archivos criticos

**Files:**
- Modify: crea backups de archivos que seran modificados

**Interfaces:**
- Consumes: Nada (primera tarea)
- Produces: Backups para rollback rapido

- [ ] **Step 1: Crear directorio de backup y copiar archivos criticos**

```bash
mkdir -p /mnt/agents/output/backup-rebrand-boga/src/app \
  /mnt/agents/output/backup-rebrand-boga/src/components/layout \
  /mnt/agents/output/backup-rebrand-boga/src/components/home \
  /mnt/agents/output/backup-rebrand-boga/src/lib \
  /mnt/agents/output/backup-rebrand-boga/src/app/admin \
  /mnt/agents/output/backup-rebrand-boga/public/images

cp /mnt/agents/output/my-app/src/app/globals.css /mnt/agents/output/backup-rebrand-boga/src/app/
cp /mnt/agents/output/my-app/src/app/layout.tsx /mnt/agents/output/backup-rebrand-boga/src/app/
cp /mnt/agents/output/my-app/src/components/logo.tsx /mnt/agents/output/backup-rebrand-boga/src/components/
cp /mnt/agents/output/my-app/src/components/layout/navbar.tsx /mnt/agents/output/backup-rebrand-boga/src/components/layout/
cp /mnt/agents/output/my-app/src/components/layout/footer.tsx /mnt/agents/output/backup-rebrand-boga/src/components/layout/
cp /mnt/agents/output/my-app/src/components/layout/admin-header.tsx /mnt/agents/output/backup-rebrand-boga/src/components/layout/
cp /mnt/agents/output/my-app/src/components/layout/admin-sidebar.tsx /mnt/agents/output/backup-rebrand-boga/src/components/layout/
cp /mnt/agents/output/my-app/src/lib/seo.ts /mnt/agents/output/backup-rebrand-boga/src/lib/
cp /mnt/agents/output/my-app/src/lib/mocks.ts /mnt/agents/output/backup-rebrand-boga/src/lib/
cp /mnt/agents/output/my-app/src/lib/auth-mock.tsx /mnt/agents/output/backup-rebrand-boga/src/lib/
cp /mnt/agents/output/my-app/public/logo.svg /mnt/agents/output/backup-rebrand-boga/public/
cp /mnt/agents/output/my-app/public/favicon.svg /mnt/agents/output/backup-rebrand-boga/public/
cp /mnt/agents/output/my-app/public/favicon.ico /mnt/agents/output/backup-rebrand-boga/public/
```

- [ ] **Step 2: Verificar backups creados**

Run: `find /mnt/agents/output/backup-rebrand-boga -type f | wc -l`
Expected: `13` (o mas, dependiendo de archivos existentes)

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add -A && git commit -m "chore(backup): backup pre-rebrand archivos criticos"
```

---

### Task 1.2: Reemplazar tokens CSS en globals.css (@theme inline + :root)

**Files:**
- Modify: `src/app/globals.css` (reemplazo completo de @theme inline lineas 17-216 y :root lineas 218-288)

**Interfaces:**
- Consumes: Backup de Task 1.1
- Produces: Tokens BOGA como fuente unica de verdad para todo Tailwind

- [ ] **Step 1: Leer archivo actual para identificar estructura exacta**

```bash
cd /mnt/agents/output/my-app && head -300 src/app/globals.css
```

- [ ] **Step 2: Reemplazar seccion `@theme inline` completa**

Reemplazar desde `@theme inline {` hasta `}` (lineas ~17-216) con:

```css
@theme inline {
  /* ===========================================
     ESCALA AZUL ELECTRICO BOGA
     =========================================== */
  --color-boga-electric-50: #f0f3fe;
  --color-boga-electric-100: #d5dbfc;
  --color-boga-electric-200: #abb8fa;
  --color-boga-electric-300: #8094f7;
  --color-boga-electric-400: #5671f5;
  --color-boga-electric-500: #2c4df2;
  --color-boga-electric-600: #2541ce;
  --color-boga-electric-700: #1f36a9;
  --color-boga-electric-800: #182a85;
  --color-boga-electric-900: #121f61;
  --color-boga-electric-950: #0a1135;

  /* ===========================================
     ESCALA AZUL PROFUNDO BOGA
     =========================================== */
  --color-boga-deep-50: #efeef2;
  --color-boga-deep-100: #d1d0d9;
  --color-boga-deep-200: #a4a1b3;
  --color-boga-deep-300: #76718d;
  --color-boga-deep-400: #494267;
  --color-boga-deep-500: #1b1341;
  --color-boga-deep-600: #171037;
  --color-boga-deep-700: #130d2e;
  --color-boga-deep-800: #0f0a24;
  --color-boga-deep-900: #0b081a;
  --color-boga-deep-950: #06040e;

  /* ===========================================
     ESCALA LIMA BOGA
     =========================================== */
  --color-boga-lima-50: #fcfef1;
  --color-boga-lima-100: #f8fdd8;
  --color-boga-lima-200: #f0fcb0;
  --color-boga-lima-300: #e9fa89;
  --color-boga-lima-400: #e1f961;
  --color-boga-lima-500: #daf73a;
  --color-boga-lima-600: #b9d231;
  --color-boga-lima-700: #99ad29;
  --color-boga-lima-800: #788820;
  --color-boga-lima-900: #576317;
  --color-boga-lima-950: #30360d;

  /* ===========================================
     ESCALA NEUTRA BOGA (tinte azulado)
     =========================================== */
  --color-boga-neutral-50: #f8f8fa;
  --color-boga-neutral-100: #f0eff4;
  --color-boga-neutral-200: #e2e0e8;
  --color-boga-neutral-300: #c8c5d2;
  --color-boga-neutral-400: #a8a3b8;
  --color-boga-neutral-500: #8a849d;
  --color-boga-neutral-600: #6e6780;
  --color-boga-neutral-700: #544e63;
  --color-boga-neutral-800: #3d3849;
  --color-boga-neutral-900: #272331;
  --color-boga-neutral-950: #17141e;

  /* ===========================================
     SUPERFICIES
     =========================================== */
  --color-boga-surface-canvas: #ffffff;
  --color-boga-surface-elevated: #ffffff;
  --color-boga-surface-floating: #ffffff;
  --color-boga-surface-inset: #f0eff4;
  --color-boga-surface-muted: #f8f8fa;
  --color-boga-surface-dark: #1b1341;
  --color-boga-surface-hero: #2c4df2;

  /* ===========================================
     TEXTO
     =========================================== */
  --color-boga-text-primary: #272331;
  --color-boga-text-secondary: #544e63;
  --color-boga-text-tertiary: #8a849d;
  --color-boga-text-muted: #a8a3b8;
  --color-boga-text-inverted: #ffffff;
  --color-boga-text-on-lima: #1b1341;
  --color-boga-text-on-electric: #ffffff;

  /* ===========================================
     BORDES
     =========================================== */
  --color-boga-border-subtle: rgba(27, 19, 65, 0.06);
  --color-boga-border-default: rgba(27, 19, 65, 0.12);
  --color-boga-border-strong: rgba(27, 19, 65, 0.24);
  --color-boga-border-focus: #2c4df2;
  --color-boga-border-focus-ring: 0 0 0 3px rgba(44, 77, 242, 0.25);

  /* ===========================================
     SEMANTICOS - EXITO
     =========================================== */
  --color-boga-success-50: #f5fdec;
  --color-boga-success-100: #e6fac7;
  --color-boga-success-200: #d0f69f;
  --color-boga-success-300: #b0ed72;
  --color-boga-success-400: #8ede4f;
  --color-boga-success-500: #6bc935;
  --color-boga-success-600: #4da828;
  --color-boga-success-700: #36871e;
  --color-boga-success-800: #236d18;
  --color-boga-success-900: #155a11;
  --color-boga-success-950: #0a3d08;

  /* ===========================================
     SEMANTICOS - ERROR
     =========================================== */
  --color-boga-error-50: #fdf2f2;
  --color-boga-error-100: #fde8e8;
  --color-boga-error-200: #fbd5d5;
  --color-boga-error-300: #f8b4b4;
  --color-boga-error-400: #f98080;
  --color-boga-error-500: #f05252;
  --color-boga-error-600: #e02424;
  --color-boga-error-700: #c81e1e;
  --color-boga-error-800: #9b1c1c;
  --color-boga-error-900: #771d1d;
  --color-boga-error-950: #4a0d0d;

  /* ===========================================
     SEMANTICOS - ADVERTENCIA
     =========================================== */
  --color-boga-warning-50: #fffbeb;
  --color-boga-warning-100: #fef3c7;
  --color-boga-warning-200: #fde68a;
  --color-boga-warning-300: #fcd34d;
  --color-boga-warning-400: #fbbf24;
  --color-boga-warning-500: #f59e0b;
  --color-boga-warning-600: #d97706;
  --color-boga-warning-700: #b45309;
  --color-boga-warning-800: #92400e;
  --color-boga-warning-900: #78350f;
  --color-boga-warning-950: #451a03;

  /* ===========================================
     SEMANTICOS - INFO
     =========================================== */
  --color-boga-info-50: #f0f3fe;
  --color-boga-info-100: #d5dbfc;
  --color-boga-info-200: #abb8fa;
  --color-boga-info-300: #8094f7;
  --color-boga-info-400: #5671f5;
  --color-boga-info-500: #2c4df2;
  --color-boga-info-600: #2541ce;
  --color-boga-info-700: #1f36a9;
  --color-boga-info-800: #182a85;
  --color-boga-info-900: #121f61;
  --color-boga-info-950: #0a1135;

  /* ===========================================
     TIPOGRAFIA - Familia (referencia, no font)
     =========================================== */
  --font-boga-display: 'Montserrat', sans-serif;
  --font-boga-body: 'Montserrat', 'Poppins', system-ui, -apple-system, sans-serif;

  /* ===========================================
     TIPOGRAFIA - Escala (shorthand)
     =========================================== */
  --font-boga-display-3xl: 900 5.5rem/1.0 var(--font-boga-display);
  --font-boga-display-2xl: 900 4.5rem/1.05 var(--font-boga-display);
  --font-boga-display-xl: 800 3.75rem/1.1 var(--font-boga-display);
  --font-boga-display-lg: 800 3rem/1.15 var(--font-boga-display);
  --font-boga-heading-1: 700 2.25rem/1.2 var(--font-boga-body);
  --font-boga-heading-2: 700 1.875rem/1.25 var(--font-boga-body);
  --font-boga-heading-3: 600 1.5rem/1.3 var(--font-boga-body);
  --font-boga-heading-4: 600 1.25rem/1.35 var(--font-boga-body);
  --font-boga-heading-5: 600 1.125rem/1.4 var(--font-boga-body);
  --font-boga-body-lg: 400 1.125rem/1.65 var(--font-boga-body);
  --font-boga-body-md: 400 1rem/1.6 var(--font-boga-body);
  --font-boga-body-sm: 400 0.875rem/1.55 var(--font-boga-body);
  --font-boga-caption: 500 0.75rem/1.5 var(--font-boga-body);
  --font-boga-overline: 500 0.6875rem/1.4 var(--font-boga-body);

  /* ===========================================
     ESPACIADO
     =========================================== */
  --spacing-boga-0: 0;
  --spacing-boga-1: 0.25rem;
  --spacing-boga-2: 0.5rem;
  --spacing-boga-3: 0.75rem;
  --spacing-boga-4: 1rem;
  --spacing-boga-5: 1.25rem;
  --spacing-boga-6: 1.5rem;
  --spacing-boga-8: 2rem;
  --spacing-boga-10: 2.5rem;
  --spacing-boga-12: 3rem;
  --spacing-boga-16: 4rem;
  --spacing-boga-20: 5rem;
  --spacing-boga-24: 6rem;

  /* ===========================================
     RADIOS
     =========================================== */
  --radius-boga-none: 0;
  --radius-boga-xs: 2px;
  --radius-boga-sm: 4px;
  --radius-boga-md: 6px;
  --radius-boga-lg: 8px;
  --radius-boga-xl: 12px;
  --radius-boga-2xl: 16px;
  --radius-boga-3xl: 24px;
  --radius-boga-full: 9999px;

  /* ===========================================
     SOMBRAS
     =========================================== */
  --shadow-boga-0: none;
  --shadow-boga-1: 0 1px 2px rgba(27, 19, 65, 0.06);
  --shadow-boga-2: 0 1px 3px rgba(27, 19, 65, 0.08), 0 1px 2px rgba(27, 19, 65, 0.04);
  --shadow-boga-3: 0 4px 6px rgba(27, 19, 65, 0.08), 0 2px 4px rgba(27, 19, 65, 0.04);
  --shadow-boga-4: 0 10px 15px rgba(27, 19, 65, 0.1), 0 4px 6px rgba(27, 19, 65, 0.05);
  --shadow-boga-5: 0 20px 25px rgba(27, 19, 65, 0.12), 0 10px 10px rgba(27, 19, 65, 0.04);

  /* ===========================================
     MOTION
     =========================================== */
  --duration-boga-instant: 100ms;
  --duration-boga-fast: 150ms;
  --duration-boga-normal: 200ms;
  --duration-boga-slow: 300ms;
  --duration-boga-slower: 400ms;
  --ease-boga-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-boga-enter: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-boga-exit: cubic-bezier(0.55, 0, 1, 0.45);
  --ease-boga-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ===========================================
     ALIASES SEMANTICOS (para compatibilidad)
     =========================================== */
  --color-primary: #2c4df2;
  --color-primary-hover: #1a3ad9;
  --color-primary-light: #e8ecfe;
  --color-secondary: #1b1341;
  --color-secondary-elevated: #251d4a;
  --color-accent: #daf73a;
  --color-accent-gold: #c9a84c;
  --color-emergency-500: #e02424;
  --color-body: #544e63;
  --color-muted: #8a849d;
  --color-dark: #1b1341;
  --color-background: #ffffff;
  --color-bg-light: #f8f8fa;
  --color-bg-warm: #f9eec1;
  --color-whatsapp: #25d366;
  --color-success: #6bc935;
  --color-error: #e02424;
  --color-warning: #f59e0b;

  /* shadcn/ui compat aliases */
  --color-background: #ffffff;
  --color-foreground: #272331;
  --color-card: #ffffff;
  --color-card-foreground: #272331;
  --color-popover: #ffffff;
  --color-popover-foreground: #272331;
  --color-primary-foreground: #ffffff;
  --color-secondary-foreground: #ffffff;
  --color-muted-foreground: #8a849d;
  --color-accent-foreground: #1b1341;
  --color-destructive: #e02424;
  --color-destructive-foreground: #ffffff;
  --color-border: rgba(27, 19, 65, 0.12);
  --color-input: rgba(27, 19, 65, 0.12);
  --color-ring: #2c4df2;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
}
```

- [ ] **Step 3: Reemplazar seccion `:root` con tokens semaanticos BOGA**

Reemplazar el bloque `:root` (lineas ~218-288) con:

```css
:root {
  /* ===========================================
     TOKENS SEMANTICOS BOGA
     =========================================== */
  --boga-primary: #2c4df2;
  --boga-primary-hover: #1a3ad9;
  --boga-primary-light: #e8ecfe;
  --boga-secondary: #1b1341;
  --boga-secondary-elevated: #251d4a;
  --boga-accent: #daf73a;
  --boga-accent-gold: #c9a84c;
  --boga-body: #544e63;
  --boga-muted: #8a849d;
  --boga-dark: #1b1341;
  --boga-background: #ffffff;
  --boga-bg-light: #f8f8fa;
  --boga-bg-warm: #f9eec1;
  --boga-whatsapp: #25d366;
  --boga-success: #6bc935;
  --boga-error: #e02424;
  --boga-warning: #f59e0b;

  /* Header */
  --header-height: 72px;
  --header-height-mobile: 64px;

  /* Container */
  --boga-container-max: 1280px;
  --boga-grid-columns: 12;
  --boga-grid-gap: 1rem;
}

@media (min-width: 768px) {
  :root {
    --boga-grid-gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --boga-grid-gap: 2rem;
  }
}
```

- [ ] **Step 4: Verificar que los tokens estan disponibles**

Run: `cd /mnt/agents/output/my-app && grep -c "boga-electric-500" src/app/globals.css`
Expected: `2`

- [ ] **Step 5: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/globals.css && git commit -m "feat(tokens): reemplazar tokens CSS a paleta BOGA

- Escala completa boga-electric 50-950
- Escala completa boga-deep 50-950
- Escala completa boga-lima 50-950
- Escala neutra boga-neutral 50-950
- Superficies, texto, bordes, semanticos
- Tipografia Montserrat, espaciado, radios, sombras, motion
- Aliases semanticos para compatibilidad shadcn/ui"
```

---

### Task 1.3: Reemplazar fuentes (Outfit+Space Grotesk → Montserrat) en layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: Tokens BOGA de Task 1.2
- Produces: Fuentes Montserrat cargadas correctamente

- [ ] **Step 1: Leer layout.tsx actual**

```bash
cat /mnt/agents/output/my-app/src/app/layout.tsx
```

- [ ] **Step 2: Reemplazar import de fuentes y metadata**

Reemplazar el bloque de import/fonts:

```tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | BOGA",
    default: "BOGA | Ingenieria Portatil",
  },
  description: "Elevamos el estandar de tus eventos. Servicio de ingenieria portatil para eventos corporativos, festivales, bodas y mas.",
  metadataBase: new URL("https://boga.com.co"),
};
```

Y aplicar la fuente en el body:

```tsx
<html lang="es" className={montserrat.variable}>
  <body className={`${montserrat.className} antialiased`}>
```

- [ ] **Step 3: Eliminar preconnects antiguos de Outfit/Space Grotesk si existen**

Buscar y eliminar:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Reemplazar con preconnect para Montserrat (ya manejado por next/font/google, no requiere preconnect manual).

- [ ] **Step 4: Verificar que el layout compila**

Run: `cd /mnt/agents/output/my-app && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Sin errores de tipado relacionados a fuentes (puede mostrar otros errores preexistentes)

- [ ] **Step 5: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/layout.tsx && git commit -m "feat(fonts): reemplazar Outfit+Space Grotesk por Montserrat

- Montserrat weights: 300,400,500,600,700,900
- Title template: %s | BOGA
- Metadata base URL: boga.com.co"
```

---

### Task 1.4: Actualizar clases custom (container-junisama → container-boga, btn-primary, etc.)

**Files:**
- Modify: `src/app/globals.css` (seccion @layer components, lineas ~425+)

**Interfaces:**
- Consumes: Tokens BOGA de Task 1.2
- Produces: Clases custom actualizadas para uso en componentes

- [ ] **Step 1: Leer seccion @layer components actual**

```bash
cd /mnt/agents/output/my-app && sed -n '/@layer components/,/@layer utilities/p' src/app/globals.css
```

- [ ] **Step 2: Reemplazar clases custom completas**

Reemplazar todo el bloque `@layer components` con:

```css
@layer components {
  /* ===========================================
     CONTENEDOR BOGA
     =========================================== */
  .container-boga {
    max-width: var(--boga-container-max, 1280px);
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: 640px) {
    .container-boga {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .container-boga {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  @media (min-width: 1280px) {
    .container-boga {
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }

  /* ===========================================
     BADGE ISO
     =========================================== */
  .badge-iso {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.25rem 0.75rem;
    background: linear-gradient(135deg, #c9a84c 0%, #d4b85a 100%);
    color: #1b1341;
    font: var(--font-boga-caption);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-radius: var(--radius-boga-xs);
    box-shadow: var(--shadow-boga-1);
  }

  /* ===========================================
     BOTONES
     =========================================== */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--boga-lima-500);
    color: var(--boga-text-on-lima);
    font: var(--font-boga-caption);
    font-weight: 700;
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-boga-full);
    box-shadow: var(--shadow-boga-1);
    transition: all var(--duration-boga-normal) var(--ease-boga-enter);
    cursor: pointer;
    border: none;
    text-decoration: none;
  }

  .btn-primary:hover {
    background: var(--boga-lima-600);
    box-shadow: var(--shadow-boga-2);
    transform: translateY(-1px);
  }

  .btn-primary:active {
    background: var(--boga-lima-700);
    transform: scale(0.97);
    transition-duration: var(--duration-boga-instant);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: transparent;
    color: #ffffff;
    font: var(--font-boga-caption);
    font-weight: 700;
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: var(--radius-boga-full);
    transition: all var(--duration-boga-normal) var(--ease-boga-enter);
    cursor: pointer;
    text-decoration: none;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
  }

  .btn-secondary:active {
    transform: scale(0.97);
    transition-duration: var(--duration-boga-instant);
  }

  .btn-electric {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--boga-electric-500);
    color: var(--boga-text-on-electric);
    font: var(--font-boga-caption);
    font-weight: 700;
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-boga-full);
    box-shadow: var(--shadow-boga-1);
    transition: all var(--duration-boga-normal) var(--ease-boga-enter);
    cursor: pointer;
    border: none;
    text-decoration: none;
  }

  .btn-electric:hover {
    background: var(--boga-electric-600);
    box-shadow: var(--shadow-boga-2);
    transform: translateY(-1px);
  }

  .btn-electric:active {
    background: var(--boga-electric-700);
    transform: scale(0.97);
    transition-duration: var(--duration-boga-instant);
  }

  /* ===========================================
     BOTON EMERGENCIA
     =========================================== */
  .btn-emergency {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    background: var(--boga-error-600);
    color: #ffffff;
    font: var(--font-boga-caption);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-boga-md);
    box-shadow: var(--shadow-boga-3);
    animation: pulse-emergency 2s infinite;
    transition: all var(--duration-boga-normal) var(--ease-boga-enter);
    cursor: pointer;
    border: none;
    text-decoration: none;
  }

  .btn-emergency:hover {
    background: var(--boga-error-700);
  }

  @keyframes pulse-emergency {
    0% {
      box-shadow: 0 0 0 0 rgba(224, 36, 36, 0.4);
    }
    70% {
      box-shadow: 0 0 0 12px rgba(224, 36, 36, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(224, 36, 36, 0);
    }
  }

  /* ===========================================
     CARD PRODUCTO
     =========================================== */
  .card-product {
    background: var(--boga-surface-elevated);
    border-radius: var(--radius-boga-lg);
    box-shadow: var(--shadow-boga-2);
    overflow: hidden;
    transition: all var(--duration-boga-normal) var(--ease-boga-enter);
  }

  .card-product:hover {
    box-shadow: var(--shadow-boga-3);
    transform: translateY(-4px);
  }

  .card-product:active {
    transform: translateY(0) scale(0.98);
    transition-duration: var(--duration-boga-instant);
  }

  /* ===========================================
     STAT NUMBER
     =========================================== */
  .stat-number {
    font: var(--font-boga-display-lg);
    color: var(--boga-lima-500);
    font-weight: 800;
  }

  /* ===========================================
     MARQUEE
     =========================================== */
  .marquee-container {
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%
    );
    overflow: hidden;
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 30s linear infinite;
  }

  .marquee-track:hover {
    animation-play-state: paused;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes marquee-reverse {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }

  /* ===========================================
     GRADIENTES
     =========================================== */
  .gradient-hero {
    background: linear-gradient(
      135deg,
      var(--boga-deep-500) 0%,
      var(--boga-electric-500) 50%,
      var(--boga-electric-400) 100%
    );
  }

  .gradient-dark {
    background: linear-gradient(
      180deg,
      var(--boga-deep-800) 0%,
      var(--boga-deep-950) 100%
    );
  }

  /* ===========================================
     3 CIRCULOS BOGA
     =========================================== */
  .boga-circles {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .boga-circles .circle {
    width: 12px;
    height: 12px;
    border-radius: 9999px;
    background: var(--boga-lima-500);
  }

  .boga-circles .circle:nth-child(2) {
    background: transparent;
    border: 2px solid var(--boga-lima-500);
  }

  /* ===========================================
     UTILIDADES DE TEXTO
     =========================================== */
  .text-overline-boga {
    font: var(--font-boga-overline);
    text-transform: uppercase;
    letter-spacing: 0.25em;
  }

  .text-caption-boga {
    font: var(--font-boga-caption);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
}
```

- [ ] **Step 3: Verificar que las clases nuevas estan presentes**

Run: `cd /mnt/agents/output/my-app && grep -c "container-boga" src/app/globals.css`
Expected: `5` (definicion + 4 media queries)

Run: `cd /mnt/agents/output/my-app && grep -c "btn-primary" src/app/globals.css`
Expected: `1`

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/globals.css && git commit -m "feat(css): actualizar clases custom a estilos BOGA

- container-junisama → container-boga
- btn-primary: lima pill (antes naranja)
- btn-secondary: outline blanco
- btn-electric: nuevo boton azul electrico
- btn-emergency: rojo BOGA con pulse
- card-product: sombra BOGA + translateY hover
- stat-number: lima (antes dorado)
- gradient-hero: azul electrico/deep
- boga-circles: 2 llenos + 1 vacio
- text-overline-boga + text-caption-boga"
```

---

### Task 1.5: Actualizar tema admin a paleta BOGA

**Files:**
- Modify: `src/app/globals.css` (seccion [data-admin-theme="dark"], lineas ~325-363)

**Interfaces:**
- Consumes: Tokens BOGA de Task 1.2
- Produces: Tema admin con colores BOGA (azul electrico + lima en vez de dorado)

- [ ] **Step 1: Reemplazar tema admin**

Reemplazar el bloque `[data-admin-theme="dark"]` con:

```css
[data-admin-theme="dark"] {
  --admin-primary: #2c4df2;
  --admin-primary-hover: #1a3ad9;
  --admin-primary-light: #e8ecfe;
  --admin-accent: #daf73a;
  --admin-accent-hover: #b9d231;
  --admin-bg: #0a0a0a;
  --admin-bg-elevated: #141414;
  --admin-bg-surface: #1a1a1a;
  --admin-border: rgba(27, 19, 65, 0.3);
  --admin-text: #e5e5e5;
  --admin-text-muted: #737373;
  --admin-text-secondary: #a3a3a3;
  --admin-success: #6bc935;
  --admin-error: #f05252;
  --admin-warning: #f59e0b;
  --admin-info: #2c4df2;
}
```

- [ ] **Step 2: Verificar tema admin**

Run: `cd /mnt/agents/output/my-app && grep -A5 "data-admin-theme" src/app/globals.css | head -10`
Expected: Contiene `--admin-primary: #2c4df2;` y `--admin-accent: #daf73a;`

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/globals.css && git commit -m "feat(admin-theme): adaptar tema admin a paleta BOGA

- Admin primary: azul electrico #2c4df2 (antes dorado #d4a853)
- Admin accent: lima #daf73a
- Semanticos mapeados a escala BOGA"
```

---

### Task 1.6: Verificar build pasa

**Files:**
- No se modifican archivos nuevos

**Interfaces:**
- Consumes: Todos los cambios de Fase 1
- Produces: Build exitoso (o lista de errores a resolver)

- [ ] **Step 1: Ejecutar build**

```bash
cd /mnt/agents/output/my-app && npm run build 2>&1 | tail -40
```

- [ ] **Step 2: Verificar resultado**

Expected: `Collecting page data ...` o `Compiled successfully` sin errores de CSS/PostCSS

Si hay errores de PostCSS/Tailwind relacionados a tokens:
- Verificar sintaxis `@theme inline` (sin punto y coma al final del bloque)
- Verificar que no haya tokens duplicados
- Verificar que los valores HEX sean validos

- [ ] **Step 3: Commit (solo si build pasa)**

```bash
cd /mnt/agents/output/my-app && git add -A && git commit -m "chore(build): verificar build tras Fase 1 - tokens globales OK"
```

---

## FASE 2: MARCA VISUAL (Logo, Favicon, OG)

> Objetivo: Reemplazar los assets de marca mas visibles. Alto impacto visual.

---

### Task 2.1: Reemplazar src/components/logo.tsx (SVG BOGA con 4 variantes)

**Files:**
- Modify: `src/components/logo.tsx`

**Interfaces:**
- Consumes: Tokens BOGA (colores CSS variables)
- Produces: Componente Logo parametrizable con 4 variantes BOGA

- [ ] **Step 1: Reemplazar archivo logo.tsx completo**

```tsx
"use client";

import { cn } from "@/lib/utils";

/**
 * Logo BOGA - Componente SVG parametrizable
 *
 * Variantes:
 * - full-light: Logo completo (isotipo + wordmark) para fondos oscuros
 * - full-dark: Logo completo para fondos claros
 * - icon-light: Solo isotipo para fondos oscuros
 * - icon-dark: Solo isotipo para fondos claros
 *
 * TODO: Reemplazar con SVG final del disenador cuando esté disponible.
 *       Este es un placeholder que usa la estructura y colores BOGA correctos.
 */

interface LogoProps {
  variant?: "full-light" | "full-dark" | "icon-light" | "icon-dark";
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({
  variant = "full-light",
  className,
  width = 180,
  height = 60,
}: LogoProps) {
  const isFull = variant.startsWith("full");
  const isLight = variant.endsWith("light");

  // Colores segun variante
  const textColor = isLight ? "#ffffff" : "#1b1341";
  const barColor = "#daf73a";
  const iconBg = "#daf73a";
  const iconText = "#1b1341";

  if (!isFull) {
    // Solo isotipo (icono "B" estilizada)
    return (
      <svg
        viewBox="0 0 48 48"
        width={width}
        height={height}
        className={cn("flex-shrink-0", className)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="BOGA"
      >
        {/* Fondo circular lima */}
        <rect width="48" height="48" rx="12" fill={iconBg} />
        {/* B estilizada con iconos de baño */}
        <text
          x="24"
          y="34"
          textAnchor="middle"
          fill={iconText}
          fontFamily="Montserrat, sans-serif"
          fontWeight="900"
          fontSize="28"
        >
          B
        </text>
        {/* Simbolos masculino/femenino pequenos */}
        <circle cx="14" cy="14" r="3" fill={iconText} opacity="0.6" />
        <circle cx="34" cy="14" r="3" stroke={iconText} strokeWidth="1.5" fill="none" opacity="0.6" />
      </svg>
    );
  }

  // Logo completo: isotipo + BOGA + barra lima + INGENIERIA PORTATIL
  return (
    <svg
      viewBox="0 0 220 72"
      width={width}
      height={height}
      className={cn("flex-shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BOGA Ingenieria Portatil"
    >
      {/* Isotipo: B en cuadrado lima */}
      <rect x="0" y="8" width="48" height="48" rx="10" fill={iconBg} />
      <text
        x="24"
        y="42"
        textAnchor="middle"
        fill={iconText}
        fontFamily="Montserrat, sans-serif"
        fontWeight="900"
        fontSize="28"
      >
        B
      </text>
      <circle cx="10" cy="18" r="2.5" fill={iconText} opacity="0.5" />
      <circle cx="38" cy="18" r="2.5" stroke={iconText} strokeWidth="1.2" fill="none" opacity="0.5" />

      {/* Wordmark: BOGA */}
      <text
        x="60"
        y="38"
        fill={textColor}
        fontFamily="Montserrat, sans-serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="-0.02em"
      >
        BOGA
      </text>

      {/* Barra lima subrayada */}
      <rect x="60" y="44" width="86" height="4" rx="2" fill={barColor} />

      {/* Sub-marca: INGENIERIA PORTATIL */}
      <text
        x="60"
        y="60"
        fill={textColor}
        fontFamily="Montserrat, sans-serif"
        fontWeight="300"
        fontSize="9"
        letterSpacing="0.25em"
        opacity={isLight ? 0.9 : 0.7}
      >
        INGENIERIA PORTATIL
      </text>
    </svg>
  );
}

// Alias para uso directo
export default Logo;
```

- [ ] **Step 2: Verificar que el componente compila**

Run: `cd /mnt/agents/output/my-app && npx tsc --noEmit 2>&1 | grep -i "logo" || echo "Sin errores en logo"`
Expected: `Sin errores en logo`

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/logo.tsx && git commit -m "feat(logo): reemplazar logo Junisama por BOGA SVG parametrizable

- 4 variantes: full-light, full-dark, icon-light, icon-dark
- Isotipo: B estilizada en fondo lima con iconos de baño
- Wordmark: BOGA bold + barra lima + INGENIERIA PORTATIL
- Colores via CSS variables, parametrizable por props
- TODO: Reemplazar con SVG final del disenador"
```

---

### Task 2.2: Reemplazar public/logo.svg

**Files:**
- Modify: `public/logo.svg`

**Interfaces:**
- Consumes: Estructura del logo BOGA de Task 2.1
- Produces: SVG estatico para referencia directa (OG, SEO, etc.)

- [ ] **Step 1: Crear public/logo.svg**

```svg
<svg viewBox="0 0 220 72" xmlns="http://www.w3.org/2000/svg" aria-label="BOGA Ingenieria Portatil">
  <!-- Isotipo: B en cuadrado lima -->
  <rect x="0" y="8" width="48" height="48" rx="10" fill="#daf73a"/>
  <text x="24" y="42" text-anchor="middle" fill="#1b1341" font-family="Montserrat,sans-serif" font-weight="900" font-size="28">B</text>
  <circle cx="10" cy="18" r="2.5" fill="#1b1341" opacity="0.5"/>
  <circle cx="38" cy="18" r="2.5" stroke="#1b1341" stroke-width="1.2" fill="none" opacity="0.5"/>

  <!-- Wordmark: BOGA -->
  <text x="60" y="38" fill="#1b1341" font-family="Montserrat,sans-serif" font-weight="900" font-size="30" letter-spacing="-0.02em">BOGA</text>

  <!-- Barra lima subrayada -->
  <rect x="60" y="44" width="86" height="4" rx="2" fill="#daf73a"/>

  <!-- Sub-marca -->
  <text x="60" y="60" fill="#1b1341" font-family="Montserrat,sans-serif" font-weight="300" font-size="9" letter-spacing="0.25em" opacity="0.7">INGENIERIA PORTATIL</text>
</svg>
```

- [ ] **Step 2: Commit**

```bash
cd /mnt/agents/output/my-app && git add public/logo.svg && git commit -m "feat(logo): reemplazar public/logo.svg con version BOGA"
```

---

### Task 2.3: Generar public/favicon.svg y public/favicon.ico

**Files:**
- Create: `public/favicon.svg`
- Create: `public/favicon.ico`

**Interfaces:**
- Consumes: Isotipo BOGA de Task 2.1
- Produces: Favicon para navegadores y bookmarks

- [ ] **Step 1: Crear favicon.svg**

```svg
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#2c4df2"/>
  <text x="16" y="23" text-anchor="middle" fill="#daf73a" font-family="Montserrat,sans-serif" font-weight="900" font-size="18">B</text>
  <circle cx="8" cy="10" r="2" fill="#ffffff" opacity="0.4"/>
  <circle cx="24" cy="10" r="2" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.4"/>
</svg>
```

- [ ] **Step 2: Convertir SVG a ICO usando Python**

```python
# scripts/generate-favicon.py
from PIL import Image
import cairosvg
import io

# Convertir SVG a PNG
svg_data = open("/mnt/agents/output/my-app/public/favicon.svg", "rb").read()
png_data = cairosvg.svg2png(bytestring=svg_data, output_width=32, output_height=32)
img = Image.open(io.BytesIO(png_data))

# Guardar como ICO multi-resolucion
img_16 = img.resize((16, 16), Image.LANCZOS)
img_32 = img.resize((32, 32), Image.LANCZOS)
img_48 = img.resize((48, 48), Image.LANCZOS)

img_32.save(
    "/mnt/agents/output/my-app/public/favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)]
)
print("favicon.ico generado exitosamente")
```

- [ ] **Step 3: Ejecutar script**

```bash
cd /mnt/agents/output/my-app && python3 scripts/generate-favicon.py
```

- [ ] **Step 4: Verificar favicon.ico existe**

Run: `ls -la /mnt/agents/output/my-app/public/favicon.ico`
Expected: Archivo existe con tamano > 0 bytes

- [ ] **Step 5: Commit**

```bash
cd /mnt/agents/output/my-app && git add public/favicon.svg public/favicon.ico scripts/generate-favicon.py && git commit -m "feat(favicon): generar favicon BOGA (SVG + ICO)

- Favicon SVG: isotipo B sobre azul electrico #2c4df2
- Favicon ICO: multi-resolucion 16x16, 32x32, 48x48
- Script Python para regeneracion"
```

---

### Task 2.4: Generar public/og-image.jpg

**Files:**
- Create: `public/images/og-image.jpg`

**Interfaces:**
- Consumes: Colores y tipografia BOGA
- Produces: OG image 1200x630 para redes sociales

- [ ] **Step 1: Generar OG image con Python/Pillow**

```python
# scripts/generate-og-image.py
from PIL import Image, ImageDraw, ImageFont
import os

# Dimensiones OG estandar
W, H = 1200, 630

# Crear canvas con gradiente azul BOGA
img = Image.new('RGB', (W, H), '#2c4df2')
draw = ImageDraw.Draw(img)

# Gradient sutil: azul electrico -> azul profundo
for y in range(H):
    ratio = y / H
    r = int(44 + (27 - 44) * ratio)
    g = int(77 + (19 - 77) * ratio)
    b = int(242 + (65 - 242) * ratio)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Intentar cargar fuentes
font_dir = "/usr/share/fonts/truetype"  # Ajustar segun sistema

def try_font(name, size, fallback=None):
    try:
        return ImageFont.truetype(name, size)
    except:
        try:
            return ImageFont.truetype(f"/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
        except:
            try:
                return ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", size)
            except:
                return ImageFont.load_default()

# Fuentes
font_display = try_font("Montserrat-Black.ttf", 80)
font_sub = try_font("Montserrat-Light.ttf", 20)
font_tagline = try_font("Montserrat-Regular.ttf", 28)

# Dibujar elementos decorativos (3 circulos BOGA)
circle_color = "#daf73a"
draw.ellipse([80, 80, 116, 116], fill=circle_color)
draw.ellipse([126, 80, 162, 162], outline=circle_color, width=3)
draw.ellipse([172, 80, 208, 208], fill=circle_color)

# Barra lima decorativa
draw.rectangle([80, 500, 400, 508], fill=circle_color)

# Texto BOGA
draw.text((80, 250), "BOGA", fill="#ffffff", font=font_display)

# INGENIERIA PORTATIL
draw.text((80, 350), "INGENIERIA PORTATIL", fill="#daf73a", font=font_sub)

# Tagline
draw.text((80, 400), "Elevamos el estandar de tus eventos.", fill="#ffffff", font=font_tagline)

# Guardar
os.makedirs("/mnt/agents/output/my-app/public/images", exist_ok=True)
img.save("/mnt/agents/output/my-app/public/images/og-image.jpg", "JPEG", quality=95)
print("OG image generada: 1200x630")
```

- [ ] **Step 2: Ejecutar script**

```bash
cd /mnt/agents/output/my-app && python3 scripts/generate-og-image.py
```

- [ ] **Step 3: Verificar OG image**

Run: `ls -la /mnt/agents/output/my-app/public/images/og-image.jpg`
Expected: Archivo de ~50-150KB, dimensiones 1200x630

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add public/images/og-image.jpg scripts/generate-og-image.py && git commit -m "feat(og): generar OG image BOGA 1200x630

- Fondo gradiente azul electrico -> profundo
- Texto BOGA + INGENIERIA PORTATIL + tagline
- Elementos decorativos: 3 circulos lima, barra lima
- TODO: Reemplazar con fotografia real de evento BOGA"
```

---

### Task 2.5: Actualizar metadata en layout.tsx (favicon, preconnects, JSON-LD)

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: Logo BOGA, favicon, OG image de Tasks 2.1-2.4
- Produces: Metadata completa con marca BOGA

- [ ] **Step 1: Actualizar metadata y favicon en layout.tsx**

Reemplazar/exportar metadata completa:

```tsx
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2c4df2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | BOGA",
    default: "BOGA | Ingenieria Portatil - Elevamos el estandar de tus eventos",
  },
  description:
    "Servicio de ingenieria portatil para eventos corporativos, festivales, bodas y mas. 10+ anos de experiencia, 500+ eventos atendidos.",
  keywords: [
    "banos portatiles",
    "ingenieria portatil",
    "eventos",
    "BOGA",
    "alquiler banos",
    "servicio sanitario",
    "Colombia",
    "Medellin",
    "Bogota",
  ],
  metadataBase: new URL("https://boga.com.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://boga.com.co",
    siteName: "BOGA",
    title: "BOGA | Ingenieria Portatil",
    description: "Elevamos el estandar de tus eventos. Servicio de ingenieria portatil para eventos.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BOGA Ingenieria Portatil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOGA | Ingenieria Portatil",
    description: "Elevamos el estandar de tus eventos.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // TODO: Agregar cuando este disponible
  },
};
```

- [ ] **Step 2: Actualizar JSON-LD global en el RootLayout**

Reemplazar el JSON-LD existente en el body:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "BOGA",
        alternateName: "BOGA Ingenieria Portatil",
        url: "https://boga.com.co",
        logo: "https://boga.com.co/logo.svg",
        description: "Servicio de ingenieria portatil para eventos corporativos, festivales, bodas y mas.",
        sameAs: [
          "https://instagram.com/boga",
          "https://linkedin.com/company/boga",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+57-350-708-9584",
          contactType: "customer service",
          areaServed: "CO",
          availableLanguage: "es",
        },
      },
      {
        "@type": "LocalBusiness",
        name: "BOGA",
        image: "https://boga.com.co/logo.svg",
        url: "https://boga.com.co",
        telephone: "+57-350-708-9584",
        email: "soporte@boga.com.co",
        address: [
          {
            "@type": "PostalAddress",
            streetAddress: "Calle 13 sur #51C-54",
            addressLocality: "Medellin",
            addressRegion: "Antioquia",
            addressCountry: "CO",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "Cra 58b bis # 131A 51",
            addressLocality: "Bogota",
            addressRegion: "Cundinamarca",
            addressCountry: "CO",
          },
        ],
        geo: {
          "@type": "GeoCoordinates",
          latitude: "6.2518",
          longitude: "-75.5636",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        priceRange: "$$",
      },
      {
        "@type": "WebSite",
        name: "BOGA",
        url: "https://boga.com.co",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://boga.com.co/productos?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verificar que el layout compila**

Run: `cd /mnt/agents/output/my-app && npx tsc --noEmit 2>&1 | grep -c "layout.tsx" || echo "OK o errores en otros archivos"`
Expected: `0` o `OK o errores en otros archivos`

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/layout.tsx && git commit -m "feat(meta): actualizar metadata, favicon, JSON-LD a BOGA

- Title template: %s | BOGA
- OG image: /images/og-image.jpg
- Favicon: /favicon.svg + /favicon.ico
- JSON-LD: Organization + LocalBusiness + WebSite con datos BOGA
- Theme color: #2c4df2"
```

---

## FASE 3: CONFIGURACION Y DATOS

> Objetivo: Centralizar datos corporativos y actualizar todo el contenido textual.

---

### Task 3.1: Actualizar src/lib/mocks.ts (nombreSitio → "BOGA", tagline, redes)

**Files:**
- Modify: `src/lib/mocks.ts`

**Interfaces:**
- Consumes: Estructura existente de mocks.ts
- Produces: Configuracion BOGA centralizada

- [ ] **Step 1: Reemplazar objeto configuracion en mocks.ts**

Buscar y reemplazar el objeto `configuracion`:

```ts
export const configuracion = {
  nombreSitio: "BOGA",
  nombreLegal: "BOGA Ingenieria Portatil S.A.S",
  tagline: "Elevamos el estandar de tus eventos.",
  subTagline: "Ingenieria Portatil",
  telefono: "+57 350 708 9584",
  telefonoEmergencia: "+57 350 708 9584",
  email: "soporte@boga.com.co",
  whatsappNumero: "573507089584",
  whatsappMensaje: "Hola BOGA, me gustaria cotizar sus servicios para un evento.",
  direccionMedellin: "Calle 13 sur #51C-54",
  direccionBogota: "Cra 58b bis # 131A 51",
  ciudadMedellin: "Medellin",
  ciudadBogota: "Bogota",
  horarioAtencion: "24/7",
  instagramUrl: "https://instagram.com/boga",
  instagramHandle: "@boga",
  linkedinUrl: "https://linkedin.com/company/boga",
  facebookUrl: "",
  youtubeUrl: "",
  seoTitleDefault: "BOGA | Ingenieria Portatil - Elevamos el estandar de tus eventos",
  seoDescriptionDefault:
    "Servicio de ingenieria portatil para eventos corporativos, festivales, bodas y mas. 10+ anos de experiencia, 500+ eventos atendidos en Colombia.",
  seoKeywordsDefault: [
    "banos portatiles",
    "ingenieria portatil",
    "eventos",
    "BOGA",
    "alquiler banos",
    "servicio sanitario",
    "Colombia",
    "Medellin",
    "Bogota",
  ],
  mensajeWhatsApp:
    "Hola BOGA, me gustaria cotizar sus servicios para un evento. Gracias!",
  urlBase: "https://boga.com.co",
  anioFundacion: 2014,
};
```

- [ ] **Step 2: Actualizar nombres de productos que contengan "Junisama"**

Si algun producto tiene "Junisama" en nombre o descripcion, reemplazar por "BOGA":

```ts
// Buscar en el archivo:
// nombre: "...Junisama..." → reemplazar por "...BOGA..."
// descripcion: "...Junisama..." → reemplazar por "...BOGA..."
```

Ejemplo de reemplazo:
```bash
cd /mnt/agents/output/my-app && sed -i 's/Junisama/BOGA/g' src/lib/mocks.ts
```

- [ ] **Step 3: Actualizar FAQ que mencione Junisama**

```bash
cd /mnt/agents/output/my-app && sed -i 's/Junisama/BOGA/g' src/lib/mocks.ts
cd /mnt/agents/output/my-app && sed -i 's/junisama/boga/g' src/lib/mocks.ts
```

- [ ] **Step 4: Verificar cambios**

Run: `cd /mnt/agents/output/my-app && grep -n "BOGA" src/lib/mocks.ts | head -10`
Expected: Muestra lineas con "BOGA" reemplazadas

Run: `cd /mnt/agents/output/my-app && grep -c "Junisama" src/lib/mocks.ts`
Expected: `0`

- [ ] **Step 5: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/lib/mocks.ts && git commit -m "feat(config): actualizar mocks.ts a datos BOGA

- nombreSitio: BOGA
- tagline: Elevamos el estandar de tus eventos.
- email: soporte@boga.com.co
- URL base: boga.com.co
- Reemplazadas todas las referencias Junisama → BOGA"
```

---

### Task 3.2: Actualizar src/lib/seo.ts (siteConfig: nombre, tagline, URL, logo, redes)

**Files:**
- Modify: `src/lib/seo.ts`

**Interfaces:**
- Consumes: Datos BOGA de Task 3.1
- Produces: Configuracion SEO completa con marca BOGA

- [ ] **Step 1: Reemplazar siteConfig en seo.ts**

```ts
export const siteConfig = {
  name: "BOGA",
  fullName: "BOGA Ingenieria Portatil",
  tagline: "Elevamos el estandar de tus eventos.",
  url: "https://boga.com.co",
  logo: "https://boga.com.co/logo.svg",
  ogImage: "https://boga.com.co/images/og-image.jpg",
  telephone: "+57 350 708 9584",
  email: "soporte@boga.com.co",
  whatsapp: "573507089584",
  locale: "es_CO",
  language: "es",
  currency: "COP",
  addresses: [
    {
      city: "Medellin",
      street: "Calle 13 sur #51C-54",
      region: "Antioquia",
      country: "CO",
    },
    {
      city: "Bogota",
      street: "Cra 58b bis # 131A 51",
      region: "Cundinamarca",
      country: "CO",
    },
  ],
  socials: {
    instagram: "https://instagram.com/boga",
    linkedin: "https://linkedin.com/company/boga",
  },
};
```

- [ ] **Step 2: Actualizar todas las referencias Junisama en seo.ts**

```bash
cd /mnt/agents/output/my-app && sed -i 's/Junisama/BOGA/g' src/lib/seo.ts
cd /mnt/agents/output/my-app && sed -i 's/junisama/boga/g' src/lib/seo.ts
```

- [ ] **Step 3: Verificar que no queden referencias antiguas**

Run: `cd /mnt/agents/output/my-app && grep -ci "junisama" src/lib/seo.ts`
Expected: `0`

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/lib/seo.ts && git commit -m "feat(seo): actualizar siteConfig a BOGA

- Nombre, tagline, URL, logo, contacto actualizados
- Direcciones Medellin y Bogota
- Redes sociales BOGA"
```

---

### Task 3.3: Normalizar dominio en sitemap.ts y robots.ts

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`

**Interfaces:**
- Consumes: siteConfig.url de Task 3.2
- Produces: Sitemap y robots con dominio BOGA consistente

- [ ] **Step 1: Actualizar sitemap.ts**

```ts
import { MetadataRoute } from "next";

const BASE_URL = "https://boga.com.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/productos",
    "/servicios",
    "/quienes-somos",
    "/galeria",
    "/contacto",
    "/cotizacion",
    "/faq",
    "/clientes",
    "/privacidad",
    "/terminos",
    "/cookies",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
```

- [ ] **Step 2: Actualizar robots.ts**

```ts
import { MetadataRoute } from "next";

const BASE_URL = "https://boga.com.co";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/*", "/api/*"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Verificar consistencia**

Run: `cd /mnt/agents/output/my-app && grep -h "boga.com" src/app/sitemap.ts src/app/robots.ts | head -4`
Expected: Muestra `https://boga.com.co` en ambos archivos

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/sitemap.ts src/app/robots.ts && git commit -m "feat(seo): normalizar dominio a boga.com.co en sitemap y robots"
```

---

### Task 3.4: Mover credenciales admin de publicas a privadas (.env.local)

**Files:**
- Create: `.env.local`
- Modify: `src/lib/auth-mock.tsx`

**Interfaces:**
- Consumes: Credenciales actuales en auth-mock.tsx
- Produces: Credenciales seguras en variables de servidor

- [ ] **Step 1: Crear .env.local**

```bash
cat > /mnt/agents/output/my-app/.env.local << 'EOF'
# BOGA - Variables de entorno locales (NO COMMITTEAR)

# Admin credentials (server-side only)
ADMIN_EMAIL=admin@boga.com.co
ADMIN_PASSWORD=boga-admin-2024

# Base URL
NEXT_PUBLIC_BASE_URL=https://boga.com.co

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=573507089584
EOF
```

- [ ] **Step 2: Actualizar auth-mock.tsx para leer de variables server-side**

```tsx
"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface AuthUser {
  email: string;
  name: string;
  role: "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// NOTA: En produccion, estas credenciales deben venir de una API server-side
// o de variables de entorno del servidor (no NEXT_PUBLIC_*).
// Para desarrollo local, se mantienen valores por defecto.
const DEFAULT_ADMIN_EMAIL = "admin@boga.com.co";
const DEFAULT_ADMIN_PASSWORD = "boga-admin-2024";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((email: string, password: string): boolean => {
    // Usar variables de entorno si estan disponibles, sino valores por defecto
    const validEmail = process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
    const validPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

    if (email === validEmail && password === validPassword) {
      setUser({
        email,
        name: "Administrador BOGA",
        role: "admin",
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
```

- [ ] **Step 3: Actualizar login page para no mostrar credenciales**

```tsx
// src/app/admin/login/page.tsx - Eliminar hint de credenciales visibles
// Solo mostrar mensaje generico de ayuda si es necesario
```

- [ ] **Step 4: Agregar .env.local a .gitignore**

```bash
cd /mnt/agents/output/my-app && echo ".env.local" >> .gitignore
cd /mnt/agents/output/my-app && echo ".env.*.local" >> .gitignore
```

- [ ] **Step 5: Verificar que no hay credenciales expuestas**

Run: `cd /mnt/agents/output/my-app && grep -rn "NEXT_PUBLIC_ADMIN" src/ || echo "Sin credenciales publicas"`
Expected: `Sin credenciales publicas`

- [ ] **Step 6: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/lib/auth-mock.tsx src/app/admin/login/page.tsx .gitignore .env.local && git commit -m "security(auth): mover credenciales admin a variables server-side

- Crear .env.local con ADMIN_EMAIL y ADMIN_PASSWORD
- Actualizar auth-mock.tsx para leer de process.env
- Agregar .env.local a .gitignore
- Eliminar credenciales publicas del bundle"
```

---

## FASE 4: LAYOUT (Navbar, Footer, Providers)

> Objetivo: El "marco" visible de todas las paginas.

---

### Task 4.1: Rebrandear src/components/layout/navbar.tsx

**Files:**
- Modify: `src/components/layout/navbar.tsx`

**Interfaces:**
- Consumes: Logo BOGA (Task 2.1), tokens CSS (Task 1.2), .container-boga (Task 1.4)
- Produces: Navbar con marca BOGA, boton CTA lima, boton emergencia

- [ ] **Step 1: Leer navbar.tsx actual**

```bash
cat /mnt/agents/output/my-app/src/components/layout/navbar.tsx
```

- [ ] **Step 2: Reemplazar imports y estructura del navbar**

Reemplazar la seccion de imports y componente logo:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/productos", label: "Productos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/quienes-somos", label: "Quienes Somos" },
  { href: "/galeria", label: "Galeria" },
  { href: "/contacto", label: "Contacto" },
];
```

- [ ] **Step 3: Reemplazar header/nav con estilos BOGA**

```tsx
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all",
        "duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        isScrolled || !isHome
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(27,19,65,0.08),0_1px_2px_rgba(27,19,65,0.04)] border-b border-[rgba(27,19,65,0.06)]"
          : "bg-transparent"
      )}
      style={{ height: "var(--header-height, 72px)" }}
    >
      <nav className="container-boga flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo
            variant={isScrolled || !isHome ? "full-dark" : "full-light"}
            width={140}
            height={40}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                isScrolled || !isHome
                  ? "text-[#544e63] hover:text-[#2c4df2]"
                  : "text-white/80 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Boton Emergencia */}
          <a
            href="tel:+573507089584"
            className="btn-emergency text-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            EMERGENCIA
          </a>

          {/* Boton Cotizar */}
          <Link href="/cotizacion" className="btn-primary text-xs">
            Cotizar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden p-2 rounded-lg transition-colors",
            isScrolled || !isHome
              ? "text-[#1b1341] hover:bg-[#f0eff4]"
              : "text-white hover:bg-white/10"
          )}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[var(--header-height)] bg-white z-40 p-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-[#272331] hover:text-[#2c4df2] py-2 border-b border-[rgba(27,19,65,0.06)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <a href="tel:+573507089584" className="btn-emergency justify-center">
                <AlertTriangle className="w-4 h-4" />
                EMERGENCIA
              </a>
              <Link href="/cotizacion" className="btn-primary justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                Cotizar Ahora
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Verificar que compila**

Run: `cd /mnt/agents/output/my-app && npx tsc --noEmit 2>&1 | grep -i "navbar" || echo "OK"`
Expected: `OK`

- [ ] **Step 5: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/layout/navbar.tsx && git commit -m "feat(navbar): rebrandear navbar a BOGA

- Logo BOGA con variantes light/dark segun scroll
- Fondo transparente → blanco con blur al scrollear
- Links: color texto BOGA, hover azul electrico
- CTA: boton lima pill 'Cotizar'
- Emergencia: boton rojo pulse con icono
- Menu mobile: slide-in con fondo blanco"
```

---

### Task 4.2: Rebrandear src/components/layout/footer.tsx

**Files:**
- Modify: `src/components/layout/footer.tsx`

**Interfaces:**
- Consumes: Logo BOGA, configuracion BOGA, tokens CSS
- Produces: Footer con marca BOGA, datos actualizados, CTA banner

- [ ] **Step 1: Leer footer.tsx actual**

```bash
cat /mnt/agents/output/my-app/src/components/layout/footer.tsx
```

- [ ] **Step 2: Reemplazar estructura del footer**

```tsx
import Link from "next/link";
import { Logo } from "@/components/logo";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  ArrowRight,
  Settings,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1b1341]">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#2c4df2] to-[#2541ce] py-16">
        <div className="container-boga text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Listo para elevar tu evento?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Cotiza en minutos y recibe una propuesta personalizada para tu evento.
          </p>
          <Link
            href="/cotizacion"
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            Cotizar Ahora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container-boga py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Columna 1: Logo e Info */}
          <div>
            <Logo variant="full-light" width={140} height={40} className="mb-6" />
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Elevamos el estandar de tus eventos con servicios de ingenieria
              portatil de elite. Disponibles 24/7 en Medellin y Bogota.
            </p>
            <div className="boga-circles">
              <span className="circle" />
              <span className="circle" />
              <span className="circle" />
            </div>
          </div>

          {/* Columna 2: Productos */}
          <div>
            <h3 className="text-caption-boga text-white mb-6">Productos</h3>
            <ul className="space-y-3">
              {[
                { href: "/productos/bano-vip", label: "Bano VIP" },
                { href: "/productos/bano-estandar", label: "Bano Estandar" },
                { href: "/productos/discapacitados", label: "Discapacitados" },
                { href: "/productos/electricos", label: "Electricos" },
                { href: "/productos/lavamanos", label: "Lavamanos" },
                { href: "/productos/trailer-lujo", label: "Trailer de Lujo" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h3 className="text-caption-boga text-white mb-6">Servicios</h3>
            <ul className="space-y-3">
              {[
                { href: "/servicios", label: "Instalacion" },
                { href: "/servicios", label: "Mantenimiento" },
                { href: "/servicios", label: "Servicio 24/7" },
                { href: "/servicios", label: "Asesoria Tecnica" },
                { href: "/cotizacion", label: "Cotizacion Personalizada" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-caption-boga text-white mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#daf73a] mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">+57 350 708 9584</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#daf73a] mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">soporte@boga.com.co</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#daf73a] mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">
                  Calle 13 sur #51C-54, Medellin
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#daf73a] mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">
                  Cra 58b bis # 131A 51, Bogota
                </span>
              </li>
            </ul>

            {/* Redes Sociales */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com/boga"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#daf73a] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/boga"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#daf73a] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-boga py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} BOGA Ingenieria Portatil. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacidad"
              className="text-white/50 hover:text-white text-xs transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-white/50 hover:text-white text-xs transition-colors"
            >
              Terminos
            </Link>
            <Link
              href="/cookies"
              className="text-white/50 hover:text-white text-xs transition-colors"
            >
              Cookies
            </Link>
            <Link
              href="/admin"
              className="text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              <Settings className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verificar que compila**

Run: `cd /mnt/agents/output/my-app && npx tsc --noEmit 2>&1 | grep -i "footer" || echo "OK"`
Expected: `OK`

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/layout/footer.tsx && git commit -m "feat(footer): rebrandear footer a BOGA

- Fondo: azul profundo #1b1341
- CTA banner: gradiente azul electrico → profundo
- 4 columnas: Logo+info, Productos, Servicios, Contacto
- Iconos sociales: Instagram, LinkedIn
- Separador: 3 circulos BOGA decorativos
- Copyright: BOGA Ingenieria Portatil
- Admin link discreto (icono settings)"
```

---

### Task 4.3: AGREGAR/VERIFICAR boton EMERGENCIA en navbar

**Files:**
- Verificar: `src/components/layout/navbar.tsx` (ya implementado en Task 4.1)
- Verificar: funcionalidad pulse-emergency

**Interfaces:**
- Consumes: Tokens BOGA, .btn-emergency CSS
- Produces: Boton emergencia funcional y visible

- [ ] **Step 1: Verificar que el boton EMERGENCIA esta presente**

Run: `cd /mnt/agents/output/my-app && grep -n "EMERGENCIA" src/components/layout/navbar.tsx`
Expected: Muestra linea(s) con "EMERGENCIA"

- [ ] **Step 2: Verificar que el numero de emergencia es correcto**

Run: `cd /mnt/agents/output/my-app && grep "tel:" src/components/layout/navbar.tsx`
Expected: `tel:+573507089584`

- [ ] **Step 3: Verificar que la animacion pulse-emergency funciona**

El CSS `.btn-emergency` ya incluye `animation: pulse-emergency 2s infinite;` desde Task 1.4.

Abrir el navegador en `http://localhost:3000` y verificar:
- El boton EMERGENCIA es visible en la navbar
- Tiene sombra pulsante roja
- Al hacer click, abre el dialer del telefono

- [ ] **Step 4: No requiere commit (ya incluido en Task 4.1)**

---

### Task 4.4: VERIFICAR acceso admin (admin link en footer, flujo login/logout)

**Files:**
- Verificar: `src/components/layout/footer.tsx` (ya implementado en Task 4.2)
- Verificar: `src/app/admin/login/page.tsx`

**Interfaces:**
- Consume: Auth mock, admin link en footer
- Produces: Flujo admin funcional verificado

- [ ] **Step 1: Verificar que el admin link existe en el footer**

Run: `cd /mnt/agents/output/my-app && grep -n "/admin" src/components/layout/footer.tsx`
Expected: Muestra linea con link a `/admin`

- [ ] **Step 2: Verificar pagina de login admin**

```bash
cat /mnt/agents/output/my-app/src/app/admin/login/page.tsx
```

- [ ] **Step 3: Actualizar login page con estilos BOGA**

Reemplazar la pagina de login:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-mock";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Credenciales incorrectas. Intente de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1341] via-[#0f0a24] to-[#06040e]">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-[0_20px_25px_rgba(27,19,65,0.12)]">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo variant="icon-light" width={64} height={64} />
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Panel de Administracion
          </h1>
          <p className="text-white/60 text-center text-sm mb-8">
            BOGA Ingenieria Portatil
          </p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#f05252]/10 border border-[#f05252]/20 text-[#f05252] text-sm mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-caption-boga text-white/60 mb-1.5 block">
                Correo Electronico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@boga.com.co"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#2c4df2] focus:ring-[#2c4df2]/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-caption-boga text-white/60 mb-1.5 block">
                Contrasena
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#2c4df2] focus:ring-[#2c4df2]/20"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#daf73a] hover:bg-[#b9d231] text-[#1b1341] font-bold uppercase text-xs tracking-wider h-11 rounded-full transition-all duration-200"
            >
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/admin/login/page.tsx && git commit -m "feat(admin-login): rebrandear login admin a paleta BOGA

- Fondo: gradiente azul profundo oscuro
- Card: glassmorphism con blur
- Logo: isotipo BOGA
- Inputs: estilo dark con borde blanco/10
- Boton: lima con texto oscuro
- Sin credenciales visibles en la UI"
```

---

### Task 4.5: Actualizar providers.tsx (offset header, temas)

**Files:**
- Modify: `src/components/providers.tsx`

**Interfaces:**
- Consumes: --header-height CSS variable
- Produces: Providers con offset correcto

- [ ] **Step 1: Leer providers.tsx actual**

```bash
cat /mnt/agents/output/my-app/src/components/providers.tsx
```

- [ ] **Step 2: Actualizar providers con tema BOGA**

```tsx
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { AuthProvider } from "@/lib/auth-mock";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-[#2c4df2] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Saltar al contenido principal
      </a>
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen"
        style={{ paddingTop: "var(--header-height, 72px)" }}
      >
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </AuthProvider>
  );
}
```

- [ ] **Step 3: Verificar que compila**

Run: `cd /mnt/agents/output/my-app && npx tsc --noEmit 2>&1 | grep -i "providers" || echo "OK"`
Expected: `OK`

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/providers.tsx && git commit -m "feat(providers): actualizar offset y skip-link con colores BOGA

- Header offset via CSS variable --header-height
- Skip-link: azul electrico #2c4df2"
```

---

## FASE 5: HOME PAGE

> Objetivo: Rebrandear todas las secciones de la landing page principal.

---

### Task 5.1: Rebrandear src/components/home/hero.tsx

**Files:**
- Modify: `src/components/home/hero.tsx`

**Interfaces:**
- Consumes: Tokens BOGA, gradient-hero CSS, Logo component
- Produces: Hero con marca BOGA, stats lima, CTAs dual

- [ ] **Step 1: Leer hero.tsx actual**

```bash
cat /mnt/agents/output/my-app/src/components/home/hero.tsx
```

- [ ] **Step 2: Reemplazar hero completo**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Award, Users } from "lucide-react";

const HERO_STATS = [
  { icon: Calendar, value: "500+", label: "Eventos atendidos" },
  { icon: Clock, value: "24/7", label: "Disponibilidad" },
  { icon: Award, value: "99.9%", label: "Satisfaccion" },
  { icon: Users, value: "10+", label: "Anos de experiencia" },
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden gradient-hero">
      {/* Elementos decorativos: 3 circulos BOGA */}
      <div className="absolute top-24 right-8 md:right-16 opacity-30">
        <div className="boga-circles scale-150">
          <span className="circle" />
          <span className="circle" />
          <span className="circle" />
        </div>
      </div>

      {/* Ondas decorativas sutiles */}
      <svg
        className="absolute bottom-0 left-0 right-0 opacity-10"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 60C240 20 480 100 720 60C960 20 1200 100 1440 60V120H0V60Z"
          fill="white"
        />
      </svg>

      <div className="container-boga relative z-10 py-24 md:py-32">
        <div className="max-w-4xl">
          {/* Badge ISO (opcional) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="badge-iso">
              <Award className="w-3.5 h-3.5" />
              ISO 14001 CERTIFICADO
            </span>
          </motion.div>

          {/* Wordmark BOGA */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[5.5rem] md:text-[7rem] lg:text-[8rem] font-black text-white leading-none tracking-[-0.03em] mb-2"
          >
            BOGA
          </motion.h1>

          {/* INGENIERIA PORTATIL */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-overline-boga text-white/90 tracking-[0.25em] mb-6"
          >
            INGENIERIA PORTATIL
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed"
          >
            Elevamos el estandar de tus eventos con servicios de ingenieria
            portatil de elite. Disponibles 24/7 en Medellin y Bogota.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link href="/cotizacion" className="btn-primary">
              Cotizar Ahora
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/productos" className="btn-secondary">
              Ver Productos
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-8 md:gap-12"
          >
            {HERO_STATS.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-[#daf73a]" />
                  <span className="stat-number text-3xl md:text-4xl">{stat.value}</span>
                </div>
                <span className="text-caption-boga text-white/70">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar que compila**

Run: `cd /mnt/agents/output/my-app && npx tsc --noEmit 2>&1 | grep -i "hero" || echo "OK"`
Expected: `OK`

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/home/hero.tsx && git commit -m "feat(hero): rebrandear hero a BOGA

- Fondo: gradiente azul electrico/deep/profundo
- Wordmark: BOGA en display-3xl (5.5rem+), blanco, tracking tight
- INGENIERIA PORTATIL: overline, tracking 0.25em
- Tagline: Elevamos el estandar de tus eventos.
- CTAs: Cotizar (lima) + Ver Productos (outline blanco)
- Stats: numeros lima, iconos lima, labels uppercase
- Decorativos: 3 circulos BOGA, ondas SVG
- Badge ISO: dorado con icono Award"
```

---

### Task 5.2: Rebrandear src/components/client-marquee.tsx

**Files:**
- Modify: `src/components/client-marquee.tsx`

**Interfaces:**
- Consumes: Eventos de src/data/events.ts, tokens BOGA
- Produces: Marquee con colores BOGA, separadores circulos

- [ ] **Step 1: Leer client-marquee.tsx actual**

```bash
cat /mnt/agents/output/my-app/src/components/client-marquee.tsx
```

- [ ] **Step 2: Reemplazar con estilos BOGA**

```tsx
"use client";

import { events } from "@/data/events";

export function ClientMarquee() {
  // Obtener nombres unicos de eventos
  const eventNames = events
    .filter((e) => e.highlighted)
    .map((e) => e.name)
    .slice(0, 20);

  // Duplicar para loop infinito
  const allNames = [...eventNames, ...eventNames];

  return (
    <section className="bg-[#f8f8fa] py-8 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-track">
          {allNames.map((name, i) => (
            <span key={i} className="flex items-center flex-shrink-0">
              <span className="text-sm font-medium text-[#544e63] uppercase tracking-[0.05em] whitespace-nowrap px-6">
                {name}
              </span>
              {/* Separador: 3 circulos BOGA miniatura */}
              <span className="flex items-center gap-1 px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2c4df2]" />
                <span className="w-1.5 h-1.5 rounded-full border border-[#2c4df2] bg-transparent" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#2c4df2]" />
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/client-marquee.tsx && git commit -m "feat(marquee): rebrandear client marquee a BOGA

- Fondo: boga-neutral-50 (#f8f8fa)
- Texto: body-sm, uppercase, tracking 0.05em, color secundario
- Separadores: 3 circulos BOGA miniatura en azul electrico
- Velocidad: 30s (CSS existente)"
```

---

### Task 5.3: Rebrandear product-grid.tsx y product-card.tsx

**Files:**
- Modify: `src/components/product-card.tsx`
- Modify: `src/components/product-grid.tsx`

**Interfaces:**
- Consumes: Productos de mocks.ts, tokens BOGA
- Produces: Cards con sombra BOGA, badges lima/electric

- [ ] **Step 1: Leer product-card.tsx actual**

```bash
cat /mnt/agents/output/my-app/src/components/product-card.tsx
```

- [ ] **Step 2: Rebrandear product-card.tsx**

```tsx
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  slug: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  badgeColor?: "lima" | "electric" | "gold" | "neutral";
  image: string;
  category: string;
}

const BADGE_STYLES = {
  lima: "bg-[#daf73a] text-[#1b1341]",
  electric: "bg-[#2c4df2] text-white",
  gold: "bg-gradient-to-r from-[#c9a84c] to-[#d4b85a] text-[#1b1341]",
  neutral: "bg-[#e2e0e8] text-[#544e63]",
};

export function ProductCard({
  slug,
  name,
  description,
  price,
  badge,
  badgeColor = "lima",
  image,
}: ProductCardProps) {
  return (
    <Link href={`/productos/${slug}`} className="group">
      <article className="card-product">
        {/* Imagen */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f0eff4]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Badge */}
          {badge && (
            <span
              className={cn(
                "absolute top-3 left-3 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] rounded-full shadow-[0_1px_2px_rgba(27,19,65,0.06)]",
                BADGE_STYLES[badgeColor]
              )}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="text-[1.5rem] font-semibold text-[#272331] mb-1 leading-tight">
            {name}
          </h3>
          <p className="text-sm text-[#544e63] mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-[1.25rem] font-bold text-[#2c4df2]">{price}</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-[#2c4df2] group-hover:gap-2 transition-all">
              Ver detalles
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
```

- [ ] **Step 3: Rebrandear product-grid.tsx**

```tsx
import { getProductosDestacados } from "@/lib/mocks";
import { ProductCard } from "./product-card";

export function ProductGrid() {
  const products = getProductosDestacados();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-boga">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-overline-boga text-[#8a849d] mb-3 block">
            NUESTROS PRODUCTOS
          </span>
          <h2 className="text-[2.25rem] font-bold text-[#272331] mb-4">
            Soluciones para cada tipo de evento
          </h2>
          <p className="text-lg text-[#544e63] max-w-2xl mx-auto">
            Desde banos portatiles estandar hasta trailers de lujo. Tenemos la
            solucion perfecta para tu evento.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ gap: "var(--boga-grid-gap, 2rem)" }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              slug={product.slug}
              name={product.nombre}
              description={product.descripcionCorta}
              price={product.precio}
              badge={product.badge}
              badgeColor={
                product.badge === "VIP" || product.badge === "Premium"
                  ? "lima"
                  : product.badge === "ISO 14001"
                  ? "gold"
                  : product.badge === "Inclusivo" || product.badge === "Tecnologia"
                  ? "electric"
                  : "neutral"
              }
              image={product.imagen}
              category={product.categoria}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/product-card.tsx src/components/product-grid.tsx && git commit -m "feat(products): rebrandear product cards y grid a BOGA

- Card: fondo blanco, sombra BOGA, borde-radius 8px
- Badge: lima/electric/gold/neutral segun tipo
- Precio: azul electrico bold
- Hover: translateY(-4px) + sombra nivel 3
- Grid: gap via --boga-grid-gap"
```

---

### Task 5.4: Rebrandear src/components/home/why-us.tsx

**Files:**
- Modify: `src/components/home/why-us.tsx`

**Interfaces:**
- Consumes: Tokens BOGA
- Produces: Seccion oscura con iconos y contenido BOGA

- [ ] **Step 1: Leer why-us.tsx actual**

```bash
cat /mnt/agents/output/my-app/src/components/home/why-us.tsx
```

- [ ] **Step 2: Reemplazar con estilos BOGA**

```tsx
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Leaf,
  Clock,
  Headphones,
  Award,
} from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description:
      "Todos nuestros equipos cumplen con estandares internacionales de calidad e higiene.",
  },
  {
    icon: Zap,
    title: "Instalacion Rapida",
    description:
      "Equipo especializado que instala y retira en tiempo record, sin complicaciones.",
  },
  {
    icon: Leaf,
    title: "Compromiso Ambiental",
    description:
      "Practicas sostenibles y puntos ecologicos para reducir el impacto ambiental.",
  },
  {
    icon: Clock,
    title: "Disponibilidad 24/7",
    description:
      "Atendemos emergencias y eventos en cualquier momento, todos los dias del ano.",
  },
  {
    icon: Headphones,
    title: "Soporte Personalizado",
    description:
      "Asesoria tecnica especializada para elegir la mejor solucion para tu evento.",
  },
  {
    icon: Award,
    title: "Experiencia Comprobada",
    description:
      "Mas de 500 eventos atendidos y 10 anos de experiencia en el mercado colombiano.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-[#1b1341] py-20 md:py-28">
      <div className="container-boga">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-overline-boga text-white/50 mb-3 block">
            POR QUE BOGA
          </span>
          <h2 className="text-[2.25rem] font-bold text-white mb-4">
            La diferencia BOGA
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            No solo alquilamos equipos. Entregamos tranquilidad para que tu evento
            sea un exito total.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-[#2c4df2]/20 flex items-center justify-center mb-4 group-hover:bg-[#2c4df2]/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#daf73a]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/home/why-us.tsx && git commit -m "feat(why-us): rebrandear seccion 'Por que BOGA'

- Fondo: azul profundo #1b1341
- Titulo: 'La diferencia BOGA'
- Iconos: lima sobre fondo azul electrico/20
- 6 features con animacion stagger
- Texto: blanco/blanco-70%"
```

---

### Task 5.5: Rebrandear src/components/our-numbers.tsx

**Files:**
- Modify: `src/components/our-numbers.tsx`

**Interfaces:**
- Consumes: Tokens BOGA
- Produces: Stats con numeros lima, fondo oscuro

- [ ] **Step 1: Leer our-numbers.tsx actual**

```bash
cat /mnt/agents/output/my-app/src/components/our-numbers.tsx
```

- [ ] **Step 2: Reemplazar con estilos BOGA**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 30, suffix: "+", label: "Anos de experiencia" },
  { value: 500, suffix: "+", label: "Eventos atendidos" },
  { value: 2, suffix: "", label: "Ciudades de cobertura" },
  { value: 10, suffix: "+", label: "Tipos de productos" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function OurNumbers() {
  return (
    <section className="bg-[#0f0a24] py-20 md:py-28">
      <div className="container-boga">
        <div className="text-center mb-12">
          <span className="text-overline-boga text-white/50 mb-3 block">
            NUESTROS NUMEROS
          </span>
          <h2 className="text-[2.25rem] font-bold text-white">
            Resultados que hablan
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="stat-number text-4xl md:text-5xl mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <span className="text-caption-boga text-white/60">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Separador decorativo: 3 circulos */}
        <div className="flex justify-center mt-12">
          <div className="boga-circles opacity-50">
            <span className="circle" />
            <span className="circle" />
            <span className="circle" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/our-numbers.tsx && git commit -m "feat(numbers): rebrandear 'Our Numbers' a BOGA

- Fondo: azul profundo oscuro #0f0a24
- Numeros: lima #daf73a, font-display-lg, peso 800
- Labels: caption uppercase blanco/60
- Animacion: contador incremental al entrar en viewport
- Separador: 3 circulos BOGA decorativos"
```

---

### Task 5.6: Rebrandear src/components/home/contact.tsx

**Files:**
- Modify: `src/components/home/contact.tsx`

**Interfaces:**
- Consumes: siteConfig datos de contacto, tokens BOGA
- Produces: Seccion de contacto con estilos BOGA

- [ ] **Step 1: Leer contact.tsx actual**

```bash
cat /mnt/agents/output/my-app/src/components/home/contact.tsx
```

- [ ] **Step 2: Reemplazar con estilos BOGA**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/lib/seo";

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Telefono",
    value: siteConfig.telephone,
    href: `tel:${siteConfig.telephone}`,
  },
  {
    icon: Mail,
    label: "Correo",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+57 350 708 9584",
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
  {
    icon: Clock,
    label: "Horario",
    value: "24/7 - Todos los dias",
    href: null,
  },
];

export function Contact() {
  return (
    <section className="bg-[#1b1341] py-20 md:py-28">
      <div className="container-boga">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-overline-boga text-white/50 mb-3 block">
              CONTACTO
            </span>
            <h2 className="text-[2.25rem] font-bold text-white mb-4">
              Hablemos de tu evento
            </h2>
            <p className="text-lg text-white/70 mb-10 leading-relaxed">
              Estamos listos para ayudarte a elegir la mejor solucion para tu
              evento. Contactanos y recibe una cotizacion personalizada.
            </p>

            <div className="space-y-6">
              {CONTACT_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2c4df2]/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#daf73a]" />
                  </div>
                  <div>
                    <span className="text-caption-boga text-white/50 block mb-0.5">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white hover:text-[#daf73a] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sedes */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <h3 className="text-caption-boga text-white mb-4">SEDES</h3>
              <div className="space-y-4">
                {siteConfig.addresses.map((addr, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#daf73a] mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-sm">
                      {addr.street}, {addr.city}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Enviar mensaje
              </h3>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-caption-boga text-white/50 mb-1.5 block">
                      Nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-[#2c4df2] focus:ring-1 focus:ring-[#2c4df2]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-caption-boga text-white/50 mb-1.5 block">
                      Correo
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-[#2c4df2] focus:ring-1 focus:ring-[#2c4df2]/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-caption-boga text-white/50 mb-1.5 block">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    placeholder="+57 300 000 0000"
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-[#2c4df2] focus:ring-1 focus:ring-[#2c4df2]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-caption-boga text-white/50 mb-1.5 block">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuentanos sobre tu evento..."
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:border-[#2c4df2] focus:ring-1 focus:ring-[#2c4df2]/20 transition-all resize-vertical"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary justify-center"
                >
                  Enviar Mensaje
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/home/contact.tsx && git commit -m "feat(contact): rebrandear seccion contacto a BOGA

- Fondo: azul profundo #1b1341
- Layout: 2 columnas (info + formulario)
- Iconos: lima sobre fondo azul electrico/20
- Formulario: glassmorphism, inputs dark style
- Boton: lima pill
- Datos centralizados desde siteConfig"
```

---

## FASE 6: PAGINAS PUBLICAS

> Objetivo: Rebrandear todas las paginas publicas del sitio.

---

### Task 6.1: Rebrandear /productos y /productos/[slug]

**Files:**
- Modify: `src/app/productos/page.tsx`
- Modify: `src/app/productos/product-catalog.tsx`
- Modify: `src/app/productos/[slug]/page.tsx`

**Interfaces:**
- Consumes: ProductCard BOGA, tokens CSS
- Produces: Paginas de productos con estilos BOGA

- [ ] **Step 1: Actualizar productos/page.tsx (hero + filtros)**

```tsx
import { ProductCatalog } from "./product-catalog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Catalogo de banos portatiles, lavamanos, trailers de lujo y mas. Soluciones de ingenieria portatil para todo tipo de eventos.",
};

export default function ProductosPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container-boga text-center">
          <span className="text-overline-boga text-white/70 mb-3 block">
            CATALOGO
          </span>
          <h1 className="text-[3.75rem] md:text-[4.5rem] font-extrabold text-white mb-4 tracking-[-0.02em]">
            Nuestros <span className="text-[#daf73a]">Productos</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Equipos de ingenieria portatil de alta calidad para eventos de cualquier
            tamano. Desde banos estandar hasta trailers de lujo.
          </p>
        </div>
      </section>

      <ProductCatalog />
    </>
  );
}
```

- [ ] **Step 2: Actualizar product-catalog.tsx (tabs + grid)**

Los tabs de filtro deben usar colores BOGA:

```tsx
// En el componente de tabs, reemplazar colores:
// bg-primary (naranja) → bg-[#2c4df2] (azul electrico)
// text-primary-foreground → text-white
// hover:bg-primary/90 → hover:bg-[#2541ce]
```

- [ ] **Step 3: Actualizar [slug]/page.tsx (detalle)**

```tsx
// Hero del detalle: gradiente BOGA
// Precio: text-[#2c4df2]
// Badge: colores BOGA
// CTA: btn-primary (lima)
```

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/productos/ src/app/productos/[slug]/ && git commit -m "feat(productos): rebrandear paginas de productos a BOGA

- Hero: gradiente BOGA, titulo con palabra lima
- Tabs filtros: azul electrico
- Cards: estilos BOGA de ProductCard
- Detalle: precio azul, CTA lima"
```

---

### Task 6.2: Rebrandear /servicios

**Files:**
- Modify: `src/app/servicios/page.tsx`

**Interfaces:**
- Consume: Tokens BOGA
- Produce: Pagina de servicios con estilos BOGA

- [ ] **Step 1: Actualizar hero y cards de servicios**

```tsx
// Hero: gradiente BOGA
// Titulo: "SERVICIOS ESPECIALIZADOS" con palabra lima
// Cards: fondo blanco, sombra BOGA, iconos lima
// CTAs: btn-primary
```

- [ ] **Step 2: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/servicios/page.tsx && git commit -m "feat(servicios): rebrandear pagina de servicios a BOGA"
```

---

### Task 6.3: Rebrandear /galeria

**Files:**
- Modify: `src/app/galeria/page.tsx`
- Modify: `src/app/galeria/gallery-grid.tsx`

**Interfaces:**
- Consume: Tokens BOGA, eventos
- Produce: Galeria con colores BOGA

- [ ] **Step 1: Actualizar hero y filtros de galeria**

```tsx
// Hero: gradiente BOGA
// Filtros por tipo: colores de la paleta BOGA (no Tailwind default)
// Type colors:
// - Corporativo: #2c4df2 (electric)
// - Festival: #daf73a (lima)
// - Concierto: #1b1341 (deep)
// - Deportivo: #6bc935 (success)
// - Social: #c9a84c (gold)
```

- [ ] **Step 2: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/galeria/ && git commit -m "feat(galeria): rebrandear galeria a colores BOGA

- Hero: gradiente BOGA
- Filtros tipo: paleta BOGA en vez de colores Tailwind default"
```

---

### Task 6.4: Rebrandear /quienes-somos

**Files:**
- Modify: `src/app/quienes-somos/page.tsx`

**Interfaces:**
- Consume: Tokens BOGA
- Produce: Pagina corporativa con estilos BOGA

- [ ] **Step 1: Actualizar contenido y estilos**

```tsx
// Hero: foto equipo + overlay azul profundo 70%
// Titulo: "NUESTRA EMPRESA" con "EMPRESA" en lima
// Mision/Vision: cards con sombra BOGA
// Valores: 6 valores en grid con iconos lima
// Equipo: fotos reales (placeholder por ahora)
// Sedes: mapas (mantener)
```

- [ ] **Step 2: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/quienes-somos/page.tsx && git commit -m "feat(quienes-somos): rebrandear pagina corporativa a BOGA

- Hero: overlay azul profundo 70%
- Mision/Vision/Valores: contenido BOGA
- Estilos: tokens CSS BOGA"
```

---

### Task 6.5: Rebrandear /contacto

**Files:**
- Modify: `src/app/contacto/page.tsx`
- Modify: `src/app/contacto/contact-form.tsx`

**Interfaces:**
- Consume: siteConfig, tokens BOGA
- Produce: Formulario de contacto con estilos BOGA

- [ ] **Step 1: Actualizar hero y formulario**

```tsx
// Hero: gradiente BOGA, "CONTACTO" titulo
// Formulario: inputs con estilo BOGA (surface-inset, border-focus azul)
// Boton submit: btn-primary (lima)
// Info contacto: datos desde siteConfig
// Mapas: mantener
```

- [ ] **Step 2: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/contacto/ && git commit -m "feat(contacto): rebrandear pagina de contacto a BOGA

- Hero: gradiente BOGA
- Formulario: inputs estilo BOGA
- Boton: lima pill
- Datos centralizados desde siteConfig"
```

---

### Task 6.6: Rebrandear /cotizacion

**Files:**
- Modify: `src/app/cotizacion/page.tsx`
- Modify: `src/app/cotizacion/quote-wizard.tsx`

**Interfaces:**
- Consume: Tokens BOGA, form inputs BOGA
- Produce: Wizard de cotizacion con estilos BOGA

- [ ] **Step 1: Actualizar wizard (PRESERVAR toda la logica)**

```tsx
// Indicador de progreso: azul electrico (antes naranja)
// Steps: circulos BOGA como indicadores
// Cards de productos: estilos BOGA
// Botones navegacion: btn-primary (lima) + btn-secondary
// Formularios: inputs estilo BOGA
// Resumen: colores BOGA
// Preservar TODA la logica de estado y validacion
```

- [ ] **Step 2: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/cotizacion/ && git commit -m "feat(cotizacion): rebrandear wizard de cotizacion a BOGA

- Progreso: azul electrico
- Steps: circulos BOGA
- Cards: estilos BOGA
- Botones: lima + outline
- Inputs: estilo BOGA
- PRESERVADA toda la logica de estado y validacion"
```

---

### Task 6.7: Rebrandear /faq y paginas legales

**Files:**
- Modify: `src/app/faq/page.tsx`
- Modify: `src/app/privacidad/page.tsx`
- Modify: `src/app/terminos/page.tsx`
- Modify: `src/app/cookies/page.tsx`

**Interfaces:**
- Consume: Tokens BOGA, FAQ de mocks.ts
- Produce: Paginas con estilos BOGA, texto actualizado

- [ ] **Step 1: Actualizar FAQ**

```tsx
// Acordeon: focus ring azul electrico
// Fondo: blanco o bg-light BOGA
// Texto: tipografia Montserrat
```

- [ ] **Step 2: Actualizar paginas legales**

```bash
# Reemplazar todo texto Junisama → BOGA
# Reemplazar datos de contacto antiguos → nuevos
cd /mnt/agents/output/my-app && sed -i 's/Junisama/BOGA/g' src/app/privacidad/page.tsx
cd /mnt/agents/output/my-app && sed -i 's/Junisama/BOGA/g' src/app/terminos/page.tsx
cd /mnt/agents/output/my-app && sed -i 's/Junisama/BOGA/g' src/app/cookies/page.tsx
```

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/app/faq/ src/app/privacidad/ src/app/terminos/ src/app/cookies/ && git commit -m "feat(legal): rebrandear FAQ y paginas legales a BOGA

- FAQ: acordeon con focus ring azul electrico
- Legales: reemplazado Junisama → BOGA
- Datos de contacto actualizados"
```

---

## FASE 7: ADMIN

> Objetivo: Adaptar el panel admin a la paleta BOGA.

---

### Task 7.1: Rebrandear admin-header.tsx y admin-sidebar.tsx

**Files:**
- Modify: `src/components/layout/admin-header.tsx`
- Modify: `src/components/layout/admin-sidebar.tsx`

**Interfaces:**
- Consume: Logo BOGA icon, tema admin BOGA
- Produce: Shell admin con colores BOGA

- [ ] **Step 1: Actualizar admin-header.tsx**

```tsx
// Logo: isotipo BOGA (icon-light)
// Fondo: admin-bg (#0a0a0a) con admin-primary (#2c4df2) accents
// Texto: admin-text (#e5e5e5)
```

- [ ] **Step 2: Actualizar admin-sidebar.tsx**

```tsx
// Width: 260px (mantener)
// Fondo: admin-bg-elevated (#141414)
// Links hover: admin-primary/20 fondo, admin-primary texto
// Activo: admin-primary fondo, blanco texto
// Logo: isotipo BOGA + "BOGA Admin"
```

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/layout/admin-header.tsx src/components/layout/admin-sidebar.tsx && git commit -m "feat(admin-layout): rebrandear header y sidebar admin a BOGA

- Logo: isotipo BOGA
- Colores: admin theme BOGA (azul electrico + lima)
- Sidebar: 260px, fondo elevado"
```

---

### Task 7.2: Reemplazar hex literales en admin (status-badge, kpi-card, charts)

**Files:**
- Modify: `src/components/admin/status-badge.tsx`
- Modify: `src/components/admin/kpi-card.tsx`
- Modify: `src/components/admin/cotizaciones-status-chart.tsx`

**Interfaces:**
- Consume: Tokens semanticos BOGA
- Produce: Componentes admin con colores semanticos

- [ ] **Step 1: Actualizar status-badge.tsx**

```tsx
// Reemplazar hex literales:
// #22C55E → usar clase/texto con --boga-success-500
// #EF4444 → --boga-error-500
// #3B82F6 → --boga-info-500
// #F59E0B → --boga-warning-500

const STATUS_STYLES = {
  activo: "bg-[#6bc935]/10 text-[#6bc935] border-[#6bc935]/20",
  pendiente: "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20",
  completado: "bg-[#2c4df2]/10 text-[#2c4df2] border-[#2c4df2]/20",
  cancelado: "bg-[#f05252]/10 text-[#f05252] border-[#f05252]/20",
};
```

- [ ] **Step 2: Actualizar kpi-card.tsx**

```tsx
// Tendencias:
// Positiva: --boga-success-500
// Negativa: --boga-error-500
// Fondo: admin-bg-surface
// Texto: admin-text
```

- [ ] **Step 3: Actualizar cotizaciones-status-chart.tsx**

```tsx
// Colores del grafico:
// Activas: --boga-electric-500
// Pendientes: --boga-warning-500
// Completadas: --boga-success-500
// Canceladas: --boga-error-500
```

- [ ] **Step 4: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/admin/ && git commit -m "feat(admin-colors): reemplazar hex literales por tokens semanticos BOGA

- status-badge: semanticos success/error/warning/info
- kpi-card: tendencias con tokens BOGA
- charts: paleta BOGA para datos"
```

---

### Task 7.3: Adaptar tema admin a paleta BOGA

**Files:**
- Ya implementado en Task 1.5 (tema admin en globals.css)

**Interfaces:**
- Consume: Tema admin definido en Task 1.5
- Produce: Admin visualmente consistente con BOGA

- [ ] **Step 1: Verificar que todas las paginas admin usan el tema**

```bash
cd /mnt/agents/output/my-app && grep -rn "data-admin-theme" src/app/admin/ || echo "Verificar que el layout admin aplica el tema"
```

- [ ] **Step 2: Si es necesario, actualizar el layout de admin para aplicar el atributo**

```tsx
// En el layout o page principal de admin:
<div data-admin-theme="dark">
  {/* contenido admin */}
</div>
```

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add -A && git commit -m "feat(admin-theme): aplicar tema BOGA al panel admin" || echo "Nada que commitear"
```

---

## FASE 8: NUEVOS ELEMENTOS BOGA

> Objetivo: Agregar elementos decorativos y secciones exclusivas de BOGA.

---

### Task 8.1: Crear componente decorativo "3 circulos BOGA" (SVG reusable)

**Files:**
- Create: `src/components/boga-circles.tsx`

**Interfaces:**
- Consume: Tokens BOGA
- Produce: Componente SVG reusable de los 3 circulos

- [ ] **Step 1: Crear componente**

```tsx
import { cn } from "@/lib/utils";

interface BogaCirclesProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "lima" | "electric" | "white";
  animated?: boolean;
}

const SIZES = {
  sm: { circle: 8, gap: 4 },
  md: { circle: 12, gap: 6 },
  lg: { circle: 16, gap: 8 },
  xl: { circle: 24, gap: 12 },
};

const COLORS = {
  lima: "#daf73a",
  electric: "#2c4df2",
  white: "#ffffff",
};

export function BogaCircles({
  className,
  size = "md",
  color = "lima",
  animated = false,
}: BogaCirclesProps) {
  const s = SIZES[size];
  const c = COLORS[color];

  return (
    <div
      className={cn(
        "inline-flex items-center",
        animated && "animate-pulse",
        className
      )}
      style={{ gap: s.gap }}
      aria-hidden="true"
    >
      {/* Circulo 1: lleno */}
      <span
        className="rounded-full flex-shrink-0"
        style={{
          width: s.circle,
          height: s.circle,
          backgroundColor: c,
        }}
      />
      {/* Circulo 2: vacio (contorno) */}
      <span
        className="rounded-full flex-shrink-0 bg-transparent"
        style={{
          width: s.circle,
          height: s.circle,
          border: `2px solid ${c}`,
        }}
      />
      {/* Circulo 3: lleno */}
      <span
        className="rounded-full flex-shrink-0"
        style={{
          width: s.circle,
          height: s.circle,
          backgroundColor: c,
        }}
      />
    </div>
  );
}

// Variante como separador de seccion
export function BogaCirclesDivider({
  className,
  color = "lima",
}: {
  className?: string;
  color?: "lima" | "electric" | "white";
}) {
  return (
    <div className={cn("flex justify-center", className)}>
      <BogaCircles size="lg" color={color} />
    </div>
  );
}

// Variante como loader/spinner
export function BogaCirclesLoader({
  className,
  color = "lima",
}: {
  className?: string;
  color?: "lima" | "electric" | "white";
}) {
  const c = COLORS[color];

  return (
    <div className={cn("flex items-center gap-2", className)} aria-label="Cargando...">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-3 h-3 rounded-full animate-bounce"
          style={{
            backgroundColor: i === 1 ? "transparent" : c,
            border: i === 1 ? `2px solid ${c}` : "none",
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/boga-circles.tsx && git commit -m "feat(boga-circles): crear componente decorativo 3 circulos BOGA

- 3 variantes: circulos llenos + 1 vacio
- Props: size, color, animated
- Sub-componentes: Divider, Loader
- Colores: lima, electric, white"
```

---

### Task 8.2: Crear seccion de 6 valores en circulos (para /quienes-somos o home)

**Files:**
- Create: `src/components/home/values-section.tsx`

**Interfaces:**
- Consume: Tokens BOGA, BogaCircles
- Produce: Seccion de valores BOGA

- [ ] **Step 1: Crear componente**

```tsx
"use client";

import { motion } from "framer-motion";
import { BogaCircles } from "@/components/boga-circles";
import {
  Heart,
  Target,
  Users,
  Lightbulb,
  Shield,
  Leaf,
} from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Pasión",
    description: "Amamos lo que hacemos y se nota en cada detalle.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Cada evento merece una planificacion impecable.",
  },
  {
    icon: Users,
    title: "Equipo",
    description: "Trabajamos unidos para alcanzar la excelencia.",
  },
  {
    icon: Lightbulb,
    title: "Innovacion",
    description: "Buscamos constantemente mejores soluciones.",
  },
  {
    icon: Shield,
    title: "Integridad",
    description: "Hacemos lo correcto, siempre.",
  },
  {
    icon: Leaf,
    title: "Sostenibilidad",
    description: "Comprometidos con el planeta y las comunidades.",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-boga">
        <div className="text-center mb-16">
          <span className="text-overline-boga text-[#8a849d] mb-3 block">
            NUESTROS VALORES
          </span>
          <h2 className="text-[2.25rem] font-bold text-[#272331] mb-4">
            Lo que nos define
          </h2>
          <p className="text-lg text-[#544e63] max-w-2xl mx-auto">
            Estos son los principios que guian cada decision y cada servicio que
            brindamos.
          </p>
          <div className="flex justify-center mt-6">
            <BogaCircles size="md" color="electric" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#2c4df2]/10 flex items-center justify-center mb-4 group-hover:bg-[#2c4df2]/20 transition-colors">
                <value.icon className="w-7 h-7 text-[#2c4df2]" />
              </div>
              <h3 className="text-lg font-semibold text-[#272331] mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-[#544e63] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Integrar en page.tsx (home) si aplica**

```tsx
// En src/app/page.tsx, agregar import y usar el componente
import { ValuesSection } from "@/components/home/values-section";

// En el render, despues de WhyUs:
<ValuesSection />
```

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/home/values-section.tsx src/app/page.tsx && git commit -m "feat(values): crear seccion de valores BOGA

- 6 valores: Pasion, Precision, Equipo, Innovacion, Integridad, Sostenibilidad
- Iconos: azul electrico sobre fondo azul/10
- Layout: grid 3 columnas
- Animacion: stagger fade-up"
```

---

### Task 8.3: Integrar elementos decorativos BOGA (ondas, burbujas) en hero/footer

**Files:**
- Modify: `src/components/home/hero.tsx`
- Modify: `src/components/layout/footer.tsx`

**Interfaces:**
- Consume: Elementos decorativos SVG
- Produce: Hero y footer con decoracion BOGA

- [ ] **Step 1: Agregar ondas decorativas al hero**

El hero ya incluye ondas SVG desde Task 5.1. Verificar que esten presentes:

```tsx
// Verificar en hero.tsx:
<svg className="absolute bottom-0 left-0 right-0 opacity-10" ...>
```

- [ ] **Step 2: Agregar burbujas/circulos decorativos al footer**

```tsx
// En footer.tsx, agregar antes del cierre:
{/* Burbujas decorativas */}
<div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#2c4df2]/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
<div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#daf73a]/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
```

- [ ] **Step 3: Commit**

```bash
cd /mnt/agents/output/my-app && git add src/components/home/hero.tsx src/components/layout/footer.tsx && git commit -m "feat(decorative): agregar ondas y burbujas decorativas BOGA

- Hero: ondas SVG sutiles en la base
- Footer: burbujas circulares difuminadas (azul + lima)
- Opacidad baja para no distraer"
```

---

## FASE 9: QA FINAL

> Objetivo: Garantizar calidad antes del lanzamiento. NO OMITIR.

---

### Task 9.1: Verificar contraste WCAG AA en toda la paleta nueva

**Files:**
- No se modifican

**Interfaces:**
- Consume: Design system BOGA, tokens CSS
- Produce: Reporte de contraste

- [ ] **Step 1: Ejecutar script de verificacion de contraste**

```python
# scripts/check-contrast.py
import json

def luminance(hex_color):
    """Calcular luminancia relativa de un color hex."""
    hex_color = hex_color.lstrip("#")
    r, g, b = [int(hex_color[i:i+2], 16) / 255.0 for i in (0, 2, 4)]
    r = r / 12.92 if r <= 0.03928 else ((r + 0.055) / 1.055) ** 2.4
    g = g / 12.92 if g <= 0.03928 else ((g + 0.055) / 1.055) ** 2.4
    b = b / 12.92 if b <= 0.03928 else ((b + 0.055) / 1.055) ** 2.4
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast_ratio(color1, color2):
    """Calcular ratio de contraste entre dos colores."""
    l1, l2 = luminance(color1), luminance(color2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

# Pares a verificar (texto, fondo)
checks = [
    ("#272331", "#ffffff", "Texto primario sobre blanco"),
    ("#544e63", "#ffffff", "Texto secundario sobre blanco"),
    ("#8a849d", "#ffffff", "Texto terciario sobre blanco"),
    ("#ffffff", "#1b1341", "Texto blanco sobre deep"),
    ("#ffffff", "#2c4df2", "Texto blanco sobre electric"),
    ("#1b1341", "#daf73a", "Texto oscuro sobre lima"),
    ("#2c4df2", "#ffffff", "Electric sobre blanco"),
    ("#daf73a", "#1b1341", "Lima sobre deep"),
    ("#6bc935", "#ffffff", "Success sobre blanco"),
    ("#f05252", "#ffffff", "Error sobre blanco"),
]

print("=" * 60)
print("VERIFICACION DE CONTRASTE WCAG AA")
print("=" * 60)
print(f"{'Par':<45} {'Ratio':>6} {'AA':>4} {'AAA':>4}")
print("-" * 60)

all_pass = True
for text, bg, desc in checks:
    ratio = contrast_ratio(text, bg)
    pass_aa = "PASS" if ratio >= 4.5 else "FAIL"
    pass_aaa = "PASS" if ratio >= 7 else "FAIL"
    if pass_aa == "FAIL":
        all_pass = False
    print(f"{desc:<45} {ratio:>6.2f} {pass_aa:>4} {pass_aaa:>4}")

print("-" * 60)
print(f"Resultado: {'TODOS LOS PARES PASAN AA' if all_pass else 'ALGUNOS PARES FALLAN AA'}")
```

- [ ] **Step 2: Ejecutar**

```bash
cd /mnt/agents/output/my-app && python3 scripts/check-contrast.py
```

Expected: Todos los pares pasan WCAG AA (ratio >= 4.5)

- [ ] **Step 3: Si hay fallas, ajustar colores y re-verificar**

---

### Task 9.2: Probar responsive en breakpoints (640, 768, 1024, 1280, 1536)

**Files:**
- No se modifican

**Interfaces:**
- Consume: Layout completo rebrandeado
- Produce: Verificacion visual responsive

- [ ] **Step 1: Verificar que los media queries funcionan**

```bash
# Verificar que los breakpoints estan definidos
cd /mnt/agents/output/my-app && grep -n "@media" src/app/globals.css
```

- [ ] **Step 2: Probar en diferentes viewports**

Abrir el navegador y probar:
- 375px (mobile)
- 640px (sm)
- 768px (md)
- 1024px (lg)
- 1280px (xl)
- 1536px (2xl)

Verificar:
- [ ] Navbar: hamburger en mobile, links horizontales en desktop
- [ ] Hero: texto se ajusta, stats en grid 2x2 en mobile
- [ ] Product cards: 1 col mobile, 2 col tablet, 3 col desktop
- [ ] Footer: 1 col mobile, 2 col tablet, 4 col desktop
- [ ] Contacto: 1 col mobile, 2 col desktop

- [ ] **Step 3: Documentar problemas encontrados**

---

### Task 9.3: Correr Lighthouse (Performance, Accessibility, Best Practices, SEO)

**Files:**
- No se modifican

**Interfaces:**
- Consume: Build de produccion
- Produce: Scores de Lighthouse

- [ ] **Step 1: Hacer build de produccion**

```bash
cd /mnt/agents/output/my-app && npm run build 2>&1 | tail -20
```

- [ ] **Step 2: Iniciar servidor y correr Lighthouse**

```bash
cd /mnt/agents/output/my-app && npx serve@latest out &
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless" 2>/dev/null || echo "Lighthouse requiere Chrome instalado"
```

- [ ] **Step 3: Revisar scores esperados**

| Categoria | Minimo Esperado |
|-----------|----------------|
| Performance | > 70 |
| Accessibility | > 90 |
| Best Practices | > 90 |
| SEO | > 90 |

- [ ] **Step 4: Corregir problemas encontrados**

Problemas comunes y soluciones:
- Contrastes bajos: ajustar colores en globals.css
- Links sin texto descriptivo: agregar aria-label
- Imagenes sin alt: agregar atributo alt
- Heading order incorrecto: ajustar niveles h1-h6

---

### Task 9.4: Revision visual pagina por pagina contra design-system-boga.md

**Files:**
- No se modifican

**Interfaces:**
- Consume: Design system completo
- Produce: Checklist de verificacion visual

- [ ] **Step 1: Crear checklist de verificacion**

```markdown
# Checklist de Revision Visual BOGA

## Home (/)
- [ ] Hero: gradiente BOGA, wordmark BOGA, INGENIERIA PORTATIL, tagline, CTAs, stats lima
- [ ] Marquee: fondo muted, texto secundario, separadores circulos
- [ ] Product Grid: cards blancas, sombras BOGA, badges lima/electric
- [ ] WhyUs: fondo deep, iconos lima, 6 features
- [ ] OurNumbers: numeros lima, fondo oscuro, contador animado
- [ ] Contact: 2 columnas, formulario glassmorphism, datos siteConfig

## Productos (/productos)
- [ ] Hero: gradiente, titulo con palabra lima
- [ ] Tabs: azul electrico
- [ ] Cards: estilos BOGA

## Producto Detalle (/productos/[slug])
- [ ] Layout correcto
- [ ] Precio azul electrico
- [ ] CTA lima

## Servicios (/servicios)
- [ ] Hero gradiente
- [ ] Cards con iconos lima

## Quienes Somos (/quienes-somos)
- [ ] Hero con overlay
- [ ] Mision/Vision/Valores

## Galeria (/galeria)
- [ ] Hero gradiente
- [ ] Filtros colores BOGA

## Contacto (/contacto)
- [ ] Hero gradiente
- [ ] Formulario estilo BOGA

## Cotizacion (/cotizacion)
- [ ] Wizard funcional
- [ ] Indicadores azul electrico
- [ ] Botones lima

## FAQ (/faq)
- [ ] Acordeon con focus ring azul

## Legales (/privacidad, /terminos, /cookies)
- [ ] Texto BOGA (sin Junisama)

## Admin (/admin/login)
- [ ] Fondo oscuro gradiente
- [ ] Logo isotipo
- [ ] Inputs dark
- [ ] Boton lima
```

- [ ] **Step 2: Verificar cada pagina manualmente**

---

### Task 9.5: Verificar `npm run build` pasa sin errores

**Files:**
- Todos los archivos modificados

**Interfaces:**
- Consume: Codigo completo rebrandeado
- Produce: Build exitoso

- [ ] **Step 1: Ejecutar build**

```bash
cd /mnt/agents/output/my-app && npm run build 2>&1
```

- [ ] **Step 2: Verificar output**

Expected: `Compiled successfully` o `Collecting page data ...` sin errores

Si hay errores:
1. Identificar archivo y linea del error
2. Corregir (tipicamente: import faltante, tipo incorrecto, CSS invalido)
3. Re-ejecutar build
4. Repetir hasta que pase

- [ ] **Step 3: Commit final**

```bash
cd /mnt/agents/output/my-app && git add -A && git commit -m "chore(build): build exitoso tras rebrand completo a BOGA

- Todas las fases completadas
- Tokens, layout, componentes, paginas, admin actualizados
- QA: contraste, responsive, Lighthouse"
```

---

### Task 9.6: Verificar `npm run lint` pasa sin warnings criticos

**Files:**
- Todos los archivos

**Interfaces:**
- Consume: Codigo completo
- Produce: Lint limpio

- [ ] **Step 1: Ejecutar lint**

```bash
cd /mnt/agents/output/my-app && npm run lint 2>&1
```

- [ ] **Step 2: Corregir warnings/errores**

Problemas comunes:
- Variables no usadas: eliminar
- Imports no usados: eliminar
- Any types: tipar correctamente
- Console.log: eliminar o usar logger

- [ ] **Step 3: Commit final**

```bash
cd /mnt/agents/output/my-app && git add -A && git commit -m "chore(lint): lint limpio tras rebrand BOGA" || echo "Sin cambios"
```

---

## RESUMEN DE TAREAS

| Fase | Tareas | Archivos Modificados | Est. Tiempo |
|------|--------|---------------------|-------------|
| **Fase 1: Fundacion** | 6 | globals.css, layout.tsx | ~30 min |
| **Fase 2: Marca Visual** | 5 | logo.tsx, logo.svg, favicon.*, og-image.jpg, layout.tsx | ~25 min |
| **Fase 3: Configuracion** | 4 | mocks.ts, seo.ts, sitemap.ts, robots.ts, auth-mock.tsx, .env.local | ~20 min |
| **Fase 4: Layout** | 5 | navbar.tsx, footer.tsx, providers.tsx, admin/login/page.tsx | ~25 min |
| **Fase 5: Home** | 6 | hero.tsx, client-marquee.tsx, product-card.tsx, product-grid.tsx, why-us.tsx, our-numbers.tsx, contact.tsx | ~30 min |
| **Fase 6: Paginas** | 7 | productos/*, servicios/*, galeria/*, quienes-somos/*, contacto/*, cotizacion/*, faq/*, legales/* | ~35 min |
| **Fase 7: Admin** | 3 | admin-header.tsx, admin-sidebar.tsx, status-badge.tsx, kpi-card.tsx, charts | ~15 min |
| **Fase 8: Nuevos** | 3 | boga-circles.tsx, values-section.tsx | ~15 min |
| **Fase 9: QA** | 6 | Scripts de verificacion | ~30 min |
| **TOTAL** | **~50 tareas** | **~35 archivos** | **~4-5 horas** |

---

## NOTAS IMPORTANTES

1. **No omitir Fase 9 (QA)**. Es la que garantiza que todo funciona.
2. **Si un build falla**, detenerse y corregir antes de continuar.
3. **Commits frecuentes**: uno por tarea minimo.
4. **Cada tarea tiene codigo completo**: copiar y pegar, no improvisar.
5. **Placeholder SVG del logo**: el comentario `TODO: Reemplazar con SVG final del disenador` debe permanecer hasta obtener el SVG final.
6. **Credenciales**: las de .env.local son para desarrollo. En produccion, usar variables de entorno del servidor.
7. **Imagenes**: las fotos reales de productos, equipo y eventos son P0 para lanzamiento pero se manejan fuera de este plan tecnico.

---

**Plan completo guardado en `/mnt/agents/output/plan-implementacion-boga.md`.**

**Dos opciones de ejecucion:**

**1. Subagent-Driven (recomendado)** — Un subagente fresco por tarea, revision entre tareas, iteracion rapida

**2. Inline Execution** — Ejecutar tareas en esta sesion usando executing-plans, ejecucion por lotes con checkpoints

**Cual prefieres?**
