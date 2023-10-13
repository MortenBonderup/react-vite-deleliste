import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const [navn, setNavn] = useState("");
    const navigerTil = useNavigate();

    function haandterSubmit(e) {
        e.preventDefault();
        navigerTil(`/content/${navn}`);
    }

    return (
        <section className="page">
            <h1>Login</h1>
            <form onSubmit={haandterSubmit}>
                <label>Indtast dit navn</label>
                <input type="text" value={navn} onChange={e => setNavn(e.target.value)} required/>
                <button>Log in</button>
            </form>
        </section>
    );
}
