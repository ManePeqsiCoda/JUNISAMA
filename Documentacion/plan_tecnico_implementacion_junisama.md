# Plan Tecnico de Implementacion Completo — Proyecto Junisama

## Documento de trabajo para el equipo de desarrollo frontend
**Prototipo objetivo:** https://junisama-seven.vercel.app  
**Referencia produccion:** https://junisama.com.co  
**Fecha:** Julio 2025  
**Version:** 1.0 — Fases 4-6 Integradas

---

## 1. RESUMEN DE CAMBIOS REQUERIDOS POR ARCHIVO

### 1.1 Tabla maestra de modificaciones

| Archivo | Cambios | Prioridad |
|---------|---------|-----------|
| `tailwind.config.ts` | Extender con tokens de color, tipografia, espaciado y animaciones del sistema de diseno | P0 |
| `app/globals.css` | Agregar CSS custom properties, imports de Google Fonts, keyframes para marquee y pulse-emergency | P0 |
| `app/layout.tsx` | Fix title template duplicado `\| Junisama \| Junisama` → `\| Junisama`, fix canonical URL a .com.co, fix og:url, og:image | P0 |
| `components/header.tsx` | Cambiar logo UVINERIL → JUNISAMA, integrar boton EMERGENCIA, fix dropdown Productos, sticky shadow | P0 |
| `components/hero.tsx` | Fix boton "Ver productos" (texto invisible), badge ISO con numero, stats bar redisenada, fondo real + overlay | P0 |
| `components/product-grid.tsx` | Cards con fotografia real (aspect-ratio 4:3), hover effects, specs tecnicos inline, grid responsive 3/2/1 | P0 |
| `app/productos/page.tsx` | Misma logica de cards que product-grid, layout de galeria de productos | P0 |
| `components/client-marquee.tsx` | **NUEVO** — Marquee infinito CSS con logos monocromos, filtros por tipo de evento | P0 |
| `data/events.ts` | **NUEVO** — Dataset completo de 30+ eventos reales verificables del sitio de produccion | P0 |
| `components/testimonials.tsx` | Eliminar testimonios ficticios, reemplazar por seccion "Nuestros Numeros" / "Proceso de Trabajo" | P0 |
| `app/cotizacion/page.tsx` | Fix error "Invalid input: expected string, received undefined", stepper visual mejorado, validacion inline | P0 |
| `components/quote-form.tsx` | Fix schema validation Zod, mensajes de error amigables, labels correctos | P0 |
| `app/servicios/page.tsx` | Fix botones "Solicitar info" sin enlace → enlace a /cotizacion para todos los servicios | P0 |
| `components/footer.tsx` | Logo correcto JUNISAMA, copyright 2025, ISO badge con numero, sedes con direcciones | P0 |
| `app/admin/login/page.tsx` | Eliminar credenciales expuestas del DOM, enlace discreto desde footer | P0 |
| `components/admin-link.tsx` | **NUEVO** — Componente de acceso discreto al admin en footer | P1 |
| `app/page.tsx` | Integrar nuevos componentes (client-marquee, testimonials redisenado) | P0 |
| `components/gallery-grid.tsx` | Reemplazar eventos ficticios con eventos reales, fix imagenes rotas | P0 |
| `app/galeria/page.tsx` | Usar datos reales de events.ts, filtros funcionales | P0 |
| `next.config.js` | Agregar dominios de imagenes permitidas para fotos de productos y eventos | P1 |

---

## 2. SISTEMA DE DISENO — CSS/TAILWIND CONFIG

### 2.1 Extension de tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // === Primary — Naranja Junisama ===
        primary: {
          50:  "#FEF3EC",
          100: "#FDE0D0",
          200: "#FBC0A1",
          300: "#F99F72",
          400: "#F77F43",
          500: "#E85D24", // Token principal
          600: "#D14D18",
          700: "#BA3D12",
          800: "#A32D0C",
          900: "#8C1D06",
        },
        // === Secondary — Azul oscuro industrial ===
        secondary: {
          50:  "#F0F2F5",
          100: "#D9DEE5",
          200: "#B3BCCB",
          300: "#8D9BB1",
          400: "#677A97",
          500: "#415A7D",
          600: "#2A3E5C",
          700: "#1C2D45",
          800: "#0F1923", // Token principal
          900: "#0A1018",
        },
        // === Accent Gold — Dorado premium ===
        "accent-gold": {
          50:  "#FBF7ED",
          100: "#F5EBCE",
          200: "#EBD79D",
          300: "#E1C36C",
          400: "#D7AF3B",
          500: "#C9A84C", // Token principal
          600: "#B8983D",
          700: "#A7882E",
          800: "#96781F",
          900: "#856810",
        },
        // === Emergency — Rojo boton emergencia ===
        emergency: {
          50:  "#FEF2F2",
          100: "#FECACA",
          200: "#FCA5A5",
          300: "#F87171",
          400: "#EF4444",
          500: "#DC2626", // Token principal
          600: "#B91C1C",
          700: "#991B1B",
          800: "#7F1D1D",
          900: "#450A0A",
        },
        // === Neutral — Grises ===
        neutral: {
          50:  "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      fontSize: {
        // Escala tipografica basada en 8px
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],   // 72px
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],  // 60px
        "display-md": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],    // 48px
        "heading-lg": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],   // 36px
        "heading-md": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "600" }],   // 24px
        "heading-sm": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],                               // 20px
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],                                 // 18px
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],                                     // 16px
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],                                 // 14px
        "caption": ["0.75rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.05em" }],        // 12px
      },
      spacing: {
        // Base 8px
        "space-1": "0.5rem",   // 8px
        "space-2": "1rem",     // 16px
        "space-3": "1.5rem",   // 24px
        "space-4": "2rem",     // 32px
        "space-5": "2.5rem",   // 40px
        "space-6": "3rem",     // 48px
        "space-8": "4rem",     // 64px
        "space-10": "5rem",    // 80px
        "space-12": "6rem",    // 96px
        "space-16": "8rem",    // 128px
        "space-20": "10rem",   // 160px
      },
      maxWidth: {
        container: "1280px",
        "container-sm": "768px",
        "container-md": "1024px",
      },
      borderRadius: {
        pill: "9999px",
        card: "16px",
        badge: "8px",
      },
      animation: {
        "pulse-emergency": "pulse-emergency 3s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
      },
      keyframes: {
        "pulse-emergency": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(220, 38, 38, 0.7)" },
          "50%": { boxShadow: "0 0 0 12px rgba(220, 38, 38, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
```

### 2.2 CSS Base — app/globals.css

```css
/* ============================================================
   SISTEMA DE DISENO JUNISAMA — CUSTOM PROPERTIES + BASE
   ============================================================ */

/* --- Google Fonts --- */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* --- CSS Custom Properties --- */
:root {
  /* Paleta principal */
  --color-primary-500: #E85D24;
  --color-primary-600: #D14D18;
  
  /* Paleta secundaria */
  --color-secondary-800: #0F1923;
  --color-secondary-900: #0A1018;
  
  /* Accent dorado */
  --color-accent-gold-500: #C9A84C;
  --color-accent-gold-600: #B8983D;
  
  /* Emergency */
  --color-emergency-500: #DC2626;
  --color-emergency-600: #B91C1C;
  
  /* Fuentes */
  --font-primary: 'Outfit', sans-serif;
  --font-secondary: 'Space Grotesk', sans-serif;
  
  /* Espaciado */
  --container-max: 1280px;
  --container-padding: 1.5rem;
  
  /* Header */
  --header-height: 72px;
  --header-height-mobile: 64px;
  
  /* Transiciones */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* --- Reset y Base --- */
@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-primary);
    color: #0F1923;
    background-color: #FAFAFA;
    line-height: 1.6;
  }

  /* Tipografia de encabezados */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-primary);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--color-secondary-800);
  }

  /* Enlaces */
  a {
    color: inherit;
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  /* Foco visible para accesibilidad */
  :focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Skip link */
  .skip-link {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-secondary-800);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0 0 8px 8px;
    z-index: 9999;
    font-weight: 500;
    transition: top 200ms ease;
  }

  .skip-link:focus {
    top: 0;
  }
}

