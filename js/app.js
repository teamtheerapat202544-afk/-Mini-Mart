// การจัดการระบบตะกร้าและอินเทอร์แอคทีฟของร้าน ธีรภัทร์ มินิมาร์ท

let cart = JSON.parse(localStorage.getItem('theeraphat_cart') || '[]');
let currentCategory = 'all';
let searchQuery = '';

// เริ่มต้นระบบเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    initFlashSaleTimer();
    renderPromotions();
    renderCategories();
    renderProducts();
    renderTestimonials();
    updateCartUI();
    setupEventListeners();
});

// 1. ระบบนับถอยหลัง Flash Sale
function initFlashSaleTimer() {
    const hoursEl = document.getElementById('sale-hours');
    const minsEl = document.getElementById('sale-mins');
    const secsEl = document.getElementById('sale-secs');
    
    if (!hoursEl || !minsEl || !secsEl) return;

    let targetTime = localStorage.getItem('theeraphat_flash_end');
    const now = new Date().getTime();

    // หากไม่มีหรือหมดเวลา ให้ตั้งเวลาใหม่ 8 ชั่วโมงล่วงหน้า
    if (!targetTime || parseInt(targetTime) <= now) {
        targetTime = now + 8 * 60 * 60 * 1000 + 42 * 60 * 1000;
        localStorage.setItem('theeraphat_flash_end', targetTime);
    } else {
        targetTime = parseInt(targetTime);
    }

    function updateTimer() {
        const currentTime = new Date().getTime();
        const diff = targetTime - currentTime;

        if (diff <= 0) {
            // รีเซ็ตเวลาใหม่เมื่อหมด
            targetTime = currentTime + 8 * 60 * 60 * 1000;
            localStorage.setItem('theeraphat_flash_end', targetTime);
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(minutes).padStart(2, '0');
        secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// 2. เรนเดอร์สินค้าโปรโมชั่นสุดคุ้ม
function renderPromotions() {
    const container = document.getElementById('promotions-container');
    if (!container) return;

    container.innerHTML = PROMOTIONS.map(item => `
        <div class="product-card bg-white rounded-2xl overflow-hidden border border-emerald-100/80 shadow-sm hover:shadow-md flex flex-col relative group">
            <div class="relative overflow-hidden aspect-[4/3] bg-slate-100">
                <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <i class="fa-solid fa-fire text-amber-300"></i> ${item.badge}
                </div>
            </div>
            <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 class="font-heading font-medium text-slate-800 text-base line-clamp-1 group-hover:text-emerald-700 transition-colors">${item.name}</h3>
                    <p class="text-xs text-slate-500 mt-1 line-clamp-2">${item.description}</p>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <div class="flex items-baseline gap-1.5">
                            <span class="text-xl font-heading font-bold text-emerald-600">฿${item.price}</span>
                            <span class="text-xs text-slate-400 line-through">฿${item.originalPrice}</span>
                        </div>
                        <span class="text-[11px] text-slate-500">/${item.unit}</span>
                    </div>
                    <button onclick="addToCart('${item.id}', 1)" class="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white w-9 h-9 rounded-xl flex items-center justify-center transition shadow-sm hover:shadow-emerald-200" title="เพิ่มลงตะกร้า">
                        <i class="fa-solid fa-cart-plus text-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. เรนเดอร์ปุ่มตัวกรองหมวดหมู่
function renderCategories() {
    const container = document.getElementById('category-filters');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => {
        const count = cat.id === 'all' 
            ? PRODUCTS.length 
            : PRODUCTS.filter(p => p.category === cat.id).length;

        const isActive = cat.id === currentCategory;
        const activeClass = isActive 
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 border-emerald-600' 
            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700';

        return `
            <button onclick="setCategory('${cat.id}')" class="category-btn px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeClass}">
                <i class="fa-solid ${cat.icon}"></i>
                <span>${cat.name}</span>
                <span class="text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}">${count}</span>
            </button>
        `;
    }).join('');
}

// 4. เรนเดอร์รายการสินค้าในแคตตาล็อก
function renderProducts() {
    const container = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-search-state');
    if (!container) return;

    const filtered = PRODUCTS.filter(product => {
        const matchCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    container.innerHTML = filtered.map(product => `
        <div class="product-card bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md flex flex-col justify-between relative group">
            <div>
                <div class="relative overflow-hidden aspect-[4/3] bg-slate-50">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    ${product.tag ? `
                        <span class="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-sm">
                            ${product.tag}
                        </span>
                    ` : ''}
                </div>
                <div class="p-3.5">
                    <h3 class="font-heading font-medium text-slate-800 text-sm md:text-base line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        ${product.name}
                    </h3>
                </div>
            </div>
            
            <div class="p-3.5 pt-0">
                <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <div class="flex items-baseline gap-1">
                            <span class="text-lg font-heading font-bold text-emerald-600">฿${product.price}</span>
                            ${product.originalPrice ? `<span class="text-xs text-slate-400 line-through">฿${product.originalPrice}</span>` : ''}
                        </div>
                        <span class="text-[11px] text-slate-500">/${product.unit}</span>
                    </div>
                    <button onclick="addToCart('${product.id}', 1)" class="bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-sm" title="เพิ่มลงตะกร้า">
                        <i class="fa-solid fa-plus"></i>
                        <span>ใส่ตะกร้า</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 5. เรนเดอร์ความคิดเห็นลูกค้า
function renderTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = TESTIMONIALS.map(item => `
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
                <div class="flex items-center gap-1 text-amber-400 mb-3 text-sm">
                    ${Array(item.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
                </div>
                <p class="text-slate-600 text-sm leading-relaxed italic">"${item.comment}"</p>
            </div>
            <div class="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                <img src="${item.avatar}" alt="${item.name}" class="w-10 h-10 rounded-full object-cover border border-emerald-200">
                <div>
                    <h4 class="font-heading font-semibold text-slate-800 text-sm">${item.name}</h4>
                    <p class="text-xs text-emerald-600">${item.neighborhood}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// 6. การจัดการหมวดหมู่และการค้นหา
function setCategory(catId) {
    currentCategory = catId;
    renderCategories();
    renderProducts();
}

function handleSearch(query) {
    searchQuery = query;
    renderProducts();
}

// 7. ฟังก์ชันจัดการตะกร้าสินค้า
function addToCart(productId, qty = 1) {
    // ตรวจสอบสินค้าจากทั้ง PROMOTIONS และ PRODUCTS
    const product = PRODUCTS.find(p => p.id === productId) || PROMOTIONS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
        cart[existingIndex].qty += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image,
            qty: qty
        });
    }

    saveCart();
    updateCartUI();
    showToast(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว!`, 'fa-cart-circle-check', 'success');
}

function updateCartQty(productId, delta) {
    const index = cart.findIndex(item => item.id === productId);
    if (index === -1) return;

    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
        showToast('ลบสินค้าออกจากตะกร้าแล้ว', 'fa-trash-can', 'info');
    }

    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showToast('นำสินค้าออกจากตะกร้าแล้ว', 'fa-trash-can', 'info');
}

function clearCart() {
    if (cart.length === 0) return;
    if (confirm('คุณต้องการล้างสินค้าทั้งหมดในตะกร้าใช่หรือไม่?')) {
        cart = [];
        saveCart();
        updateCartUI();
        showToast('ล้างตะกร้าสินค้าเรียบร้อย', 'fa-circle-info', 'info');
    }
}

function saveCart() {
    localStorage.setItem('theeraphat_cart', JSON.stringify(cart));
}

// 8. อัปเดตหน้าตา UI ของตะกร้าและ Drawer
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // อัปเดต Badge บนปุ่มตะกร้า
    const navBadge = document.getElementById('nav-cart-badge');
    const floatBadge = document.getElementById('float-cart-badge');
    
    [navBadge, floatBadge].forEach(badge => {
        if (badge) {
            badge.textContent = totalCount;
            if (totalCount > 0) {
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    });

    // อัปเดตรายการใน Drawer
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmptyState = document.getElementById('cart-empty-state');
    const cartFooter = document.getElementById('cart-footer');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const deliveryFeeEl = document.getElementById('cart-delivery-fee');
    const cartGrandTotalEl = document.getElementById('cart-grand-total');
    const deliveryNoteEl = document.getElementById('delivery-free-note');

    if (!cartItemsList) return;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '';
        if (cartEmptyState) cartEmptyState.classList.remove('hidden');
        if (cartFooter) cartFooter.classList.add('hidden');
        return;
    }

    if (cartEmptyState) cartEmptyState.classList.add('hidden');
    if (cartFooter) cartFooter.classList.remove('hidden');

    // คำนวณค่าจัดส่ง (ฟรีถ้าเกินยอดที่กำหนด)
    const isFreeDelivery = subtotal >= STORE_INFO.freeDeliveryThreshold;
    const deliveryFee = isFreeDelivery ? 0 : STORE_INFO.deliveryFee;
    const grandTotal = subtotal + deliveryFee;

    if (cartSubtotalEl) cartSubtotalEl.textContent = `฿${subtotal.toLocaleString()}`;
    if (deliveryFeeEl) {
        deliveryFeeEl.innerHTML = isFreeDelivery 
            ? '<span class="text-emerald-600 font-semibold">ส่งฟรี!</span>' 
            : `฿${deliveryFee}`;
    }
    if (cartGrandTotalEl) cartGrandTotalEl.textContent = `฿${grandTotal.toLocaleString()}`;

    if (deliveryNoteEl) {
        if (isFreeDelivery) {
            deliveryNoteEl.innerHTML = `
                <div class="bg-emerald-50 text-emerald-700 text-xs py-2 px-3 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                    <i class="fa-solid fa-circle-check text-emerald-500"></i>
                    <span>ยอดครบ ฿${STORE_INFO.freeDeliveryThreshold} ได้รับสิทธิ์<strong>จัดส่งฟรีถึงบ้าน!</strong></span>
                </div>
            `;
        } else {
            const remaining = STORE_INFO.freeDeliveryThreshold - subtotal;
            deliveryNoteEl.innerHTML = `
                <div class="bg-amber-50 text-amber-800 text-xs py-2 px-3 rounded-lg border border-amber-200 flex items-center gap-1.5">
                    <i class="fa-solid fa-truck-fast text-amber-500"></i>
                    <span>ซื้อเพิ่มอีกเพียง <strong>฿${remaining}</strong> เพื่อส่งฟรีถึงบ้าน!</span>
                </div>
            `;
        }
    }

    cartItemsList.innerHTML = cart.map(item => `
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-lg border border-slate-200 flex-shrink-0">
            <div class="flex-1 min-w-0">
                <h4 class="font-medium text-slate-800 text-sm truncate">${item.name}</h4>
                <div class="text-xs text-slate-500 mt-0.5">฿${item.price} / ${item.unit}</div>
                <div class="text-xs font-semibold text-emerald-600 mt-0.5">รวม ฿${(item.price * item.qty).toLocaleString()}</div>
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0 bg-white border border-slate-200 rounded-lg p-1">
                <button onclick="updateCartQty('${item.id}', -1)" class="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 text-xs">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <span class="w-6 text-center text-xs font-semibold text-slate-800">${item.qty}</span>
                <button onclick="updateCartQty('${item.id}', 1)" class="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 text-xs">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <button onclick="removeFromCart('${item.id}')" class="text-slate-400 hover:text-red-500 p-1 transition text-xs" title="ลบรายการนี้">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `).join('');
}

// 9. ระบบเปิด/ปิด Drawer ตะกร้า
function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    backdrop.classList.remove('hidden');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        drawer.classList.remove('translate-x-full');
    }, 10);
}

