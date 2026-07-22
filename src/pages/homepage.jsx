
import { Route, Routes } from 'react-router-dom';
import Header from '../components/header.jsx';
import { ProductsPage } from './productsPage.jsx';
import { ProductOverViewPage } from './productOverViewPage.jsx';
import CartPage from './cartPage.jsx';
import CheckoutPage from './checkoutpage.jsx';
import CustomerOrdersPage from './customerOrdersPage.jsx';
import Settings from './settings.jsx';
import BottomNavigationBar from '../components/bottomNavigationBar.jsx';
import NotFoundPage from './notFoundPage.jsx';
import ForgotPassword from './forgotPassword.jsx';
import LandingPage from './landingPage.jsx';


export function HomePage(){
    return (
        <div className="bg-primary text-secondary flex flex-col w-full h-full justify-center ">
            <Header/>
            <div className=' flex w-full h-full overflow-y-scroll'>
                <Routes>
                    <Route path='/products' element={<ProductsPage/>} />
                    <Route path='/' element={<LandingPage/>} />
                    <Route path='/contact-us' element={<h1>987987!</h1>} />
                    <Route path='/overview/:productId' element={<ProductOverViewPage/>}/>
                    <Route path='/cart' element={<CartPage></CartPage>}></Route>
                    <Route path='/checkout' element={<CheckoutPage></CheckoutPage>}></Route>
                    <Route path='/my-orders' element={<CustomerOrdersPage/>}></Route>
                    <Route path='/settings' element={<Settings/>}></Route>
                    <Route path='/*' element={<NotFoundPage/>}></Route>
                    
                </Routes>
            </div>
            <BottomNavigationBar/>

        </div>
        
        
    )
}