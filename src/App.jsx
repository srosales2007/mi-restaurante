import { useState, useEffect } from "react"
import {
  Search, ShoppingBag, Plus, Minus, X, Trash2,
  User, Phone, MapPin, MessageCircle,
  Settings, Package, LogOut, Pencil, Eye, EyeOff, Lock,
} from "lucide-react"

// ── Never-changing constants ───────────────────────────────────
const CURRENCY = "₡"

const CATEGORY_OPTIONS = [
  { id: "frutas-verduras", label: "Frutas y Verduras" },
  { id: "lacteos",         label: "Lácteos" },
  { id: "carnes",          label: "Carnes y Aves" },
  { id: "panaderia",       label: "Panadería" },
  { id: "bebidas",         label: "Bebidas" },
  { id: "licores",         label: "Licores" },
  { id: "snacks",          label: "Snacks" },
  { id: "limpieza",        label: "Limpieza" },
]

const ALL_CATEGORIES = [{ id: "all", label: "Todo" }, ...CATEGORY_OPTIONS]

const DEFAULT_PRODUCTS = [
  { id: 1,  name: "Manzanas Rojas",         category: "frutas-verduras", price: 1200,  unit: "kg",      description: "Frescas y dulces",       emoji: "🍎", available: true },
  { id: 2,  name: "Bananos",                category: "frutas-verduras", price: 800,   unit: "kg",      description: "Maduros y naturales",    emoji: "🍌", available: true },
  { id: 3,  name: "Tomates",                category: "frutas-verduras", price: 900,   unit: "kg",      description: "Tomate manzana",         emoji: "🍅", available: true },
  { id: 4,  name: "Lechuga Romana",         category: "frutas-verduras", price: 600,   unit: "unidad",  description: "Fresca y crujiente",     emoji: "🥬", available: true },
  { id: 5,  name: "Zanahorias",             category: "frutas-verduras", price: 700,   unit: "kg",      description: "Orgánicas",              emoji: "🥕", available: true },
  { id: 6,  name: "Leche Entera",           category: "lacteos",         price: 1500,  unit: "litro",   description: "Dos Pinos",              emoji: "🥛", available: true },
  { id: 7,  name: "Yogurt Natural",         category: "lacteos",         price: 1200,  unit: "500g",    description: "Sin azúcar añadida",     emoji: "🫙", available: true },
  { id: 8,  name: "Queso Turrialba",        category: "lacteos",         price: 3200,  unit: "kg",      description: "Artesanal",              emoji: "🧀", available: true },
  { id: 9,  name: "Mantequilla",            category: "lacteos",         price: 2100,  unit: "250g",    description: "Sin sal",                emoji: "🧈", available: true },
  { id: 10, name: "Pechuga de Pollo",       category: "carnes",          price: 4500,  unit: "kg",      description: "Fresca",                 emoji: "🍗", available: true },
  { id: 11, name: "Carne Molida",           category: "carnes",          price: 5200,  unit: "kg",      description: "90% magra",              emoji: "🥩", available: true },
  { id: 12, name: "Chuleta de Cerdo",       category: "carnes",          price: 4800,  unit: "kg",      description: "Ahumada",                emoji: "🥓", available: true },
  { id: 13, name: "Pan Blanco",             category: "panaderia",       price: 1100,  unit: "unidad",  description: "Bimbo grande",           emoji: "🍞", available: true },
  { id: 14, name: "Pan Integral",           category: "panaderia",       price: 1300,  unit: "unidad",  description: "Multigrano",             emoji: "🌾", available: true },
  { id: 15, name: "Baguette",               category: "panaderia",       price: 900,   unit: "unidad",  description: "Recién horneada",        emoji: "🥖", available: true },
  { id: 16, name: "Coca-Cola",              category: "bebidas",         price: 800,   unit: "2L",      description: "Original",               emoji: "🥤", available: true },
  { id: 17, name: "Agua Mineral",           category: "bebidas",         price: 500,   unit: "500ml",   description: "Cristal",                emoji: "💧", available: true },
  { id: 18, name: "Jugo de Naranja",        category: "bebidas",         price: 2200,  unit: "1L",      description: "Natural exprimido",      emoji: "🍊", available: true },
  { id: 19, name: "Té Frío",               category: "bebidas",         price: 900,   unit: "500ml",   description: "Limón y menta",          emoji: "🧋", available: true },
  { id: 20, name: "Cerveza Imperial",       category: "licores",         price: 700,   unit: "350ml",   description: "Lager nacional",         emoji: "🍺", available: true },
  { id: 21, name: "Vino Tinto Reserva",    category: "licores",         price: 8500,  unit: "750ml",   description: "Cabernet Sauvignon",     emoji: "🍷", available: true },
  { id: 22, name: "Ron Flor de Caña",      category: "licores",         price: 12000, unit: "750ml",   description: "4 años añejado",         emoji: "🥃", available: true },
  { id: 23, name: "Whisky Johnnie Walker",  category: "licores",         price: 18500, unit: "750ml",   description: "Red Label",              emoji: "🥃", available: true },
  { id: 24, name: "Papas Lay's",            category: "snacks",          price: 950,   unit: "150g",    description: "Clásicas",               emoji: "🍟", available: true },
  { id: 25, name: "Nachos Doritos",         category: "snacks",          price: 1100,  unit: "200g",    description: "Queso nacho",            emoji: "🌮", available: true },
  { id: 26, name: "Galletas Oreo",          category: "snacks",          price: 1200,  unit: "paquete", description: "Original",               emoji: "🍪", available: true },
  { id: 27, name: "Detergente Ariel",       category: "limpieza",        price: 3500,  unit: "2kg",     description: "Aroma floral",           emoji: "🧴", available: true },
  { id: 28, name: "Suavizante Downy",       category: "limpieza",        price: 2800,  unit: "1L",      description: "Primavera fresca",       emoji: "🌸", available: true },
  { id: 29, name: "Desinfectante Pino",     category: "limpieza",        price: 2200,  unit: "1L",      description: "Limpieza profunda",      emoji: "🧹", available: true },
]

