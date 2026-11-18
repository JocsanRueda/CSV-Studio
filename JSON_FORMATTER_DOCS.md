# JSON Formatter - Documentación

## Descripción General

El **JSON Formatter** es una herramienta de formateo y validación de JSON integrada en CSV Studio. Permite a los usuarios procesar archivos JSON de forma rápida y eficiente directamente en el navegador.

## Características Principales

### 1. **Formatear JSON**
- Formatea JSON minificado a una versión legible con indentación configurable
- Valida la sintaxis del JSON durante el formateo
- Detecta y muestra errores específicos de parsing

### 2. **Minificar JSON**
- Convierte JSON formateado a una sola línea (sin espacios innecesarios)
- Útil para reducir tamaño de archivos
- Mantiene la funcionalidad del JSON original

### 3. **Ordenar Claves**
- Ordena las claves del JSON alfabéticamente
- Aplica recursivamente en objetos anidados
- Mantiene la indentación configurada

### 4. **Validar JSON**
- Valida la sintaxis sin formatear
- Muestra mensajes de error descriptivos
- Útil para verificar integridad antes de procesar

### 5. **Convertir JSONL a Array**
- Convierte archivos JSON Lines (una línea por objeto) a un array JSON
- Útil para consolidar múltiples registros JSON en un solo objeto

### 6. **Intercambiar Entrada y Salida**
- Permite usar el resultado como nueva entrada
- Facilita encadenar operaciones

### 7. **Copiar y Descargar**
- Copiar al portapapeles con un clic
- Descargar el resultado como archivo JSON
- Soporte para copiar tanto entrada como salida

## Arquitectura del Código

### Estructura de Directorios

```
src/
├── lib/
│   └── json.ts                    # Lógica pura de formateo JSON
├── hooks/
│   └── useJsonFormatter.ts        # Estado y lógica del hook
├── components/
│   ├── JsonFormatterPanel.tsx     # Componente principal
│   ├── JsonInput.tsx              # Textarea de entrada
│   ├── JsonOutput.tsx             # Textarea de salida (solo lectura)
│   ├── JsonToolbar.tsx            # Botones de acciones
│   ├── JsonSettings.tsx           # Configuración de indentación
│   └── ModeSelectionScreen.tsx    # Pantalla inicial de selección
└── App.tsx                        # Enrutamiento entre modos
```

### Componentes Clave

#### `useJsonFormatter.ts`
Hook personalizado que gestiona:
- Estado de entrada/salida
- Historial de cambios
- Configuración de indentación
- Acciones: formatear, minificar, ordenar, etc.

```typescript
const {
  state,
  updateInput,
  format,
  minify,
  sortKeys,
  parseJsonLines,
  validate,
  clearAll,
  copyToClipboard,
  downloadJson,
  setIndent,
  swapInputOutput,
} = useJsonFormatter();
```

#### `json.ts`
Módulo puro de utilidades:
- `formatJson()` - Formatea JSON con indentación
- `minifyJson()` - Minifica JSON
- `sortJsonKeys()` - Ordena claves recursivamente
- `validateJson()` - Valida sintaxis
- `compactJsonLines()` - Convierte JSONL a array
- `escapeJson()` - Escapa caracteres especiales

Todas las funciones devuelven un tipo `FormatResult` con:
- `json: string` - El resultado procesado
- `isValid: boolean` - Si el JSON es válido
- `error?: string` - Mensaje de error si aplica

### ModeSelectionScreen

Pantalla inicial que permite elegir entre:
- **Limpiador CSV** - Herramienta original para procesar CSVs
- **Formateador JSON** - Nueva herramienta para procesar JSONs

Características:
- Diseño responsivo con cards interactivas
- Iconos descriptivos
- Tema oscuro/claro compatible
- Efectos hover y transiciones suaves

## Mejores Prácticas Implementadas

### 1. **Separación de Responsabilidades**
- Lógica pura en `lib/json.ts`
- Estado y efectos en `useJsonFormatter.ts`
- Presentación en componentes React

