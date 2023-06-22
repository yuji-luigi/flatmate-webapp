export const exampleFormFields /* : (typelerProps & { col?: ColProps })[] */ = [
  {
    type: 'text',
    name: 'username',
    label: 'Username',
    withAsterisk: true,
  },
  {
    type: 'text',
    // type: 'email',
    name: 'email',
    label: 'Email',
    withAsterisk: true,
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    withAsterisk: true,
  },
  {
    type: 'password',
    name: 'confirmPassword',
    label: 'Confirm Password',
    withAsterisk: true,
  },
  {
    type: 'checkbox-group',
    name: 'drinks',
    label: 'Drinks',
    options: [
      { label: 'Coffee', value: 'coffee' },
      { label: 'Tea', value: 'tea' },
      { label: 'Wine', value: 'wine' },
    ],
    withAsterisk: true,
  },
  {
    type: 'select',
    name: 'position',
    label: 'Position',
    entity: 'users',
    options: [
      { label: 'Backend', value: 'backend' },
      { label: 'Frontend', value: 'frontend' },
      { label: 'Fullstack', value: 'fullstack' },
    ],
    withAsterisk: true,
    placeholder: 'Pick Position',
  },
  {
    type: 'radio-group',
    name: 'browser',
    label: 'Browser',
    options: [
      { label: 'Firefox', value: 'firefox' },
      { label: 'Edge', value: 'edge' },
      { label: 'Chrome', value: 'chrome' },
      { label: 'Opera', value: 'opera' },
      { label: 'Safari', value: 'safari' },
    ],
    withAsterisk: true,
  },
  {
    type: 'date',
    name: 'date',
    label: 'Date',
    placeholder: 'Pick Date',
    withAsterisk: true,
    allowDeselect: true,
  },
  {
    type: 'number',
    name: 'age',
    label: 'Age',
    withAsterisk: true,
    min: 1,
  },
  {
    type: 'select',
    multi: true,
    name: 'programmingLanguage',
    label: 'Programming Language',
    options: [
      {
        label: 'Javascript',
        value: 'javascript',
      },
      {
        label: 'Typescript',
        value: 'typescript',
      },
      {
        label: 'Go',
        value: 'go',
      },
      {
        label: 'Python',
        value: 'python',
      },
      {
        label: 'Rust',
        value: 'rust',
      },
    ],
    clearable: true,
    searchable: true,
    creatable: true,
    withAsterisk: true,
  },
  {
    type: 'image',
    name: 'resume',
    label: 'Resume',
    multiple: true,
    clearable: true,
    withAsterisk: true,
    accept: 'application/pdf',
    col: {
      md: 12,
      lg: 12,
    },
  },
  {
    type: 'text-area',
    name: 'comments',
    label: 'Comments',
    withAsterisk: true,
    col: {
      md: 12,
      lg: 12,
    },
  },
  {
    type: 'switch-group',
    name: 'notification',
    label: 'Settings',
    options: [
      {
        label: 'I agree to receive notifications',
        value: 'agreed',
        color: 'teal',
        // thumbIcon:
        //   methods.watch('notification').length > 0 ? (
        //     <IconCheck size={12} color={theme.colors.teal[theme.fn.primaryShade()]} stroke={3} />
        //   ) : (
        //     <IconX size={12} color={theme.colors.red[theme.fn.primaryShade()]} stroke={3} />
        //   ),
      },
    ],
    col: {
      md: 12,
      lg: 12,
    },
  },
  {
    type: 'pin-input',
    label: 'Verification Code',
    name: 'code',
    oneTimeCode: true,
    placeholder: '',
    withAsterisk: true,
    mask: true,
    length: 6,
    size: 'md',
    col: {
      md: 12,
      lg: 12,
      mt: 10,
    },
  },
];