const DEFAULT_SETTINGS = {
  storeName:   "Marketcito",
  whatsapp:    "50671054378",
  deliveryFee: 1500,
  minOrder:    5000,
  adminPwd:    "admin1234",
}

// ── Helpers ────────────────────────────────────────────────────
const fmt      = (n) => `${CURRENCY}${Number(n).toLocaleString("es-CR")}`
const catLabel = (id) => CATEGORY_OPTIONS.find((c) => c.id === id)?.label ?? id

const loadLS = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}

const FONT = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif" }

// ══════════════════════════════════════════════════════════════
export default function App() {
  // ── Persistent state ────────────────────────────────────────
  const [products, setProducts] = useState(() => loadLS("mkt_products", DEFAULT_PRODUCTS))
  const [settings, setSettings] = useState(() => loadLS("mkt_settings", DEFAULT_SETTINGS))

  useEffect(() => { localStorage.setItem("mkt_products", JSON.stringify(products)) }, [products])
  useEffect(() => { localStorage.setItem("mkt_settings", JSON.stringify(settings)) }, [settings])

  // ── View / session ──────────────────────────────────────────
  const [view,      setView]      = useState("customer") // "customer" | "admin"
  const [isAdmin,   setIsAdmin]   = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  // ── Admin UI state ──────────────────────────────────────────
  const [adminTab,      setAdminTab]      = useState("products")
  const [productModal,  setProductModal]  = useState(null)   // null | { mode, product? }
  const [settingsDraft, setSettingsDraft] = useState(settings)
  const [settingsSaved, setSettingsSaved] = useState(false)

  // ── Customer state ──────────────────────────────────────────
  const [cart,           setCart]           = useState({})
  const [showCart,       setShowCart]       = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [search,         setSearch]         = useState("")
  const [deliveryType,   setDeliveryType]   = useState("pickup") // "pickup" | "delivery"
  const [customer,       setCustomer]       = useState({ name: "", phone: "", address: "", notes: "" })
  const [orderErrors,    setOrderErrors]    = useState({})

  // ── Cart helpers ─────────────────────────────────────────────
  const addItem    = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const removeItem = (id) => setCart((c) => { const n = { ...c }; if (n[id] > 1) n[id]--; else delete n[id]; return n })
  const deleteItem = (id) => setCart((c) => { const n = { ...c }; delete n[id]; return n })

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ ...products.find((p) => p.id === Number(id)), qty }))
    .filter((i) => i.qty > 0 && i.name)

  const cartCount  = cartItems.reduce((s, i) => s + i.qty, 0)
  const subtotal   = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const isDelivery = deliveryType === "delivery"
  const total      = subtotal + (isDelivery && subtotal > 0 ? settings.deliveryFee : 0)

  // ── WhatsApp order ───────────────────────────────────────────
  const sendOrder = () => {
    const e = {}
    if (!customer.name.trim())                          e.name    = "Requerido"
    if (!customer.phone.trim())                         e.phone   = "Requerido"
    if (isDelivery && !customer.address.trim())         e.address = "Requerido"
    if (isDelivery && subtotal < settings.minOrder)     e.min     = `El pedido mínimo para envío es ${fmt(settings.minOrder)}`
    setOrderErrors(e)
    if (Object.keys(e).length > 0) return

    const lines = cartItems.map((i) => `• ${i.qty}x ${i.name} — ${fmt(i.price * i.qty)}`).join("\n")
    const deliveryLine = isDelivery
      ? `📍 *Dirección:* ${customer.address}\n`
      : `🏪 *Entrega:* Retiro en tienda\n`
    const totalsLine = isDelivery
      ? `Subtotal: ${fmt(subtotal)}\nEnvío: ${fmt(settings.deliveryFee)}\n*TOTAL: ${fmt(total)}*`
      : `*TOTAL: ${fmt(subtotal)}*`
    const msg = `🛒 *NUEVO PEDIDO — ${settings.storeName}*\n\n👤 *Cliente:* ${customer.name}\n📞 *Teléfono:* ${customer.phone}\n${deliveryLine}${customer.notes ? `📝 *Notas:* ${customer.notes}\n` : ""}\n*Productos:*\n${lines}\n\n────────────────\n${totalsLine}`
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank")

    setCart({})
    setCustomer({ name: "", phone: "", address: "", notes: "" })
    setOrderErrors({})
    setShowCart(false)
  }

  // ── Admin actions ────────────────────────────────────────────
  const login = (pwd) => {
    if (pwd === settings.adminPwd) {
      setIsAdmin(true)
      setView("admin")
      setShowLogin(false)
      setSettingsDraft({ ...settings })
      return true
    }
    return false
  }

  const logout = () => { setIsAdmin(false); setView("customer") }

  const saveProduct = (data) => {
    if (data.id) {
      setProducts((p) => p.map((x) => (x.id === data.id ? data : x)))
    } else {
      const maxId = Math.max(...products.map((p) => p.id), 0)
      setProducts((p) => [...p, { ...data, id: maxId + 1, available: true }])
    }
    setProductModal(null)
  }

  const deleteProduct = (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return
    setProducts((p) => p.filter((x) => x.id !== id))
    setCart((c) => { const n = { ...c }; delete n[id]; return n })
  }

  const toggleAvailable = (id) =>
    setProducts((p) => p.map((x) => (x.id === id ? { ...x, available: !x.available } : x)))

  const saveSettings = () => {
    setSettings(settingsDraft)
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 2500)
  }

  // ── Filtered products (customer) ─────────────────────────────
  const filtered = products
    .filter((p) => p.available)
    .filter((p) => {
      const matchCat    = activeCategory === "all" || p.category === activeCategory
      const matchSearch = search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })

  // ════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-white" style={FONT}>

      {/* ═══════════════════ CUSTOMER VIEW ═══════════════════ */}
      {view === "customer" && (
        <>
          <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-10">
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-semibold tracking-tight text-gray-900">{settings.storeName}</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest hidden sm:inline">Supermercado</span>
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="relative flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Carrito</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-6">
            <section className="py-16 pb-10">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Supermercado</p>
              <h2 className="text-5xl font-bold text-gray-900 tracking-tight leading-none mb-4">Catálogo.</h2>
              <p className="text-gray-400 max-w-md">
                Todo lo que necesitas, en un solo lugar.{" "}
                <span className="text-gray-300">Envío {fmt(settings.deliveryFee)} · Mínimo {fmt(settings.minOrder)}</span>
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
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeCategory === cat.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
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
                    <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all flex flex-col">
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
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button onClick={() => removeItem(product.id)} className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                              <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="text-sm font-semibold text-gray-900 w-4 text-center">{qty}</span>
                            <button onClick={() => addItem(product.id)} className="w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
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
              <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} {settings.storeName}</p>
              {isAdmin ? (
                <button onClick={() => setView("admin")} className="text-xs text-gray-400 hover:text-gray-700 transition-colors cursor-pointer">
                  ← Panel admin
                </button>
              ) : (
                <button onClick={() => setShowLogin(true)} className="text-xs text-gray-300 hover:text-gray-400 transition-colors cursor-pointer">
                  Admin
                </button>
              )}
            </div>
          </footer>

          {/* Cart Drawer */}
          {showCart && (
            <div
              className="fixed inset-0 z-50 flex justify-end"
              style={{ background: "rgba(0,0,0,0.3)" }}
              onClick={() => setShowCart(false)}
            >
              <div className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Tu carrito</h2>
                    <p className="text-xs text-gray-400">{cartCount} {cartCount === 1 ? "producto" : "productos"}</p>
                  </div>
                  <button onClick={() => setShowCart(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="flex-1 px-6 py-6 flex flex-col gap-6">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                      <ShoppingBag className="w-12 h-12 text-gray-200 mb-4" />
                      <p className="text-gray-900 font-medium mb-1">Tu carrito está vacío</p>
                      <p className="text-sm text-gray-400">Agrega productos del catálogo.</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-gray-50">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{item.emoji}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 leading-snug">{item.name}</p>
                              <p className="text-xs text-gray-400 mb-2">{fmt(item.price)} / {item.unit}</p>
                              <div className="flex items-center gap-2">
                                <button onClick={() => removeItem(item.id)} className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                                  <Minus className="w-3 h-3 text-gray-600" />
                                </button>
                                <span className="text-sm font-semibold text-gray-900 w-5 text-center">{item.qty}</span>
                                <button onClick={() => addItem(item.id)} className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                              <p className="text-sm font-semibold text-gray-900">{fmt(item.price * item.qty)}</p>
                              <button onClick={() => deleteItem(item.id)} className="text-gray-300 hover:text-gray-500 transition-colors cursor-pointer">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Delivery type selector */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Tipo de entrega</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "pickup",   label: "🏪 Recoger en tienda", sub: "Sin mínimo · Gratis" },
                            { id: "delivery", label: "🛵 A domicilio",        sub: `Mínimo ${fmt(settings.minOrder)} · +${fmt(settings.deliveryFee)}` },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => { setDeliveryType(opt.id); setOrderErrors({}) }}
                              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                                deliveryType === opt.id
                                  ? "border-gray-900 bg-gray-900 text-white"
                                  : "border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200"
                              }`}
                            >
                              <p className="text-sm font-medium leading-snug">{opt.label}</p>
                              <p className={`text-xs mt-0.5 ${deliveryType === opt.id ? "text-gray-400" : "text-gray-400"}`}>{opt.sub}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Totals */}
                      <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                        <div className="flex justify-between text-sm text-gray-500"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                        {isDelivery && (
                          <div className="flex justify-between text-sm text-gray-500"><span>Envío</span><span>{fmt(settings.deliveryFee)}</span></div>
                        )}
                        <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-200"><span>Total</span><span>{fmt(total)}</span></div>
                      </div>

                      {/* Customer form */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Tus datos</h3>
                        <Field icon={User}   placeholder="Nombre completo"     value={customer.name}    onChange={(v) => setCustomer({ ...customer, name: v })}    error={orderErrors.name} />
                        <Field icon={Phone}  placeholder="Teléfono"             value={customer.phone}   onChange={(v) => setCustomer({ ...customer, phone: v })}   error={orderErrors.phone} />
                        {isDelivery && (
                          <Field icon={MapPin} placeholder="Dirección de entrega" value={customer.address} onChange={(v) => setCustomer({ ...customer, address: v })} error={orderErrors.address} multiline />
                        )}
                        <Field placeholder="Notas opcionales..." value={customer.notes} onChange={(v) => setCustomer({ ...customer, notes: v })} multiline />
                      </div>

                      {orderErrors.min && (
                        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{orderErrors.min}</div>
                      )}

                      <button onClick={sendOrder} className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
                        <MessageCircle className="w-5 h-5" />
                        Enviar pedido por WhatsApp
                      </button>
                      <p className="text-xs text-gray-400 text-center -mt-3">Se abrirá WhatsApp con tu pedido listo para enviar.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ═══════════════════ ADMIN VIEW ══════════════════════ */}
      {view === "admin" && (
        <>
          <header className="sticky top-0 bg-white border-b border-gray-100 z-10">
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold tracking-tight text-gray-900">{settings.storeName}</span>
                <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full font-medium">Admin</span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setView("customer")} className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
                  Ver tienda →
                </button>
                <button onClick={logout} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer" title="Cerrar sesión">
                  <LogOut className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-6 py-8">
            {/* Tabs */}
            <div className="flex gap-0 mb-8 border-b border-gray-100">
              {[{ id: "products", label: "Productos", icon: Package }, { id: "settings", label: "Ajustes", icon: Settings }].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setAdminTab(tab.id); if (tab.id === "settings") setSettingsDraft({ ...settings }) }}
                    className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
                      adminTab === tab.id ? "border-gray-900 text-gray-900" : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* ── Products Tab ───────────────────────────── */}
            {adminTab === "products" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Productos</h2>
                    <p className="text-sm text-gray-400">
                      {products.filter((p) => p.available).length} visibles · {products.filter((p) => !p.available).length} ocultos
                    </p>
                  </div>
                  <button
                    onClick={() => setProductModal({ mode: "add" })}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Agregar
                  </button>
                </div>

                <div className="space-y-2 pb-16">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                        product.available ? "bg-white border-gray-100 hover:border-gray-200" : "bg-gray-50 border-gray-100 opacity-50"
                      }`}
                    >
                      <span className="text-2xl w-8 text-center flex-shrink-0">{product.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">{catLabel(product.category)}</span>
                          <span className="text-gray-200">·</span>
                          <span className="text-xs font-semibold text-gray-700">{fmt(product.price)}</span>
                          <span className="text-xs text-gray-400">/ {product.unit}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleAvailable(product.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                            product.available ? "bg-green-100 text-green-600 hover:bg-green-200" : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                          }`}
                          title={product.available ? "Ocultar" : "Mostrar"}
                        >
                          {product.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setProductModal({ mode: "edit", product })}
                          className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                          title="Editar"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="w-8 h-8 bg-red-50 text-red-400 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Settings Tab ───────────────────────────── */}
            {adminTab === "settings" && (
              <div className="max-w-md pb-16">
                <h2 className="text-xl font-semibold text-gray-900 mb-8">Ajustes</h2>
                <div className="space-y-5">
                  <SettingsField
                    label="Nombre de la tienda"
                    value={settingsDraft.storeName}
                    onChange={(v) => setSettingsDraft((s) => ({ ...s, storeName: v }))}
                  />
                  <SettingsField
                    label="Número de WhatsApp"
                    hint="Código de país + número, sin + ni espacios. Ej: 506XXXXXXXX"
                    value={settingsDraft.whatsapp}
                    onChange={(v) => setSettingsDraft((s) => ({ ...s, whatsapp: v }))}
                    mono
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <SettingsField
                      label="Costo de envío (₡)"
                      type="number"
                      value={settingsDraft.deliveryFee}
                      onChange={(v) => setSettingsDraft((s) => ({ ...s, deliveryFee: Number(v) }))}
                    />
                    <SettingsField
                      label="Pedido mínimo (₡)"
                      type="number"
                      value={settingsDraft.minOrder}
                      onChange={(v) => setSettingsDraft((s) => ({ ...s, minOrder: Number(v) }))}
                    />
                  </div>
                  <SettingsField
                    label="Contraseña de admin"
                    type="password"
                    value={settingsDraft.adminPwd}
                    onChange={(v) => setSettingsDraft((s) => ({ ...s, adminPwd: v }))}
                  />
                  <button
                    onClick={saveSettings}
                    className={`w-full py-3 rounded-2xl font-semibold text-sm transition-colors cursor-pointer ${
                      settingsSaved ? "bg-green-500 text-white" : "bg-gray-900 text-white hover:bg-gray-700"
                    }`}
                  >
                    {settingsSaved ? "✓ Cambios guardados" : "Guardar cambios"}
                  </button>
                </div>
              </div>
            )}
          </main>
        </>
      )}

      {/* ═══════════════════ MODALS ══════════════════════════ */}
      {showLogin && <LoginModal onLogin={login} onClose={() => setShowLogin(false)} />}
      {productModal && (
        <ProductModal
          mode={productModal.mode}
          initial={productModal.product}
          onSave={saveProduct}
          onClose={() => setProductModal(null)}
        />
      )}
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────

function LoginModal({ onLogin, onClose }) {
  const [pwd, setPwd] = useState("")
  const [error, setError] = useState("")

  const submit = () => {
    if (onLogin(pwd)) return
    setError("Contraseña incorrecta")
    setPwd("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.35)", ...FONT }} onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Panel de administrador</h2>
          <p className="text-sm text-gray-400 mt-1">Ingresa tu contraseña para continuar</p>
        </div>
        <div className="space-y-3">
          <input
            type="password"
            placeholder="Contraseña"
            value={pwd}
            autoFocus
            onChange={(e) => { setPwd(e.target.value); setError("") }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className={`w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:bg-gray-100 transition-colors ${error ? "ring-1 ring-red-400" : ""}`}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button onClick={submit} className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer">
            Ingresar
          </button>
          <button onClick={onClose} className="w-full text-sm text-gray-400 py-2 hover:text-gray-600 transition-colors cursor-pointer">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductModal({ mode, initial, onSave, onClose }) {
  const blank = { emoji: "", name: "", category: CATEGORY_OPTIONS[0].id, price: "", unit: "", description: "" }
  const [form, setForm] = useState(initial ? { ...initial, price: String(initial.price) } : blank)
  const [errors, setErrors] = useState({})

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const submit = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Requerido"
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = "Ingresa un precio válido"
    if (!form.unit.trim()) e.unit = "Requerido"
    setErrors(e)
    if (Object.keys(e).length > 0) return
    onSave({ ...form, price: Number(form.price), id: initial?.id, available: initial?.available ?? true })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)", ...FONT }} onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{mode === "add" ? "Agregar producto" : "Editar producto"}</h2>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[65vh]">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Emoji</label>
            <input type="text" value={form.emoji} onChange={set("emoji")} placeholder="🥑" maxLength={4}
              className="w-24 bg-gray-50 rounded-xl px-4 py-3 text-2xl outline-none focus:bg-gray-100 transition-colors text-center" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Nombre</label>
            <input type="text" value={form.name} onChange={set("name")} placeholder="Aguacate Hass"
              className={`w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:bg-gray-100 transition-colors ${errors.name ? "ring-1 ring-red-400" : ""}`} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Categoría</label>
            <select value={form.category} onChange={set("category")}
              className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:bg-gray-100 transition-colors cursor-pointer">
              {CATEGORY_OPTIONS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Precio (₡)</label>
              <input type="number" value={form.price} onChange={set("price")} placeholder="1500"
                className={`w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:bg-gray-100 transition-colors ${errors.price ? "ring-1 ring-red-400" : ""}`} />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Unidad</label>
              <input type="text" value={form.unit} onChange={set("unit")} placeholder="kg"
                className={`w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:bg-gray-100 transition-colors ${errors.unit ? "ring-1 ring-red-400" : ""}`} />
              {errors.unit && <p className="text-xs text-red-500 mt-1">{errors.unit}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Descripción</label>
            <input type="text" value={form.description} onChange={set("description")} placeholder="Orgánico, de temporada"
              className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:bg-gray-100 transition-colors" />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
            Cancelar
          </button>
          <button onClick={submit} className="flex-1 py-3 rounded-xl text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors cursor-pointer">
            {mode === "add" ? "Agregar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  )
}

function SettingsField({ label, hint, value, onChange, type = "text", mono = false }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:bg-gray-100 transition-colors ${mono ? "font-mono" : ""}`}
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

function Field({ icon: Icon, placeholder, value, onChange, error, multiline }) {
  const Tag = multiline ? "textarea" : "input"
  return (
    <div>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-300 pointer-events-none" />}
        <Tag
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={multiline ? 2 : undefined}
          className={`w-full bg-gray-50 rounded-xl text-sm text-gray-900 placeholder-gray-300 outline-none focus:bg-gray-100 transition-colors resize-none py-3 pr-4 ${Icon ? "pl-10" : "pl-4"} ${error ? "ring-1 ring-red-400" : ""}`}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  )
}
