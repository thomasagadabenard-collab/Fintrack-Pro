import React, { useEffect, useState } from "react";

const Clients = () => {
  const [clientData, setClientData] = useState({
    id: Date.now() + Math.random(),
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("clientHistory")
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  const [good, setGood] = useState({
    name: "Name details looks good",
    company: "Company details Looks good",
    email: "Email is good to go",
    phone: "Phone number looks good"
  })

  const handleSave = () => {
    const error = {};

    if (!clientData.name) {
      error.name = "Name cannot be empty";
    }

    if (!clientData.company) {
      error.company = "Company name cannot be empty";
    }

    if (!clientData.email) {
      error.email = "Email cannot be empty";
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientData.email)){
      error.email = "Invalid email"
    }

    if (!clientData.phone) {
      error.phone = "Phone cannot be empty";
    }else if (clientData.phone.length !== 11){
      error.phone = "Phone number is incomplete"
    }

    setErrors(error);

    if (Object.keys(error).length === 0) {
      setHistory([...history, clientData]);

      setClientData({
        id: Date.now() + Math.random(),
        name: "",
        company: "",
        email: "",
        phone: "",
      });
    }
  };

  const handleDeleteClient = (id) => {
    const filteredClients = history.filter(
      (client) => client.id !== id
    )

    setHistory(filteredClients)
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    localStorage.setItem("clientHistory", JSON.stringify(history))
  }, [history])
  

  return (
    <>
    <section>
      <h1>Clients page</h1>

      <table className="client-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone number</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Please enter client's Name"
                value={clientData.name}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    name: e.target.value,
                  })
                }
                className="tab-input"
              />

              {errors.name ? (
                <small style={{ color: "red" }}>{errors.name}</small>
              ) : clientData.name ? (
                <small style={{ color: "green" }}>{good.name}</small>
              ) : null}
            </td>

            <td>
              <input
                type="text"
                placeholder="Please enter company name"
                value={clientData.company}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    company: e.target.value,
                  })
                }
                className="tab-input"
              />

              {errors.company ? (
                  <small style={{ color: "red" }}>{errors.company}</small>
                ) : clientData.company ? (
                  <small style={{ color: "green" }}>{good.company}</small>
                ) : null}
            </td>

            <td>
              <input
                type="email"
                placeholder="Please enter client email"
                value={clientData.email}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    email: e.target.value,
                  })
                }
                className="tab-input"
              />

              {errors.email ? (
                  <small style={{ color: "red" }}>{errors.email}</small>
                ) : clientData.email ? (
                  <small style={{ color: "green" }}>{good.email}</small>
                ) : null}
            </td>

            <td>
              <input
                type="phone"
                placeholder="Please enter client phone number"
                value={clientData.phone}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    phone: e.target.value,
                  })
                }
                className="tab-input"
              />

              {errors.phone ? (
                  <small style={{ color: "red" }}>{errors.phone}</small>
                ) : clientData.phone ? (
                  <small style={{ color: "green" }}>{good.phone}</small>
                ) : null}
            </td>
          </tr>
        </tbody>
      </table>

      <button className="create-btn" onClick={handleSave}>
        Save
      </button>
    </section>

    <section>
      <h2>Client Details</h2>

      {history && history.length > 0 ?  (
        <table className="client-history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone number</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {history.map((client, index) => (
              <tr key={client.id}>
                <td>{index + 1}</td>
                <td>{client.name}</td>
                <td>{client.company}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <button onClick={() => {handleDeleteClient(client.id)}} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      ) : <p>No history to display yet</p> }
    </section>

    </>
    
  );
};

export default Clients;