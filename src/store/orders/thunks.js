<<<<<<< HEAD
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

=======
import { collection, getDocs, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { cleanOrders, setOrders } from "./";

export const startGetOrders = (page = 1) => {
  return async (dispatch, getState) => {
    let number = page * 5;
    let counter = 0;
    let getOrders = false;
    let orders = [];
  
    if (getState().orders !== []) {
      dispatch(cleanOrders());
    }

    const collectionRef = collection(FirebaseDB, `/orders`);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if ((number - 5 === counter && !getOrders) || number === counter) {
        getOrders = !getOrders;
      }
      if (getOrders) {
        const data = {...doc.data()};
        const newDate = new Date(data.date);
        const formatDate = new Intl.DateTimeFormat("es-ES").format(newDate);
        data.dateString = formatDate;

        orders.push({id: counter+1, ...data})
      }
      counter++;
    });
>>>>>>> origin/salvarado
    dispatch(setOrders(orders));
  };
};
