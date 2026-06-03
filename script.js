const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrCode = document.getElementById('qrCode');
const qrContainer = document.getElementById('qrContainer');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const printBtn = document.getElementById('printBtn');
const actionButtons = document.getElementById('actionButtons');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

let qrCodeInstance = null;

// สร้าง QR Code เมื่อคลิกปุ่ม
generateBtn.addEventListener('click', generateQRCode);

// อนุญาตให้สร้าง QR Code ด้วย Enter key
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQRCode();
    }
});

function generateQRCode() {
    const url = urlInput.value.trim();

    // ล้างข้อความก่อนหน้า
    clearMessages();

    // ตรวจสอบว่า URL ไม่ว่าง
    if (!url) {
        showError('กรุณาใส่ URL ที่ต้องการสร้าง QR Code');
        return;
    }

    // ตรวจสอบรูปแบบ URL
    if (!isValidURL(url)) {
        showError('โปรดใส่ URL ที่ถูกต้อง (เช่น https://example.com)');
        return;
    }

    // ล้าง QR Code เก่า
    qrCode.innerHTML = '';
    qrCodeInstance = null;

    try {
        // สร้าง QR Code ใหม่
        qrCodeInstance = new QRCode(qrCode, {
            text: url,
            width: 250,
            height: 250,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        // แสดง QR Code
        qrCode.classList.add('active');
        actionButtons.style.display = 'grid';

        showSuccess('QR Code สร้างสำเร็จ!');
    } catch (error) {
        showError('เกิดข้อผิดพลาดในการสร้าง QR Code');
        console.error(error);
    }
}

function isValidURL(string) {
    try {
        // ถ้า URL ไม่มี protocol ให้เพิ่ม https://
        let urlToCheck = string;
        if (!string.startsWith('http://') && !string.startsWith('https://')) {
            urlToCheck = 'https://' + string;
        }

        new URL(urlToCheck);
        return true;
    } catch (error) {
        return false;
    }
}

function clearMessages() {
    errorMessage.classList.remove('show');
    successMessage.classList.remove('show');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    successMessage.classList.remove('show');
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.add('show');
    errorMessage.classList.remove('show');

    // ซ่อนข้อความสำเร็จหลังจาก 3 วินาที
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// ดาวน์โหลด QR Code เป็น PNG
downloadBtn.addEventListener('click', () => {
    const canvas = qrCode.querySelector('canvas');
    if (!canvas) {
        showError('ไม่พบ QR Code ที่จะดาวน์โหลด');
        return;
    }

    // สร้าง link สำหรับดาวน์โหลด
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `qrcode-${Date.now()}.png`;
    link.click();

    showSuccess('ดาวน์โหลด QR Code สำเร็จ!');
});

// คัดลอก URL ไปยังคลิปบอร์ด
copyBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) {
        showError('ไม่มี URL ที่จะคัดลอก');
        return;
    }

    navigator.clipboard.writeText(url).then(() => {
        showSuccess('คัดลอก URL สำเร็จ!');
    }).catch(() => {
        showError('ไม่สามารถคัดลอก URL ได้');
    });
});

// พิมพ์ QR Code
printBtn.addEventListener('click', () => {
    const canvas = qrCode.querySelector('canvas');
    if (!canvas) {
        showError('ไม่พบ QR Code ที่จะพิมพ์');
        return;
    }

    // สร้างหน้าต่างใหม่สำหรับพิมพ์
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>พิมพ์ QR Code</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                }
                .print-container {
                    text-align: center;
                }
                .print-container img {
                    max-width: 90%;
                    margin: 20px 0;
                }
                h2 {
                    color: #333;
                }
                p {
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="print-container">
                <h2>QR Code</h2>
                <img src="${canvas.toDataURL('image/png')}" alt="QR Code">
                <p>URL: ${urlInput.value}</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();

    // รอให้ภาพโหลดแล้วเปิดหน้าต่างพิมพ์
    setTimeout(() => {
        printWindow.print();
    }, 250);
});
