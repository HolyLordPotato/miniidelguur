import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function GetAllProducts() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then((data) => setProducts(data.products))
            .catch((error) => console.error('Fetch error:', error));
    }, []);

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div style={{ padding: "20px" }}>
            <h1>All Products</h1>
            <Link to="/add-product" style={{ marginBottom: '20px', display: 'inline-block' }}>
                <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Add Product
                </button>
            </Link>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {currentProducts.map((p) => (
                    <div 
                        key={p.id} 
                        style={{ 
                            border: '1px solid #ddd', 
                            borderRadius: '10px', 
                            padding: '10px', 
                            background: '#fff', 
                            textAlign: 'center', 
                        }}
                        >
                        <img
                            src={p.thumbnail}
                            alt={p.title}
                            style={{ 
                                width: '100%', 
                                height: '150px', 
                                objectFit: 'cover', 
                                borderRadius: '8px' 
                            }}
                        />
                        <h3 style={{ fontSize: '16px', }}>{p.title}</h3>
                        <p>{p.price}</p>
                        <p>{p.rating}</p>
                        <Link to={`/product/${p.id}`} style={{ marginRight: '10px' }}>Info</Link>
                        <button 
                            onClick={() => deleteProduct(p.id)}
                            style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    style={{ padding: '8px 15px', marginRight: '10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                    Previous
                </button>
                <span style={{ margin: '0 15px' }}>
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    style={{ padding: '8px 15px', marginLeft: '10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default GetAllProducts;