import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});


app.post('/chart', async (req, res) => {
    const { chartType, year, yod } = req.body;
  
    // Create the Chart.js URL
    const chartUrl = `https://quickchart.io/chart?c={type:'${chartType.trim().toLowerCase()}',data:{labels:[${year.trim()}],datasets:[{label:'Users',data:[${yod.trim()}]}]}}`;
    console.log(chartUrl);
  
    // Fetch the modified URL
    try {
      const response = await axios.get(chartUrl);
      res.render('chart.ejs', { chartUrl });
    } catch (error) {
      console.error('Error fetching chart data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });