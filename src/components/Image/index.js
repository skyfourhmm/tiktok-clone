import { forwardRef, useState } from "react";
import image from "../../assets/images";

const Image = forwardRef(({src, alt, small = false, large = false, ...props}, ref) => {

    const [failBack, setFailBack] = useState('')
    const handleChangeImage = () => {
        setFailBack(image.noImage)
    }

    let classBase = 'rounded-full overflow-hidden cursor-pointer '

    if(small) {
      classBase = classBase.concat('w-14 h-14')
    }

    if(large) {
      classBase = classBase.concat('w-24 h-24')
    }

    return (
      <div className={classBase} ref={ref}>
        <img
          className="w-full object-cover h-full"
          src={ failBack || src}
          alt={alt}
          {...props}
          onError={handleChangeImage}
        />
      </div>
    );
  })

export default Image;
