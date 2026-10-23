import { Package } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const formatoPrecio = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })
const coloresCategoria = {
  Bebidas: 'bg-blue-50 text-blue-700',
  Alimentos: 'bg-amber-50 text-amber-800',
  Limpieza: 'bg-violet-50 text-violet-700',
  Higiene: 'bg-emerald-50 text-emerald-700',
}

export default function ListadoProductos({ productos }) {
  return (
    <Card className="gap-0 [--card-spacing:1.5rem]">
      <CardHeader className="border-b border-slate-100 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle><h2 className="text-lg font-semibold">Productos registrados</h2></CardTitle>
          <Badge variant="secondary" className="bg-slate-100 px-2.5 py-1 text-slate-600">
            {productos.length} {productos.length === 1 ? 'producto' : 'productos'}
          </Badge>
        </div>
        <CardDescription className="mt-1">Consulta los registros de tu catálogo.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableCaption className="sr-only">Listado de productos con código, descripción, categoría y precio.</TableCaption>
          <TableHeader className="bg-slate-50/80">
            <TableRow className="hover:bg-transparent">
              <TableHead scope="col" className="h-12 pl-6 text-xs font-semibold text-slate-500">Código</TableHead>
              <TableHead scope="col" className="text-xs font-semibold text-slate-500">Descripción</TableHead>
              <TableHead scope="col" className="text-xs font-semibold text-slate-500">Categoría</TableHead>
              <TableHead scope="col" className="pr-6 text-right text-xs font-semibold text-slate-500">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.codigo} className="h-16 border-slate-100 hover:bg-slate-50/70">
                <TableCell className="pl-6 font-mono text-xs text-slate-500">{String(producto.codigo).padStart(3, '0')}</TableCell>
                <TableCell className="max-w-56 whitespace-normal font-medium break-words text-slate-800">{producto.descripcion}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={coloresCategoria[producto.categoria]}>{producto.categoria}</Badge>
                </TableCell>
                <TableCell className="pr-6 text-right font-medium whitespace-nowrap text-slate-800 tabular-nums">{formatoPrecio.format(producto.precio)}</TableCell>
              </TableRow>
            ))}
            {productos.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-40 text-center text-muted-foreground">
                  <Package className="mx-auto mb-3 size-7" aria-hidden="true" />
                  Aún no hay productos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
