import { useState, useMemo, useEffect } from "react";
import { ShoppingBag, Plus, Minus, X, Search, MapPin, Phone, User, MessageCircle, Trash2 } from "lucide-react";

// ============================================================
//  CONFIGURACIÓN — Edita estos valores
// ============================================================

// IMPORTANTE: Número en formato internacional, SIN +, SIN espacios, SIN guiones.
// Ejemplo Costa Rica: 506 + número de 8 dígitos = "50688888888"
const WHATSAPP_NUMBER = "50688888888";

const RESTAURANT_NAME = "La Trattoria";
const RESTAURANT_TAGLINE = "Cocina italiana — desde 1998";
const CURRENCY_SYMBOL = "₡";
const DELIVERY_FEE = 1500;
const MIN_ORDER = 5000;

// ============================================================
//  MENÚ — Reemplaza con tus productos reales
// ============================================================

const MENU = [
  // Entradas
  { id: 1,  name: "Bruschetta Pomodoro",      desc: "Pan tostado, tomate, albahaca, aceite de oliva",     price: 3200, cat: "Entradas" },
  { id: 2,  name: "Carpaccio di Manzo",        desc: "Lonjas finas de res, rúcula, parmesano, alcaparras",  price: 5800, cat: "Entradas" },
  { id: 3,  name: "Caprese Tradicional",       desc: "Mozzarella di bufala, tomate, albahaca fresca",       price: 4500, cat: "Entradas" },
  { id: 4,  name: "Antipasto della Casa",      desc: "Selección de embutidos, quesos, aceitunas",           price: 6800, cat: "Entradas" },

  // Pastas
  { id: 10, name: "Spaghetti Carbonara",       desc: "Guanciale, yema de huevo, pecorino, pimienta negra",  price: 6500, cat: "Pastas" },
  { id: 11, name: "Fettuccine Alfredo",        desc: "Mantequilla, parmesano reggiano, crema",              price: 6200, cat: "Pastas" },
  { id: 12, name: "Penne Arrabbiata",          desc: "Tomate, ajo, chile, perejil",                         price: 5500, cat: "Pastas" },
  { id: 13, name: "Lasagna Bolognesa",         desc: "Capas de pasta, ragú de res, bechamel",              price: 7200, cat: "Pastas" },
  { id: 14, name: "Ravioli Ricotta y Espinaca", desc: "Salsa de mantequilla y salvia",                      price: 6800, cat: "Pastas" },

  // Pizzas
  { id: 20, name: "Margherita",                desc: "Tomate San Marzano, mozzarella, albahaca",            price: 5500, cat: "Pizzas" },
  { id: 21, name: "Quattro Formaggi",          desc: "Mozzarella, gorgonzola, parmesano, fontina",          price: 6800, cat: "Pizzas" },
  { id: 22, name: "Diavola",                   desc: "Salami picante, mozzarella, chile",                   price: 6500, cat: "Pizzas" },
  { id: 23, name: "Prosciutto e Funghi",       desc: "Jamón, champiñones, mozzarella",                     price: 7000, cat: "Pizzas" },

  // Principales
  { id: 30, name: "Osso Buco alla Milanese",   desc: "Jarrete de ternera, gremolata, risotto azafrán",     price: 12500, cat: "Principales" },
  { id: 31, name: "Saltimbocca alla Romana",   desc: "Ternera, jamón, salvia, vino blanco",                 price: 9800, cat: "Principales" },
  { id: 32, name: "Pollo Parmigiana",          desc: "Pechuga empanizada, salsa pomodoro, mozzarella",     price: 8500, cat: "Principales" },

  // Postres
  { id: 40, name: "Tiramisú della Casa",       desc: "Receta tradicional con mascarpone y café espresso",   price: 3800, cat: "Postres" },
  { id: 41, name: "Panna Cotta",               desc: "Crema cocida, coulis de frutos rojos",                price: 3200, cat: "Postres" },
  { id: 42, name: "Cannoli Siciliani",         desc: "Rellenos de ricotta dulce y pistacho",                price: 3500, cat: "Postres" },

  // Bebidas
  { id: 50, name: "Vino Tinto Casa (copa)",    desc: "Chianti DOCG",                                        price: 2800, cat: "Bebidas" },
  { id: 51, name: "Limonata Italiana",         desc: "Limón siciliano, agua mineral",                       price: 1500, cat: "Bebidas" },
  { id: 52, name: "Espresso",                  desc: "Café italiano, doble shot",                           price: 1200, cat: "Bebidas" },
  { id: 53, name: "Agua Mineral 500ml",        desc: "Con gas o sin gas",                                   price: 1000, cat: "Bebidas" },
];

// ============================================================
//  COMPONENTE
// ============================================================

