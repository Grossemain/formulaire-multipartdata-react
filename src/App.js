import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Merci from "./Merci";

function App() {
return (

<BrowserRouter>
<Routes>
<Route path="/" element={<Home />} />
<Route path="*" element={<Home />} />
<Route path="/merci" element={<Merci />} />
</Routes>
</BrowserRouter>
);
}
export default App;