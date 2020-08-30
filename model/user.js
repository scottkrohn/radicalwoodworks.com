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
}

export default User;
