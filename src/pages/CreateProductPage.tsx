import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../store/hooks';
import { addBook, Book } from '../store/slices/booksSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './CreateProductPage.css';

const CreateProductPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            year: '',
            description: '',
            image: '',
        },
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
            const newBook: Book = {
                id: uuidv4(),
                title: values.title,
                author: values.author,
                year: Number(values.year),
                description: values.description,
                image: values.image,
                liked: false,
            };
            dispatch(addBook(newBook));
            navigate('/products');
        },
    });

    return (
        <div className="create-page">
            <h1>Создать книгу</h1>
            <form onSubmit={formik.handleSubmit} className="create-form">
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
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default CreateProductPage;
