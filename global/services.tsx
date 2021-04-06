import * as SQLite from 'expo-sqlite';
import { SQLStatementCallback, SQLTransaction, WebSQLDatabase } from 'expo-sqlite';
const db: WebSQLDatabase = SQLite.openDatabase('db.autoskola') // returns Database object

const apiURL = "http://192.168.10.107:8090/";
  //#region First Aid
  interface FirstAidAnswerModel {
      id: number,
      answer: string,
      correctness: boolean
  }
  
  interface FirstAidQuestionModel {
      id: number,
      question: string,
      sectionGroup: string,
      answers: Array<FirstAidAnswerModel>,
      count: number
  }

  function insertFirstAidAnswers(sqlTransaction:SQLTransaction, questionId: Number, answers: FirstAidAnswerModel[]) {
      console.log("calling insertFirstAidAnswers")

            sqlTransaction.executeSql(
                  'CREATE TABLE IF NOT EXISTS FirstAidAnswer (id INTEGER PRIMARY KEY AUTOINCREMENT , answer TEXT, correctness BOOLEAN, join_to_question INTEGER REFERENCES FirstAidQuestion(id))',
                  [],
                  function (tx, res) {
                        try {

                        answers.forEach(data=> {
                              // console.log("inserting answer");
      
                              tx.executeSql('INSERT INTO FirstAidAnswer (answer, correctness, join_to_question) values ( ?, ?, ?)',
                              [data.answer, data.correctness, questionId],
                              (txObj, resultSet) => {
                                    try {
                                        } catch (error) {
                                          console.error(error);
                                    }
                                    // console.log("insert answer complete")
      
                              },
                              (TX, error)=>{
                                          console.log(error);
                                          return true;
                              } 
                              )
                        })
                        } catch (error) {
                              console.error(error);
                        }
                  },
                  (TX, error)=>{
                        console.log(error);
                        return true;
                  }
              )      
}

function insertFirstAidQuestions(dataArray: FirstAidQuestionModel[], callback: any) {
      console.log("calling insertFirstAidQuestions")
      db.transaction(tx => {
            console.log("start transaction");
            tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS FirstAidQuestion (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, sectionGroup TEXT, count INT)',
                  [],
                  function (tx, res) {

                        try{

                              dataArray.forEach(data=> {
                                    // console.log("inserting question");
      
                                    tx.executeSql('INSERT INTO FirstAidQuestion (question, sectionGroup, count) values ( ?, ?, ?)',
                                    [data.question,data.sectionGroup,data.count],
                                    (txObj, resultSet) => {
      
                                                try {
                                                      console.log("insert question complete")
                                                      insertFirstAidAnswers(txObj, resultSet.insertId, data.answers)
                                                } catch (error) {
                                                console.error(error);
                                                }
      
                                          },
                                          (TX, error)=>{
                                                console.log(error);
                                                return true;
                                          }
                                    ) 
                              })

                        }catch(error) {
                              console.log(error);
                        }
                  },
                  (TX, error)=>{
                        console.log(error);
                        return true;
                  }
              )
          },
          error => {
            console.log("Transaction insertFirstAidQuestions error", error);
            callback(false)
          },
          () => {
            console.log("Transaction insertFirstAidQuestions done");
            callback(true)
          }
          )
}


export const downloadFirstAidQuestions = (section: string, callback: any) => {
      console.log("calling downloadFirstAidQuestions "+section);

      const controller = new AbortController();
      var counter = 0;
      var myVar = setInterval(() => {
            counter++;
            if(counter == 10) {
                  controller.abort()
            }
      }, 1000);



      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");
      
      fetch(apiURL+"firstAid/getAllQuestionsBySection", {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: section,
            signal: controller.signal
          })
        .then(response => response.text()
        )
        .then((result) => {

            try {

                  var res: Array<FirstAidQuestionModel> = JSON.parse(result);
                  console.log("DownloadData completed");
                  insertFirstAidQuestions(res, (confirmed: boolean) => {
                        if(confirmed) {
                              callback(true)
                              clearInterval(myVar);
                              counter = 0;
                        }else {
                              callback(false) 
                              clearInterval(myVar);
                              counter = 0;
                        }
                  });

            } catch (error) {
              console.error(error);
            }
        })
        .catch(error => {
              clearInterval(myVar);
              counter = 0;
              console.log('error', error);
              callback(false);
        });

}

export const getFirstAidQuestionsBySection = (section: string,callback:any) => {

      const firstAidQuestions: FirstAidQuestionModel[] = [];
      console.log("calling getFirstAidQuestionsBySection "+section);

      db.transaction(tx => {
            tx.executeSql('SELECT fQ.id, fQ.question, fQ.sectionGroup, fQ.count, '+
            '\'[\' || GROUP_CONCAT(\'{"answer":\' || \'"\'  || fA.answer || \'",\' || \' "correctness":\' || fA.correctness || \'}\' ) || \']\' as answers '+
            'FROM FirstAidQuestion as fQ INNER JOIN FirstAidAnswer as fA ON fQ.id = fA.join_to_question where fQ.sectionGroup LIKE ? GROUP BY fQ.count',
            [section],
            (tx, results) => {

                  try {

                        for (let i = 0; i < results.rows.length; ++i) {
                              var answers: FirstAidAnswerModel[] = [];
                              var question: FirstAidQuestionModel = {
                                    id:0,
                                    answers: [],
                                    question: "",
                                    sectionGroup: "",
                                    count: 0
                              };
      
                              var answersStr: string = results.rows.item(i).answers;
                              answersStr =answersStr.slice(1,answersStr.length-1);
      
                              var arrayOfStr = answersStr.split("},")
                              arrayOfStr.forEach( data => {
                                    if(data.charAt(data.length-1) !== '}') {
                                          data += '}'
                                    }
                                    var answer: FirstAidAnswerModel = JSON.parse(data);
                                    answers.push(answer);
      
                              })
      
                              question.answers = answers;
                              question.count = results.rows.item(i).count;
                              question.id = results.rows.item(i).id;
                              question.question = results.rows.item(i).question;
                              question.sectionGroup = results.rows.item(i).sectionGroup;
      
                              // console.log(question)
      
                              firstAidQuestions.push(question)
                        }
                        // console.log(section,": ",firstAidQuestions.length)
                        callback(firstAidQuestions)

                  } catch (error) {
                    console.error(error);
                  }

                  },
                  (TX, error)=>{
                        console.log(error);
                        return true;
                  }
             )
          },
          error => {
            console.log("Transaction getFirstAidQuestionsBySection error", error);
          },
          () => {
            console.log("Transaction getFirstAidQuestionsBySection "+section+" done");
          })
}

export const deleteFirstAidQuestionsBySection = (section: string, callback: any) => {

      db.transaction(tx => {
            tx.executeSql('DELETE FROM FirstAidAnswer where FirstAidAnswer.id in (SELECT FirstAidQuestion.id from FirstAidQuestion inner join FirstAidAnswer on FirstAidQuestion.id = FirstAidAnswer.join_to_question where FirstAidQuestion.sectionGroup like ?)',
            [section],
            (tx, results) => {

                  try {

                        console.log('From table FirstAidAnswer deleted all answers from question with section '+section);
                        tx.executeSql('DELETE FROM FirstAidQuestion where FirstAidQuestion.sectionGroup like ?',
                        [section],
                        (tx, results) => {
                              console.log('From table FirstAidQuestion deleted every question with section '+section)
                              callback(true)
                        },
                        (TX, error)=>{
                              console.log(error);
                              return true;
                        }
                        )

                  } catch (error) {
                    console.error(error);
                  }

            },
            (TX, error)=>{
                  console.log(error);
                  return true;
            }
             )
          },
          error => {
            console.log("Transaction deleteFirstAidQuestionsBySection error", error);
            callback(false)
          },
          () => {
            console.log("Transaction deleteFirstAidQuestionsBySection done");
          })
}

//#endregion

//#region Driving Test