/* --- Utilidades del Sistema de Diseno --- */
@layer components {
  /* Contenedor principal */
  .container-junisama {
    width: 100%;
    max-width: var(--container-max);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--container-padding);
    padding-right: var(--container-padding);
  }

  @media (min-width: 768px) {
    .container-junisama {
      --container-padding: 2rem;
    }
  }

  @media (min-width: 1024px) {
    .container-junisama {
      --container-padding: 3rem;
    }
  }

  /* Badge ISO */
  .badge-iso {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(201, 168, 76, 0.12);
    border: 1px solid rgba(201, 168, 76, 0.3);
    border-radius: 9999px;
    font-family: var(--font-secondary);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--color-accent-gold-500);
  }

  /* Boton primario */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background-color: var(--color-primary-500);
    color: white;
    font-family: var(--font-primary);
    font-weight: 600;
    font-size: 0.9375rem;
    border-radius: 9999px;
    transition: all var(--transition-base);
    border: none;
    cursor: pointer;
  }

  .btn-primary:hover {
    background-color: var(--color-primary-600);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(232, 93, 36, 0.3);
  }

  .btn-primary:active {
    transform: translateY(0);
  }

  .btn-primary:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  /* Boton secundario (outline) */
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background-color: transparent;
    color: white;
    font-family: var(--font-primary);
    font-weight: 600;
    font-size: 0.9375rem;
    border-radius: 9999px;
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    transition: all var(--transition-base);
    cursor: pointer;
  }

  .btn-secondary:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
  }

  /* Boton EMERGENCIA */
  .btn-emergency {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    background-color: var(--color-emergency-500);
    color: white;
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    animation: pulse-emergency 3s ease-in-out infinite;
    transition: background-color var(--transition-fast);
  }

  .btn-emergency:hover {
    background-color: var(--color-emergency-600);
  }

  .btn-emergency:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  /* Card de producto */
  .card-product {
    position: relative;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #E5E5E5;
    transition: all var(--transition-slow);
  }

  .card-product:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(15, 25, 35, 0.1);
    border-color: transparent;
  }

  .card-product__image {
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: linear-gradient(135deg, #F5F5F5 0%, #E5E5E5 100%);
  }

  .card-product__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  .card-product:hover .card-product__image img {
    transform: scale(1.05);
  }

  /* Stats number (dorado) */
  .stat-number {
    font-family: var(--font-secondary);
    font-weight: 700;
    font-size: 2.25rem;
    line-height: 1;
    color: var(--color-accent-gold-500);
  }

  @media (min-width: 768px) {
    .stat-number {
      font-size: 3rem;
    }
  }

  /* Marquee container */
  .marquee-container {
    overflow: hidden;
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
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 40s linear infinite;
  }

  .marquee-track:hover {
    animation-play-state: paused;
  }
}

/* --- Keyframes adicionales --- */
@keyframes pulse-emergency {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(220, 38, 38, 0);
  }
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## 3. HEADER — Cambios Tecnicos

### 3.1 Logo UVINERIL → JUNISAMA

**Archivo:** `components/header.tsx`  
**Problema:** El logo actual dice "UVINERIL" en lugar de "JUNISAMA".  
**Solucion:** Reemplazar el texto/logo por el SVG oficial de Junisama.

```tsx
// REEMPLAZAR el logo actual por:
const JunisamaLogo = () => (
  <Link href="/" className="flex items-center gap-2 group" aria-label="Junisama - Inicio">
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      {/* Icono geometrico estilizado — triangulo/montana (referencia sitio produccion) */}
      <rect width="40" height="40" rx="8" fill="#0F1923" />
      <path
        d="M20 8L32 32H8L20 8Z"
        fill="#E85D24"
      />
      <path
        d="M20 14L28 30H12L20 14Z"
        fill="#C9A84C"
      />
    </svg>
    <div className="flex flex-col">
      <span className="font-outfit font-bold text-lg leading-tight tracking-tight text-secondary-800">
        JUNISAMA
      </span>
      <span className="font-space-grotesk text-[0.6rem] leading-tight tracking-[0.12em] text-neutral-500 uppercase">
        Inversiones S.A.S
      </span>
    </div>
  </Link>
);
```

### 3.2 Boton EMERGENCIA — Implementacion completa

```tsx
// Agregar en el header, al lado del boton COTIZAR:

import { Phone } from "lucide-react"; // o el icono que use el proyecto

const EmergencyButton = () => {
  const handleEmergencyCall = () => {
    window.location.href = "tel:+573507089584";
  };

  return (
    <button
      onClick={handleEmergencyCall}
      className="btn-emergency hidden md:inline-flex"
      aria-label="Llamar a linea de emergencia"
      title="Emergencia: +57 350 708 9584"
    >
      <Phone className="w-4 h-4" aria-hidden="true" />
      <span>EMERGENCIA</span>
    </button>
  );
};
```

**Comportamiento responsive:**
- Desktop (>=768px): Boton visible en header con texto "EMERGENCIA"
- Mobile (<768px): Boton se reemplaza por icono de telefono rojo flotante en bottom-right o se integra en menu hamburguesa

### 3.3 Dropdown Productos — Fix

```tsx
// El dropdown de Productos debe desplegar:
const productLinks = [
  { label: "Baños Portátiles VIP", href: "/productos/bano-vip" },
  { label: "Baños Portátiles Estándar", href: "/productos/bano-estandar" },
  { label: "Baños para Discapacitados", href: "/productos/discapacitados" },
  { label: "Baños Portátiles Eléctricos", href: "/productos/electricos" },
  { label: "Lavamanos Aquastand y Aquapop", href: "/productos/lavamanos" },
  { label: "Tráiler de Lujo", href: "/productos/trailer-lujo" },
  { label: "Servicio de Operarios", href: "/productos/operarios" },
  { label: "Puntos Ecológicos", href: "/productos/puntos-ecologicos" },
];

// Implementacion del dropdown con accesibilidad:
const ProductDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tecla Escape para cerrar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Productos
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-50"
          role="menu"
        >
          {productLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-500 transition-colors"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
```

### 3.4 Navegacion sticky con sombra en scroll

