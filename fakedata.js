var text = ["LGBT", "Immigration", "border", "Obama"];
var party = ["Republican", "Democrat"];
var data = [];
for (var i = 0; i < 1500; i++) {
  var item = {
    _id: (Math.random() * 60),
    text: text[Math.floor(Math.random() * text.length)],
    party: party[Math.floor(Math.random() * party.length)],
  }
  data.push(item);
}
// console.log('Data:', data);
exports.data = data;