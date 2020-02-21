// Copyright 2016 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Storage} = require('@google-cloud/storage');
var path = require('path');
// Instantiate a storage client
const storage = new Storage({
  keyFileName: './key.json'
});

const bucketName = 'hello-boonj';
const srcFilename = 'data.json';
const destFilename = 'data.json';



const express = require('express');
const app = express();
const port = 3000;

// Remember to add this for rendering CSS
app.use(express.static(__dirname));


app.get('/downloads', async (req, res) => {

  (async() => {

    try {
      console.log('starting download')
      await downloadFile()
      console.log('download complete')

    }
    catch(error) {

      console.log(error)
    }

  })()

  // res.render('index.html')
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


async function downloadFile() {
  const options = {
    // The path to which the file should be downloaded, e.g. "./file.txt"
    destination: destFilename
  };


  await storage
    .bucket(bucketName)
    .file(srcFilename)
    .download(options);

  console.log(
    `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
  );
}
