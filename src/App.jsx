import { useState } from "react"
import { Search } from "lucide-react"

const CONFIG = {
  storeName: "Marketcito",
  tagline: "Supermercado",
  currency: "₡",
}

const CATEGORIES = [
  { id: "all",            label: "Todo" },
  { id: "frutas-verduras", label: "Frutas y Verduras" },
  { id: "lacteos",        label: "Lácteos" },
  { id: "carnes",         label: "Carnes y Aves" },
  { id: "panaderia",      label: "Panadería" },
  { id: "bebidas",        label: "Bebidas" },
  { id: "licores",        label: "Licores" },
  { id: "snacks",         label: "Snacks" },
  { id: "limpieza",       label: "Limpieza" },
]

const PRODUCTS = [
  { id: 1,  name: "Manzanas Rojas",         category: "frutas-verduras", price: 1200,  unit: "kg",     description: "Frescas y dulces",         emoji: "🍎" },
  { id: 2,  name: "Bananos",                category: "frutas-verduras", price: 800,   unit: "kg",     description: "Maduros y naturales",      emoji: "🍌" },
  { id: 3,  name: "Tomates",                category: "frutas-verduras", price: 900,   unit: "kg",     description: "Tomate manzana",           emoji: "🍅" },
  { id: 4,  name: "Lechuga Romana",         category: "frutas-verduras", price: 600,   unit: "unidad", description: "Fresca y crujiente",       emoji: "🥬" },
  { id: 5,  name: "Zanahorias",             category: "frutas-verduras", price: 700,   unit: "kg",     description: "Orgánicas",                emoji: "🥕" },
  { id: 6,  name: "Leche Entera",           category: "lacteos",         price: 1500,  unit: "litro",  description: "Dos Pinos",                emoji: "🥛" },
  { id: 7,  name: "Yogurt Natural",         category: "lacteos",         price: 1200,  unit: "500g",   description: "Sin azúcar añadida",       emoji: "🫙" },
  { id: 8,  name: "Queso Turrialba",        category: "lacteos",         price: 3200,  unit: "kg",     description: "Artesanal",                emoji: "🧀" },
  { id: 9,  name: "Mantequilla",            category: "lacteos",         price: 2100,  unit: "250g",   description: "Sin sal",                  emoji: "🧈" },
  { id: 10, name: "Pechuga de Pollo",       category: "carnes",          price: 4500,  unit: "kg",     description: "Fresca",                   emoji: "🍗" },
  { id: 11, name: "Carne Molida",           category: "carnes",          price: 5200,  unit: "kg",     description: "90% magra",                emoji: "🥩" },
  { id: 12, name: "Chuleta de Cerdo",       category: "carnes",          price: 4800,  unit: "kg",     description: "Ahumada",                  emoji: "🥓" },
  { id: 13, name: "Pan Blanco",             category: "panaderia",       price: 1100,  unit: "unidad", description: "Bimbo grande",             emoji: "🍞" },
  { id: 14, name: "Pan Integral",           category: "panaderia",       price: 1300,  unit: "unidad", description: "Multigrano",               emoji: "🌾" },
  { id: 15, name: "Baguette",               category: "panaderia",       price: 900,   unit: "unidad", description: "Recién horneada",          emoji: "🥖" },
  { id: 16, name: "Coca-Cola",              category: "bebidas",         price: 800,   unit: "2L",     description: "Original",                 emoji: "🥤" },
  { id: 17, name: "Agua Mineral",           category: "bebidas",         price: 500,   unit: "500ml",  description: "Cristal",                  emoji: "💧" },
  { id: 18, name: "Jugo de Naranja",        category: "bebidas",         price: 2200,  unit: "1L",     description: "Natural exprimido",        emoji: "🍊" },
  { id: 19, name: "Té Frío",               category: "bebidas",         price: 900,   unit: "500ml",  description: "Limón y menta",            emoji: "🧋" },
  { id: 20, name: "Cerveza Imperial",       category: "licores",         price: 700,   unit: "350ml",  description: "Lager nacional",           emoji: "🍺" },
  { id: 21, name: "Vino Tinto Reserva",    category: "licores",         price: 8500,  unit: "750ml",  description: "Cabernet Sauvignon",       emoji: "🍷" },
  { id: 22, name: "Ron Flor de Caña",      category: "licores",         price: 12000, unit: "750ml",  description: "4 años añejado",           emoji: "🥃" },
  { id: 23, name: "Whisky Johnnie Walker",  category: "licores",         price: 18500, unit: "750ml",  description: "Red Label",                emoji: "🥃" },
  { id: 24, name: "Papas Lay's",            category: "snacks",          price: 950,   unit: "150g",   description: "Clásicas",                 emoji: "🍟" },
  { id: 25, name: "Nachos Doritos",         category: "snacks",          price: 1100,  unit: "200g",   description: "Queso nacho",              emoji: "🌮" },
  { id: 26, name: "Galletas Oreo",          category: "snacks",          price: 1200,  unit: "paquete",description: "Original",                 emoji: "🍪" },
  { id: 27, name: "Detergente Ariel",       category: "limpieza",        price: 3500,  unit: "2kg",    description: "Aroma floral",             emoji: "🧴" },
  { id: 28, name: "Suavizante Downy",       category: "limpieza",        price: 2800,  unit: "1L",     description: "Primavera fresca",         emoji: "🌸" },
  { id: 29, name: "Desinfectante Pino",     category: "limpieza",        price: 2200,  unit: "1L",     description: "Limpieza profunda",        emoji: "🧹" },
]

const fmt = (price) => `${CONFIG.currency}${price.toLocaleString("es-CR")}`

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif" }}
    >
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-lg font-semibold tracking-tight text-gray-900">{CONFIG.storeName}</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest hidden sm:inline">{CONFIG.tagline}</span>
          </div>
          <span className="text-xs text-gray-400">{PRODUCTS.length} productos</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        <section className="py-16 pb-10">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">{CONFIG.tagline}</p>
          <h2 className="text-5xl font-bold text-gray-900 tracking-tight leading-none mb-4">Catálogo.</h2>
          <p className="text-lg text-gray-400 max-w-md">Todo lo que necesitas, en un solo lugar.</p>
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

        <div className="flex gap-2 flex-wrap mb-10">
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
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all group"
              >
                <div className="w-full aspect-square bg-gray-50 rounded-xl flex items-center justify-center mb-4 text-4xl group-hover:bg-gray-100 transition-colors">
                  {product.emoji}
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  {CATEGORIES.find((c) => c.id === product.category)?.label}
                </p>
                <h3 className="font-medium text-gray-900 text-sm leading-snug mb-1">{product.name}</h3>
                <p className="text-xs text-gray-400 mb-4">{product.description}</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{fmt(product.price)}</p>
                  <p className="text-xs text-gray-400">por {product.unit}</p>
                </div>
              </div>
            ))}
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
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} {CONFIG.storeName}</p>
          <p className="text-xs text-gray-300 uppercase tracking-widest">{CONFIG.tagline}</p>
        </div>
      </footer>
    </div>
  )
}
