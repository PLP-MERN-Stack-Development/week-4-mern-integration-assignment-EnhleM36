const Message = ({ variant, children }) => {
  const variants = {
    danger: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  };

  return (
    <div
      className={`${variants[variant] || variants.info} px-4 py-3 rounded border mb-4`}
      role="alert"
    >
      {children}
    </div>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;