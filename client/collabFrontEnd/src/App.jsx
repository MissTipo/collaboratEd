// Desc: This is the root component of the application
//       It is the first component to be rendered
//       It is the parent component of all other components


import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'

function App() {

  return (
    <>
      < Header />
      <Login />
      <Footer />
    </>
)}

export default App
