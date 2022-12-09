import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from '../redux/store'

import {v4 as uuidv4} from 'uuid';

// Define a type for the slice state
interface TodoItem {
  id: string,
  text: string,
  status: 'listed' | 'finished'
}

// Define the initial state using that type
const initialState: TodoItem[] = [];

export const todoSlice = createSlice({
  name: 'todo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addTodoItem: (state, action: PayloadAction<{text: string}>) => {
      const newTask: TodoItem = {
        id: uuidv4(),
        text: action.payload.text,
        status: 'listed'
      };

      return [...state, newTask];
    },
    updateTodoItemStatus: (state, action: PayloadAction<{id: string}>) => {
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {id: item.id, text: item.text, status: item.status === 'listed' ? 'finished' : 'listed'};
        } else {
          return item;
        }
      });
    },
    removeTodoItem: (state, action: PayloadAction<{id: string}>) => {
      return state.filter((item) => item.id !== action.payload.id);
    }
  }
});

// export the reducers actions and import them into your components
// const dispatch = useAppDispatch();
// dispatch(addTodoItem)
export const {addTodoItem, updateTodoItemStatus, removeTodoItem} = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// to access the state use, const todoList = useAppSelector(selectTodo);
export const selectTodo = (state: RootState) => state.todo;

// import the reducer into store.ts and add to the reducers array
export default todoSlice.reducer;