```tsx
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white"
      }`}
      style={{ height: "var(--header-height)" }}
    >
      <div className="container-junisama h-full flex items-center justify-between">
        <JunisamaLogo />
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegacion principal">
          <Link href="/" className="nav-link">Inicio</Link>
          <ProductDropdown />
          <Link href="/servicios" className="nav-link">Servicios</Link>
          <Link href="/galeria" className="nav-link">Galeria</Link>
          <Link href="/quienes-somos" className="nav-link">Quienes Somos</Link>
          <Link href="/contacto" className="nav-link">Contacto</Link>
        </nav>
        <div className="flex items-center gap-3">
          <EmergencyButton />
          <Link href="/cotizacion" className="btn-primary hidden md:inline-flex text-sm py-2 px-5">
            Cotizar
          </Link>
          {/* Mobile menu toggle */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
```

---

## 4. HERO — Cambios Tecnicos

### 4.1 Fix boton "Ver productos" (texto invisible)

**Problema:** El boton "Ver productos" tiene texto blanco sobre fondo blanco.  
**Archivo:** `components/hero.tsx`

```tsx
// El boton secundario en el hero DEBE tener borde visible sobre el fondo oscuro.
// Si el hero tiene overlay oscuro, el boton blanco/borde es correcto.
// Si el hero NO tiene overlay oscuro, cambiar a:

<Link href="/productos" className="btn-secondary">
  Ver productos
</Link>

// NOTA: Verificar que el hero tenga fondo oscuro (imagen/video con overlay).
// Si no es asi, el btn-secondary necesita color de texto oscuro:

const btnSecondaryHero = isDarkBg
  ? "btn-secondary"                                    // texto blanco, borde blanco
  : "btn-secondary border-secondary-800 text-secondary-800 hover:bg-secondary-800/5"; // texto oscuro
```

### 4.2 Badge ISO con numero de certificado

```tsx
// El badge ISO debe mostrar el numero de certificado si esta disponible,
// o simplemente "ISO 14001" sin "Certificado" si no se tiene el numero.

<div className="badge-iso">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
  <span>ISO 14001 Certificado</span>
  {/* Si se tiene numero de certificado, descomentar: */}
  {/* <span className="text-neutral-400 ml-1">· N. ES024128-1</span> */}
</div>
```

**Nota:** Si no se dispone del numero real de certificado ISO, usar solo "ISO 14001 Certificado" sin numero ficticio.

### 4.3 Stats bar redisenada con numeros en dorado

```tsx
const stats = [
  { value: "500+", label: "Eventos completados" },
  { value: "24/7", label: "Soporte técnico" },
  { value: "99.9%", label: "Uptime garantizado" },
  { value: "10+", label: "Años experiencia" },
];

const StatsBar = () => (
  <div className="w-full max-w-4xl mx-auto mt-12">
    <div className="bg-secondary-800/60 backdrop-blur-sm rounded-2xl border border-white/10 px-6 py-8 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="stat-number">{stat.value}</div>
            <div className="mt-2 text-xs md:text-sm font-medium text-neutral-400 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
```

### 4.4 Fondo con imagen/video real + overlay oscuro

```tsx
const Hero = () => {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Seccion principal"
    >
      {/* Fondo con imagen real de infraestructura sanitaria */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={85}
          aria-hidden="true"
        />
        {/* Overlay oscuro multi-capas */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/80 via-secondary-900/70 to-secondary-900/90" />
        {/* Overlay con pattern sutil */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container-junisama text-center py-24">
        <BadgeISO />
        <h1 className="mt-6 font-outfit text-display-md md:text-display-lg text-white max-w-4xl mx-auto">
          Infraestructura Sanitaria{" "}
          <span className="text-primary-500">Industrial</span>
        </h1>
        <p className="mt-6 text-body-lg text-neutral-300 max-w-2xl mx-auto">
          Soluciones robustas y confiables para eventos de gran escala.
          Tecnología avanzada, operación 24/7 y cumplimiento normativo garantizado.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/cotizacion" className="btn-primary">
            <CircleDot className="w-5 h-5" aria-hidden="true" />
            Solicitar presupuesto a la medida
          </Link>
          <Link href="/servicios" className="btn-secondary">
            <LayoutGrid className="w-5 h-5" aria-hidden="true" />
            Ver servicios
          </Link>
        </div>
        <StatsBar />
      </div>
    </section>
  );
};
```

---

## 5. PRODUCTOS — Cambios Tecnicos

### 5.1 Cards redisenadas con fotografia real

```tsx
// Archivo: components/product-card.tsx (o similar)

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  badge?: string;
  specs: { label: string; value: string }[];
  href: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  image,
  badge,
  specs,
  href,
}) => (
  <Link href={href} className="card-product group block">
    {/* Imagen con aspect ratio 4:3 */}
    <div className="card-product__image relative">
      <Image
        src={image}
        alt={`Fotografia de ${name}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Badge flotante */}
      {badge && (
        <span className="absolute top-4 left-4 px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
          {badge}
        </span>
      )}
      {/* Overlay en hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Contenido */}
    <div className="p-6">
      <h3 className="font-outfit text-heading-sm text-secondary-800 group-hover:text-primary-500 transition-colors">
        {name}
      </h3>
      <p className="mt-2 text-body-sm text-neutral-500 line-clamp-2">
        {description}
      </p>

      {/* Specs técnicos inline */}
      <div className="mt-4 flex flex-wrap gap-2">
        {specs.map((spec) => (
          <span
            key={spec.label}
            className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md"
          >
            <Check className="w-3 h-3 text-primary-500" aria-hidden="true" />
            {spec.value}
          </span>
        ))}
      </div>

      <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-500 group-hover:gap-2 transition-all">
        Ver más
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </div>
    </div>
  </Link>
);
```

### 5.2 Grid responsive (3/2/1 columnas)

```tsx
// Archivo: components/product-grid.tsx

const ProductGrid = () => {
  const products = [
    {
      name: "Baño Portátil VIP",
      description: "Unidad premium con acabados de lujo para eventos exclusivos.",
      image: "/images/products/bano-vip.jpg",
      badge: "Premium",
      specs: [
        { label: "capacidad", value: "Hasta 200 usos" },
        { label: "material", value: "Acero inoxidable" },
        { label: "extras", value: "Espejo, lavamanos" },
      ],
      href: "/productos/bano-vip",
    },
    {
      name: "Baño Portátil Estándar",
      description: "Solución práctica para obras y eventos masivos.",
      image: "/images/products/bano-estandar.jpg",
      badge: "Más popular",
      specs: [
        { label: "capacidad", value: "Hasta 150 usos" },
        { label: "material", value: "Polietileno HD" },
        { label: "extras", value: "Ventilación forzada" },
      ],
      href: "/productos/bano-estandar",
    },
    {
      name: "Tráiler de Lujo",
      description: "Múltiples cabinas climatizadas para grandes eventos.",
      image: "/images/products/trailer-lujo.jpg",
      badge: "Alto volumen",
      specs: [
        { label: "capacidad", value: "Hasta 500 usos" },
        { label: "climatizacion", value: "A/C incluido" },
        { label: "cabinas", value: "4-8 cabinas" },
      ],
      href: "/productos/trailer-lujo",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-neutral-50" aria-labelledby="products-heading">
      <div className="container-junisama">
        <div className="text-center mb-16">
          <span className="badge-iso mb-4 inline-block">Nuestras soluciones</span>
          <h2 id="products-heading" className="font-outfit text-heading-lg md:text-display-md text-secondary-800">
            Equipos sanitarios portátiles para todo tipo de evento
          </h2>
        </div>

        {/* Grid responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.href} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
```

### 5.3 Lista completa de productos con imagenes reales requeridas

| Producto | Slug | Imagen requerida |
|----------|------|-----------------|
| Baño Portátil VIP | `bano-vip` | `/images/products/bano-vip.jpg` |
| Baño Portátil Estándar | `bano-estandar` | `/images/products/bano-estandar.jpg` |
| Baños para Discapacitados | `discapacitados` | `/images/products/discapacitados.jpg` |
| Baños Portátiles Eléctricos | `electricos` | `/images/products/electricos.jpg` |
| Lavamanos Aquastand y Aquapop | `lavamanos` | `/images/products/lavamanos.jpg` |
| Tráiler de Lujo | `trailer-lujo` | `/images/products/trailer-lujo.jpg` |
| Servicio de Operarios | `operarios` | `/images/products/operarios.jpg` |
| Puntos Ecológicos | `puntos-ecologicos` | `/images/products/puntos-ecologicos.jpg` |

**Instrucciones para el equipo:** Las imagenes deben ser fotografías reales de los productos de Junisama, minimo 800x600px, optimizadas WebP con fallback JPG.

---

## 6. SECCION CLIENTES/EVENTOS — Implementacion nueva

### 6.1 Dataset de eventos reales — data/events.ts

```typescript
// Archivo: data/events.ts

export interface Event {
  id: string;
  name: string;
  years: number[];
  type: "festival" | "concierto" | "feria" | "corporativo" | "privado";
  highlighted?: boolean;
}

export const events: Event[] = [
  // 2025
  { id: "alvaro-diaz-2025", name: "Alvaro Díaz", years: [2025], type: "concierto", highlighted: true },
  { id: "andme-2025", name: "&ME", years: [2025], type: "concierto", highlighted: true },
  { id: "core-2025", name: "CORE", years: [2025, 2024], type: "festival", highlighted: true },
  { id: "feria-manizales-2025", name: "Feria de Manizales", years: [2025], type: "feria", highlighted: true },
  { id: "feria-flores-2025", name: "Feria de las Flores", years: [2025, 2024, 2023, 2022, 2021], type: "feria", highlighted: true },
  { id: "rancheton-2024", name: "RANCHETON ARENA MIX", years: [2024], type: "concierto" },
  { id: "doom-2024", name: "DOOM", years: [2024], type: "concierto" },
  { id: "carl-cox-2024", name: "Carl Cox", years: [2024], type: "concierto", highlighted: true },
  { id: "la-solar-2024", name: "La Solar", years: [2024], type: "concierto", highlighted: true },
  // 2023
  { id: "ritvales-2023", name: "RITVALES", years: [2023], type: "festival" },
  { id: "jazz-al-parque-2023", name: "JAZZ al Parque", years: [2023, 2022, 2019], type: "festival" },
  { id: "f-air-2023", name: "F-AIR Colombia", years: [2023], type: "feria" },
  { id: "joropo-al-parque-2023", name: "Joropo al Parque", years: [2023], type: "festival" },
  { id: "salsa-al-parque-2023", name: "Salsa al Parque", years: [2023, 2022, 2019], type: "festival" },
  // 2022
  { id: "rock-al-parque-2022", name: "Rock al Parque", years: [2022, 2019], type: "festival", highlighted: true },
  { id: "expo-cundinamarca-2022", name: "EXPO Cundinamarca", years: [2022], type: "feria" },
  { id: "hip-hop-al-parque-2022", name: "Hip Hop al Parque", years: [2022, 2019], type: "festival" },
  { id: "desfile-autos-clasicos-2022", name: "Desfile Autos Clásicos", years: [2022], type: "privado" },
  { id: "alejandro-sanz-2022", name: "La Gira Alejandro Sanz", years: [2022], type: "concierto", highlighted: true },
  // 2020
  { id: "soda-stereo-2020", name: "SODA STEREO — Gracias Totales", years: [2020], type: "concierto", highlighted: true },
  // 2019
  { id: "beyond-wonderland-2019", name: "Beyond Wonderland", years: [2019], type: "festival" },
  { id: "foo-fighters-2019", name: "FOO FIGHTERS", years: [2019], type: "concierto", highlighted: true },
  { id: "festival-tatacoa-2019", name: "Festival Tatacoa", years: [2019], type: "festival" },
  { id: "picnic-andres-2019", name: "Picnic de Andrés", years: [2019, 2018, 2017], type: "privado" },
  { id: "colombia-al-parque-2019", name: "Colombia al Parque", years: [2019], type: "festival" },
  { id: "festival-verano-2019", name: "Festival de Verano Bogotá", years: [2019, 2017, 2016, 2015], type: "festival" },
  { id: "luis-miguel-2019", name: "Luis Miguel — México por Siempre", years: [2019], type: "concierto", highlighted: true },
  // 2018
  { id: "stereo-picnic-2018", name: "STEREO PICNIC", years: [2018], type: "festival", highlighted: true },
  { id: "i-love-bogota-2018", name: "I Love Bogotá", years: [2018], type: "festival" },
  { id: "shakira-2018", name: "Shakira — El Dorado World Tour", years: [2018], type: "concierto", highlighted: true },
  { id: "be-you-fest-2018", name: "Festival Be You Fest", years: [2018], type: "festival" },
  // 2017
  { id: "papa-francisco-2017", name: "Visita del Papa Francisco", years: [2017], type: "corporativo", highlighted: true },
  { id: "jamming-summer-2017", name: "Jamming Summer Fest", years: [2017], type: "festival" },
];

export const eventTypeLabels: Record<string, string> = {
  festival: "Festival",
  concierto: "Concierto",
  feria: "Feria",
  corporativo: "Corporativo",
  privado: "Privado",
};

export const eventYears = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
```

### 6.2 Marquee infinito CSS — components/client-marquee.tsx

```tsx
"use client";

import { events, eventTypeLabels } from "@/data/events";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ClientMarqueeProps {
  filterType?: string;
  filterYear?: number;
}

export const ClientMarquee = ({ filterType, filterYear }: ClientMarqueeProps) => {
  const filtered = events.filter((e) => {
    if (filterType && e.type !== filterType) return false;
    if (filterYear && !e.years.includes(filterYear)) return false;
    return true;
  });

  // Duplicar para efecto infinito sin gap visual
  const duplicated = [...filtered, ...filtered];

  return (
    <section className="py-16 md:py-24 bg-secondary-800 overflow-hidden" aria-labelledby="clients-heading">
      <div className="container-junisama mb-12 text-center">
        <span className="badge-iso mb-4 inline-block">Empresas y eventos que han confiado en nosotros</span>
        <h2 id="clients-heading" className="font-outfit text-heading-lg md:text-display-md text-white">
          Respaldo de las principales organizaciones del país
        </h2>
      </div>

      {/* Marquee Track 1 — izquierda a derecha */}
      <div className="marquee-container mb-6">
        <div className="marquee-track">
          {duplicated.map((event, i) => (
            <EventPill key={`${event.id}-${i}`} event={event} />
          ))}
        </div>
      </div>

      {/* Marquee Track 2 — derecha a izquierda (reversa) */}
      <div className="marquee-container">
        <div
          className="flex w-max"
          style={{ animation: "marquee-reverse 45s linear infinite" }}
        >
          {[...duplicated].reverse().map((event, i) => (
            <EventPill key={`${event.id}-rev-${i}`} event={event} variant="outline" />
          ))}
        </div>
      </div>
    </section>
  );
};

const EventPill = ({
  event,
  variant = "filled",
}: {
  event: (typeof events)[0];
  variant?: "filled" | "outline";
}) => (
  <div
    className={cn(
      "flex-shrink-0 mx-3 px-6 py-3 rounded-full border whitespace-nowrap",
      variant === "filled"
        ? "bg-white/10 border-white/10 text-white"
        : "bg-transparent border-white/20 text-neutral-300"
    )}
  >
    <span className="font-outfit font-semibold text-sm">{event.name}</span>
    <span className="ml-3 text-xs text-neutral-400">{event.years.join(", ")}</span>
  </div>
);
```

### 6.3 Filtros por tipo de evento

```tsx
const EventFilters = ({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (type: string) => void;
}) => {
  const filters = [
    { key: "", label: "Todos" },
    { key: "festival", label: "Festivales" },
    { key: "concierto", label: "Conciertos" },
    { key: "feria", label: "Ferias" },
    { key: "corporativo", label: "Corporativos" },
    { key: "privado", label: "Privados" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Filtrar eventos">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "px-5 py-2 rounded-full text-sm font-medium transition-all",
            activeFilter === filter.key
              ? "bg-primary-500 text-white"
              : "bg-white/10 text-neutral-300 hover:bg-white/20"
          )}
          aria-pressed={activeFilter === filter.key}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
```

---

## 7. TESTIMONIOS — Correccion

### 7.1 Eliminacion de testimonios ficticios

**Testimonios actuales a ELIMINAR:**
- Carlos Vargas — Director de Operaciones, Festival Vallenato 2025 (FICTICIO)
- María Elena Ríos — Gerente de Proyectos, Feria Internacional de Bogotá (FICTICIO)
- Laura Gómez — Wedding Planner, Boda Destino Cartagena (FICTICIO)

### 7.2 Reemplazo por seccion "Nuestros Numeros"

```tsx
// Archivo: components/our-numbers.tsx (reemplaza testimonials.tsx)

const statsData = [
  {
    icon: CalendarDays,
    value: "500+",
    label: "Eventos Atendidos",
    description: "Desde conciertos hasta ferias internacionales",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Soporte Técnico",
    description: "Equipo de operarios certificados siempre disponible",
  },
  {
    icon: Shield,
    value: "99.9%",
    label: "Uptime Garantizado",
    description: "Infraestructura confiable en todo momento",
  },
  {
    icon: MapPin,
    value: "2",
    label: "Sedes Operativas",
    description: "Medellín y Bogotá con cobertura nacional",
  },
  {
    icon: Leaf,
    value: "100%",
    label: "Insumos Eco-friendly",
    description: "Compromiso ambiental certificado ISO 14001",
  },
  {
    icon: Users,
    value: "30+",
    label: "Clientes Recurrentes",
    description: "Organizaciones que confían año tras año",
  },
];

const OurNumbers = () => (
  <section className="py-20 md:py-28 bg-white" aria-labelledby="numbers-heading">
    <div className="container-junisama">
      <div className="text-center mb-16">
        <span className="badge-iso mb-4 inline-block">La diferencia Junisama</span>
        <h2 id="numbers-heading" className="font-outfit text-heading-lg md:text-display-md text-secondary-800">
          Más de una década respaldando los eventos más importantes del país
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {statsData.map((stat) => (
          <div
            key={stat.label}
            className="p-6 md:p-8 rounded-2xl border border-neutral-200 bg-neutral-50 hover:bg-white hover:shadow-lg hover:border-transparent transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors">
              <stat.icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors" aria-hidden="true" />
            </div>
            <div className="stat-number text-3xl">{stat.value}</div>
            <h3 className="mt-2 font-outfit text-heading-sm text-secondary-800">{stat.label}</h3>
            <p className="mt-1 text-body-sm text-neutral-500">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
```

---

## 8. FORMULARIO COTIZACION — Correcciones

### 8.1 Fix del error "Invalid input: expected string, received undefined"

**Archivo:** `app/cotizacion/page.tsx` o `components/quote-form.tsx`  
**Causa raiz:** El schema de validacion Zod no maneja valores `undefined` en campos opcionales o el stepper envia datos parciales.

```tsx
// Schema Zod corregido con valores por defecto y mensajes amigables:
import { z } from "zod";

const quoteSchema = z.object({
  // Paso 1: Datos de contacto
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  company: z.string().optional().default(""),
  email: z.string().email("Ingresa un correo electrónico válido"),
  phone: z.string().min(7, "El teléfono debe tener al menos 7 dígitos"),
  
  // Paso 2: Datos del evento
  eventType: z.string().min(1, "Selecciona un tipo de evento"),
  eventDate: z.string().min(1, "Selecciona una fecha"),
  city: z.string().min(1, "Indica la ciudad"),
  attendees: z.string().optional().default(""),
  
  // Paso 3: Requerimientos
  products: z.array(z.string()).min(1, "Selecciona al menos un producto"),
  notes: z.string().optional().default(""),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

// Valores por defecto para React Hook Form:
const defaultValues: Partial<QuoteFormData> = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  city: "",
  attendees: "",
  products: [],
  notes: "",
};
```

### 8.2 Stepper visual mejorado

```tsx
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="flex items-center justify-center gap-3 mb-10" aria-label={`Paso ${currentStep} de ${totalSteps}`}>
    {Array.from({ length: totalSteps }, (_, i) => {
      const stepNum = i + 1;
      const isActive = stepNum === currentStep;
      const isCompleted = stepNum < currentStep;

      return (
        <div key={stepNum} className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
              isActive && "bg-primary-500 text-white ring-4 ring-primary-100",
              isCompleted && "bg-primary-500 text-white",
              !isActive && !isCompleted && "bg-neutral-200 text-neutral-500"
            )}
            aria-current={isActive ? "step" : undefined}
          >
            {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
          </div>
          {stepNum < totalSteps && (
            <div
              className={cn(
                "w-16 h-1 rounded-full transition-colors",
                isCompleted ? "bg-primary-500" : "bg-neutral-200"
              )}
              aria-hidden="true"
            />
          )}
        </div>
      );
    })}
  </div>
);
```

### 8.3 Validacion inline con mensajes amigables

```tsx
// Input field con validacion inline:
const FormField = ({
  label,
  name,
  type = "text",
  required = false,
  register,
  error,
  placeholder,
  ...props
}: FormFieldProps) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-sm font-medium text-secondary-800">
      {label}
      {required && <span className="text-emergency-500 ml-1" aria-hidden="true">*</span>}
    </label>
    <input
      id={name}
      type={type}
      {...register(name)}
      placeholder={placeholder}
      className={cn(
        "w-full px-4 py-3 rounded-xl border bg-white text-secondary-800 placeholder:text-neutral-400 transition-all",
        "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
        error
          ? "border-emergency-300 focus:border-emergency-500 focus:ring-emergency-500/20"
          : "border-neutral-200 hover:border-neutral-300"
      )}
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${name}-error` : undefined}
      {...props}
    />
    {error && (
      <p id={`${name}-error`} className="text-sm text-emergency-500 flex items-center gap-1" role="alert">
        <AlertCircle className="w-4 h-4" aria-hidden="true" />
        {error.message}
      </p>
    )}
  </div>
);
```

---

## 9. SERVICIOS — Correcciones

### 9.1 Fix de botones sin enlace

**Archivo:** `app/servicios/page.tsx`  
**Problema:** Los servicios "Operarios Certificados" e "Insumos Biodegradables" tienen "Solicitar info" sin `<a>` o sin `href`.

```tsx
// Dataset de servicios con enlaces correctos:
const services = [
  {
    icon: Truck,
    title: "Alquiler de Unidades",
    description: "Flota completa de unidades sanitarias portátiles de grado industrial. Disponibilidad inmediata y mantenimiento incluido.",
    features: ["Unidades estándar", "Unidades premium", "Unidades accesibles", "Instalación incluida"],
    cta: { label: "Solicitar info", href: "/cotizacion" },
  },
  {
    icon: Wrench,
    title: "Mantenimiento Especializado",
    description: "Servicio técnico profesional con protocolos de higiene industrial. Monitoreo continuo y respuesta inmediata.",
    features: ["Limpieza profunda", "Desinfección certificada", "Reposición de insumos", "Monitoreo 24/7"],
    cta: { label: "Solicitar info", href: "/cotizacion" },
  },
  {
    icon: Users,
    title: "Operarios Certificados",
    description: "Personal técnico altamente capacitado con turnos flexibles. Cobertura completa durante todo el evento.",
    features: ["Turnos de 8 horas", "Turnos de 12 horas", "Personal certificado", "Supervisión técnica"],
    cta: { label: "Solicitar info", href: "/cotizacion" }, // ← CORREGIDO: agregar href
  },
  {
    icon: Leaf,
    title: "Insumos Biodegradables",
    description: "Productos eco-friendly de grado industrial. Cumplimiento normativo ambiental garantizado.",
    features: ["Papel higiénico eco", "Desinfectantes bio", "Jabones orgánicos", "Certificación ambiental"],
    cta: { label: "Solicitar info", href: "/cotizacion" }, // ← CORREGIDO: agregar href
  },
];

// Renderizado de cada card:
{services.map((service) => (
  <div key={service.title} className="p-6 md:p-8 rounded-2xl border border-neutral-200 bg-white hover:shadow-lg transition-all">
    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
      <service.icon className="w-6 h-6 text-primary-500" />
    </div>
    <h3 className="font-outfit text-heading-sm text-secondary-800">{service.title}</h3>
    <p className="mt-2 text-body-sm text-neutral-500">{service.description}</p>
    <ul className="mt-4 space-y-2">
      {service.features.map((f) => (
        <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
          <CheckCircle className="w-4 h-4 text-primary-500" />
          {f}
        </li>
      ))}
    </ul>
    {/* TODOS los botones deben ser Link con href valido */}
    <Link
      href={service.cta.href}
      className="mt-6 btn-primary w-full"
    >
      {service.cta.label}
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
))}
```

---

## 10. FOOTER — Mejoras

### 10.1 Footer completo redisenado

```tsx
// Archivo: components/footer.tsx

const Footer = () => (
  <footer className="bg-secondary-900 text-white" role="contentinfo">
    {/* CTA Banner */}
    <div className="bg-gradient-to-r from-primary-500/20 to-accent-gold-500/20 border-y border-white/10">
      <div className="container-junisama py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-outfit text-heading-lg text-white">
            Contacto Industrial
          </h3>
          <p className="mt-2 text-neutral-300">
            Soporte técnico 24/7 para proyectos de cualquier magnitud
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="tel:+573507089584" className="flex items-center gap-3 px-5 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <Phone className="w-5 h-5 text-primary-500" />
            <div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider">Línea directa</div>
              <div className="font-semibold">+57 350 708 9584</div>
            </div>
          </a>
          <a href="mailto:soporte@junisama.com" className="flex items-center gap-3 px-5 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <Mail className="w-5 h-5 text-primary-500" />
            <div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider">Email técnico</div>
              <div className="font-semibold">soporte@junisama.com</div>
            </div>
          </a>
        </div>
      </div>
    </div>

    {/* Main Footer */}
    <div className="container-junisama py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Columna 1: Brand */}
        <div className="lg:col-span-1">
          <JunisamaLogo />
          <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
            Infraestructura sanitaria de grado industrial para eventos de gran escala.
            Cumplimiento normativo y operación 24/7 garantizada.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-accent-gold-500/10 border border-accent-gold-500/30 rounded-full">
            <Diamond className="w-4 h-4 text-accent-gold-500" />
            <span className="text-xs font-medium text-accent-gold-500 tracking-wider uppercase">
              ISO 14001 Certificado
            </span>
          </div>
        </div>

        {/* Columna 2: Servicios técnicos */}
        <div>
          <h4 className="font-outfit font-semibold text-sm uppercase tracking-wider text-neutral-300 mb-4">
            Servicios Técnicos
          </h4>
          <ul className="space-y-3">
            {["Alquiler Industrial", "Mantenimiento 24/7", "Operarios Certificados", "Insumos Eco-friendly"].map((item) => (
              <li key={item}>
                <Link href="/servicios" className="text-sm text-neutral-400 hover:text-primary-500 transition-colors flex items-center gap-2">
                  <ChevronRight className="w-3 h-3" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h4 className="font-outfit font-semibold text-sm uppercase tracking-wider text-neutral-300 mb-4">
            Contacto 24/7
          </h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary-500" />
              <a href="tel:+573507089584" className="hover:text-white transition-colors">+57 350 708 9584</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary-500" />
              <a href="mailto:soporte@junisama.com" className="hover:text-white transition-colors">soporte@junisama.com</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary-500 mt-0.5" />
              <div>
                <p><span className="text-neutral-300 font-medium">Medellín:</span> Calle 13 sur #51C-54</p>
                <p className="mt-1"><span className="text-neutral-300 font-medium">Bogotá:</span> Cra 58b bis # 131A 51</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Columna 4: Redes */}
        <div>
          <h4 className="font-outfit font-semibold text-sm uppercase tracking-wider text-neutral-300 mb-4">
            Síguenos
          </h4>
          <p className="text-sm text-neutral-400 mb-4">
            Síguenos en nuestras redes sociales para estar al día con nuestras novedades y promociones.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/junisama_inversiones"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors"
              aria-label="Instagram de Junisama"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/inversiones-junisama-s-a-s"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors"
              aria-label="LinkedIn de Junisama"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Copyright Bar */}
    <div className="border-t border-white/10">
      <div className="container-junisama py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-500">
          © 2025 JUNISAMA INVERSIONES S.A.S — Todos los derechos reservados
        </p>
        <div className="flex items-center gap-6 text-sm text-neutral-500">
          <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
          <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link>
          <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          {/* Acceso discreto al admin */}
          <AdminLink />
        </div>
      </div>
    </div>
  </footer>
);
```

---

## 11. PANEL ADMIN — Acceso discreto

### 11.1 Eliminar credenciales expuestas de /admin/login

```tsx
// Archivo: app/admin/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Las credenciales DEBEN validarse contra variables de entorno
    // NUNCA hardcodear en el frontend
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPass) {
      // Guardar token de sesion (en produccion usar httpOnly cookies)
      sessionStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Credenciales incorrectas. Intente nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-secondary-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-accent-gold-500 flex items-center justify-center mx-auto mb-4">
            <span className="font-outfit font-bold text-xl text-secondary-900">J</span>
          </div>
          <h1 className="font-outfit text-2xl font-bold text-white">
            Panel de Administración
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Inicia sesión para gestionar Junisama
          </p>
          {/* Credenciales demo ELIMINADAS — solo mostrar en desarrollo local */}
          {process.env.NODE_ENV === "development" && (
            <p className="mt-2 text-xs text-neutral-600">
              Modo desarrollo — revisa variables de entorno
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-emergency-500/10 border border-emergency-500/30 text-emergency-400 text-sm">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-neutral-300 mb-1.5">
              Correo electrónico
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-gold-500/30 focus:border-accent-gold-500"
              placeholder="admin@junisama.com"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-neutral-300 mb-1.5">
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-gold-500/30 focus:border-accent-gold-500"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-accent-gold-500 text-secondary-900 font-semibold hover:bg-accent-gold-600 transition-colors"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
```

### 11.2 Enlace discreto al admin en footer

```tsx
// Archivo: components/admin-link.tsx

import { Lock } from "lucide-react";
import Link from "next/link";

export const AdminLink = () => (
  <Link
    href="/admin/login"
    className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-400 transition-colors"
    aria-label="Acceso administrativo"
    title="Acceso administrativo"
  >
    <Lock className="w-3 h-3" />
    <span className="text-xs">Acceso administrativo</span>
  </Link>
);
```

---

## 12. METADATOS — Correcciones

### 12.1 Fix de layout.tsx

```tsx
// Archivo: app/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  // FIX: Eliminar duplicado "| Junisama | Junisama"
  title: {
    default: "Junisama | Alquiler de Baños Portátiles en Colombia | Servicio Premium 24/7",
    template: "%s | Junisama", // ← Solo un "| Junisama", no dos
  },
  description:
    "Alquiler de baños portátiles y unidades sanitarias para eventos en Colombia. Servicio premium con baños VIP, estándar, eléctricos y para discapacitados. Disponibles en Medellín y Bogotá.",
  
  // FIX: URL canonica correcta
  metadataBase: new URL("https://junisama.com.co"),
  
  alternates: {
    canonical: "/",
  },
  
  // FIX: Open Graph URLs
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://junisama.com.co",
    siteName: "Junisama",
    title: "Junisama | Alquiler de Baños Portátiles en Colombia",
    description:
      "Servicio premium de alquiler de baños portátiles para eventos. Cobertura nacional, operación 24/7.",
    // FIX: Imagen OG con URL absoluta
    images: [
      {
        url: "https://junisama.com.co/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Junisama - Infraestructura Sanitaria Industrial",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@junisama",
    title: "Junisama | Alquiler de Baños Portátiles en Colombia",
    description: "Servicio premium de alquiler de baños portátiles para eventos.",
    images: ["https://junisama.com.co/images/og-image.jpg"],
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
  
  // Keywords relevantes
  keywords: [
    "baños portátiles Colombia",
    "alquiler baños portátiles",
    "baños portátiles Medellín",
    "baños portátiles Bogotá",
    "baños portátiles VIP",
    "baños portátiles eventos",
    "unidades sanitarias portátiles",
    "infraestructura sanitaria eventos",
    "baños para discapacitados",
    "tráiler de lujo sanitario",
  ],
  
  // Region
  other: {
    "geo.region": "CO",
    "geo.placename": "Medellín, Bogotá",
    "geo.position": "6.2518;-75.5636",
    ICBM: "6.2518, -75.5636",
  },
};
```

### 12.2 Metadatos por pagina

```tsx
// Ejemplo: app/cotizacion/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitar Cotización",
  description: "Solicita una cotización personalizada para alquiler de baños portátiles. Respuesta en menos de 24 horas.",
  openGraph: {
    url: "https://junisama.com.co/cotizacion",
    title: "Solicitar Cotización | Junisama",
  },
};
```

---

## 13. ACCESIBILIDAD — Mejoras

### 13.1 Checklist WCAG AA

```tsx
// ========== IMPLEMENTACIONES OBLIGATORIAS ==========

// 1. Contraste WCAG AA (4.5:1 para texto normal, 3:1 para grande)
// Verificar con: https://webaim.org/resources/contrastchecker/
// Primary #E85D24 sobre blanco = 3.5:1 (AA para texto grande OK, texto normal: usar #D14D18)
// Secondary #0F1923 sobre blanco = 15.8:1 (OK)
// Neutral #737373 sobre blanco = 4.6:1 (OK)
// Neutral #525252 sobre blanco = 7.4:1 (OK)

// 2. Foco de teclado visible (ya implementado en globals.css)
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: 4px;
}

// 3. Skip link para saltar navegacion
// Ya incluido en layout:
<a href="#main-content" className="skip-link">
  Saltar al contenido principal
</a>
<main id="main-content">
  {/* Contenido */}
</main>

// 4. Labels en formularios (cada input tiene <label htmlFor="id">)
// Verificado en seccion 8.3

// 5. Alt text en imagenes
<Image
  src="/images/products/bano-vip.jpg"
  alt="Baño portátil VIP con acabados de acero inoxidable, espejo y lavamanos integrado"
  fill
/>

// 6. Botones con aria-label cuando no tienen texto visible
<button aria-label="Abrir menu de navegacion">
  <MenuIcon />
</button>

// 7. Roles ARIA en componentes complejos
<nav aria-label="Navegacion principal">...</nav>
<footer role="contentinfo">...</footer>
<section aria-labelledby="products-heading">...</section>

// 8. Estados aria-* dinamicos
<button aria-expanded={isOpen} aria-haspopup="true">
<button aria-pressed={isActive}>
<div aria-current="step">

// 9. Live regions para mensajes de error
<div role="alert" aria-live="polite">
  {errorMessage}
</div>

// 10. Heading hierarchy (h1 → h2 → h3, sin saltos)
// <h1> en cada pagina (solo uno)
// <h2> para secciones principales
// <h3> para sub-secciones
```

### 13.2 Componente de accesibilidad adicional — Reduced Motion

```css
/* globals.css — agregar al final */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .marquee-track,
  .marquee-track * {
    animation: none !important;
  }
}
```

---

## 14. CHECKLIST DE IMPLEMENTACION

### P0 — Críticos (Bloqueantes para deploy)

- [ ] **LOGO-001** Cambiar logo UVINERIL → JUNISAMA en header
- [ ] **LOGO-002** Cambiar logo UVINERIL → JUNISAMA en footer
- [ ] **EMERG-001** Implementar botón EMERGENCIA en header (pill rojo #DC2626, pulsación 3s)
- [ ] **EMERG-002** Botón EMERGENCIA funcional: click-to-call +573507089584
- [ ] **HERO-001** Fix botón "Ver productos" — texto visible (contraste correcto)
- [ ] **HERO-002** Stats bar con números en dorado #C9A84C
- [ ] **PROD-001** Cards de producto con imagen real (aspect-ratio 4:3)
- [ ] **PROD-002** Eliminar icono placeholder (bañera) de todas las cards
- [ ] **PROD-003** Grid responsive: 3 col desktop, 2 col tablet, 1 col mobile
- [ ] **EVENT-001** Crear dataset de 30+ eventos reales en `data/events.ts`
- [ ] **EVENT-002** Implementar marquee infinito CSS con eventos reales
- [ ] **TEST-001** Eliminar testimonios ficticios (Carlos Vargas, María Elena Ríos, Laura Gómez)
- [ ] **TEST-002** Implementar sección "Nuestros Números" como reemplazo
- [ ] **FORM-001** Fix error Zod: "Invalid input: expected string, received undefined"
- [ ] **FORM-002** Todos los campos con valores por defecto en el formulario
- [ ] **SERV-001** Fix botones "Solicitar info" sin enlace → enlace a /cotizacion
- [ ] **SERV-002** Todos los 4 servicios deben tener CTA funcional
- [ ] **FOOT-001** Copyright 2026 → 2025
- [ ] **FOOT-002** Sedes con direcciones: Medellín y Bogotá
- [ ] **FOOT-003** ISO badge con referencia correcta
- [ ] **ADMIN-001** Eliminar credenciales expuestas de /admin/login
- [ ] **ADMIN-002** Credenciales en variables de entorno (process.env)
- [ ] **META-001** Fix title template: `%s | Junisama` (no duplicado)
- [ ] **META-002** Fix canonical URL: junisama.com.co (no .com)
- [ ] **META-003** Fix og:url y og:image con dominio correcto
- [ ] **A11Y-001** Contraste WCAG AA en todos los textos
- [ ] **A11Y-002** Labels en todos los formularios
- [ ] **A11Y-003** Alt text en todas las imágenes

### P1 — Altos (Importantes, no bloqueantes)

- [ ] **HEAD-001** Dropdown Productos funcional con click outside
- [ ] **HEAD-002** Navegación sticky con sombra en scroll
- [ ] **HEAD-003** Acceso discreto al admin desde footer (icono candado)
- [ ] **HERO-003** Badge ISO con número de certificado (si disponible)
- [ ] **HERO-004** Fondo con imagen real + overlay oscuro
- [ ] **PROD-004** Hover effects en cards de producto
- [ ] **PROD-005** Specs técnicos inline en cada card
- [ ] **EVENT-003** Filtros por tipo de evento en marquee
- [ ] **EVENT-004** Galería con eventos reales (reemplazar ficticios)
- [ ] **FORM-003** Stepper visual mejorado con línea de progreso
- [ ] **FORM-004** Validación inline con mensajes amigables
- [ ] **FORM-005** Mensaje de éxito tras envío
- [ ] **FOOT-004** Footer enterprise con columnas organizadas
- [ ] **FOOT-005** Redes sociales (Instagram, LinkedIn) con links correctos
- [ ] **META-004** Keywords SEO relevantes
- [ ] **META-005** Meta tags geo-region Colombia
- [ ] **A11Y-004** Foco de teclado visible en todos los elementos interactivos
- [ ] **A11Y-005** Skip link funcional
- [ ] **A11Y-006** Reduced motion support

### P2 — Medios/Bajos (Mejoras)

- [ ] **HERO-005** Animación de entrada en elementos del hero
- [ ] **PROD-006** Lazy loading de imágenes de productos
- [ ] **EVENT-005** Animación hover en pills del marquee
- [ ] **EVENT-006** Contador de "+30 eventos" animado
- [ ] **PERF-001** Optimizar imágenes a WebP
- [ ] **PERF-002** Agregar dominios de imágenes a next.config.js
- [ ] **SEO-001** Sitemap.xml generado
- [ ] **SEO-002** robots.txt configurado
- [ ] **POLY-001** Página de privacidad con contenido real
- [ ] **POLY-002** Página de términos con contenido real

---

## APENDICE A: Variables de Entorno Requeridas

```bash
# .env.local

# Admin credentials (NUNCA exponer en el frontend en produccion real)
# En produccion, estas credenciales deben validarse en un API endpoint
NEXT_PUBLIC_ADMIN_EMAIL=admin@junisama.com
NEXT_PUBLIC_ADMIN_PASSWORD=Junisama2025!

# Contacto
NEXT_PUBLIC_PHONE_NUMBER=+573507089584
NEXT_PUBLIC_EMAIL=soporte@junisama.com
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/573507089584

# URLs
NEXT_PUBLIC_SITE_URL=https://junisama.com.co
```

> **⚠️ ADVERTENCIA DE SEGURIDAD:** Las credenciales de administrador deben migrarse a un backend con autenticación segura (JWT, bcrypt, httpOnly cookies). Las variables `NEXT_PUBLIC_` son visibles en el bundle del cliente. Este es un paso intermedio para eliminar la exposición directa en el DOM.

---

## APENDICE B: Estructura de Archivos Sugerida

```
app/
├── layout.tsx              # Fix metadatos, fonts
├── globals.css             # Sistema de diseño completo
├── page.tsx                # Integrar nuevos componentes
├── cotizacion/
│   └── page.tsx            # Fix validación Zod
├── servicios/
│   └── page.tsx            # Fix botones sin enlace
├── productos/
│   └── page.tsx            # Cards con fotografía real
├── galeria/
│   └── page.tsx            # Eventos reales
├── admin/
│   └── login/
│       └── page.tsx        # Eliminar credenciales expuestas
├── quienes-somos/
├── contacto/
├── privacidad/
├── terminos/
└── cookies/

components/
├── header.tsx              # Logo, EMERGENCIA, dropdown, sticky
├── hero.tsx                # Fix botón, stats dorados, fondo real
├── product-grid.tsx        # Cards rediseñadas
├── product-card.tsx        # Card individual con specs
├── client-marquee.tsx      # NUEVO — Marquee infinito
├── our-numbers.tsx         # NUEVO — Reemplaza testimonials
├── quote-form.tsx          # Fix validación
├── footer.tsx              # Logo, copyright, sedes
├── admin-link.tsx          # NUEVO — Acceso discreto
└── ui/                     # Componentes base reutilizables

├── data/
│   └── events.ts           # NUEVO — Dataset de eventos reales

public/
├── images/
│   ├── hero-background.jpg
│   ├── og-image.jpg
│   └── products/
│       ├── bano-vip.jpg
│       ├── bano-estandar.jpg
│       ├── discapacitados.jpg
│       ├── electricos.jpg
│       ├── lavamanos.jpg
│       ├── trailer-lujo.jpg
│       ├── operarios.jpg
│       └── puntos-ecologicos.jpg
```

---

*Documento generado para el equipo de desarrollo Junisama. Cualquier duda técnica consultar con el lead frontend.*
