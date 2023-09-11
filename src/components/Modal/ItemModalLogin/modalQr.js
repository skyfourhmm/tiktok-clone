import image from "../../../../src/assets/images/index";
import FooterModal from "../footerModal";

function ModalQR() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-5xl font-extrabold my-8 select-none cursor-text">
        Log in with QR code
      </h2>
      <div className="my-9 border border-gray-300-500 w-4/5 flex justify-center py-9 rounded-2xl">
        <div className="w-52 h-52">
          <img className="w-full" src={image.qrImage} />
        </div>
      </div>
      <div className="flex flex-col w-4/5">
        <span>1. Scan with your mobile device's camera</span>
        <span>2. Confirm login or sign up</span>
      </div>
      <FooterModal/>
    </div>
  );
}

export default ModalQR;
