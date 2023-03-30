## Project Objective

Marathon Buddy was a chance to explore new and dificult technologies at Prime Digital academy. Since I want to start businesses in the future, I wanted to explore payments, user auth, Oauth 2, and email for the project. Marathon Buddy is an athletic training gamification app that allows users to stake money in order to meet their athletic goals.

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

[Deploy Link 🚀](https://cryptic-reef-41000.herokuapp.com/) ! Link will take ~10s to bootup !
