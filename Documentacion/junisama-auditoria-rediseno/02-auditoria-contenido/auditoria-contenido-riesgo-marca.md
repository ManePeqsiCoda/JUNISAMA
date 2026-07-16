# AUDITORIA DE CONTENIDO Y RIESGO DE MARCA — JUNISAMA
## Prototipo (junisama-seven.vercel.app) vs. Produccion (junisama.com.co)

**Fecha de auditoria:** 2025  
**Auditor:** Sistema de Auditoria de Contenido  
**Sitio prototipo:** https://junisama-seven.vercel.app  
**Sitio de produccion:** https://junisama.com.co

---

## RESUMEN EJECUTIVO

El prototipo presenta ** multiples hallazgos criticos** que lo hacen **INADECUADO para mostrar a un prospecto** sin revision previa. El hallazgo mas grave es que el logo de navegacion muestra **"UVINERIL"** en lugar de **"JUNISAMA"**, lo cual generaria confusion total en el prospecto y dana la marca. Adicionalmente, el prototipo contiene testimonios ficticios, eventos inventados y ausencia total de la seccion de clientes/eventos reales que si existe en produccion.

---

## TABLA DE HALLAZGOS

### CRITICO (No mostrar a prospecto)

| # | Ubicacion | Contenido en cuestion | Tipo de riesgo | Recomendacion |
|---|-----------|----------------------|----------------|---------------|
| C1 | **Prototipo — Logo de navegacion** | El header muestra **"UVINERIL"** como marca, pero todo el contenido habla de "Junisama". Verificado en todas las paginas del prototipo (home, productos, servicios, galeria, quienes-somos, contacto, cotizacion, legales). | **CRITICO — Error de marca** | CORREGIR INMEDIATAMENTE: El logo debe decir "JUNISAMA" para coincidir con la marca real. Esto genera confusion total en el prospecto. |
| C2 | **Prototipo — Galeria de eventos** | Muestra eventos con imagenes placeholder (triangulo dorado generico) y nombres como: "Festival Vallenato 2025", "Obra Vial Antioquia 2025", "Boda Destino Cartagena 2025", "Feria Internacional de Bogota 2024", "Concierto Estadio Medellin 2024". El heading dice "33+ eventos" pero solo se muestran 5. Las imagenes son placeholders genericos con texto "Evento Junisama / Infraestructura Sanitaria Industrial". | **CRITICO — Contenido ficticio y placeholder** | REMOVER o REEMPLAZAR: Usar eventos reales verificados con fotografias autenticas. Los placeholders dan una impresion de sitio incompleto y poco profesional. |
| C3 | **Prototipo — Testimonios** | Tres testimonios de personas que parecen ficticias: Carlos Vargas ("Director de Operaciones, Festival Vallenato 2025"), Maria Elena Rios ("Gerente de Proyectos, Feria Internacional de Bogota"), Laura Gomez ("Wedding Planner, Boda Destino Cartagena"). Los eventos mencionados no aparecen en la lista de clientes/eventos del sitio de produccion. | **CRITICO — Testimonios no verificables** | VERIFICAR o REMOVER: Confirmar que estas personas existan y hayan autorizado su testimonio. Si no se puede verificar, remover hasta tener autorizacion explicita. |
| C4 | **Prototipo — Copyright 2026** | El footer muestra "(C) 2026 JUNISAMA INVERSIONES S.A.S — Todos los derechos reservados" | **ALTO — Fecha futura** | CORREGIR: El ano debe ser 2025 (ano actual) o al menos coincidir con el sitio de produccion que usa 2024. Un ano futuro genera desconfianza. |

### ALTO

