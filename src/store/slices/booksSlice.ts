import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Book {
    id: string;
    title: string;
    author: string;
    year: number;
    description: string;
    image: string;
    liked: boolean;
}

interface BooksState {
    items: Book[];
}

const initialState: BooksState = {
    items: [],
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks(state, action: PayloadAction<Book[]>) {
            state.items = action.payload;
        },
        addBook(state, action: PayloadAction<Book>) {
            state.items.push(action.payload);
        },
        toggleLike(state, action: PayloadAction<string>) {
            const book = state.items.find(b => b.id === action.payload);
            if (book) {
                book.liked = !book.liked;
            }
        },
        deleteBook(state, action: PayloadAction<string>) {
            state.items = state.items.filter(b => b.id !== action.payload);
        },
        editBook(state, action: PayloadAction<Book>) {
            const index = state.items.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const { setBooks, addBook, toggleLike, deleteBook, editBook } = booksSlice.actions;
export default booksSlice.reducer;
