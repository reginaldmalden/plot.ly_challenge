function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");


    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

function BuildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    var bardata = [{
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    }];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };
    Plotly.newPlot('bar', bardata, barLayout);

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
      }
    };

    var data = [trace1];

    var layout = {
      title: 'Bacteria Culture Per Sample',
      xaxis:{title:"OTU ID"}   
    };


    Plotly.newPlot('bubble', data, layout);
  });
}

function initialization(){
  d3.json("samples.json").then((data) => {
    var dropdown=d3.select("#selDataset")
    data.names.forEach(sample=>{
      dropdown.append("option").text(sample).property("value",sample)
    })
    buildMetadata(data.names[0])
    BuildCharts(data.names[0])

  });

}
initialization()
function optionChanged(newsample){
  buildMetadata(newsample)
  BuildCharts(newsample)
}
