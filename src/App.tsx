import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage'; //NOTE: Для бонуса (редактирование продукта)
import { useAppDispatch } from './store/hooks';
import { setBooks } from './store/slices/booksSlice';
import axios from 'axios';

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {

        axios
            .get('https://openlibrary.org/subjects/science_fiction.json?limit=24')
            .then(response => {
                const books = response.data.works.map((work: any) => ({
                    id: work.key,
                    title: work.title,
                    author: work.authors?.[0]?.name || 'Unknown',
                    year: work.first_publish_year || 0,
                    description: work.subject ? work.subject.join(', ') : 'No description',
                    image: work.cover_id
                        ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
                        : 'https://via.placeholder.com/150',
                    liked: false,
                }));
                dispatch(setBooks(books));
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }, [dispatch]);

    return (
        <HashRouter basename="/test-salfa">
            <Routes>
                <Route path="/" element={<Navigate to="/products" />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/create-product" element={<CreateProductPage />} />
                <Route path="/edit-product/:id" element={<EditProductPage />} /> {/* NOTE: Для бонуса (редактирование продукта)*/}
            </Routes>
        </HashRouter>
    );
};

export default App;
