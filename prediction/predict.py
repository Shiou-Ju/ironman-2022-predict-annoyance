import pandas as pd
import matplotlib.pyplot as plt


data_file_path = 'prediction/annoyance_output_manual_for_predict.csv'


def convert_time_to_int(time_str: str):
    time_split_arr = time_str.split(':')
    hours_to_minutes = int(time_split_arr[0]) * 60
    minutes = int(time_split_arr[1])
    total_minutes = hours_to_minutes + minutes
    return total_minutes


def is_night_time(time_in_minutes: int):
    # after 15:00
    if (time_in_minutes > 900):
        return True
    return False


def convert_int_to_time(mean: float):
    rounded_number = round(mean)
    hours = round(rounded_number/60)
    mins = rounded_number - (hours * 60)
    # if hours is rounded up
    if (mins < 0):
        mins = mins+60
        hours = hours - 1
    time_str = f"{hours}:{mins}"
    return time_str


df = pd.read_csv(data_file_path)
group_by_weekdays = df.groupby('星期幾')

df['time_in_minutes'] = df['具體時間'].apply(convert_time_to_int)


# visualization using plt
# ref: https://stackoverflow.com/questions/21654635/scatter-plots-in-pandas-pyplot-how-to-plot-by-category
# fig, ax = plt.subplots()
# for name, group in group_by_weekdays:
#     ax.plot(group['星期幾'], group['time_in_minutes'],
#             marker='o', linestyle='', label=name)
# ax.legend()

# plt.show()


# Analysis implementation
# Add a column "is_night_time" to dataframe by comparing "time_in_minutes"
df['is_night_time'] = df['time_in_minutes'].apply(is_night_time)

# Seperate into two dataframes by value of "time_in_minutes"
df_night = df.query('is_night_time == True')
df_day = df.query('is_night_time == False')

# Only night times should be grouped
night_group_by_weekdays = df_night.groupby('星期幾')

# Get mean value
day_mean = df_day['time_in_minutes'].mean()
night_mean = night_group_by_weekdays['time_in_minutes'].mean()

# Convert number to time format
day_mean_time_format = convert_int_to_time(day_mean)
night_mean_time_format = night_mean.map(convert_int_to_time)


print('\n\n\n')
print("day time")
print(day_mean_time_format)
print('\n\n\n')
print("night time")
print(night_mean_time_format)
print('\n\n\n')


# ref
# https://www.askpython.com/python-modules/pandas/conditionally-grouping-values

print(df_day['time_in_minutes'].median())
print(night_group_by_weekdays['time_in_minutes'].median())
