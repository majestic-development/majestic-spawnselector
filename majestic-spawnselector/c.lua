local Core = nil
Citizen.CreateThread(function()
	if Config.Core == "qb" then
		Core = exports['qb-core']:GetCoreObject()
	elseif Config.Core == "newesx" then
		Core = exports["es_extended"]:getSharedObject()
        Citizen.CreateThread(function()
            while true do
                Citizen.Wait(0)
                if NetworkIsPlayerActive(PlayerId()) then
                    TriggerEvent('qb-spawn:client:openUI')
                    break
                end
            end
        end)
	end
end)
local weather = "EXTRASUNNY"
local degreeC = 0

RegisterCommand('ss', function()
    local current = GetPlayers()
    local cv = GetConvarInt('sv_maxclients', 32)
    for i = 1, #current do
        current = i
    end
    local hour = GetClockHours()
    local minute = GetClockMinutes()
    if weather == "EXTRASUNNY" or weather == "CLEAR" or weather == "NEUTRAL" then
        degreeC = math.random(20, 30)
    elseif weather == "SMOG" or weather == "FOGGY" or weather == "OVERCAST" or weather == "CLOUDS" or weather == "CLEARING" or weather == "HALLOWEEN" then
        degreeC = math.random(15, 20)
    elseif weather == "RAIN" or weather == "THUNDER" then
        degreeC = math.random(1, 13)
    elseif weather == "SNOW" or weather == "SNOWLIGHT" or weather == "XMAS" or weather == "BLIZZARD" then
        degreeC = math.random(-5, 5)
    end
    if Config.TemperatureType == "f" then
        degreeC = toFahrenheit(degreeC)
    end
    SetNuiFocus(true, true)
    SendNUIMessage({action = "spawnSelector", open = true, resourceName = GetCurrentResourceName(), locations = Config.SpawnCoords, infos = Config.Infos, weatherData = {icon = Config.WeatherIcons[weather], weather = string.lower(weather), tempType = Config.TemperatureType, temp = degreeC, windSpeed = GetWindSpeed(), playerCount = current .. "/" .. cv, time = {hour = hour, minute = minute}}})
end)

