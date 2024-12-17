document.getElementById('parse-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Show loading message while parsing
    document.getElementById('loading-message').style.display = 'block';
    document.getElementById('results-container').innerHTML = '';

    const itemId = document.getElementById('item-id').value;

    try {
        // Fetch data from FastAPI backend
        const response = await fetch(`http://127.0.0.1:8000/parse?itemId=${itemId}`);
        const data = await response.json();

        console.log("Response data:", data);  // Log the data to inspect its structure

        // Hide loading message
        document.getElementById('loading-message').style.display = 'none';

        if (Object.keys(data).length === 0) {
            document.getElementById('results-container').innerHTML = '<p>No products found.</p>';
            return;
        }

        // Iterate over the product names (keys of the dictionary)
        const resultsContainer = document.getElementById('results-container');
        for (const productName in data) {
            if (data.hasOwnProperty(productName)) {
                const product = data[productName];
                const itemElement = document.createElement('div');
                itemElement.classList.add('result-item');

                // Create the product display
                let productDetails = `<h3>${productName}</h3>`;
                for (const size in product) {
                    if (product.hasOwnProperty(size)) {
                        const stockInfo = product[size];
                        productDetails += `
                            <p>Warehouse: ${stockInfo.warehouse}, Quantity: ${stockInfo.quantity}</p>
                        `;
                    }
                }

                itemElement.innerHTML = productDetails;
                resultsContainer.appendChild(itemElement);
            }
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('loading-message').style.display = 'none';
        document.getElementById('results-container').innerHTML = '<p>Error occurred while fetching data.</p>';
    }
});
