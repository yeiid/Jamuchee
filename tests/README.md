# Estructura de pruebas

Este proyecto organiza las pruebas de la siguiente manera:

## Pruebas unitarias

Las pruebas unitarias se encuentran junto al código que prueban:

- `src/components/*//__tests__/*.test.jsx`: Pruebas para componentes
- `src/hooks/__tests__/*.test.js`: Pruebas para hooks personalizados
- `src/utils/__tests__/*.test.js`: Pruebas para funciones de utilidad
- `src/services/__tests__/*.test.js`: Pruebas para servicios

## Pruebas de integración

Las pruebas de integración se encuentran en `tests/integration/`.

## Pruebas end-to-end

Las pruebas end-to-end se encuentran en `tests/e2e/`.

## Utilidades de prueba

Las utilidades compartidas para pruebas se encuentran en `src/__tests__/`.

## Fixtures

Los datos de prueba se encuentran en `src/__tests__/fixtures/`.

## Ejecución de pruebas

- Todas las pruebas: `npm test`
- Solo pruebas unitarias: `npm run test:unit`
- Solo pruebas de integración: `npm run test:integration`
- Solo pruebas e2e: `npm run test:e2e`
- Modo observador (recarga al cambiar): `npm run test:watch`
- Ver cobertura: `npm run test:coverage`