function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    setTimeout(() => {
        backdrop.classList.add('hidden');
    }, 300);
}

// 10. ระบบสั่งซื้อผ่าน LINE
function checkoutViaLine() {
    if (cart.length === 0) {
        showToast('กรุณาเลือกสินค้าใส่ตะกร้าก่อนสั่งซื้อครับ', 'fa-triangle-exclamation', 'warning');
        return;
    }

    const customerAddress = document.getElementById('order-address')?.value.trim() || 'แจ้งทางแชท';
    const customerPhone = document.getElementById('order-phone')?.value.trim() || 'แจ้งทางแชท';
    const customerNote = document.getElementById('order-note')?.value.trim() || '-';

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const isFreeDelivery = subtotal >= STORE_INFO.freeDeliveryThreshold;
    const deliveryFee = isFreeDelivery ? 0 : STORE_INFO.deliveryFee;
    const grandTotal = subtotal + deliveryFee;

    let itemsText = cart.map((item, index) => 
        `${index + 1}. ${item.name} x ${item.qty} ${item.unit} (฿${item.price * item.qty})`
    ).join('\n');

    const message = 
`🛒 *รายการสั่งซื้อ - ธีรภัทร์ มินิมาร์ท*
--------------------------------
${itemsText}
--------------------------------
💵 ราคาสินค้า: ฿${subtotal.toLocaleString()}
🚚 ค่าจัดส่ง: ${isFreeDelivery ? 'ฟรี! (โปรโมชั่น)' : `฿${deliveryFee}`}
💰 *ยอดชำระสุทธิ: ฿${grandTotal.toLocaleString()}*

📍 ที่อยู่จัดส่ง: ${customerAddress}
📞 เบอร์ติดต่อ: ${customerPhone}
📝 หมายเหตุเพิ่มเติม: ${customerNote}

ขอบคุณที่อุดหนุนร้านธีรภัทร์ มินิมาร์ท ครับ/ค่ะ 🙏`;

    // คัดลอกลง Clipboard เผื่อเปิดแอพ LINE ไม่ติด
    navigator.clipboard.writeText(message).catch(err => console.log('Clipboard error', err));

    // ส่งต่อไปยัง LINE แชท
    const encodedMessage = encodeURIComponent(message);
    const lineUrl = `https://line.me/R/oaMessage/${STORE_INFO.lineId}/?${encodedMessage}`;

    // เปิด LINE ในแท็บใหม่
    window.open(lineUrl, '_blank');
    showToast('กำลังเปิด LINE เพื่อส่งคำสั่งซื้อของคุณ...', 'fa-brands fa-line', 'success');
}

