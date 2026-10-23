export function validarProducto({ descripcion, precio, categoria }) {
  const errores = {}

  if (descripcion.trim().length < 3) {
    errores.descripcion = 'La descripción debe tener al menos 3 caracteres.'
  }

  if (precio.trim() === '' || !Number.isFinite(Number(precio)) || Number(precio) <= 0) {
    errores.precio = 'Ingresa un precio mayor que cero.'
  }

  if (categoria.trim() === '') {
    errores.categoria = 'Selecciona una categoría.'
  }

  return errores
}
