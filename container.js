let fs = require('fs');
let Product = require('./product');

class Container {
    static id = 0;
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(obj) {
        Container.id += 1;
        obj.id = Container.id;
        let products = [];
        
        try {
            if(!fs.existsSync("productos.txt")) {
                products.push(obj);
                let sProducts = JSON.stringify(products);
                await fs.promises.writeFile('productos.txt', sProducts, 'utf-8');
            } else {
                products = await this.getAll();
                products.push(obj);

                let sProducts = JSON.stringify(products);
                await fs.promises.writeFile('productos.txt', sProducts, 'utf-8');
            }
        }
        catch(err) {
            console.log(err);
        }

        return Container.id;
    }

    async getById(id) {
        let products = await this.getAll();
        return products.find(function(product){
            return product.id === id;
        });
        return null;    
    }

    async getAll() {
        try {
            let products = await fs.promises.readFile('productos.txt', 'utf-8');
            return  JSON.parse(products);
        }
        catch(err) {
            console.log(err);
        }
    }

    async deleteById(id) {
        let products = await this.getAll();
        products = products.filter((i) => i.id !== id);
        let sProducts = JSON.stringify(products);
        await fs.promises.writeFile('productos.txt', sProducts, 'utf-8');
    }

    async deleteAll() {
        let products = await this.getAll();
        await products.splice(0);
        let sProducts = JSON.stringify(products);
        await fs.promises.writeFile('productos.txt', sProducts, 'utf-8');
    }
}

module.exports = Container;