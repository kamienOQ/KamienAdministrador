import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { cleanOrders, setOrders } from "./";

export const startGetOrders = () => {
  return async (dispatch) => {
    dispatch(cleanOrders());

    let orders = [];

    const collectionRef = collection(FirebaseDB, `/orders`);
    const q = query( collectionRef, orderBy("date", "desc") );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc, index) => {
      orders.push({id: index+1, ...doc.data()});
    });

    dispatch(setOrders(orders));
  };
};
