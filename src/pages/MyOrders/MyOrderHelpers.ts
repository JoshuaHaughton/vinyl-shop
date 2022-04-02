import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { OrderArrayType } from "../../types";

export const fetchOrders = async (
  uid: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setMyOrders: React.Dispatch<
    React.SetStateAction<OrderArrayType | DocumentData[]>
  >,
) => {
  setLoading(true);
  let retrievedOrders: DocumentData[] = [];

  let orders = collection(db, "orders");
  const orderQuery = query(orders, where("uid", "==", uid));
  const querySnapshot = await getDocs(orderQuery);

  querySnapshot.forEach((item) => {
    retrievedOrders.push(item.data());
  });

  retrievedOrders = retrievedOrders.sort((a, b) =>
    a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0,
  );

  setMyOrders(retrievedOrders);

  setLoading(false);
};
