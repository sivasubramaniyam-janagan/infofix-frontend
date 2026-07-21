export default function getPrice(price) {
    if (price == null) {
        return "N/A";
    }

    const priceInNumber = Number(price);

    if (isNaN(priceInNumber)) {
        return "N/A";
    }

    return "LKR " + priceInNumber.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}