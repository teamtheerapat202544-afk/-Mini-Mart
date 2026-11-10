// ข้อมูลสินค้าสำหรับร้าน ธีรภัทร์ มินิมาร์ท
const STORE_INFO = {
    name: "ธีรภัทร์ มินิมาร์ท",
    tagline: "สด ครบ คุ้ม ใกล้บ้านคุณ",
    subTagline: "ร้านของชำยุคใหม่ สะดวก สะอาด สินค้าหลากหลาย ราคาเป็นกันเอง บริการส่งถึงบ้าน",
    phone: "089-123-4567",
    lineId: "@theeraphat_mart",
    lineUrl: "https://line.me/R/ti/p/@theeraphat_mart",
    address: "128/9 ซอยเทศบาล 12 (หน้าหมู่บ้านร่มรื่นสุข) ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000",
    openHours: "เปิดบริการทุกวัน 06:00 - 22:00 น.",
    freeDeliveryThreshold: 100, // สั่งครบ 100 บาท ส่งฟรี
    deliveryFee: 20
};

// หมวดหมู่สินค้า
const CATEGORIES = [
    { id: "all", name: "สินค้าทั้งหมด", icon: "fa-border-all" },
    { id: "fresh", name: "ของสด & ไข่ไก่", icon: "fa-egg" },
    { id: "dry-food", name: "ข้าวสาร & เครื่องปรุง", icon: "fa-bowl-rice" },
    { id: "drinks", name: "เครื่องดื่ม & น้ำแข็ง", icon: "fa-bottle-water" },
    { id: "snacks", name: "ขนมขบเคี้ยว & นม", icon: "fa-cookie-bite" },
    { id: "household", name: "ของใช้ในบ้าน & ซักล้าง", icon: "fa-soap" },
    { id: "personal", name: "ของใช้ส่วนตัว & ยา", icon: "fa-pump-medical" }
];

// สินค้าโปรโมชั่นพิเศษประจำสัปดาห์ (Flash Sale)
const PROMOTIONS = [
    {
        id: "p1",
        name: "ไข่ไก่สดเบอร์ 2 (แผง 30 ฟอง)",
        category: "fresh",
        price: 115,
        originalPrice: 135,
        unit: "แผง",
        badge: "ลด 15%",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
        description: "ไข่ไก่สดใหม่คัดพิเศษจากฟาร์ม เบอร์ 2 เปลือกหนาสะอาด สดใหม่ทุกวัน"
    },
    {
        id: "p2",
        name: "น้ำมันพืชตรามรกต (1 ลิตร)",
        category: "dry-food",
        price: 45,
        originalPrice: 55,
        unit: "ขวด",
        badge: "โปรยอดนิยม",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
        description: "น้ำมันปาล์มผ่านกรรมวิธี ทอดกรอบ ไม่อมน้ำมัน ขนาด 1 ลิตร"
    },
    {
        id: "p3",
        name: "ข้าวหอมมะลิคัดพิเศษ 100% (5 กก.)",
        category: "dry-food",
        price: 185,
        originalPrice: 215,
        unit: "ถุง",
        badge: "คุ้มสุดๆ",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        description: "ข้าวหอมมะลิแท้ หุงขึ้นหม้อ เมล็ดสวย นุ่ม หอม อร่อย ทานกับอะไรก็อร่อย"
    },
    {
        id: "p4",
        name: "น้ำดื่มคริสตัล (แพ็ก 12 ขวด 600 มล.)",
        category: "drinks",
        price: 49,
        originalPrice: 60,
        unit: "แพ็ก",
        badge: "ซื้อติดบ้าน",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
        description: "น้ำดื่มสะอาดได้มาตรฐาน น้ำดื่มคุณภาพยอดนิยมของทุกบ้าน"
    }
];