| # | Ubicacion | Contenido en cuestion | Tipo de riesgo | Recomendacion |
|---|-----------|----------------------|----------------|---------------|
| A1 | **Prototipo — Seccion de clientes/eventos AUSENTE** | El prototipo NO incluye la seccion "Empresas y eventos que han confiado en nuestro servicio" que SI existe en produccion. Esta seccion lista 30+ nombres de alto perfil (Shakira, Foo Fighters, Papa Francisco, Feria de las Flores, Estereo Picnic, Rock al Parque, Soda Stereo, etc.). | **ALTO — Contenido diferenciador omitido** | INCLUIR: Esta seccion es el principal respaldo social de la empresa. Su ausencia en el prototipo debilita significativamente la propuesta de valor ante un prospecto. |
| A2 | **Prototipo — Imagenes placeholder en Quienes Somos** | La pagina /quienes-somos muestra una imagen placeholder con texto "Imagen del producto" en lugar de una foto real de la empresa, equipo u operacion. | **ALTO — Contenido incompleto** | REEMPLAZAR: Usar una fotografia real de la empresa, equipo o instalaciones. Los placeholders no son aceptables para presentacion a prospectos. |
| A3 | **Prototipo — Imagenes placeholder en Servicio Tecnico** | La seccion "Servicio Tecnico" en /quienes-somos muestra otra imagen placeholder con texto "Imagen del producto". | **ALTO — Contenido incompleto** | REEMPLAZAR con fotografia real de vehiculos, equipo o personal en operacion. |
| A4 | **Produccion — Paginas legales ausentes** | El footer del sitio de produccion NO tiene enlaces a paginas de privacidad, terminos y condiciones, ni politica de cookies. La URL /privacidad existe pero no muestra contenido legal (solo carga el layout base). | **ALTO — Incumplimiento normativo (Colombia)** | CREAR: En Colombia, la Ley 1581 de 2012 y el Decreto 1377 de 2013 exigen la publicacion de la politica de tratamiento de datos personales. El sitio de produccion incumple esta obligacion legal. |
| A5 | **Prototipo y Produccion — Afirmacion "ISO 14001 Certificado"** | Ambos sitios afirman tener certificacion ISO 14001 sin mostrar el certificado, numero de registro, organismo certificador ni fecha de vigencia. | **ALTO — Afirmacion no verificable** | COMPLEMENTAR: Agregar el numero de certificado, organismo certificador (ej: ICONTEC, Bureau Veritas) y un enlace al certificado o validador. |

### MEDIO

| # | Ubicacion | Contenido en cuestion | Tipo de riesgo | Recomendacion |
|---|-----------|----------------------|----------------|---------------|
| M1 | **Prototipo — Ortografia "Quienes Somos"** | La navegacion muestra "Quienes Somos" sin tilde. La produccion usa "Quienes Somos" (tambien sin tilde en el menu, aunque el titulo de pagina si usa tilde). | **MEDIO — Error ortografico** | CORREGIR a **"Quienes Somos"** (con tilde en la "e") segun las reglas de acentuacion del espanol. La forma correcta es "quienes" (pronombre interrogativo/exclamativo) con tilde cuando no hay antecedente. |
| M2 | **Prototipo — Estadisticas diferentes a produccion** | Prototipo: "500+ Eventos atendidos" / Produccion: "500+ EVENTOS COMPLETADOS". Ademas, el prototipo dice "5+ eventos · 500+ servicios completados" en la galeria, lo cual es contradictorio con "500+ Eventos atendidos" del home. | **MEDIO — Inconsistencia de datos** | UNIFICAR: Usar las mismas estadisticas en ambos sitios. Resolver la contradiccion entre "500+ eventos" y "5+ eventos · 500+ servicios". |
| M3 | **Produccion — Menu "Galeria" sin tilde** | La navegacion del sitio de produccion usa "Galeria" sin tilde. Deberia ser "Galeria". | **MEDIO — Error ortografico** | CORREGIR a **"Galeria"** (con tilde en la "i"). |
| M4 | **Prototipo — Estructura de menu diferente** | El prototipo tiene menu "Productos" (dropdown) mientras que la produccion usa "Servicios" (dropdown). | **MEDIO — Inconsistencia de navegacion** | EVALUAR: Mantener consistencia con el sitio de produccion o confirmar si el cambio es intencional. Un prospecto familiarizado con la marca podria confundirse. |
| M5 | **Prototipo — Pagina FAQ no existe en produccion** | El prototipo incluye un enlace a /faq que no existe en el sitio de produccion. | **MEDIO — Funcionalidad desincronizada** | VERIFICAR: Confirmar si la pagina FAQ sera creada en produccion o si debe removerse del prototipo. |

### BAJO