interface DrivingTestAnswerModel {
      id: number,
      answer: string,
      correctness: boolean,
      aChar: string,
  }
  
  interface DrivingTestQuestionModel {
      id: number,
      question: string,
      imageURL: string,
      points: number,
      testgroup: string,
      testnumber: number,
      answers: Array<DrivingTestAnswerModel>,
  }

  export const getListOfInsertedQuestions = (callback: any) => {
      var alreadyDown: boolean[] = [];  

      db.transaction(tx => {
            tx.executeSql('SELECT DISTINCT tQ.testnumber '+
            'FROM TestQuestion as tQ',
            [],
            (tx, results) => {
                  console.log("getListOfInsertedQuestions");
                  try {
                        for (let i = 0; i < results.rows.length; i++) {
                              alreadyDown[results.rows.item(i).testnumber] = true;
                        }
                  } catch (error) {
                    console.error(error);
                    callback(alreadyDown);
                  }

                  },
                  (TX, error)=>{
                        console.log(error);
                        return true;
                  }
             )
          },
          error => {
            console.log("Transaction getListOfInsertedQuestions error", error);
            callback(alreadyDown);
          },
          () => {
            console.log("Transaction getListOfInsertedQuestions  done");
            callback(alreadyDown);
          })
  }

  function insertDrivingTestAnswers(sqlTransaction:SQLTransaction, questionId: Number, answers: DrivingTestAnswerModel[]) {
      console.log("calling insertDrivingTestAnswers")

            sqlTransaction.executeSql(
                  'CREATE TABLE IF NOT EXISTS TestAnswer (id INTEGER PRIMARY KEY AUTOINCREMENT, answer TEXT, correctness BOOLEAN, aChar TEXT, join_to_question INTEGER REFERENCES TestQuestion(id))',
                  [],
                  function (tx, res) {
      
                        try {

                              answers.forEach(data=> {
                                    // console.log("inserting answer");
            
                                    tx.executeSql('INSERT INTO TestAnswer (answer, correctness, aChar, join_to_question) values ( ?, ?, ?, ?)',
                                    [data.answer, data.correctness, data.aChar, questionId],
                                    (txObj, resultSet) => {
                                          // console.log("insert answer complete")
            
                                    },(TX, error)=>{
                                                console.log(error);
                                                return true;
                                    } 
                                    )
                              })

                        } catch (error) {
                          console.error(error);
                        }

                  },
                  (TX, error)=>{
                        console.log(error);
                        return true;
                  }
              )      
}

function insertDrivingTestQuestions(dataArray: DrivingTestQuestionModel[], callback: any) {
      console.log("calling insertDrivingTestQuestions")
      db.transaction(tx => {
            tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS TestQuestion (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, imageURL TEXT, points INT, testgroup TEXT, testnumber INT)',
                  [],
                  function (tx, res) {


                        try {

                              dataArray.forEach(data=> {
                                    // console.log("inserting question");
      
                                    tx.executeSql('INSERT INTO TestQuestion (question, imageURL, points, testgroup, testnumber) values ( ?, ?, ?, ?, ?)',
                                    [data.question,data.imageURL,data.points,data.testgroup,data.testnumber],
                                    (txObj, resultSet) => {
                                          // console.log("insert question complete")
                                          insertDrivingTestAnswers(txObj, resultSet.insertId, data.answers)
                                          },
                                          (TX, error)=>{
                                                console.log(error);
                                                return true;
                                          } 
                                    ) 
                              })

                        } catch (error) {
                          console.error(error);
                        }

                  },
                  (TX, error)=>{
                        console.log(error);
                        return true;
                  }
              )
          },
          error => {
            console.log("Transaction insertDrivingTestQuestions error", error);
            callback(false)
          },
          () => {
            console.log("Transaction insertDrivingTestQuestions done");
            callback(true)
          }
          )
}

  export const downloadDrivingTestQuestions = (testnumber: number, callback: any) => {
      console.log("calling downloadDrivingTestQuestions "+testnumber);

      const controller = new AbortController();
      var counter = 0;
      var myVar = setInterval(() => {
            counter++;
            if(counter == 10) {
                  controller.abort()
            }
      }, 1000);



      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");
      
      fetch(apiURL+"questionTest/getAllTestQuestions/"+testnumber, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            signal: controller.signal
          })
        .then(response => response.text()
        )
        .then((result) => {

            try {

                  var res: Array<DrivingTestQuestionModel> = JSON.parse(result);
                  console.log("DownloadData completed");
                  insertDrivingTestQuestions(res, (confirmed: boolean) => {
                        if(confirmed) {
                              callback(true)
                              clearInterval(myVar);
                              counter = 0;
                        }else {
                              callback(false) 
                              clearInterval(myVar);
                              counter = 0;
                        }
                  });

            } catch (error) {
              console.error(error);
            }

        })
        .catch(error => {
              clearInterval(myVar);
              counter = 0;
              console.log('error', error);
              callback(false);
        });

}

