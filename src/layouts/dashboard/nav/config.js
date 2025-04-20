// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Products',
    icon: icon('ic_user'),
    children: [
      {
        title: 'Rice',
        path: '/dashboard/products/rice',
        icon: icon('ic_rice'),
      },
      {
        title: 'Spices',
        path: '/dashboard/products/spices',
        icon: icon('ic_spices'),
      },
      {
        title: 'Snacks',
        path: '/dashboard/products/snacks',
        icon: icon('ic_snacks'),
      },
      {
        title: 'Flour',
        path: '/dashboard/products/flour',
        icon: icon('ic_flour'),
      },
      {
        title: 'Pooja Products',
        path: '/dashboard/products/pooja-products',
        icon: icon('ic_pooja'),
      },
      {
        title: 'Flower',
        path: '/dashboard/products/flower',
        icon: icon('ic_flower'),
      },
      {
        title: 'Leaf',
        path: '/dashboard/products/leaf',
        icon: icon('ic_leaf'),
      },
      {
        title: 'Vegetable',
        path: '/dashboard/products/vegetables',
        icon: icon('ic_Vegetables'),
      },
      {
        title: 'Pickle',
        path: '/dashboard/products/pickle',
        icon: icon('ic_pickle'),
      },
      {
        title: 'Oil',
        path: '/dashboard/products/oil',
        icon: icon('ic_oil'),
      },
      {
        title: 'Paan Beeda',
        path: '/dashboard/products/paan-beeda',
        icon: icon('ic_user'),
      },
      {
        title: 'Masala',
        path: '/dashboard/products/masala',
        icon: icon('ic_masala'),
      },
    ]
  },
];

export default navConfig;