function GetPlayers()
    local players = {}
    for i = 0, 256 do
        if NetworkIsPlayerActive(i) then
            players[#players + 1] = i
        end
    end
    return players
end

function toCelsius(f)
    return (f - 32) * 5 / 9
end

function toFahrenheit(c)
    return c * 9 / 5 + 32
end

RegisterNetEvent('qb-spawn:client:openUI', function(value)
    SetEntityVisible(PlayerPedId(), false)
    DoScreenFadeOut(250)
    Citizen.Wait(1000)
    DoScreenFadeIn(250)
    local current = GetPlayers()
    local cv = GetConvarInt('sv_maxclients', 32)
    for i = 1, #current do
        current = i
    end
    local hour = GetClockHours()
    local minute = GetClockMinutes()
    if weather == "EXTRASUNNY" or weather == "CLEAR" or weather == "NEUTRAL" then
        degreeC = math.random(20, 30)
    elseif weather == "SMOG" or weather == "FOGGY" or weather == "OVERCAST" or weather == "CLOUDS" or weather == "CLEARING" or weather == "HALLOWEEN" then
        degreeC = math.random(15, 20)
    elseif weather == "RAIN" or weather == "THUNDER" then
        degreeC = math.random(1, 13)
    elseif weather == "SNOW" or weather == "SNOWLIGHT" or weather == "XMAS" or weather == "BLIZZARD" then
        degreeC = math.random(-5, 5)
    end
    if Config.TemperatureType == "f" then
        degreeC = toFahrenheit(degreeC)
    end
    SetNuiFocus(true, true)
    SendNUIMessage({action = "spawnSelector", open = true, resourceName = GetCurrentResourceName(), lastLocation = Config.EnableLastLocation, infos = Config.Infos, weatherData = {icon = Config.WeatherIcons[weather], weather = string.lower(weather), tempType = Config.TemperatureType, temp = degreeC, windSpeed = GetWindSpeed(), playerCount = current .. "/" .. cv, time = {hour = hour, minute = minute}}})
end)

RegisterNetEvent('qb-spawn:client:setupSpawns', function(cData, new, apps)
    if not new then
        SendNUIMessage({
            action = "setupLocations",
            locations = Config.SpawnCoords,
            isNew = new
        })
    elseif new then
        local apartments = {}
        for k, v in pairs(apps) do
            table.insert(apartments, {
                name = v.name,
                label = v.label,
                coords = {
                    --enter = v.coords.enter,
                    x = v.coords.x,
                    y = v.coords.y
                }
            })
        end
        SendNUIMessage({
            action = "setupApartments",
            locations = apartments,
            isNew = new
        })
    end
end)

RegisterNUICallback('spawn', function(data)
    local ped = PlayerPedId()
    if data.type == "lastLocation" then
        if Config.Core == "qb" then
            PreSpawnPlayer()
            local PlayerData = Core.Functions.GetPlayerData()
            local insideMeta = PlayerData.metadata["inside"]
            Core.Functions.GetPlayerData(function(pd)
                ped = PlayerPedId()
                SetEntityCoords(ped, pd.position.x, pd.position.y, pd.position.z)
                SetEntityHeading(ped, pd.position.a)
                FreezeEntityPosition(ped, false)
            end)
            if insideMeta.house ~= nil then
                local houseId = insideMeta.house
                TriggerEvent('qb-houses:client:LastLocationHouse', houseId)
            elseif insideMeta.apartment.apartmentType ~= nil or insideMeta.apartment.apartmentId ~= nil then
                local apartmentType = insideMeta.apartment.apartmentType
                local apartmentId = insideMeta.apartment.apartmentId
                TriggerEvent('qb-apartments:client:LastLocationHouse', apartmentType, apartmentId)
            end
            TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
            TriggerEvent('QBCore:Client:OnPlayerLoaded')
            PostSpawnPlayer(ped)
        end
    elseif data.type == "normal" then
        PreSpawnPlayer()
        SetEntityCoords(ped, data.x, data.y, data.z)
        if Config.Core == "qb" then
            TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
            TriggerEvent('QBCore:Client:OnPlayerLoaded')
            TriggerServerEvent('qb-houses:server:SetInsideMeta', 0, false)
            TriggerServerEvent('qb-apartments:server:SetInsideMeta', 0, 0, false)
        end
        Citizen.Wait(500)
        SetEntityCoords(ped, data.x, data.y, data.z)
        SetEntityHeading(ped, data.w)
        PostSpawnPlayer(ped)
    elseif data.type == "apartment" then
        local appaYeet = data.name
        SetNuiFocus(false, false)
        SendNUIMessage({action = "spawnSelector", open = false})
        DoScreenFadeOut(500)
        Citizen.Wait(5000)
        if Config.Core == "qb" then
            TriggerServerEvent("apartments:server:CreateApartment", appaYeet, Apartments.Locations[appaYeet].label)
            TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
            TriggerEvent('QBCore:Client:OnPlayerLoaded')
        end
        FreezeEntityPosition(ped, false)
        SetEntityVisible(ped, true)
    -- elseif data.type == "house" then
    --     PreSpawnPlayer()
    --     TriggerEvent('qb-houses:client:enterOwnedHouse', location)
    --     TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    --     TriggerEvent('QBCore:Client:OnPlayerLoaded')
    --     TriggerServerEvent('qb-houses:server:SetInsideMeta', 0, false)
    --     TriggerServerEvent('qb-apartments:server:SetInsideMeta', 0, 0, false)
    --     PostSpawnPlayer(ped)
    end
end)

function PreSpawnPlayer()
    SetNuiFocus(false, false)
    SendNUIMessage({action = "spawnSelector", open = false})
    DoScreenFadeOut(500)
    Citizen.Wait(2000)
end

function PostSpawnPlayer(ped)
    FreezeEntityPosition(ped, false)
    SetEntityVisible(PlayerPedId(), true)
    Citizen.Wait(500)
    DoScreenFadeIn(250)
end

RegisterNetEvent(Config.WeatherEvent, function(NewWeather, newblackout)
    weather = NewWeather
end)