const COLORS = {
  bg:        "#F7F1E3",
  card:      "#FBF6E9",
  ink:       "#1F1611",
  inkSoft:   "#5E4A3C",
  accent:    "#7A1F1F",
  accentDk:  "#5C1414",
  whatsapp:  "#25D366",
  border:    "#E0D3B8",
};

const fmt = (n) => `${CURRENCY_SYMBOL}${n.toLocaleString("es-CR")}`;

export default function App() {
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [activeCat, setActiveCat] = useState("Todos");
  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState({});

  // Cargar fuentes
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=Manrope:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const categories = ["Todos", ...Array.from(new Set(MENU.map(m => m.cat)))];

  const filtered = useMemo(() => {
    return MENU.filter(item => {
      const matchCat = activeCat === "Todos" || item.cat === activeCat;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
                       || item.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCat, search]);

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const item = MENU.find(m => m.id === Number(id));
    return { ...item, qty };
  }).filter(i => i.qty > 0);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + (subtotal > 0 ? DELIVERY_FEE : 0);

  const addItem = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeItem = (id) => setCart(c => {
    const newCart = { ...c };
    if (newCart[id] > 1) newCart[id]--;
    else delete newCart[id];
    return newCart;
  });
  const deleteItem = (id) => setCart(c => {
    const newCart = { ...c };
    delete newCart[id];
    return newCart;
  });

  const validateAndSend = () => {
    const e = {};
    if (!customer.name.trim()) e.name = "Requerido";
    if (!customer.phone.trim()) e.phone = "Requerido";
    if (!customer.address.trim()) e.address = "Requerido";
    if (subtotal < MIN_ORDER) e.min = `Pedido mínimo ${fmt(MIN_ORDER)}`;
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const lines = cartItems.map(i =>
      `• ${i.qty}x ${i.name} — ${fmt(i.price * i.qty)}`
    ).join("\n");

    const message =
`🍽️ *NUEVO PEDIDO — ${RESTAURANT_NAME}*

👤 *Cliente:* ${customer.name}
📞 *Teléfono:* ${customer.phone}
📍 *Dirección:* ${customer.address}
${customer.notes ? `📝 *Notas:* ${customer.notes}\n` : ""}
🛒 *Pedido:*
${lines}

────────────────
Subtotal: ${fmt(subtotal)}
Envío: ${fmt(DELIVERY_FEE)}
*TOTAL: ${fmt(total)}*`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'Manrope', sans-serif", color: COLORS.ink }}>

      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${COLORS.border}`, background: COLORS.bg, position: "sticky", top: 0, zIndex: 30 }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: COLORS.inkSoft, textTransform: "uppercase" }}>
              ✦ Menú & Pedidos ✦
            </div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 500, lineHeight: 1, marginTop: 4, fontStyle: "italic" }}>
              {RESTAURANT_NAME}
            </h1>
          </div>
          <button
            onClick={() => setShowCart(true)}
            style={{ background: COLORS.ink, color: COLORS.bg }}
            className="relative px-5 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition"
          >
            <ShoppingBag size={18} />
            <span className="font-medium">Carrito</span>
            {cartCount > 0 && (
              <span style={{ background: COLORS.accent, color: "white" }} className="absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* HERO */}
        <div className="text-center mb-12">
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: COLORS.inkSoft, fontSize: 18 }}>
            {RESTAURANT_TAGLINE}
          </p>
          <div style={{ width: 60, height: 1, background: COLORS.accent, margin: "20px auto" }} />
          <p style={{ color: COLORS.inkSoft, fontSize: 14 }}>
            Pedido mínimo {fmt(MIN_ORDER)} · Envío {fmt(DELIVERY_FEE)}
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-6 max-w-md mx-auto relative">
          <Search size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: COLORS.inkSoft }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar plato..."
            style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.ink }}
            className="w-full pl-12 pr-4 py-3 rounded-full focus:outline-none"
          />
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 justify-center flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                background: activeCat === cat ? COLORS.ink : "transparent",
                color: activeCat === cat ? COLORS.bg : COLORS.ink,
                border: `1px solid ${activeCat === cat ? COLORS.ink : COLORS.border}`,
              }}
              className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MENU GRID */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map(item => (
            <div
              key={item.id}
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
              className="rounded-2xl p-6 flex justify-between gap-4 hover:shadow-md transition"
            >
              <div className="flex-1">
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: COLORS.accent, textTransform: "uppercase", marginBottom: 6 }}>
                  {item.cat}
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500, lineHeight: 1.2 }}>
                  {item.name}
                </h3>
                <p style={{ color: COLORS.inkSoft, fontSize: 14, marginTop: 6, fontStyle: "italic" }}>
                  {item.desc}
                </p>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 500, marginTop: 12, color: COLORS.accent }}>
                  {fmt(item.price)}
                </div>
              </div>
              <button
                onClick={() => addItem(item.id)}
                style={{ background: COLORS.accent, color: "white" }}
                className="self-end w-11 h-11 rounded-full flex items-center justify-center hover:scale-105 transition flex-shrink-0"
                aria-label={`Agregar ${item.name}`}
              >
                <Plus size={20} />
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: COLORS.inkSoft }}>
            <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 20 }}>
              No hay platos que coincidan con tu búsqueda
            </p>
          </div>
        )}
      </main>

      {/* CART DRAWER */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "rgba(31,22,17,0.5)" }} onClick={() => setShowCart(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: COLORS.bg, width: "100%", maxWidth: 480 }}
            className="h-full overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 px-6 py-5 flex justify-between items-center" style={{ background: COLORS.bg, borderBottom: `1px solid ${COLORS.border}` }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.25em", color: COLORS.inkSoft, textTransform: "uppercase" }}>Tu pedido</div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontStyle: "italic" }}>Carrito</h2>
              </div>
              <button onClick={() => setShowCart(false)} className="p-2 hover:opacity-60">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-16" style={{ color: COLORS.inkSoft }}>
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
                  <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 18 }}>
                    Tu carrito está vacío
                  </p>
                </div>
              ) : (
                <>
                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-3 pb-4" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                        <div className="flex-1">
                          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500 }}>
                            {item.name}
                          </div>
                          <div style={{ color: COLORS.accent, fontSize: 14, marginTop: 2 }}>
                            {fmt(item.price)}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => removeItem(item.id)} style={{ border: `1px solid ${COLORS.border}` }} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5">
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center font-medium">{item.qty}</span>
                            <button onClick={() => addItem(item.id)} style={{ border: `1px solid ${COLORS.border}` }} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5">
                              <Plus size={12} />
                            </button>
                            <button onClick={() => deleteItem(item.id)} className="ml-auto p-1 hover:opacity-60" style={{ color: COLORS.inkSoft }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500 }}>
                          {fmt(item.price * item.qty)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between" style={{ color: COLORS.inkSoft }}>
                      <span>Subtotal</span><span>{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between" style={{ color: COLORS.inkSoft }}>
                      <span>Envío</span><span>{fmt(DELIVERY_FEE)}</span>
                    </div>
                    <div className="flex justify-between pt-3 mt-3" style={{ borderTop: `1px solid ${COLORS.border}`, fontFamily: "'Fraunces', serif", fontSize: 22 }}>
                      <span>Total</span><span>{fmt(total)}</span>
                    </div>
                  </div>

                  {/* Customer form */}
                  <div className="space-y-3 mb-6">
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontStyle: "italic" }} className="mb-3">Datos para entrega</h3>

                    <Field icon={User} placeholder="Nombre completo" value={customer.name}
                      onChange={v => setCustomer({ ...customer, name: v })} error={errors.name} />

                    <Field icon={Phone} placeholder="Teléfono" value={customer.phone}
                      onChange={v => setCustomer({ ...customer, phone: v })} error={errors.phone} />

                    <Field icon={MapPin} placeholder="Dirección de entrega" value={customer.address}
                      onChange={v => setCustomer({ ...customer, address: v })} error={errors.address} multiline />

                    <Field placeholder="Notas (alergias, instrucciones, etc.)" value={customer.notes}
                      onChange={v => setCustomer({ ...customer, notes: v })} multiline />
                  </div>

                  {errors.min && (
                    <div style={{ background: "#FEE2E2", color: "#991B1B" }} className="p-3 rounded-lg text-sm mb-4">
                      {errors.min}
                    </div>
                  )}

                  <button
                    onClick={validateAndSend}
                    style={{ background: COLORS.whatsapp, color: "white" }}
                    className="w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
                  >
                    <MessageCircle size={20} />
                    Enviar pedido por WhatsApp
                  </button>

                  <p style={{ color: COLORS.inkSoft, fontSize: 11 }} className="text-center mt-3">
                    Se abrirá WhatsApp con tu pedido listo para enviar
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ icon: Icon, placeholder, value, onChange, error, multiline }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div>
      <div className="relative">
        {Icon && <Icon size={16} style={{ position: "absolute", left: 14, top: 14, color: COLORS.inkSoft }} />}
        <Tag
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={multiline ? 2 : undefined}
          style={{
            background: COLORS.card,
            border: `1px solid ${error ? "#DC2626" : COLORS.border}`,
            color: COLORS.ink,
            paddingLeft: Icon ? 40 : 14,
          }}
          className="w-full py-3 pr-4 rounded-xl focus:outline-none text-sm"
        />
      </div>
      {error && <div style={{ color: "#DC2626" }} className="text-xs mt-1 ml-1">{error}</div>}
    </div>
  );
}
