---
title: "Measuring Equality in Python"
location: Half Moon Bay, CA
category: Data
description: What the Lorenz Curve and Gini Coefficient are, and how to compute them in Python.
---

Distribution inequality can be measured via a Lorenz Curve and/or Gini Coefficient. Here's a best attempt at defining both, in simple terms:

- **Lorenz Curve**: line chart visualizing the cumulative percentage of *something* (ie. distribution of wealth in a given country) for a given population
- **Gini Coefficient**: a number from 0 to 1 representing the degree of equality (0 = complete equality, 1 = complete inequality)

What is this used for? A common area is wealth distribution. For example, if one wanted to put a statistical lens over the popular US political slogan, "We are the 99%". Internalizing the Gini Coefficient for a country's distribution of wealth provokes a deeper understanding of the topic, as well as a measurement to contrast against other geographic locations.

The Lorenz Curve and Gini Coefficient can be used to represent the level of inequality in many places outside of wealth distribution as well. For example, it could be used to measure revenue concentration by customers, usage of datasets in a BI Tool, or usage of features in a Web Application.

**General steps for computing the Gini Coefficient:**

- Load data of interest – in the example below we're using a dataset containing 25 fictitious annual gross salaries
- Sort data in ascending order
- Store the line of perfect equality in an array
- Store the cumulative % of each individual annual income in an array
- Compute the area between the line of perfect equality and the distribution of income

Now, let's rock this out in Python:

```python
# Import necessary libraries
from __future__ import division
import numpy as np
import pandas as pd

# Load dataset and store dataframe in variable 'df'
# 25 randomly selected income values w/ a range of $50k – $250k
df = pd.read_csv('http://bit.ly/2eaP6ny', header = None)
df = df

# Sort, and store in variable 'raw_data'
# Use of np.sort automatically converts to numpy array
raw_data = np.sort(df)

# The perfect equality y values. Cumulative percentage of incomes
x = np.linspace(0.0, 1.0, len(raw_data) + 1)

# Create y-axis values for line of perfect equality, which is equal to x
y_pe = x

# Create an empty list to store cumulative % of income
# Start w/ an initial value of '0.0' to match list length of variable 'y_pe'
y = [0.0]

# Compute % income to total income, and append to list y
for data_point in raw_data:
    y.append(data_point / (np.sum(raw_data)))

# Calculte cumulative % incomes in list y
y = np.cumsum(y)

# Calculate the area below the perfect equality line
area_perfect = np.trapz(y_pe, x)

# Compute the area using the composite trapezoidal rule
area_lorenz = np.trapz(y, x)
area_lorenz

# Compute the gini coefficient
# Divide the difference of 'area_perfect' and 'area_lorenz' by 'area_perfect'
gini_coeff = (area_perfect - area_lorenz)/area_perfect

# Print gini coefficient (Answer = .19)
print (gini_coeff)

# --------------------------------------------------

# Import visualization libraries
from bokeh.models import SingleIntervalTicker, LinearAxis, HoverTool, CrosshairTool
from bokeh.charts import Bar, output_file, show, output_notebook
from bokeh.plotting import figure, output_file, show

p = figure(x_axis_type=None, y_axis_type=None, plot_width=750, plot_height=750)
ticker = SingleIntervalTicker(interval=.1, num_minor_ticks=10)
xaxis = LinearAxis(ticker=ticker)
yaxis = LinearAxis(ticker=ticker)
p.add_layout(xaxis, 'below')# Add hover to this comma-separated string and see what changes
p.add_layout(yaxis, 'left')
p.line(x, y, line_width=5)

p.xaxis.axis_label = "Cumulative % of Income"
p.xaxis.axis_label_standoff = 25

p.yaxis.axis_label = "Cumulative % of Population"
p.yaxis.axis_label_standoff = 25

# Configure visual properties on a plot's title attribute
p.title.text="Lorenz Curve for Income Distribution, Gini Coefficient = %f" %gini_coeff
p.title.align = "center"
p.title.text_font_size='10pt'

output_notebook()
show(p)
```

The code is also on [GitHub as a gist](https://gist.github.com/colby-schrauth/3eaf03f2234b8e85c62aeb531987c988).
