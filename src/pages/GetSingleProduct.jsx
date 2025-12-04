import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function GetSingleProduct() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    console.log( id )
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error('Fetch error:', error));
    }, [id]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            console.log('Product deleted:', id);
            alert('Product deleted successfully!');
            navigate('/');
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Single Product</h1>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/">
                    <button style={{ 
                        padding: '8px 15px', 
                        backgroundColor: '#2196F3', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}>
                        Back to Products
                    </button>
                </Link>
            </div>
            {product ? (
                <div 
                    key={product.id}
                    style={{ 
                        border: '1px solid #ddd', 
                        borderRadius: '10px',
                        padding: '10px',
                        background: '#fff',
                        maxWidth: '800px',
                    }}
                >
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        style={{
                            width: '100%',
                            height: '600px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                    <h3 style={{ fontSize: '16px' }}>{product.title}</h3>
                    <p>{product.description}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Rating:</strong> {product.rating}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Tags:</strong> {product.tags}</p>
                    
                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                        <Link to={`/product/${id}/edit`}>
                            <button style={{ 
                                padding: '10px 20px', 
                                backgroundColor: '#FF9800', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px', 
                                cursor: 'pointer'
                            }}>
                                Edit Product
                            </button>
                        </Link>
                        <button 
                            onClick={handleDelete}
                            style={{ 
                                padding: '10px 20px', 
                                backgroundColor: '#f44336', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px', 
                                cursor: 'pointer'
                            }}
                        >
                            Delete Product
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
    }
export default GetSingleProduct;