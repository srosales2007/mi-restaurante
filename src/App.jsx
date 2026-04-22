import { useState } from "react"
import { Search, ShoppingBag, Plus, Minus, X, Trash2, User, Phone, MapPin, MessageCircle } from "lucide-react"

// ── Configuración ─────────────────────────────────────────────
const WHATSAPP_NUMBER = "50671054378" // formato: código de país + número, sin +
const STORE_NAME      = "Marketcito"
const STORE_TAGLINE   = "Supermercado"
const CURRENCY        = "₡"
const DELIVERY_FEE    = 1500
const MIN_ORDER       = 5000
// ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all",             label: "Todo" },
  { id: "frutas-verduras", label: "Frutas y Verduras" },
  { id: "lacteos",         label: "Lácteos" },
  { id: "carnes",          label: "Carnes y Aves" },
  { id: "panaderia",       label: "Panadería" },
  { id: "bebidas",         label: "Bebidas" },
  { id: "licores",         label: "Licores" },
  { id: "snacks",          label: "Snacks" },
  { id: "limpieza",        label: "Limpieza" },
]

const PRODUCTS = [
  { id: 1,  name: "Manzanas Rojas",         category: "frutas-verduras", price: 1200,  unit: "kg",      description: "Frescas y dulces",       emoji: "🍎" },
  { id: 2,  name: "Bananos",                category: "frutas-verduras", price: 800,   unit: "kg",      description: "Maduros y naturales",    emoji: "🍌" },
  { id: 3,  name: "Tomates",                category: "frutas-verduras", price: 900,   unit: "kg",      description: "Tomate manzana",         emoji: "🍅" },
  { id: 4,  name: "Lechuga Romana",         category: "frutas-verduras", price: 600,   unit: "unidad",  description: "Fresca y crujiente",     emoji: "🥬" },
  { id: 5,  name: "Zanahorias",             category: "frutas-verduras", price: 700,   unit: "kg",      description: "Orgánicas",              emoji: "🥕" },
  { id: 6,  name: "Leche Entera",           category: "lacteos",         price: 1500,  unit: "litro",   description: "Dos Pinos",              emoji: "🥛" },
  { id: 7,  name: "Yogurt Natural",         category: "lacteos",         price: 1200,  unit: "500g",    description: "Sin azúcar añadida",     emoji: "🫙" },
  { id: 8,  name: "Queso Turrialba",        category: "lacteos",         price: 3200,  unit: "kg",      description: "Artesanal",              emoji: "🧀" },
  { id: 9,  name: "Mantequilla",            category: "lacteos",         price: 2100,  unit: "250g",    description: "Sin sal",                emoji: "🧈" },
  { id: 10, name: "Pechuga de Pollo",       category: "carnes",          price: 4500,  unit: "kg",      description: "Fresca",                 emoji: "🍗" },
  { id: 11, name: "Carne Molida",           category: "carnes",          price: 5200,  unit: "kg",      description: "90% magra",              emoji: "🥩" },
  { id: 12, name: "Chuleta de Cerdo",       category: "carnes",          price: 4800,  unit: "kg",      description: "Ahumada",                emoji: "🥓" },
  { id: 13, name: "Pan Blanco",             category: "panaderia",       price: 1100,  unit: "unidad",  description: "Bimbo grande",           emoji: "🍞" },
  { id: 14, name: "Pan Integral",           category: "panaderia",       price: 1300,  unit: "unidad",  description: "Multigrano",             emoji: "🌾" },
  { id: 15, name: "Baguette",               category: "panaderia",       price: 900,   unit: "unidad",  description: "Recién horneada",        emoji: "🥖" },
  { id: 16, name: "Coca-Cola",              category: "bebidas",         price: 800,   unit: "2L",      description: "Original",               emoji: "🥤" },
  { id: 17, name: "Agua Mineral",           category: "bebidas",         price: 500,   unit: "500ml",   description: "Cristal",                emoji: "💧" },
  { id: 18, name: "Jugo de Naranja",        category: "bebidas",         price: 2200,  unit: "1L",      description: "Natural exprimido",      emoji: "🍊" },
  { id: 19, name: "Té Frío",               category: "bebidas",         price: 900,   unit: "500ml",   description: "Limón y menta",          emoji: "🧋" },
  { id: 20, name: "Cerveza Imperial",       category: "licores",         price: 700,   unit: "350ml",   description: "Lager nacional",         emoji: "🍺" },
  { id: 21, name: "Vino Tinto Reserva",    category: "licores",         price: 8500,  unit: "750ml",   description: "Cabernet Sauvignon",     emoji: "🍷" },
  { id: 22, name: "Ron Flor de Caña",      category: "licores",         price: 12000, unit: "750ml",   description: "4 años añejado",         emoji: "🥃" },
  { id: 23, name: "Whisky Johnnie Walker",  category: "licores",         price: 18500, unit: "750ml",   description: "Red Label",              emoji: "🥃" },
  { id: 24, name: "Papas Lay's",            category: "snacks",          price: 950,   unit: "150g",    description: "Clásicas",               emoji: "🍟" },
  { id: 25, name: "Nachos Doritos",         category: "snacks",          price: 1100,  unit: "200g",    description: "Queso nacho",            emoji: "🌮" },
  { id: 26, name: "Galletas Oreo",          category: "snacks",          price: 1200,  unit: "paquete", description: "Original",               emoji: "🍪" },
  { id: 27, name: "Detergente Ariel",       category: "limpieza",        price: 3500,  unit: "2kg",     description: "Aroma floral",           emoji: "🧴" },
  { id: 28, name: "Suavizante Downy",       category: "limpieza",        price: 2800,  unit: "1L",      description: "Primavera fresca",       emoji: "🌸" },
  { id: 29, name: "Desinfectante Pino",     category: "limpieza",        price: 2200,  unit: "1L",      description: "Limpieza profunda",      emoji: "🧹" },
]

