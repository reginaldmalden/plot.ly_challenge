var tableData=data

// YOUR CODE HERE!
var tbody=d3.select("tbody");

// Console.log the weather data from data.js
console.log(data);

function buildTable(data) {

 tbody.html("");
    data.forEach((dataRow) => {
        var row=tbody.append("tr");
        Object.values(dataRow).forEach((val) => {
            let cell=row.append("td");
            cell.text(val);
        }); 
    });    
}
buildTable(tableData);

var button = d3.select("filter-btn");

var form = d3.select("table-area");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);


function handleClick() {

    const date = d3.select("#datetime").property("value");
    let filteredData = tableData;
    if (date) {
        
        filteredData = filteredData.filter(row => row.datetime === date);
      }
    
   buildTable(filteredData);

} 
d3.selectAll("#filter-btn").on("click", handleClick);

buildTable(tableData);
