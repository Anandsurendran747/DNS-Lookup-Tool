import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Dns({ data }) {

    console.log(data);

    return (
        <div style={{ width: '100%', height: "500px" }}>

            <ResponsiveContainer >
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis dataKey="responsetime" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="lookuptime" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="responsetime" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>
            <table border={1}>
                <thead>
                    <tr>
                        <th>DNS</th>
                        <th>ip</th>
                        <th>hostname</th>
                        <th>city</th>
                        <th>region</th>
                        <th>country</th>
                        <th>loc</th>
                        <th>org</th>
                        <th>postal</th>
                        <th>timezone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(dns => (
                            <tr>
                                <td rowSpan={dns.length}>{dns.name}</td>
                                <td>
                                    {
                                        dns.locations.map(loc => (
                                            <tr>
                                                <td>{loc.ip}</td>
                                            </tr>
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        dns.locations.map(loc => (
                                            <tr>
                                                <td>{loc.hostname}</td>
                                            </tr>
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        dns.locations.map(loc => (
                                            <tr>
                                                <td>{loc.city}</td>
                                            </tr>
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        dns.locations.map(loc => (
                                            <tr>
                                                <td>{loc.region}</td>
                                            </tr>
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        dns.locations.map(loc => (
                                            <tr>
                                                <td>{loc.country}</td>
                                            </tr>
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        dns.locations.map(loc => (
                                            <tr>
                                                <td>{loc.loc}</td>
                                            </tr>
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        dns.locations.map(loc => (
                                            <tr>
                                                <td>{loc.org}</td>
                                            </tr>
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        dns.locations.map(loc => (
                                            <tr>
                                                <td>{loc.postal}</td>
                                            </tr>
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        dns.locations.map(loc => (
                                            <tr>
                                                <td>{loc.timezone}</td>
                                            </tr>
                                        ))
                                    }
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );

}

export default Dns;
