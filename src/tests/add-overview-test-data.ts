import { User, UserStore } from '../models/user';
import { Product, ProductStore } from '../models/product';
import { Order, OrderStatus, OrderStore } from '../models/order';

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

// This function adds some test data,
// so we can do some tests when our ENV is set to 'test'
const addOverviewTestData = async () => {

    const newUserA: User = {
        firstName: 'Izuku',
        lastName: 'Midoriya',
        username: 'deku',
        password: 'numberone1'
    }

    const newUserB: User = {
        firstName: 'Bakugo',
        lastName: 'Katsuki',
        username: 'kacchan',
        password: 'numbertwo2'
    }

    // we will set the ids later
    // products are ordered by popularity (top to bottom)
    let newProducts: Product[] = [
        {
            name: 'Sabila',
            price: 20.00,
            category: 'plants'
        },
        {
            name: 'Cactus',
            price: 10.00,
            category: 'plants'
        },
        {
            name: 'Rose',
            price: 5.00,
            category: 'plants'
        },
        {
            name: 'Peace Lily',
            price: 15.00,
            category: 'plants'
        },
        {
            name: 'Spider Plant',
            price: 15.00,
            category: 'plants'
        },
        {
            name: 'Pothos',
            price: 15.00,
            category: 'plants'
        },
        {
            name: 'Air Plant',
            price: 15.00,
            category: 'plants'
        },
        {
            name: 'Snake Plant',
            price: 15.00,
            category: 'plants'
        }
    ]

    let completedOrderA: Order = {
        status: OrderStatus.open, // will set to completed at the end
        userId: 0, // set later
    }

    let completedOrderB: Order = {
        status: OrderStatus.open, // will set to completed at the end
        userId: 0 // set later
    }

    let openOrderA: Order = {
        status: OrderStatus.open,
        userId: 0, // set later
    }

    let openOrderB: Order = {
        status: OrderStatus.open,
        userId: 0 // set later
    }

    try {

        // add new users
        const a = await userStore.create(newUserA);
        const b = await userStore.create(newUserB);

        completedOrderA.userId = a.id || 0
        openOrderA.userId = a.id || 0
        completedOrderB.userId = b.id || 0
        openOrderB.userId = b.id || 0

        // add products
        let i = 0
        newProducts.map( async (p: Product) => {
            const prod = await productStore.create(p)
            newProducts[i].id = prod.id ?? 0;
            i++;
        })

        // add orders
        const coOrderA = await orderStore.create(completedOrderA);
        const coOrderB = await orderStore.create(completedOrderB);
        const opOrderA = await orderStore.create(openOrderA);
        const opOrderB = await orderStore.create(openOrderB);

        completedOrderA.id = coOrderA.id || 0;
        completedOrderB.id = coOrderB.id || 0;
        openOrderA.id = opOrderA.id || 0;
        openOrderB.id = opOrderB.id || 0;

        // add to carts

        await orderStore.addProduct(8, completedOrderA.id || 0, newProducts[0].id || 0)
        await orderStore.addProduct(7, completedOrderA.id || 0, newProducts[1].id || 0)
        await orderStore.addProduct(6, completedOrderA.id || 0, newProducts[2].id || 0)
        await orderStore.addProduct(5, completedOrderA.id || 0, newProducts[3].id || 0)
        
        await orderStore.addProduct(4, completedOrderB.id || 0, newProducts[4].id || 0)
        await orderStore.addProduct(3, completedOrderB.id || 0, newProducts[5].id || 0)
        await orderStore.addProduct(2, completedOrderB.id || 0, newProducts[6].id || 0)
        await orderStore.addProduct(1, completedOrderB.id || 0, newProducts[7].id || 0)

        await orderStore.addProduct(8, openOrderA.id || 0, newProducts[0].id || 0)
        await orderStore.addProduct(7, openOrderA.id || 0, newProducts[1].id || 0)
        await orderStore.addProduct(6, openOrderA.id || 0, newProducts[2].id || 0)
        await orderStore.addProduct(5, openOrderA.id || 0, newProducts[3].id || 0)
        
        await orderStore.addProduct(4, openOrderB.id || 0, newProducts[4].id || 0)
        await orderStore.addProduct(3, openOrderB.id || 0, newProducts[5].id || 0)
        await orderStore.addProduct(2, openOrderB.id || 0, newProducts[6].id || 0)
        await orderStore.addProduct(1, openOrderB.id || 0, newProducts[7].id || 0)

        // set order status to completed
        completedOrderA.status = OrderStatus.completed
        completedOrderB.status = OrderStatus.completed
        await orderStore.edit(completedOrderA)
        await orderStore.edit(completedOrderB)

    }
    catch (err) {
        console.log(`Error while trying to add test data: ${err}`)
    }
}

export default addOverviewTestData;