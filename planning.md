 # Planning #
 
 flash card program.
 
 initial implementation will be manual correct/fail selection
 cards will be selected in blocks of 10 from a pile. 3 cards will be random. 7 will be the worst scoring cards.
 
 the pile will be selected by category. A pile may contain no more than 30 cards. Categories are split into multiple piles.
 Piles are not random, but neither are they constant. Piles generated with the same seed should produce the same contents, given the same input.
 
 cards are ranked against each other. The score is calculated based on the last time it was answered, how many guesses it took to get it right and
 in the case of guessing the first time, the time it took to answer.
 
 Scores for piles are compiled from the cards contained within,
 
 This application will have no dynamic DB server side. Only static assets.
 
 The state is all stored client side using either the local store or other browser-side features.
 
 at a later date, there should be an export/import feature, so the state can be saved externally (to a text file)
 
 There are 2 target audiences.
 1. foreigners learning japanese
 2. young students learning japanese.
 
The manual correct/fail mechanism is good for group 1., but group 2. would benefit from an automated grading system.
As such, the application should be designed to support multi choice questions.
Some cards might have multiple answers in different categories. If cards had a way of indicating relationships,
this would improve the qualitiy of multiple choice questions.

Each card may have only one question, but may have multiple categories of answers, with multiple entires each.
Multiple choice questions should ask for only one category, but show only one correct answer in choices.
For scoring purposes, each answer has a score and each answer must be answered to complete the card from the selection hard.

The question proceess work by selecting 10 cards from the pile. 3 random, 7 lowest scoring. In the card of manual selection, an uncompleted card is chosen randomly from the hnad, the question is shown, then the user may chose to show the answer or mark as correct. If marked correcct, a score is calculated and the card is marked as complete. 
If the user aske to see the answers, they are shown and the user may then select fail or succcess. If they select success, the score is calculated and the card is marked ascomplete.
There is no difference between the correct behaviour on this screen and the previous. If the use selects false,
then a counter is incremented and the card returns to the uncomplete pile. The next card is selected randomly until all cards are complete
the cards ar e then retuned to the pile and the next hand is selected.
For multiple answer questiions, the flow isisimilar, except instead of showing each card, after the card is selected, they are split into the number of correct answers and each answer is used as 
The card is marked as complete when all answers are complete and the score of the card is the average of the score of the answers.

All cards are split into categories and each card may have more than one category.
An index of the categories will be generated, so that all carads do not need to be downloaded at once.
Each card should have a unique id. only cards in the hand need to be in memory, the rest can be referenced by id.

