import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { GlobalContext } from "../../context/GlobalContext";
import { useSelector } from "react-redux";

const Search = () => {
  const { role,logout,setSearchQuery,query} = useContext(GlobalContext);
  const [isLogged, setIsLogged] = useState(false);

  const { cart } = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    if (role==="user") {
      setIsLogged(true);
    }else{
      setIsLogged(false)
    }
  }, [role]);

  const navigate = useNavigate();

  const goToCart=()=>{
    navigate("/cart")
  }

  const handleClick=()=>{
    navigate("/")
  }

  const [squery,setSquery]=useState(query)

  const handleSearch=(e)=>{
    e.preventDefault()
    setSearchQuery(squery)
    navigate("/search")
  }
  const goToPofile=()=>{
    navigate("/profile")
  }


  const handleLogout=()=>{
    logout()
    navigate("/login")
  }

  return (
    <section className="search">
      <div className="container topbar">
        <div className="logo" onClick={handleClick} style={{cursor:"pointer"}}>
          <span>E-Gadget</span>
        </div>
        <div className="search-box">
          <InputGroup className="searchbox mt-1">
            <InputGroup.Text>All Category</InputGroup.Text>
            <Form.Control className="searchinput" onChange={(e)=>setSquery(e.target.value)} required  name="search" value={squery} placeholder="Search here" />
            <InputGroup.Text className="searchbtn" onClick={handleSearch}>
              <GoSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>
        {isLogged ? (
          <div className="icon">
            <span onClick={goToPofile} style={{cursor:"pointer"}}>
              <CgProfile />
            </span>
            <span className="cartbutton"  style={{cursor:"pointer"}} onClick={goToCart}>
              <BsCart3 />
              <label style={{cursor:"pointer"}} onClick={goToCart} className="cartNotify">{cart.length>0?cart.length:"0"}</label>
            </span>
            <span style={{cursor:"pointer"}} onClick={handleLogout}>
              <FiLogOut color="red" />
            </span>
          </div>
        ) : (
          <div className="authbutton">
            <Button
              className="bg-primary"
              onClick={() => navigate("/login", { replace: false })}
            >
              Login
            </Button>
            <Button onClick={() => navigate("/register", { replace: false })}>
              Register
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
