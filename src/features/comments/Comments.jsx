import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {commentSelectors, deleteComments, fetchComments, patchComments} from "./commentsSlice";
import Comment from "../../app/component/Comment";

const Comments = () => {
    const dispatch = useDispatch();
    const total = useSelector(commentSelectors.selectTotal); // returns how many in there

    const allComments = useSelector(commentSelectors.selectAll); // returns everything
    const findByid = useSelector(state => commentSelectors.selectById(state, 1));
    const onDelete = useCallback(id => {
        dispatch(deleteComments(id))
    }, [])

    const onPatch = useCallback((id, newObj) => {
        dispatch(patchComments({id, newObj}))
    })

    console.log({total, allComments, findByid});
    useEffect(() => {
        dispatch(fetchComments())
    }, []);
    return allComments.map((comment) => <Comment comment={comment} key={comment.id} id={comment.id} body={comment.body}
                                                 onDelete={onDelete} onPatch={onPatch}/>);
};

export default Comments;
