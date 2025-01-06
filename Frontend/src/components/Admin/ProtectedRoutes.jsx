const { useEffect } = require("react");
const { useSelector } = require("react-redux");
const { useNavigate } = require("react-router-dom");

const ProtectedRoutes=({children})=>{
    const { user}= useSelector( store=> store.auth);
     const navigate= useNavigate();
     useEffect(()=>{
        if( user==null || user.roll!='recruiter' )
  navigate("/");
     },[]);
      return (
        <>
        { children}
        </>
      )
}
export default ProtectedRoutes;