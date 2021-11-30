import { ShoppingCart } from "./shopping-cart";


export class Order{
    datePlaced: string | any;
    items!: any[];
    $key!: string;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart){
        this.datePlaced = Date.now();

        this.items = shoppingCart.items.map(i => {
            return{
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          })
    }
}