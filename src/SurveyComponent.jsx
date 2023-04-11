import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "survey-core/survey.i18n";
import "./index.css";
import { json } from "./json";

import { programs } from "./study_programs.js";
import { scoring } from "./survey_scoring.js";
import { questions } from "./survey_questions.js";


const localization_texts = {
    "summary_interest": {
        "default": "Sinulle voisi sopia",
        "en": "You might be interested in",
        "fi": "Sinulle voisi sopia"
    },
    "read_more": {
        "default": "Lue lisää",
        "en": "Read more",
        "fi": "Lue lisää"
    }
}

const skipped_questions = [
    "language_selection",
    "data_collection_consent",
    "email_address"
]

function CalculateResults(survey) {
    // Initialize the scores for different programs to 0.
    const total_scores = {};
    for (let program in programs) {
        total_scores[programs[program]["id"]] = 0;
    }

    const resultData = [];
    for (const question_name in survey.data) {
      const question = survey.getQuestionByName(question_name);
      if (!!question) {
        const question_and_answer = {
          name: question_name,
          answer: question.value,
        };
        if (skipped_questions.includes(question_name)) {
            // Skipped questions do not have scores.
            continue;
        }
        const answer_scores = scoring[question_name][question.value];
        for (const score in answer_scores) {
            // Index 0 is the ID of the study program, index 1 is the score.
            total_scores[answer_scores[score][0]] += answer_scores[score][1];
        }
        resultData.push(question_and_answer);
      }
    }
    console.log(JSON.stringify(total_scores));
    return total_scores;
}

function saveSurveyData(survey) {
    if (survey.currentPageNo === 0) {
        // When leaving the first page, send selected locale to server.
        // Server will also take the timestamp of survey start the first
        // time the respondent leaves the first page during that
        // session.
        var used_locale = survey.locale;
        if (used_locale === "") {
            // "en" being default means locale is empty.
            used_locale = "en";
        }
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/set-locale");
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify({"locale": used_locale}));

        const xhr2 = new XMLHttpRequest();
        xhr2.open("POST", "/set-survey-start");
        xhr2.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr2.send(JSON.stringify({}));
    }
}

function SurveyComponent() {
    // Create an empty model
    const survey = new Model(json);

    survey.onComplete.add((survey) => {

        const total_scores = CalculateResults(survey);
        let max_score = 0;
        let max_key = "";

        // Get the key of the program with the most points. If there is
        // a tie, get the last one in order.
        for(let score in total_scores){
          if(total_scores[score] > max_score){
            max_score = total_scores[score];
            max_key = score;
          }
        }

        var program = programs.filter(obj => {
            return obj["id"] === parseInt(max_key);
        });

        let title = program[0]["program_name"];
        let description = program[0]["description"];
        let link = program[0]["link"]

        let used_locale = survey.locale;
        if (used_locale === "") {
            // "en" being default means locale is empty.
            used_locale = "en";
        }

        if (used_locale in title) {
            // Use locale if it exists.
            title = title[used_locale];
        } else {
            title = title["default"];
        }

        if (used_locale in description) {
            // Use locale if it exists.
            description = description[used_locale];
        } else {
            description  = description["default"];
        }

        if (used_locale in link) {
            link = link[used_locale];
        } else {
            link = link["default"];
        }

        let interest_locale = localization_texts["summary_interest"]["default"];
        if (used_locale in localization_texts["summary_interest"]) {
            // Use locale if it exists.
            interest_locale = localization_texts["summary_interest"][used_locale];
        }
        let read_more_locale = localization_texts["read_more"]["default"];
        if (used_locale in localization_texts["read_more"]) {
            // Use locale if it exists.
            read_more_locale = localization_texts["read_more"][used_locale];
        }

        // Not an ideal solution but what can you expect from a backend
        // developer writing frontend in a hurry.
        survey.completedHtml = "<h1 style=\"text-align:center;\">" + interest_locale + " " + title + "</h1>" + "<br/><p style=\"text-align: justify; padding: 100px; border: 2px solid black;\">" + description + "<br/><br/><a href=\"" + link + "\">" + read_more_locale + "</a><p/>";

        // Send data to server.
        const finalResult = {
            "data-collect-consent": survey.data["data_collection_consent"],
            "email": survey.data["email_address"],
            "answers": survey.data,
            "result": max_key,
        };
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/survey-complete");
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify(finalResult));
    });

    //##################################################################
    // The survey result handling ends here.
    //##################################################################

   // Send locale and survey start requests to server when leaving the
   // first page.
   survey.sendResultOnPageNext = true;
   survey.onPartialSend.add((survey) => {
        saveSurveyData(survey);
    });

    // Locale is Finnish by default.
    survey.locale = "fi";

    // Add language selection.
    const language_selection = survey.getQuestionByName("language_selection");
    language_selection.choicesOrder = "asc";
    language_selection.defaultValue= "fi";
    language_selection.allowClear = false;
    language_selection.isRequired = true;
    language_selection.hideNumber = true;

    const data_collection_consent = survey.getQuestionByName("data_collection_consent");
    data_collection_consent.hideNumber = true;
    data_collection_consent.isRequired = true;
    const email_address = survey.getQuestionByName("email_address");
    email_address.hideNumber = true;


    // Update the survey language when value is changed.
    survey.onValueChanged.add((survey, { name, question, value }) => {
      if (name === "language_selection") {
        // Update the locale in UI.
        survey.locale = value;
      }
    });


    // Add pages for the questions, and add the questions to the pages.
    let page_idx = -1;
    let page = null;
    const questions_per_page = 5;

    for (let question_idx = 0; question_idx < questions.length; question_idx++) {

        if (question_idx % questions_per_page === 0) {
            page = survey.getPageByName("page_questions" + parseInt(question_idx));

            if (page === null) {
                // The page does not exist. Create a new one.
                page = survey.addNewPage("page_questions" + parseInt(question_idx));
            }

            page_idx++;
        }

        let question = page.addNewQuestion(questions[question_idx]["type"], questions[question_idx]["name"]);
        // Question contents are fetched from the separate .js file's
        // JSON definition.
        question.fromJSON(questions[question_idx]);
    }

    return (<Survey model={survey} />);
}

export default SurveyComponent;

