
export const priceText = (price) => {
    // 1.500.000.000
    // 150.000.000
    // Tỷ
    if (price >= 1000000000) {
        if (price % 100000000 == 0) {
            return parseFloat(price / 1000000000).toFixed(1) + ' tỷ';
        } else {
            var cei = parseInt(price / 1000000000);
            var mod = price - cei * 1000000000;
            return cei + ' tỷ' + ' ' + String(mod).slice(0, 3) + ' triệu';
        }
    }
    if (price >= 1000000) {
        if (price % 1000000 == 0) {
            return price / 1000000 + ' triệu';
        } else {
            var cei = parseInt(price / 1000000);
            var mod = price - (cei * 1000000);
            return cei + ' triệu' + ' ' + String(mod).slice(0, 3) + ' nghìn';
        }
    }

    return String(price).slice(0, 3) + ' nghìn';
    //1 510 000 000
};