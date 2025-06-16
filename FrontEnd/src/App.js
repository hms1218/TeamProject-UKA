import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeaders from './components/HeaderFooter/MainHeader'; 
import MainBodys from './components/Main/MainBodys';
import MainFooter from './components/HeaderFooter/MainFooter';
import { Home, About, Adopt, Contact } from './components/DetailPage/navigation';

function App() {
    return (
		<div className="App" style={{padding : 20, width:100}}>
			<Router>
				<MainHeaders />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/" element={<About />} />
					<Route path="/" element={<Adopt />} />
					<Route path="/" element={<Contact />} />
				</Routes>
			</Router>
          	<MainBodys />
			<MainFooter />
      	</div>
  	);
}

export default App;
