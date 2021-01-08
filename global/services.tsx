import * as SQLite from 'expo-sqlite';
import { SQLStatementCallback, SQLTransaction } from 'expo-sqlite';
import { useCallback } from 'react';
const db = SQLite.openDatabase('db.autoskola') // returns Database object
const apiURL = "http://192.168.10.107:8090/";

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
            sqlTransaction.executeSql(
                  'CREATE TABLE IF NOT EXISTS FirstAidAnswer (id INTEGER PRIMARY KEY AUTOINCREMENT , answer TEXT, correctness BOOLEAN, join_to_question INTEGER REFERENCES FirstAidQuestion(id))',
                  [],
                  function (tx, res) {
      
                        answers.forEach(data=> {
                              console.log("inserting answer");
      
                              tx.executeSql('INSERT INTO FirstAidAnswer (answer, correctness, join_to_question) values ( ?, ?, ?)',
                              [data.answer, data.correctness, questionId],
                              (txObj, resultSet) => {
                                    console.log("insert answer complete")
      
                                    },   
                              )
                        })
                  }
              )      
}

function insertFirstAidQuestions(dataArray: FirstAidQuestionModel[], callback: any) {
      db.transaction(tx => {
            tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS FirstAidQuestion (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, sectionGroup TEXT, count INT)',
                  [],
                  function (tx, res) {

                        dataArray.forEach(data=> {
                              console.log("inserting question");

                              tx.executeSql('INSERT INTO FirstAidQuestion (question, sectionGroup, count) values ( ?, ?, ?)',
                              [data.question,data.sectionGroup,data.count],
                              (txObj, resultSet) => {
                                    console.log("insert question complete")
                                    insertFirstAidAnswers(txObj, resultSet.insertId, data.answers)
                                    }, 
                              ) 
                        })
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
      console.log("no toto")

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

      db.transaction(tx => {
            tx.executeSql('SELECT fQ.id, fQ.question, fQ.sectionGroup, fQ.count, '+
            '\'[\' || GROUP_CONCAT(\'{"answer":\' || \'"\'  || fA.answer || \'",\' || \' "correctness":\' || fA.correctness || \'}\' ) || \']\' as answers '+
            'FROM FirstAidQuestion as fQ INNER JOIN FirstAidAnswer as fA ON fQ.id = fA.join_to_question where fQ.sectionGroup LIKE ? GROUP BY fQ.count',
            [section],
            (tx, results) => {
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
                  }
             )
          },
          error => {
            console.log("Transaction getFirstAidQuestionsBySection error", error);
          },
          () => {
            console.log("Transaction getFirstAidQuestionsBySection done");
          })
}


export const getFirstAidQuestionsBySectionVsetko = (section: string,callback:any) => {

      const firstAidQuestions: FirstAidQuestionModel[] = [];

      db.transaction(tx => {
            tx.executeSql('SELECT * FROM FirstAidQuestion where sectionGroup LIKE ?;',
            [section],
            (tx, results) => {
                  for (let i = 0; i < results.rows.length; ++i) {
                        console.log(results.rows.item(i))
                  }
                  // console.log(section,": ",firstAidQuestions.length)
                  callback(firstAidQuestions)
                  } 
             )
          },
          error => {
            console.log("Transaction getFirstAidQuestionsBySectionVsetko error", error);
          },
          () => {
            console.log("Transaction getFirstAidQuestionsBySectionVsetko done");
          })
}

export const deleteFirstAidQuestionsBySection = (section: string, callback: any) => {

      db.transaction(tx => {
            tx.executeSql('DELETE FROM FirstAidAnswer where FirstAidAnswer.id in (SELECT FirstAidQuestion.id from FirstAidQuestion inner join FirstAidAnswer on FirstAidQuestion.id = FirstAidAnswer.join_to_question where FirstAidQuestion.sectionGroup like ?)',
            [section],
            (tx, results) => {
                  console.log('From table FirstAidAnswer deleted all answers from question with section '+section);
                  tx.executeSql('DELETE FROM FirstAidQuestion where FirstAidQuestion.sectionGroup like ?',
                  [section],
                  (tx, results) => {
                        console.log('From table FirstAidQuestion deleted every question with section '+section)
                        callback(true)
                        }
                  )
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