import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
    'comments/fetch',
    async (_, {dispatch}) => {
        return await fetch('https://jsonplaceholder.typicode.com/comments?limit=10').then(res => res.json());

    }
)

export const deleteComments = createAsyncThunk(
    `comments/deleteComments`,
    async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {method: 'Delete'})
        return id;
    }
)

export const patchComments = createAsyncThunk(
    `comments/patchComments`,
    async ({id, newObj}) => {
         await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(newObj)
        }).then(res => res.json());
        return {id, changes: newObj};
    }
)


const commentAdapter = createEntityAdapter({
    selectId: (comment) => comment.id
})


const commentsSlice = createSlice({
    name: 'Comments',
    initialState: commentAdapter.getInitialState({loading: false}),
    reducers: {},
    extraReducers: {
        [fetchComments.pending](state) {
            state.loading = true;
        },
        [fetchComments.fulfilled](state, {payload}) {
            state.loading = false;
            commentAdapter.setAll(state, payload);
        },

        [fetchComments.rejected](state) {
            state.loading = false;

        },
        [deleteComments.pending](state) {
            state.loading = true
        },

        [deleteComments.fulfilled](state, {payload}) {
            state.loading = false
            commentAdapter.removeOne(state, payload)
        },

        [deleteComments.rejected](state) {
            state.loading = false
        },
        [patchComments.pending](state) {
            state.loading = true;
        },
        [patchComments.fulfilled](state, {payload}) {
            state.loading = false;
            commentAdapter.updateOne(state, {id: payload.id, changes: payload.changes});
        },
        [patchComments.rejected](state) {
            state.loading = false;

        }

    }

})

export const commentSelectors = commentAdapter.getSelectors(state => state.comments);// every selector chosen from here will work on comments
// export const {selectIds, selectById, selectTotal, selectEntities, selectAll} = commentSelectors;

export const CommentReducer = commentsSlice.reducer