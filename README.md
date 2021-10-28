Quick script to enter work time in Jira via command line.

## Setup
1. Copy `.env.template` to `.env` and follow directions to assign values
2. Install packages with `yarn`

## Usage Example
Do the following to record 8 hours per day on issue XXX-97 from Sep 9 2021 through Sep 21 2021. **Weekends will be ignored.**
```
yarn record 2021-09-16 2021-09-21 XXX-97 8
```

## Todo
* Make hours param optional with a default of 8
* Add ability to fill in hours (if using the default hours and a date already has 2 hours entered, add 6 more, not 8)
