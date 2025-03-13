document.addEventListener("DOMContentLoaded", function () {
    const citySelect = document.getElementById("city-select");
    const getWeatherButton = document.getElementById("get-weather");

    getWeatherButton.addEventListener("click", function () {
        const cityCode = citySelect.value;

        if(!cityCode) {
            alert("都市を選択してください");
            return;
        }
        const apiUrl = `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`;

        fetch(apiUrl)
        .then(response => {
            if(!response.ok) {
                throw new Error("天気データの取得に失敗しました");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const forecast = data[0];
            const publishingOffice = forecast.publishingOffice;
            const reportDatetime = forecast.reportDatetime;
            const areaName = forecast.timeSeries[0].areas[0].area.name;
            const todayWeather = forecast.timeSeries[0].areas[0].weathers[0];
            const tomorrowWeather = forecast.timeSeries[0].areas[0].weathers[1];
            const dayAfterTomorrowWeather = forecast.timeSeries[0].areas[0].weathers[2];

            const temperatures = forecast.timeSeries[2].areas[0].temps;
            const todayHighTemp = temperatures[1] || "不明";
            const todayLowTemp = temperatures[0] || "不明";
            
            document.querySelector("#publishingOffice td").textContent = publishingOffice;
            document.querySelector("#reportDatetime td").textContent = reportDatetime;
            document.querySelector("#targetArea td").textContent = areaName;
            document.querySelector("#todayHighTemperature td").textContent = todayHighTemp + "℃";
            document.querySelector("#todayLowTemperature td").textContent = todayLowTemp + "℃";
            document.querySelector("#today td").textContent = tomorrowWeather;
            document.querySelector("#tomorrow td").textContent = tomorrowWeather;
            document.querySelector("#dayAfterTomorrow td").textContent = dayAfterTomorrowWeather;
        })
        .catch(error => {
            console.error("エラー:",error);
            alert("天気予報は取得できませんでした。");
        });
    });
});