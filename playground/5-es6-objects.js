const name = 'Andrew'
const userAge = 27

const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}

//Destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

// const {label:productLabel, stock, rating = 4} = product

// console.log(productLabel,stock,rating);

const transaction = (type, { label, stock }) => {

    console.log(type);
    console.log(label);
    console.log(stock);

}

transaction('order',product)