import { makeStyles, alpha } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    leftSide: {
        fontSize: '6rem',
        textAlign: 'center',
        width: '50%',
        display: 'flex',
        width: '50%',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:focus': {
            background: '#ddd',

        },
    },
    typographyFont: {
        fontSize: '9rem',
        fontFamily: 'Lobster',
        fontFamily: 'cursive',

    },
    textField: {
        margin: '15px',
        width: '350px',
    },
    buttonSuccess: {
        background: '#5AAC44',
        color: '#fff',
        '&:hover': {
            background: alpha('#5AAC44', 0.75),
        },
    }, trelloKey: { marginBottom: '30px' }

}))