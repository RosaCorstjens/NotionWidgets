
fetch("/bookGenreChart")
    .then(response => response.json())                                              // catch json response from bookGenreChart 
    .then(genreCounts => {
        const ctx = document.getElementById('chart').getContext('2d');          // grap ref to chart in html
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