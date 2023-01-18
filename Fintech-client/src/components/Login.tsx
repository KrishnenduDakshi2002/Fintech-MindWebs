import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import {HOST} from '../Host'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function onClickLogin(){
        setIsLoading(true);
        axios.post(`${HOST}/login`,{
            email,
            password
        }).then((response)=>{
            if(response.status === 200){ setIsLoading(false);
                localStorage.setItem('authToken',response.data.authToken);
                navigate('/user/dashboard')
            };
        }).catch(e=>{window.alert(`ERR: ${e.response.data.message} `);console.log(e)});
    }
  return (
    <div className="max-w-[30rem] lg:h-[50%] h-[60%] min-h-[30rem] rounded-2xl bg-white shadow-gray-500 shadow-2xl  grid grid-rows-[3rem_1fr] py-10">
      <h1 className="text-[1.8rem] mx-5">FinTech - Your Finance Tracker</h1>
      <div className="grid grid-rows-[1fr_1fr_2.5fr] mx-10 pt-5">
        <div className="w-full">
          <InputElement
            placeholder="Enter Email Address"
            type="email"
            onChangeValue={(val) =>setEmail(val)}
          />
        </div>
        <div className="w-full">
          <InputElement
            placeholder="Enter Password"
            type="password"
            onChangeValue={(val) => setPassword(val)}
          />
        </div>
        <div className="flex justify-evenly items-center flex-col my-4">
          <button onClick={onClickLogin} className="bg-blue-300 py-2 px-10 w-[90%] rounded-2xl hover:bg-blue-400">
            <p className="text-[1.2rem] text-blue-800 font-bold">Login</p>
          </button>
          <button className="border-2 border-blue-600 py-2 px-10 w-[90%] rounded-2xl hover:bg-blue-400 hover:border-transparent">
            <Link to="/signup">
              <p className="text-[1.2rem] text-blue-800 font-bold">Create an account</p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

const InputElement = ({
  type = "text",
  placeholder = "",
  onChangeValue,
}: {
  type?: string;
  placeholder?: string;
  onChangeValue: (val: string) => void;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full h-[2rem] py-5 px-2 rounded-xl my-2 mx-auto outline-none border border-black text-md focus:border-blue-600"
    onChange={(e) => onChangeValue(e.target.value)}
  />
);


export default Login;
