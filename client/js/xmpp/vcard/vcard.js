import { Strophe } from 'strophe.js';

class VCard {
  constructor() {
    this.firstName;
    this.lastName;
    this.vcard; 
    this.userFields = Strophe.xmlElement('N');
    this.customFields = {};
  }

  setFirstName(firstName) {
    this.firstName = Strophe.xmlElement('GIVEN', firstName);
    this.userFields.appendChild(this.firstName);
  }

  setLastName(lastName) {
    this.lastName = Strophe.xmlElement('FAMILY', lastName);
    this.userFields.appendChild(this.lastName);
  }

  setField(field, value) {
    const customField = Strophe.xmlElement(field, value);
    this.customFields[field] = customField;
  }

  toXML() {
    this.vcard = Strophe.xmlElement('vCard', [['xmlns', 'vcard-temp']]);
    this.vcard.appendChild(this.userFields);
    Object
      .keys(this.customFields)
      .forEach(key => {
        this.vcard.appendChild(this.customFields[key]);
      });
    return this.vcard;
  }
}

module.exports = VCard;