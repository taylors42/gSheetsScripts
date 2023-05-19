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
}





function convXlsx() {
  
  let drive = DriveApp;
   let destination = drive.getFolderById( your folder id );
    let files = destination.getFiles();

  while(files.hasNext()){
    let file = files.next();
      file.setTrashed(true);
  }

  let x = SpreadsheetApp.create("temp_plan"); 
  let y = getPlan().getSheetByName('plan0');
        y.copyTo(x).setName('plan0');
           x.setActiveSheet(x.getSheetByName('Sheet1'), true);
             x.deleteActiveSheet();
  let sheetId = x.getId();

  let url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + sheetId+ "&exportFormat=xlsx";  
  
  let params = {
    method      : "get",
    headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
    muteHttpExceptions: true };

  let blob = UrlFetchApp.fetch(url, params).getBlob();
      blob.setName("teste - " + Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy") + ".xlsx");


  mail('otaylorferreira78@gmail.com','teste', null, blob, 'teste');

  drive.getFileById(sheetId).setTrashed(true);

} 