| # | Ubicacion | Contenido en cuestion | Tipo de riesgo | Recomendacion |
|---|-----------|----------------------|----------------|---------------|
| B1 | **Produccion — Copyright 2024** | El footer muestra "(C) 2024 JUNISAMA INVERSIONES S.A.S - Todos los derechos reservados" | **BAJO — Ano desactualizado** | ACTUALIZAR a 2025. |
| B2 | **Prototipo — Titulo de pagina duplicado** | La pagina de privacidad tiene titulo "Política de Privacidad \| Junisama \| Junisama" (nombre duplicado). Lo mismo ocurre en Terminos y Cookies. | **BAJO — SEO/Metadato** | CORREGIR los meta titulos para evitar duplicacion del nombre de marca. |
| B3 | **Prototipo — Productos sin imagenes** | En /productos, las tarjetas de productos muestran el icono generico de un bano en lugar de fotografias reales de los productos. | **BAJO — Calidad visual** | REEMPLAZAR con fotografias profesionales de cada producto. |
| B4 | **Produccion — Texto "INDUSTRIAL GRADE SOLUTIONS"** | El footer del sitio de produccion incluye el texto "INDUSTRIAL GRADE SOLUTIONS" en ingles. | **BAJO — Mezcla de idiomas** | EVALUAR: Si el publico objetivo es colombiano, considerar traducir o contextualizar esta frase. |

---

## SECCION 1: AFIRMACIONES QUE REQUIEREN VERIFICACION DE AUTORIZACION

Los siguientes nombres aparecen en el sitio de **produccion** (junisama.com.co) en la seccion "Empresas y eventos que han confiado en nuestro servicio". El prototipo NO incluye esta seccion, lo cual es una omision grave.

| # | Nombre/Evento | Anos listados | Estado de verificacion | Recomendacion |
|---|---------------|---------------|----------------------|---------------|
| 1 | **Shakira** — El Dorado World Tour | 2018 | REQUIERE VERIFICACION | Confirmar autorizacion por escrito para uso del nombre y marca. |
| 2 | **Foo Fighters** — Concrete and Gold Tour | 2019 | REQUIERE VERIFICACION | Confirmar autorizacion. Evento internacional con restricciones de marca. |
| 3 | **Feria de las Flores** | 2024, 2023, 2022, 2021 | REQUIERE VERIFICACION | Confirmar autorizacion con la entidad organizadora (Alcaldia de Medellin/Empresas de Turismo). |
| 4 | **Papa Francisco** — Visita Colombia | 2017 | REQUIERE VERIFICACION | Evento de alto perfil institucional/religioso. Requiere autorizacion de la Conferencia Episcopal o entidad organizadora. |
| 5 | **Estereo Picnic** | 2018 | REQUIERE VERIFICACION | Confirmar autorizacion con el organizador (ESTEREO PICNIC S.A.S o similar). |
| 6 | **Rock al Parque** | 2022, 2019 | REQUIERE VERIFICACION | Evento del IDARTES/Alcaldia de Bogota. Confirmar autorizacion. |
| 7 | **Soda Stereo** — Gracias Totales | 2020 | REQUIERE VERIFICACION | Marca registrada. Confirmar autorizacion con productores o gestores de la gira. |
| 8 | **La Solar** | 2024 | REQUIERE VERIFICACION | Confirmar autorizacion con organizadores. |
| 9 | **Carl Cox** | 2024 | REQUIERE VERIFICACION | Artista internacional. Confirmar autorizacion. |
| 10 | **Alvaro Diaz** | 2025 | REQUIERE VERIFICACION | Confirmar autorizacion con el artista o sello discografico. |
| 11 | **&ME** | 2025 | REQUIERE VERIFICACION | Artista internacional. Confirmar autorizacion. |
| 12 | **CORE** | 2025, 2024 | REQUIERE VERIFICACION | Confirmar autorizacion con organizadores. |
| 13 | **RANCHETON ARENA MIX / DOOM** | 2024 | REQUIERE VERIFICACION | Confirmar autorizacion. |
| 14 | **RITVALES** | 2023 | REQUIERE VERIFICACION | Confirmar autorizacion. |
| 15 | **JAZZ al Parque** | 2023, 2022, 2019 | REQUIERE VERIFICACION | Evento del IDARTES. Confirmar autorizacion. |
| 16 | **F-AIR COLOMBIA** | 2023 | REQUIERE VERIFICACION | Confirmar autorizacion con organizadores. |
| 17 | **Joropo al Parque** | 2023 | REQUIERE VERIFICACION | Evento publico. Confirmar autorizacion. |
| 18 | **Salsa al Parque** | 2023, 2022, 2019 | REQUIERE VERIFICACION | Evento del IDARTES. Confirmar autorizacion. |
| 19 | **Feria de Manizales** | 2025 | REQUIERE VERIFICACION | Confirmar con organizadores. |
| 20 | **EXPO CUNDINAMARCA** | 2022 | REQUIERE VERIFICACION | Confirmar autorizacion. |
| 21 | **Hip Hop al Parque** | 2022, 2019 | REQUIERE VERIFICACION | Evento del IDARTES. Confirmar autorizacion. |
| 22 | **Desfile Autos Clasicos** | 2022 | REQUIERE VERIFICACION | Confirmar autorizacion. |
| 23 | **La Gira Alejandro Sanz** | 2022 | REQUIERE VERIFICACION | Artista internacional con marca registrada. Confirmar autorizacion. |
| 24 | **BEYOND WONDERLAND** | 2019 | REQUIERE VERIFICACION | Evento de Insomniac Events (EE.UU.). Alta restriccion de marca. Confirmar autorizacion. |
| 25 | **Festival Tatacoa** | 2019 | REQUIERE VERIFICACION | Confirmar autorizacion. |
| 26 | **Picnic de Andres** | 2019, 2018, 2017 | REQUIERE VERIFICACION | Confirmar autorizacion con organizadores. |
| 27 | **Colombia al Parque** | 2019 | REQUIERE VERIFICACION | Evento del Ministerio de Cultura. Confirmar autorizacion. |
| 28 | **Festival de Verano Bogota** | 2019, 2017, 2016, 2015 | REQUIERE VERIFICACION | Evento del IDRD. Confirmar autorizacion. |
| 29 | **Luis Miguel** — Mexico por Siempre | 2019 | REQUIERE VERIFICACION | Artista internacional con marca registrada. Confirmar autorizacion. |
| 30 | **I Love Bogota** | 2018 | REQUIERE VERIFICACION | Confirmar autorizacion. |
| 31 | **Festival Be You Fest** | 2018 | REQUIERE VERIFICACION | Confirmar autorizacion. |
| 32 | **Jamming Summer Fest** | 2017 | REQUIERE VERIFICACION | Confirmar autorizacion. |