export const getDrivingTestQuestionsByNumber = (testnumber: number,callback:any) => {

      const drivingTestQuestions: DrivingTestQuestionModel[] = [];
      console.log("calling getDrivingTestQuestionsByNumber "+testnumber);
      
      db.transaction(tx => {
            tx.executeSql('SELECT tQ.id, tQ.question, tQ.imageURL, tQ.points, tQ.testgroup, tQ.testnumber, '+
            '\'[\' || GROUP_CONCAT(\'{"answer":\' || \'"\'  || tA.answer || \'",\' || \' "correctness":\' || tA.correctness || \'}\' ) || \']\' as answers '+
            'FROM TestQuestion as tQ INNER JOIN TestAnswer as tA ON tQ.id = tA.join_to_question where tQ.testnumber = ? GROUP BY tQ.id',
            [testnumber],
            (tx, results) => {


                  try {

                        for (let i = 0; i < results.rows.length; ++i) {
                              var answers: DrivingTestAnswerModel[] = [];
                              var question: DrivingTestQuestionModel = {
                                    id:0,
                                    answers: [],
                                    question: "",
                                    imageURL: "",
                                    points: 0,
                                    testgroup: "",
                                    testnumber: 0
                              };
      
                              var answersStr: string = results.rows.item(i).answers;
                              answersStr =answersStr.slice(1,answersStr.length-1);
      
                              var arrayOfStr = answersStr.split("},")
                              arrayOfStr.forEach( data => {
                                    if(data.charAt(data.length-1) !== '}') {
                                          data += '}'
                                    }
                                    var answer: DrivingTestAnswerModel = JSON.parse(data);
                                    answers.push(answer);
      
                              })
      
                              question.id = results.rows.item(i).id;
                              question.answers = answers;
                              question.question = results.rows.item(i).question;
                              question.imageURL = results.rows.item(i).imageURL;
                              question.points = results.rows.item(i).points;
                              question.testgroup = results.rows.item(i).testgroup;
                              question.testnumber = results.rows.item(i).testnumber;
      
                              drivingTestQuestions.push(question)
                        }
                        callback(drivingTestQuestions)

                  } catch (error) {
                    console.error(error);
                  }

                  },
                  (TX, error)=>{
                        console.log(error);
                        return true;
                  }
             )
          },
          error => {
            console.log("Transaction getDrivingTestQuestionsByNumber error", error);
          },
          () => {
            console.log("Transaction getDrivingTestQuestionsByNumber "+testnumber+" done");
          })
}

export const deleteDrivingTestQuestionsByNumber = (testnumber: string, callback: any) => {

      db.transaction(tx => {
            tx.executeSql('DELETE FROM TestAnswer where TestAnswer.id in (SELECT TestQuestion.id from TestQuestion inner join TestAnswer on TestQuestion.id = TestAnswer.join_to_question where TestQuestion.testnumber = ?)',
            [testnumber],
            (tx, results) => {


                  try {


                        console.log('From table TestAnswer deleted all answers from question with testnumber '+testnumber);
                        tx.executeSql('DELETE FROM TestQuestion where TestQuestion.testnumber = ?',
                        [testnumber],
                        (tx, results) => {
                              console.log('From table TestQuestion deleted every question with testnumber '+testnumber)
                              callback(true)
                        },
                        (TX, error)=>{
                                    console.log(error);
                                    return true;
                        }
                        )

                  } catch (error) {
                    console.error(error);
                  }

            },
            (TX, error)=>{
                  console.log(error);
                  return true;
            }
             )
          },
          error => {
            console.log("Transaction deleteDrivingTestQuestionsByNumber error", error);
            callback(false)
          },
          () => {
            console.log("Transaction deleteDrivingTestQuestionsByNumber done");
          })
}

//#endregion

//#region Traffic Signs

interface assistantImgUrlModel {
      id: number,
      index: number,
      url: string,
  }
  
  interface TrafficSignsModel {
      id: number,
      title: string,
      body: string,
      imgUrl: string,
      section: string,
      assistantImages: Array<assistantImgUrlModel>,
  }

  function insertAssistantImgUrl(sqlTransaction:SQLTransaction, trafficSignId: Number, images: assistantImgUrlModel[]) {
      console.log("calling insertAssistantImgUrl")

            sqlTransaction.executeSql(
                  'CREATE TABLE IF NOT EXISTS AssistantTrafficSignImages (id INTEGER PRIMARY KEY AUTOINCREMENT, indX INTEGER, url TEXT, join_to_trafficSign INTEGER REFERENCES TrafficSigns(id))',
                  [],
                  function (tx, res) {
      

                        try {

                              images.forEach(data=> {
                                    console.log("inserting assistantImg");
            
                                    tx.executeSql('INSERT INTO AssistantTrafficSignImages (indX, url, join_to_trafficSign) values ( ?, ?, ?)',
                                    [data.index, data.url, trafficSignId],
                                    (txObj, resultSet) => {
                                          console.log("insert assistantImg complete")
            
                                    }, 
                                    (TX, error)=>{
                                                console.log(error);
                                                return true;
                                    }   
                                    )
                              })

                        } catch (error) {
                          console.error(error);
                        }

                  },
                  (TX, error)=>{
                        console.log(error);
                        return true;
                  }
              )      
}

