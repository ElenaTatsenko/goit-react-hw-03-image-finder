import css from '../index.module.css';
import PropTypes from 'prop-types';


export const ErrorView = ( {errorName} ) => {
    return <h1 className={css.wrong}>{ Object.values(errorName)}</h1>
}

ErrorView.propTypes = {
    errorName: PropTypes.string.isRequired,
}