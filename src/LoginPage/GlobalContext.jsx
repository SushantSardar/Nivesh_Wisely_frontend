
import React, { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [currentClientId, setCurrentClientId] = useState(null);
  const [productListId, setProductListId] = useState(null)
  const [complaintId, setComplaintId] = useState(null)
  const [faqId, setFaqId] = useState(null)
  const [userId, setUserId] = useState(null)
  const [profileId, setProfileId] = useState(null)
  const [displayUserName, setDisplayUserName] = useState(null)
  const [couponId, setCouponId]=useState(null)
  const [complaintRowId,setComplaintRowId] = useState(null)
  const [annualComplaintRowId,setAnnualComplaintRowId] = useState(null)
  const [ clientComplaintRowId,setClientComplaintRowId] = useState(null)

  useEffect(() => {
    console.log(currentClientId)
  }, [currentClientId])

  // Implement your login logic here and set isAuthenticated accordingly

  return (
    <GlobalContext.Provider value={{
      currentClientId, setCurrentClientId,
      productListId, setProductListId,
      complaintId,  setComplaintId,
      faqId,  setFaqId,
      userId,  setUserId,
      profileId,  setProfileId,
      displayUserName,  setDisplayUserName,
      couponId, setCouponId,
      complaintRowId,setComplaintRowId,
      annualComplaintRowId,setAnnualComplaintRowId,
      clientComplaintRowId,setClientComplaintRowId

    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}