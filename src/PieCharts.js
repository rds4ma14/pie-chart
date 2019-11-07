import React, { Component } from "react";
import zc from "@dvsl/zoomcharts";

const { PieChart } = zc;
const license = require("./License.json");
const data = require("./resultado.json");

// Zoomcharts license and license key
window.ZoomChartsLicense = license.License;
window.ZoomChartsLicenseKey = license.LicenseKey;

class PieCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            greeting: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
            .then(response => response.json())
            .then(state => this.setState(state));
    }

    componentDidMount() {
        let chart = new PieChart({
            container: document.getElementById("pieChart"),
            assetsUrlBase: "./../node_modules/@dvsl/zoomcharts/lib/assets",
            area: { height: 500 },
            interaction: {
                mode: "select",
                resizing: {
                    enabled: false
                }
            },
            pie: {
                innerRadius: 0
            },
            slice: {
                expandableMarkStyle: {
                    lineWidth: 0
                }
            },

            data: {
                preloaded: data
            },

            toolbar: {
                fullscreen: true,
                enabled: true
            }
        });
    }

    render() {
        return (
            <div>
                <div className="chart-wrapper">
                    <div id="pieChart" className="chart" />
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Mount your own graphic: </label>
                        <input
                            id="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <p>{this.state.greeting}</p>
                </div>
            </div>
        );
    }
}

export default PieCharts;
