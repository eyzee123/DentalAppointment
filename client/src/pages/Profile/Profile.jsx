import { useDispatch, useSelector } from "react-redux";
import UserForm from "../../components/forms/UserForm/UserForm";
import '../Signup/Signup.css';
import { setFormData, updateUser } from "../../redux/slice/userSlice";
import { useEffect } from "react";
import { getDataObject } from "../../utils/helper/localstoage";
import { LOCAL_STORAGE_KEY } from "../../utils/constants/localStorage";
import toast, { Toaster } from "react-hot-toast";

function Profile() {
    const dispatch = useDispatch();
    const { formData, loading, error } = useSelector(state => state.user);
    const user = getDataObject(LOCAL_STORAGE_KEY.user);

    useEffect(() => {
        for (const [key, value] of Object.entries(user)) {
            if(key === "name" || key === "email" || key === "phone_number"){
                dispatch(setFormData({ field: key, value}));
            }
          }
    },[setFormData])



    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormData({ field: name, value }));
      };
    
    const handleSubmit  = async (e) => {
        e.preventDefault();
        const userData ={
            ...formData,
            id: user.id
        }
        dispatch(updateUser(userData)).unwrap()
        .then((res) => {
            localStorage.setItem(LOCAL_STORAGE_KEY.user, JSON.stringify(userData))
            toast.success(res.result.message);
        })
        .catch((err) => {
            console.error("Failed to update user:", err);
        });

    };

    return (
        <div className="signup-container">
        <Toaster position="top-right" />
        <div className="signup-form">
          <h2>Edit Profile</h2>
          {error && <p className="error-message">{error}</p>}
          <UserForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            isEditing={true}
          />
        </div>
      </div>
    );
  }
  
  export default Profile;