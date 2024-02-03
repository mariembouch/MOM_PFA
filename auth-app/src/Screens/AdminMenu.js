import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../Web3helpers";

export default function AdminMenu() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [patients, setPatients] = useState([]);

    const { accounts, web3Data } = useWeb3();
    const navigate = useNavigate();

    const addPatient = async () => {
        try {
            // Get the selected account from MetaMask
            const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
            // Send transaction with the specified "from" address
            await web3Data.auth.methods
                .addPatient(firstName, lastName, parseInt(age))
                .send({ from: selectedAccount });
    
            alert("Patient added successfully!");
            fetchPatients();
        } catch (error) {
            console.error(error.message);
        }
    };
    

    const fetchPatients = async () => {
        try {
            const totalPatients = await web3Data.auth.methods.patientCount().call();
            const patientsArray = [];

            for (let i = 1; i <= totalPatients; i++) {
                const patient = await web3Data.auth.methods.patientsList(i).call();
                patientsArray.push(patient);
            }

            setPatients(patientsArray);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        if (web3Data && web3Data.auth) {
            fetchPatients(); // Fetch the list of patients when the component mounts
        }
    }, [web3Data]);

    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("account");
        navigate("/");
    };

    return (
        <div>
            <h3>Admin Menu</h3>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            <button onClick={addPatient}>Add Patient</button>
            <br />
            <h4>List of Patients:</h4>
            <ul>
                {patients.map((patient, index) => (
                    <li key={index}>
                        {`Name: ${patient.firstName} ${patient.lastName}, Age: ${patient.age}`}
                    </li>
                ))}
            </ul>
            <br />
        </div>
    );
}
