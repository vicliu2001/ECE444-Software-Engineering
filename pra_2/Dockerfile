# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set environment variables to prevent Python from buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set environment variables for Flask
ENV FLASK_APP=activity1_4.py
ENV FLASK_RUN_HOST=0.0.0.0

# Create a working directory for the app
WORKDIR /PRA2_2_DOCKER

# Copy the requirements.txt file into the container
COPY requirements.txt /PRA2_2_DOCKER/

RUN python -m venv venv

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . /PRA2_2_DOCKER/


# Expose port 5000 for the Flask application
EXPOSE 5000

# Run Flask using 'flask run' command
CMD ["flask", "run"]
