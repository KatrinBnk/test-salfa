import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleLike, deleteBook } from '../store/slices/booksSlice';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate'; //NOTE: для пагинации
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
    const books = useAppSelector(state => state.books.items);
    const dispatch = useAppDispatch();

    const [filter, setFilter] = useState<'all' | 'liked'>('all');
    const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);

    const authors = Array.from(new Set(books.map(book => book.author)));

    //NOTE: разместим на одной странице максимально по 8 элементов
    const itemsPerPage = 8;
    const pageCount = Math.ceil(
        books.filter(book => {
            const likeFilter = filter === 'liked' ? book.liked : true;
            const authorFilter = selectedAuthor === 'all' ? true : book.author === selectedAuthor;
            const searchFilter = book.title.toLowerCase().includes(searchTerm.toLowerCase());
            return likeFilter && authorFilter && searchFilter;
        }).length / itemsPerPage
    );

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const filteredBooks = books.filter(book => {
        const likeFilter = filter === 'liked' ? book.liked : true;
        const authorFilter = selectedAuthor === 'all' ? true : book.author === selectedAuthor;
        const searchFilter = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        return likeFilter && authorFilter && searchFilter;
    });

    const currentItems = filteredBooks.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const resetPagination = () => {
        setCurrentPage(0);
    };

    return (
        <div className="products-page">
            <h1>Список книг</h1>
            <div className="filters">
                <button
                    onClick={() => {
                        setFilter('all');
                        resetPagination();
                    }}
                    className={filter === 'all' ? 'active' : ''}
                >
                    Все
                </button>
                <button
                    onClick={() => {
                        setFilter('liked');
                        resetPagination();
                    }}
                    className={filter === 'liked' ? 'active' : ''}
                >
                    Избранные
                </button>
                <select
                    value={selectedAuthor}
                    onChange={e => {
                        setSelectedAuthor(e.target.value);
                        resetPagination();
                    }}
                >
                    <option value="all">Все авторы</option>
                    {authors.map(author => (
                        <option key={author} value={author}>
                            {author}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        resetPagination();
                    }}
                    className="search-input"
                />
                <Link to="/create-product" className="create-button">
                    Добавить книгу
                </Link>
            </div>
            <div className="cards-container">
                {currentItems.length > 0 ? (
                    currentItems.map(book => (
                        <div key={book.id} className="card">
                            <Link to={`/products/${encodeURIComponent(book.id)}`} className="card-link">
                                <img src={book.image} alt={book.title} />
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                <p>{book.year}</p>
                                <p>
                                    {book.description.length > 100
                                        ? `${book.description.slice(0, 100)}...`
                                        : book.description}
                                </p>
                            </Link>
                            <div className="card-actions">
                                <button onClick={() => dispatch(toggleLike(book.id))}>
                                    {book.liked ? <FaHeart color="red" /> : <FaRegHeart color="black" />}
                                </button>
                                <button onClick={() => dispatch(deleteBook(book.id))}>
                                    <FaTrash color="black" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-books-message"> Книги не найдены </p>
                )}
            </div>
            {pageCount > 1 && (
                /* NOTE: << - предыдущая страница, >> - следующая страница*/
                <ReactPaginate
                    previousLabel={'<<'}
                    nextLabel={'>>'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            )}
        </div>
    );
};

export default ProductsPage;
