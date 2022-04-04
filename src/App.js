import { Routes, Route } from "react-router-dom";

import { Component } from "react";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Women from "./routes/women/women.component";
import Men from "./routes/men/men.component";
import Kids from "./routes/kids/kids.component";
import Description from "./routes/description/description.component";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="women" element={<Women />} />
          <Route path="men" element={<Men />} />
          <Route path="kids" element={<Kids />} />
          <Route path="description" element={<Description />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