**NOTA IMPORTANTE:** El sitio de produccion muestra los logos/marcas de estos eventos en formato circular con sus anos. Aunque sea informacion factual (la empresa presto el servicio), el **uso del nombre y logotipo de terceros con fines comerciales** (promocion del servicio) puede requerir autorizacion explicita, especialmente para:
- Marcas registradas (Shakira, Foo Fighters, Soda Stereo, Beyond Wonderland, Luis Miguel, Alejandro Sanz)
- Eventos gubernamentales (Rock al Parque, Jazz al Parque, Salsa al Parque, Hip Hop al Parque, Feria de las Flores)
- Visitas de figuras religiosas (Papa Francisco)

**Recomendacion legal:** Obtener autorizacion por escrito de cada marca/evento, o en su defecto, usar una declaracion generica como "Hemos atendido los eventos mas importantes de Colombia" sin nombrar especificamente a terceros con marca registrada.

---

## SECCION 2: INCONSISTENCIAS DE DATOS DE CONTACTO

| Dato | Prototipo | Produccion | Coincide? |
|------|-----------|------------|-----------|
| Telefono | +57 350 708 9584 | +57 350 708 9584 | SI |
| Email | soporte@junisama.com | soporte@junisama.com | SI |
| WhatsApp | +57 350 708 9584 (mismo numero) | Enlace a chat | SI (mismo numero) |
| Direccion Medellin | Calle 13 sur #51C-54 | Calle 13 sur #51C-54 | SI |
| Direccion Bogota | Cra 58b bis #131A 51 | Cra 58b bis # 131A 51 | SI (diferencia menor en espacio) |
| Correo Corporativo | No aparece | Enlace a Outlook/login.microsoftonline.com | DIFERENTE |

**Hallazgo:** Los datos de contacto son consistentes entre ambos sitios. Sin embargo, el sitio de produccion incluye un enlace a "Correo Corporativo" que redirige a login.microsoftonline.com, lo cual es funcionalidad que el prototipo no tiene.

---

## SECCION 3: TEXTOS LEGALES

| Pagina legal | Prototipo | Produccion | Estado |
|--------------|-----------|------------|--------|
| Política de Privacidad | SI — Contenido completo y valido (Ley 1581 de 2012, Decreto 1377 de 2013) | NO — URL /privacidad existe pero no muestra contenido | **PROTOTIPO OK / PRODUCCION PENDIENTE** |
| Terminos y Condiciones | SI — Contenido completo y valido | NO — No existe o no es accesible | **PROTOTIPO OK / PRODUCCION PENDIENTE** |
| Política de Cookies | SI — Contenido completo y valido | NO — No existe o no es accesible | **PROTOTIPO OK / PRODUCCION PENDIENTE** |

