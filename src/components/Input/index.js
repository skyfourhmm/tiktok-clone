function Input({ placeholder, type, isLogin = false, isFail, onValueChange }) {
  let classInput =
    "outline-none p-6 bg-gray-100 border border-gray-400 rounded-md mt-4 w-full";
  if (isLogin) {
    classInput = classInput.concat(" input cursor-pointer");
  }
  if (isFail) {
    classInput = classInput.replace("border-gray-400", "border-red-400");
  }

  const handleChange = (event) => {
    onValueChange(event.target.value);
  };

  return (
    <input
      className={classInput}
      disabled={isLogin}
      placeholder={placeholder}
      type={type}
      onChange={handleChange}
    ></input>
  );
}

export default Input;
