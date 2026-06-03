# QR Code Generator

สร้าง QR Code จาก URL ได้อย่างรวดเร็วและง่ายดาย

## ✨ คุณสมบัติ

- ✅ สร้าง QR Code จาก URL ใด ๆ
- 📥 ดาวน์โหลด QR Code เป็นไฟล์ PNG
- 📋 คัดลอก URL ไปยังคลิปบอร์ด
- 🖨️ พิมพ์ QR Code
- 🎨 ออกแบบที่สวยงามและใช้งานง่าย
- 📱 รองรับการใช้งานบนอุปกรณ์มือถือ

## 🚀 วิธีใช้

1. **เปิดไฟล์** `index.html` ในเบราวเซอร์
2. **ใส่ URL** ที่ต้องการสร้าง QR Code ในช่องข้อมูล
3. **คลิกปุ่ม** "สร้าง QR Code" หรือกด Enter
4. **ใช้ปุ่มเพิ่มเติม** เพื่อ:
   - ดาวน์โหลด QR Code
   - คัดลอก URL
   - พิมพ์ QR Code

## 📁 โครงสร้างไฟล์

```
QRCode/
├── index.html    # ไฟล์ HTML หลัก
├── style.css     # ไฟล์จัดสไตล์
├── script.js     # ไฟล์ JavaScript
└── README.md     # ไฟล์อธิบาย
```

## 🛠️ วิธีเรียกใช้

### วิธีที่ 1: เปิดไฟล์โดยตรง
- คลิกขวาที่ `index.html` แล้วเลือก "Open with Browser"

### วิธีที่ 2: ใช้ Local Server
ถ้าต้องการเรียกใช้บนเซิร์ฟเวอร์ท้องถิ่น:

```bash
# ใช้ Python 3
python -m http.server 8000

# ใช้ Python 2
python -m SimpleHTTPServer 8000

# ใช้ Node.js (ต้องติดตั้ง http-server)
npx http-server
```

แล้วเปิด `http://localhost:8000` ในเบราวเซอร์

## 🔌 ไลบรารี่ที่ใช้

- [QRCode.js](https://davidshimjs.github.io/qrcodejs/) - สำหรับสร้าง QR Code

## 💡 เคล็ดลับการใช้งาน

- ใส่ URL แบบเต็ม: `https://example.com`
- หรือใส่แบบย่อ: `example.com` (จะเพิ่ม https:// อัตโนมัติ)
- QR Code ที่สร้างจะมีระดับการแก้ไขข้อผิดพลาดสูง
- สามารถสแกนด้วยกล้องสมาร์ทโฟนทั่วไป

## 📝 ใบอนุญาต

โครงการนี้เป็นซอฟต์แวร์เสรี
