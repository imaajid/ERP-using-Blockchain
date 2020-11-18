/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecordsService } from './Records.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-records',
  templateUrl: './Records.component.html',
  styleUrls: ['./Records.component.css'],
  providers: [RecordsService]
})
export class RecordsComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  recordId = new FormControl('', Validators.required);
  testId = new FormControl('', Validators.required);
  test_name = new FormControl('', Validators.required);
  test_req_date = new FormControl('', Validators.required);
  upload_test_report = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceRecords: RecordsService, fb: FormBuilder) {
    this.myForm = fb.group({
      recordId: this.recordId,
      testId: this.testId,
      test_name: this.test_name,
      test_req_date: this.test_req_date,
      upload_test_report: this.upload_test_report,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceRecords.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.fypehr.Records',
      'recordId': this.recordId.value,
      'testId': this.testId.value,
      'test_name': this.test_name.value,
      'test_req_date': this.test_req_date.value,
      'upload_test_report': this.upload_test_report.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'recordId': null,
      'testId': null,
      'test_name': null,
      'test_req_date': null,
      'upload_test_report': null,
      'owner': null
    });

    return this.serviceRecords.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'recordId': null,
        'testId': null,
        'test_name': null,
        'test_req_date': null,
        'upload_test_report': null,
        'owner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.fypehr.Records',
      'testId': this.testId.value,
      'test_name': this.test_name.value,
      'test_req_date': this.test_req_date.value,
      'upload_test_report': this.upload_test_report.value,
      'owner': this.owner.value
    };

    return this.serviceRecords.updateAsset(form.get('recordId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceRecords.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceRecords.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'recordId': null,
        'testId': null,
        'test_name': null,
        'test_req_date': null,
        'upload_test_report': null,
        'owner': null
      };

      if (result.recordId) {
        formObject.recordId = result.recordId;
      } else {
        formObject.recordId = null;
      }

      if (result.testId) {
        formObject.testId = result.testId;
      } else {
        formObject.testId = null;
      }

      if (result.test_name) {
        formObject.test_name = result.test_name;
      } else {
        formObject.test_name = null;
      }

      if (result.test_req_date) {
        formObject.test_req_date = result.test_req_date;
      } else {
        formObject.test_req_date = null;
      }

      if (result.upload_test_report) {
        formObject.upload_test_report = result.upload_test_report;
      } else {
        formObject.upload_test_report = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'recordId': null,
      'testId': null,
      'test_name': null,
      'test_req_date': null,
      'upload_test_report': null,
      'owner': null
      });
  }

}
