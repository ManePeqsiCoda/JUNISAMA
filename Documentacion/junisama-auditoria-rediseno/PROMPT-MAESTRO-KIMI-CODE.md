# PROMPT MAESTRO — Rebrand Junisama → BOGA
## Para Kimi Code (ejecucion paso a paso)

---

## CONTEXTO

Estamos ejecutando un **rebrand completo** de la empresa "Junisama Inversiones S.A.S." a **"BOGA — Ingenieria Portatil"**. El sitio web es un Next.js 16 app con Tailwind CSS v4.

Tienes una carpeta con **6 documentos de especificacion** que contienen TODO lo necesario para ejecutar el rebrand. Tu trabajo es:
1. Leer los documentos en orden
2. Ejecutar las tareas del plan paso a paso
3. Pedir confirmacion antes de cada fase

---

## DOCUMENTOS (leer en este orden)

1. **Indice y guia**: `/mnt/agents/output/junisama-auditoria-rediseno/README.md`
2. **Brand Kit BOGA** (identidad): `/mnt/agents/output/junisama-auditoria-rediseno/00-brand-kit-boga/brand-kit-boga-auditoria.md`
3. **Design System Web** (tokens, componentes): `/mnt/agents/output/junisama-auditoria-rediseno/design-system-boga.md`
4. **Mapa de Cambios** (que conservar/adaptar/reconstruir): `/mnt/agents/output/junisama-auditoria-rediseno/mapa-de-cambios.md`
5. **Plan de Implementacion** (tareas paso a paso con codigo): `/mnt/agents/output/junisama-auditoria-rediseno/plan-implementacion-boga.md`
6. **Auditoria Estado Actual** (inventario del sitio): `/mnt/agents/output/junisama-auditoria-rediseno/auditoria-estado-actual.md`

---

## INSTRUCCIONES DE EJECUCION

### Orden de fases (NO saltar ninguna)

```
FASE 1: FUNDACION (tokens CSS, tipografia, clases custom)
FASE 2: MARCA VISUAL (logo SVG, favicon, OG image, metadata)
FASE 3: CONFIGURACION (mocks.ts, seo.ts, sitemap, credenciales)
FASE 4: LAYOUT (navbar, footer, boton EMERGENCIA, acceso admin)
FASE 5: HOME PAGE (hero, marquee, product cards, why-us, our-numbers, contact)
FASE 6: PAGINAS PUBLICAS (productos, servicios, galeria, quienes-somos, contacto, cotizacion, FAQ)
FASE 7: ADMIN (header, sidebar, hex literales → tokens)
FASE 8: NUEVOS ELEMENTOS BOGA (3 circulos, seccion valores, decorativos)
FASE 9: QA FINAL (WCAG AA, responsive, Lighthouse, build, lint)
```

### Protocolo de confirmacion (OBLIGATORIO)

Antes de ejecutar CADA fase:

1. Lee las tareas de esa fase en `plan-implementacion-boga.md`
2. Dime: **"Fase [X]: [Nombre] — lista para ejecutar. Incluye [N] tareas: [lista de tareas]. Archivos a modificar: [lista]."**
3. **Espera mi confirmacion** ("si", "adelante", "vamos", "ejecuta") antes de tocar cualquier archivo
4. Despues de completar la fase, muestra un resumen: **"Fase [X] completada. Cambios: [lista]. Verificacion: [resultado]. Proxima: Fase [X+1]."**
5. Repite hasta terminar

### Reglas criticas

1. **ANTES de tocar cualquier archivo**, lee su contenido actual. Nunca sobrescribas sin leer primero.
2. **Nunca elimines funcionalidad que funciona** — formularios, validaciones, panel admin, autenticacion.
3. **Solo modifica lo necesario** — cambios quirurgicos, no rewrites completos.
4. **Si un componente no existe en la ruta esperada**, buscalo en el proyecto y reportame antes de crear uno nuevo.
5. **Tokens CSS obligatorios**: usa prefijo `--boga-*` (nunca `--gray-` o `--blue-`)
6. **Colores BOGA**: primario `#2c4df2` (azul electrico), secundario `#1b1341` (azul profundo), acento `#daf73a` (amarillo lima)
7. **Tipografia**: Montserrat (reemplaza Outfit + Space Grotesk)
8. **Despues de cada fase**: ejecuta `npm run build` y reporta si pasa o falla
9. **Boton EMERGENCIA**: ya existe en el sitio (verificar en navbar), rebrandear colores
10. **Acceso admin**: ya existe link en footer, verificar que flujo login/logout funciona
11. **Logo SVG**: hasta obtener el archivo final del disenador, crear placeholder con colores BOGA correctos y comentario `<!-- TODO: SVG final del disenador -->`
12. **Credenciales admin**: mover de variables publicas (`NEXT_PUBLIC_*`) a `.env.local` privadas

### Comandos de verificacion (ejecutar despues de cada fase)

```bash
# Build
npm run build

# Lint
npm run lint

# Type check (si existe)
npx tsc --noEmit
```

### Datos de contacto oficiales BOGA

```
Telefono: +57 350 708 9584
Email: soporte@junisama.com
WhatsApp: +57 350 708 9584
Sede Medellin: Calle 13 sur #51C-54
Sede Bogota: Cra 58b bis #131A 51
Instagram: @junisama_inversiones
LinkedIn: company/inversiones-junisama-s-a-s
Dominio: https://junisama.com.co
```

> **Nota**: Los datos de contacto se actualizaran cuando BOGA tenga sus propios canales. Por ahora mantener los de Junisama.

### Assets que NO estan disponibles (requieren accion del cliente)

- Logo BOGA en SVG/PNG/AI (disenador debe proporcionar)
- 8 fotos reales de productos
- Foto de hero (evento real)
- Foto de equipo para /quienes-somos
- Autorizacion legal para usar nombres de 50 eventos

> **Para estos assets**: crear placeholders con texto descriptivo claro y comentario `TODO`. Nunca usar icono de banera naranja o placeholder generico sin explicacion.

---

## EMPIEZA

1. Lee el `README.md` de la carpeta
2. Lee el plan de implementacion completo
3. Reporta cuando estes listo
4. Empezaremos con la **FASE 1: FUNDACION (tokens globales)**
