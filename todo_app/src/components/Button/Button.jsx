function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}) {
  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700',

    secondary:
      'bg-gray-100 text-gray-600 hover:bg-gray-200',

    danger:
      'bg-red-50 text-red-600 hover:bg-red-100',

    success:
      'bg-green-50 text-green-600 hover:bg-green-100',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;