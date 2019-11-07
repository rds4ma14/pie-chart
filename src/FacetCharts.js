import React, { Component } from "react";
import zc from "@dvsl/zoomcharts";

const { FacetChart } = zc;
const license = require("./License.json");
const data = require("./barchart.json");

// data = { subvalues: data };

console.log(data);

// Zoomcharts license and license key
window.ZoomChartsLicense = license.License;
window.ZoomChartsLicenseKey = license.LicenseKey;

class FacetCharts extends Component {
    componentDidMount() {
        const chart = new FacetChart({
            container: document.getElementById("facetChart"),
            assetsUrlBase: "./../node_modules/@dvsl/zoomcharts/lib/assets",
            series: [
                {
                    name: "GDP by industry, $",
                    data: {
                        aggregation: "sum"
                    },
                    style: {
                        fillColor: "#2fc32f"
                    }
                }
            ],
            data: {
                preload: data
            },
            toolbar: {
                fullscreen: true,
                enabled: true
            },
            interaction: {
                resizing: {
                    enabled: false
                }
            }
        });
    }

    render() {
        return (
            <div className="chart-wrapper">
                <div id="facetChart" className="chart" />
            </div>
        );
    }
}

export default FacetCharts;
