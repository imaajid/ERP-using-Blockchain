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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.acme.fypehr.Appoint} sampleTransaction
 * @transaction
 */

    function appointment(trade) {
        trade.appointment.owner = trade.doctor;
        var result = getAssetRegistry('org.acme.fypehr.Appointment')
        .then(function (assetRegistry) {
          return assetRegistry.update(trade.appointment);
        });

    }

/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.acme.fypehr.Prescribe} sampleTransaction
 * @transaction
 */

function prescribe(trade) {
    trade.prescription.owner = trade.patient;
    var result = getAssetRegistry('org.acme.fypehr.Prescription')
    .then(function (assetRegistry) {
      return assetRegistry.update(trade.prescription);
    });

}

/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.acme.fypehr.Sugest} sampleTransaction
 * @transaction
 */

function sugest(trade) {
    trade.tests.owner = trade.lab;
    var result = getAssetRegistry('org.acme.fypehr.Tests')
    .then(function (assetRegistry) {
      return assetRegistry.update(trade.tests);
    });

}
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.acme.fypehr.Record} sampleTransaction
 * @transaction
 */

function record(trade) {
    trade.records.owner = trade.patient;
    var result = getAssetRegistry('org.acme.fypehr.Records')
    .then(function (assetRegistry) {
      return assetRegistry.update(trade.records);
    });

}


