const byteValueNumberFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
  style: 'unit',
  unit: 'byte',
  unitDisplay: 'narrow',
});

console.log(byteValueNumberFormatter.format(10));

console.log(byteValueNumberFormatter.format(200000));

console.log(byteValueNumberFormatter.format(50000000));
