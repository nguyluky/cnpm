/**
 * Mã hóa một mảng các tọa độ [longitude, latitude] thành chuỗi Polyline.
 * @param coordinates Mảng các cặp tọa độ [[lng, lat], [lng, lat], ...]
 * @param precision Độ chính xác (mặc định 5 cho Google Maps, tương ứng khoảng 1 mét)
 * @returns Chuỗi encoded polyline
 */
export function encodePolyline(coordinates: [number, number][], precision: number = 5): string {
    let output = '';
    let lastLat = 0;
    let lastLng = 0;
    const factor = Math.pow(10, precision);

    coordinates.forEach(([lng, lat]) => {
        // Làm tròn và nhân với hệ số precision
        const latE5 = Math.round(lat * factor);
        const lngE5 = Math.round(lng * factor);

        // Tính delta (sự chênh lệch) so với điểm trước đó
        const dLat = latE5 - lastLat;
        const dLng = lngE5 - lastLng;

        // Cập nhật vị trí cuối cùng
        lastLat = latE5;
        lastLng = lngE5;

        // Mã hóa delta và nối vào chuỗi kết quả
        output += encodeNumber(dLat) + encodeNumber(dLng);
    });

    return output;
}

/**
 * Hàm phụ trợ để mã hóa một số nguyên có dấu thành chuỗi ký tự theo thuật toán Polyline.
 */
function encodeNumber(num: number): string {
    // 1. Dịch bit trái 1 lần. Nếu số âm thì đảo bit (bit-wise NOT) để xử lý dấu.
    let sgnNum = num << 1;
    if (num < 0) {
        sgnNum = ~sgnNum;
    }

    let encoded = '';
    // 2. Chia số thành các block 5 bit và mã hóa thành ASCII
    while (sgnNum >= 0x20) {
        // Lấy 5 bit thấp nhất, OR với 0x20 (để đánh dấu là còn dữ liệu tiếp theo)
        // Cộng thêm 63 để chuyển thành ký tự ASCII in được
        encoded += String.fromCharCode((0x20 | (sgnNum & 0x1f)) + 63);
        // Dịch phải 5 bit để tiếp tục xử lý phần còn lại
        sgnNum >>= 5;
    }
    // Xử lý block cuối cùng (không cần OR với 0x20)
    encoded += String.fromCharCode(sgnNum + 63);
    return encoded;
}

/**
 * Giải mã chuỗi Polyline thành mảng tọa độ [longitude, latitude].
 * @param encodedStr Chuỗi polyline đã mã hóa
 * @param precision Độ chính xác (phải khớp với lúc mã hóa, mặc định 5)
 * @returns Mảng các cặp tọa độ [[lng, lat], ...]
 */
export function decodePolyline(encodedStr: string, precision: number = 5): [number, number][] {
    let index = 0;
    let lat = 0;
    let lng = 0;
    const coordinates: [number, number][] = [];
    const factor = Math.pow(10, precision);

    while (index < encodedStr.length) {
        // Giải mã delta latitude
        let b;
        let shift = 0;
        let result = 0;
        do {
            b = encodedStr.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const dLat = (result & 1) ? ~(result >> 1) : (result >> 1);
        lat += dLat;

        // Giải mã delta longitude
        shift = 0;
        result = 0;
        do {
            b = encodedStr.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const dLng = (result & 1) ? ~(result >> 1) : (result >> 1);
        lng += dLng;

        // Thêm tọa độ vào mảng kết quả (chia lại cho factor để lấy giá trị thực)
        coordinates.push([lng / factor, lat / factor]);
    }

    return coordinates;
}
