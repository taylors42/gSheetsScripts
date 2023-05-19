function getPlan(){

  const app = SpreadsheetApp.getActive();
  return app; 

} function eMail(mail, title, html, doc, text){
  
  MailApp.sendEmail( 
  { to: mail,
    subject: title,
    htmlBody: html,
    attachments: [doc],
    name: text, }
  )
} function convXlsx() {
  
  let drive = DriveApp;
   let destination = drive.getFolderById( your folder id );
    let files = destination.getFiles();

  while(files.hasNext()){
    let file = files.next(); // delete de older files
      file.setTrashed(true);
  }

  let sheet = SpreadsheetApp.create( select a good name ); 
    let y = getPlan().getSheetByName( select other name );
        y.copyTo(sheet).setName( set a name );
           sheet.setActiveSheet(sheet.getSheetByName('Sheet1'), true);
             sheet.deleteActiveSheet();
  
  // delete the "Sheet1" is necessary to convert a single sheet to xlsx without a blank page
  
  let sheetId = sheet.getId();
  let url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + sheetId+ "&exportFormat=xlsx";  
  
  let params = {
    method      : "get",
    headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
    muteHttpExceptions: true };

  let blob = UrlFetchApp.fetch(url, params).getBlob();
      blob.setName("test - " + Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy") + ".xlsx");


  mail(test@test, test, test, test, test);
  
  drive.getFileById(sheetId).setTrashed(true);

} 
