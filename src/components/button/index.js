import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

function Button({ value, onClick, disabled, className, onEnterKeyPressed }) {
  const enterPressed = (ev) => {
    const code = ev.keyCode || ev.which
    if (code === 13) {
      onEnterKeyPressed()
    }
  }

  const buttonClass = classnames('button', className)

  return (
    <button
      onClick={!disabled ? onClick : () => {}}
      disabled={disabled ? 'disabled' : undefined}
      onKeyUp={(ev) => enterPressed(ev)}
      className={buttonClass}
    >
      <span className="button__value">{value}</span>
    </button>
  )
}
Button.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  onEnterKeyPressed: PropTypes.func,
}

export default Button
