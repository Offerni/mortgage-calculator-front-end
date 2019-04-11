import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../Styles/Components.css';

class TableComponent extends Component {
    render() {
        const {data} = this.props;
        let display = null;
        if (data && data.payment_schedule) {
            display = (
                <div className="table-container">
                    <Paper>
                    <Typography variant="h6" id="tableTitle" style={{textAlign: "center"}}>
                        Payment per Payment Schedule
                    </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Payment Schedule</TableCell>
                                    <TableCell align="right">Amount (CAD$)</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                        <div className="table-body">
                            <Table>
                                <TableBody>
                                    {Object.keys(data.payment_schedule).map((key) => (
                                        <TableRow hover key={`row_${key}`}>
                                            <TableCell key={`schedule_${key}`} align="left">{key}</TableCell>
                                            <TableCell key={key} align="right">{`$${data.payment_schedule[key]}`}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Paper>             
                </div>
            );
        }

        console.log(data);
        return (
            <div>
                {display}
            </div>
        );
    }
}

export default TableComponent;