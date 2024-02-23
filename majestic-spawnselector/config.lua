Config = {
    Core = "qb", -- qb - QBCore | newesx - New ES Extended
    WeatherEvent = "qb-weathersync:client:SyncWeather",
    SpawnCoords = {
        -- Example (UI X means left, UI Y means top): {label = "Label here", icon = "Icon here (Font Awesome Pro Icons - https://fontawesome.com/v5/search)", coords = vector3(-2041.12, -368.13, 48.1), heading = 0.0, ui = {x = 40, y = 40}},
        {label = "Del Perro Pier", icon = "far fa-swimming-pool", coords = vector3(-1594.45, -963.16, 13.02), heading = 129.94, ui = {x = 32.5, y = 23}},
        {label = "Celltowa Hotel", icon = "fad fa-building", coords = vector3(-1038.58, -756.46, 19.84), heading = 88.58, ui = {x = 34, y = 31.5}},
        {label = "LS Airport", icon = "fas fa-plane-alt", coords = vector3(-1042.42, -2746.16, 21.36), heading = 333.73, ui = {x = 21, y = 31.5}},
        {label = "Pinkcage Hotel", icon = "fad fa-building", coords = vector3(-1038.58, -756.46, 19.84), heading = 88.58, ui = {x = 38.5, y = 43}},
    },
    Infos = {
        ["date"] = true,
        ["weather"] = true,
        ["windSpeed"] = true,
        ["temperature"] = true,
        ["playerCount"] = true,
    },
    TemperatureType = "c", -- f - Fahrenheit° | c - Celsius
    WeatherIcons = {
        ["EXTRASUNNY"] = "fas fa-sun",
        ["CLEAR"] = "fas fa-sun-haze",
        ["NEUTRAL"] = "fas fa-sun-dust",
        ["SMOG"] = "fas fa-smog",
        ["FOGGY"] = "fas fa-fog",
        ["OVERCAST"] = "fas fa-clouds",
        ["CLOUDS"] = "fas fa-clouds",
        ["CLEARING"] = "fad fa-sun-cloud",
        ["HALLOWEEN"] = "fas fa-cloud-rainbow",
        ["RAIN"] = "fas fa-cloud-showers",
        ["THUNDER"] = "fad fa-thunderstorm",
        ["BLIZZARD"] = "fad fa-cloud-snow",
        ["SNOWLIGHT"] = "fad fa-cloud-hail",
        ["XMAS"] = "fad fa-snow-blowing",
        ["SNOW"] = "fad fa-snowflake",
    },
    EnableLastLocation = true
}