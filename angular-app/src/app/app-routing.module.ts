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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AppointmentComponent } from './Appointment/Appointment.component';
import { PrescriptionComponent } from './Prescription/Prescription.component';
import { TestsComponent } from './Tests/Tests.component';
import { RecordsComponent } from './Records/Records.component';

import { PatientComponent } from './Patient/Patient.component';
import { DoctorComponent } from './Doctor/Doctor.component';
import { LabComponent } from './Lab/Lab.component';

import { AppointComponent } from './Appoint/Appoint.component';
import { PrescribeComponent } from './Prescribe/Prescribe.component';
import { SugestComponent } from './Sugest/Sugest.component';
import { RecordComponent } from './Record/Record.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Appointment', component: AppointmentComponent },
  { path: 'Prescription', component: PrescriptionComponent },
  { path: 'Tests', component: TestsComponent },
  { path: 'Records', component: RecordsComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'Doctor', component: DoctorComponent },
  { path: 'Lab', component: LabComponent },
  { path: 'Appoint', component: AppointComponent },
  { path: 'Prescribe', component: PrescribeComponent },
  { path: 'Sugest', component: SugestComponent },
  { path: 'Record', component: RecordComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
