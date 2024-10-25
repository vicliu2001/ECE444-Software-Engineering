import matplotlib.pyplot as plt
import pandas as pd

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

    averages = df.groupby('Test Case')['Timestamp'].mean()
    print("Average Latency (seconds) for each test case:")
    print(averages)

if __name__ == '__main__':
    create_boxplots()