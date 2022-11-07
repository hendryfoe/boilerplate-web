import { MessageConstant } from 'constants/message.constant';

/* eslint-disable no-template-curly-in-string */
export const validateMessages = (translate: (key: string, options?: any) => any) => ({
  required: translate(MessageConstant.REQUIRED, { label: '${label}' }),
  types: {
    email: translate(MessageConstant.EMAIL, { label: '${label}' }),
    number: translate(MessageConstant.NUMBER, { label: '${label}' })
  },
  string: {
    max: translate(MessageConstant.MAX_LENGTH, { label: '${label}', max: '${max}' })
  },
  number: {
    range: translate(MessageConstant.RANGE_NUMBER, { label: '${label}', min: '${min}', max: '${max}' })
  }
});
