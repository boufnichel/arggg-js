function Product(name, price, stock, isSpecial, isBook) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.isSpecial = isSpecial;
    this.isBook = isBook;
}

Product.prototype.getPrice = function() {
    return this.price;
};

Product.prototype.getStock = function() {
    return this.stock;
};

Product.prototype.decreaseStock = function() {
    if (this.stock > 0) {
        this.stock--;
    }
};

Product.prototype.isSpecial = function() {
    return this.isSpecial;
};

Product.prototype.isBook = function() {
    return this.isBook;
};

function Cart() {
    this.products = [];
    this.hasFreeShipping = false;
}

Cart.prototype.addProduct = function(product) {
    if (this.products.length >= 100) {
        throw new Error("Cart can't contain more than 100 items");
    }

    if (product.getStock() > 0) {
        this.products.push(product);
        product.decreaseStock();

        if (product.isSpecial()) {
            this.hasFreeShipping = true;
        }
    }
};

Cart.prototype.getTotalPrice = function() {
    if (this.products.length === 0) {
        return 0;
    }

    let total = 0;
    let hasOnlyBooks = true;

    for (const product of this.products) {
        total += product.getPrice();
        if (!product.isBook()) {
            hasOnlyBooks = false;
        }
    }

    if (hasOnlyBooks) {
        total *= 0.9;
    }

    total *= 1.05;

    return total;
};

Cart.prototype.hasFreeShipping = function() {
    return this.hasFreeShipping;
};
