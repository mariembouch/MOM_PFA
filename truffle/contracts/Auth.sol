// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auth {
    uint public userCount = 0;
    uint public patientCount = 0;

    mapping(string => User) public usersList;
    mapping(uint => Patient) public patientsList;

    struct User {
        string username;
        string email;
        string password;
    }

    struct Patient {
        string firstName;
        string lastName;
        uint age;
    }

    event UserCreated(
        string username,
        string email,
        string password
    );

    event PatientAdded(
        string firstName,
        string lastName,
        uint age
    );

    function createUser(string memory _username, string memory _email, string memory _password) public {
        userCount++;
        usersList[_email] = User(_username, _email, _password);
        emit UserCreated(_username, _email, _password);
    }

    function addPatient(string memory _firstName, string memory _lastName, uint _age) public {
        patientCount++;
        patientsList[patientCount] = Patient(_firstName, _lastName, _age);
        emit PatientAdded(_firstName, _lastName, _age);
    }
}
