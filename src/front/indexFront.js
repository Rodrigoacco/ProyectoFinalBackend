fetch('http://localhost:8080/v1/api/cart').then(res => res.json()).then(info => {
    const fragment = document.createDocumentFragment();
    info.forEach(cart => {
        const div = document.createElement('div');
        const priceParagraph = document.createElement('p');
        const statusParagraph = document.createElement('p');
        const number = document.createElement('p');
        priceParagraph.innerHTML = `Total: $ ${cart.totalPrice}`;
        statusParagraph.innerHTML = `Status: ${cart.status}`;
        number.innerHTML = `Orden numero: ${cart.number}`;
        div.appendChild(number);
        div.appendChild(priceParagraph);
        div.appendChild(statusParagraph);
        fragment.appendChild(div);
    });
    const cartContainer = document.getElementById('carts');
    cartContainer.appendChild(fragment);
})