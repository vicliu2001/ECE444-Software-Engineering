# import unittest
# import requests
# import time
# import csv

# class TestFlaskApp(unittest.TestCase):
#     BASE_URL = 'http://ece444pra5-env-2.eba-qmw7zfxc.us-east-2.elasticbeanstalk.com/'  # Change this to your AWS Elastic Beanstalk server URL if needed
#     def setUp(self):
#         self.test_cases = [
#             'This is a fake news example.',
#             # ('Another fake news example.',
#             # ('This is a real news example.',
#             # ('Another real news example.'
#         ]

#     def test_functional(self):
#         for text in self.test_cases:
#             with self.subTest(text=text):
#                 response = requests.post(self.BASE_URL, data={'text': text})
#                 print(response)
#                 self.assertEqual(response.status_code, 200)
#                 self.assertIn(response.text, ['FAKE', 'REAL'])  # Assuming '0' for fake and '1' for real

#     def test_performance(self):
#         with open('performance_test_results.csv', mode='w', newline='') as file:
#             writer = csv.writer(file)
#             writer.writerow(['Test Case', 'Timestamp'])

#             for text in self.test_cases:
#                 for _ in range(100):
#                     start_time = time.time()
#                     response = requests.post(self.BASE_URL, data={'text': text})
#                     end_time = time.time()
#                     self.assertEqual(response.status_code, 200)
#                     writer.writerow([text, end_time - start_time])

# if __name__ == '__main__':
#     unittest.main()


import os
import pytest
from pathlib import Path

from application import app
import json
from bs4 import BeautifulSoup
import csv
import time
import requests
import matplotlib.pyplot as plt
import pandas as pd

@pytest.fixture
def client():
    BASE_DIR = Path(__file__).resolve().parent.parent
    app.config['TESTING'] = True
    app.config['BASE_URL'] = 'http://ece444pra5-env-2.eba-qmw7zfxc.us-east-2.elasticbeanstalk.com/'

    with app.app_context():
        yield app.test_client()

def get_csrf_token(client):
    response = client.get('/')
    soup = BeautifulSoup(response.data, 'html.parser')
    csrf_token = soup.find('input', {'name': 'csrf_token'})['value']
    return csrf_token

def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Enter news snippet' in response.data
    assert b'Predict' in response.data


def test_predict(client):
    csrf_token = get_csrf_token(client)
    response = client.post('/', data={'name': 'This is a fake news example.', 'csrf_token': csrf_token})
    print(response.data)
    assert response.status_code == 200
    assert b'FAKE' or b'REAL' in response.data

    response = client.post('/', data={'name': 'This is a real news example.', 'csrf_token': csrf_token})
    assert response.status_code == 200
    assert b'FAKE' or b'REAL' in response.data

    response = client.post('/', data={'name': 'Another fake news example.', 'csrf_token': csrf_token})
    assert response.status_code == 200
    assert b'FAKE' or b'REAL' in response.data

    response = client.post('/', data={'name': 'Another real news example.', 'csrf_token': csrf_token})
    assert response.status_code == 200
    assert b'FAKE' or b'REAL' in response.data

def test_performance(client):
    with open('performance_test_results.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Test Case', 'Output', 'Timestamp'])

        test_cases = ["This is a fake news example.", 
                           "Another fake news example.",
                           "This is a real news example.", 
                           "Another real news example."]
        csrf_token = get_csrf_token(client)
        for text in test_cases:
            for _ in range(100):
                start_time = time.time()
                response = client.post('/', data={'name': text, 'csrf_token': csrf_token})
                end_time = time.time()
                assert response.status_code == 200
                writer.writerow([f"input {test_cases.index(text)}", response.data, end_time - start_time])

def create_boxplots():
    df = pd.read_csv('performance_test_results.csv')
    df['Timestamp'] = df['Timestamp'].astype(float)

    # Create boxplots
    plt.figure(figsize=(10, 6))
    df.boxplot(column='Timestamp', by='Test Case', grid=False)
    plt.title('Latency Boxplots by Test Case')
    plt.suptitle('')
    plt.xlabel('Test Case')
    plt.ylabel('Latency (seconds)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('latency_boxplots.png')
    plt.show()

    # Calculate and print average latency for each test case
    averages = df.groupby('Test Case')['Timestamp'].mean()
    print("Average Latency (seconds) for each Test Case:")
    print(averages)

if __name__ == '__main__':
    pytest.main()
    create_boxplots()