**Observacion:** El prototipo tiene mejores textos legales que el sitio de produccion. Los textos del prototipo cumplen con la normativa colombiana y mencionan correctamente la Ley 1581 de 2012 y el Decreto 1377 de 2013.

---

## SECCION 4: TONO Y ORTOGRAFIA

### Hallazgos de ortografia

| # | Ubicacion | Error | Correccion | Nivel |
|---|-----------|-------|------------|-------|
| 1 | Prototipo — Navegacion | "Quienes Somos" (sin tilde) | "Quienes Somos" (con tilde) | Medio |
| 2 | Produccion — Navegacion | "Galeria" (sin tilde) | "Galeria" (con tilde) | Medio |
| 3 | Produccion — Menu Servicios | "Baños Portátiles Estándar" (tilde en Estándar) | "Baños Portátiles Estandar" segun norma RAE... (en realidad "estandar" no lleva tilde segun la nueva ortografia, pero la pagina /quienes-somos usa "útima" que si lleva tilde correctamente) | Verificar |
| 4 | Produccion — Heading "CANALES DE CONTACTO" | Emoji 📞 usado antes del texto | Consistente con el tono | OK |

### Tono y variante de espanol
- Ambos sitios usan espanol de Colombia (ej: "cotizacion" en lugar de "presupuesto", "banos" en lugar de "servicios sanitarios")
- El tono es profesional e industrial en ambos casos
- El prototipo usa un tono ligeramente mas moderno/corporativo

---

## SECCION 5: IMAGENES Y CONTENIDO VISUAL

| # | Ubicacion | Estado | Tipo de riesgo |
|---|-----------|--------|----------------|
| 1 | **Prototipo — Logo UVINERIL** | Imagen/texto incorrecto | CRITICO |
| 2 | **Prototipo — /quienes-somos (hero)** | Placeholder generico | ALTO |
| 3 | **Prototipo — /quienes-somos (servicio tecnico)** | Placeholder generico | ALTO |
| 4 | **Prototipo — /galeria** | 5 eventos con placeholders | CRITICO |
| 5 | **Prototipo — /productos** | Iconos genericos, no fotos | BAJO |
| 6 | **Produccion — Home (hero)** | Video/fondo oscuro funcional | OK |
| 7 | **Produccion — /quienes-somos** | Foto real del equipo | OK |
| 8 | **Produccion — Clientes/eventos** | Logos reales de eventos en circulos | OK |
| 9 | **Produccion — Sedes** | Mapas de Google Maps funcionales | OK |

---

## HALLAZGOS QUE NO DEBERIAN MOSTRARSE A UN PROSPECTO (Bloqueantes)

Los siguientes hallazgos deben ser corregidos **antes** de mostrar el prototipo a cualquier prospecto:

1. **C1 — Logo "UVINERIL" en lugar de "JUNISAMA"**: Es un error critico de marca que genera confusion total.
2. **C2 — Galeria con eventos ficticios e imagenes placeholder**: Muestra contenido no real que dana la credibilidad.
3. **C3 — Testimonios de personas potencialmente ficticias**: Riesgo de desacreditacion si no se pueden verificar.
4. **A1 — Ausencia total de la seccion de clientes/eventos reales**: Se omite el principal respaldo social de la empresa (30+ nombres de alto perfil).
5. **A2/A3 — Imagenes placeholder en paginas clave**: Dan impression de sitio incompleto.

---

## RECOMENDACIONES PRIORITARIAS

### Inmediatas (antes de mostrar a prospecto)
1. Corregir el logo de "UVINERIL" a "JUNISAMA" en todo el prototipo
2. Reemplazar todas las imagenes placeholder con contenido real
3. Incluir la seccion de clientes/eventos del sitio de produccion
4. Verificar y corregir las estadisticas contradictorias (500+ eventos vs 5+ eventos)
5. Actualizar el copyright a 2025

### Corto plazo
6. Verificar autorizacion de uso de nombres de clientes/eventos en ambos sitios
7. Complementar la certificacion ISO 14001 con datos verificables
8. Unificar estructura de navegacion entre prototipo y produccion
9. Corregir errores ortograficos (tildes en Quienes Somos, Galeria)

### Mediano plazo
10. Crear paginas legales en el sitio de produccion (actualmente incumple normativa colombiana)
11. Agregar pagina FAQ en produccion si se mantiene en el prototipo
12. Implementar fotografias profesionales de productos en ambos sitios

---

*Fin del informe de auditoria*
