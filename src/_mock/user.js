const data = [
  {
    name: 'Ram',
    id: 'Cb8900234',
    contactNo: '9090909090',
    License: '9452-1245-1234',
    Address: 'Madurai',
  },
  {
    name: 'Selvam',
    id: 'Cb8900235',
    contactNo: '9090909030',
    License: '9422-1245-1234',
    Address: 'Chennai',
  },
  {
    name: 'Raju',
    id: 'Cb8900335',
    contactNo: '9080909030',
    License: '9422-1234-1234',
    Address: 'Theni',
  },
  {
    name: 'Maari',
    id: 'Cb89009035',
    contactNo: '9080901030',
    License: '9422-1234-0990',
    Address: 'Kanchipuram',
  },
];
const users = data.map((item, index) => ({
  id: item.Address,
  name: item.id,
  company: item.name,
  isVerified: item.License,
  status: item.Address,
  role: item.contactNo,
}));

export default users;
