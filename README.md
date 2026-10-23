# Lab10 Gestión de productos

Aplicación React creada con Vite, Tailwind CSS y componentes de shadcn/ui.

## Requisitos

Node.js 22.12 o superior y npm.

## Ejecutar

```powershell
npm install
npm start
```

La aplicación se abre en http://127.0.0.1:5174/.

```powershell
npm run build
npm run preview
```

## Funcionamiento

- Se muestran cinco productos iniciales con código, descripción, precio y categoría.
- El formulario exige una descripción de al menos tres caracteres, un precio numérico mayor que cero y una categoría.
- Cada registro recibe un código calculado a partir del mayor código actual más uno.
- La tabla y su contador se actualizan sin recargar la página.
- Los campos se limpian al registrar y se muestra una confirmación. El botón Limpiar restablece campos y mensajes.
- Los datos se mantienen únicamente en el estado de React. Al recargar, se recuperan los cinco productos iniciales y se pierden los registros añadidos. No se utiliza una API, una base de datos ni almacenamiento permanente.

## Organización

- `src/App.jsx`: estado del catálogo y generación de códigos.
- `src/data/productos.js`: productos iniciales y categorías.
- `src/components/FormularioProducto.jsx`: formulario, eventos y mensajes.
- `src/components/ListadoProductos.jsx`: tabla de productos.
- `src/components/ui`: componentes de shadcn/ui.
- `src/lib/validarProducto.js`: reglas de validación.

## Comprobación

```powershell
npm test
npm run lint
npm run build
```

En el navegador se debe comprobar la lista inicial, el registro válido, la aparición inmediata del producto, el rechazo de datos inválidos y la limpieza del formulario. Para las capturas, mostrar primero los cinco productos iniciales, después un registro válido y finalmente los mensajes de validación.
