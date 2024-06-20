// Initialize arrays for thresholds
let monthlyThresholds = [];
let yearlyThresholds = [];

// Function to add monthly or yearly threshold based on category
function addThreshold(category) {
    const thresholdInputId = `threshold${category}`;
    const threshold = parseFloat(document.getElementById(thresholdInputId).value);

    if (!isNaN(threshold)) {
        // Determine whether it's monthly or yearly threshold
        if (category.includes('Monthly')) {
            category = category.replace('Monthly', '');
            const existingIndex = monthlyThresholds.findIndex(item => item.category === category);
            if (existingIndex !== -1) {
                monthlyThresholds[existingIndex].threshold = threshold;
            } else {
                monthlyThresholds.push({ category, threshold });
            }
        } else if (category.includes('Yearly')) {
            category = category.replace('Yearly', '');
            const existingIndex = yearlyThresholds.findIndex(item => item.category === category);
            if (existingIndex !== -1) {
                yearlyThresholds[existingIndex].threshold = threshold;
            } else {
                yearlyThresholds.push({ category, threshold });
            }
        }
        document.getElementById(thresholdInputId).value = '';
        displayThresholds();
    } else {
        alert("Please enter a valid threshold for ${category}.");
    }
}

// Function to display current thresholds
function displayThresholds() {
    const setThresholdsBody = document.getElementById('setThresholdsBody');
    setThresholdsBody.innerHTML = '';
    displayThresholdGroup('Electronics', setThresholdsBody);
    displayThresholdGroup('Clothing', setThresholdsBody);
    displayThresholdGroup('Household', setThresholdsBody);
    displayThresholdGroup('Grocery', setThresholdsBody);
    displayThresholdGroup('Others', setThresholdsBody);
}

// Helper function to display a threshold group
function displayThresholdGroup(category, parentElement) {
    const monthlyThreshold = monthlyThresholds.find(item => item.category === category);
    const yearlyThreshold = yearlyThresholds.find(item => item.category === category);
    const row = document.createElement('tr');

    const categoryCell = document.createElement('td');
    categoryCell.textContent = category;
    row.appendChild(categoryCell);

    const monthlyCell = document.createElement('td');
    monthlyCell.textContent = monthlyThreshold ? monthlyThreshold.threshold : '-';
    row.appendChild(monthlyCell);

    const yearlyCell = document.createElement('td');
    yearlyCell.textContent = yearlyThreshold ? yearlyThreshold.threshold : '-';
    row.appendChild(yearlyCell);

    parentElement.appendChild(row);
}

// Function to show charts
function showCharts() {
    const chartsContainer = document.getElementById('chartsContainer');
    chartsContainer.classList.remove('hidden');
    
    generateBarChart('thresholdBarChartMonthly', 'Monthly');
    generateBarChart('thresholdBarChartYearly', 'Yearly');
}

// Function to generate a bar chart
function generateBarChart(chartId, period) {
    const ctx = document.getElementById(chartId).getContext('2d');
    const thresholds = period === 'Monthly' ? monthlyThresholds : yearlyThresholds;
    const categories = thresholds.map(item => item.category);
    const dataValues = thresholds.map(item => item.threshold);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: `${period} Thresholds`,
                data: dataValues,
                backgroundColor: categories.map((_, i) => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
                borderColor: categories.map((_, i) => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Categories'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Thresholds'
                    }
                }
            }
        }
    });
}

// Initial call to display the thresholds if any exist
displayThresholds();