import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { RegisterService } from 'src/app/services/register.service';
import { VariableService } from 'src/app/services/variable.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RegisterUser } from 'src/app/models/RegisterUserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  jwtToken: string;
  address: Address;
  data: any;
  postData: RegisterUser;
  filteredDistricts: string[] = [];
  filteredNeighbourhood: string[] = [];
  formUser: FormGroup;
  selectedCountry: any;
  emailError: string[] = [];
  nameError: string[] = [];
  usernameError: string[] = [];
  surnameError: string[] = [];
  passwordError: string[] = [];
  phoneNumberError: string[] = [];
  addressError: string[] = [];
  cityError: string[] = [];
  districtError: string[] = [];
  neighbourhoodError: string[] = [];
  date: RegisterUser;
  validationErrors: { [key: string]: string } = {};
  countryCodes: any[] = [
    { code: '+90', country: 'Türkiye' },
    { code: '+1', country: 'ABD' },
    { code: '+44', country: 'Birleşik Krallık' },
    { code: '+49', country: 'Almanya' },
  ];

  constructor(private registerService: RegisterService, private variableService: VariableService, private formBuilder: FormBuilder) {
    this.formUser = new FormGroup({
      Username: new FormControl(''),
      Name: new FormControl(''),
      Surname: new FormControl(''),
      Email: new FormControl(''),
      PasswordHash: new FormControl(''),
      PhoneNumber: new FormControl(""),
      AddressText: new FormControl(""),
      City: new FormControl(""),
      District: new FormControl(""),
      Neighbourhood: new FormControl("")
    });

    this.formUser.valueChanges.subscribe(value => {
      this.user.UserName = value.Username;
      this.user.Name = value.Name;
      this.user.Email = value.Email;
      this.user.Surname = value.Surname;
      this.user.PhoneNumber = value.PhoneNumber;
      this.address.AddressText = value.AddressText;
      this.address.City = value.City;
      this.address.District = value.District;
      this.address.Neighbourhood = value.Neighbourhood;
      this.user.PasswordHash = value.PasswordHash;
      if (this.formUser.get('Username').value) {
        this.usernameError = [];
      }
      if (this.formUser.get('PasswordHash').value) {
        this.passwordError = [];
      }
      if (this.formUser.get('Name').value) {
        this.nameError = [];
      }
      if (this.formUser.get('Email').value) {
        this.emailError = [];
      }
      if (this.formUser.get('Surname').value) {
        this.surnameError = [];
      }
      if (this.formUser.get('PhoneNumber').value) {
        this.phoneNumberError = [];
      }
      if (this.formUser.get('AddressText').value) {
        this.addressError = [];
      }
      if (this.formUser.get('City').value) {
        this.cityError = [];
      }
      if (this.formUser.get('District').value) {
        this.districtError = [];
      }
      if (this.formUser.get('Neighbourhood').value) {
        this.neighbourhoodError = [];
      }
    });
  }

  async ngOnInit() {
    this.user = new User();
    this.address = new Address();
    this.postData = new RegisterUser();
    this.data = await lastValueFrom(this.variableService.getData());
    this.data = this.data.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
    this.selectedCountry = this.countryCodes[0];
  }

  onCountryChange(): void {
    if (this.selectedCountry && this.user) {
      this.user.PhoneNumber = this.selectedCountry.code + (this.user.PhoneNumber ? this.user.PhoneNumber.replace(/^\+\d+/, '') : '');
    }
  }

  async addUser(): Promise<string> {
    this.emailError = [];
    this.nameError = [];
    this.usernameError = [];
    this.surnameError = [];
    this.passwordError = [];
    this.phoneNumberError = [];
    this.addressError = [];
    this.cityError = [];
    this.districtError = [];
    this.neighbourhoodError = [];
    this.validationErrors = {};
    return new Promise((resolve) => {
      if (this.formUser.valid) {
        const formValues = this.formUser.value;
        this.user.UserName = formValues.Username;
        this.user.Name = formValues.Name;
        this.user.Email = formValues.Email;
        this.user.Surname = formValues.Surname;
        this.user.PhoneNumber = formValues.PhoneNumber;
        this.address.AddressText = formValues.AddressText;
        this.user.PasswordHash = formValues.PasswordHash;
        this.postData.user = this.user;
        this.postData.address = this.address;
      }
      this.addUserWithValidation(this.postData);
    });
  };

  async addUserWithValidation(userData: any): Promise<void> {
    const response = await lastValueFrom(this.registerService.registerUser(userData));

    if (response.success || response.token) {
      this.jwtToken = response.token;
      sessionStorage.setItem("token", this.jwtToken);
    } else {
      this.validationErrors = response.errors;
      this.classifyValidationMessage();
    }
  }

  classifyValidationMessage() {
    Object.keys(this.validationErrors).forEach(key => {
      if (key.startsWith("Email")) {
        this.emailError.push(this.validationErrors[key]);
      } else if (key.startsWith("Name")) {
        this.nameError.push(this.validationErrors[key]);
      } else if (key.startsWith("Surname")) {
        this.surnameError.push(this.validationErrors[key]);
      } else if (key.startsWith("Address")) {
        this.addressError.push(this.validationErrors[key])
      } else if (key.startsWith("City")) {
        this.cityError.push(this.validationErrors[key])
      } else if (key.startsWith("District")) {
        this.districtError.push(this.validationErrors[key])
      } else if (key.startsWith("Neighbourhood")) {
        this.neighbourhoodError.push(this.validationErrors[key]);
      } else if (key.startsWith("Password")) {
        this.passwordError.push(this.validationErrors[key]);
      } else if (key.startsWith("Username")) {
        this.usernameError.push(this.validationErrors[key]);
      } else if (key.startsWith("Phone")) {
        this.phoneNumberError.push(this.validationErrors[key]);
      }
    });
  }

  onCityChange() {
    this.address.City = this.formUser.get('City')?.value;
    this.filteredDistricts = this.filterJsonByDistrict(this.address.City);
  }

  filterJsonByDistrict(cityName: string): string[] {
    const city = this.data.find((city: { name: string; }) => city.name === cityName);
    if (!city || !city.towns) return [];
    return city.towns
      .filter((town: { name: string; }) => town.name !== "Köyler")
      .map((town: { name: any; }) => town.name);
  }

  onDistrictChange() {
    this.address.District = this.formUser.get('District')?.value;
    if (this.formUser.get('District').value) {
      this.districtError = [];
    }
    this.filteredNeighbourhood = this.filterJsonByNeighbourhood(this.address.City, this.address.District);
  }

  filterJsonByNeighbourhood(cityName: string, districtName: string): string[] {
    const city = this.data.find((city: { name: string; }) => city.name === cityName);
    if (!city || !city.towns) return [];
    const district = city.towns.find((town: { name: string; }) => town.name === districtName);
    if (!district || !district.districts) return [];
    return district.districts
      .filter((d: { name: string; }) => d.name !== "Köyler")
      .flatMap((d: { quarters: any[]; }) => d.quarters ? d.quarters.map((q: { name: any; }) => q.name) : []);
  }

}
