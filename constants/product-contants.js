const PRODUCTS = {
  chalkboards: {
    stains: [
      {
        value: 'EBONY',
        label: 'Ebony',
      },
      {
        value: 'GRAY',
        label: 'Gray',
      },
      {
        value: 'LIGHT_BLUE',
        label: 'Light Blue',
      },
      {
        value: 'DARK_WALNUT',
        label: 'Dark Walnut',
      },
      {
        value: 'BARN_RED',
        label: 'Barn Red',
      },
      {
        value: 'DARK_RED_MAHOGANY',
        label: 'Dark Red Mahogany',
      },
      {
        value: 'RED_MAHOGANY',
        label: 'Red Mahogany',
      },
      {
        value: 'GUNSTOCK',
        label: 'Gun Stock',
      },
      {
        value: 'SSB_GUNSTOCK',
        label: 'Shou Sugi Ban Gunstock',
      },
      {
        value: 'SSB_CHERRY',
        label: 'Shou Sugi Ban Gray',
      },
      {
        value: 'SSB_GRAY',
        label: 'Shou Sugi Ban Gray',
      },
      {
        value: 'DISTRESSED_WHITE',
        label: 'Distressed White',
      },
    ],
  },
  types: [
    {
      value: 'CHALKBOARD',
      label: 'Chalkboard',
    },
    {
      value: 'SCONCE',
      label: 'Sconce',
    },
    {
      value: 'OTHER',
      label: 'Other',
    },
  ],
  includeShippingInPrice: [
    {
      value: 1,
      label: 'Yes',
    },
    {
      value: 0,
      label: 'No',
    },
  ],
  quantity: [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
  ],
};

PRODUCTS.getLabelForValue = (values, value) => {
  const foundValueObj = values.find((val) => {
    return val.value === value;
  });

  return foundValueObj ? foundValueObj.label : 'UNKNOWN';
};

export default PRODUCTS;
