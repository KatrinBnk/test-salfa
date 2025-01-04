import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { editBook, Book } from '../store/slices/booksSlice';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProductPage.css';

const EditProductPage: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const book = useAppSelector(state => state.books.items.find(b => b.id === id));

    const formik = useFormik({
        initialValues: {
            title: book?.title || '',
            author: book?.author || '',
            year: book?.year.toString() || '',
            description: book?.description || '',
            image: book?.image || '',
        },
        enableReinitialize: true, //NOTE: Позволяет обновлять начальные значения при изменении book
        validationSchema: Yup.object({
            title: Yup.string().required('Обязательное поле'),
            author: Yup.string().required('Обязательное поле'),
            year: Yup.number()
                .required('Обязательное поле')
                .min(0, 'Некорректный год')
                .max(new Date().getFullYear(), 'Некорректный год'),
            description: Yup.string().required('Обязательное поле'),
            image: Yup.string().url('Некорректный URL').required('Обязательное поле'),
        }),
        onSubmit: values => {
            if (book) {
                const updatedBook: Book = {
                    ...book,
                    title: values.title,
                    author: values.author,
                    year: Number(values.year),
                    description: values.description,
                    image: values.image,
                };
                dispatch(editBook(updatedBook));
                navigate(`/products/${encodeURIComponent(book.id)}`);
            }
        },
    });

    if (!book) {
        return <div>Книга не найдена.</div>;
    }

    return (
        <div className="edit-page">
            <h1>Редактировать книгу</h1>
            <form onSubmit={formik.handleSubmit} className="edit-form">
                <div className="form-group">
                    <label>Название</label>
                    <input
                        type="text"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="error">{formik.errors.title}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Автор</label>
                    <input
                        type="text"
                        name="author"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.author}
                    />
                    {formik.touched.author && formik.errors.author ? (
                        <div className="error">{formik.errors.author}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Год выпуска</label>
                    <input
                        type="number"
                        name="year"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.year}
                    />
                    {formik.touched.year && formik.errors.year ? (
                        <div className="error">{formik.errors.year}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <textarea
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="error">{formik.errors.description}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Изображение (URL)</label>
                    <input
                        type="text"
                        name="image"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.image}
                    />
                    {formik.touched.image && formik.errors.image ? (
                        <div className="error">{formik.errors.image}</div>
                    ) : null}
                </div>
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default EditProductPage;
