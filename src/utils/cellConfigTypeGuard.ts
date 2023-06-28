import { FormFieldTypes, SelectFormType } from '../types/general/data/data-table/formField-types';

function assertIsSelectMultiFormFieldType(
  config: FormFieldTypes
): asserts config is SelectFormType & { multi: true } {
  if (!config.multi && config.type !== 'select') {
  }
}
