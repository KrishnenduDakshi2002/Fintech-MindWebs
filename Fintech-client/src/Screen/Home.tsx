import React, {useState } from "react";
import ExpenseListWrapper from "../components/ExpenseList";
import { Footer } from "../components/Footer";
import useVerfiyUser from "../CustomHooks/GetverifiedUser";
import UserDetails from "../components/UserDetails";
import AddExpenseForm from "../components/AddExpenseForm";

const Currencies = ["Rupee", "Dollar"];
const Home = () => {

  // just a random state for refreshing
  const [refreshExpenseList, setRefreshExpenseList] = useState(false);

  // if user is verified then proceed accordingly
  // else useVerifyUser hook will navigate to login page
  // then continue to this page
  useVerfiyUser();
  return (
    <div className="bg-gray-200 h-full grid xl:grid-cols-[3fr_2fr] md:grid-cols-2 md:grid-rows-[10rem_4fr_4rem]
     grid-cols-1 grid-rows-[8rem_20rem_1fr_4rem] gap-2 p-3">
      {/* child-1 */}
      <div className="flex-center-center ">
        <UserDetails/>
      </div>
      {/* child-2 */}
      <div className=" md:row-span-2 md:h-full h-[20rem] overflow-auto">
        <ExpenseListWrapper refresh/>
      </div>
      {/* child-3 */}
      <AddExpenseForm/>
      {/* child-4 Footer */}
      <div className="md:col-span-2">
          <Footer/>
      </div>
    </div>
  );
};




export default Home;
