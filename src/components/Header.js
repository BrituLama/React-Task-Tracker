import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import Button from './Button'

const Header = ({title, toggleShowTask}) => {
    const location = useLocation()
    return (
        <div className='header' >
            {title}
            {location.pathname === '/' && <Button  onClick = {toggleShowTask} color='steelblue' text = 'Add'/>}
        </div>
    )
}

Header.defaultProps = {
    'title' : 'Task Tracker'
}

Header.propTypes = {
'title': PropTypes.string
}

export default Header
