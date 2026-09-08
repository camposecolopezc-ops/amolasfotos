import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Tag, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currency: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const freeShippingThreshold = 100;
  const shippingCost = subtotal > freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'OFERTA10') {
      setDiscountPercent(10);
      setCouponMessage({ text: '¡Cupón de 10% de descuento aplicado con éxito!', isError: false });
    } else if (cleanCode === 'VIP20') {
      setDiscountPercent(20);
      setCouponMessage({ text: '¡Cupón VIP de 20% aplicado!', isError: false });
    } else {
      setCouponMessage({ text: 'Código de cupón no válido. Prueba con "OFERTA10"', isError: true });
    }
  };

  const handleProcessOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const generatedOrder = 'NEX-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(generatedOrder);
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1200);
  };

  const handleCloseAfterOrder = () => {
    setOrderComplete(false);
    setCouponCode('');
    setDiscountPercent(0);
    setCouponMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-stone-900">Tu Carrito de Compra</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-semibold">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} {cart.length === 1 ? 'artículo' : 'artículos'}
              </span>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderComplete ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-200">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">¡Pedido Confirmado!</h3>
                <p className="text-sm text-stone-600 max-w-xs mx-auto">
                  Muchas gracias por tu compra. Hemos registrado tu pedido con el código de seguimiento:
                </p>
                <div className="bg-stone-100 py-3 px-4 rounded-xl font-mono font-bold text-stone-800 text-lg border border-stone-200 inline-block">
                  {orderNumber}
                </div>
                <p className="text-xs text-stone-500">
                  Recibirás la confirmación detallada y el albarán digital en tu correo electrónico.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleCloseAfterOrder}
                    className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-colors"
                  >
                    Continuar Explorando
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 bg-stone-100 text-stone-400 rounded-2xl flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <h3 className="text-lg font-bold text-stone-800">El carrito está vacío</h3>
                <p className="text-sm text-stone-500 max-w-xs mx-auto">
                  Aún no has agregado ningún producto a tu carrito de compras.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-2 py-2 px-5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  <span>Ver Productos Disponibles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* Shipping info banner */}
                <div className="bg-stone-100 rounded-xl p-3 text-xs text-stone-700 flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  {subtotal >= freeShippingThreshold ? (
                    <span>¡Enhorabuena! Tienes <strong>Envío Gratuito</strong> para este pedido.</span>
                  ) : (
                    <span>
                      Añade <strong>{formatCurrency(freeShippingThreshold - subtotal, currency)}</strong> más para conseguir <strong>Envío Gratis</strong>.
                    </span>
                  )}
                </div>

                {/* Items list */}
                <ul className="divide-y divide-stone-200">
                  {cart.map((item) => (
                    <li key={item.product.id} className="py-4 flex gap-4 items-center">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl border border-stone-200 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-xs text-stone-500 block mb-1">
                          {item.product.category}
                        </span>
                        <div className="text-sm font-bold text-stone-900">
                          {formatCurrency(item.product.price, currency)}
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                          title="Eliminar del carrito"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-stone-200 text-stone-600 rounded-l-lg transition-colors"
                            title="Disminuir"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600 rounded-r-lg transition-colors"
                            title="Aumentar"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <label htmlFor="coupon-input" className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    <span>¿Tienes un cupón de descuento?</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="coupon-input"
                      type="text"
                      placeholder="Ej: OFERTA10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 border border-stone-300 rounded-xl uppercase font-mono tracking-wider focus:outline-hidden focus:ring-2 focus:ring-stone-400"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-xs mt-1.5 ${couponMessage.isError ? 'text-red-500' : 'text-emerald-600 font-medium'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer Totals & Checkout */}
          {cart.length > 0 && !orderComplete && (
            <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-stone-800">{formatCurrency(subtotal, currency)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Descuento ({discountPercent}%):</span>
                    <span>-{formatCurrency(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Envío estimado:</span>
                  <span className="font-semibold text-stone-800">
                    {shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost, currency)}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex justify-between text-base font-bold text-stone-950">
                  <span>Total a Pagar:</span>
                  <span className="text-amber-700">{formatCurrency(total, currency)}</span>
                </div>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={handleProcessOrder}
                disabled={isCheckingOut}
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 active:scale-[0.99] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Procesando pedido seguro...</span>
                  </>
                ) : (
                  <>
                    <span>Completar Pedido</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-stone-500">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                  <span>Pago 100% Seguro SSL</span>
                </div>
                <span>•</span>
                <span>Garantía de 30 días</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
