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
  {
    title: 'Flower',
    icon: icon('ic_flower'),
    children: [
      {
        title: "Flower Heads",
        path: '/dashboard/flowers/flower-heads',
        icon: icon('ic_flower'),
      },
      {
        title: "Flower Garlands",
        path: '/dashboard/flowers/flower-garlands',
        icon: icon('ic_flower'),
      },
      {
        title: "Flower Strings",
        path: '/dashboard/flowers/flower-strings',
        icon: icon('ic_flower'),
      },
      {
        title: "Flower Petals",
        path: '/dashboard/flowers/flower-petals',
        icon: icon('ic_flower'),
      },
    ]
  },
  {
    title: 'Pooja Products',
    icon: icon('ic_pooja'),
    children: [
      {
        title: "Special Pooja Kit",
        path: '/dashboard/pooja-products/special-pooja-kit',
        icon: icon('ic_pooja'),
      },
      {
        title: "Brass Pooja Product",
        path: '/dashboard/pooja-products/brass-pooja-products',
        icon: icon('ic_pooja'),
      },
      {
        title: "Spiritual and Religious",
        path: '/dashboard/pooja-products/spiritual-and-religious',
        icon: icon('ic_pooja'),
      },
      {
        title: "Medicinal and Herbal",
        path: '/dashboard/pooja-products/medicinal-and-herbal',
        icon: icon('ic_pooja'),
      },
      {
        title: "Agricultural and Natural",
        path: '/dashboard/pooja-products/agriculture-and-natural',
        icon: icon('ic_pooja'),
      },
    ]
  }
];

export default navConfig;
