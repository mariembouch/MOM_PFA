//ons
// Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import { useWeb3 } from "../Web3helpers";

export default function Home() {
  const email = localStorage.getItem("email");
  const account = localStorage.getItem("account");
  const navigate = useNavigate();
  const { web3Data, loading } = useWeb3();

  if (loading) {
    return <div>Loading...</div>; // or handle the loading state in your preferred way
  }

  if (!web3Data || !web3Data.accounts) {
    return <div>Error loading web3 data</div>;
  }

  return (
    <div>
            <h4>welcome home  </h4>

      <h3>Your account: {account} </h3>
      <h3>Your email: {email} </h3>
      <AdminMenu />
      <button
        style={button}
        onClick={() => {
          localStorage.removeItem("email");
          localStorage.removeItem("account");
          window.location.reload();
        }}
      >
        {" "}
        Log out
      </button>
    </div>
  );
}

const button = {
  width: 100,
  padding: 10,
  borderRadius: 5,
  margin: 10,
  cursor: "pointer",
  fontSize: 17,
  color: "white",
  backgroundColor: "blue",
  border: "none",
};