function insertTrafficSigns(dataArray: TrafficSignsModel[], callback: any) {
      console.log("calling insertTrafficSigns")

      db.transaction(tx => {
            tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS TrafficSigns (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, imgUrl TEXT, section TEXT)',
                  [],
                  function (tx, res) {


                        try {

                              dataArray.forEach(data=> {
                                    console.log("inserting traffic sign ",data.title);
      
                                    tx.executeSql('INSERT INTO TrafficSigns (title, body, imgUrl, section) values ( ?, ?, ?, ?)',
                                    [data.title,data.body,data.imgUrl,data.section],
                                    (txObj, resultSet) => {
                                          console.log("insert traffic sign complete ",data.title)
                                          if(data.assistantImages.length != 0) {
                                                insertAssistantImgUrl(txObj, resultSet.insertId, data.assistantImages)
                                          }
                                    },
                                    (TX, error)=>{
                                                console.log(error);
                                                return true;
                                    } 
                                    ) 
                              })

                        } catch (error) {
                          console.error(error);
                        }

                  },
                  (TX, error)=>{
                        console.log(error);
                        return true;
                  }
              )
          },
          error => {
            console.log("Transaction insertTrafficSigns error", error);
            callback(false)
          },
          () => {
            console.log("Transaction insertTrafficSigns done");
            callback(true)
          }
          )
}

  export const downloadTrafficSigns = (section: string, callback: any) => {
      console.log("calling downloadTrafficSigns "+section);

      const controller = new AbortController();
      var counter = 0;
      var myVar = setInterval(() => {
            counter++;
            if(counter == 10) {
                  controller.abort()
            }
      }, 1000);



      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");
      
      fetch(apiURL+"trafficSign/getTrafficSignsBySection/"+section, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            signal: controller.signal
          })
        .then(response => response.text()
        )
        .then((result) => {

            try {

                  var resultArray : TrafficSignsModel[] = [];
                  var data : [] = JSON.parse(result);
                  data.forEach((traffSign: any) => {
                        var trafficSignObject: TrafficSignsModel = {
                              id: 0,
                              title: "",
                              body: "",
                              imgUrl: "",
                              section: "",
                              assistantImages: [],
                        }
      
                        var assImages : assistantImgUrlModel[] = []
                        for (let [key, value] of Object.entries(traffSign.assistantImgUrl)){
                              assImages.push({id:0,index:Number(key),url:value+""})
                        }
      
                        trafficSignObject.title = traffSign.title;
                        trafficSignObject.body = traffSign.body;
                        trafficSignObject.imgUrl = traffSign.imgUrl;
                        trafficSignObject.section = traffSign.section;
                        trafficSignObject.assistantImages = assImages;
      
                        resultArray.push(trafficSignObject)
                    });
                        console.log("DownloadData completed array length ",resultArray.length);
                  insertTrafficSigns(resultArray, (confirmed: boolean) => {
                          if(confirmed) {
                              callback(true)
                              clearInterval(myVar);
                              counter = 0;
                          }else {
                                callback(false) 
                                clearInterval(myVar);
                              counter = 0;
                          }
                    });

            } catch (error) {
              console.error(error);
            }

        })
        .catch(error => {
              clearInterval(myVar);
              counter = 0;
              console.log('error', error);
              callback(false);
        });

}

