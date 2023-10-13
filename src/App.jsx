import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ContentPage from "./pages/ContentPage";
import ContactPage from "./pages/ContactPage";

function App() {
    return (
        <>
            <Nav />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/content/:brugernavn" element={<ContentPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