const fmt = (n) => `${CURRENCY}${n.toLocaleString("es-CR")}`

const catLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? ""

export default function App() {
  const [cart, setCart]               = useState({})
  const [showCart, setShowCart]       = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch]           = useState("")
  const [customer, setCustomer]       = useState({ name: "", phone: "", address: "", notes: "" })
  const [errors, setErrors]           = useState({})

  // ── Cart helpers ──────────────────────────────────────────
  const addItem    = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const removeItem = (id) => setCart((c) => {
    const next = { ...c }
    if (next[id] > 1) next[id]--
    else delete next[id]
    return next
  })
  const deleteItem = (id) => setCart((c) => { const next = { ...c }; delete next[id]; return next })

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === Number(id)), qty }))
    .filter((i) => i.qty > 0)

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const subtotal  = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const total     = subtotal + (subtotal > 0 ? DELIVERY_FEE : 0)

  // ── WhatsApp ──────────────────────────────────────────────
  const sendOrder = () => {
    const e = {}
    if (!customer.name.trim())    e.name    = "Requerido"
    if (!customer.phone.trim())   e.phone   = "Requerido"
    if (!customer.address.trim()) e.address = "Requerido"
    if (subtotal < MIN_ORDER)     e.min     = `El pedido mínimo es ${fmt(MIN_ORDER)}`
    setErrors(e)
    if (Object.keys(e).length > 0) return

    const lines = cartItems
      .map((i) => `• ${i.qty}x ${i.name} — ${fmt(i.price * i.qty)}`)
      .join("\n")

    const msg = `🛒 *NUEVO PEDIDO — ${STORE_NAME}*

👤 *Cliente:* ${customer.name}
📞 *Teléfono:* ${customer.phone}
📍 *Dirección:* ${customer.address}${customer.notes ? `\n📝 *Notas:* ${customer.notes}` : ""}

*Productos:*
${lines}

────────────────
Subtotal: ${fmt(subtotal)}
Envío: ${fmt(DELIVERY_FEE)}
*TOTAL: ${fmt(total)}*`

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  // ── Filtered products ─────────────────────────────────────
  const filtered = PRODUCTS.filter((p) => {
    const matchCat    = activeCategory === "all" || p.category === activeCategory
    const matchSearch = search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ── Header ───────────────────────────────────────── */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-lg font-semibold tracking-tight text-gray-900">{STORE_NAME}</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest hidden sm:inline">{STORE_TAGLINE}</span>
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Carrito</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Catalog ──────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6">
        <section className="py-16 pb-10">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">{STORE_TAGLINE}</p>
          <h2 className="text-5xl font-bold text-gray-900 tracking-tight leading-none mb-4">Catálogo.</h2>
          <p className="text-gray-400 max-w-md">
            Todo lo que necesitas, en un solo lugar.{" "}
            <span className="text-gray-300">Envío {fmt(DELIVERY_FEE)} · Mínimo {fmt(MIN_ORDER)}</span>
          </p>
        </section>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-2xl text-sm text-gray-900 placeholder-gray-300 outline-none focus:bg-gray-100 transition-colors"
          />
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 mb-5">{filtered.length} productos</p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pb-24">
            {filtered.map((product) => {
              const qty = cart[product.id] || 0
              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all flex flex-col"
                >
                  <div className="w-full aspect-square bg-gray-50 rounded-xl flex items-center justify-center mb-4 text-4xl">
                    {product.emoji}
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{catLabel(product.category)}</p>
                  <h3 className="font-medium text-gray-900 text-sm leading-snug mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-400 mb-4 flex-1">{product.description}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{fmt(product.price)}</p>
                      <p className="text-xs text-gray-400">por {product.unit}</p>
                    </div>

                    {qty === 0 ? (
                      <button
                        onClick={() => addItem(product.id)}
                        className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer flex-shrink-0"
                        aria-label={`Agregar ${product.name}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="text-sm font-semibold text-gray-900 w-4 text-center">{qty}</span>
                        <button
                          onClick={() => addItem(product.id)}
                          className="w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-900 font-medium mb-1">Sin resultados</p>
            <p className="text-sm text-gray-400">Intenta con otro término de búsqueda.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} {STORE_NAME}</p>
          <p className="text-xs text-gray-300 uppercase tracking-widest">{STORE_TAGLINE}</p>
        </div>
      </footer>

      {/* ── Cart Drawer ───────────────────────────────────── */}
      {showCart && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          style={{ background: "rgba(0,0,0,0.3)" }}
          onClick={() => setShowCart(false)}
        >
          <div
            className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Tu carrito</h2>
                <p className="text-xs text-gray-400">{cartCount} {cartCount === 1 ? "producto" : "productos"}</p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 px-6 py-6 flex flex-col gap-6">
              {/* Empty state */}
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
                  <p className="text-gray-900 font-medium mb-1">Tu carrito está vacío</p>
                  <p className="text-sm text-gray-400">Agrega productos del catálogo.</p>
                </div>
              ) : (
                <>
                  {/* Items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-gray-50">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                          {item.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 leading-snug">{item.name}</p>
                          <p className="text-xs text-gray-400 mb-2">{fmt(item.price)} / {item.unit}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="text-sm font-semibold text-gray-900 w-5 text-center">{item.qty}</span>
                            <button
                              onClick={() => addItem(item.id)}
                              className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <p className="text-sm font-semibold text-gray-900">{fmt(item.price * item.qty)}</p>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Envío</span>
                      <span>{fmt(DELIVERY_FEE)}</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>{fmt(total)}</span>
                    </div>
                  </div>

                  {/* Customer form */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900">Datos de entrega</h3>

                    <Field
                      icon={User}
                      placeholder="Nombre completo"
                      value={customer.name}
                      onChange={(v) => setCustomer({ ...customer, name: v })}
                      error={errors.name}
                    />
                    <Field
                      icon={Phone}
                      placeholder="Teléfono"
                      value={customer.phone}
                      onChange={(v) => setCustomer({ ...customer, phone: v })}
                      error={errors.phone}
                    />
                    <Field
                      icon={MapPin}
                      placeholder="Dirección de entrega"
                      value={customer.address}
                      onChange={(v) => setCustomer({ ...customer, address: v })}
                      error={errors.address}
                      multiline
                    />
                    <Field
                      placeholder="Notas opcionales (alergias, instrucciones...)"
                      value={customer.notes}
                      onChange={(v) => setCustomer({ ...customer, notes: v })}
                      multiline
                    />
                  </div>

                  {errors.min && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                      {errors.min}
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={sendOrder}
                    className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enviar pedido por WhatsApp
                  </button>
                  <p className="text-xs text-gray-400 text-center -mt-3">
                    Se abrirá WhatsApp con tu pedido listo para enviar.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ icon: Icon, placeholder, value, onChange, error, multiline }) {
  const Tag = multiline ? "textarea" : "input"
  return (
    <div>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-300 pointer-events-none" />
        )}
        <Tag
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={multiline ? 2 : undefined}
          className={`w-full bg-gray-50 rounded-xl text-sm text-gray-900 placeholder-gray-300 outline-none focus:bg-gray-100 transition-colors resize-none py-3 pr-4 ${
            Icon ? "pl-10" : "pl-4"
          } ${error ? "ring-1 ring-red-400" : ""}`}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  )
}
