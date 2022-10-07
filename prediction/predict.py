import pandas as pd
import matplotlib.pyplot as plt

data_file_path = 'prediction/annoyance_output_manual_for_predict.csv'

def convert_time_to_int(time_str: str):
    time_split_arr = time_str.split(':')
    hours_to_minutes = int(time_split_arr[0]) * 60
    minutes = int(time_split_arr[1])
    total_minutes = hours_to_minutes + minutes
    return total_minutes


df = pd.read_csv(data_file_path)
group_by_weekdays = df.groupby('星期幾')

df['time_in_minutes'] = df['具體時間'].apply(convert_time_to_int)

# visualization using plt
# ref: https://stackoverflow.com/questions/21654635/scatter-plots-in-pandas-pyplot-how-to-plot-by-category
fig, ax = plt.subplots()
for name, group in group_by_weekdays:
    ax.plot(group['星期幾'], group['time_in_minutes'],
            marker='o', linestyle='', label=name)
ax.legend()

plt.show()


# No records on Sunday and Saturday, so maybe weekdays can not be features.
# But weekdays are important features cause their day-by-day work loading is based on each day's consumption.

# But there are some sounds happen in the morning
# So separate two sounds prediction:
#   - day records per week day
#   - night records per week day

# Time format
# We need to convert time into number.  For example, there are 24 hours, so there will be 1440 minutes. "20.54" will be converted into "1254" for easier calculation.

# Sat & Sun
#   - use the prediction of Friday, coz Friday is closer to the weekends.
#   - use the average of the other 5 days and have day & night prediction also.
