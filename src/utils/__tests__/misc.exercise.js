const {formatDate} = require('utils/misc')

it('formatDate formats the date to the format `mmm yy`', () => {
  expect(formatDate(1622536237596)).toBe('Jun 21')
})
