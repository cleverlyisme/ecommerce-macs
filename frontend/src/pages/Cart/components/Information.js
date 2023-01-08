import { useState } from 'react';
import { Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Information = ({ cart, onConfirm }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    note: '',
  });

  const changeData = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const { name, phoneNumber, address, note } = data;

  const submit = async () => {
    try {
      if (!name || !name.trim()) throw new Error('Name is empty');
      if (!phoneNumber || !phoneNumber.trim())
        throw new Error('Phone number is empty');
      if (!address || !address.trim()) throw new Error('Address is empty');

      await onConfirm({
        note,
        name,
        address,
        phoneNumber,
        products: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <Row>
        <h5>Information</h5>

        <Col xs={12} sm={12} md={6}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => changeData('name', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone number</Label>
            <Input
              placeholder="Phone number"
              type="number"
              value={phoneNumber}
              onChange={(e) => changeData('phoneNumber', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => changeData('address', e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <FormGroup>
            <Label>Note</Label>
            <Input
              type="textarea"
              rows={5}
              placeholder="Note"
              value={note}
              onChange={(e) => changeData('note', e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <Button
            color="success"
            className="w-100"
            disabled={!cart.length}
            onClick={submit}
          >
            Confirm
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Information;
