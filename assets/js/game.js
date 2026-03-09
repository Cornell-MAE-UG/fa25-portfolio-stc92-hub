const game = document.getElementById("game")

game.innerHTML = `
<div class="game-card">

<h1>Climate Crisis: Beer Company</h1>
<p class="description">
You run a beer company in a warming world. Each year lasts <b>10 seconds</b>.
Climate change slowly increases droughts and crop failures, making beer harder to produce.

Ingredients needed for beer:
• Water
• Barley
• Hops

If any of these run out, production collapses.

Every year climate stress increases, which:
• increases drought risk
• reduces crop yields
• slowly lowers beer quality

Your goal is to stay profitable as long as possible.
</p>

<div class="timer">
Year: <span id="year"></span> |
Next Year In: <span id="countdown">10</span>s
</div>

<div id="stats"></div>

<div class="actions">

<button onclick="produce()">🍺 Produce Beer<br><span>Uses ingredients. Profit depends on quality.</span></button>

<button onclick="irrigation()">💧 Invest in Irrigation<br><span>Cost $200. Restores water.</span></button>

<button onclick="importIngredients()">🚢 Import Ingredients<br><span>Cost $150. Restores barley + hops.</span></button>

<button onclick="research()">🧪 Climate Crop Research<br><span>Cost $300. Improves beer quality.</span></button>

<button onclick="raisePrices()">💰 Raise Beer Prices<br><span>Earn $50 but quality drops slightly.</span></button>

</div>

<h3>Event Log</h3>
<div id="log" class="log-box"></div>
</div>
`

let year = 1
let money = 1000
let quality = 100
let water = 100
let barley = 100
let hops = 100
let climate = 0

let countdown = 10

function updateStats(){

document.getElementById("year").innerText = year
document.getElementById("countdown").innerText = countdown

document.getElementById("stats").innerHTML = `
<div class="stats">

<div class="stat">
<div class="label">Money</div>
<div class="value">$${Math.floor(money)}</div>
</div>

<div class="stat">
<div class="label">Beer Quality</div>
<div class="value">${Math.floor(quality)}</div>
</div>

<div class="stat">
<div class="label">Water</div>
<div class="value">${Math.floor(water)}</div>
</div>

<div class="stat">
<div class="label">Barley</div>
<div class="value">${Math.floor(barley)}</div>
</div>

<div class="stat">
<div class="label">Hops</div>
<div class="value">${Math.floor(hops)}</div>
</div>

<div class="stat">
<div class="label">Climate Stress</div>
<div class="value">${Math.floor(climate)}</div>
</div>

</div>
`
}

function log(text){

const logBox = document.getElementById("log")

logBox.innerHTML =
`<div class="log-entry">${text}</div>` + logBox.innerHTML

}

function produce(){

if(water < 10 || barley < 10 || hops < 10){

log("⚠️ Not enough ingredients to produce beer.")
return

}

let profit = Math.floor(quality * 2)

money += profit
water -= 10
barley -= 10
hops -= 10

log(`🍺 Produced beer and earned $${profit}.`)

updateStats()

}

function irrigation(){

if(money < 200){
log("⚠️ Not enough money for irrigation.")
return
}

money -= 200
water += 25

log("💧 Irrigation investment increased water supply.")

updateStats()

}

function importIngredients(){

if(money < 150){
log("⚠️ Imports are too expensive.")
return
}

money -= 150
barley += 20
hops += 20

log("🚢 Imported barley and hops.")

updateStats()

}

function research(){

if(money < 300){
log("⚠️ Research funding unavailable.")
return
}

money -= 300
quality += 8

log("🧪 Crop research improved beer quality.")

updateStats()

}

function raisePrices(){

money += 50
quality -= 2

log("💰 Prices increased. Customers complain slightly.")

updateStats()

}

function newYear(){

year++
climate += 5

water -= 5 + climate*0.05
barley -= 3 + climate*0.05
hops -= 3 + climate*0.05
quality -= climate*0.02

if(Math.random() < 0.3){

water -= 15
log("🌵 Drought reduced water supply.")

}

if(Math.random() < 0.2){

barley -= 10
hops -= 10
log("🔥 Heat wave damaged crop yields.")

}

if(money <= 0){

log("💀 GAME OVER — your brewery went bankrupt.")
log("Without money you cannot pay workers or buy ingredients.")
clearInterval(timer)

}

else if(water <= 0){

log("💀 GAME OVER — water supplies collapsed.")
log("Drought and climate stress eliminated the water needed for brewing.")
clearInterval(timer)

}

else if(barley <= 0){

log("💀 GAME OVER — barley crops failed.")
log("Climate impacts destroyed the barley harvest needed for beer.")
clearInterval(timer)

}

else if(hops <= 0){

log("💀 GAME OVER — hop production collapsed.")
log("Rising temperatures damaged hop yields.")
clearInterval(timer)

}

else if(quality <= 0){

log("💀 GAME OVER — beer quality collapsed.")
log("Consumers stopped buying low-quality beer.")
clearInterval(timer)

}

countdown = 10

updateStats()

}

function tick(){

countdown--

if(countdown <= 0){

newYear()

}

updateStats()

}

updateStats()

let timer = setInterval(tick,1000)