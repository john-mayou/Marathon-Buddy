## Project Objective

Marathon Buddy was a chance to explore new and dificult technologies at Prime Digital academy. Since I want to start businesses in the future, I wanted to explore payments, user auth, Oauth 2, and email for the project. Marathon Buddy is an athletic training gamification app that allows users to stake money in order to meet their athletic goals. 

Elevator pitch: Marathon training is boring

User features:
- Sign up for an account
- Verify their email through email link
- Connect to Strava (GPS tracking platform that connects to Garmin / Apple Watch / Fitbit....)
- Join cohort of other runners
- Decide which days and how many miles for those days they will train
- Stake a custom $ amount for each day
- Either win back their stake or lose it based on if they completed their planned mileage
- Recieve daily email updates with information of the previous days training
- See their current statistics of their current cohort
- See their progress through multiple cohorts

| Marathon Buddy Walk-Through! |
|:---:|
| |
| Home |
| This page explains what Marathon Buddy is all about! First page the user sees when they go to www.marathonbuddy.co |
| <img width="30%" src="screenshots/mb-home.png"> |
| |
| Login / Register |
| Users can sign up for an account / login. Registration will have the user verify their email through an email link sent to the email address they signed up with. |
| <img width="30%" src="screenshots/mb-login.png"> |
| |
| Connect To Strava |
| Strava is a GPS tracking platform that syncs data from fitness-devices such as Garmin, Apple Watch and FitBit. This page will allow the user to connect their Strava account to Marathon Buddy. We will use this as the source of truth to know if the user is completing their trainings or not. |
| <img width="30%" src="screenshots/mb-connect.png"> |
| |
| Strava Authorization |
| When the user clicks the Connect button on the previous screen, they are taken to Strava.com. There they can login, then click "Authorize" to allow Marathon Buddy to keep track of their running activities for them. |
| <img width="30%" src="screenshots/mb-strava.png"> |
| |
| Duration Choice |
| The user will have 4 options to choose from for how long they would like to train: 1 week, 2 weeks, 1 month and 2 months. Clicking on one of the cards will take them to the next page. |
| <img width="30%" src="screenshots/mb-join-copy.png"> |
| |
| Decide Training Days |
| The user will decide which days they would like to train within the contrainsts of the training duration that they chose. |
| <img width="30%" src="screenshots/mb-join-calendar.png"> |
| |
| Decide Stake + Mileage For Training Days |
| This page gives the user more information about the cohort that they will be joining. They can also decide the stake amount ($) that they would like to put on the line. And finally, the user will plan the mileage for each day that they chose to train. |
| <img width="30%" src="screenshots/mb-join-whole.png"> |
| |
| Stripe Checkout |
| Where the user will put in their payment details to commit to their training plan and put their stake on the line. |
| <img width="30%" src="screenshots/mb-stripe.png"> |
| |
| Current Cohort Dashboard |
| After the user finishes signing up, they can view their planned trainings on this page. They can click on a day from the calendar and get more information about how many miles were planned and how far they actually ran (this screenshot is from the end of a cohort). They can also see personal stats and overall cohort stats like completion percentage and total miles run. |
| <img width="30%" src="screenshots/mb-dashboard.png"> |
| |
| Cohort History Page |
| The user can see their performatnce through multiple cohorts and see how they are improving over time. |
| <img width="30%" src="screenshots/mb-history.png"> |
| |

## What I learned

1. How to read API documentation efficiently. Learned the OAuth 2.0 flow with the Strava V3 documenation and how to implement a Stripe webhook for a custom subscription integration. (SendGrid API learned as well)  

2. How to implement database transaction with async await try catch blocks. Since there were many database queries for each endpoint/function, this allows for an all-or-nothing transaction with the database and proper error handling.

3. Handling large functions by refactoring them into smaller function that return a promise with resolve / reject. This allows me to refactor Promise.all and larger endpoints into smaller helper functions.

## What I would add in the future

All the things I would add in the future have to do with making the project more robust. 

Refactored with:
- Type based language such as TypeScript
- Unit tests / Integration testing
- Database query A / B testing for performance
- Global scss variables utilization

[Deploy Link 🚀](http://www.marathonbuddy.co) ! Link will take ~10s to boot-up !