export const getTrafficSignBySection = (section: number,callback:any) => {

      const trafficSigns: TrafficSignsModel[] = [];
      console.log("calling getTrafficSignBySection "+section);

      // '\'[\' || GROUP_CONCAT(\'{"url":\' || \'"\'  || aTSI.url || \'",\' || \'"index":\' || aTSI.indX || \'}\' ) || \']\' as assisImages '+


      db.transaction(tx => {
            tx.executeSql('SELECT tS.id, tS.title, tS.body, tS.imgUrl, tS.section, '+
            '\'[\' || GROUP_CONCAT(\'{"url":\' || \'"\'  || aTSI.url || \'",\' || \' "index":\' || aTSI.indX  || \'}\' ) || \']\' as assisImages '+
            'FROM TrafficSigns as tS LEFT JOIN AssistantTrafficSignImages as aTSI ON tS.id = aTSI.join_to_trafficSign where tS.section LIKE ? GROUP BY tS.id',
            [section],
            (tx, results) => {


                  try {

                        for (let i = 0; i < results.rows.length; ++i) {
                              var assitImages: assistantImgUrlModel[] = [];
                              var trafficSign: TrafficSignsModel = {
                                    id:0, 
                                    title: "",
                                    body: "",
                                    imgUrl: "",
                                    section: "", 
                                    assistantImages: [],
                              };
      
                              if(results.rows.item(i).assisImages != null) {
                                    var assitImagesStr: string = results.rows.item(i).assisImages;
                                    assitImagesStr =assitImagesStr.slice(1,assitImagesStr.length-1);
            
                                    var arrayOfStr = assitImagesStr.split("},")
                                    arrayOfStr.forEach( data => {
                                          if(data.charAt(data.length-1) !== '}') {
                                                data += '}'
                                          }
                                          var assImg: assistantImgUrlModel = JSON.parse(data);
                                          assitImages.push(assImg);
            
                                    })
                              }
      
                              trafficSign.id = results.rows.item(i).id;
                              trafficSign.assistantImages = assitImages;
                              trafficSign.title = results.rows.item(i).title;
                              trafficSign.body = results.rows.item(i).body;
                              trafficSign.imgUrl = results.rows.item(i).imgUrl;
                              trafficSign.section = results.rows.item(i).section;
      
                              trafficSigns.push(trafficSign);
                        }
                        callback(trafficSigns)

                  } catch (error) {
                    console.error(error);
                  }

                  },
                  (TX, error)=>{
                        console.log(error);
                        return true;
                  }
             )
          },
          error => {
            console.log("Transaction getTrafficSignBySection ",section," error", error);
          },
          () => {
            console.log("Transaction getTrafficSignBySection "+section+" done");
          })
}

export const deleteTrafficSignsBySection = (section: string, callback: any) => {

      db.transaction(tx => {
            tx.executeSql('DELETE FROM AssistantTrafficSignImages where AssistantTrafficSignImages.id in (SELECT TrafficSigns.id from TrafficSigns inner join AssistantTrafficSignImages on TrafficSigns.id = AssistantTrafficSignImages.join_to_trafficSign where TrafficSigns.section LIKE ?)',
            [section],
            (tx, results) => {
                  tx.executeSql('DELETE FROM TrafficSigns where TrafficSigns.section LIKE ?',
                  [section],
                  (tx, results) => {
                        console.log('From table TrafficSigns deleted every traffic sign with section '+section)
                        callback(true)
                  },
                  (TX, error)=>{
                              console.log(error);
                              return true;
                  }
                  )
            },
            (TX, error)=>{
                  console.log(error);
                  return true;
            }
             )
          },
          error => {
            console.log("Transaction deleteTrafficSignsBySection error", error);
            callback(false)
          },
          () => {
            console.log("Transaction deleteTrafficSignsBySection done");
          })
}

// function updateStatusOfNotidications(status: bool, callback: any) {
//       console.log("calling insertTrafficSigns")

//       db.transaction(tx => {
//             tx.executeSql(
//                   'CREATE TABLE IF NOT EXISTS Notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, imgUrl TEXT, section TEXT)',
//                   [],
//                   function (tx, res) {


//                         try {

//                               dataArray.forEach(data=> {
//                                     console.log("inserting traffic sign ",data.title);
      
//                                     tx.executeSql('INSERT INTO TrafficSigns (title, body, imgUrl, section) values ( ?, ?, ?, ?)',
//                                     [data.title,data.body,data.imgUrl,data.section],
//                                     (txObj, resultSet) => {
//                                           console.log("insert traffic sign complete ",data.title)
//                                           if(data.assistantImages.length != 0) {
//                                                 insertAssistantImgUrl(txObj, resultSet.insertId, data.assistantImages)
//                                           }
//                                     },
//                                     (TX, error)=>{
//                                                 console.log(error);
//                                                 return true;
//                                     } 
//                                     ) 
//                               })

//                         } catch (error) {
//                           console.error(error);
//                         }

//                   },
//                   (TX, error)=>{
//                         console.log(error);
//                         return true;
//                   }
//               )
//           },
//           error => {
//             console.log("Transaction insertTrafficSigns error", error);
//             callback(false)
//           },
//           () => {
//             console.log("Transaction insertTrafficSigns done");
//             callback(true)
//           }
//           )
// }


//#endregion
