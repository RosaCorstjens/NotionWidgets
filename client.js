
fetch("/bookGenreChart")
    .then(response => response.json())
    .then(genreCounts => {
        const ctx = document.getElementById('testChart').getContext('2d');
        const data = {
            labels: Object.keys(genreCounts),
            datasets: [{
                label: "Finished books",
                data: Object.values(genreCounts),
            }]
        }

        const chartConfig = {
            type: "pie",
            data: data,
        };

        new Chart(ctx, chartConfig);
    });