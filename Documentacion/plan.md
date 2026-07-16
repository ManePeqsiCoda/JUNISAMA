# Plan: Auditoría y Rediseño UI/UX de Junisama

## Contexto
- **Prototipo (prioridad)**: https://junisama-seven.vercel.app
- **Producción (referencia)**: https://junisama.com.co
- **Objetivo**: Dejar el prototipo libre de errores, funcionalmente completo, y elevar el diseño a estándar enterprise antes de presentar a prospecto.

## Hallazgos preliminares confirmados visualmente
1. Logo del prototipo dice "UVINERIL" — incorrecto, debería ser "JUNISAMA"
2. Botón de EMERGENCIA existe en producción (header, naranja, con ícono teléfono) — **AUSENTE en prototipo**
3. Sección de clientes/eventos en producción lista nombres de alto perfil (Shakira, Foo Fighters, Papa Francisco, etc.) — **riesgo de marca**
4. Metadatos del prototipo apuntan a junisama.com (sin .co) — confirmado en fuentes
5. Navegación diferente: prototipo tiene "Contacto" como página separada; producción no
6. Producción tiene formulario de cotización integrado en página de contacto

## Fases de ejecución

### Stage 1 — Auditoría completa (Fases 0-2 del documento)
- **Agente**: QA_Funcional_+_Contenido
- **Skills**: skill-orchestrator, infinite-quality-loop
- **Tareas**:
  1. Explorar TODAS las páginas del prototipo (home, productos, cada ficha, servicios, galería, quienes-somos, contacto, cotización, FAQ, privacidad, términos, cookies)
  2. Explorar sitio de producción para comparar
  3. Revisar consola de errores, responsive, metadatos, navegación
  4. Auditoría de contenido: clientes/eventos, datos de contacto, textos legales
  5. Verificar existencia de panel de administración
- **Output**: Tabla de hallazgos técnicos + tabla de riesgo de marca

### Stage 2 — Dirección de diseño (Fase 3 del documento)
- **Agente**: Disenador_UIUX_Senior
- **Skills**: interface-designing
- **Tareas**:
  1. Crítica de diseño del estado actual (tipografía, color, espaciado, fotografía, componentes)
  2. Propuesta de sistema de diseño (tokens)
  3. Tabla antes/después de los 5 cambios de mayor impacto
- **Output**: Documento "Crítica y Dirección de Diseño" en Markdown

### Stage 3 — Rediseño visual + Correcciones (Fases 4-6 del documento)
- **Agente**: Desarrollador_Frontend
- **Skills**: vibecoding-webapp-swarm
- **Tareas**:
  1. Implementar sistema de diseño en todas las páginas
  2. Corregir logo UVINERIL → JUNISAMA
  3. Corregir metadatos (dominio .com → .com.co)
  4. Implementar botón de Emergencia (replicar de producción)
  5. Manejar sección de clientes con placeholders seguros
  6. Agregar acceso al panel de admin si existe
  7. Corregir responsive y accesibilidad
- **Output**: Código actualizado con capturas antes/después

### Stage 4 — QA Final (Fase 7 del documento)
- **Agente**: QA_Cierre
- **Skills**: verification-before-completion
- **Tareas**:
  1. Regresión completa post-cambios
  2. Verificar botón Emergencia y acceso admin
  3. Confirmar nombres de riesgo removidos
  4. Checklist final de aceptación
- **Output**: Checklist final + veredicto

## Skills a cargar por stage
- Stage 1: skill-orchestrator, infinite-quality-loop
- Stage 2: interface-designing
- Stage 3: vibecoding-webapp-swarm
- Stage 4: verification-before-completion
