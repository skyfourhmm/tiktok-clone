function FooterModal() {
    return (<div className="w-full flex flex-col items-center absolute bottom-0">
    <div className="w-full h-px bg-gray-200"></div>
    <div className="my-9 ">
      Don't have an account?{" "}
      <span className="text-red-500 font-semibold cursor-pointer hover:underline">
        Sign up
      </span>
    </div>
  </div>);
}

export default FooterModal;