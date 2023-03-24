import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { cleanOrders, setNumberOrders, setOrders } from "./";

export const startGetOrders = (page = 0, size = 5) => {
  return async (dispatch) => {
    dispatch(cleanOrders());

    const collectionRef = collection(FirebaseDB, "orders");
    let q;

    if (page === 0) {
      q = query( collectionRef, orderBy("date", "desc"), limit(size) );
    } else {
      const lastVisibleDoc = query( collectionRef,  orderBy("date", "desc"), limit(page * size) );
      const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
      const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
      q = query( collectionRef,  orderBy("date", "desc"), startAfter(lastVisible), limit(size) );
    }

    const querySnapshot = await getDocs(q);

    const newOrders = querySnapshot.docs.map((doc, index) => {
      return { id: index + 1 + page * size, ...doc.data() };
    });

    dispatch(setOrders(newOrders));
  };
};

export const startNumberOrders = () => {
  return async (dispatch) => {
    const ordersCollection = collection(FirebaseDB, 'orders');

    const ordersSnapshot = await getDocs(ordersCollection);

    const numOrders = ordersSnapshot.size;

    dispatch(setNumberOrders(numOrders));
  };
};
