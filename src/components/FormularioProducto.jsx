import { useState } from 'react'
import { CheckCircle2, Plus, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { categorias } from '@/data/productos'
import { validarProducto } from '@/lib/validarProducto'

const formularioInicial = { descripcion: '', precio: '', categoria: '' }

export default function FormularioProducto({ onRegistrar }) {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState({})
  const [confirmacion, setConfirmacion] = useState('')

  function actualizarCampo(campo, valor) {
    setFormulario((actual) => ({ ...actual, [campo]: valor }))
    setErrores((actual) => ({ ...actual, [campo]: '' }))
    setConfirmacion('')
  }

  function registrarProducto(evento) {
    evento.preventDefault()
    const nuevosErrores = validarProducto(formulario)
    setErrores(nuevosErrores)
    setConfirmacion('')

    if (Object.keys(nuevosErrores).length > 0) return

    const descripcion = formulario.descripcion.trim()
    onRegistrar({
      descripcion,
      precio: Number(formulario.precio),
      categoria: formulario.categoria,
    })
    setFormulario(formularioInicial)
    setConfirmacion(`Se registró ${descripcion} correctamente.`)
  }

  function limpiarFormulario() {
    setFormulario(formularioInicial)
    setErrores({})
    setConfirmacion('')
  }

  return (
    <Card className="[--card-spacing:1.5rem]">
      <CardHeader>
        <CardTitle><h2 className="text-lg font-semibold">Registrar producto</h2></CardTitle>
        <CardDescription className="mt-1 leading-6">Completa los tres campos para añadir un producto.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={registrarProducto} noValidate className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción del producto</Label>
            <Input
              id="descripcion"
              name="descripcion"
              className="h-11 bg-background"
              placeholder="Ej. Galletas de avena"
              value={formulario.descripcion}
              onChange={(evento) => actualizarCampo('descripcion', evento.target.value)}
              aria-invalid={Boolean(errores.descripcion)}
              aria-describedby={errores.descripcion ? 'error-descripcion' : undefined}
              required
            />
            {errores.descripcion && <p id="error-descripcion" className="text-xs leading-5 text-red-300">{errores.descripcion}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="precio">Precio de venta</Label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground" aria-hidden="true">S/</span>
              <Input
                id="precio"
                name="precio"
                type="number"
                inputMode="decimal"
                step="0.01"
                className="h-11 bg-background pl-9"
                placeholder="0.00"
                value={formulario.precio}
                onChange={(evento) => actualizarCampo('precio', evento.target.value)}
                aria-invalid={Boolean(errores.precio)}
                aria-describedby={errores.precio ? 'error-precio' : undefined}
                required
              />
            </div>
            {errores.precio && <p id="error-precio" className="text-xs leading-5 text-red-300">{errores.precio}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoría</Label>
            <NativeSelect
              id="categoria"
              name="categoria"
              className="w-full rounded-sm bg-background [&_select]:h-11"
              value={formulario.categoria}
              onChange={(evento) => actualizarCampo('categoria', evento.target.value)}
              aria-invalid={Boolean(errores.categoria)}
              aria-describedby={errores.categoria ? 'error-categoria' : undefined}
              required
            >
              <NativeSelectOption value="" disabled>Selecciona una categoría</NativeSelectOption>
              {categorias.map((categoria) => <NativeSelectOption key={categoria} value={categoria}>{categoria}</NativeSelectOption>)}
            </NativeSelect>
            {errores.categoria && <p id="error-categoria" className="text-xs leading-5 text-red-300">{errores.categoria}</p>}
          </div>
          <div className="flex flex-col gap-2 pt-2 min-[360px]:flex-row">
            <Button type="submit" className="h-11 flex-1 gap-2"><Plus aria-hidden="true" />Registrar producto</Button>
            <Button type="button" variant="outline" className="h-11 gap-2 px-3" onClick={limpiarFormulario}><RotateCcw aria-hidden="true" />Limpiar</Button>
          </div>
          {Object.values(errores).some(Boolean) && <p role="alert" className="text-xs leading-5 text-red-300">Revisa los campos indicados antes de registrar.</p>}
          {confirmacion && (
            <div role="status" aria-live="polite" className="flex items-start gap-2 rounded-sm border border-emerald-800 bg-emerald-950 p-3 text-sm leading-5 break-words text-emerald-200">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" /><p className="min-w-0">{confirmacion}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