// 11. คัดลอกรายการสั่งซื้อสำหรับส่งแชทอื่น
function copyOrderToClipboard() {
    if (cart.length === 0) {
        showToast('กรุณาเลือกสินค้าใส่ตะกร้าก่อนครับ', 'fa-triangle-exclamation', 'warning');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let itemsText = cart.map((item, index) => 
        `${index + 1}. ${item.name} x ${item.qty} ${item.unit} (฿${item.price * item.qty})`
    ).join('\n');

    const message = `🛒 สั่งซื้อจาก ธีรภัทร์ มินิมาร์ท:\n${itemsText}\nยอดรวม: ฿${subtotal} บาท`;

    navigator.clipboard.writeText(message).then(() => {
        showToast('คัดลอกรายการสั่งซื้อลงคลิปบอร์ดแล้ว!', 'fa-clipboard-check', 'success');
    });
}

// 12. Toast Notification
function showToast(message, icon = 'fa-check', type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let iconColor = 'text-emerald-400';
    if (type === 'warning') iconColor = 'text-amber-400';
    if (type === 'danger') iconColor = 'text-red-400';

    toast.innerHTML = `
        <i class="fa-solid ${icon} ${iconColor} text-lg"></i>
        <span class="text-sm font-medium">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px) scale(0.95)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 13. Event Listeners และการตั้งค่า UI อื่นๆ
function setupEventListeners() {
    // ช่องค้นหาสินค้า
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value);
        });
    }

    // ปุ่มเปิดปิด Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // ฟอร์มติดต่อสอบถาม
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('ส่งข้อความสอบถามเรียบร้อย ทางร้านจะรีบตอบกลับครับ', 'fa-paper-plane', 'success');
            contactForm.reset();
        });
    }
}
