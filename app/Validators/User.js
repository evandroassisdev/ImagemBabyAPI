'use strict';

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }
}

module.exports = User
