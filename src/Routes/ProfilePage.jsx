
import {  useSelector } from "react-redux";


function ProfilePage() {
  const user = useSelector((state) => state.auth.user);


  return (
    <div className="max-w-2xl flex flex-col items-center mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.userName}!</h1>
      <div
        
        className="rounded-full shadow-lg self-center bg-slate-700 cursor-pointer"
      >
        <img
          className="w-20 p-2 rounded-full transition duration-300 ease-in-out hover:scale-110   object-contain"
          src={user.profilePicture}
          alt=""
        />
      </div>
      
      
      <ul className="w-3/5 flex flex-col gap-4 mt-12 text-md font-semibold">
        <li className="flex justify-between">
          <span>User Name</span>
          <span>{user.userName}</span>
        </li>
        <hr />
        <li className="flex justify-between ">
          <span>Email</span>
          <span>{user.email}</span>
        </li>
        <hr />
      </ul>
    </div>
  );
}
export default ProfilePage;
