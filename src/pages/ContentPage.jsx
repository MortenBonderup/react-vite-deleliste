import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addDoc, collection, deleteDoc, onSnapshot, doc} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ContentPage() {

    const params = useParams();
    const brugernavn = params.brugernavn;
    const [data, setData] = useState([]);
    const [dataFraDeleliste, setDataFraDeleliste] = useState([]);

    useEffect(() => {
        async function fetchData() {
          onSnapshot(collection(db, "madretter"), data => {
            const madretter = [];
            data.forEach((madret) => {
              madretter.push({ id: madret.id, ...madret.data() });
            });
            setData(madretter);
          });
        }
        fetchData();

        async function fetchDataFraDeleliste() {
          onSnapshot(collection(db, "deleliste"), data => {  
            const madretter = [];
            data.forEach((madret) => {
              madretter.push({ id: madret.id, ...madret.data() });
            });
            setDataFraDeleliste(madretter);
          });
        }
        fetchDataFraDeleliste();                   
      }, []);

      async function sletDeleliste() {   
        
        const bekraeft = confirm("Vil du slette delelisten for alle brugere ? ");

        if (bekraeft) {
          dataFraDeleliste.forEach((madret) => {
            deleteDoc(doc(db, "deleliste", madret.id));
          }) 

          setDataFraDeleliste([]);
        }
      }

      async function valgAfMadret(e) {    
        const madret = e.currentTarget.getAttribute("data-id");
    
        const nyvare = {
          madret: madret,
          brugernavn: brugernavn
        }
    
        try {
          const vareRef = await addDoc(collection(db, "deleliste"), nyvare);
          console.log("Madret tilføjet med ID: ", vareRef.id);
        } catch (e) {
          console.error("FEJL - Kunne ikke tilføje vare: ", e);
        }
      }


    const deleSkyggeliste = [];
    const delelisteKopi = [...dataFraDeleliste];

    dataFraDeleliste.forEach((madret) => {
      delelisteKopi.forEach((madret2) => {
        const alleredePaaDeleliste = deleSkyggeliste.find((madretten) => madretten.madret === madret2.madret);
        if (madret.brugernavn !== madret2.brugernavn && madret2.madret===madret.madret && !alleredePaaDeleliste) {
          deleSkyggeliste.push(madret2);
        }
      })
    })


    return (
        <div className="page">
       <ul style={{"display" : "flex","flexDirection" : "column" }}> 
        {data.map((item) => (
          <li key={item.id} style={{ "listStyleType": "none" }}>
            <span style={{ "marginRight": "10px" }}>{item.madret}</span>
            <button type="button" data-id={item.madret} onClick={valgAfMadret} style={{display: "inline-block", marginRight: "10px"}}>Mit valg</button>
            <button type="button" data-id={item.madret} style={{display: "inline-block"}}>Afvis</button>
          </li>
        ))}
      </ul>
      <hr />
      <h3>Det er vi enige om: </h3>
      <button type="button" onClick={sletDeleliste} style={{display: "inline-block", marginLeft : "10px"}}>Slet deleliste</button>
      <ul style={{"display" : "flex","flexDirection" : "column" }}> 
        {deleSkyggeliste.map((item) => (
          <li key={item.id} style={{ "listStyleType": "none" }}>
            <span style={{ "marginRight": "10px" }}>{item.madret}</span>
          </li>
        ))}
      </ul>
    </div>
    );
}
