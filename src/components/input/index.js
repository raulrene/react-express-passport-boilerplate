import React, { useState, useRef } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './style.scss'

/**
 * Input Text Component
 */
function InputText({
  onEnterKeyPressed,
  id,
  className,
  value,
  label,
  type,
  name,
  placeholder,
  disabled,
  onChange,
  onClick,
  tabIndex = '0',
  error,
  prefix,
  suffix,
  autoComplete,
}) {
  const [focused, setFocused] = useState(null)
  const inputRef = useRef()

  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setFocused(false)
  }

  const enterPressed = (ev) => {
    const code = ev.keyCode || ev.which
    if (code === 13) {
      onEnterKeyPressed && onEnterKeyPressed()
    }
  }

  const onInputChange = (ev) => {
    onChange(ev.target.value)
  }

  const classes = classnames('input-wrapper', className, {
    focused,
    'input-wrapper--disabled': disabled,
  })

  return (
    <div className="wrapper">
      <div className={classes}>
        <div className="label-error-wrapper">
          {label && <label className="input-name-label">{label}</label>}
        </div>

        <div className="wrapper__prefix">
          {prefix && <span className="prefix">{prefix}</span>}
          <input
            id={id}
            ref={inputRef}
            tabIndex={tabIndex}
            type={type || 'text'}
            name={name}
            className="input-text"
            placeholder={placeholder}
            value={value || ''}
            disabled={disabled ? 'disabled' : undefined}
            onClick={!disabled ? onClick : () => {}}
            onChange={!disabled ? onInputChange : () => {}}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyUp={enterPressed}
            autoComplete={autoComplete}
          />
          {error && (
            <div className="error-wrapper">
              <img src={'/assets/tooltip.png'}></img>
              <div className="input-error">{error}</div>
            </div>
          )}
          {!error && suffix && <span className={'suffix'}>{suffix}</span>}
        </div>
      </div>
    </div>
  )
}

InputText.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onEnterKeyPressed: PropTypes.func,
  onClick: PropTypes.func,
  error: PropTypes.string,
  prefix: PropTypes.any,
  tabIndex: PropTypes.string,
  suffix: PropTypes.any,
}

InputText.displayName = 'InputText'

export default InputText
