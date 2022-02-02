import React, {memo} from 'react';
import PropTypes from "prop-types";
import {Button, ButtonToolbar, Panel} from "rsuite";

const Comment = ({comment, onDelete, onPatch, id, body}) => {
    return (
        <Panel header={comment.name} bordered style={{margin: 20}}>
            {comment.body}
            <br/>
            <ButtonToolbar>
                <Button size={'lg'} onClick={() => onDelete(comment.id)} color={'red'}>Delete</Button>
                <Button size={'lg'} color={'cyan'} onClick={() => onPatch(id, {body: 'new text'})}>Patch</Button>
            </ButtonToolbar>
        </Panel>
    );
};

Comment.prototypes = {
    comment: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onPatch: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    body: PropTypes.object.isRequired

}

export default memo(Comment);
