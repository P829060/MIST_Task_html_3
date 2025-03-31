document.addEventListener("DOMContentLoaded", function () {
    let orderTotal = 0;
    let orderItems = [];

    const items = document.querySelectorAll(".menu-item");
    const orderList = document.getElementById("order-list");
    const totalDisplay = document.getElementById("order-total");

    function updateTotal() {
        orderTotal = orderItems.reduce((sum, item) => sum + item.price, 0);
        totalDisplay.textContent = `Total Bill: ₹${orderTotal.toFixed(2)}`;
    }

    function removeItem(index) {
        orderItems.splice(index, 1);
        renderOrder();
    }

    function renderOrder() {
        orderList.innerHTML = "";
        orderItems.forEach((item, index) => {
            let li = document.createElement("li");
            li.textContent = `${index+1}. ${item.name} - ₹${item.price.toFixed(2)}`;
            li.style.cursor = "pointer";
            li.onclick = () => removeItem(index);
            orderList.appendChild(li);
        });
        updateTotal();
    }

    items.forEach(item => {
        item.addEventListener("click", function () {
            const itemName = this.getAttribute("data-name");
            const itemPrice = parseFloat(this.getAttribute("data-price"));

            orderItems.push({ name: itemName, price: itemPrice });
            renderOrder();
        });
    });
});