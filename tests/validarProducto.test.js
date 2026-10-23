import test from 'node:test'
import assert from 'node:assert/strict'
import { validarProducto } from '../src/lib/validarProducto.js'

const valido = { descripcion: 'Galletas', precio: '4.50', categoria: 'Alimentos' }

test('acepta un producto con los tres campos válidos', () => {
  assert.deepEqual(validarProducto(valido), {})
})

for (const descripcion of ['', '   ', 'ab', ' a ']) {
  test(`rechaza una descripción insuficiente ${JSON.stringify(descripcion)}`, () => {
    assert.ok(validarProducto({ ...valido, descripcion }).descripcion)
  })
}

for (const precio of ['', '0', '-1', 'abc', 'Infinity']) {
  test(`rechaza un precio inválido ${JSON.stringify(precio)}`, () => {
    assert.ok(validarProducto({ ...valido, precio }).precio)
  })
}

test('rechaza un producto sin categoría', () => {
  assert.ok(validarProducto({ ...valido, categoria: '' }).categoria)
})

test('acepta el límite de tres caracteres y un precio positivo pequeño', () => {
  assert.deepEqual(validarProducto({ ...valido, descripcion: 'Pan', precio: '0.01' }), {})
})
