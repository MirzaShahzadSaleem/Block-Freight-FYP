export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'DRIVER', type: 'label' },
  {
    name: 'DRIVER',
    icon: 'security',
    badge: { value:  '3+', color: 'secondary'},
    children: [
      { name: 'Register Driver', iconText: 'F', path: '/material/form' },
      // { name: 'Assign Driver', iconText: 'SU', path: '/session/signup' },
      { name: 'Assign Trip to Driver', iconText: 'FP', path: '/material/AssignForm' },
      { name: 'View All Drivers', iconText: 'FP', path: '/material/ViewDriver' },
      // { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
  { label: 'TRIP', type: 'label' },
  {
    name: 'TRIP',
    icon: 'favorite',
    badge: { value: '6+', color: 'secondary' },
    children: [
      { name: 'Create Trip', path: '/material/CreateTrip', iconText: 'A' },
      // { name: 'View Trip', path: '/material/buttons', iconText: 'B' },
      { name: 'View All Trips', path: '/material/ViewAllTrips', iconText: 'C' },
      // { name: 'View Single Trip History', path: '/material/dialog', iconText: 'D' },
      // { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      // { name: 'Form', path: '/material/form', iconText: 'F' },
    ],
  },
  { label: 'TRIP END', type: 'label' },
  { name: 'END TRIP', path: '/material/EndTrip', icon: 'launch' },,
  {
    name: 'Charts',
    icon: 'trending_up',
    children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  // },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' },
  //   ],
  // },
];
