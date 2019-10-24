import { FILEDS } from '../../../../utils/string';

/*********************************************************
 *
 * @function validate
 * @param {*} values
 * @abstract method that handle the validation of the form
 *            before submitting it
 *
 **********************************************************/
const validate = (values, props) => {
  const errors = {};
  const { PHONE, EMAIL, NAME } = FILEDS;
  const requiredFields = [PHONE, EMAIL, NAME, 'credentials'];
  const { nameList } = props;

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Obligatoire';
    }
  });

  // Validate name only if new contact
  if (props.formName === 'contact') {
    if (
      values.name &&
      nameList.filter(val => {
        return values.name.toLowerCase() === val.name.toLowerCase();
      }).length > 0
    ) {
      errors.name = 'Le contact existe déjà';
    }
  }

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Mauvais format';
  }

  if (
    //https://mathiasbynens.be/demo/url-regex
    //https://gist.github.com/dperini/729294
    values.url &&
    // eslint-disable-next-line
    !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/g.test(
      values.url
    )
  ) {
    errors.url = 'Mauvais format';
  }

  if (
    //from https://www.regextester.com/1978
    values.phone &&
    // eslint-disable-next-line
    !/((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/i.test(
      values.phone
    )
  ) {
    errors.phone = 'Mauvais format';
  }

  return errors;
};

export default validate;
