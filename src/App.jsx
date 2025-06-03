import { AuthProvider } from './providers/AuthProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import UserDetail from './components/UserDetail'
import UserPhotos from './components/UserPhotos'
import UploadPhoto from './pages/uploadPhoto/UploadPhoto'
import { Toaster } from 'sonner'

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route element={<RootLayout />}>
						<Route path='/users/:userId' element={<UserDetail />} />
						<Route path='/user-photos/:userId' element={<UserPhotos />} />
						<Route path='/upload-photo' element={<UploadPhoto />} />
						<Route path='/*' element={<div className='text-3xl text-center mt-10'>404 Not Found</div>} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