// รายการสินค้าทั้งหมดในแคตตาล็อก
const PRODUCTS = [
    // ของสด & ไข่ไก่
    {
        id: "f1",
        name: "ไข่ไก่สดเบอร์ 2 (แผง 30 ฟอง)",
        category: "fresh",
        price: 115,
        originalPrice: 135,
        unit: "แผง",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
        tag: "โปรโมชั่น"
    },
    {
        id: "f2",
        name: "กระเทียมไทยคัดเม็ดสวย (500 กรัม)",
        category: "fresh",
        price: 35,
        originalPrice: null,
        unit: "ถุง",
        image: "https://images.unsplash.com/photo-1615477041738-9580a67aa796?auto=format&fit=crop&w=600&q=80",
        tag: null
    },
    {
        id: "f3",
        name: "หอมแดงสดคัดพิเศษ (500 กรัม)",
        category: "fresh",
        price: 35,
        originalPrice: null,
        unit: "ถุง",
        image: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&w=600&q=80",
        tag: null
    },
    {
        id: "f4",
        name: "มะนาวแป้นสดแป้นรำไพ (ถุง 5 ลูก)",
        category: "fresh",
        price: 25,
        originalPrice: 30,
        unit: "ถุง",
        image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600&q=80",
        tag: "สดใหม่"
    },

    // ข้าวสาร & เครื่องปรุง
    {
        id: "df1",
        name: "ข้าวหอมมะลิคัดพิเศษ (5 กก.)",
        category: "dry-food",
        price: 185,
        originalPrice: 215,
        unit: "ถุง",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        tag: "ขายดี"
    },
    {
        id: "df2",
        name: "น้ำมันพืชตรามรกต (1 ลิตร)",
        category: "dry-food",
        price: 45,
        originalPrice: 55,
        unit: "ขวด",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
        tag: "โปรโมชั่น"
    },
    {
        id: "df3",
        name: "น้ำปลาแท้ทิพรส (700 มล.)",
        category: "dry-food",
        price: 32,
        originalPrice: null,
        unit: "ขวด",
        image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=600&q=80",
        tag: null
    },
    {
        id: "df4",
        name: "น้ำตาลทรายขาวบริสุทธิ์ มิตรผล (1 กก.)",
        category: "dry-food",
        price: 26,
        originalPrice: null,
        unit: "ถุง",
        image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=80",
        tag: "ของจำเป็น"
    },
    {
        id: "df5",
        name: "บะหมี่กึ่งสำเร็จรูป มาม่าต้มยำกุ้ง (แพ็ก 10 ซอง)",
        category: "dry-food",
        price: 65,
        originalPrice: 70,
        unit: "แพ็ก",
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
        tag: "ขายดี"
    },
    {
        id: "df6",
        name: "ปลากระป๋องสามแม่ครัว (ฝาดึง 155 กรัม)",
        category: "dry-food",
        price: 20,
        originalPrice: null,
        unit: "กระป๋อง",
        image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80",
        tag: null
    },

    // เครื่องดื่ม & น้ำแข็ง
    {
        id: "dr1",
        name: "น้ำดื่มคริสตัล (แพ็ก 12 ขวด 600 มล.)",
        category: "drinks",
        price: 49,
        originalPrice: 60,
        unit: "แพ็ก",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
        tag: "แนะนำ"
    },
    {
        id: "dr2",
        name: "โค้กขวดแก้ว/ขวดลิตร เย็นชื่นใจ (1.25 ลิตร)",
        category: "drinks",
        price: 32,
        originalPrice: null,
        unit: "ขวด",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
        tag: "เย็นเจี๊ยบ"
    },
    {
        id: "dr3",
        name: "นมสดพาสเจอร์ไรส์ เมจิ รสจืด (830 มล.)",
        category: "drinks",
        price: 46,
        originalPrice: 48,
        unit: "ขวด",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
        tag: null
    },
    {
        id: "dr4",
        name: "เครื่องดื่มชูกำลัง M-150 / คาราบาวแดง",
        category: "drinks",
        price: 12,
        originalPrice: null,
        unit: "ขวด",
        image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80",
        tag: null
    },
    {
        id: "dr5",
        name: "น้ำแข็งยูนิค สะอาดบริสุทธิ์ (กระสอบเล็ก)",
        category: "drinks",
        price: 15,
        originalPrice: null,
        unit: "ถุง",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
        tag: "พร้อมส่ง"
    },

    // ขนมขบเคี้ยว & นม
    {
        id: "sn1",
        name: "มันฝรั่งทอดกรอบ เลย์ คลาสสิค (ขนาด 75 กรัม)",
        category: "snacks",
        price: 30,
        originalPrice: 32,
        unit: "ซอง",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
        tag: "ยอดนิยม"
    },
    {
        id: "sn2",
        name: "ขนมปังแถวฟาร์มเฮ้าส์ ขาวนุ่ม (แผ่นหนา)",
        category: "snacks",
        price: 42,
        originalPrice: null,
        unit: "แถว",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        tag: "ส่งใหม่ทุกวัน"
    },
    {
        id: "sn3",
        name: "นมกล่องยูเอชที ไทย-เดนมาร์ค (แพ็ก 4 กล่อง)",
        category: "snacks",
        price: 45,
        originalPrice: null,
        unit: "แพ็ก",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80",
        tag: null
    },

    // ของใช้ในบ้าน & ซักล้าง
    {
        id: "hh1",
        name: "ผงซักฟอก บรีสเอกเซล คอมฟอร์ท (800 กรัม)",
        category: "household",
        price: 79,
        originalPrice: 89,
        unit: "ถุง",
        image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80",
        tag: "คุ้มค่า"
    },
    {
        id: "hh2",
        name: "น้ำยาล้างจานซันไลต์ เลมอน (ถุงเติม 500 มล.)",
        category: "household",
        price: 25,
        originalPrice: 28,
        unit: "ถุง",
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
        tag: null
    },
    {
        id: "hh3",
        name: "กระดาษทิชชู่ม้วน สก๊อตต์ ซีเล็คท์ (แพ็ก 6 ม้วน)",
        category: "household",
        price: 69,
        originalPrice: 79,
        unit: "แพ็ก",
        image: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80",
        tag: null
    },
    {
        id: "hh4",
        name: "น้ำยาปรับผ้านุ่ม ดาวน์นี่ กลิ่นหอมสดชื่น (ถุงเติม 500 มล.)",
        category: "household",
        price: 59,
        originalPrice: 65,
        unit: "ถุง",
        image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80",
        tag: "หอมติดทนนาน"
    },

    // ของใช้ส่วนตัว & ยา
    {
        id: "pc1",
        name: "ยาสีฟันคอลเกต ยอดนิยม สูตรสดชื่น (150 กรัม)",
        category: "personal",
        price: 49,
        originalPrice: 55,
        unit: "กล่อง",
        image: "https://images.unsplash.com/photo-1559591937-e1032b9148d8?auto=format&fit=crop&w=600&q=80",
        tag: null
    },
    {
        id: "pc2",
        name: "สบู่ก้อนโพรเทคส์ / โดฟ (แพ็ก 4 ก้อน)",
        category: "personal",
        price: 55,
        originalPrice: 62,
        unit: "แพ็ก",
        image: "https://images.unsplash.com/photo-1607006314187-54ebcfba9d45?auto=format&fit=crop&w=600&q=80",
        tag: null
    },
    {
        id: "pc3",
        name: "ยาพาราเซตามอล ซาร่า 500 มก. (แผง 10 เม็ด)",
        category: "personal",
        price: 15,
        originalPrice: null,
        unit: "แผง",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        tag: "ยาสามัญ"
    },
    {
        id: "pc4",
        name: "ยาหม่องตราถ้วยทอง / ยาดมหงส์ไทย",
        category: "personal",
        price: 39,
        originalPrice: null,
        unit: "ชิ้น",
        image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=600&q=80",
        tag: "ยอดฮิต"
    }
];

