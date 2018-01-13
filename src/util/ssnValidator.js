// Patterns for the different SSN sections.
const patternSuite = {
  'social-security-number': {
    pattern: /^(?!666|000|9\d{2})\d{3}[- ]{0,1}(?!00)\d{2}[- ]{0,1}(?!0{4})\d{4}$/,
    blacklist: []
  },
  'area-number': {
    pattern: /^(?!666|000|9\d{2})\d{3}$/,
    blacklist: []
  },
  'group-number': {
    pattern: /^(?!00)\d{2}$/,
    blacklist: []
  },
  'sequence-number': {
    pattern: /^(?!0{4})\d{4}$/,
    blacklist: []
  }
}

export function validateFor (validator, value) {
  if (!patternSuite[validator].pattern.test(value)) {
    return false
  }

  return !(patternSuite[validator].blacklist.indexOf(value.replace(/\D/g, '')) >= 0)
}
