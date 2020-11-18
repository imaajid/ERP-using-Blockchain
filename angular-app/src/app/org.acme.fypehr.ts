import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.fypehr{
   export class Patient extends Participant {
      patientId: string;
      name: string;
      diseas: string;
      address: string;
      contact_no: string;
      email: string;
      password: string;
   }
   export class Doctor extends Participant {
      doctorId: string;
      name: string;
      type: string;
      address: string;
      contact_no: string;
      email: string;
      password: string;
   }
   export class Lab extends Participant {
      labId: string;
      name: string;
      type: string;
      address: string;
      contact_no: string;
      email: string;
      password: string;
   }
   export class Appointment extends Asset {
      appointmentId: string;
      date: Date;
      description: string;
      owner: Patient;
   }
   export class Prescription extends Asset {
      prescriptionId: string;
      appointmentId: string;
      date: Date;
      description: string;
      suggestion: string;
      owner: Doctor;
   }
   export class Tests extends Asset {
      testId: string;
      prescriptionId: string;
      tests_suggest_name: string;
      owner: Doctor;
   }
   export class Records extends Asset {
      recordId: string;
      testId: string;
      test_name: string;
      test_req_date: Date;
      upload_test_report: string;
      owner: Lab;
   }
   export class Appoint extends Transaction {
      appointment: Appointment;
      patient: Patient;
      doctor: Doctor;
   }
   export class Prescribe extends Transaction {
      prescription: Prescription;
      doctor: Doctor;
      patient: Patient;
   }
   export class Sugest extends Transaction {
      tests: Tests;
      doctor: Doctor;
      lab: Lab;
   }
   export class Record extends Transaction {
      records: Records;
      patient: Patient;
      lab: Lab;
   }
// }