### 2. **Escalabilidad**
- Fácil agregar nuevas transformaciones en `lib/json.ts`
- Hook reutilizable para otros contextos
- Componentes independientes y componibles

### 3. **Type Safety**
- Tipos TypeScript explícitos para todas las funciones
- Interfaces para props de componentes
- Union types para estados

### 4. **UX Consistente**
- Mismo tema y estilos que CSV Studio
- Tailwind CSS v4 para diseño
- Colores coherentes (sky para CSV, emerald para JSON)

### 5. **Accesibilidad**
- Atributos `aria-label` en botones
- Atributos `title` con descripciones
- Estados `disabled` claros
- Contraste de colores adecuado

### 6. **Performance**
- Sin dependencias externas (solo Papa Parse ya existente)
- Operaciones JSON nativas del navegador
- Sin re-renders innecesarios

## Integración en la Aplicación

### Flujo de Navegación

```
┌─────────────────────────┐
│  ModeSelectionScreen    │
│  (Pantalla inicial)     │
└────────┬────────┬───────┘
         │        │
         ▼        ▼
    ┌─────────┐┌──────────────┐
    │   CSV   ││    JSON      │
    │ Cleaner ││  Formatter   │
    └────┬────┘└──────┬───────┘
         │            │
         ▼            ▼
    ┌──────────────────────────┐
    │   Botón "Volver inicio"  │
    │   (En ambas vistas)      │
    └──────────────────────────┘
```

### App.tsx
- Maneja estado `mode` ('selection', 'csv', 'json')
- Renderiza componentes según el modo actual
- Comparte tema y efectos de cursor
- Botón "Volver al inicio" disponible en todas las vistas

## Configuración

### Indentación
- Rango: 1 a 8 espacios
- Predeterminado: 2 espacios
- Control deslizante interactivo
- Se aplica a formateo y ordenamiento

## Textos Internacionalizados

Agregados a `config.ts`:
- `backToHome: 'Volver al inicio'`

Todos los textos son en español, consistentes con el proyecto.

## Ejemplos de Uso

### Formatear JSON Minificado
```javascript
Input:  {"name":"John","age":30,"city":"NYC"}
Output: {
  "name": "John",
  "age": 30,
  "city": "NYC"
}
```

### Ordenar Claves
```javascript
Input:  { "z": 1, "a": 2, "m": 3 }
Output: { "a": 2, "m": 3, "z": 1 }
```

### JSONL a Array
```javascript
Input:  {"id": 1, "name": "Alice"}
        {"id": 2, "name": "Bob"}
Output: [
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```

## Limitaciones y Consideraciones

1. **Tamaño de Archivos**: Limitado por la memoria del navegador (típicamente 100-500MB)
2. **Privacidad**: Todo se procesa localmente, sin envíos a servidores
3. **Validación**: JSON estricto (no soporta comentarios)
4. **Caracteres**: Soporta UTF-8 completo

## Próximas Mejoras Potenciales

- [ ] Vista previa en árbol expandible
- [ ] Búsqueda y reemplazo dentro del JSON
- [ ] Compresión GZIP
- [ ] Conversión entre formatos (YAML, XML, etc.)
- [ ] Historial con deshacer/rehacer
- [ ] Temas de colores personalizados
- [ ] Validación contra schema JSON
- [ ] Soporte para comentarios JSON5

## Testing

Aunque no hay suite de tests automatizados en el proyecto, los casos de prueba manuales recomendados son:

1. JSON válido minificado → Formatear
2. JSON con errores de sintaxis
3. JSON con objetos anidados profundos
4. Archivos JSONL grandes
5. Cambiar indentación mientras se procesa
6. Intercambiar entrada/salida múltiples veces
7. Copiar y descargar en diferentes navegadores

## Notas de Mantenimiento

- Las funciones en `lib/json.ts` son puras y sin efectos secundarios
- El hook `useJsonFormatter` gestiona todo el estado
- Los componentes son presentacionales y reutilizables
- Mantener consistencia de estilos con `src/index.css`
