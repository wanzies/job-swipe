// Paste into Extensions > Apps Script of your Google Sheet, then Deploy > New deployment > Web app (Execute as: Me, Access: Anyone). Copy the /exec link into the dashboard's SHEET LINK button.
function doPost(e){const ss=SpreadsheetApp.getActive();JSON.parse(e.postData.contents).forEach(r=>{
 const name=r.type.startsWith('quran')?'Quran':r.type==='rest'?'Rest':'Log';let sh=ss.getSheetByName(name)||ss.insertSheet(name);
 if(sh.getLastRow()==0)sh.appendRow(name=='Quran'?['Logged at','Day','Event','Page','Up to / Next']:name=='Rest'?['Logged at','Day','Score (1-5)']:['Logged at','Type']);
 if(name=='Quran')sh.appendRow([r.ts,r.day,r.type,r.page,r.upto||r.next]);else if(name=='Rest')sh.appendRow([r.ts,r.day,r.score]);else sh.appendRow([r.ts,r.type]);});
 return ContentService.createTextOutput('ok')}
