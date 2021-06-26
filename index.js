require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const app = express();

//fetches data from the spreadsheet
app.get('/', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const client = await auth.getClient();
  const googleSheet = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = process.env.DATABASE_ID;

  // const getMetaData = await googleSheet.spreadsheets.get({
  //   auth,
  //   spreadsheetId,
  // });
  // use this method to get values like sheetID.

  const getSheetData = await googleSheet.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'Sheet1!A2:B',
  });

  res.send(getSheetData.data.values);
});

//posts data to cell
app.post('/post', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const client = await auth.getClient();
  const googleSheet = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = process.env.DATABASE_ID;

  await googleSheet.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: 'Sheet1!A2:B',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [['Kayne', 'Create a makeup app']],
    },
  });

  res.send('Submitted Successfully');
});

// deletes cell data
app.post('/delete', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const client = await auth.getClient();
  const googleSheet = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = process.env.DATABASE_ID;

  await googleSheet.spreadsheets.values.clear({
    auth,
    spreadsheetId,
    range: 'Sheet1!A5:B5',
  });

  res.send('Deleted Successfully');
});

// update cell data
app.put('/update', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const client = await auth.getClient();
  const googleSheet = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = process.env.DATABASE_ID;

  await googleSheet.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: 'Sheet1!A2:B2',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [['Elon', 'Make a spaceship']],
    },
  });

  res.send('Updated Successfully');
});

app.listen(3000 || process.env.PORT, () => {
  console.log('Up and running!!');
});
