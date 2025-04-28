class User {
    constructor({ id, name, email,password_hash, phone_number, created_at }) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password_hash = password_hash;
      this.phone_number = phone_number;
      this.created_at = created_at;
    }

    toJSON() {
        return {
          id: this.id,
          name: this.name,
          email: this.email,
          phone_number: this.phone_number,
          created_at: this.created_at,
        };
      }
  }
  
  module.exports = User;
  