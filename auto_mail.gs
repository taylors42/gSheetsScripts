//  Scripts that select a single sheet, convert to a PDF and send by email

function getPlan() {

  const app = SpreadsheetApp.getActiveSpreadsheet();
  return app;

} function convertPDF() {

let drive = DriveApp;
let folder = drive.getFolderById(folderid); // Type the ID of the google drive folder
let pdf = drive.getFileById(getPlan()
          .getId())
            .getBlob()
             .getAs("application/pdf")
              .setName("plan0");
  
  getPlan().getSheetByName('plan1').hideSheet();

  while (folder.getFiles().hasNext()) {
    const file = folder.getFiles().next();
    Logger.log('Moving file to trash: ', file);
    file.setTrashed(true); }

let newFile = folder.createFile(pdf).getId();
  
getPlan().getSheetByName('plan1').showSheet();

}
