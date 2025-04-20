// ----------------------------------------------------------------------
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
const role = localStorage.getItem('role');

const account = {
  displayName: username,
  role:role,
  email: email,
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
