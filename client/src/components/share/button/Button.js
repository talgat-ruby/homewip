//@flow
import React from 'react';
import $class from 'classnames';
import './Button.css';

const Button = ({ children, name, type = 'button', disabled, onClick }) => (
	<button
		className={$class('button', { 'has-name': name, disabled })}
		disabled={disabled}
		type={type}
		onClick={onClick}
	>
		{name || children}
	</button>
);

export default Button;
