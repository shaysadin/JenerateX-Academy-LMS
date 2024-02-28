import Image from "next/image"

export const Logo = () => { 
    return ( 
        <Image 
            height={170}
            width={170}
            alt="logo"
            src="/logo.png"
        /> 
    )
}