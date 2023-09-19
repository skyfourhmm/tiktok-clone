import { Link } from "react-router-dom";

function Button({
  to,
  href,
  primary = false,
  outline = false,
  upload = false,
  rounded = false,
  disabled = false,
  leftIcon = false,
  rightIcon = false,
  small = false,
  large = false,
  profile = false,
  children,
  onClick,
  ...passProps
}) {
  let Comp = "button";

  let props = {
    onClick,
    ...passProps,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }


  let classBase = `flex items-center cursor-pointer font-bold py-4 px-11 rounded-md ${profile ? '' : 'ml-8 '}`;

  if (primary) {
    classBase = classBase.concat(
      "bg-red-500 text-white border-solid border-2 border-red-500 hover:bg-red-600"
    );
  } else if (outline) {
    classBase = classBase.concat(
      "bg-inherit border-solid border-2 border-red-300 text-red-500 hover:bg-red-50 "
    );
  } else if (upload) {
    classBase = classBase.concat(
      "bg-inherit border-solid border-2 border-gray-300 hover:bg-gray-100 "
    );
  } else if (rounded) {
    classBase = classBase.replace(new RegExp('rounded-md', 'g'), 'rounded-full')
    classBase = classBase.concat('bg-inherit border-solid border-2 border-gray-300 hover:bg-gray-100 ')
  }
  
  if(disabled) {
    Object.keys(props).forEach(key => {
      if(key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key]
      }
    })
    primary ? classBase = classBase.concat(' cursor-default opacity-30 ') : classBase = classBase.concat('cursor-default opacity-30 bg-gray-400 ')
  }

  if (large) {
    classBase = classBase.replace(new RegExp('ml-8', 'g'), 'w-[100%]')
    classBase = classBase.concat(' my-8 ')
  }

  return (
    <Comp className={classBase} {...props}>
      {leftIcon && <span className='mr-2'>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
