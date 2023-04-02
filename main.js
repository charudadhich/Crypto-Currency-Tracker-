const form = document.querySelector("#coinForm")
const res = document.querySelector("#tableResult")
var upd;

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    if(upd){
        clearTimeout(upd)
    }
    const ctype = form.elements.coinType.value
    // console.log(ctype)
    fetchPrice(ctype)
});

const fetchPrice = async(ctype)=>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    // console.log(r.data.coin.price)
    const price = r.data.coin.price
    const volume  = r.data.coin.volume
    const change = r.data.coin.priceChange1d
    const base = r.data.coin.name
    const target = 'USD'
    console.log(change)
    var col = "green";
    // console.log(col)
    if(change<0){
        col = "red";
    }
    console.log(col)
    res.innerHTML =  `<tr style= "background-color: red; color:white;font-weight:700">
    <td>Property</td>
    <td>Value</td>
</tr>
<tr style="background-color: white">
    <td>${base}</td>
    <td style="color:${col};"><span style="font-size: 1.3em;">${price}</span> ${target}</td>
</tr>
<tr style="background-color: white">
    <td>Volume</td>
    <td>${volume}</td>
</tr>
<tr style="background-color: white">
    <td>Change</td>
    <td style = "color:${col}">${change} ${target}</td>
</tr>`

    upd = setTimeout(()=>fetchPrice(ctype), 1000)
};


