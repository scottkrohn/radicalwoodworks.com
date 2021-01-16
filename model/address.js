import Model from '@models/model';

class Address extends Model {
  constructor() {
    super();

    this.data = {
      id: null,
      type: null,
      firstName: null,
      lastName: null,
      address: null,
      addressTwo: null,
      aptSuite: null,
      zip: null,
      city: null,
      state: null,
      email: null,
      userId: null,
    };
  }

  setId = (id) => {
    this.data.id = id;
  };

  setType = (type) => {
    this.data.type = type;
  };

  setFirstName = (firstName) => {
    this.data.firstName = firstName;
  };

  setLastName = (lastName) => {
    this.data.lastName = lastName;
  };

  setAddress = (address) => {
    this.data.address = address;
  };

  setAddressTwo = (addressTwo) => {
    this.data.addressTwo = addressTwo;
  };

  setAptSuite = (aptSuite) => {
    this.data.aptSuite = aptSuite;
  };

  setZip = (zip) => {
    this.data.zip = zip;
  };

  setCity = (city) => {
    this.data.city = city;
  };

  setState = (state) => {
    this.data.state = state;
  };

  setEmail = (email) => {
    this.data.email = email;
  };

  setUserId = (userId) => {
    this.data.userId = userId;
  };

  getId = () => {
    return this.data.id;
  };

  getType = () => {
    return this.data.type;
  };

  getFirstName = () => {
    return this.data.firstName;
  };

  getLastName = () => {
    return this.data.lastName;
  };

  getAddress = () => {
    return this.data.address;
  };

  getAddressTwo = () => {
    return this.data.addressTwo;
  };

  getAptSuite = () => {
    return this.data.aptSuite;
  };

  getZip = () => {
    return this.data.zip;
  };

  getCity = () => {
    return this.data.city;
  };

  getState = () => {
    return this.data.state;
  };

  getEmail = () => {
    return this.data.email;
  };

  getUserId = () => {
    return this.data.userId;
  };

  buildAddressModel = (data, children) => {
    this.setValues(data, true);
  };
}

export default Address;
