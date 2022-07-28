import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@material-ui/core'
import "./Modal.css";
import { makeStyles, alpha } from '@material-ui/core/styles';
const useStyle = makeStyles((theme) => ({

    buttonSuccess: {
        background: '#5AAC44',
        color: '#fff',
        '&:hover': {
            background: alpha('#5AAC44', 0.75),
        },
    }, trelloKey: { marginBottom: '30px' }

}))
export const Modal = ({
    active,
    setActive,
    children,
    text,
    status,
    naviganeSucsess,
    naviganeNOTSucsess,
}) => {
    let navigate = useNavigate();
    const onButtonSuccess = () => { console.log('add'); }
    const classes = useStyle();
    return (
        <div
            className={active ? "modal active" : "modal"}

        >
            <div className="modal__content" onClick={(e) => e.stopPropagation}>
                {children}
                <h1 className="modal__text">Enter the name of your board</h1>
                <input></input>
                <Button variant="contained" onClick={onButtonSuccess}
                    className={classes.buttonSuccess
                    }>
                    + Add board
                </Button>
                <Button variant="outlined" onClick={() => setActive(false)}>
                    Cancel
                </Button>


            </div>
        </div>

    );
};
