/* The scoring takes the following form:
  "question_identifier": {
    first_answer_id: [
    [<id-of-the-study-program>, <score-towards-that-program>],
    [<id-of-the-study-program>, <score-towards-that-program>],
    [<id-of-the-study-program>, <score-towards-that-program>],
    ]
  },

  The question and answer identifiers need to match what are defined in
  ../src/survey_questions.js. The study program identifier must also be
  a valid one, i.e., there needs to be an entry in
  ../src/study_programs.js that has that ID.

  The given score is just an integer that gets added to the score of
  that particular program. As such, 0 makes no change to the score,
  positive value increases the score, and negative value reduces it.
  Omitting 0 scores is ok, as the code does not expect to find an
  entry for each study program option in each answer's scoring.
*/
export const scoring = {
  "work_during_studies": {
    does_not_matter: [
      [1,1],
      [2,1],
      [3,1]
    ],
    would_be_nice: [
      [1,1],
      [2,1],
      [3,1]
    ],
    absolutely: [
      [1,1],
      [2,1],
      [3,1]
    ],
    prefer_to_work_during_studies: [
      [1,1],
      [2,1],
      [3,1]
    ]
  },
  "importance_of_salary": {
    meaningful_work_more_important: [
      [1,1],
      [2,1],
      [3,1]
    ],
    stable_income: [
      [1,1],
      [2,1],
      [3,1]
    ],
    would_like_to_be_millionaire: [
      [1,0], // Can be omitted.
      [2,0], // Can be omitted.
      [3,1]
    ]
  },
  "most_interesting_about_touch_screens": {
    finger_recognition_with_physics: [
      [1,1],
      [2,0], // Can be omitted.
      [3,0] // Can be omitted.
    ],
    screen_position_recognition: [
      [1,0], // Can be omitted.
      [2,1],
      [3,0] // Can be omitted.
    ],
    intuitive_usage: [
      [1,0], // Can be omitted.
      [2,0], // Can be omitted.
      [3,1]
    ]
  },
  "piece_of_technology_to_work_with": {
    software: [
      [1,0], // Can be omitted.
      [2,0], // Can be omitted.
      [3,1]
    ],
    ai_cybersecurity_robotics: [
      [1,0], // Can be omitted.
      [2,1],
      [3,0] // Can be omitted.
    ],
    electronics: [
      [1,1],
      [2,0], // Can be omitted.
      [3,0] // Can be omitted.
    ]
  },
  "interest_in_used_software": {
    how_does_it_work: [
      [1,1],
      [2,0], // Can be omitted.
      [3,0] // Can be omitted.
    ],
    algorithms_and_graphics: [
      [1,0], // Can be omitted.
      [2,1],
      [3,0] // Can be omitted.
    ],
    ui_and_ux: [
      [1,0], // Can be omitted.
      [2,0], // Can be omitted.
      [3,1]
    ]
  },
  "aspirations_for_future": {
    develop_electronics_and_networks: [
      [1,1],
      [2,0], // Can be omitted.
      [3,0] // Can be omitted.
    ],
    improve_cybersecurity_and_new_technologies: [
      [1,0], // Can be omitted.
      [2,1],
      [3,0] // Can be omitted.
    ],
    ensure_usability_of_technology: [
      [1,0], // Can be omitted.
      [2,0], // Can be omitted.
      [3,1]
    ]
  },
  "relationship_with_math": {
    best_friends: [
      [1,1],
      [2,1],
      [3,1]
    ],
    friends: [
      [1,1],
      [2,1],
      [3,1]
    ],
    everyday_acquaintance: [
      [1,0], // Can be omitted.
      [2,1],
      [3,1]
    ],
    stay_out_of_each_others_way: [
      [1,0], // Can be omitted.
      [2,0], // Can be omitted.
      [3,1]
    ]
  },
  "iternationality": {
    live_and_work_abroad: [
      [1,1],
      [2,1],
      [3,1]
    ],
    international_environment_living_in_finland: [
      [1,1],
      [2,1],
      [3,1]
    ],
    english_not_my_strong_suite: [
      [1,1],
      [2,1],
      [3,1]
    ]
  }
};

