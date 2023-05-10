import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  onAddErrorMessage,
  onCleanOrders,
  onSavingOrder,
  onSetNumberOrders,
  onSetOrders,
  onUpdateOrder,
} from "./";

export const onStartGetOrders = (page = 0, size = 5) => {
  return async (dispatch) => {
    dispatch(onCleanOrders());

    const collectionRef = collection(FirebaseDB, "orders");
    let q;

    if (page === 0) {
      q = query(collectionRef, orderBy("date", "desc"), limit(size));
    } else {
      const lastVisibleDoc = query(
        collectionRef,
        orderBy("date", "desc"),
        limit(page * size)
      );
      const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
      const lastVisible =
        lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length - 1];
      q = query(
        collectionRef,
        orderBy("date", "desc"),
        startAfter(lastVisible),
        limit(size)
      );
    }

    const querySnapshot = await getDocs(q);

    const newOrders = querySnapshot.docs.map((doc, index) => {
      return { id: index + 1 + page * size, ...doc.data() };
    });

    dispatch(onSetOrders(newOrders));
  };
};

export const onStartFilterOrders = (page = 0, size = 5, preValue) => {
  return async (dispatch, getState) => {
    const { filter } = getState().orders;
    if (!filter) return;

    const { field, value } = filter;
    dispatch(onCleanOrders());
    const collectionRef = collection(FirebaseDB, "orders");
    let q,
      undersized = false;
    if (field?.includes("name")) {
      if (value !== "asc" && value !== "desc") {
        const formattedName = value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (preValue !== value) {
          q = query(
            collectionRef,
            where("nameLowerCase", ">=", formattedName),
            where("nameLowerCase", "<", formattedName + "\uf8ff")
          );
          const querySnapshot = await getDocs(q);
          undersized = querySnapshot.size <= size ? true : false;
          dispatch(onSetNumberOrders(querySnapshot.size));
        }
        if (page === 0 || undersized) {
          page = 0;
          q = query(
            collectionRef,
            where("nameLowerCase", ">=", formattedName),
            where("nameLowerCase", "<", formattedName + "\uf8ff"),
            limit(size)
          );
        } else {
          const lastVisibleDoc = query(
            collectionRef,
            where("nameLowerCase", ">=", formattedName),
            where("nameLowerCase", "<", formattedName + "\uf8ff"),
            limit(page * size)
          );
          const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
          const lastVisible =
            lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length - 1];
          q = query(
            collectionRef,
            where("nameLowerCase", ">=", formattedName),
            where("nameLowerCase", "<", formattedName + "\uf8ff"),
            startAfter(lastVisible),
            limit(size)
          );
        }
      } else {
        if (page === 0) {
          q = query(
            collectionRef,
            orderBy("nameLowerCase", value),
            limit(size)
          );
          dispatch(onStartNumberOrders());
        } else {
          const lastVisibleDoc = query(
            collectionRef,
            orderBy("nameLowerCase", value),
            limit(page * size)
          );
          const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
          const lastVisible =
            lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length - 1];
          q = query(
            collectionRef,
            orderBy("nameLowerCase", value),
            startAfter(lastVisible),
            limit(size)
          );
        }
      }
    }
    if (field?.includes("date")) {
      const dateObject = new Date(value);
      if (preValue !== value) {
        q = query(collectionRef, where("date", ">=", dateObject.getTime()));
        const querySnapshot = await getDocs(q);
        undersized = querySnapshot.size <= size ? true : false;
        dispatch(onSetNumberOrders(querySnapshot.size));
      }
      if (page === 0 || undersized) {
        page = 0;
        q = query(
          collectionRef,
          where("date", ">=", dateObject.getTime()),
          limit(size)
        );
      } else {
        const lastVisibleDoc = query(
          collectionRef,
          where("date", ">=", dateObject.getTime()),
          limit(page * size)
        );
        const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
        const lastVisible =
          lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length - 1];
        q = query(
          collectionRef,
          where("date", ">=", dateObject.getTime()),
          startAfter(lastVisible),
          limit(size)
        );
      }
    }
    if (field?.includes("wayToPay")) {
      if (page === 0) {
        q = query(collectionRef, orderBy("wayToPay", value), limit(size));
        dispatch(onStartNumberOrders());
      } else {
        const lastVisibleDoc = query(
          collectionRef,
          orderBy("wayToPay", value),
          limit(page * size)
        );
        const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
        const lastVisible =
          lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length - 1];
        q = query(
          collectionRef,
          orderBy("wayToPay", value),
          startAfter(lastVisible),
          limit(size)
        );
      }
    }
    if (field?.includes("status")) {
      if (preValue !== value) {
        q = query(collectionRef, where("status", "==", value));
        const querySnapshot = await getDocs(q);
        undersized = querySnapshot.size <= size ? true : false;
        dispatch(onSetNumberOrders(querySnapshot.size));
      }
      if (page === 0 || undersized) {
        page = 0;
        q = query(collectionRef, where("status", "==", value), limit(size));
      } else {
        const lastVisibleDoc = query(
          collectionRef,
          where("status", "==", value),
          limit(page * size)
        );
        const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
        const lastVisible =
          lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length - 1];
        q = query(
          collectionRef,
          where("status", "==", value),
          startAfter(lastVisible),
          limit(size)
        );
      }
    }

    const querySnapshot = await getDocs(q);
    const newOrders = querySnapshot.docs.map((doc, index) => {
      return { id: index + 1 + page * size, ...doc.data() };
    });

    dispatch(onSetOrders(newOrders));
  };
};

export const onStartNumberOrders = () => {
  return async (dispatch) => {
    const ordersCollection = collection(FirebaseDB, "orders");
    const ordersSnapshot = await getDocs(ordersCollection);

    const numOrders = ordersSnapshot.size;
    dispatch(onSetNumberOrders(numOrders));
  };
};

export const onStartUpdateOrderStatus = (status) => {
  return async (dispatch, getState) => {
    dispatch( onSavingOrder() );
    const { activeOrder } = getState().orders;

    const ordersCollection = collection(FirebaseDB, "orders");
    const q = query(
      ordersCollection,
      where("address", "==", activeOrder.address),
      where("cellphone", "==", activeOrder.cellphone),
      where("date", "==", activeOrder.date),
      where("name", "==", activeOrder.name),
      where("wayToPay", "==", activeOrder.wayToPay)
    );

    try {
      const querySnapshot = await getDocs(q);

      let docRef;

      if (querySnapshot.size === 1) {
        docRef = querySnapshot.docs[0].ref;
      }

      if (docRef) {
        await setDoc(docRef, { status }, { merge: true });
        dispatch( onUpdateOrder({ ...activeOrder, status }) );
      } else {
        dispatch(onAddErrorMessage("No se pudo encontrar el pedido para actualizar"));
      }
    } catch (error) {
      dispatch(onAddErrorMessage("Ha ocurrido un error al actualizar el pedido. Por favor, inténtelo de nuevo más tarde."));
    }
  };
};
