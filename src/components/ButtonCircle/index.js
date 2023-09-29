function ButtonCircle({ children, leftIcon, rightIcon, onclick }) {
  return (
    <div className="p-3 bg-zinc-600 rounded-full text-white flex items-center cursor-pointer" onClick={onclick}>
      {leftIcon}
      {children && <span className="ml-2">{children}</span>}
      {rightIcon}
    </div>
  );
}

export default ButtonCircle;
