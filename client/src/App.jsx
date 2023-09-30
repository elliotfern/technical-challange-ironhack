import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
  const [allPhones, setAllPhones] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5005/api/phones')
      .then((response) => {
        setAllPhones(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchPhoneDetails = (phoneId) => {
    axios
      .get(`http://localhost:5005/api/phones/${phoneId}`)
      .then((response) => {
        setSelectedPhone(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (allPhones === null) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container">
      <h3>Phone list</h3>

      <div className="row">
        {allPhones.map((eachPhone) => (
          <div className="col-md-4" key={eachPhone.name}>
            <Card style={{ width: '18rem', marginBottom: '20px' }}>
              <Card.Img
                variant="top"
                src={`./img/${eachPhone.imageFileName}`}
              />
              <Card.Body>
                <Card.Title>{eachPhone.name}</Card.Title>
                <Card.Text>{eachPhone.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => fetchPhoneDetails(eachPhone.id)}
                >
                  Details
                </Button>
                {selectedPhone && selectedPhone.id === eachPhone.id && (
                  <div style={{ marginTop: '15px' }}>
                    <h5>Phone Functions:</h5>
                    <ul key={selectedPhone.id}>
                      {/* Renderizar las funciones del teléfono */}
                      <li>Manufacturer: {selectedPhone.manufacturer}</li>
                      <li>Color: {selectedPhone.color}</li>
                      <li>Screen: {selectedPhone.screen}</li>
                      <li>Processor: {selectedPhone.processor}</li>
                      <li>RAM: {selectedPhone.ram}</li>
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
