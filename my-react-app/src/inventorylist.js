import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./navbar";

function InventoryList() {
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/inventories/")
      .then(response => response.json())
      .then(data => {
        setInventories(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log("Error reading data:" + err);
        setIsLoading(false);
      });
  }, []);

  const removeInv = async (id) => {
    await fetch(`/api/inventories/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    console.log("Remove Done!");
    const updatedInventories = inventories.filter(i => i._id !== id);
    setInventories(updatedInventories);
  };

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  const inventoryList = inventories.map(inventory => (
    <tr key={inventory._id}>
      <td style={{ whiteSpace: 'nowrap' }}>{inventory.prodname}</td>
      <td>{inventory.qty}</td>
      <td>{inventory.price}</td>
      <td>{inventory.status}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={`/inventories/${inventory._id}`}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => removeInv(inventory._id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <div className="float-right">
          <Button color="success" className="my-4" tag={Link} to="/inventories/new">Add Inventory</Button>
        </div>
        <h3>Inventory List</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="20%">Product Name</th>
              <th width="15%">Quantity</th>
              <th width="15%">Price</th>
              <th width="15%">Status</th>
              <th width="15%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default InventoryList;