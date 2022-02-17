import SignUp from './components/SignUp'
import WelcomePage from './components/WelcomePage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<Navigate to='/SignUp' replace />} />
				<Route path='/SignUp' element={<SignUp />} />
				<Route path='/WelcomePage' element={<WelcomePage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
