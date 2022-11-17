import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import  { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
   const [user , setUser] = useState({});
   const [loading , setloading] = useState(true);


   const createUser = (email , password) =>{
    setloading(true)
   return createUserWithEmailAndPassword(auth , email , password)
   }

   const logout = () => {
    localStorage.removeItem('jwt')
     return signOut(auth)
   }
    
   const login = (email , password) => {
    setloading(true)
    return signInWithEmailAndPassword(auth ,email , password)
}

   useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth , currentuser => {
        setUser(currentuser)
        setloading(false)
      })

      return ()=> unsubscribe()

   } , [])
    
  const authInfo = {createUser ,  loading ,user ,logout , login}

    return (
        <div>
             <AuthContext.Provider value={authInfo}>
               {children}
             </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;