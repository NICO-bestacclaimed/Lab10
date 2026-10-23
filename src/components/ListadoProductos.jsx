import { Package } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const formatoPrecio = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })
const coloresCategoria = {
  Bebidas: 'border border-blue-400/20 bg-blue-400/10 text-blue-200',
  Alimentos: 'border border-primary/20 bg-primary/10 text-primary',
  Limpieza: 'border border-blue-300/20 bg-blue-300/10 text-blue-100',
  Higiene: 'border border-primary/20 bg-primary/10 text-amber-200',
}

export default function ListadoProductos({ productos }) {
  return (
    <Card className="gap-0 [--card-spacing:1.5rem]">
      <CardHeader className="border-b border-border pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle><h2 className="text-lg font-semibold">Productos registrados</h2></CardTitle>
          <Badge variant="secondary" className="border border-info-border bg-info px-2.5 py-1 text-info-foreground">
            {productos.length} {productos.length === 1 ? 'producto' : 'productos'}
          </Badge>
        </div>
        <CardDescription className="mt-1">Consulta los registros de tu catálogo.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableCaption className="sr-only">Listado de productos con código, descripción, categoría y precio.</TableCaption>
          <TableHeader className="bg-secondary">
            <TableRow className="hover:bg-transparent">
              <TableHead scope="col" className="h-12 pl-6 text-xs font-semibold text-muted-foreground">Código</TableHead>
              <TableHead scope="col" className="text-xs font-semibold text-muted-foreground">Descripción</TableHead>
              <TableHead scope="col" className="text-xs font-semibold text-muted-foreground">Categoría</TableHead>
              <TableHead scope="col" className="pr-6 text-right text-xs font-semibold text-muted-foreground">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.codigo} className="h-16 border-border hover:bg-accent/70">
                <TableCell className="pl-6 font-mono text-xs text-muted-foreground">{String(producto.codigo).padStart(3, '0')}</TableCell>
                <TableCell className="max-w-56 whitespace-normal font-medium break-words text-foreground">{producto.descripcion}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={coloresCategoria[producto.categoria]}>{producto.categoria}</Badge>
                </TableCell>
                <TableCell className="pr-6 text-right font-medium whitespace-nowrap text-foreground tabular-nums">{formatoPrecio.format(producto.precio)}</TableCell>
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
