import React from 'react'
import { signOut } from "next-auth/react";
// ...

const Signoutbutton = () => {
  return (
    <div>
  

<button onClick={() => signOut({ callbackUrl: "/login" })}>Çıkış Yap</button>
    </div>
  )
}

export default Signoutbutton
