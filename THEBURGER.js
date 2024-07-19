document.addEventListener('DOMContentLoaded', function() {
    const loginPage = document.getElementById('login-page');
    const dashboard = document.getElementById('dashboard');
    const loginButton = document.getElementById('login-button');
    const sidebarButtons = document.querySelectorAll('.sidebar button');
    const forms = document.querySelectorAll('.form');

    loginPage.style.display = 'block';

    loginButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            loginPage.style.display = 'none';
            dashboard.style.display = 'block';
        } else {
            alert('Please enter both username and password');
        }
    });

    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            forms.forEach(form => form.style.display = 'none');
            const target = button.getAttribute('data-target');
            document.getElementById(target).style.display = 'block';
        });
    });

    // Initially show the first form in the dashboard
    if (forms.length > 0) {
        forms[0].style.display = 'block';
    }

    // Cart functionality
    const addToCartButton = document.getElementById('add-to-cart');
    const cartTableBody = document.querySelector('#cart tbody');
    const cartTotalDisplay = document.querySelector('#cart-total span');
    let cartTotal = 0;

    addToCartButton.addEventListener('click', function() {
        const item = document.getElementById('item').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const price = parseFloat(document.getElementById('price').value);

        if (item && quantity > 0 && price > 0) {
            const total = quantity * price;
            cartTotal += total;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item}</td>
                <td>${quantity}</td>
                <td>$${price.toFixed(2)}</td>
                <td>$${total.toFixed(2)}</td>
                <td><button class="remove-item">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
            cartTotalDisplay.textContent = cartTotal.toFixed(2);

            // Clear input fields
            document.getElementById('item').value = '';
            document.getElementById('quantity').value = '';
            document.getElementById('price').value = '';
        } else {
            alert('Please enter valid item, quantity, and price');
        }
    });

    cartTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const row = event.target.closest('tr');
            const total = parseFloat(row.cells[3].textContent.replace('$', ''));
            cartTotal -= total;
            row.remove();
            cartTotalDisplay.textContent = cartTotal.toFixed(2);
        }
    });

    // Checkout functionality
    const checkoutButton = document.getElementById('checkout');
    const transactionHistoryTableBody = document.querySelector('#transaction-history tbody');
    let transactionID = 1;

    checkoutButton.addEventListener('click', function() {
        if (cartTotal > 0) {
            const date = new Date().toLocaleString();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transactionID++}</td>
                <td>${date}</td>
                <td>$${cartTotal.toFixed(2)}</td>
            `;
            transactionHistoryTableBody.appendChild(row);

            // Clear cart
            cartTableBody.innerHTML = '';
            cartTotal = 0;
            cartTotalDisplay.textContent = '0.00';
            alert('Checkout successful!');
        } else {
            alert('Cart is empty');
        }
    });
});
