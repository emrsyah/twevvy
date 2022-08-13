import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestoreDb } from "../../../firebase";
import TriggerButton from "../../components/TriggerButton";

const Trigger = () => {
  const { id } = useParams();
  const [label, setLabel] = useState();

  const getWidget = async () => {
    const docRef = doc(firestoreDb, "widgets", id);
    const docSnap = await getDoc(docRef);

    // Handling error dan exception
    if (!docSnap.exists()) {
      console.error("Logs doesnt exist");
      //   navigate("/dashboard", { replace: true });
      return;
    }
    setLabel(docSnap.data().buttonLabel)
  };

  useEffect(()=>{
    try{
      getWidget()
    }catch(err){
      console.error(err)
    }
  }, [])

  return <TriggerButton label={label || "Getting Data"} />;
};

export default Trigger;
