import PropTypes from 'prop-types'

const Button = ({text, onClick, color}) => {
    return (
        <div className='btn' style={{ backgroundColor: color }} onClick = {onClick}>
            {text}
        </div>
    )
}

Button.defaultProps = {
    'text' : 'Add'
}

Button.propTypes = {
    'text': PropTypes.string
}

export default Button
