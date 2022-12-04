
//Generating data in website
const items = document.getElementById('items-available');
let itemsData = [
    {   
        key : 1,
        itemName : 'Laptop',
        price : 70000,
        quantity : 8,
    },
    {   
        key : 2,
        itemName : 'Charger',
        price : 500,
        quantity : 43,
    },
    {   
        key : 3,
        itemName : 'Monitor',
        price : 10000,
        quantity : 10,
    },
    {
        key: 4,
        itemName : 'Mouse',
        price : 400,
        quantity : 28,
    }
]


const generateItems = () =>{
    return items.innerHTML = itemsData.map((ele)=>{
        return `<div class="d-flex align-items-center justify-content-between my-2 p-2 px-5 rounded-4 bg-blue" style="height:5rem;">
        <span class="w-75">${ele.itemName}<span class="badge text-bg-warning mx-2" id="quantity-update-${ele.key}">${ele.quantity}</span></span>
        <div class="d-flex align-items-center">
            <span class="badge text-bg-warning mx-2">${ele.price} BDT</span>
            <button class="btn btn-warning text-black text-bold rounded-5 mx-2 fw-bold add-to-cart" id=${ele.key}>+</button>
        </div>
    </div>
    `
    }).join(" ");
}

generateItems();

//cart items functionalities
let shopCart = [];

const moveToCart = (element) => {
    const selectedItemData = {...itemsData[element.id-1]};
    if(checkExistance(selectedItemData)){
        alert("Already added to cart");
    }else{
        quantityUpdate(element);
        selectedItemData.quantity=1;
        shopCart.push(selectedItemData);
        addingToCart(); 
        updateTotal(shopCart);
        underCheckout();
    }
    
};

const quantityUpdate = (element) => {
    const quantityUpdate = document.getElementById(`quantity-update-${element.id}`);
    itemsData[element.id-1].quantity--;
    return quantityUpdate.innerText = itemsData[element.id-1].quantity;

};

const checkExistance = (ele) =>{
    let exists = false;
    shopCart.forEach(x => {
        if(x.key === ele.key){
            exists = true;
        }
    })
    return exists;
};


//adding to cart
const cart = document.getElementById("items-added");
const addingToCart = (item) => {
    return cart.innerHTML = shopCart.map((ele)=>{
        return `
        <div class="d-flex align-items-center justify-content-between my-2 p-2 px-5 rounded-4 bg-warning" style="height:5rem;">
            <span class="w-75 text-black">${ele.itemName}<span class="badge text-bg-warning mx-2" id="checkout-q-${ele.key}">${ele.quantity}pcs</span></span>
            <div class="d-flex align-items-center">
                <button class="btn btn-danger text-black text-bold roundedf mx-2 fw-bold inc-btn" id="${ele.key}">+</button>
                <button class="btn btn-danger text-black text-bold roundedf mx-2 fw-bold dec-btn" id="${ele.key*10}">-</button>
            </div>
        </div>
    `
    }).join(" ");
};


//add to cart button functionality
let addToCartBtn = document.getElementsByClassName("add-to-cart");

Array.from(addToCartBtn).forEach(ele =>{
    ele.addEventListener('click', ()=>{moveToCart(ele)});
});


//check out functionality
let incBtns = document.getElementsByClassName("inc-btn");
let decBtns = document.getElementsByClassName("dec-btn");

const underCheckout = ()=>{
    Array.from(incBtns).forEach(ele =>{
        ele.addEventListener('click', ()=>{incItem(ele)});
    });

    Array.from(decBtns).forEach(ele =>{
        ele.addEventListener('click', ()=>{decItem(ele)});
    });
}


const incItem = (ele)=>{
    let shopCartQ;
    shopCart.forEach(x=>{
        if(x.key==ele.id){
            x.quantity++;
            shopCartQ = x.quantity;
        }
    })
    itemsData[ele.id-1].quantity--;
    if(itemsData[ele.id-1].quantity<0){
        alert("There are no more items available");
    }else{
        let shopCartItem = document.getElementById(`checkout-q-${ele.id}`);
        let availableItem = document.getElementById(`quantity-update-${ele.id}`);
        shopCartItem.innerText = shopCartQ+"pcs";
        availableItem.innerText = itemsData[ele.id-1].quantity;
    }
    updateTotal(shopCart);
}


const decItem = (ele) =>{
    const eleID = ele.id/10;
    let shopCartQ;
    shopCart.forEach(x=>{
        if(x.key==eleID){
            x.quantity--;
            shopCartQ = x.quantity;
        }
    })
    itemsData[eleID-1].quantity++;
    if(itemsData[eleID-1].quantity<0){
        alert("There are no more items available");
    }else{
        let shopCartItem = document.getElementById(`checkout-q-${eleID}`);
        let availableItem = document.getElementById(`quantity-update-${eleID}`);
        shopCartItem.innerText = shopCartQ+"pcs";
        availableItem.innerText = itemsData[eleID-1].quantity;
    }
    
    updateTotal(shopCart);
}

//counting total bill
const updateTotal = (shopCart) =>{
    sum =0;
    shopCart.forEach(e =>{
        sum+= e.price * e.quantity;
    });
    let total = document.getElementById("total");
    total.innerText = "Total : " + sum + " BDT"
}

