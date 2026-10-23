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
      <header className="border-t-2 border-t-primary/70 border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-5 sm:px-8">
          <span className="flex size-10 items-center justify-center rounded-sm border border-primary/30 bg-primary/10 text-primary">
            <Package className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">Catálogo comercial</p>
            <p className="text-xs text-muted-foreground">Administración de productos</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-primary">CATÁLOGO</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gestión de productos</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Registra nuevos productos y consulta tu catálogo en un solo lugar.</p>
        </div>
        <div role="note" className="mb-7 flex items-start gap-3 rounded-sm border border-info-border bg-info px-4 py-3.5 text-sm leading-6 text-info-foreground">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p><span className="font-semibold">Registros temporales.</span> Los productos añadidos se perderán al recargar la página.</p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <FormularioProducto onRegistrar={registrarProducto} />
          <ListadoProductos productos={productos} />
        </div>
        <footer className="mt-7 text-center text-xs leading-5 text-muted-foreground">Los códigos de los nuevos productos se generan automáticamente.</footer>
      </main>
    </div>
  )
}
