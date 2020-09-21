import Model from '@models/model';

class User extends Model {
  constructor() {
    super();

    this.data = {
      id: null,
      username: null,
      type: null,
      email: null,
      firstName: null,
      lastName: null,
      address: null,
      addressTwo: null,
      zip: null,
      aptSuite: null,
      city: null,
      state: null,
    };
  }

  setId = (id) => {
    this.data.id = id;
  };

  setUsername = (username) => {
    this.data.username = username;
  };

  setType = (type) => {
    this.data.type = type;
  };

  setEmail = (email) => {
    this.data.email = email;
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

  setZip = (zip) => {
    this.data.zip = zip;
  };

  setAptSuite = (aptSuite) => {
    this.data.aptSuite = aptSuite;
  };

  setCity = (city) => {
    this.data.city = city;
  };

  setState = (state) => {
    this.data.state = state;
  };

  getId = () => {
    return this.data.id;
  };

  getUsername = () => {
    return this.data.username;
  };

  getType = () => {
    return this.data.type;
  };

  getEmail = () => {
    return this.data.email;
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

  getZip = () => {
    return this.data.zip;
  };

  getAptSuite = () => {
    return this.data.aptSuite;
  };

  getCity = () => {
    return this.data.city;
  };

  getState = () => {
    return this.data.state;
  };

  getFullName = () => {
    return `${this.data.firstName} ${this.data.lastName}`;
  };
}

export default User;
