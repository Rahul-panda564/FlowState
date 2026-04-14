import { useState } from 'react';
import AttendeeShell from '../../layouts/AttendeeShell';
import { menuItems } from '../../data/mockData';
import { formatCurrency } from '../../utils/currency';
export default function AttendeeFood() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [activeOrders, setActiveOrders] = useState([]);

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  
  const allItems = menuItems.map(item => ({ ...item, standName: item.vendor }));

  const filteredItems = activeCategory === 'All' 
    ? allItems 
    : allItems.filter(item => item.category === activeCategory);

  const addToCart = (item) => {
    // eslint-disable-next-line react-hooks/purity
    setCart([...cart, { ...item, cartId: Math.random() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(i => i.cartId !== cartId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    const newOrder = {
      // eslint-disable-next-line react-hooks/purity
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      items: [...cart],
      total: cartTotal,
      status: 'Preparing',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActiveOrders([newOrder, ...activeOrders]);
    setOrderConfirmed(true);
    // Note: cart is cleared in handleDone to allow user to see order details
  };

  const handleDone = () => {
    setCart([]);
    setShowCheckout(false);
    setOrderConfirmed(false);
  };

  return (
    <AttendeeShell title="Express Food">
      <div className="attendee-food page-enter">
        {/* Active Orders Section */}
        {activeOrders.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div className="label-accent" style={{ marginBottom: 12 }}>ACTIVE ORDERS</div>
            {activeOrders.map(order => (
              <div key={order.id} className="card" style={{ padding: 16, marginBottom: 10, borderLeft: '4px solid var(--status-warning)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{order.id}</span>
                  <span className="badge badge-warning" style={{ fontSize: '0.6rem' }}>{order.status}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {order.items.length} items • Ready in ~12 mins
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Categories Scroller */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 16, scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0, padding: '8px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)',
                background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-elevated)',
                color: activeCategory === cat ? 'var(--text-inverse)' : 'var(--text-primary)',
                fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filteredItems.map((item, idx) => (
            <div key={idx} className="food-card">
              <div className="food-card-img" style={{ background: '#1a2332', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                {item.category === 'Beverages' ? '🥤' : item.category === 'Fast Food' ? '🍔' : '🥗'}
              </div>
              <div className="food-card-info">
                <div className="food-card-name">{item.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>{item.standName}</div>
                <div className="food-card-price">{formatCurrency(item.price)}</div>
              </div>
              <button 
                onClick={() => addToCart(item)}
                className="btn-icon" 
                style={{ alignSelf: 'center', background: 'var(--accent-dim)', color: 'var(--accent)', border: 'none' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          ))}
        </div>

        {/* Cart Bar */}
        {cart.length > 0 && !showCheckout && (
          <div 
            onClick={() => setShowCheckout(true)}
            style={{ 
              position: 'absolute', bottom: 90, left: 16, right: 16, 
              background: 'var(--accent)', color: 'black', padding: '16px 20px', 
              borderRadius: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              boxShadow: '0 8px 32px rgba(0,212,170,0.4)', cursor: 'pointer',
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: 'rgba(0,0,0,0.1)', padding: '4px 10px', borderRadius: 8, fontWeight: 800 }}>{cart.length}</div>
              <span style={{ fontWeight: 700 }}>VIEW BASKET</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{formatCurrency(cartTotal)}</span>
          </div>
        )}

        {/* Checkout / Order State */}
        {showCheckout && (
          <div className="modal-overlay" style={{ zIndex: 11000 }}>
            <div className="modal-content" style={{ width: '90%', maxWidth: 360, maxHeight: '80vh', overflowY: 'auto' }}>
              {!orderConfirmed ? (
                <>
                  <div className="modal-header">
                    <h3>Your Basket</h3>
                    <button className="btn-icon" onClick={() => setShowCheckout(false)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                    {cart.map((item) => (
                      <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.standName}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontWeight: 700 }}>{formatCurrency(item.price)}</span>
                          <button onClick={() => removeFromCart(item.cartId)} style={{ color: 'var(--status-alert)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: 16, background: 'var(--bg-deep)', borderRadius: 12, marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                      <span>{formatCurrency(cartTotal)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', paddingTop: 8, borderTop: '1px solid var(--border-color)' }}>
                      <span>Total</span>
                      <span style={{ color: 'var(--accent)' }}>{formatCurrency(cartTotal)}</span>
                    </div>
                  </div>
                  <button className="btn btn-primary w-full" onClick={handleCheckout} style={{ padding: 16 }}>
                    PLACE EXPRESS ORDER
                  </button>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: 80, height: 80, background: 'var(--status-ok)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'black' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h2 style={{ marginBottom: 8 }}>Order Confirmed!</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Your order is being prepared. Scan the code below at the pickup counter.</p>
                  
                  {/* QR Code Placeholder for Pickup */}
                  <div style={{ width: 200, height: 200, background: 'white', padding: 10, margin: '0 auto 32px', borderRadius: 12 }}>
                    <div style={{ width: '100%', height: '100%', background: 'url(https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FLOWSTATE-ORDER) center/cover' }}></div>
                  </div>

                  <button className="btn btn-primary w-full" onClick={handleDone}>
                    DONE
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AttendeeShell>
  );
}
