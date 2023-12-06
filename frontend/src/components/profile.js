import { appContext } from "./App"
import { useContext, useEffect, useState } from "react"
import Modal from "react-modal";
import { Details } from "./details";

Modal.setAppElement('#root');

export const Profile = () => {
  const {userData} = useContext(appContext);
  const [userItems, setUserItems] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

  const closeDetails = () => {
    setItemDetails(null)
  }

  useEffect(() => {
    getUserItems();
  })

  const getUserItems = () => {
    fetch(`http://localhost:8080/user/items?id=${userData.id}`)
      .then(res => res.json())
      .then(userItemsData => setUserItems(userItemsData))
  }

  return (
    <>
      {userItems ? <>
        {userItems.length > 0 ? <div className="items-grid">
          {userItems.map(item => {
            return <div className="item-container">
              <span className="item-head-container">
                <h3 className="item-title">{item.item_name}</h3>
                <p className="item-quantity">{item.quantity} In stock</p>
              </span>
              {item.description.length > 100 ? <p className="item-description">{item.description.slice(0, 100)}...</p>
              :<p className="item-description">{item.description}</p>}
              <button onClick={() => setItemDetails(item)}>View Details</button>
            </div>
          })}
          <Modal isOpen={itemDetails}>
            <Details item={itemDetails} setItem={closeDetails}/>
          </Modal> 
        </div>
        : 
        <h2>No items in inventory..</h2>}
      </> 
      : 
      <></>}
    </>
  )
}