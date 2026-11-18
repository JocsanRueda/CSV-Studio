# 🚀 JSON Formatter - Guía Rápida

## ¿Qué es?
Una herramienta integrada en CSV Studio para formatear, validar y transformar archivos JSON directamente en tu navegador.

## Características

### 📋 Funcionalidades Principales
| Función | Descripción |
|---------|-------------|
| **Formatear** | Indenta JSON minificado para mejor legibilidad |
| **Minificar** | Convierte JSON formateado a una sola línea |
| **Ordenar Claves** | Ordena alfabéticamente todas las claves JSON |
| **Validar** | Verifica la sintaxis del JSON |
| **JSONL → Array** | Convierte archivos JSON Lines a un array |
| **Intercambiar** | Usa la salida como nueva entrada |

### ⚙️ Opciones
- **Indentación**: Ajusta de 1 a 8 espacios
- **Copiar**: Copia resultados al portapapeles
- **Descargar**: Descarga el resultado como archivo `.json`

## Cómo Usar

1. **Abre CSV Studio** en tu navegador
2. **Selecciona "Formateador JSON"** en la pantalla inicial
3. **Pega o carga tu JSON** en el área de entrada
4. **Elige una operación**:
   - Clic en "Formatear" para organizar el JSON
   - Clic en "Minificar" para comprimir
   - Clic en "Ordenar claves" para alfabetizar
   - Etc.
5. **Ve el resultado** en el área de salida
6. **Copia o descarga** según necesites

## Ejemplos

### Antes (Minificado)
```json
{"name":"Alice","age":30,"email":"alice@example.com"}
```

### Después (Formateado)
```json
{
  "age": 30,
  "email": "alice@example.com",
  "name": "Alice"
}
```

## Características de UX

✅ **Tema oscuro/claro** compartido con CSV Studio; oscuro por defecto y con preferencia guardada
✅ **Interfaz responsiva** (funciona en móvil)
✅ **Mensajes de error** descriptivos
✅ **Botón "Volver al inicio"** siempre disponible
✅ **Sin conexión a internet** necesaria
✅ **Datos privados** (todo local en tu navegador)

## Atajos Útiles

- **Limpiar todo**: Resetea entrada, salida y configuración
- **Intercambiar**: Permite procesar la salida como nueva entrada
- **Copiar entrada**: Duplica tu JSON sin formato

## Troubleshooting

| Problema | Solución |
|----------|----------|
| "El JSON no puede estar vacío" | Asegúrate de pegar contenido en la entrada |
| Errores de sintaxis | Verifica comillas, comas y llaves |
| Indentación muy grande | Reduce el valor en el slider |
| Archivo muy grande | El navegador puede tardar (es normal) |

## Limitaciones

- JSON debe ser válido (no soporta comentarios)
- Limitado por memoria del navegador (~100-500MB)
- No se guarda historial entre sesiones

## Para Desarrolladores

Ver [JSON_FORMATTER_DOCS.md](./JSON_FORMATTER_DOCS.md) para detalles técnicos de:
- Arquitectura del código
- Estructura de componentes
- Cómo agregar nuevas funcionalidades
