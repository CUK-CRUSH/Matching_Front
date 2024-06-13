import { useState } from "react";

const useSetOpen = () => {
    const [isOpen,setOpen] = useState<boolean>(false);
    return {isOpen,setOpen};
}

export default useSetOpen;