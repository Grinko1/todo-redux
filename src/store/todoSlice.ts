import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { AnyAction } from 'redux';

export type Todo = {
    id:string,
    title:string,
    completed:boolean
}
type TodoState = {
    list: Todo[],
    loading:boolean,
    error:null |string
}
const initialState: TodoState = {
    list:[],
    loading:false,
    error:null
}

export const fetchTodos = createAsyncThunk<Todo[], undefined,{rejectValue: string} >(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
     
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            
            if (!response.ok) {
                return rejectWithValue('Server Error!');
            }
    
            const data = await response.json();
    
            return data;
        
    }
);

export const deleteTodo = createAsyncThunk<string, string,{rejectValue: string} >(
    'todos/deleteTodo',
    async function(id, {rejectWithValue}) {
        
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                 return rejectWithValue('failed')
            }

         return id;

        
    }
);

export const toggleStatus = createAsyncThunk<Todo, string,{rejectValue: string, state:{todos: TodoState}} >(
    'todos/toggleStatus',
    async function (id, {rejectWithValue, getState}) {
        const todo = getState().todos.list.find(todo => todo.id === id);
            if(todo){
                const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            });

            if (!response.ok) {
                return rejectWithValue('Can\'t toggle status. Server error.');
            }
            return (await response.json()) as Todo;
            } 
                return rejectWithValue('Not found')
            
            
    }
);

export const addNewTodo = createAsyncThunk<Todo, string, {rejectValue:string}>(
    'todos/addNewTodo',
    async function (text, {rejectWithValue}) {
        
            const todo = {
                title: text,
                userId: 1,
                completed: false,
            };

            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });

            if (!response.ok) {
                 return rejectWithValue('Can\'t add task. Server error.')
            }

            return await response.json();


        })

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // addTodo(state, action: PayloadAction<string>) {
        //     state.list.push({
        //       id: new Date().toISOString(),
        //       title: action.payload,
        //       completed: false,
        //     });
        // },
        // toggleComplete(state, action: PayloadAction<string>) {
        //     const toggledTodo = state.list.find(todo => todo.id === action.payload);
        //     if(toggledTodo){
        //           toggledTodo.completed = !toggledTodo.completed;
        //     }
          
        // },
        // removeTodo(state, action: PayloadAction<string>) {
        //     state.list = state.list.filter(todo => todo.id !== action.payload);
        // }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchTodos.pending, (state) => {
            state.loading = true
            state.error = null
        })
         .addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.list = action.payload
        })
         .addCase(fetchTodos.rejected, (state) => {
            state.loading = false
            state.error = 'error'
        })
        .addCase(addNewTodo.pending, (state) => {
            state.error = null
        })
         .addCase(addNewTodo.fulfilled, (state, action) => {
            state.error = null
            state.list.push(action.payload)
        })
         .addCase(addNewTodo.rejected, (state) => {
            state.error = 'error'
        })
          .addCase(toggleStatus.pending, (state) => {
            state.error = null
        })
         .addCase(toggleStatus.fulfilled, (state, action) => {
            state.error = null
            const toggledTodo = state.list.find(todo => todo.id === action.payload.id);
            if(toggledTodo){
                  toggledTodo.completed = !toggledTodo.completed;
            }
        })
         .addCase(toggleStatus.rejected, (state) => {
            state.error = 'error'
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.error = null
            state.list = state.list.filter(todo => todo.id !== action.payload);
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        })
        
    }

});

// export const {addTodo, toggleComplete, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;

function isError (action: AnyAction) {
    return action.type.endsWith('rejected')
}