// import * as React from "react";
// import { useDispatch } from "react-redux";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Loading from "../components/Loading";
// import { setUser } from "../features/user";

// export default function Splash({ setIsLoading }) {
//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     (async () => {
//       try {
//         const user = await AsyncStorage.getItem("@user");
//         const userName = await AsyncStorage.getItem("@userName");

//         if (user !== null) {
//           console.log("Data Restore Success", user);
//           dispatch(
//             setUser({
//               id: user,
//               userName: userName,
//             })
//           );
//         } else {
//           console.log("No Data Restore ");
//         }
//         setIsLoading(false);
//       } catch (e) {
//         console.log(e);
//         setIsLoading(false);
//       }
//     })();
//   }, []);

//   return <Loading text={"Cargando..."} />;
// }
