import { createContext, useEffect, useState } from "react";

const api_url = process.env.REACT_APP_API_URL;
export const ClientContext = createContext();
export const ClientContextProvider = ({ children }) => {
    const [allClientsData, setAllClientsData] = useState([]);

    const [clientForEdit, setClientForEdit] = useState({});
    // __________Poducts list for profile page__________
    const [productOptionData, setProductOptionData] = useState([]);
    // __________Products list for Product List page_______
    const [productsData, setProductsData] = useState([]);
    // _______________________________________________________________________
    const [profilesData, setProfilesData] = useState([]);

    const [isCallPopUpConfirmed, setIsPopUpConfirmed] = useState(false);
    const [localLocation,setLocalLocation]  = useState();
  

    useEffect(() => {
        const fetchData = async () => {
            const clientDataFethcer = async () => {
                try {
                    // _____________________clients Data _______________________
                    const response1 = await fetch(`${api_url}/showclientlist`);
                    if (!response1.ok) {
                        throw new Error(`HTTP eror! Status:${response1.status}`);
                    }
                    const resData = await response1.json()
                    setAllClientsData(resData);
                } catch (error) {
                    console.error("Error fetching data:_____________________clients", error);
                }
            }
            const prodcutDataFetcher = async () => {
                try {
                    const response2 = await fetch(`${api_url}/newProductList`)
                    if (!response2.ok) {
                        throw new Error(`HTTP error! Status: ${response2.status}`);
                    }
                    const result = await response2.json();
                    setProductsData(result);
                    const newArray = result.flatMap((item) => {
                        return item.caps.map((cap) => ({
                            name: `${item.productName}-${cap.capCategory}`,
                            capPrice: cap.capPrice,
                            capDuration: cap.capDuration
                        }));
                    });
                    setProductOptionData(newArray)
                } catch (error) {
                    console.error("Error fetching data:_____________________Products", error);
                }
            }
            const profilesDataFetcher = async () => {
                try {
                    const response3 = await fetch(`${api_url}/getprofiles`);
                    if (!response3.ok) {
                        throw new Error(`HTTP eror! Status:${response3.status}`);
                    }
                    const resData3 = await response3.json()
                    setProfilesData(resData3);
                } catch (error) {
                    console.error("Error fetching data:_____________________Profiles____________________________", error);
                }
            }


            clientDataFethcer();
            prodcutDataFetcher();
            profilesDataFetcher();
        };
        fetchData();
    }, []);


    return <ClientContext.Provider value={{ allClientsData, setAllClientsData, clientForEdit, setClientForEdit, productOptionData, profilesData, setProfilesData, productsData,isCallPopUpConfirmed, setIsPopUpConfirmed,localLocation,setLocalLocation}}>{children}</ClientContext.Provider>
}

