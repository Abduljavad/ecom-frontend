import { Link, useNavigate } from "react-router-dom"
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from "../../firebase"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { addUser } from "../../Features/Auth/authSlice"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../../url"

function OAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = async ()=>{
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            console.log(result.user.displayName)
                await axios.post(Url+'/users/google-auth',{
                userName:result.user.displayName,
                email:result.user.email,
                profilePicture:result.user.photoURL
            },{withCredentials: true})
            .then((data)=>{
                dispatch(addUser(data.data))
                navigate("/categories")
                toast.success(`Welcome back, ${data.data.userName}!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            })
            .catch(err=>{
                console.log(err)
            })
        } catch(err){
            console.log(err)
        }
    }
  return (
    <Link onClick={handleClick} ><img src="images/google.png" alt="" /></Link>
  )
}

export default OAuth