// รีวิวจากลูกค้าจริงในชุมชน
const TESTIMONIALS = [
    {
        name: "ป้าสมศรี",
        neighborhood: "หมู่บ้านร่มรื่นสุข ซอย 3",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "ชอบมากจ้ะ สั่งผ่านไลน์แป๊บเดียวพี่ธีรภัทร์ขี่มอเตอร์ไซค์มาส่งถึงหน้าประตูบ้านเลย ของสด ไข่ไก่ไม่มีแตกสักฟอง บริการสุภาพมาก ไม่ต้องตากแดดออกไปซื้อเองเลย"
    },
    {
        name: "คุณเอกชัย",
        neighborhood: "ลูกค้าประจำในซอยเทศบาล 12",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "ร้านสะอาดสะอ้าน สินค้าจัดเป็นระเบียบหาง่ายมาก ราคาเท่ากับหรือถูกกว่าร้านสะดวกซื้อบางที่อีก ที่สำคัญมีสแกนจ่ายคนละครึ่งและพร้อมเพย์ สะดวกสุดๆ ครับ"
    },
    {
        name: "แม่น้องบีม",
        neighborhood: "คอนโดกรีนเพลส",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "วันไหนทำกับข้าวแล้วของขาด ทักไลน์หาร้านธีรภัทร์มินิมาร์ทไม่เกิน 10 นาทีได้ของเลย ข้าวสาร ข้าวกล้อง เครื่องปรุงมีครบทุกยี่ห้อ ยกนิ้วให้เลยค่ะ!"
    }
];
