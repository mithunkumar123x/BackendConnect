import Header from "../NavigationBar/Header/Header"
import { Profile } from "../NavigationBar/Profile/Profile"

export const Home = () => {
    return (
        <>
         <h1>Welcome To Expense Tracker!</h1>
         <hr />
         <Header />
         <Profile />
        </>
       
    )
}