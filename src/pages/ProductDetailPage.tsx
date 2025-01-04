import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import './ProductDetailPage.css';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = useAppSelector(state => state.books.items.find(b => b.id === id));

    if (!book) {
        return <div>Книга не найдена.</div>;
    }

    return (
        <div className="detail-page">
            <button onClick={() => navigate('/products')} className="back-button">
                Назад
            </button>
            <div className="detail-content">
                <img src={book.image} alt={book.title} />
                <div className="detail-info">
                    <h2>{book.title}</h2>
                    <p>
                        <strong>Автор:</strong> {book.author}
                    </p>
                    <p>
                        <strong>Год выпуска:</strong> {book.year}
                    </p>
                    <p>
                        <strong>Описание:</strong> {book.description}
                    </p>
                    <Link to={`/edit-product/${encodeURIComponent(book.id)}`} className="edit-button">
                        Редактировать
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
