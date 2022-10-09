## Prediction
### Notes from Day 20
No records on Sunday and Saturday, so maybe weekdays can not be features.
But weekdays are important features cause their day-by-day work loading is based on each day's consumption.

But there are some sounds happen in the morning
So separate two sounds prediction:
  - day records per week day
  - night records per week day

Time format
We need to convert time into number.  For example, there are 24 hours, so there will be 1440 minutes. "20.54" will be converted into "1254" for easier calculation.

Sat & Sun
  - use the prediction of Friday, coz Friday is closer to the weekends.
  - use the average of the other 5 days and have day & night prediction also.

