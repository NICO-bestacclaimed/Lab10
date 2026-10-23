import { useState } from 'react'
import { Info, Package } from 'lucide-react'
import ListadoProductos from '@/components/ListadoProductos'
import FormularioProducto from '@/components/FormularioProducto'
import { productosIniciales } from '@/data/productos'

export default function App() {
  const [productos, setProductos] = useState(() => productosIniciales.map((producto) => ({ ...producto })))

  function registrarProducto(datos) {
    setProductos((actuales) => {
      const codigo = Math.max(0, ...actuales.map((producto) => producto.codigo)) + 1
      return [...actuales, { codigo, ...datos }]
    })
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-5 sm:px-8">
          <span className="flex size-10 items-center justify-center rounded-xl bg-blue-700 text-white">
            <Package className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-900">Catálogo comercial</p>
            <p className="text-xs text-slate-500">Administración de productos</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-blue-700">CATÁLOGO</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Gestión de productos</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Registra nuevos productos y consulta tu catálogo en un solo lugar.</p>
        </div>
        <div role="note" className="mb-7 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3.5 text-sm leading-6 text-blue-900">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p><span className="font-semibold">Registros temporales.</span> Los productos añadidos se perderán al recargar la página.</p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <FormularioProducto onRegistrar={registrarProducto} />
          <ListadoProductos productos={productos} />
        </div>
        <footer className="mt-7 text-center text-xs leading-5 text-slate-500">Los códigos de los nuevos productos se generan automáticamente.</footer>
      </main>
    </div>
  )
}
