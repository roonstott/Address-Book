// business logic

function AddressBook() {
    this.contacts = {};
    this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
}

AddressBook.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
    if (this.contacts[id] !== undefined) {
        return this.contacts[id];
    }
    return false;
};

AddressBook.prototype.deleteContact = function(id) {
    if (this.contacts[id] === undefined) {
        return false;
    }
    delete this.contacts[id];
    return true;
};

function Contact(firstName, lastName, phoneNumber, emailAddress,) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.emailAddress = emailAddress;
    this.addresses = {};
    this.currentId = 0
}

Contact.prototype.addAddress = function (address) {
    address.id = this.assignId();
    this.addresses[address.id] = address;
}

Contact.prototype.assignId = function () {
    this.currentId +=1;
    return this.currentId;
}

function Address(type, value) {
    this.addresssType = type;
    this.address = value;
}

Contact.prototype.fullName = function () {
    return this.firstName + " " + this.lastName;
};

//test code

let myAddressBook = new AddressBook();
let mom = new Contact("Betsy", "Priddy", "503-419-8958", "betsy@gmail.com", "2534 NW Northrup", "123 N Commercial Ave");
myAddressBook.addContact(mom);
console.log(myAddressBook.mom.homeAddress);

// UI 

let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
    let contactsDiv = document.querySelector("div#contacts");
    contactsDiv.innerText =  null;
    const ul = document.createElement("ul");
    Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
      const contact = addressBookToDisplay.findContact(key);
      const li = document.createElement("li");
      li.append(contact.fullName());
      li.setAttribute("id", contact.id);
      ul.append(li);
    });
    contactsDiv.append(ul);
  }
  

  function handleFormSubmission(event) {
    event.preventDefault();
    const inputtedFirstName = document.querySelector("input#new-first-name").value;
    const inputtedLastName = document.querySelector("input#new-last-name").value;
    const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
    const inputtedEmailAddress = document.querySelector("input#new-email-address").value;
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress);
    addressBook.addContact(newContact);
    listContacts(addressBook);
    document.querySelector("input#new-first-name").value = null;
    document.querySelector("input#new-last-name").value = null;
    document.querySelector("input#new-phone-number").value = null;
    document.querySelector("input#new-email-address").value = null;
    
  }

function displayContactDetails(event) {
    const contact = addressBook.findContact(event.target.id);
    document.querySelector(".first-name").innerText = contact.firstName;
    document.querySelector(".last-name").innerText = contact.lastName;
    document.querySelector(".phone-number").innerText = contact.phoneNumber;
    document.querySelector(".email-address").innerText = contact.emailAddress;
    document.querySelector("div#contact-details").removeAttribute("class");
    document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
  }

  function handleDelete(event) {
    addressBook.deleteContact(event.target.id);
    document.querySelector("button.delete").removeAttribute("id");
    document.querySelector("div#contact-details").setAttribute("class", "hidden");
    listContacts(addressBook);
  }

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails); 
});


