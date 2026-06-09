import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebase";

export const getWatchlist = async (uid) => {
  const snapshot = await getDocs(
    collection(db, "users", uid, "watchlist")
  );

  return snapshot.docs.map((doc) => ({
    firestoreId: doc.id,
    ...doc.data(),
  }));
};

export const subscribeToWatchlist = (uid, callback) => {
  return onSnapshot(
    collection(db, "users", uid, "watchlist"),
    (snapshot) => {
      const movies = snapshot.docs.map((doc) => ({
        firestoreId: doc.id,
        ...doc.data(),
      }));

      callback(movies);
    }
  );
};

export const addToWatchlist = async (uid, movie) => {
  await addDoc(
    collection(db, "users", uid, "watchlist"),
    movie
  );
};

export const removeFromWatchlist = async (uid, movieId) => {
  const q = query(
    collection(db, "users", uid, "watchlist"),
    where("id", "==", movieId)
  );

  const snapshot = await getDocs(q);

  const promises = snapshot.docs.map((document) =>
    deleteDoc(
      doc(db, "users", uid, "watchlist", document.id)
    )
  );

  await Promise.all(promises);
};




































// import {
//   collection,
//   addDoc,
//   deleteDoc,
//   doc,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";

// import { db } from "./firebase";

// export const getWatchlist = async (uid) => {
//   const snapshot = await getDocs(
//     collection(db, "users", uid, "watchlist")
//   );

//   return snapshot.docs.map((doc) => ({
//     firestoreId: doc.id,
//     ...doc.data(),
//   }));
// };

// export const addToWatchlist = async (uid, movie) => {
//   await addDoc(
//     collection(db, "users", uid, "watchlist"),
//     movie
//   );
// };

// export const removeFromWatchlist = async (uid, movieId) => {
//   const q = query(
//     collection(db, "users", uid, "watchlist"),
//     where("id", "==", movieId)
//   );

//   const snapshot = await getDocs(q);

//   snapshot.forEach(async (document) => {
//     await deleteDoc(
//       doc(db, "users", uid, "watchlist", document.id)
//     );
//   });
// };